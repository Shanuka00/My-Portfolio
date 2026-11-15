const { test } = require('node:test');
const assert = require('node:assert/strict');
const nodemailer = require('nodemailer');
const modules = Promise.all([import('../src/lib/contact-handler.mjs'), import('../src/lib/contact-mail.mjs')]);
const valid = { from_email: 'visitor@example.com', from_name: 'Visitor', subject: 'Project enquiry', message: 'Hello from the portfolio.\nSecond line.' };
const request = (data = valid, headers = {}) => new Request('https://portfolio.example/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json', ...headers }, body: JSON.stringify(data) });

test('sends from the configured account to itself and uses the visitor only as reply-to', async () => {
  const [{ createContactHandler }, { sendContactMessage }] = await modules;
  let smtp;
  let message;
  const env = { SMTP_HOST: 'smtp.example.com', SMTP_USER: 'owner@example.com', SMTP_PASS: 'test-password' };
  const handler = createContactHandler({ sendMail: data => sendContactMessage(data, {
    env,
    createTransport: options => {
      smtp = options;
      const capture = nodemailer.createTransport({ streamTransport: true, buffer: true, newline: 'unix' });
      return { sendMail: async mail => { message = (await capture.sendMail(mail)).message.toString(); return { accepted: ['owner@example.com'] }; } };
    },
  }) });
  const response = await handler(request({ ...valid, to_email: 'attacker@example.com', from: 'forged@example.com' }));
  assert.equal(response.status, 200);
  assert.match(message, /From: Portfolio Contact <owner@example.com>/);
  assert.match(message, /To: owner@example.com/);
  assert.match(message, /Reply-To: Visitor <visitor@example.com>/);
  assert.match(message, /Subject: \[Portfolio\] Project enquiry/);
  assert.match(message, /Hello from the portfolio\./);
  assert.doesNotMatch(message, /attacker|forged/);
  assert.equal(smtp.secure, true);
  assert.equal(smtp.tls.rejectUnauthorized, true);
  assert.equal(smtp.tls.servername, env.SMTP_HOST);
  assert.equal(smtp.auth.user, env.SMTP_USER);
});

test('supports sender and recipient overrides and STARTTLS', async () => {
  const [, { sendContactMessage }] = await modules;
  let options;
  let mail;
  await sendContactMessage(valid, {
    env: { SMTP_HOST: 'smtp.example.com', SMTP_PORT: '587', SMTP_USER: 'owner@example.com', SMTP_PASS: 'test-password', MAIL_FROM: 'alias@example.com', MAIL_TO: 'inbox@example.com' },
    createTransport: settings => { options = settings; return { sendMail: async data => { mail = data; return { accepted: ['inbox@example.com'] }; } }; },
  });
  assert.equal(options.secure, false);
  assert.equal(options.requireTLS, true);
  assert.equal(mail.from.address, 'alias@example.com');
  assert.equal(mail.to.address, 'inbox@example.com');
});

test('rejects invalid fields, email and header injection before sending', async () => {
  const [{ createContactHandler }] = await modules;
  let sent = 0;
  const handler = createContactHandler({ sendMail: async () => sent++ });
  for (const data of [null, [], {}, { ...valid, from_email: 'invalid' }, { ...valid, subject: 'Hello\r\nBcc: attacker@example.com' }, { ...valid, from_name: ' ' }, { ...valid, message: 'a'.repeat(5001) }]) {
    assert.equal((await handler(request(data))).status, 400);
  }
  assert.equal(sent, 0);
});

test('rejects other origins, unsupported types, malformed JSON and oversized streams', async () => {
  const [{ createContactHandler }] = await modules;
  const handler = createContactHandler({ sendMail: async () => assert.fail('Must not send') });
  assert.equal((await handler(request(valid, { origin: 'https://other.example' }))).status, 403);
  assert.equal((await handler(request(valid, { 'Content-Type': 'text/plain' }))).status, 415);
  const raw = body => new Request('https://portfolio.example/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body });
  assert.equal((await handler(raw('{'))).status, 400);
  assert.equal((await handler(raw('x'.repeat(17000)))).status, 413);
});

test('limits repeated attempts and allows retry after the window', async () => {
  const [{ createContactHandler }] = await modules;
  let time = 0;
  let sent = 0;
  const handler = createContactHandler({ now: () => time, sendMail: async () => sent++ });
  for (let i = 0; i < 5; i++) assert.equal((await handler(request())).status, 200);
  const limited = await handler(request());
  assert.equal(limited.status, 429);
  assert.equal(limited.headers.get('Retry-After'), '600');
  time = 600001;
  assert.equal((await handler(request())).status, 200);
  assert.equal(sent, 6);
});

test('reports missing configuration and provider failure without exposing secrets', async () => {
  const [{ createContactHandler }, { sendContactMessage }] = await modules;
  const missing = createContactHandler({ sendMail: data => sendContactMessage(data, { env: {} }) });
  assert.equal((await missing(request())).status, 503);
  const failing = createContactHandler({ sendMail: async () => { throw new Error('SMTP secret-password diagnostic'); } });
  const failure = await failing(request());
  assert.equal(failure.status, 502);
  assert.doesNotMatch(await failure.text(), /secret-password/);
  const rejected = createContactHandler({ sendMail: data => sendContactMessage(data, {
    env: { SMTP_HOST: 'smtp.example.com', SMTP_USER: 'owner@example.com', SMTP_PASS: 'secret' },
    createTransport: () => ({ sendMail: async () => ({ accepted: [], rejected: ['owner@example.com'] }) }),
  }) });
  assert.equal((await rejected(request())).status, 502);
});

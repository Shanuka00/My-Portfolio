import nodemailer from "nodemailer";

export class MailConfigurationError extends Error {}

export async function sendContactMessage(data, { env = process.env, createTransport = nodemailer.createTransport } = {}) {
  const { SMTP_HOST: host, SMTP_USER: user, SMTP_PASS: pass } = env;
  const port = Number(env.SMTP_PORT || 465);
  const from = env.MAIL_FROM?.trim() || user;
  const to = env.MAIL_TO?.trim() || user;
  if (!host || !user || !pass || !from || !to || !Number.isInteger(port) || port < 1 || port > 65535) {
    throw new MailConfigurationError("SMTP configuration is incomplete.");
  }
  const transport = createTransport({
    host, port,
    secure: port === 465,
    requireTLS: port !== 465,
    auth: { user, pass },
    tls: { rejectUnauthorized: true, servername: host },
    connectionTimeout: 10000,
    greetingTimeout: 10000,
    socketTimeout: 15000,
    disableFileAccess: true,
    disableUrlAccess: true,
  });
  const result = await transport.sendMail({
    from: { name: "Portfolio Contact", address: from },
    to: { address: to },
    replyTo: { name: data.from_name, address: data.from_email },
    subject: `[Portfolio] ${data.subject}`,
    text: `Name: ${data.from_name}\nEmail: ${data.from_email}\nSubject: ${data.subject}\n\n${data.message}`,
  });
  if (Array.isArray(result.accepted) && result.accepted.length === 0) {
    throw new Error("The SMTP server did not accept the recipient.");
  }
}

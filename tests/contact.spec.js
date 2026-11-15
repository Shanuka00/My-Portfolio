const { test, expect } = require('@playwright/test');

async function fillForm(page) {
  await page.goto('/');
  await page.getByPlaceholder('Your Email').fill('visitor@example.com');
  await page.getByPlaceholder('Your Name').fill('Visitor');
  await page.getByPlaceholder('Subject').fill('Project enquiry');
  await page.getByPlaceholder('Message', { exact: true }).fill('Please contact me about a project.');
}

test('shows sending and success states, then clears the form', async ({ page }) => {
  let release;
  let payload;
  const pending = new Promise(resolve => { release = resolve; });
  await page.route('**/api/contact', async route => {
    payload = route.request().postDataJSON();
    await pending;
    await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify({ message: 'Message sent successfully.' }) });
  });
  await fillForm(page);
  await page.getByRole('button', { name: 'Send', exact: true }).click();
  await expect(page.getByRole('button', { name: 'Sending...' })).toBeDisabled();
  release();
  await expect(page.locator('#Contact').getByRole('status')).toHaveText('Message sent successfully.');
  await expect(page.getByPlaceholder('Your Email')).toHaveValue('');
  await expect(page.getByPlaceholder('Message', { exact: true })).toHaveValue('');
  await expect(page.getByRole('button', { name: 'Send', exact: true })).toBeEnabled();
  expect(payload).toEqual({ from_email: 'visitor@example.com', from_name: 'Visitor', subject: 'Project enquiry', message: 'Please contact me about a project.' });
});

test('shows delivery errors and keeps the visitor message for retry', async ({ page }) => {
  await page.route('**/api/contact', route => route.fulfill({ status: 502, contentType: 'application/json', body: JSON.stringify({ error: 'Unable to send your message right now. Please try again later.' }) }));
  await fillForm(page);
  await page.getByRole('button', { name: 'Send', exact: true }).click();
  await expect(page.locator('#Contact').getByRole('alert')).toContainText('Unable to send');
  await expect(page.getByPlaceholder('Message', { exact: true })).toHaveValue('Please contact me about a project.');
  await expect(page.getByRole('button', { name: 'Send', exact: true })).toBeEnabled();
});

test('API rejects invalid input and honestly reports missing mail credentials', async ({ request }) => {
  const invalid = await request.post('/api/contact', { data: { from_email: 'invalid' } });
  expect(invalid.status()).toBe(400);
  const unconfigured = await request.post('/api/contact', { data: { from_email: 'visitor@example.com', from_name: 'Visitor', subject: 'Hello', message: 'Test with no SMTP credentials.' } });
  expect(unconfigured.status()).toBe(503);
  expect(await unconfigured.json()).toEqual({ error: 'Email is not configured yet. Please try again later.' });
});

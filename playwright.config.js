const { defineConfig } = require('@playwright/test');

module.exports = defineConfig({
  testDir: './tests',
  testMatch: '**/*.spec.js',
  fullyParallel: true,
  use: {
    baseURL: 'http://127.0.0.1:3100',
    channel: 'msedge',
    trace: 'retain-on-failure',
  },
  webServer: {
    // Tests must never send through real mail credentials from .env.
    env: { SMTP_HOST: '127.0.0.1', SMTP_USER: '', SMTP_PASS: '', MAIL_FROM: '', MAIL_TO: '' },
    command: 'npm run start -- --hostname 127.0.0.1 --port 3100',
    url: 'http://127.0.0.1:3100',
    reuseExistingServer: false,
    timeout: 60000,
  },
});

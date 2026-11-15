# Shanuka Dissanayake

Personal portfolio built with Next.js App Router, React, styled-components and Framer Motion. The existing responsive layout, animations, timelines and contact form are retained.

Live site: [shanuka.vercel.app](https://shanuka.vercel.app)

## Development

Requires Node.js 20.9 or newer (Node.js 22 LTS recommended).

```sh
npm ci
npm run dev
```

Open http://localhost:3000. Edit portfolio content in `src/data/constants.js` and sections in `src/components/sections/`.

## Production

```sh
npm run build
npm start
```

The homepage is prerendered to HTML, including portfolio content and styles. Interactive components hydrate in the browser.

On Vercel, select the **Next.js** framework preset, use `npm run build`, and leave the output directory at its framework default. Remove any previous Create React App `build` output override. This migration changes the local project; it does not deploy the site.

## SEO

- `src/data/site.js`: site title, description and production origin. The description follows `Bio.description`.
- `src/app/layout.jsx`: canonical URL, title, description, Open Graph and Twitter metadata.
- `src/app/page.jsx`: ProfilePage / Person structured data.
- `src/app/opengraph-image.jsx`: generated 1200 x 630 social sharing image.
- `src/app/robots.js` and `src/app/sitemap.js`: crawler discovery routes.

To change domains, copy `.env.example` to `.env.local`, set `SITE_URL` to the absolute production origin, and rebuild. On a hosting provider, set the same environment variable before building. It defaults to `https://shanuka.vercel.app`.

## Verification

After building, run `npm test`. Playwright starts a production server on port 3100 and checks HTML without JavaScript, SEO routes, local images, hydration, desktop/mobile navigation and contact form validation. It uses the installed Microsoft Edge browser; install Edge or change the browser channel in `playwright.config.js` for other environments. Screenshots and failure traces are saved under the ignored `test-results/` directory.

## Contact email

The form sends to `/api/contact`. The Next.js server uses SMTP; credentials stay on the server. The visitor address is Reply-To. The configured Mailcow account sends from `info@ricode.lk` to `shanukadid@gmail.com`.

Fill in `.env` (or `.env.local`):

```dotenv
SMTP_HOST=mail.ricode.lk
SMTP_PORT=465
SMTP_USER=info@ricode.lk
SMTP_PASS=your-mailcow-mailbox-password
MAIL_FROM=info@ricode.lk
MAIL_TO=shanukadid@gmail.com
```

Use the password for the `info@ricode.lk` mailbox, configured in Mailcow under E-Mail > Configuration > Mailboxes. This is the mailbox password, not the Mailcow administrator password or a Google App Password. Restart `npm run dev` after editing environment variables. Existing `.env.local` values take precedence over `.env`.

Leave `MAIL_FROM` and `MAIL_TO` blank to send from and to `SMTP_USER`. To change the recipient, set `MAIL_TO`. If you change `MAIL_FROM`, your provider must authorize that address or alias. For another provider, replace the host, port and login with its SMTP details. Port 465 uses implicit TLS; other ports require STARTTLS. Certificate verification stays enabled, and the SMTP service must present a trusted certificate for `mail.ricode.lk`. A certificate configured only in Nginx does not configure the SMTP service.

On Vercel, add the same variables in project settings and redeploy. This requires Node.js server hosting; a static-only export cannot run the email API. Do not prefix mail secrets with `NEXT_PUBLIC_`. `.env` files are ignored by Git; `.env.example` contains blank credential fields.

The server validates inputs, caps request size, rejects cross-origin browser submissions and applies a best-effort limit of five valid attempts per ten minutes per IP per server instance. Multi-instance deployments need a shared rate limiter for stronger abuse protection. The form shows sending, success and failure states, and preserves the message after a failure.

Run `npm run test:mail` for server tests and `npm test` after building for browser checks. Tests use captured or mocked mail and do not send messages to a real mailbox. Actual delivery must be verified after you enter valid credentials.

For Mailcow-to-Gmail delivery problems, inspect the Mailcow mail queue/logs and verify the DKIM record, PTR for `mail.ricode.lk`, and outbound access from the VPS to recipient mail servers on port 25. SMTP authentication verification alone does not prove inbox delivery.

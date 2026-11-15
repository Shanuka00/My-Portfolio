const { test, expect } = require('@playwright/test');

const sections = ['Skills', 'Experience', 'Projects', 'Education', 'Contact'];

test('serves crawlable content, metadata, structured data and discovery routes', async ({ request, browser }) => {
  const response = await request.get('/');
  expect(response.ok()).toBeTruthy();
  const html = await response.text();
  expect(html).toContain('data-styled=');
  expect(html).not.toContain('%PUBLIC_URL%');
  expect(html).not.toContain('create-react-app');

  const context = await browser.newContext({ javaScriptEnabled: false });
  const page = await context.newPage();
  await page.goto('/');
  await expect(page).toHaveTitle('Shanuka Dissanayake | Software Engineer & Full Stack Developer');
  await expect(page.locator('h1')).toHaveText('Shanuka Dissanayake');
  for (const section of sections) {
    await expect(page.locator(`#${section} h2`)).toHaveText(section);
  }
  const canonical = await page.locator('link[rel="canonical"]').getAttribute('href');
  const origin = new URL(canonical).origin;
  await expect(page.locator('meta[name="description"]')).toHaveAttribute('content', /Software Engineer from Sri Lanka/);
  expect(new URL(await page.locator('meta[property="og:url"]').getAttribute('content')).origin).toBe(origin);
  await expect(page.locator('meta[name="twitter:card"]')).toHaveAttribute('content', 'summary_large_image');
  const data = JSON.parse(await page.locator('script[type="application/ld+json"]').textContent());
  expect(data.mainEntity.name).toBe('Shanuka Dissanayake');
  expect(data.mainEntity.sameAs).toContain('https://github.com/Shanuka00');
  for (const image of await page.locator('img[src^="/_next/static/media/"]').all()) {
    expect((await request.get(await image.getAttribute('src'))).ok()).toBeTruthy();
  }
  const robots = await request.get('/robots.txt');
  expect(robots.ok()).toBeTruthy();
  expect(await robots.text()).toContain(`Sitemap: ${origin}/sitemap.xml`);
  const sitemap = await request.get('/sitemap.xml');
  expect(sitemap.ok()).toBeTruthy();
  expect(await sitemap.text()).toContain(`<loc>${origin}</loc>`);
  const preview = await request.get('/opengraph-image');
  expect(preview.ok()).toBeTruthy();
  expect(preview.headers()['content-type']).toContain('image/png');
  await context.close();
});

for (const viewport of [{ width: 1440, height: 1000 }, { width: 390, height: 844 }]) {
  test(`hydrates and preserves navigation, images and contact form at ${viewport.width}px`, async ({ page }) => {
    const errors = [];
    page.on('pageerror', error => errors.push(error.message));
    page.on('console', message => {
      if (message.type() === 'error' && /hydrat|did not match|server rendered|unique.*key/i.test(message.text())) errors.push(message.text());
    });
    await page.setViewportSize(viewport);
    await page.goto('/');
    await expect(page.locator('h1')).toBeVisible();
    await expect(page.getByAltText('Shanuka Dissanayake', { exact: true })).toBeVisible();
    await expect.poll(() => page.getByAltText('Shanuka Dissanayake', { exact: true }).evaluate(image => image.complete && image.naturalWidth > 0)).toBe(true);
    await expect.poll(() => page.locator('.Typewriter__wrapper').textContent()).not.toBe('');
    await page.screenshot({ path: `test-results/portfolio-${viewport.width}.png`, fullPage: true });
    if (viewport.width < 769) {
      const toggle = page.getByRole('button', { name: 'Toggle navigation' });
      await toggle.click();
      await expect(toggle).toHaveAttribute('aria-expanded', 'true');
      await page.locator('#mobile-navigation').getByRole('link', { name: 'Projects', exact: true }).click();
      await expect(toggle).toHaveAttribute('aria-expanded', 'false');
    } else {
      await page.getByRole('navigation', { name: 'Main navigation' }).getByRole('link', { name: 'Projects', exact: true }).click();
    }
    await expect(page).toHaveURL(/#Projects$/);
    await expect(page.locator('#Projects h2')).toBeInViewport();
    for (const section of ['Experience', 'Education']) {
      const card = page.locator(`#${section} .vertical-timeline-element-content`).first();
      await card.scrollIntoViewIfNeeded();
      await expect(card).toBeVisible();
      await expect(card).not.toHaveClass(/is-hidden/);
    }
    await page.locator('#Contact').scrollIntoViewIfNeeded();
    await page.getByPlaceholder('Your Email').fill('visitor@example.com');
    await page.getByPlaceholder('Your Name').fill('Portfolio visitor');
    await page.getByPlaceholder('Subject').fill('Hello');
    await page.getByPlaceholder('Message', { exact: true }).fill('Checking the contact form after migration.');
    await expect(page.locator('#Contact form')).toHaveJSProperty('length', 5);
    expect(await page.locator('#Contact form').evaluate(form => form.checkValidity())).toBe(true);
    expect(errors).toEqual([]);
  });
}

// Simulate an extension modifying the HTML before React hydrates it.
test('tolerates extension-added contact input attributes', async ({ page }) => {
  const errors = [];
  page.on('pageerror', error => errors.push(error.message));
  page.on('console', message => {
    if (message.type() === 'error' && /hydrat|did not match|server rendered|unique.*key/i.test(message.text())) errors.push(message.text());
  });
  await page.route('http://127.0.0.1:3100/', async route => {
    const response = await route.fetch();
    const body = (await response.text()).replace(/<input\b(?![^>]*type="hidden")/g, '<input fdprocessedid="extension-test"');
    await route.fulfill({ response, body });
  });
  await page.goto('/');
  await expect.poll(() => page.locator('.Typewriter__wrapper').textContent()).not.toBe('');
  await expect(page.locator('#Contact input[fdprocessedid="extension-test"]')).toHaveCount(4);
  await page.getByPlaceholder('Your Name').fill('Visitor');
  await expect(page.getByPlaceholder('Your Name')).toHaveValue('Visitor');
  expect(errors).toEqual([]);
});

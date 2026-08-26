import { chromium } from 'playwright';

const browser = await chromium.launch();
const page = await browser.newPage();
await page.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 60000 });
await page.screenshot({ path: '/tmp/epicurean-screenshot.png', fullPage: true });
console.log('Screenshot saved to /tmp/epicurean-screenshot.png');
const title = await page.title();
console.log('Page title:', title);
const url = page.url();
console.log('Page URL:', url);
await browser.close();

import { chromium } from 'playwright';

const browser = await chromium.launch();
const context = await browser.newContext({
  viewport: { width: 390, height: 844 }, // iPhone 14 size
  isMobile: true
});

// Homepage - Mobile
const page1 = await context.newPage();
await page1.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 60000 });
await page1.screenshot({ path: '/tmp/home-mobile.png', fullPage: true });
console.log('Home mobile screenshot saved');

// Cart Page - Mobile
const page2 = await context.newPage();
await page2.goto('http://localhost:3000/cart', { waitUntil: 'networkidle', timeout: 60000 });
await page2.screenshot({ path: '/tmp/cart-mobile.png', fullPage: true });
console.log('Cart mobile screenshot saved');

// Search Page - Mobile
const page3 = await context.newPage();
await page3.goto('http://localhost:3000/search', { waitUntil: 'networkidle', timeout: 60000 });
await page3.screenshot({ path: '/tmp/search-mobile.png', fullPage: true });
console.log('Search mobile screenshot saved');

// Restaurant Page - Mobile
const page4 = await context.newPage();
await page4.goto('http://localhost:3000/restaurant/1', { waitUntil: 'networkidle', timeout: 60000 });
await page4.screenshot({ path: '/tmp/restaurant-mobile.png', fullPage: true });
console.log('Restaurant mobile screenshot saved');

// Desktop view
const desktopContext = await browser.newContext({
  viewport: { width: 1440, height: 900 },
  isMobile: false
});

const desktopPage = await desktopContext.newPage();
await desktopPage.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 60000 });
await desktopPage.screenshot({ path: '/tmp/home-desktop.png', fullPage: true });
console.log('Desktop screenshot saved');

console.log('All screenshots saved!');
await browser.close();

import { chromium } from 'playwright';

const browser = await chromium.launch();

// Mobile viewport
const mobile = await browser.newContext({ viewport: { width: 390, height: 844 }, isMobile: true });

// Cart
const p1 = await mobile.newPage();
await p1.goto('http://localhost:3000/cart', { waitUntil: 'networkidle', timeout: 30000 });
await p1.screenshot({ path: '/tmp/cart-mobile.png', fullPage: true });
console.log('cart done');

// Search
const p2 = await mobile.newPage();
await p2.goto('http://localhost:3000/search', { waitUntil: 'networkidle', timeout: 30000 });
await p2.screenshot({ path: '/tmp/search-mobile.png', fullPage: true });
console.log('search done');

// Restaurant
const p3 = await mobile.newPage();
await p3.goto('http://localhost:3000/restaurant/1', { waitUntil: 'networkidle', timeout: 30000 });
await p3.screenshot({ path: '/tmp/restaurant-mobile.png', fullPage: true });
console.log('restaurant done');

// Desktop
const desktop = await browser.newContext({ viewport: { width: 1440, height: 900 } });
const p4 = await desktop.newPage();
await p4.goto('http://localhost:3000', { waitUntil: 'networkidle', timeout: 30000 });
await p4.screenshot({ path: '/tmp/home-desktop.png', fullPage: true });
console.log('desktop done');

await browser.close();
console.log('All screenshots complete!');

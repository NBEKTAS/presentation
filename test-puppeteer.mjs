import puppeteer from 'puppeteer';
import { preview } from 'vite';

(async () => {
  const server = await preview({ preview: { port: 3005 } });
  server.printUrls();
  
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  
  page.on('console', msg => console.log('PAGE LOG:', msg.text()));
  page.on('pageerror', error => console.log('PAGE ERROR:', error.message));
  
  await page.goto('http://localhost:3005/presentation/');
  console.log("Page loaded");
  await new Promise(r => setTimeout(r, 2000));
  
  await browser.close();
  server.httpServer.close();
  process.exit(0);
})();

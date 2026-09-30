import puppeteer from 'puppeteer';

(async () => {
  console.log("Launching puppeteer...");
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  await page.setViewport({ width: 1200, height: 630 });
  
  console.log("Navigating to presentation...");
  await page.goto('http://localhost:3000/presentation/');
  
  console.log("Waiting for app to initialize...");
  await new Promise(r => setTimeout(r, 2000));
  
  console.log("Navigating to Slide 3 (Map)...");
  await page.keyboard.press('ArrowRight');
  await new Promise(r => setTimeout(r, 1000));
  await page.keyboard.press('ArrowRight');
  
  console.log("Waiting for map tiles to load...");
  await new Promise(r => setTimeout(r, 10000));
  
  console.log("Taking screenshot...");
  await page.screenshot({ path: 'public/images/og_map_preview.jpg', type: 'jpeg', quality: 90 });
  console.log("Screenshot saved to public/images/og_map_preview.jpg");
  
  await browser.close();
})();

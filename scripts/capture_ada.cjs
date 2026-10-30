const { chromium } = require('playwright');
const path = require('path');

async function captureAda() {
  const assetsDir = path.join(__dirname, '../docs/assets');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 2
  });
  const page = await context.newPage();
  await page.goto('http://localhost:5178/', { waitUntil: 'networkidle' });

  // Switch to Ghost mode
  await page.locator('button:has-text("Ghost in the Machine")').click();
  await page.waitForTimeout(1000);

  // Click the sample question (first prompt chip)
  const chip = page.locator('div:has-text("Whisper:") button').first();
  if (await chip.isVisible()) {
    await chip.click();
    await page.waitForTimeout(1500); // Wait for Gemma 2 streaming response

    // Click Gemma 2 Thought Protocol toggle
    const thoughtBtn = page.locator('button:has-text("Gemma 2 Thought Protocol")').last();
    if (await thoughtBtn.isVisible()) {
      await thoughtBtn.click();
      await page.waitForTimeout(500);
    }
  }

  await page.screenshot({ path: path.join(assetsDir, '05_spirit_dialogue_decrypted.png') });
  console.log('Captured 05_spirit_dialogue_decrypted.png successfully!');

  await context.close();
  await browser.close();
}

captureAda().catch(console.error);

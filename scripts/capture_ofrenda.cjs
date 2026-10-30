const { chromium } = require('playwright');
const path = require('path');
const fs = require('fs');

async function capture() {
  const assetsDir = path.join(__dirname, '../docs/assets');
  if (!fs.existsSync(assetsDir)) {
    fs.mkdirSync(assetsDir, { recursive: true });
  }

  console.log('Launching browser to capture Ofrenda Viva AI demos and screenshots...');
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext({
    viewport: { width: 1280, height: 800 },
    deviceScaleFactor: 2,
    recordVideo: {
      dir: assetsDir,
      size: { width: 1280, height: 800 }
    }
  });

  const page = await context.newPage();

  // 1. Load Altar
  console.log('1. Loading Altar on http://localhost:5178...');
  await page.goto('http://localhost:5178/', { waitUntil: 'networkidle' });
  await page.waitForTimeout(1500);

  // Take screenshot 01: Main Altar
  await page.screenshot({ path: path.join(assetsDir, '01_ofrenda_altar_main.png') });
  console.log('Captured 01_ofrenda_altar_main.png');

  // 2. Click on Abuela Elena or Ada Lovelace "Ver Memoria" / "Calaverita & Vida"
  console.log('2. Opening Ancestor Calaverita Detail...');
  const calaveritaBtn = page.locator('button:has-text("Calaverita & Vida")').first();
  if (await calaveritaBtn.isVisible()) {
    await calaveritaBtn.click();
    await page.waitForTimeout(1000);
    await page.screenshot({ path: path.join(assetsDir, '02_ancestor_detail_calaverita.png') });
    console.log('Captured 02_ancestor_detail_calaverita.png');

    // Close modal via DOM click
    await page.evaluate(() => {
      const btn = document.querySelector('button[aria-label="Cerrar modal"]');
      if (btn) btn.click();
    });
    await page.waitForTimeout(600);
  }

  // 3. Open Add Loved One Modal (Gemma 2 Synthesis)
  console.log('3. Opening Add Loved One Modal...');
  const addBtn = page.locator('button:has-text("Add Loved One")');
  await addBtn.click();
  await page.waitForTimeout(600);

  // Fill in form
  await page.fill('input[placeholder="e.g. Abuelita Rosa"]', 'Tía Carmen');
  await page.fill('input[placeholder="e.g. Tamales de elote, Boleros de Agustín Lara"]', 'Atole de guayaba y buñuelos crujientes');
  await page.fill('textarea', 'Su sonrisa iluminaba toda la casa en noviembre mientras nos enseñaba a trenzar el papel picado.');
  await page.waitForTimeout(500);

  // Click synthesize
  const synthBtn = page.locator('button:has-text("Componer Recuerdo & Calaverita")');
  await synthBtn.click();
  await page.waitForTimeout(1400); // Wait for Gemma 2 synthesis

  await page.screenshot({ path: path.join(assetsDir, '03_gemma_remembrance_modal.png') });
  console.log('Captured 03_gemma_remembrance_modal.png');

  // Place on Altar
  const placeBtn = page.locator('button:has-text("Colocar en el Altar Sagrado")');
  await placeBtn.scrollIntoViewIfNeeded();
  await placeBtn.click({ force: true });
  await page.waitForTimeout(1000);

  // 4. Light Candles celebration
  console.log('4. Lighting Candles with Marigold Confetti...');
  const candleBtn = page.locator('button:has-text("Light Candle")');
  await candleBtn.click();
  await page.waitForTimeout(400);
  await candleBtn.click();
  await page.waitForTimeout(800);
  await page.screenshot({ path: path.join(assetsDir, '07_candle_lighting_celebration.png') });
  console.log('Captured 07_candle_lighting_celebration.png');

  // 5. Switch to Ghost in the Machine Mode (CRT Séance)
  console.log('5. Switching to Ghost in the Machine Séance...');
  const ghostTab = page.locator('button:has-text("Ghost in the Machine")');
  await ghostTab.click();
  await page.waitForTimeout(1500);

  await page.screenshot({ path: path.join(assetsDir, '04_ghost_machine_crt_seance.png') });
  console.log('Captured 04_ghost_machine_crt_seance.png');

  // 6. Ask Ada Lovelace a question
  console.log('6. Transmitting Séance Question to Ada Lovelace...');
  const sampleQ = page.locator('button:has-text("Did you believe machines could possess a soul?")');
  if (await sampleQ.isVisible()) {
    await sampleQ.click();
    await page.waitForTimeout(1200);

    // Open thought inspection
    const thoughtToggle = page.locator('button:has-text("Gemma 2 Thought Protocol")').last();
    if (await thoughtToggle.isVisible()) {
      await thoughtToggle.click();
      await page.waitForTimeout(600);
    }

    await page.screenshot({ path: path.join(assetsDir, '05_spirit_dialogue_decrypted.png') });
    console.log('Captured 05_spirit_dialogue_decrypted.png');
  }

  // 7. Switch to The Ghost of COBOL
  console.log('7. Holding Séance with The Ghost of COBOL...');
  const cobolBtn = page.locator('button:has-text("The Ghost of COBOL")');
  if (await cobolBtn.isVisible()) {
    await cobolBtn.click();
    await page.waitForTimeout(1200);

    const cobolQ = page.locator('button:has-text("Why won’t you ever die?")');
    if (await cobolQ.isVisible()) {
      await cobolQ.click();
      await page.waitForTimeout(1200);
    }

    await page.screenshot({ path: path.join(assetsDir, '06_cobol_spirit_mainframe.png') });
    console.log('Captured 06_cobol_spirit_mainframe.png');
  }

  await page.waitForTimeout(1500);
  await context.close();
  await browser.close();

  // Find and rename video
  const files = fs.readdirSync(assetsDir);
  const webmFile = files.find(f => f.endsWith('.webm') && f !== 'ofrendaviva_demo.webm');
  if (webmFile) {
    fs.copyFileSync(path.join(assetsDir, webmFile), path.join(assetsDir, 'ofrendaviva_demo.webm'));
    console.log('Copied recorded video to ofrendaviva_demo.webm');
  }

  console.log('All screenshots and demo video recorded successfully!');
}

capture().catch(console.error);

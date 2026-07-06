// screenshot.ts — takes desktop + mobile screenshots via Playwright

import { chromium } from 'playwright';
import { createHash } from 'crypto';
import { resolve } from 'path';
import type { ScreenshotInfo } from './types.js';

export function urlHash(url: string): string {
  return createHash('sha256').update(url).digest('hex').slice(0, 16);
}

export async function takeScreenshots(url: string): Promise<ScreenshotInfo> {
  const hash = urlHash(url);
  const screenshotsDir = resolve(process.cwd(), 'screenshots');
  const desktopPath = resolve(screenshotsDir, `${hash}-desktop.png`);
  const mobilePath = resolve(screenshotsDir, `${hash}-mobile.png`);

  let desktop: string | null = null;
  let mobile: string | null = null;

  // Desktop screenshot
  try {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      viewport: { width: 1280, height: 720 },
      deviceScaleFactor: 1,
    });
    const page = await context.newPage();
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.screenshot({ path: desktopPath, fullPage: false, type: 'png' });
    await browser.close();
    desktop = desktopPath;
  } catch (err) {
    console.error(`[screenshot] Error en desktop: ${(err as Error).message}`);
  }

  // Mobile screenshot
  try {
    const browser = await chromium.launch({ headless: true });
    const context = await browser.newContext({
      viewport: { width: 375, height: 667 },
      deviceScaleFactor: 2,
      isMobile: true,
      hasTouch: true,
    });
    const page = await context.newPage();
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });
    await page.screenshot({ path: mobilePath, fullPage: false, type: 'png' });
    await browser.close();
    mobile = mobilePath;
  } catch (err) {
    console.error(`[screenshot] Error en mobile: ${(err as Error).message}`);
  }

  return { desktop, mobile };
}

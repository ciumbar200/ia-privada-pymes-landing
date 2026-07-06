// lighthouse-runner.ts — runs Lighthouse, returns scores

import { launch } from 'chrome-launcher';
import lighthouse from 'lighthouse';
import type { Scores } from './types.js';

export async function runLighthouse(url: string): Promise<Scores> {
  let chrome: Awaited<ReturnType<typeof launch>> | null = null;

  try {
    chrome = await launch({
      chromeFlags: [
        '--headless',
        '--no-sandbox',
        '--disable-gpu',
        '--disable-dev-shm-usage',
        '--disable-software-rasterizer',
      ],
      logLevel: 'silent',
    });

    const options: Record<string, unknown> = {
      logLevel: 'silent',
      output: 'json',
      onlyCategories: ['accessibility', 'performance', 'seo', 'best-practices'],
      port: chrome.port,
    };

    // lighthouse returns { lhr } in newer versions
    const runnerResult = await lighthouse(url, options);
    const lhr = (runnerResult as { lhr?: Record<string, unknown> })?.lhr ?? runnerResult as Record<string, unknown>;

    const categories = (lhr?.categories ?? {}) as Record<string, { score: number | null }>;

    return {
      accessibility: Math.round(((categories.accessibility?.score ?? 0) * 100)),
      performance: Math.round(((categories.performance?.score ?? 0) * 100)),
      seo: Math.round(((categories.seo?.score ?? 0) * 100)),
      bestPractices: Math.round((categories['best-practices']?.score ?? 0) * 100),
    };
  } finally {
    if (chrome) await chrome.kill();
  }
}

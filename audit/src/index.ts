// index.ts — main entry, parses URL arg, orchestrates all tools

import { writeFileSync, mkdirSync, resolve as resolvePath } from 'fs';
import { resolve } from 'path';
import { runAxe } from './axe-runner.js';
import { runLighthouse } from './lighthouse-runner.js';
import { runPa11y } from './pa11y-runner.js';
import { takeScreenshots, urlHash } from './screenshot.js';
import {
  buildReport,
  defaultScores,
  defaultScreenshots,
} from './report.js';
import type { AuditResult, Issue, Scores, ScreenshotInfo } from './types.js';

function isValidUrl(url: string): boolean {
  try {
    const u = new URL(url);
    return u.protocol === 'http:' || u.protocol === 'https:';
  } catch {
    return false;
  }
}

async function main(): Promise<void> {
  const urlArg = process.argv[2];

  // Validate URL argument
  if (!urlArg) {
    console.error('Uso: npm run audit -- <url>');
    console.error('Ejemplo: npm run audit -- https://example.com');
    process.exit(1);
  }

  if (!isValidUrl(urlArg)) {
    console.error(`Error: URL no válida "${urlArg}"`);
    console.error('Proporciona una URL completa con http:// o https://');
    process.exit(1);
  }

  console.error(`[audit] Iniciando auditoría de: ${urlArg}`);

  const allIssues: Issue[] = [];
  let scores: Scores = defaultScores();
  let screenshots: ScreenshotInfo = defaultScreenshots();
  const errors: string[] = [];

  // Run axe-core via Playwright
  console.error('[audit] Ejecutando axe-core...');
  try {
    const axeIssues = await runAxe(urlArg);
    allIssues.push(...axeIssues);
    console.error(`[audit] axe-core: ${axeIssues.length} problemas encontrados`);
  } catch (err) {
    const msg = `[audit] Error en axe-core: ${(err as Error).message}`;
    errors.push(msg);
    console.error(msg);
  }

  // Run Lighthouse
  console.error('[audit] Ejecutando Lighthouse...');
  try {
    scores = await runLighthouse(urlArg);
    console.error(`[audit] Lighthouse: scores obtenidos`);
  } catch (err) {
    const msg = `[audit] Error en Lighthouse: ${(err as Error).message}`;
    errors.push(msg);
    console.error(msg);
  }

  // Run pa11y
  console.error('[audit] Ejecutando pa11y...');
  try {
    const pa11yIssues = await runPa11y(urlArg);
    allIssues.push(...pa11yIssues);
    console.error(`[audit] pa11y: ${pa11yIssues.length} problemas encontrados`);
  } catch (err) {
    const msg = `[audit] Error en pa11y: ${(err as Error).message}`;
    errors.push(msg);
    console.error(msg);
  }

  // Take screenshots
  console.error('[audit] Tomando capturas de pantalla...');
  try {
    screenshots = await takeScreenshots(urlArg);
    console.error('[audit] Capturas completadas');
  } catch (err) {
    const msg = `[audit] Error en capturas: ${(err as Error).message}`;
    errors.push(msg);
    console.error(msg);
  }

  // Build final report
  const report: AuditResult = buildReport(urlArg, scores, allIssues, screenshots);

  // Save results to file
  const hash = urlHash(urlArg);
  const resultsDir = resolve(process.cwd(), 'results');
  try {
    mkdirSync(resultsDir, { recursive: true });
    const resultsPath = resolvePath(resultsDir, `${hash}.json`);
    writeFileSync(resultsPath, JSON.stringify(report, null, 2), 'utf-8');
    console.error(`[audit] Resultados guardados en: ${resultsPath}`);
  } catch (err) {
    console.error(`[audit] Error guardando resultados: ${(err as Error).message}`);
  }

  // Output JSON to stdout
  process.stdout.write(JSON.stringify(report, null, 2) + '\n');

  if (errors.length > 0) {
    console.error(`\n[audit] Completado con ${errors.length} errores de herramientas`);
    for (const e of errors) console.error(`  - ${e}`);
  }

  console.error('[audit] Auditoría completada');
}

main().catch((err) => {
  console.error(`[audit] Error fatal: ${(err as Error).message}`);
  process.exit(1);
});

// axe-runner.ts — runs axe-core via Playwright, returns issues

import { chromium } from 'playwright';
import AxeBuilder from '@axe-core/playwright';
import type { AxeResults, AxeViolation, Issue, Severity, IssueType } from './types.js';
import { axeTranslations, defaultTranslation } from './translations.js';

// Map axe impact → our severity (1:1)
function mapSeverity(impact?: string): Severity {
  switch (impact) {
    case 'critical': return 'critical';
    case 'serious': return 'serious';
    case 'moderate': return 'moderate';
    case 'minor': return 'minor';
    default: return 'minor';
  }
}

// Map axe rule tags → our issue type
function mapType(ruleId: string, tags: string[]): IssueType {
  if (ruleId === 'color-contrast' || tags.includes('color-contrast-enhanced')) return 'contrast';
  if (tags.includes('keyboard') || tags.includes('focus') || ruleId.startsWith('keyboard') || ruleId.startsWith('focus') || ruleId === 'tabindex') return 'keyboard';
  if (tags.includes('form') || ruleId === 'label' || ruleId === 'autocomplete-valid' || ruleId.startsWith('form')) return 'forms';
  if (tags.includes('aria') || ruleId.startsWith('aria') || ruleId === 'aria-roles' || ruleId === 'aria-label') return 'aria';
  if (ruleId === 'image-alt' || ruleId === 'image-redundant-alt' || ruleId.startsWith('image')) return 'images';
  if (ruleId === 'heading-order' || ruleId === 'empty-heading' || ruleId === 'page-has-heading-one' || ruleId.startsWith('heading')) return 'structure';
  if (ruleId === 'region' || ruleId === 'landmark-one-main' || ruleId.startsWith('landmark') || ruleId.startsWith('region')) return 'structure';
  if (ruleId === 'target-size' || ruleId === 'tap-target' || ruleId === 'meta-viewport') return 'mobile';
  if (ruleId === 'html-has-lang' || ruleId === 'html-lang-valid' || ruleId.startsWith('language') || ruleId === 'html-valid-lang') return 'language';
  return 'other';
}

// Translate axe violation to Spanish
function translate(ruleId: string): { title: string; description: string; recommendation: string; impact: string } {
  const t = axeTranslations[ruleId] ?? defaultTranslation;
  return {
    title: t.title,
    description: t.description,
    recommendation: t.recommendation,
    impact: t.impact,
  };
}

// Convert axe violations to our Issue array
function violationsToIssues(violations: AxeViolation[]): Issue[] {
  const issues: Issue[] = [];
  for (const v of violations) {
    const trans = translate(v.id);
    const severity = mapSeverity(v.impact);
    const type = mapType(v.id, v.tags);
    for (const node of v.nodes) {
      const selector = node.target?.[0] ?? 'unknown';
      issues.push({
        severity,
        type,
        title: trans.title,
        description: `${trans.description} (Regla: ${v.id})`,
        selector,
        recommendation: trans.recommendation,
        impact: trans.impact,
        source: 'axe',
        ruleId: v.id,
      });
    }
  }
  return issues;
}

export async function runAxe(url: string): Promise<Issue[]> {
  const browser = await chromium.launch({ headless: true });
  const context = await browser.newContext();
  const page = await context.newPage();

  try {
    await page.goto(url, { waitUntil: 'networkidle', timeout: 30000 });

    const results: AxeResults = await new AxeBuilder({ page })
      .withTags(['wcag2a', 'wcag2aa', 'wcag21a', 'wcag21aa'])
      .analyze();

    return violationsToIssues(results.violations);
  } finally {
    await browser.close();
  }
}

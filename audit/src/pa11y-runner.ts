// pa11y-runner.ts — runs pa11y as second opinion

// import { chromium } from 'playwright';  // removed - pa11y launches its own browser
import type { Issue, Severity, IssueType, Pa11yResult, Pa11yIssue } from './types.js';
import { axeTranslations } from './translations.js';

// Map pa11y issue codes to our severity
function mapPa11ySeverity(code: string): Severity {
  if (code.includes('Principle1')) return 'critical';
  if (code.includes('Principle2')) return 'serious';
  if (code.includes('Principle3')) return 'moderate';
  if (code.includes('Principle4')) return 'moderate';
  return 'minor';
}

// Map pa11y issue to type
function mapPa11yType(code: string, message: string): IssueType {
  const lc = (code + ' ' + message).toLowerCase();
  if (lc.includes('contrast') || lc.includes('color')) return 'contrast';
  if (lc.includes('keyboard') || lc.includes('focus') || lc.includes('tab')) return 'keyboard';
  if (lc.includes('form') || lc.includes('label') || lc.includes('input') || lc.includes('autocomplete')) return 'forms';
  if (lc.includes('aria') || lc.includes('role')) return 'aria';
  if (lc.includes('alt') || lc.includes('image')) return 'images';
  if (lc.includes('heading') || lc.includes('h1') || lc.includes('h2') || lc.includes('h3') || lc.includes('region') || lc.includes('landmark') || lc.includes('main')) return 'structure';
  if (lc.includes('target') || lc.includes('viewport') || lc.includes('touch')) return 'mobile';
  if (lc.includes('lang') || lc.includes('language')) return 'language';
  return 'other';
}

// Extract a rule ID from pa11y code
function extractRuleId(code: string): string {
  // pa11y codes look like "htmlcs: WCAG2AA.Principle1.Guideline1_3.1_3_1.H42.2"
  const parts = code.split('.');
  const lastPart = parts[parts.length - 1] ?? code;
  // Strip the numeric suffix
  return lastPart.replace(/\.\d+$/, '');
}

function translatePa11y(ruleId: string, message: string) {
  const t = axeTranslations[ruleId];
  if (t) return { title: t.title, description: t.description, recommendation: t.recommendation, impact: t.impact };
  return {
    title: message.split('.')[0] || 'Problema de accesibilidad detectado',
    description: message,
    recommendation: 'Revisa la recomendación WCAG correspondiente.',
    impact: 'Puede afectar la experiencia de usuarios con discapacidades.',
  };
}

function pa11yIssuesToIssues(pa11yIssues: Pa11yIssue[]): Issue[] {
  const issues: Issue[] = [];
  for (const pi of pa11yIssues) {
    const ruleId = extractRuleId(pi.code);
    const severity = mapPa11ySeverity(pi.code);
    const type = mapPa11yType(pi.code, pi.message);
    const trans = translatePa11y(ruleId, pi.message);
    issues.push({
      severity,
      type,
      title: trans.title,
      description: trans.description,
      selector: pi.selector || 'unknown',
      recommendation: trans.recommendation,
      impact: trans.impact,
      source: 'pa11y',
      ruleId,
    });
  }
  return issues;
}

export async function runPa11y(url: string): Promise<Issue[]> {
  // Let pa11y launch its own browser to avoid Playwright version conflicts
  const pa11yModule = await import('pa11y');
  const pa11yFn = (pa11yModule as unknown as { default: typeof import('pa11y') }).default ?? pa11yModule;

  const options: Record<string, unknown> = {
    standard: 'WCAG2AA',
    timeout: 30000,
    wait: 2000,
    chromeLaunchConfig: {
      args: ['--no-sandbox', '--disable-setuid-sandbox'],
    },
  };

  const result = await (pa11yFn as unknown as (url: string, opts?: Record<string, unknown>) => Promise<Pa11yResult>)(url, options);

  return pa11yIssuesToIssues(result.issues ?? []);
}

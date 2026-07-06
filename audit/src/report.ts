// report.ts — merges all results into final JSON structure

import type { AuditResult, Issue, Scores, Summary, ScreenshotInfo } from './types.js';

// Build summary from issues
export function buildSummary(issues: Issue[]): Summary {
  return {
    critical: issues.filter(i => i.severity === 'critical').length,
    serious: issues.filter(i => i.severity === 'serious').length,
    moderate: issues.filter(i => i.severity === 'moderate').length,
    minor: issues.filter(i => i.severity === 'minor').length,
  };
}

// Deduplicate issues from axe + pa11y
export function deduplicateIssues(issues: Issue[]): Issue[] {
  const seen = new Set<string>();
  const result: Issue[] = [];

  for (const issue of issues) {
    // Key by type + selector + title (rounded)
    const key = `${issue.type}:${issue.selector}:${issue.title}`;
    if (!seen.has(key)) {
      seen.add(key);
      result.push(issue);
    }
  }

  return result;
}

// Build final report
export function buildReport(
  url: string,
  scores: Scores,
  issues: Issue[],
  screenshots: ScreenshotInfo,
): AuditResult {
  const deduped = deduplicateIssues(issues);
  const summary = buildSummary(deduped);

  return {
    url,
    checkedAt: new Date().toISOString(),
    scores,
    issues: deduped,
    summary,
    screenshots,
  };
}

// Default scores when Lighthouse fails
export function defaultScores(): Scores {
  return {
    accessibility: 0,
    performance: 0,
    seo: 0,
    bestPractices: 0,
  };
}

// Default screenshots when screenshot capture fails
export function defaultScreenshots(): ScreenshotInfo {
  return {
    desktop: null,
    mobile: null,
  };
}

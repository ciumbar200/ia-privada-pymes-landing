// types.ts — TypeScript types for audit results

export type Severity = 'critical' | 'serious' | 'moderate' | 'minor';

export type IssueType =
  | 'contrast'
  | 'keyboard'
  | 'forms'
  | 'aria'
  | 'images'
  | 'structure'
  | 'mobile'
  | 'language'
  | 'other';

export interface Issue {
  severity: Severity;
  type: IssueType;
  title: string;
  description: string;
  selector: string;
  recommendation: string;
  impact: string;
  source: 'axe' | 'pa11y';
  ruleId?: string;
}

export interface Scores {
  accessibility: number;
  performance: number;
  seo: number;
  bestPractices: number;
}

export interface Summary {
  critical: number;
  serious: number;
  moderate: number;
  minor: number;
}

export interface ScreenshotInfo {
  desktop: string | null;
  mobile: string | null;
}

export interface AuditResult {
  url: string;
  checkedAt: string;
  scores: Scores;
  issues: Issue[];
  summary: Summary;
  screenshots: ScreenshotInfo;
}

// axe-core types (partial, what we use)
export interface AxeRule {
  id: string;
  impact?: 'minor' | 'moderate' | 'serious' | 'critical';
  tags: string[];
  description: string;
  help: string;
}

export interface AxeNodeResult {
  html: string;
  target: string[];
  failureSummary?: string;
}

export interface AxeViolation {
  id: string;
  impact?: 'minor' | 'moderate' | 'serious' | 'critical';
  tags: string[];
  description: string;
  help: string;
  helpUrl: string;
  nodes: AxeNodeResult[];
}

export interface AxeResults {
  violations: AxeViolation[];
  passes: unknown[];
  incomplete: unknown[];
  inapplicable: unknown[];
  timestamp: string;
  url: string;
}

// pa11y types
export interface Pa11yResult {
  documentTitle: string;
  pageUrl: string;
  issues: Pa11yIssue[];
}

export interface Pa11yIssue {
  code: string;
  message: string;
  messageCode?: string;
  context: string;
  selector: string;
  runner: string;
  runnerExtras?: Record<string, unknown>;
}

// Lighthouse types
export interface LighthouseResult {
  categories: {
    accessibility?: { score: number | null };
    performance?: { score: number | null };
    seo?: { score: number | null };
    'best-practices'?: { score: number | null };
  };
}

declare module 'pa11y' {
  export interface Pa11yIssue {
    code: string;
    message: string;
    messageCode?: string;
    context: string;
    selector: string;
    runner: string;
    runnerExtras?: Record<string, unknown>;
  }
  export interface Pa11yResult {
    documentTitle: string;
    pageUrl: string;
    issues: Pa11yIssue[];
  }
  export interface Pa11yOptions {
    browser?: unknown;
    standard?: string;
    timeout?: number;
    wait?: number;
    [key: string]: unknown;
  }
  export default function pa11y(url: string, options?: Pa11yOptions): Promise<Pa11yResult>;
  export function pa11y(url: string, options?: Pa11yOptions): Promise<Pa11yResult>;
}

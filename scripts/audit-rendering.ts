#!/usr/bin/env node
/**
 * Next.js Rendering Strategy Auditor
 *
 * Analyzes page files to determine their rendering strategy and provide
 * recommendations based on best practices and project requirements.
 *
 * Usage:
 *   pnpm audit:rendering                    # Audit all pages
 *   pnpm audit:rendering src/app/page.tsx   # Audit specific page
 *   pnpm audit:rendering --verbose          # Detailed output
 */

import * as fs from "fs";
import * as path from "path";
import { execSync } from "child_process";

// ANSI color codes for terminal output
const colors = {
  reset: "\x1b[0m",
  bright: "\x1b[1m",
  red: "\x1b[31m",
  green: "\x1b[32m",
  yellow: "\x1b[33m",
  blue: "\x1b[34m",
  magenta: "\x1b[35m",
  cyan: "\x1b[36m",
  white: "\x1b[37m",
};

interface RenderingSignals {
  hasUseClient: boolean;
  hasCookies: boolean;
  hasHeaders: boolean;
  hasSearchParams: boolean;
  hasNoStoreCache: boolean;
  hasRevalidate: boolean;
  revalidateValue?: number;
  hasSuspense: boolean;
  hasGenerateStaticParams: boolean;
  hasDynamicImport: boolean;
  hasUseEffect: boolean;
  hasUseState: boolean;
  fetchCalls: Array<{ cache?: string; revalidate?: number }>;
}

interface PageAnalysis {
  filePath: string;
  detectedStrategy: "SSG" | "SSR" | "ISR" | "CSR" | "Hybrid" | "Unknown";
  confidence: "High" | "Medium" | "Low";
  signals: RenderingSignals;
  recommendations: string[];
  warnings: string[];
  tradeoffs: string[];
  seoStatus: "Excellent" | "Good" | "Poor" | "None";
  performanceScore: number; // 0-100
}

interface AuditReport {
  totalPages: number;
  analyses: PageAnalysis[];
  summary: {
    ssg: number;
    ssr: number;
    isr: number;
    csr: number;
    hybrid: number;
    unknown: number;
  };
}

class RenderingStrategyAuditor {
  private verbose: boolean = false;

  constructor(verbose: boolean = false) {
    this.verbose = verbose;
  }

  /**
   * Main entry point - audit pages
   */
  public audit(targetPath?: string): AuditReport {
    const pages = this.findPages(targetPath);
    const analyses: PageAnalysis[] = [];

    console.log(
      `\n${colors.bright}${colors.cyan}🔍 Next.js Rendering Strategy Auditor${colors.reset}\n`,
    );
    console.log(`Analyzing ${pages.length} page(s)...\n`);

    for (const pagePath of pages) {
      const analysis = this.analyzePage(pagePath);
      analyses.push(analysis);
      this.printAnalysis(analysis);
    }

    const report = this.generateReport(analyses);
    this.printSummary(report);

    return report;
  }

  /**
   * Find all page.tsx files in the app directory
   */
  private findPages(targetPath?: string): string[] {
    const appDir = path.join(process.cwd(), "src", "app");

    if (targetPath) {
      const resolvedPath = path.resolve(targetPath);
      if (!fs.existsSync(resolvedPath)) {
        console.error(
          `${colors.red}Error: File not found: ${targetPath}${colors.reset}`,
        );
        process.exit(1);
      }
      return [resolvedPath];
    }

    const pages: string[] = [];

    const walk = (dir: string) => {
      const files = fs.readdirSync(dir);

      for (const file of files) {
        const filePath = path.join(dir, file);
        const stat = fs.statSync(filePath);

        if (stat.isDirectory()) {
          // Skip certain directories
          if (
            !["node_modules", ".next", "components", "utils", "api"].includes(
              file,
            )
          ) {
            walk(filePath);
          }
        } else if (file === "page.tsx" || file === "page.ts") {
          pages.push(filePath);
        }
      }
    };

    if (fs.existsSync(appDir)) {
      walk(appDir);
    }

    return pages;
  }

  /**
   * Analyze a single page file
   */
  private analyzePage(filePath: string): PageAnalysis {
    const content = fs.readFileSync(filePath, "utf-8");
    const signals = this.detectSignals(content);
    const strategy = this.determineStrategy(signals);
    const recommendations = this.generateRecommendations(
      filePath,
      signals,
      strategy,
    );
    const warnings = this.generateWarnings(signals, strategy);
    const tradeoffs = this.generateTradeoffs(strategy);
    const seoStatus = this.evaluateSEO(signals, strategy);
    const performanceScore = this.calculatePerformanceScore(signals, strategy);

    return {
      filePath: this.getRelativePath(filePath),
      detectedStrategy: strategy.mode,
      confidence: strategy.confidence,
      signals,
      recommendations,
      warnings,
      tradeoffs,
      seoStatus,
      performanceScore,
    };
  }

  /**
   * Detect rendering signals in code
   */
  private detectSignals(content: string): RenderingSignals {
    const signals: RenderingSignals = {
      hasUseClient: /'use client'|"use client"/.test(content),
      hasCookies:
        /\bimport\s+{[^}]*cookies[^}]*}\s+from\s+['"]next\/headers['"]/.test(
          content,
        ) || /\bcookies\s*\(\)/.test(content),
      hasHeaders:
        /\bimport\s+{[^}]*headers[^}]*}\s+from\s+['"]next\/headers['"]/.test(
          content,
        ) || /\bheaders\s*\(\)/.test(content),
      hasSearchParams: /searchParams/.test(content),
      hasNoStoreCache: /cache:\s*['"]no-store['"]/.test(content),
      hasRevalidate: /export\s+const\s+revalidate\s*=/.test(content),
      hasSuspense: /<Suspense/.test(content),
      hasGenerateStaticParams:
        /export\s+async\s+function\s+generateStaticParams/.test(content),
      hasDynamicImport: /dynamic\s*\(/.test(content),
      hasUseEffect: /useEffect/.test(content),
      hasUseState: /useState/.test(content),
      fetchCalls: [],
    };

    // Extract revalidate value
    const revalidateMatch = content.match(
      /export\s+const\s+revalidate\s*=\s*(\d+)/,
    );
    if (revalidateMatch) {
      signals.revalidateValue = parseInt(revalidateMatch[1], 10);
    }

    // Extract fetch calls with cache options
    const fetchRegex = /fetch\s*\([^)]*{([^}]*cache[^}]*)}/g;
    let match;
    while ((match = fetchRegex.exec(content)) !== null) {
      const cacheMatch = match[1].match(/cache:\s*['"]([^'"]+)['"]/);
      const revalidateMatch = match[1].match(/revalidate:\s*(\d+)/);

      signals.fetchCalls.push({
        cache: cacheMatch ? cacheMatch[1] : undefined,
        revalidate: revalidateMatch
          ? parseInt(revalidateMatch[1], 10)
          : undefined,
      });
    }

    return signals;
  }

  /**
   * Determine rendering strategy based on signals
   */
  private determineStrategy(signals: RenderingSignals): {
    mode: PageAnalysis["detectedStrategy"];
    confidence: PageAnalysis["confidence"];
  } {
    // Client-side rendering
    if (signals.hasUseClient) {
      const hasServerSignals =
        signals.hasCookies ||
        signals.hasHeaders ||
        signals.hasRevalidate ||
        signals.hasGenerateStaticParams;

      if (hasServerSignals) {
        return { mode: "Hybrid", confidence: "High" };
      }
      return { mode: "CSR", confidence: "High" };
    }

    // Dynamic rendering (SSR)
    if (signals.hasCookies || signals.hasHeaders || signals.hasNoStoreCache) {
      const hasStaticSignals =
        signals.hasRevalidate || signals.hasGenerateStaticParams;

      if (hasStaticSignals) {
        return { mode: "Hybrid", confidence: "Medium" };
      }
      return { mode: "SSR", confidence: "High" };
    }

    // ISR
    if (signals.hasRevalidate || signals.fetchCalls.some((f) => f.revalidate)) {
      return { mode: "ISR", confidence: "High" };
    }

    // Static with generateStaticParams
    if (signals.hasGenerateStaticParams) {
      return { mode: "SSG", confidence: "High" };
    }

    // Hybrid with Suspense
    if (signals.hasSuspense) {
      return { mode: "Hybrid", confidence: "Medium" };
    }

    // Default to SSG but with low confidence
    return { mode: "SSG", confidence: "Low" };
  }

  /**
   * Generate recommendations based on analysis
   */
  private generateRecommendations(
    filePath: string,
    signals: RenderingSignals,
    strategy: {
      mode: PageAnalysis["detectedStrategy"];
      confidence: PageAnalysis["confidence"];
    },
  ): string[] {
    const recommendations: string[] = [];
    const isHomePage =
      filePath.includes("app/page.tsx") && !filePath.includes("[");
    const isBlogPost = filePath.includes("[blogSlug]");
    const isCountryPage =
      filePath.includes("[categorySlug]") && !filePath.includes("[blogSlug]");

    // Confidence-based recommendations
    if (strategy.confidence === "Low") {
      recommendations.push(
        "⚠️ Strategy detection has low confidence. Consider adding explicit rendering hints.",
      );
    }

    // Page-specific recommendations based on project context
    if (isHomePage && strategy.mode !== "ISR") {
      recommendations.push(
        "💡 Homepage should use ISR with 1-hour revalidation for fresh blog content",
      );
      recommendations.push("   Add: export const revalidate = 3600;");
    }

    if (isBlogPost && strategy.mode === "SSG") {
      recommendations.push(
        "💡 Blog posts benefit from ISR for updated view counts and comments",
      );
      recommendations.push(
        "   Consider: export const revalidate = 21600; // 6 hours",
      );
    }

    if (isCountryPage && strategy.mode === "SSR") {
      recommendations.push(
        "💡 Country pages rarely change - consider Static with Suspense for dynamic sections",
      );
    }

    // Strategy-specific recommendations
    if (strategy.mode === "SSR" && !signals.hasSuspense) {
      recommendations.push(
        "🚀 Add Suspense boundaries to stream content and improve TTFB",
      );
    }

    if (strategy.mode === "CSR" && !signals.hasUseClient) {
      recommendations.push(
        '⚠️ Detected client-side patterns without "use client" directive',
      );
    }

    if (
      strategy.mode === "ISR" &&
      signals.revalidateValue &&
      signals.revalidateValue > 86400
    ) {
      recommendations.push(
        "⏱️ Revalidation interval > 24h - consider static generation instead",
      );
    }

    if (
      signals.fetchCalls.length > 0 &&
      !signals.fetchCalls.some((f) => f.cache || f.revalidate)
    ) {
      recommendations.push(
        "📦 Add explicit cache strategy to fetch calls for predictable behavior",
      );
    }

    // SEO recommendations
    if (
      strategy.mode === "CSR" &&
      !filePath.includes("dashboard") &&
      !filePath.includes("admin")
    ) {
      recommendations.push(
        "🔍 CSR pages have poor SEO - move critical content to server rendering",
      );
    }

    return recommendations;
  }

  /**
   * Generate warnings about potential issues
   */
  private generateWarnings(
    signals: RenderingSignals,
    strategy: { mode: PageAnalysis["detectedStrategy"] },
  ): string[] {
    const warnings: string[] = [];

    if (signals.hasCookies && !signals.hasSuspense) {
      warnings.push(
        "⚠️ Dynamic rendering without Suspense may cause slow TTFB",
      );
    }

    if (strategy.mode === "SSR" && signals.fetchCalls.length > 3) {
      warnings.push(
        "⚠️ Multiple fetch calls in SSR can compound latency - consider parallel fetching",
      );
    }

    if (
      signals.hasRevalidate &&
      signals.revalidateValue &&
      signals.revalidateValue < 60
    ) {
      warnings.push(
        "⚠️ Very short revalidation interval may cause thundering herd problems",
      );
    }

    if (
      strategy.mode === "CSR" &&
      signals.hasUseEffect &&
      signals.fetchCalls.length === 0
    ) {
      warnings.push(
        "⚠️ Client component may be fetching without proper loading states",
      );
    }

    if (signals.hasNoStoreCache && signals.hasRevalidate) {
      warnings.push(
        "⚠️ Conflicting cache strategies detected - no-store overrides revalidate",
      );
    }

    return warnings;
  }

  /**
   * Generate trade-offs explanation
   */
  private generateTradeoffs(strategy: {
    mode: PageAnalysis["detectedStrategy"];
  }): string[] {
    const tradeoffMap: Record<PageAnalysis["detectedStrategy"], string[]> = {
      SSG: [
        "✅ Best performance and SEO",
        "❌ Content may be stale until rebuild",
        "💰 Free CDN caching, higher build times",
      ],
      SSR: [
        "✅ Always fresh data and personalized",
        "❌ Slower TTFB and higher server costs",
        "💰 Better for authenticated content",
      ],
      ISR: [
        "✅ Static speed with periodic freshness",
        "❌ Eventual consistency, complex invalidation",
        "💰 Good balance for most use cases",
      ],
      CSR: [
        "✅ Rich interactivity and offline capability",
        "❌ No SEO and slower initial paint",
        "💰 Shifts work to client",
      ],
      Hybrid: [
        "✅ Best of multiple strategies",
        "❌ More complex to implement and debug",
        "💰 Flexible but requires careful design",
      ],
      Unknown: ["❓ Strategy unclear - needs explicit configuration"],
    };

    return tradeoffMap[strategy.mode] || [];
  }

  /**
   * Evaluate SEO status
   */
  private evaluateSEO(
    signals: RenderingSignals,
    strategy: { mode: PageAnalysis["detectedStrategy"] },
  ): PageAnalysis["seoStatus"] {
    if (strategy.mode === "CSR" && !signals.hasSuspense) {
      return "None";
    }

    if (strategy.mode === "SSR" || strategy.mode === "Hybrid") {
      return "Good";
    }

    if (strategy.mode === "SSG" || strategy.mode === "ISR") {
      return "Excellent";
    }

    return "Poor";
  }

  /**
   * Calculate performance score (0-100)
   */
  private calculatePerformanceScore(
    signals: RenderingSignals,
    strategy: { mode: PageAnalysis["detectedStrategy"] },
  ): number {
    let score = 50; // Base score

    // Strategy bonuses/penalties
    const strategyScores: Record<PageAnalysis["detectedStrategy"], number> = {
      SSG: 95,
      ISR: 85,
      Hybrid: 75,
      SSR: 60,
      CSR: 40,
      Unknown: 30,
    };

    score = strategyScores[strategy.mode];

    // Adjustments
    if (signals.hasSuspense) score += 5;
    if (signals.hasGenerateStaticParams) score += 5;
    if (signals.hasCookies && !signals.hasSuspense) score -= 10;
    if (signals.fetchCalls.length > 5) score -= 10;
    if (
      signals.hasRevalidate &&
      signals.revalidateValue &&
      signals.revalidateValue > 3600
    )
      score += 5;

    return Math.max(0, Math.min(100, score));
  }

  /**
   * Print individual page analysis
   */
  private printAnalysis(analysis: PageAnalysis): void {
    const strategyColor = {
      SSG: colors.green,
      ISR: colors.cyan,
      SSR: colors.yellow,
      CSR: colors.magenta,
      Hybrid: colors.blue,
      Unknown: colors.red,
    }[analysis.detectedStrategy];

    const seoColor = {
      Excellent: colors.green,
      Good: colors.cyan,
      Poor: colors.yellow,
      None: colors.red,
    }[analysis.seoStatus];

    const perfColor =
      analysis.performanceScore >= 80
        ? colors.green
        : analysis.performanceScore >= 60
          ? colors.yellow
          : colors.red;

    console.log(`${colors.bright}📄 ${analysis.filePath}${colors.reset}`);
    console.log(
      `   ${strategyColor}Strategy: ${analysis.detectedStrategy}${colors.reset} (${analysis.confidence} confidence)`,
    );
    console.log(`   ${seoColor}SEO: ${analysis.seoStatus}${colors.reset}`);
    console.log(
      `   ${perfColor}Performance: ${analysis.performanceScore}/100${colors.reset}`,
    );

    if (this.verbose) {
      console.log(`\n   ${colors.bright}Detected Signals:${colors.reset}`);
      console.log(`   - Use Client: ${analysis.signals.hasUseClient}`);
      console.log(
        `   - Cookies/Headers: ${analysis.signals.hasCookies || analysis.signals.hasHeaders}`,
      );
      console.log(
        `   - Revalidate: ${analysis.signals.hasRevalidate ? `Yes (${analysis.signals.revalidateValue}s)` : "No"}`,
      );
      console.log(`   - Suspense: ${analysis.signals.hasSuspense}`);
      console.log(
        `   - Static Params: ${analysis.signals.hasGenerateStaticParams}`,
      );
      console.log(`   - Fetch Calls: ${analysis.signals.fetchCalls.length}`);
    }

    if (analysis.recommendations.length > 0) {
      console.log(`\n   ${colors.bright}Recommendations:${colors.reset}`);
      analysis.recommendations.forEach((rec) => console.log(`   ${rec}`));
    }

    if (analysis.warnings.length > 0) {
      console.log(
        `\n   ${colors.yellow}${colors.bright}Warnings:${colors.reset}`,
      );
      analysis.warnings.forEach((warn) => console.log(`   ${warn}`));
    }

    if (this.verbose && analysis.tradeoffs.length > 0) {
      console.log(`\n   ${colors.bright}Trade-offs:${colors.reset}`);
      analysis.tradeoffs.forEach((trade) => console.log(`   ${trade}`));
    }

    console.log(""); // Empty line between pages
  }

  /**
   * Generate overall report
   */
  private generateReport(analyses: PageAnalysis[]): AuditReport {
    const summary = {
      ssg: 0,
      ssr: 0,
      isr: 0,
      csr: 0,
      hybrid: 0,
      unknown: 0,
    };

    analyses.forEach((analysis) => {
      const mode =
        analysis.detectedStrategy.toLowerCase() as keyof typeof summary;
      if (mode in summary) {
        summary[mode]++;
      }
    });

    return {
      totalPages: analyses.length,
      analyses,
      summary,
    };
  }

  /**
   * Print summary report
   */
  private printSummary(report: AuditReport): void {
    console.log(
      `${colors.bright}${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}`,
    );
    console.log(`${colors.bright}📊 Audit Summary${colors.reset}\n`);
    console.log(`Total Pages Analyzed: ${report.totalPages}\n`);
    console.log(`${colors.bright}Strategy Distribution:${colors.reset}`);
    console.log(
      `  ${colors.green}Static (SSG):${colors.reset}  ${report.summary.ssg} pages`,
    );
    console.log(
      `  ${colors.cyan}ISR:${colors.reset}           ${report.summary.isr} pages`,
    );
    console.log(
      `  ${colors.yellow}Dynamic (SSR):${colors.reset} ${report.summary.ssr} pages`,
    );
    console.log(
      `  ${colors.magenta}Client (CSR):${colors.reset}  ${report.summary.csr} pages`,
    );
    console.log(
      `  ${colors.blue}Hybrid:${colors.reset}        ${report.summary.hybrid} pages`,
    );
    console.log(
      `  ${colors.red}Unknown:${colors.reset}       ${report.summary.unknown} pages`,
    );

    const avgPerformance =
      report.analyses.reduce((sum, a) => sum + a.performanceScore, 0) /
      report.totalPages;
    const perfColor =
      avgPerformance >= 80
        ? colors.green
        : avgPerformance >= 60
          ? colors.yellow
          : colors.red;

    console.log(
      `\n${colors.bright}Average Performance Score:${colors.reset} ${perfColor}${avgPerformance.toFixed(1)}/100${colors.reset}`,
    );

    const totalRecommendations = report.analyses.reduce(
      (sum, a) => sum + a.recommendations.length,
      0,
    );
    const totalWarnings = report.analyses.reduce(
      (sum, a) => sum + a.warnings.length,
      0,
    );

    console.log(
      `${colors.bright}Total Recommendations:${colors.reset} ${totalRecommendations}`,
    );
    console.log(
      `${colors.bright}Total Warnings:${colors.reset} ${colors.yellow}${totalWarnings}${colors.reset}`,
    );

    console.log(
      `${colors.cyan}━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━${colors.reset}\n`,
    );
  }

  /**
   * Get relative path from project root
   */
  private getRelativePath(filePath: string): string {
    return path.relative(process.cwd(), filePath);
  }
}

// CLI execution
if (require.main === module) {
  const args = process.argv.slice(2);
  const verbose = args.includes("--verbose") || args.includes("-v");
  const targetPath = args.find(
    (arg) => !arg.startsWith("--") && !arg.startsWith("-"),
  );

  const auditor = new RenderingStrategyAuditor(verbose);

  try {
    auditor.audit(targetPath);
  } catch (error) {
    console.error(`${colors.red}Error during audit:${colors.reset}`, error);
    process.exit(1);
  }
}

export { RenderingStrategyAuditor, type PageAnalysis, type AuditReport };

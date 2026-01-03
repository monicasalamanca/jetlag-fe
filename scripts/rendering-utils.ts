/**
 * Rendering Strategy Analysis Utilities
 *
 * Helper functions for analyzing Next.js rendering strategies
 * and providing data-driven recommendations.
 */

export interface RenderingMetrics {
  ttfb: number; // Time to First Byte (ms)
  fcp: number; // First Contentful Paint (ms)
  lcp: number; // Largest Contentful Paint (ms)
  buildTime: number; // Build time (ms)
  serverCost: number; // Relative cost (0-100)
  seoScore: number; // SEO effectiveness (0-100)
}

export type RenderingStrategy = "SSG" | "SSR" | "ISR" | "CSR" | "Hybrid";

export interface StrategyRecommendation {
  strategy: RenderingStrategy;
  confidence: number; // 0-100
  reasoning: string;
  metrics: RenderingMetrics;
  tradeoffs: {
    pros: string[];
    cons: string[];
  };
}

/**
 * Estimate performance metrics for a given rendering strategy
 */
export function estimateMetrics(
  strategy: RenderingStrategy,
  options: {
    dataFetchCount?: number;
    hasSlowAPI?: boolean;
    pageSize?: number; // KB
    revalidateInterval?: number; // seconds
  } = {},
): RenderingMetrics {
  const {
    dataFetchCount = 1,
    hasSlowAPI = false,
    pageSize = 100,
    revalidateInterval = 3600,
  } = options;

  const baseMetrics: Record<RenderingStrategy, RenderingMetrics> = {
    SSG: {
      ttfb: 50,
      fcp: 300,
      lcp: 600,
      buildTime: 1000,
      serverCost: 5,
      seoScore: 100,
    },
    ISR: {
      ttfb: 100,
      fcp: 350,
      lcp: 700,
      buildTime: 500,
      serverCost: 15,
      seoScore: 95,
    },
    SSR: {
      ttfb: 300,
      fcp: 600,
      lcp: 1200,
      buildTime: 100,
      serverCost: 50,
      seoScore: 90,
    },
    CSR: {
      ttfb: 50,
      fcp: 800,
      lcp: 1500,
      buildTime: 100,
      serverCost: 10,
      seoScore: 20,
    },
    Hybrid: {
      ttfb: 150,
      fcp: 450,
      lcp: 900,
      buildTime: 300,
      serverCost: 30,
      seoScore: 85,
    },
  };

  const metrics = { ...baseMetrics[strategy] };

  // Adjust based on data fetching
  if (strategy === "SSR" || strategy === "Hybrid") {
    metrics.ttfb += dataFetchCount * 50;
    if (hasSlowAPI) {
      metrics.ttfb += 500;
      metrics.fcp += 500;
      metrics.lcp += 500;
    }
  }

  // Adjust ISR based on revalidation
  if (strategy === "ISR") {
    const revalidationFactor = Math.max(1, 3600 / revalidateInterval);
    metrics.serverCost *= revalidationFactor;
  }

  // Page size impact
  const sizeMultiplier = pageSize / 100;
  metrics.fcp *= sizeMultiplier;
  metrics.lcp *= sizeMultiplier;

  return metrics;
}

/**
 * Calculate recommendation score based on requirements
 */
export function scoreStrategy(
  strategy: RenderingStrategy,
  requirements: {
    seoImportance: "critical" | "important" | "low" | "none";
    freshnessRequirement: "real-time" | "minutes" | "hours" | "days" | "never";
    trafficVolume: "low" | "medium" | "high" | "very-high";
    personalization: boolean;
    performancePriority: "critical" | "important" | "moderate";
  },
): number {
  let score = 50; // Base score

  // SEO scoring
  const seoScores: Record<RenderingStrategy, Record<string, number>> = {
    SSG: { critical: 30, important: 25, low: 15, none: 0 },
    ISR: { critical: 25, important: 25, low: 15, none: 0 },
    SSR: { critical: 20, important: 20, low: 15, none: 0 },
    CSR: { critical: -30, important: -20, low: 5, none: 10 },
    Hybrid: { critical: 20, important: 20, low: 15, none: 5 },
  };
  score += seoScores[strategy][requirements.seoImportance];

  // Freshness scoring
  const freshnessScores: Record<RenderingStrategy, Record<string, number>> = {
    SSG: { "real-time": -30, minutes: -20, hours: -10, days: 10, never: 20 },
    ISR: { "real-time": -20, minutes: -10, hours: 15, days: 20, never: 10 },
    SSR: { "real-time": 25, minutes: 25, hours: 15, days: 5, never: -10 },
    CSR: { "real-time": 20, minutes: 20, hours: 10, days: 5, never: 0 },
    Hybrid: { "real-time": 15, minutes: 15, hours: 20, days: 15, never: 5 },
  };
  score += freshnessScores[strategy][requirements.freshnessRequirement];

  // Traffic volume scoring (prefer caching for high traffic)
  const trafficScores: Record<RenderingStrategy, Record<string, number>> = {
    SSG: { low: 5, medium: 10, high: 20, "very-high": 25 },
    ISR: { low: 5, medium: 10, high: 20, "very-high": 20 },
    SSR: { low: 10, medium: 5, high: -10, "very-high": -20 },
    CSR: { low: 5, medium: 5, high: 10, "very-high": 15 },
    Hybrid: { low: 5, medium: 10, high: 15, "very-high": 10 },
  };
  score += trafficScores[strategy][requirements.trafficVolume];

  // Personalization
  if (requirements.personalization) {
    const personalizationBonus: Record<RenderingStrategy, number> = {
      SSG: -20,
      ISR: -15,
      SSR: 20,
      CSR: 25,
      Hybrid: 15,
    };
    score += personalizationBonus[strategy];
  }

  // Performance priority
  const performanceScores: Record<RenderingStrategy, Record<string, number>> = {
    SSG: { critical: 25, important: 20, moderate: 15 },
    ISR: { critical: 20, important: 20, moderate: 15 },
    SSR: { critical: -10, important: 5, moderate: 10 },
    CSR: { critical: -15, important: 0, moderate: 10 },
    Hybrid: { critical: 10, important: 15, moderate: 15 },
  };
  score += performanceScores[strategy][requirements.performancePriority];

  return Math.max(0, Math.min(100, score));
}

/**
 * Get recommended strategy based on requirements
 */
export function getRecommendation(requirements: {
  seoImportance: "critical" | "important" | "low" | "none";
  freshnessRequirement: "real-time" | "minutes" | "hours" | "days" | "never";
  trafficVolume: "low" | "medium" | "high" | "very-high";
  personalization: boolean;
  performancePriority: "critical" | "important" | "moderate";
  dataFetchCount?: number;
  hasSlowAPI?: boolean;
  revalidateInterval?: number;
}): StrategyRecommendation {
  const strategies: RenderingStrategy[] = [
    "SSG",
    "ISR",
    "SSR",
    "CSR",
    "Hybrid",
  ];

  const recommendations = strategies.map((strategy) => {
    const score = scoreStrategy(strategy, requirements);
    const metrics = estimateMetrics(strategy, {
      dataFetchCount: requirements.dataFetchCount,
      hasSlowAPI: requirements.hasSlowAPI,
      revalidateInterval: requirements.revalidateInterval,
    });

    return {
      strategy,
      score,
      metrics,
    };
  });

  // Sort by score descending
  recommendations.sort((a, b) => b.score - a.score);
  const best = recommendations[0];

  return {
    strategy: best.strategy,
    confidence: best.score,
    reasoning: generateReasoning(best.strategy, requirements),
    metrics: best.metrics,
    tradeoffs: generateTradeoffs(best.strategy),
  };
}

/**
 * Generate human-readable reasoning
 */
function generateReasoning(
  strategy: RenderingStrategy,
  requirements: {
    seoImportance: string;
    freshnessRequirement: string;
    trafficVolume: string;
    personalization: boolean;
  },
): string {
  const reasons: string[] = [];

  if (strategy === "SSG") {
    reasons.push("Static generation provides optimal performance and SEO");
    if (
      requirements.freshnessRequirement === "never" ||
      requirements.freshnessRequirement === "days"
    ) {
      reasons.push(
        "Content rarely changes, making build-time generation ideal",
      );
    }
    if (
      requirements.trafficVolume === "high" ||
      requirements.trafficVolume === "very-high"
    ) {
      reasons.push("High traffic benefits from aggressive CDN caching");
    }
  } else if (strategy === "ISR") {
    reasons.push("ISR balances static performance with periodic freshness");
    if (requirements.freshnessRequirement === "hours") {
      reasons.push("Hourly updates fit well with time-based revalidation");
    }
    if (
      requirements.seoImportance === "critical" ||
      requirements.seoImportance === "important"
    ) {
      reasons.push("Maintains excellent SEO while allowing content updates");
    }
  } else if (strategy === "SSR") {
    reasons.push("Server-side rendering provides fresh, request-time data");
    if (requirements.personalization) {
      reasons.push("Personalization requires request-specific rendering");
    }
    if (
      requirements.freshnessRequirement === "real-time" ||
      requirements.freshnessRequirement === "minutes"
    ) {
      reasons.push("Real-time data requirements demand per-request rendering");
    }
  } else if (strategy === "CSR") {
    reasons.push("Client-side rendering enables rich interactivity");
    if (
      requirements.seoImportance === "none" ||
      requirements.seoImportance === "low"
    ) {
      reasons.push("SEO not critical for this page");
    }
    if (requirements.personalization) {
      reasons.push("User-specific content best handled on client");
    }
  } else if (strategy === "Hybrid") {
    reasons.push("Hybrid approach combines benefits of multiple strategies");
    reasons.push("Static shell with dynamic sections provides optimal UX");
  }

  return reasons.join(". ") + ".";
}

/**
 * Generate trade-offs for strategy
 */
function generateTradeoffs(strategy: RenderingStrategy): {
  pros: string[];
  cons: string[];
} {
  const tradeoffs: Record<
    RenderingStrategy,
    { pros: string[]; cons: string[] }
  > = {
    SSG: {
      pros: [
        "Fastest TTFB and page loads",
        "Best SEO with fully pre-rendered HTML",
        "Lowest hosting costs with CDN caching",
        "Most reliable - no server dependencies",
      ],
      cons: [
        "Content stale until next build",
        "Build time increases with page count",
        "No personalization without client-side code",
        "May require full rebuild for content changes",
      ],
    },
    ISR: {
      pros: [
        "Static performance with periodic updates",
        "Excellent SEO like SSG",
        "Predictable staleness window",
        "Scales well with CDN caching",
      ],
      cons: [
        "Eventual consistency - some users see old content",
        "Complex invalidation for urgent updates",
        "Revalidation costs on Vercel",
        "Debugging cache issues can be tricky",
      ],
    },
    SSR: {
      pros: [
        "Always fresh, real-time data",
        "Full personalization capability",
        "Good SEO with server-rendered HTML",
        "Request-time context (auth, location, etc.)",
      ],
      cons: [
        "Slower TTFB - waits for server",
        "Higher hosting costs per request",
        "CDN caching limited or none",
        "Server load increases with traffic",
      ],
    },
    CSR: {
      pros: [
        "Rich interactivity and instant updates",
        "Offloads work to client",
        "Good for authenticated content",
        "Offline capability with service workers",
      ],
      cons: [
        "Poor or no SEO for fetched content",
        "Slower initial content display",
        "Depends on client device performance",
        "Network failures affect UX",
      ],
    },
    Hybrid: {
      pros: [
        "Best of multiple worlds",
        "Optimize each section independently",
        "Fast shell with streaming content",
        "Flexible for complex pages",
      ],
      cons: [
        "More complex to implement and debug",
        "Requires careful Suspense boundary design",
        "Can create waterfall loading patterns",
        "Testing requires all paths",
      ],
    },
  };

  return tradeoffs[strategy];
}

/**
 * Calculate revalidation interval based on update frequency
 */
export function calculateRevalidateInterval(
  updateFrequency:
    | "real-time"
    | "minutes"
    | "hourly"
    | "daily"
    | "weekly"
    | "never",
): number | false {
  const intervals: Record<string, number | false> = {
    "real-time": false, // Use SSR instead
    minutes: 60, // 1 minute
    hourly: 3600, // 1 hour
    daily: 86400, // 24 hours
    weekly: 604800, // 7 days
    never: false, // Use SSG instead
  };

  return intervals[updateFrequency];
}

/**
 * Check if page should use Suspense boundaries
 */
export function shouldUseSuspense(
  dataFetchCount: number,
  hasSlowAPI: boolean,
  strategy: RenderingStrategy,
): boolean {
  // Always good for SSR/Hybrid
  if (strategy === "SSR" || strategy === "Hybrid") {
    return true;
  }

  // For ISR/SSG, use if there are slow APIs
  if ((strategy === "ISR" || strategy === "SSG") && hasSlowAPI) {
    return true;
  }

  // Multiple data sources benefit from Suspense
  if (dataFetchCount > 2) {
    return true;
  }

  return false;
}

/**
 * Estimate Core Web Vitals for strategy
 */
export function estimateCoreWebVitals(
  strategy: RenderingStrategy,
  options: {
    imageCount?: number;
    scriptCount?: number;
    dataFetchCount?: number;
  } = {},
): {
  lcp: number;
  fid: number;
  cls: number;
  rating: "good" | "needs-improvement" | "poor";
} {
  const { imageCount = 5, scriptCount = 3, dataFetchCount = 1 } = options;
  const metrics = estimateMetrics(strategy, { dataFetchCount });

  let lcp = metrics.lcp;
  let fid = 50; // Base FID
  let cls = 0.05; // Base CLS

  // Image impact on LCP
  lcp += imageCount * 20;

  // Script impact on FID
  fid += scriptCount * 10;

  // Strategy-specific adjustments
  if (strategy === "CSR") {
    fid += 50; // More JS execution
    cls += 0.05; // Content shifting
  }

  if (strategy === "SSR" && dataFetchCount > 3) {
    lcp += 200; // Waterfall fetching
  }

  // Determine rating
  let rating: "good" | "needs-improvement" | "poor";
  if (lcp <= 2500 && fid <= 100 && cls <= 0.1) {
    rating = "good";
  } else if (lcp <= 4000 && fid <= 300 && cls <= 0.25) {
    rating = "needs-improvement";
  } else {
    rating = "poor";
  }

  return { lcp, fid, cls, rating };
}

/**
 * Validation: Check for anti-patterns
 */
export function detectAntiPatterns(code: string): Array<{
  pattern: string;
  severity: "error" | "warning" | "info";
  message: string;
  suggestion: string;
}> {
  const issues: Array<{
    pattern: string;
    severity: "error" | "warning" | "info";
    message: string;
    suggestion: string;
  }> = [];

  // CSR with SEO content
  if (/'use client'/.test(code) && /<article|<h1/.test(code)) {
    issues.push({
      pattern: "CSR with SEO content",
      severity: "error",
      message: "Client component contains SEO-critical content",
      suggestion: "Move article/heading content to server component",
    });
  }

  // Dynamic without Suspense
  if (/cookies\(\)|headers\(\)/.test(code) && !/<Suspense/.test(code)) {
    issues.push({
      pattern: "Dynamic without Suspense",
      severity: "warning",
      message: "Dynamic rendering without Suspense boundaries",
      suggestion: "Add Suspense to improve TTFB",
    });
  }

  // Very short revalidation
  if (/revalidate\s*=\s*[1-5]\b/.test(code)) {
    issues.push({
      pattern: "Very short revalidation",
      severity: "warning",
      message: "Revalidation interval < 10 seconds may cause issues",
      suggestion: "Increase interval or use SSR",
    });
  }

  // No-store with revalidate
  if (/cache:\s*['"]no-store['"]/.test(code) && /revalidate/.test(code)) {
    issues.push({
      pattern: "Conflicting cache strategies",
      severity: "error",
      message: "no-store cache conflicts with revalidate",
      suggestion: "Remove one of the conflicting strategies",
    });
  }

  // Multiple useEffect fetches
  const useEffectCount = (code.match(/useEffect/g) || []).length;
  const fetchInUseEffect = /useEffect[\s\S]*fetch/.test(code);
  if (useEffectCount > 2 && fetchInUseEffect) {
    issues.push({
      pattern: "Multiple client fetches",
      severity: "info",
      message: "Multiple useEffect data fetches detected",
      suggestion: "Consider consolidating or using server-side fetching",
    });
  }

  return issues;
}

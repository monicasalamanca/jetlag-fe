/**
 * Example: Using Rendering Strategy Utilities Programmatically
 *
 * This file demonstrates how to use the rendering strategy utilities
 * to make data-driven decisions about page rendering.
 */

import {
  getRecommendation,
  estimateMetrics,
  estimateCoreWebVitals,
  calculateRevalidateInterval,
  shouldUseSuspense,
  detectAntiPatterns,
} from "./rendering-utils";

// Example 1: Get recommendation for homepage
console.log("=== Example 1: Homepage Recommendation ===\n");

const homepageRequirements = {
  seoImportance: "critical" as const,
  freshnessRequirement: "hours" as const,
  trafficVolume: "high" as const,
  personalization: false,
  performancePriority: "critical" as const,
  dataFetchCount: 2,
  hasSlowAPI: false,
  revalidateInterval: 3600,
};

const homepageRec = getRecommendation(homepageRequirements);

console.log("Recommended Strategy:", homepageRec.strategy);
console.log("Confidence:", homepageRec.confidence + "/100");
console.log("\nReasoning:", homepageRec.reasoning);
console.log("\nEstimated Metrics:");
console.log("- TTFB:", homepageRec.metrics.ttfb + "ms");
console.log("- FCP:", homepageRec.metrics.fcp + "ms");
console.log("- LCP:", homepageRec.metrics.lcp + "ms");
console.log("- SEO Score:", homepageRec.metrics.seoScore + "/100");
console.log("\nPros:");
homepageRec.tradeoffs.pros.forEach((pro) => console.log("  ✅", pro));
console.log("\nCons:");
homepageRec.tradeoffs.cons.forEach((con) => console.log("  ❌", con));

// Example 2: Blog post recommendation
console.log("\n\n=== Example 2: Blog Post Recommendation ===\n");

const blogPostRequirements = {
  seoImportance: "critical" as const,
  freshnessRequirement: "days" as const,
  trafficVolume: "medium" as const,
  personalization: false,
  performancePriority: "important" as const,
  dataFetchCount: 1,
  hasSlowAPI: false,
  revalidateInterval: 21600, // 6 hours
};

const blogPostRec = getRecommendation(blogPostRequirements);

console.log("Recommended Strategy:", blogPostRec.strategy);
console.log("Confidence:", blogPostRec.confidence + "/100");
console.log("Reasoning:", blogPostRec.reasoning);

// Calculate optimal revalidation
const optimalRevalidate = calculateRevalidateInterval("daily");
console.log("\nOptimal Revalidation:", optimalRevalidate, "seconds");

// Example 3: User dashboard (authenticated)
console.log("\n\n=== Example 3: User Dashboard ===\n");

const dashboardRequirements = {
  seoImportance: "none" as const,
  freshnessRequirement: "real-time" as const,
  trafficVolume: "low" as const,
  personalization: true,
  performancePriority: "moderate" as const,
  dataFetchCount: 5,
  hasSlowAPI: true,
};

const dashboardRec = getRecommendation(dashboardRequirements);

console.log("Recommended Strategy:", dashboardRec.strategy);
console.log("Confidence:", dashboardRec.confidence + "/100");
console.log("Reasoning:", dashboardRec.reasoning);

// Should use Suspense?
const useSuspense = shouldUseSuspense(5, true, dashboardRec.strategy);
console.log("\nShould use Suspense?", useSuspense ? "Yes" : "No");

// Example 4: Estimate Core Web Vitals
console.log("\n\n=== Example 4: Core Web Vitals Estimation ===\n");

const cwvSSG = estimateCoreWebVitals("SSG", {
  imageCount: 8,
  scriptCount: 4,
  dataFetchCount: 0,
});

const cwvSSR = estimateCoreWebVitals("SSR", {
  imageCount: 8,
  scriptCount: 4,
  dataFetchCount: 3,
});

console.log("SSG Core Web Vitals:");
console.log("- LCP:", cwvSSG.lcp + "ms");
console.log("- FID:", cwvSSG.fid + "ms");
console.log("- CLS:", cwvSSG.cls);
console.log("- Rating:", cwvSSG.rating.toUpperCase());

console.log("\nSSR Core Web Vitals:");
console.log("- LCP:", cwvSSR.lcp + "ms");
console.log("- FID:", cwvSSR.fid + "ms");
console.log("- CLS:", cwvSSR.cls);
console.log("- Rating:", cwvSSR.rating.toUpperCase());

// Example 5: Detect anti-patterns
console.log("\n\n=== Example 5: Anti-Pattern Detection ===\n");

const badCode = `
'use client';

export default function BlogPost() {
  const [post, setPost] = useState();
  
  useEffect(() => {
    fetch('/api/post').then(r => r.json()).then(setPost);
  }, []);
  
  return (
    <article>
      <h1>{post?.title}</h1>
      <div>{post?.content}</div>
    </article>
  );
}
`;

const issues = detectAntiPatterns(badCode);

console.log("Found", issues.length, "issue(s):");
issues.forEach((issue, i) => {
  console.log(`\n${i + 1}. ${issue.pattern} [${issue.severity.toUpperCase()}]`);
  console.log("   Message:", issue.message);
  console.log("   Suggestion:", issue.suggestion);
});

// Example 6: Compare strategies for same page
console.log("\n\n=== Example 6: Strategy Comparison ===\n");

const pageRequirements = {
  seoImportance: "important" as const,
  freshnessRequirement: "hours" as const,
  trafficVolume: "high" as const,
  personalization: false,
  performancePriority: "important" as const,
};

const strategies: Array<"SSG" | "SSR" | "ISR"> = ["SSG", "SSR", "ISR"];

console.log("Comparing strategies for blog listing page:\n");

strategies.forEach((strategy) => {
  const metrics = estimateMetrics(strategy, {
    dataFetchCount: 1,
    hasSlowAPI: false,
    revalidateInterval: 1800, // 30 minutes for ISR
  });

  console.log(`${strategy}:`);
  console.log("  TTFB:", metrics.ttfb + "ms");
  console.log("  LCP:", metrics.lcp + "ms");
  console.log("  SEO Score:", metrics.seoScore + "/100");
  console.log("  Server Cost:", metrics.serverCost + "/100");
  console.log("");
});

// Example 7: Migration analysis
console.log("\n=== Example 7: Migration Analysis ===\n");

const currentStrategy = "SSG";
const targetStrategy = "ISR";

const currentMetrics = estimateMetrics(currentStrategy);
const targetMetrics = estimateMetrics(targetStrategy, {
  revalidateInterval: 3600,
});

console.log(`Migration from ${currentStrategy} to ${targetStrategy}:\n`);
console.log("Performance Impact:");
console.log(
  "  TTFB:",
  currentMetrics.ttfb + "ms →",
  targetMetrics.ttfb + "ms",
  `(${targetMetrics.ttfb > currentMetrics.ttfb ? "+" : ""}${targetMetrics.ttfb - currentMetrics.ttfb}ms)`,
);
console.log(
  "  LCP:",
  currentMetrics.lcp + "ms →",
  targetMetrics.lcp + "ms",
  `(${targetMetrics.lcp > currentMetrics.lcp ? "+" : ""}${targetMetrics.lcp - currentMetrics.lcp}ms)`,
);
console.log("\nCost Impact:");
console.log(
  "  Server Cost:",
  currentMetrics.serverCost + "/100 →",
  targetMetrics.serverCost + "/100",
  `(${targetMetrics.serverCost > currentMetrics.serverCost ? "+" : ""}${targetMetrics.serverCost - currentMetrics.serverCost})`,
);
console.log("\nSEO Impact:");
console.log(
  "  SEO Score:",
  currentMetrics.seoScore + "/100 →",
  targetMetrics.seoScore + "/100",
  `(${targetMetrics.seoScore > currentMetrics.seoScore ? "+" : ""}${targetMetrics.seoScore - currentMetrics.seoScore})`,
);

console.log("\n\n=== All Examples Complete ===\n");

export {};

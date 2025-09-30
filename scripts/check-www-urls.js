#!/usr/bin/env node

/**
 * Quick script to check for www URLs in your build output
 * Run with: node scripts/check-www-urls.js
 */

const fs = require("fs");
const path = require("path");

function findWwwUrls(dir) {
  const results = [];

  function searchDirectory(dirPath) {
    const items = fs.readdirSync(dirPath);

    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stat = fs.statSync(fullPath);

      if (
        stat.isDirectory() &&
        !item.includes("node_modules") &&
        !item.includes(".git")
      ) {
        searchDirectory(fullPath);
      } else if (
        stat.isFile() &&
        (item.endsWith(".html") || item.endsWith(".js"))
      ) {
        const content = fs.readFileSync(fullPath, "utf8");
        const wwwMatches = content.match(/www\.thejetlagchronicles\.com/g);

        if (wwwMatches) {
          results.push({
            file: fullPath,
            matches: wwwMatches.length,
          });
        }
      }
    }
  }

  searchDirectory(dir);
  return results;
}

// Check build output
const buildDir = path.join(process.cwd(), ".next");

if (fs.existsSync(buildDir)) {
  console.log("🔍 Checking for www URLs in build output...\n");

  const results = findWwwUrls(buildDir);

  if (results.length === 0) {
    console.log("✅ No www URLs found in build output!");
  } else {
    console.log("🚨 Found www URLs in build output:");
    results.forEach((result) => {
      console.log(`   ${result.file}: ${result.matches} matches`);
    });
    console.log(
      "\n💡 These URLs should be updated in Strapi content to use thejetlagchronicles.com (without www)",
    );
  }
} else {
  console.log("❌ Build directory not found. Run `npm run build` first.");
}

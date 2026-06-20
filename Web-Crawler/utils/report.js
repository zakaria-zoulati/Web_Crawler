const fs = require("fs");
const path = require("path");

// Build the markdown report string from the crawl results.
function buildReport(target, maxUrls, maxDepth, pages) {
  const entries = Object.entries(pages);

  const lines = [];
  lines.push("# Crawl Report");
  lines.push("");
  lines.push(`- **Target:** ${target}`);
  lines.push(`- **Max URLs:** ${maxUrls}`);
  lines.push(`- **Max Depth:** ${maxDepth}`);
  lines.push(`- **Findings (pages found):** ${entries.length}`);
  lines.push("");
  lines.push("## Pages");
  lines.push("");
  lines.push("| URL | Times visited |");
  lines.push("| --- | --- |");

  // most-visited first
  const sorted = entries.sort((a, b) => b[1] - a[1]);
  for (const [url, count] of sorted) {
    lines.push(`| ${url} | ${count} |`);
  }
  lines.push("");

  return lines.join("\n");
}

// Write the report to report.md in the project root, overwriting each run.
function writeReport(target, maxUrls, maxDepth, pages) {
  const report = buildReport(target, maxUrls, maxDepth, pages);
  const outPath = path.join(__dirname, "..", "report.md");
  fs.writeFileSync(outPath, report, "utf8");
  return outPath;
}

module.exports = {
  buildReport,
  writeReport,
};

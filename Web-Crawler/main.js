const { crawlPage } = require("./utils/crawl");
const { isNumber, isValidURL } = require("./utils/validation");
const { writeReport } = require("./utils/report");

async function main() {
  if (process.argv.length < 3) {
    console.log("No Params Provided");
    process.exit(1);
  }

  if (process.argv.length > 5) {
    console.log("Too much args provided");
    process.exit(1);
  }

  const url = process.argv[2];
  if (!isValidURL(url)) {
    console.log(`${url} is not a valid url.`);
    process.exit(1);
  }

  // defaults come from .env (load with: node --env-file=.env main.js ...)
  let maxUrls = Number(process.env.MAX_URLS);
  let maxDepth = Number(process.env.MAX_DEPTH);

  if (process.argv.length >= 4) {
    maxUrls = Number(process.argv[3]);
    if (!isNumber(maxUrls) || maxUrls < 1) {
      console.log(`${process.argv[3]} is not a valid number`);
      process.exit(1);
    }
  }

  if (process.argv.length === 5) {
    maxDepth = Number(process.argv[4]);
    if (!isNumber(maxDepth) || maxDepth < 1) {
      console.log(`${process.argv[4]} is not a valid number`);
      process.exit(1);
    }
  }

  console.log(`Starting Crawl of ${url} (maxUrls: ${maxUrls}, maxDepth: ${maxDepth})`);

  const result = await crawlPage(url, url, {}, maxUrls, maxDepth, 0);

  const reportPath = writeReport(url, maxUrls, maxDepth, result);
  console.log(`Report written to ${reportPath}`);
}

main();

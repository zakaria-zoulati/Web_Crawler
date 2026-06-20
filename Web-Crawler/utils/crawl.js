const { JSDOM } = require("jsdom");

const USER_AGENTS = [
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.1 Safari/605.1.15",
  "Mozilla/5.0 (X11; Linux x86_64; rv:121.0) Gecko/20100101 Firefox/121.0",
  "Mozilla/5.0 (Windows NT 10.0; Win64; x64; rv:121.0) Gecko/20100101 Firefox/121.0",
  "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
];

function randomUserAgent() {
  return USER_AGENTS[Math.floor(Math.random() * USER_AGENTS.length)];
}

async function crawlPage(
  baseURL,
  currentURL,
  pages,
  maxUrls = Infinity,
  maxDepth = Infinity,
  depth = 0,
  visited = new Set()
) {
  const currentUrlObj = new URL(currentURL);
  const baseUrlObj = new URL(baseURL);
  if (currentUrlObj.hostname !== baseUrlObj.hostname) {
    return pages;
  }

  // stop descending once we've gone past the allowed depth
  if (depth > maxDepth) {
    return pages;
  }

  const normalizedURL = normalizeURL(currentURL);

  if (visited.has(normalizedURL)) {
    if (pages[normalizedURL] > 0) {
      pages[normalizedURL]++;
    }
    return pages;
  }
  visited.add(normalizedURL);

  if (Object.keys(pages).length >= maxUrls) {
    return pages;
  }

  pages[normalizedURL] = 1;

  console.log(`crawling ${currentURL}`);
  let htmlBody = "";
  try {
    const resp = await fetch(currentURL, {
      headers: { "User-Agent": randomUserAgent() },
    });
    if (resp.status > 399) {
      console.log(`Got HTTP error, status code: ${resp.status}`);
      return pages;
    }
    const contentType = resp.headers.get("content-type");
    if (!contentType.includes("text/html")) {
      console.log(`Got non-html response: ${contentType}`);
      return pages;
    }
    htmlBody = await resp.text();
  } catch (err) {
    console.log(err.message);
  }

  const nextURLs = getURLsFromHTML(htmlBody, baseURL);
  for (const nextURL of nextURLs) {
    pages = await crawlPage(
      baseURL,
      nextURL,
      pages,
      maxUrls,
      maxDepth,
      depth + 1,
      visited
    );
  }

  return pages;
}

function getURLsFromHTML(htmlBody, baseURL) {
  const urls = [];
  const dom = new JSDOM(htmlBody);
  const aElements = dom.window.document.querySelectorAll("a");
  for (const aElement of aElements) {
    try {
      urls.push(new URL(aElement.href, baseURL).href);
    } catch (err) {
      console.log(`${err.message}: ${aElement.href}`);
    }
  }
  return urls;
}

function normalizeURL(url) {
  const urlObj = new URL(url);
  let fullPath = `${urlObj.host}${urlObj.pathname}`;
  if (fullPath.length > 0 && fullPath.slice(-1) === "/") {
    fullPath = fullPath.slice(0, -1);
  }
  return fullPath;
}

module.exports = {
  crawlPage,
  normalizeURL,
  getURLsFromHTML,
};
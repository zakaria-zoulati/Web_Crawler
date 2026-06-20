const { JSDOM } = require("jsdom");

async function crawlPage(
  baseURL,
  currentURL,
  pages,
  maxUrls = Infinity,
  maxDepth = Infinity,
  depth = 0
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

  if (pages[normalizedURL] > 0) {
    pages[normalizedURL]++;
    return pages;
  }

  // stop discovering new pages once we've hit the URL limit
  if (Object.keys(pages).length >= maxUrls) {
    return pages;
  }

  pages[normalizedURL] = 1;

  console.log(`crawling ${currentURL}`);
  let htmlBody = "";
  try {
    const resp = await fetch(currentURL);
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
      depth + 1
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
      // resolve every href against baseURL: handles absolute, root-relative
      // (/path) and document-relative (index.html) links alike
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
# Web Crawler

A simple, recursive web crawler built with Node.js that maps out all internal links on a website. This crawler respects domain boundaries and tracks how many times each page is referenced.

## Features

- 🔍 Recursively crawls all internal links within a domain
- 📊 Tracks the number of times each page is referenced
- 🔗 Handles both absolute and relative URLs
- ✅ Validates content type (HTML only)
- 🛡️ Respects domain boundaries (won't crawl external sites)
- 🧪 Comprehensive test coverage

## Installation

1. Clone the repository:
```bash
git clone <https://github.com/zakaria-zoulati/Web_Crawler.git>
cd <Web_Crawler>
```

2. Install dependencies:
```bash
npm install
```

## Usage

Run the crawler with a target URL:

```bash
node main.js <website-url>
```

### Example

```bash
node main.js https://example.com
```

The crawler will:
- Start at the provided URL
- Extract all links from the page
- Recursively crawl each internal link
- Print a map of all pages and their reference counts

### Output

The crawler outputs an object showing normalized URLs as keys and the number of times each page was referenced:

```javascript
{
  'example.com': 1,
  'example.com/about': 3,
  'example.com/contact': 2,
  'example.com/blog': 5
}
```

## Running Tests

The project includes a comprehensive test suite using Jest:

```bash
npm test
```

### Test Coverage

Tests cover:
- URL normalization (trailing slashes, case sensitivity)
- HTML parsing (absolute URLs, relative URLs, invalid URLs)
- Mixed URL scenarios

## Project Structure

```
.
├── crawl.js           # Core crawling logic
├── crawl.test.js      # Test suite
├── main.js            # CLI entry point
├── package.json       # Dependencies and scripts
└── README.md          # Documentation
```

## How It Works

### URL Normalization

The crawler normalizes URLs to avoid duplicate entries:
- Removes trailing slashes
- Converts hostnames to lowercase
- Strips protocols and focuses on host + pathname

### Crawling Algorithm

1. Check if the URL is within the same domain
2. Normalize the URL
3. If already visited, increment the counter
4. If new, fetch the page content
5. Validate the response (status code and content type)
6. Extract all links from the HTML
7. Recursively crawl each discovered link

### Error Handling

The crawler handles:
- HTTP errors (4xx, 5xx status codes)
- Non-HTML content types
- Invalid URLs
- Network failures

## Dependencies

- **jsdom**: HTML parsing and DOM manipulation
- **jest**: Testing framework (dev dependency)

## Command Line Arguments

The crawler accepts exactly one argument:

- **Too few arguments**: Displays "No website Provided" and exits
- **Correct usage**: `node main.js <url>`
- **Too many arguments**: Displays "Too many command args" and exits

## Limitations

- Only crawls HTML pages
- Does not handle JavaScript-rendered content
- No rate limiting (may overwhelm servers)
- No politeness delay between requests
- Does not respect robots.txt

<div align="center">

<img src="https://raw.githubusercontent.com/twitter/twemoji/master/assets/svg/1f577.svg" width="120" alt="spider" />

# Web-Crawler

**A small, single-domain web crawler written in Node.js.**

Give it a URL and it walks the site, following links that stay on the same
host, counts how often each page is linked, and writes a tidy Markdown report.

</div>

---

## Features

- **Single-domain**, only follows links on the same host as the target, so it never wanders off-site.
- **Depth & URL limits**, cap how deep it crawls and how many pages it collects.
- **Smart link resolution**, handles absolute, root-relative (`/path`), and document-relative (`index.html`) links.
- **Visit counting**, tracks how many times each page is linked to.
- **Markdown report**, results are saved to `report.md` on completion.
- **Configurable defaults**, sensible limits come from a `.env` file.

## Requirements

- [Node.js](https://nodejs.org/) **v20.6+** (uses the built-in `--env-file` flag)

## Installation

```bash
cd Web-Crawler
npm install
```

## Configuration

Default limits live in a `.env` file at the project root:

```env
MAX_URLS=1000
MAX_DEPTH=5
```

- `MAX_URLS`: maximum number of unique pages to collect.
- `MAX_DEPTH`: maximum number of link-hops away from the starting page.

## Usage

```bash
node --env-file=.env main.js <url> [maxUrls] [maxDepth]
```

| Argument   | Required | Description                                              |
| ---------- | :------: | -------------------------------------------------------- |
| `url`      |   Yes    | The site to crawl (must be `http://` or `https://`).     |
| `maxUrls`  |    No    | Override `MAX_URLS` — stop after this many pages.         |
| `maxDepth` |    No    | Override `MAX_DEPTH` — stop after this many link-hops.    |

> The `--env-file=.env` flag loads your default limits. Without it, you must pass
> `maxUrls` and `maxDepth` on the command line.

### Examples

```bash
# Crawl using the limits from .env
node --env-file=.env main.js https://books.toscrape.com

# Crawl at most 5 pages, only 1 hop deep
node --env-file=.env main.js https://books.toscrape.com 5 1
```

## Output

When the crawl finishes, a **`report.md`** is written to the project root.

#!/usr/bin/env node
import fs from 'node:fs';
import path from 'node:path';

const SITE_ROOT = 'https://www.shinecortinas.com';
const BUILD_DIR = process.argv[2] ? path.resolve(process.argv[2]) : process.cwd();
const REDIRECTS_PATH = path.join(BUILD_DIR, '_redirects');

const EXCLUDED_PATH_PREFIXES = ['/post/', '/produtos-cidade/', '/portfolio-collections/'];
const EXCLUDED_EXACT_PATHS = new Set(['/404.html']);

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  const files = [];

  for (const entry of entries) {
    if (entry.name === '.git' || entry.name === 'node_modules') continue;
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) files.push(...walk(full));
    else files.push(full);
  }

  return files;
}

function loadRedirects() {
  const redirects = new Map();
  if (!fs.existsSync(REDIRECTS_PATH)) return redirects;

  const lines = fs.readFileSync(REDIRECTS_PATH, 'utf8').split(/\r?\n/);
  for (const line of lines) {
    const trimmed = line.trim();
    if (!trimmed || trimmed.startsWith('#')) continue;
    const parts = trimmed.split(/\s+/);
    if (parts.length < 2) continue;

    const [source, dest] = parts;
    if (source.includes('*') || source.includes(':')) continue;
    redirects.set(source, dest);
  }

  return redirects;
}

function toPathFromFile(filePath) {
  const rel = path.relative(BUILD_DIR, filePath).split(path.sep).join('/');
  return `/${rel}`;
}

function extractCanonicalUrl(htmlContent) {
  const canonicalMatch = htmlContent.match(/<link[^>]*rel=["']canonical["'][^>]*href=["']([^"']+)["'][^>]*>/i)
    || htmlContent.match(/<link[^>]*href=["']([^"']+)["'][^>]*rel=["']canonical["'][^>]*>/i);

  return canonicalMatch?.[1] ?? null;
}

function isExcludedPath(urlPath) {
  if (EXCLUDED_EXACT_PATHS.has(urlPath)) return true;
  return EXCLUDED_PATH_PREFIXES.some((prefix) => urlPath.startsWith(prefix));
}

function normalizeCanonicalUrl(urlPath, redirects) {
  if (urlPath === '/index.html') return `${SITE_ROOT}/`;

  if (urlPath.endsWith('/index.html')) {
    const canonicalPath = urlPath.slice(0, -'index.html'.length);
    return `${SITE_ROOT}${canonicalPath}`;
  }

  if (urlPath.endsWith('.html')) {
    const folderPath = urlPath.slice(0, -'.html'.length);
    const folderIndex = path.join(BUILD_DIR, folderPath, 'index.html');

    if (fs.existsSync(folderIndex) || redirects.get(urlPath)?.endsWith("/")) {
      return `${SITE_ROOT}${folderPath}/`;
    }
  }

  return `${SITE_ROOT}${urlPath}`;
}

function canonicalFromHtml(htmlContent) {
  const canonical = extractCanonicalUrl(htmlContent);
  if (!canonical) return null;

  try {
    const parsed = new URL(canonical);
    if (parsed.origin !== SITE_ROOT) return null;
    const hasExtension = /\.[a-z0-9]+$/i.test(parsed.pathname);
    const pathname = parsed.pathname === '/' ? '/' : (parsed.pathname.endsWith('/') || hasExtension ? parsed.pathname : `${parsed.pathname}/`);
    return `${SITE_ROOT}${pathname}${parsed.search}`;
  } catch {
    return null;
  }
}

function createSitemapXml(urls) {
  const lastmod = new Date().toISOString().slice(0, 10);
  const body = urls
    .map((url) => `  <url>\n    <loc>${url}</loc>\n    <lastmod>${lastmod}</lastmod>\n  </url>`)
    .join('\n');

  return `<?xml version="1.0" encoding="UTF-8"?>\n<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">\n${body}\n</urlset>\n`;
}

const redirects = loadRedirects();
const htmlFiles = walk(BUILD_DIR).filter((file) => file.endsWith('.html'));

const urls = new Set();

for (const file of htmlFiles) {
  const urlPath = toPathFromFile(file);
  if (isExcludedPath(urlPath)) continue;

  const htmlContent = fs.readFileSync(file, 'utf8');
  if (urlPath !== "/index.html" && redirects.has(urlPath)) continue;

  const canonicalInPage = canonicalFromHtml(htmlContent);

  const finalUrl = canonicalInPage ?? normalizeCanonicalUrl(urlPath, redirects);

  const parsedPath = new URL(finalUrl).pathname;
  if (isExcludedPath(parsedPath)) continue;

  if (finalUrl.includes('/post/') || finalUrl.includes('/produtos-cidade/') || finalUrl.includes('/portfolio-collections/')) continue;
  urls.add(finalUrl);
}

const sortedUrls = [...urls].sort((a, b) => a.localeCompare(b));
const sitemapXml = createSitemapXml(sortedUrls);

fs.writeFileSync(path.join(BUILD_DIR, 'sitemap.xml'), sitemapXml, 'utf8');
fs.writeFileSync(
  path.join(BUILD_DIR, 'robots.txt'),
  'User-agent: *\nAllow: /\n\nSitemap: https://www.shinecortinas.com/sitemap.xml\n',
  'utf8',
);

console.log(`Generated sitemap.xml with ${sortedUrls.length} canonical URLs.`);

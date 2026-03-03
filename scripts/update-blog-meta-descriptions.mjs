import { readdirSync, readFileSync, writeFileSync, statSync } from 'node:fs';
import path from 'node:path';

const BLOG_DIR = path.resolve('blog');
const MAX_LEN = 158;
const MIN_SEO_LEN = 50;

const stripTags = (value) => value
  .replace(/<script[\s\S]*?<\/script>/gi, ' ')
  .replace(/<style[\s\S]*?<\/style>/gi, ' ')
  .replace(/<[^>]+>/g, ' ')
  .replace(/&nbsp;/gi, ' ')
  .replace(/&amp;/gi, '&')
  .replace(/&quot;|&#34;|&#39;|&apos;/gi, ' ')
  .replace(/\s+/g, ' ')
  .trim();

const cleanDescription = (value) => {
  if (!value) return '';
  let cleaned = stripTags(value)
    .replace(/["']/g, '')
    .replace(/\s+/g, ' ')
    .trim();

  cleaned = cleaned.replace(/\b(Agende agora)(?:\s+\1\b)+/gi, '$1');

  if (cleaned.length > MAX_LEN) {
    cleaned = `${cleaned.slice(0, MAX_LEN - 1).trimEnd()}…`;
  }

  return cleaned;
};

const extractMetaContent = (html, key) => {
  const patterns = [
    new RegExp(`<meta[^>]+name=["']${key}["'][^>]+content=["']([^"']+)["'][^>]*>`, 'i'),
    new RegExp(`<meta[^>]+content=["']([^"']+)["'][^>]+name=["']${key}["'][^>]*>`, 'i'),
    new RegExp(`<meta[^>]+property=["']${key}["'][^>]+content=["']([^"']+)["'][^>]*>`, 'i')
  ];

  for (const pattern of patterns) {
    const match = html.match(pattern);
    if (match?.[1]) return match[1];
  }

  return '';
};

const extractParagraphs = (html) => {
  const mainMatch = html.match(/<main[\s\S]*?<\/main>/i);
  const body = mainMatch ? mainMatch[0] : html;
  const paragraphs = [...body.matchAll(/<p\b[^>]*>([\s\S]*?)<\/p>/gi)]
    .map((m) => cleanDescription(m[1]))
    .filter(Boolean)
    .filter((text) => !/^←\s*Voltar/i.test(text))
    .filter((text) => !/Atualizado em:/i.test(text));
  return paragraphs;
};

const extractTitle = (html) => {
  const h1 = html.match(/<h1\b[^>]*>([\s\S]*?)<\/h1>/i);
  if (h1?.[1]) return cleanDescription(h1[1]);
  const title = html.match(/<title>([\s\S]*?)<\/title>/i);
  return cleanDescription(title?.[1] ?? 'conteúdo do blog');
};

const getDescription = (html) => {
  const seo = cleanDescription(extractMetaContent(html, 'seoDescription'));
  if (seo.length >= MIN_SEO_LEN) return seo;

  const ogDescription = cleanDescription(extractMetaContent(html, 'og:description'));
  if (ogDescription.length >= MIN_SEO_LEN) return ogDescription;

  const excerpt = cleanDescription(extractMetaContent(html, 'excerpt'));
  if (excerpt) return excerpt;

  const summary = cleanDescription(extractMetaContent(html, 'summary'));
  if (summary) return summary;

  const [firstParagraph] = extractParagraphs(html);
  if (firstParagraph) return firstParagraph;

  const title = extractTitle(html);
  return cleanDescription(`Guia técnico ShineCortinas sobre ${title}, com critérios de especificação, instalação e desempenho para evitar retrabalho.`);
};

const updateMetaDescription = (html, description) => {
  const tags = [
    /<meta[^>]+name=["']description["'][^>]*>/i,
    /<meta[^>]+content=["'][^"']*["'][^>]+name=["']description["'][^>]*>/i
  ];

  for (const tag of tags) {
    if (tag.test(html)) {
      return html.replace(tag, `<meta name="description" content="${description}">`);
    }
  }

  return html.replace(/<title>[\s\S]*?<\/title>/i, (m) => `${m}\n  <meta name="description" content="${description}">`);
};

for (const entry of readdirSync(BLOG_DIR)) {
  const file = path.join(BLOG_DIR, entry, 'index.html');
  if (entry === 'index.html' || !statSync(path.join(BLOG_DIR, entry)).isDirectory()) continue;
  if (!statSync(file).isFile()) continue;

  const html = readFileSync(file, 'utf8');
  const description = getDescription(html);
  const updated = updateMetaDescription(html, description);

  writeFileSync(file, updated);
  console.log(`${entry}: ${description}`);
}

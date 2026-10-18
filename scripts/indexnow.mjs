#!/usr/bin/env node
// Dispara todas as URLs canônicas do sitemap.xml via protocolo IndexNow
// para atualizar instantaneamente o índice do Bing (ChatGPT / Copilot) e do Yandex.
// Uso: node scripts/indexnow.mjs

import fs from 'node:fs';
import path from 'node:path';

const HOST = 'www.shinecortinas.com';
const KEY = 'd8a4f2c9e1b74360a5c8e2d9f1b3a7c4';
const KEY_LOCATION = `https://${HOST}/${KEY}.txt`;
const SITEMAP_PATH = path.resolve(process.cwd(), 'sitemap.xml');

const ENDPOINTS = [
  'https://api.indexnow.org/indexnow',
  'https://www.bing.com/indexnow',
  'https://yandex.com/indexnow',
];

const xml = fs.readFileSync(SITEMAP_PATH, 'utf8');
const urlList = [...xml.matchAll(/<loc>([^<]+)<\/loc>/g)].map((m) => m[1].trim());

if (!urlList.length) {
  console.error('Nenhuma URL encontrada em sitemap.xml');
  process.exit(1);
}

console.log(`Enviando ${urlList.length} URLs via IndexNow (chave: ${KEY})...`);

const payload = JSON.stringify({
  host: HOST,
  key: KEY,
  keyLocation: KEY_LOCATION,
  urlList,
});

for (const endpoint of ENDPOINTS) {
  try {
    const res = await fetch(endpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json; charset=utf-8' },
      body: payload,
    });
    const text = await res.text();
    console.log(`[${res.status}] ${endpoint}${text ? ` — ${text.slice(0, 120)}` : ''}`);
  } catch (err) {
    console.error(`[ERRO] ${endpoint}: ${err.message}`);
  }
}

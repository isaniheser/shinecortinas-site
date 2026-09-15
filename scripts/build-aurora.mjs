// Aplica somente a moldura aprovada às páginas existentes: conteúdo e metadados preservados.
// Os geradores individuais também usam estes mesmos partials.
import {readFileSync,writeFileSync,readdirSync} from 'node:fs';
import {join,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
import {auroraHeader,auroraHead} from './aurora-layout.mjs';
import {tail} from './partials.mjs';
const ROOT=join(dirname(fileURLToPath(import.meta.url)),'..');
function walk(dir){return readdirSync(dir,{withFileTypes:true}).flatMap(e=>{
  if(e.name.startsWith('.')||['node_modules','docs','scripts','lp','app'].includes(e.name))return [];
  const p=join(dir,e.name);return e.isDirectory()?walk(p):e.name.endsWith('.html')?[p]:[];
});}
let count=0;
for(const file of walk(ROOT)){
  let html=readFileSync(file,'utf8');
  if(!html.includes('class="sl-header"'))continue;
  const split=html.indexOf('<body');
  let body=html.slice(split).replace(/<body([^>]*)>/,(_,attrs)=>`<body${attrs.replace(/\sdata-(concept|logo-finish)="[^"]*"/g,'')} data-concept="ambientes" data-logo-finish="aurora">`);
  body=body.replace(/\s*<nav class="sl-nav-fallback"[\s\S]*?<\/nav>/g,'');
  body=body.replace(/<header class="sl-header">[\s\S]*?<\/header>/,()=>auroraHeader());
  body=body.replace(/\s*<a class="sl-wa"[\s\S]*?<\/a>/g,'')
    .replace(/\s*<div class="sl-bar">[\s\S]*?<\/div>/g,'')
    .replace(/\s*<nav class="sl-tabs"[\s\S]*?<\/nav>/g,'')
    .replace(/\s*<dialog class="pv-curtain-menu"[\s\S]*?<\/dialog>/g,'')
    .replace(/\s*<button type="button" class="pv-curtain-pull"[\s\S]*?<\/button>/g,'')
    .replace(/\s*<script src="\/assets\/shine-aurora\.js[^"\n]*" defer><\/script>/g,'');
  if(!/<script src="\/assets\/shine-wa\.js/.test(body))throw new Error(`Cauda desconhecida: ${file}`);
  body=body.replace(/\s*<script src="\/assets\/shine-wa\.js[\s\S]*$/,()=>tail());
  writeFileSync(file,auroraHead(html.slice(0,split))+body);count++;
}
console.log(`Aurora: cabeçalho e menu aplicados a ${count} páginas.`);

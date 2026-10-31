# Esteira de qualidade do site

Verificações automáticas que rodam no GitHub Actions. Cada regra aqui veio de um erro que já
aconteceu no site (ver `CLAUDE.md` e `docs/auditoria-2026-10-31.md`). A pasta `tests/` não vai ao
ar (o deploy apaga e o `_redirects` manda `/tests/*` para `/`).

| Camada | Quando roda | O que confere | Bloqueia o merge? |
|---|---|---|---|
| 1 · `estatico.mjs` | todo PR e push na `main` | SEO por página, schema (nota oficial, sem endereço, **avaliação literal do Google**), links e arquivos, sitemap, páginas órfãs, fatos e linguagem do `CLAUDE.md`, `_redirects` (curinga no fim, sem `301!`/410, limite de 100), arquivos internos fora do deploy, `?v=` trocado quando o CSS/JS muda | sim |
| 1b · `geradores.mjs` | todo PR e push na `main` | o HTML publicado é o que o gerador produz (home e cidades) | sim (blog/páginas: só aviso, dívida conhecida) |
| 2 · `navegador.mjs` | todo PR e push na `main` | celular de verdade (Playwright): erros de JavaScript, arquivos 404, acessibilidade (axe, WCAG 2.2 AA), fonte da identidade, página vazando para o lado, velocidade com 4G simulado (LCP, CLS, peso), gavetas da Home pelo teclado, WhatsApp por plataforma | sim |
| 3 · `ao-vivo.mjs` | depois de cada merge na `main` e toda madrugada (04:17) | o site no ar: páginas do sitemap, endereços antigos do Search Console, arquivos internos, cabeçalhos de segurança, robôs do Google/Bing/IAs, prévia do WhatsApp em JPG, domínio e 404 | abre/fecha sozinha a issue "Site no ar com problema" |

## Rodar no computador

```bash
node tests/estatico.mjs
```

```bash
node tests/geradores.mjs
```

```bash
cd tests && npm ci && npx playwright install chromium && node navegador.mjs
```

```bash
node tests/ao-vivo.mjs
```

## Erro × aviso

- **Erro** bloqueia o merge. Corrija na **fonte** (gerador ou JSON), nunca só no HTML gerado.
- **Aviso** aparece no resumo do Actions mas não bloqueia: pendências que dependem do Isani
  (`Touch Motion`, `Apple Home`, mofo/umidade) e dívidas conhecidas.

## Onde mudar as regras

- `regras-conteudo.mjs`: palavras proibidas, fatos do produto, ressalvas obrigatórias.
- `pendencias-conhecidas.json`: achado que depende de decisão do Isani vira aviso enquanto estiver
  listado. Ao resolver, apague o item.
- `axe-conhecidos.json`: violações de acessibilidade já conhecidas, por página. Ao corrigir, apague.
- Orçamentos de velocidade: topo de `navegador.mjs` (`ORCAMENTO`).

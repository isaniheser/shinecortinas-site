# Auditoria geral do site — 31/10/2026

Pedido do Isani: "análise profunda e completa em todos os sentidos". Quatro frentes em paralelo
(SEO técnico + site ao vivo, conteúdo e fatos, código/acessibilidade/velocidade/segurança) e uma
rodada de verificação independente dos 13 achados mais graves (todos confirmados).
Correções autorizadas pelo Isani na mesma conversa ("Sim pode corrigir").

## O que estava certo (não mexer)

- 59 páginas com title, description e canonical únicos e corretos, 1 H1 por página, sitemap = páginas.
- Zero link interno quebrado, zero imagem faltando, `noopener` em todo `target=_blank`.
- 55 blocos JSON-LD válidos; NAP, horário, nota 4,9/297 e `$$` idênticos em todas as páginas.
- Ao vivo: sem-www e http → `https://www` (301); endereços antigos de maior tráfego no Search Console
  (altura da cortina, 33 mil impressões; 7 tipos de forro) redirecionam certo.
- Googlebot, Bingbot, YandexBot, GPTBot, OAI-SearchBot, ClaudeBot, PerplexityBot, facebookexternalhit
  e WhatsApp recebem 200 (o script de desafio do Cloudflare não bloqueia).
- Nenhum erro de JavaScript; nenhum segredo versionado (o `.txt` da raiz é a chave pública do IndexNow).

## Corrigido em 31/10/2026

| Achado | Correção | Onde |
|---|---|---|
| `/.agents/rules/isani-estilo-criativo.md` público (200) | `.agents` na limpeza do deploy + 301 no `_redirects` | `scripts/generate-sitemap.mjs`, `build.sh`, `_redirects` |
| Prévia de link sem foto no WhatsApp/Facebook (og:image em AVIF em 46 páginas) | JPG 1200×630 em `/og/` para cada foto | todas as páginas; `scripts/build-blog.mjs` (`ogJpg`) |
| Legenda do Instagram virava "sofisticad$1"; "total"→"completo"; "16→17 anos" fixo; `#sitedobem` aprovava post | regex com grupo; regra "total" removida; anos calculados; hashtag exata (`hasTag`) | `functions/api/instagram.js` |
| Links de cidade invisíveis (1,14:1) no fechamento verde de 5 artigos | `.sl-ed-closing p a` em dourado claro sublinhado | `assets/shine-leve.css` |
| Dourado `#C6A868` como texto em fundo claro (2,2:1); notas/rótulos 3,2:1 | `--gold-ink` nos rótulos; `--muted` em `.sl-note`/`.sl-label`; `--muted` #646962 | `assets/shine-leve.css` |
| Páginas internas com Montserrat + Cinzel (fora da identidade; Cinzel nem era usado) | Plus Jakarta Sans no corpo; Playfair mantida nos títulos | `scripts/partials.mjs` (FONTS), `shine-leve.css`, HTML |
| Gavetas da Home sem foco; cartões do acervo só com mouse; `role=tablist` errado; "voltar" vazio | foco entra e volta, fundo `inert`, cartão com `<button>`, `role=group`, X/Esc desfazem o histórico | `assets/shine-home-e.js`, `.css`, `scripts/build-home.mjs` |
| `whatsapp://` sem plano B (iPad/sem app: toque morto) | se a página segue visível 2 s após o toque, abre `wa.me` | `assets/shine-wa.js` |
| Home: LCP 3,6 s (celular DPR 3 baixava `duplo.avif` de 1696 px, 223 KB) | `duplo-1100.avif` (82 KB) no `srcset` e no preload | `scripts/build-home.mjs` |
| LP com CLS 0,177 pela troca de fonte | `display=optional` | `lp/anuncio-d/index.html` |
| Sem CSP | CSP estrutural (frame-ancestors, base-uri, object-src, form-action, upgrade) sem restringir scripts, para não afetar a medição injetada pelo Cloudflare | `_headers` |
| Itatiaia: mesma resposta em 3 perguntas do FAQ (inclusive a de investimento) | resposta própria para investimento; pergunta duplicada trocada por garantia | `cidades/cidades.json` |
| "5 a 6 °C" atribuído à Wave/tecido >170 g/m² sem forro blackout | número amarrado ao forro blackout de tecido, como relato medido pelo Isani | `cidades.json` (Porto Real, Miguel Pereira, Volta Redonda, Vassouras, Resende, Piraí) |
| Motor a bateria sem "alguns modelos, mediante consulta" | ressalva no FAQ e no cartão gerados | `scripts/build-cidades.mjs` |
| "Melhor loja" e motorização com o mesmo texto nas cidades (também no FAQPage) | resposta própria por cidade | `cidades/cidades.json` |
| Depoimentos de Valença e Vassouras com texto do Google alterado (marcados como Review) | transcrição literal | `cidades/cidades.json` |
| "visita à domicílio" (9 cidades), "garantia total", "escuro total", "vedação total da fresta" | corrigidos | `cidades.json`, `build-cidades.mjs`, `paginas.mjs`, HTML |
| Ponto e vírgula visível; H1 do blog lido como "alturaideal" | corrigidos | `blog/posts.json`, `scripts/content/*`, HTML do blog |
| 404 de endereços antigos (`/cortina-voil`, `/persiana-rolo`, 2 variações de artigo, `/blog/tags/*`) | 301 | `_redirects` |
| CSS/JS com cache de 1 ano sem troca de versão | `shine-leve.css?v=17`, `shine-wa.js?v=8`, `shine-home-e.css?v=7`, `.js?v=8` | HTML + `partials.mjs` |

## Pendente: depende de resposta do Isani

1. **Mofo/umidade:** Itatiaia, Paulo de Frontin e Visconde de Mauá dizem que linho/algodão puros
   "mofam" ou "retêm umidade". Não está entre os fatos dele (ele falou de amassar, encolher, caimento).
2. **Frio na serra:** os 5 a 6 °C aparecem como redução de frio/perda de calor em Maromba, Paulo de
   Frontin, Penedo, Visconde de Mauá e Itatiaia, e como "bolsão de ar" em `build-cidades.mjs` (cartão
   do blog das 6 cidades da serra). O fato confirmado é só redução de calor.
3. **"Touch Motion" e "Apple Home":** nome comercial de fabricante e integração não confirmados
   (o Isani disse "reconhecimento de toque"; Alexa e Google Home).

## Pendente: trabalho técnico menor (não feito nesta rodada)

- Páginas de vídeo com 150–180 palavras próprias no `<main>` (`scripts/build-especiais.mjs`).
- Canibalização Home × `/cidades/volta-redonda/` (mesma estrutura de title).
- Skip link nas páginas internas; `aria` do `.pv-curtain-pull`; `tabindex` em carrossel/tabela rolável.
- Manifest: separar `any`/`maskable`; ícones de 238/88/78 KB; `favicon.svg` ainda é o "S" em texto.
- Geradores do blog e das páginas internas não reproduzem mais o HTML publicado (o HTML recebeu
  ajustes depois). Nesta rodada as mudanças foram feitas no HTML e na fonte ao mesmo tempo; antes
  de regenerar essas páginas, alinhar os geradores (ex.: `build-blog.mjs` ainda gera o `<head>` antigo).
- Fora do site: exportar de novo o Search Console (dados no repo são de 06/set); conferir se o
  Bing Places ainda mostra o telefone antigo 3338-3069; criar páginas próprias para persiana rolô,
  romana, double vision e horizontal de madeira.

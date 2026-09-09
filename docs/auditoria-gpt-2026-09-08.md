# Auditoria externa do site (GPT/"Zhaion", 08/09/2026) — resumo fiel + verificação

O Isani encomendou ao GPT uma auditoria do site e a entregou em 08/09/2026. Este arquivo
guarda **o que o relatório afirma** (condensado, sem perder achados) e, na segunda parte,
**o que foi verificado no repositório e no site ao vivo** no mesmo dia. Os dados brutos do
Search Console citados pelo relatório já estão em `docs/dados-google/gsc/` (as tabelas
diárias e por página do relatório batem exatamente com `grafico.csv` e `paginas.csv`).

## Parte 1 — O que o relatório afirma

Revisão auditada: `a8e89d4` (main). Nenhuma alteração foi feita pelo auditor.

**Resumo executivo:** base técnica boa, visual resolvido, recursos modernos já presentes.
Não recomenda reconstrução. Maior espaço de ganho: conteúdo específico e prova de projetos.
Correções prioritárias antes de tecnologia nova: redirects históricos, arquivos internos
públicos, sitemap × canonical, processo de geração.

### Avaliação por área (do relatório)

| Área | Avaliação | Direção |
|---|---|---|
| HTML e acesso ao conteúdo | Ótimo | Preservar |
| Identidade visual da home | Muito bom | Corrigir contraste; consistência nas internas |
| Recursos nativos (view transitions, popover, prefetch, reduced motion) | Acima do básico | Aperfeiçoar |
| Metadados básicos | Bom com ressalvas | Alinhar 9 URLs `.html` × canonical |
| Continuidade de URLs antigas | Precisa de correção prioritária | Redirect 301 dos dois artigos históricos |
| Conteúdo editorial | Irregular | 13 de 15 artigos repetem o mesmo texto |
| Cidades e prova | Boa estrutura, prova insuficiente | Galeria idêntica; mostruário no lugar de ambiente |
| Desempenho da home | Bom (PageSpeed móvel 89 / A11y 94 / SEO 100; LCP 3,0 s; CLS 0,015) | Fontes/CSS bloqueiam render (~1.450 ms estimados); 43 KiB em imagens |
| Processo de publicação | Precisa de correção prioritária | Raiz do repo publicada; geradores reaproveitam `<head>` |
| Shine OS | Viável, não demonstrado | API no servidor; WhatsApp continua |

### Histórico (Search Console, 05/06 a 04/09/2026, 92 dias)

541 cliques, 50.733 impressões, CTR 1,07%, posição média ≈ 6,73. 77,4% dos cliques no
celular. Por página (544 cliques): artigo antigo de altura 272 (50%), home 80, artigo antigo
de forros 63, Resende 33, Volta Redonda 16, vídeo Vassouras 15, Barra Mansa 14, bainha 12.
Lista de consultas cobre só 68 cliques (12,6%).

### Achados (confirmado / avaliação / hipótese, segundo o relatório)

1. **URLs históricas** (confirmado): `/blog/qual-a-altura-ideal-de-uma-cortina/` responde 200
   com `X-Robots-Tag: noindex` e canonical próprio; `/blog/7-tipos-de-forro-…/` responde 404.
   As regras usam `301!`, sintaxe que o Cloudflare Pages não aceita (causa candidata).
2. **Nove URLs do sitemap** terminam em `.html`, o servidor redireciona (308) para a versão
   sem extensão, e o canonical aponta de volta ao `.html` (índice de cidades + 8 vídeos).
3. **23 destinos internos** sem barra final (um redirect a mais por clique).
4. `/sobre-n%C3%B3s` retorna 404 apesar da regra.
5. Sitemap: todas as 53 entradas com a mesma data (data da execução, não da edição).
6. **Blog**: 13 dos 15 artigos repetem 13 parágrafos longos; títulos com capitalização
   mecânica; nenhum artigo tem imagem de conteúdo. O artigo antigo de altura (ainda servido)
   tinha orientações mais específicas (medir em 3 pontos, obstáculos, suporte, barra) que a
   versão nova perdeu.
7. Comparação "pela internet × com a Shine" generaliza sobre concorrentes sem evidência.
8. **Cidades**: galeria idêntica nas 15; hero igual; "ambientes executados" ao lado de foto de
   mostruário. Portfólio idem. Porto Real promete "instalação no mesmo dia da consultoria",
   diferente do processo geral (visita → aprovação → confecção → instalação).
9. **Vídeos**: 8 páginas com player e VideoObject, mas texto próprio curto.
10. **Schema**: 14 artigos com `author` = Organization enquanto a página assina Isani;
    LocalBusiness sem `@id` estável em 15 nós; Review autorreferente não gera estrelas
    (política do Google); FAQ rich result descontinuado em 07/05/2026.
11. **Fontes**: 35 de 53 páginas não carregam Playfair/Montserrat (produtos, artigos, vídeos,
    institucionais); só home e cidades carregam.
12. **Imagens**: 237 ocorrências com alt e dimensões, nenhuma com `srcset`.
13. **Contraste**: dourado `#C6A868` sobre areia `#FBFAF7` = 2,19:1 (reprova AA).
14. **Arquivos internos públicos**: `CLAUDE.md`, `docs/pendencias.md`,
    `docs/recebidos-do-isani.md` e exportação do Search Console respondem 200.
15. **Geração**: build só gera sitemap; geradores reaproveitam `<head>` do HTML existente;
    `build-especiais` pula páginas migradas.
16. **WhatsApp**: simulador grava contexto global ao abrir a home (outros botões herdam);
    cidade inferida por IP vira "Sou de X" na mensagem.
17. **robots.txt**: bloco gerenciado pelo Cloudflare bloqueia bots de treinamento; bots de
    busca de IA (OAI-SearchBot etc.) permitidos. `llms.txt` com "fundadora", contagem antiga
    de reviews e URLs sem formato Markdown (Lighthouse "agentic" 2/3).
18. **Service worker de `/app/`** (hipótese): pode servir cache antigo a quem instalou o PWA.
19. Headers básicos (`nosniff`, referrer) presentes nas 53 páginas — suspeita descartada.

### Tecnologias consideradas pelo relatório

Imediato: saída pública dedicada; fonte única de fatos. Próximo ciclo: `srcset`/AVIF
responsivo; fontes WOFF2 otimizadas. Opcional: Astro (só se o gerador próprio não der
previsibilidade), Pagefind, IndexNow (conferir se o Cloudflare já faz). Posterior: API do
Shine OS, assistente com base aprovada, simulador visual. Experimental: WebMCP (origin trial
Chrome 149). **Não fazer agora:** app pesado, 3D no hero, conteúdo em canvas, mais páginas
locais sem prova, inflação de schema, chatbot no lugar de revisão editorial.

### Fila proposta (P1 → P3)

P1: redirects históricos · arquivos internos públicos · artigos repetidos.
P2: canonical/sitemap/links · geração completa · fontes · contraste · `srcset` · contexto do
WhatsApp · galeria e casos por cidade · promessas comerciais · autoria e entidades · vídeos
com contexto · `lastmod` real · medição recente · robots × Cloudflare.
P3: `llms.txt` · cache do app antigo · busca interna/IA no site · integração/WebMCP.

## Parte 2 — Verificação (Claude, 08/09/2026, site ao vivo + repo em `a8e89d4`)

| Afirmação | Resultado | Observação |
|---|---|---|
| `301!` não funciona no Pages | **Confirmado e pior** | 47 regras com `301!` ignoradas (`/produtos`, `/cortina`, `/entre-em-contato`, `/sobre-nós`, `/artigo-*.html` → 404). Sintaxe é do Netlify. |
| Regras `/produtos-cidade/…` por cidade | **Não funcionam** (não estava no relatório) | O curinga `/produtos-cidade/*` está antes das ~120 regras específicas e captura tudo → `/cidades-atendidas.html`. |
| Bloco "BLOG E ACERVO" (`/post/…` → `/blog/`) | **Sombreado** (não estava no relatório) | O curinga `/post/*` vem antes e manda p. ex. `/post/cortina-cinza` para `/blog/cortina-cinza/`, que não existe (404 depois do redirect). |
| Bloco final (`/bio`, `/cortina-rolo`, `/persiana-vertical`, `/mapa-de-links`…) | **404** | Regras válidas, mas não aplicadas; causa não determinada. `410` também não é aceito pelo Pages. |
| Artigo antigo de altura 200 + noindex | **Confirmado; é cache** | Resposta com `age` ≈ 5,3 dias e `s-maxage=604800`: cópia em cache de um deploy de ~03/09 (o arquivo foi apagado em 05/09). Deve expirar em ~2 dias e virar 404 como o de forros. `noindex` e cache de 7 dias não vêm do repo — conferir regras no painel do Cloudflare. |
| Arquivos internos públicos | **Confirmado** | Também `scripts/*.mjs` e `docs/dados-google/perfil.json`. |
| 9 URLs `.html` no sitemap × 308 × canonical | **Confirmado** | |
| 23 destinos sem barra | **Confirmado** (23 exatos) | `/contato` 31×, `/cortinas` 17×, `/metodo` 15×… |
| 13 artigos repetidos | **Confirmado** | 13 artigos com ~830 palavras; 16 blocos (≈390 palavras) idênticos em ≥10 deles. Já era o item 1 de `pendencias.md`. |
| Fontes ausentes em 35 páginas | **Confirmado** (34 de 53) | Playfair/Montserrat caem para Georgia/sistema em produtos, blog, vídeos, institucionais. |
| Contraste 2,19:1 | **Confirmado** | Usado em kickers (10 px), números de prova, legendas da galeria, "+" do FAQ. `#8A6F3A` daria 4,56:1. |
| `author` = Organization em 14 artigos | **Confirmado** | Página assina "Por Isani Oliveira". |
| Nenhum `srcset` | **Confirmado** (0 de 252 imagens) | Item 6 de `pendencias.md`. |
| Porto Real "mesmo dia" | **Confirmado** | FAQ diz "instalação no mesmo dia da consultoria"; o passo 3 de todas as cidades diz "tudo no mesmo dia" (instalação em um dia). São promessas diferentes; a do FAQ precisa do Isani. |
| robots gerenciado × projeto | **Confirmado** | Cloudflare injeta `Disallow: /` para GPTBot, ClaudeBot, Google-Extended, Amazonbot, Applebot-Extended, CCBot, Bytespider, meta-externalagent; nosso bloco libera os mesmos logo abaixo. Bots de **busca** (OAI-SearchBot, Claude-SearchBot, PerplexityBot) seguem liberados. |
| `llms.txt` "fundadora" | Confirmado, mínimo | Uma linha ("Sobre a empresa e a fundadora"). |
| FAQ rich result descontinuado 07/05/2026 | **Confirmado** (busca na web) | FAQ continua útil para leitores e IAs; não gera mais o destaque. |
| WebMCP origin trial Chrome 149 | **Confirmado** | Experimental; não fazer agora. |
| GSC 541/50.733 e 544/51.797 | **Confirmado** | Batem com os CSVs. |
| Sem Workers no Cloudflare | Confirmado | `workers_list` = 0 (na conta conectada). |
| Astro / Pagefind / Shine OS | Opinião | Concordo: nenhum é necessário agora. |

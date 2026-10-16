# Auditoria completa do site — 16/10/2026

Escopo: layout e experiência, tecnologia e performance, SEO e GEO, conteúdo e fatos.
Base: código em `main` (commit `5545aa4`), 57 páginas HTML, site ao vivo medido com
Chromium headless (iPhone 13 e desktop 1440 px), `curl` nos cabeçalhos, script próprio
de SEO em todas as páginas. Nada foi alterado no site.

Evidências brutas (fora do repositório, válidas só nesta sessão):
`/tmp/claude-0/-home-user-shinecortinas-site/d7646f09-711f-504f-82b4-d209b6aa563e/scratchpad/seo-audit.md`,
`/tmp/claude-0/-home-user-shinecortinas-site/d7646f09-711f-504f-82b4-d209b6aa563e/scratchpad/perf-audit.md`
e 26 capturas de tela em `.../scratchpad/shots/`.

## 1. Veredito

O site está num patamar técnico raro para uma empresa local: HTML limpo, zero erro de
console, zero link quebrado em 1.933 links internos, JSON-LD válido em 53 páginas,
FAQ do schema idêntico ao visível, sitemap e canonical perfeitos, redirects sadios,
robots aberto para os buscadores de IA, `llms.txt` presente. A fundação está correta.

O que falta é polimento e, em três pontos, correção urgente. Notas por área:

| Área | Nota | Resumo |
|---|---|---|
| SEO técnico | 9/10 | Quase impecável. 3 artigos com imagem principal inexistente e 8 páginas de vídeo rasas são os únicos defeitos reais. |
| GEO / autoridade para IAs | 8/10 | Fatos consistentes, schema rico, `llms.txt`. Falta listar 21 páginas no `llms.txt` e consertar 3 contradições de produto. |
| Conversão e layout mobile | 6/10 | O puxador "Explore a Shine" cobre o botão principal de WhatsApp na dobra das páginas de cidade e de produto. Texto de 9 a 11 px e breadcrumb ilegível sobre foto. |
| Performance | 7/10 | LCP bom (0,5 a 1,3 s em laboratório). CLS ruim por causa do Rocket Loader do Cloudflare. Página de cidade com 964 KB por imagens 3 a 6 vezes maiores que o necessário. |
| Tecnologia e segurança | 8/10 | Arquitetura estática exemplar, JS próprio de 4 KB. Faltam cache longo nos assets, HSTS e fontes auto-hospedadas. |
| Conteúdo e voz | 8/10 | Blog na voz do Isani está convincente. Páginas de cidade ainda usam 149 travessões e uma afirmação ("cortinas premiadas") sem fonte. |

## 2. O que está certo e não deve ser mexido

- 1 H1 por página; 0 titles, descriptions e H1 duplicados em 57 páginas.
- Canonical correta nas 53 páginas indexáveis; sitemap = 53 URLs, `lastmod` igual ao `dateModified` em 100%.
- `_redirects` com 219 regras válidas, só 12 dinâmicas depois do primeiro curinga (limite 100), 0 cadeias, 0 sombreadas. `www` e `https` com 1 salto.
- JSON-LD: 0 erros de parse; `Review` só nas 20 avaliações reais do Google, todas visíveis na página; `aggregateRating` 4,9/294; LocalBusiness sem endereço, com horário; `priceRange` sem o bug do `$`.
- 243 perguntas de FAQ no schema, todas visíveis no HTML.
- 0 scripts de terceiros no código, 0 `gtag`/`fbq` inline (correto, a medição fica no Cloudflare).
- Menu abre em todas as páginas; sem JavaScript a navegação e o conteúdo continuam visíveis.
- Sem scroll horizontal em nenhuma página mobile.
- Arquivos internos (`CLAUDE.md`, `docs/`, `scripts/`, JSON) não vazam: todos redirecionam para `/`.

## 3. Problemas por prioridade

Critério: impacto na ordem de prioridade do Isani (ser encontrado, converter, beleza)
multiplicado por quantas páginas afeta, dividido pelo esforço.

### Prioridade 1: corrigir esta semana

**1.1 Três artigos com a imagem principal inexistente (SEO + conversão).**
`/blog/cortina-ou-persiana-na-cozinha/` aponta para `/persiana-tela-solar.avif`,
`/blog/persiana-ideal-para-cada-ambiente/` para `/persiana-ambiente.avif` e
`/blog/persiana-vertical-ou-horizontal/` para `/persiana-madeira.avif`. Nenhum dos três
arquivos existe. Cada caminho é usado 4 vezes por página: capa com `fetchpriority="high"`
(o LCP vira um 404), `og:image`, `image` do `Article` no JSON-LD e card "Leia também".
Origem: `scripts/content/cozinha.mjs`, `persiana-ambiente.mjs` e `vertical-horizontal.mjs`
(campos `ogImage`, `photo`, `img`), introduzidos no commit `5545aa4`.
Correção: apontar para fotos existentes (`tela-solar.avif`, `madeira.avif`,
`persiana-motorizada.avif`) ou criar as três imagens, e rodar `node scripts/build-blog.mjs`.

**1.2 O puxador "Explore a Shine" cobre o botão de WhatsApp na dobra do celular (conversão).**
Capturas em iPhone 13: em `/cidades/resende/` o puxador fica exatamente sobre o botão
"Falar com um consultor"; em `/cortinas/` e `/contato/` cobre o chip "Atendemos todo o Sul
Fluminense / minha cidade"; na home cobre a legenda do primeiro cartão. O elemento
`.pv-curtain-pull` é fixo, com 210 × 74 px, a 12 px do rodapé da tela, e convive com o
botão flutuante do WhatsApp à direita. Não há `padding-bottom` ou `scroll-padding`
compensando a faixa inferior de 90 px.
Correção: no mobile, reduzir o puxador a um pill de 44 px de altura e deslocar o hero
para que o CTA termine acima da faixa inferior, ou mover o puxador para o cabeçalho
(junto ao logo, que já abre o menu). O conceito de navegação aprovado em 15/09 fica
preservado; muda só o tamanho e a posição no celular.

**1.3 Rocket Loader do Cloudflare está gerando CLS (Core Web Vitals).**
O HTML servido reescreve os dois scripts do site para `type="…-text/javascript"` e injeta
`rocket-loader.min.js`, que não existe no repositório. Com isso o `<nav class="sl-nav-fallback">`
(81 px no desktop, 185 px no mobile) é pintado antes de o JS adicionar `pv-enhanced` ao body e
depois some, deslocando o conteúdo. Medido: CLS 0,05 em todas as páginas desktop,
0,154 em `/contato/` desktop, 0,193 intermitente em `/contato/` e `/sobre/` mobile (faixa
"ruim" do Google). Servindo o mesmo HTML sem o Rocket Loader, o CLS da home cai de 0,077
para 0,024 e o de `/sobre/` de 0,051 para 0,001.
Correção em duas partes: desligar o Rocket Loader no painel (Speed → Optimization →
Content Optimization; os scripts já são `defer` e somam 4 KB, ele só atrasa) e, no código,
parar de depender de JS para esconder o fallback: envolver a `<nav>` em `<noscript>` ou
exibi-la só com `@media (scripting: none)`.

### Prioridade 2: próximas duas semanas

**2.1 Prévia de link no WhatsApp e no Facebook (46 páginas com `og:image` em AVIF, 11 com o logotipo quadrado).**
Facebook, WhatsApp e LinkedIn documentam suporte a JPG, PNG, GIF e WebP na prévia de
link; AVIF não está na lista. Para uma empresa cujo funil é o WhatsApp, o link da página
de cidade compartilhado por um cliente precisa mostrar foto. As páginas de produto,
`/contato/`, `/sobre/`, `/metodo/` e `/portfolio/` usam o logo 1:1, que aparece cortado.
Correção: gerar uma foto 1200 × 630 em JPG por página (ou por grupo), manter AVIF só no
`<img>`. Conferir no Sharing Debugger do Facebook depois de publicar.

**2.2 Imagens 3 a 6 vezes maiores do que o espaço onde aparecem (premissa 4).**
`/cidades/resende/` pesa 964 KB no celular, 784 KB em 12 imagens. `duplo.avif` (230 KB,
1696 × 2528) aparece num card de 348 × 261 px; `automacao.avif` (141 KB) num card de
163 × 217 px; as 6 miniaturas `-sq.avif` de 800 × 800 (82 a 102 KB cada) aparecem a
169 × 169 px; `ceo-shine.avif` (1024 × 1536) vira avatar de 48 px no blog. Na home mobile,
341 KB de imagens `loading="lazy"` são baixadas sem rolar, porque a página tem 7.855 px
e o Chrome antecipa 1.250 a 2.500 px. `srcset` existe em só 11 das 57 páginas.
Correção: gerar variantes de 400, 600 e 800 px e usar `srcset`/`sizes` nas grades de
projetos, cards de ambiente e avatar. Meta: página de cidade abaixo de 450 KB.

**2.3 Fontes do Google bloqueiam a renderização e uma delas nem é usada.**
O CSS do Google Fonts entra como `<link rel="stylesheet">` comum (render-blocking, chega
a 1,2 s no mobile). São baixados 97 KB em 3 arquivos woff2 depois do `load`. `Cinzel 700`
é pedida em 53 páginas e nunca baixada (nenhuma regra a usa: o logo é imagem).
`/cidades-atendidas/` é a única página sem o `<link>` de fontes (cai no fallback).
Correção: auto-hospedar Playfair Display 500/600 e Montserrat 400/500/600 em
`/assets/fonts/`, com `<link rel="preload" as="font">` nas duas faces do H1 e do corpo,
`font-display: swap` e fallback com `size-adjust` (também ajuda o CLS de `/contato/`).
Remover Cinzel da query.

**2.4 Oito páginas de vídeo rasas e quase idênticas (premissa 1).**
277 a 288 palavras cada, 70% de frases idênticas entre pares (máximo 80%), todas indexáveis
e no sitemap; 4 delas recebem 1 ou 2 links internos. É o único bloco do site com cara de
conteúdo duplicado. Comparação: cidades 29% de frases idênticas, blog 4%.
Correção: texto próprio por vídeo (ambiente, cidade, tecido, trilho, o que o cliente pediu,
o que foi resolvido) com 400+ palavras, ou consolidar em `/videos/` com um `VideoObject`
por item e `noindex` nas filhas. A segunda opção é mais rápida e não perde nada.

**2.5 Cache dos assets em 4 horas e TTFB variável.**
CSS, JS e AVIF saem com `max-age=14400, must-revalidate` (padrão do Pages), com
`cf-cache-status` REVALIDATED ou MISS. Como CSS e JS já têm `?v=N`, podem receber
`Cache-Control: public, max-age=31536000, immutable` no `_headers` (`/assets/*` e `/*.avif`).
O HTML é `DYNAMIC` (nunca cacheado na edge): TTFB medido de 150 a 657 ms, e na home o
LCP é o H1 em texto, então acompanha o TTFB. Vale um cache de edge curto (60 s) via regra
de cache no painel.

**2.6 Tipografia abaixo de 12 px e breadcrumb invisível no celular.**
Home mobile: 49 elementos com texto menor que 12 px (17 a 10 px, 7 a 9 px). Casos: kickers
`.pv-eyebrow`/`.sl-kicker` 10 px; breadcrumb `.sl-crumbs` 10 px em branco a 55% sobre a foto
do hero (ilegível em `/cidades/resende/` e `/cortinas/`, ver capturas); abas Sala/Quarto 11 px;
contador "01 / 03" 9 px; "Toque ou puxe" 9 px; rodapé 10,5 px.
Correção: mínimo 12 px (ideal 13) para qualquer texto que se lê; breadcrumb a 12 px com
fundo escurecido ou fora da foto. Sofisticação não exige miniatura.

**2.7 Alvos de toque menores que 24 px.**
Por página, 6 a 13 alvos abaixo do mínimo WCAG 2.5.8: links de redes no rodapé (16 px),
breadcrumb (13 a 19 px), telefone fixo do rodapé (22 px), "Assista ao vídeo deste projeto"
(20 px). Correção: `padding` vertical de 10 px nesses links.

### Prioridade 3: melhoria contínua

**3.1 Páginas de cidade: 149 travessões e 12 frases iguais nas 15.**
A regra de 15/10 proíbe travessões; o `cidades.json` tem cerca de 10 por cidade. As 12
frases presentes em 15/15 cidades estão no bloco de prova (17 anos / 4,9 / 9 mil / 100%),
no "como funciona" e no CTA final. Não é doorway page (65 a 73% de frases exclusivas por
cidade), mas Barra Mansa × Resende (35%) e Barra Mansa × Volta Redonda (32,5%) são os
pares mais parecidos. Correção: trocar travessões por vírgula e ponto no JSON; criar 3
variantes do bloco "como funciona" e da legenda de prova em `build-cidades.mjs`.

**3.2 Contradições de produto que uma IA vai notar.**
- `/cortinas/` descreve o linho como "textura natural e caimento generoso, o tecido de
  quem quer o ar de projeto de arquitetura". O artigo `/blog/linho-para-cortinas/` e a
  orientação do Isani (15/10) dizem o contrário: acima de 10% de linho fica armado,
  encolhe e amassa; a indicação é no máximo 10% de linho ou poliéster que imita linho.
  O schema da home chama o projeto Laranjal de "Cortina de linho puro".
- 15 páginas de cidade afirmam "Cortinas premiadas e reconhecidas pelo trabalho de
  confecção sob medida na região". Não há prêmio registrado em `docs/recebidos-do-isani.md`.
  Pela regra "nenhum fato sem vir do Isani", ou ele confirma o prêmio (nome e ano) ou a
  frase sai.
- `/cortinas/`, `/persianas/`, `/faq/` e um artigo citam persiana de "PVC". Confirmar se a
  Shine trabalha com PVC; não consta na lista de produtos do `CLAUDE.md`.
- `og:title` e `og:description` da home dizem "Loja de cortinas e persianas em Volta
  Redonda" e as 15 descriptions de cidade começam com "Loja de cortinas". É a palavra que
  o cliente busca, então faz sentido manter, mas o Perfil da Empresa está como "sem local
  físico". Vale alinhar o texto: "Cortinas sob medida em X, consultoria na sua casa".

**3.3 `llms.txt` deixa 21 páginas de fora.**
Cita 33 URLs; faltam 11 dos 15 artigos (inclusive os 7 reescritos em outubro), `/contato/`,
a home e os 8 vídeos. Também fixa "17 anos", que envelhece em janeiro. Correção: listar todo
artigo com uma linha de resumo; trocar "17 anos" por "desde 2009".

**3.4 Titles longos.** 27 das 53 páginas indexáveis passam de 60 caracteres (máximo 66); todas
terminam em " | ShineCortinas" (15 caracteres). O Google corta por largura em pixels, então o
sufixo some primeiro. Encurtar nos templates `build-*.mjs` e no `cidades.json`.

**3.5 Hierarquia de títulos.** O rodapé usa `<h4>` ("Fale conosco", "Redes") em 54 páginas,
criando salto H2 → H4 (H1 → H4 na 404). Trocar por `<p>` com classe no partial. Em
`/videos/`, `/blog/` e `/cidades-atendidas/` os cards vêm em `<h3>` logo após o H1.

**3.6 JavaScript injetado pelo Cloudflare.** Por página: Rocket Loader (3,9 KB), Zaraz +
GA4 (3,1 KB + collect), Web Analytics beacon (10,2 KB + `/cdn-cgi/rum`), challenge-platform
do Bot Fight Mode (12 KB + 2 XHR). Total 29 KB contra 4,2 KB de JS próprio. A home nunca
chega a `networkidle`. Avaliar se Web Analytics e GA4 são ambos necessários (dupla medição)
e desligar o Rocket Loader (item 1.3).

**3.7 Segurança.** Sem `strict-transport-security` (ativar em SSL/TLS → Edge Certificates →
HSTS) e sem `content-security-policy`. `access-control-allow-origin: *` no HTML é
desnecessário. Nada crítico para um site estático, mas HSTS é de graça.

**3.8 Detalhes de schema.** Os 3 nós `Service` da home apontam `url` para `/#solucoes` em
vez das páginas de produto (`/cortina-motorizada/`, `/blackout-e-forros/`,
`/trilhos-e-acionamentos/`). `theme_color` do manifest é `#ffffff` e o das páginas
`#16302A`; ícones do manifest só `maskable`, sem `any`. 10 páginas de produto não têm
`<meta name="robots">` (sem efeito, só inconsistência entre templates).

**3.9 Preload do hero nas internas.** `/cortinas/`, `/contato/`, `/sobre/` e os artigos não
têm `<link rel="preload" as="image">`, e nelas o LCP é a foto de hero (480 a 908 ms).
Adicionar o preload no partial, como já existe na home e nas cidades.

## 4. Leitura de layout (parecer de design)

**O que funciona.** Paleta verde profundo, areia e dourado está coerente em todas as páginas.
Playfair em itálico dourado como destaque dentro de títulos em Montserrat cria assinatura
reconhecível. O blog editorial (capa, autor com foto, índice numerado, desenhos em SVG,
caixas de resumo) é o melhor conjunto do site e passa autoridade. O menu em diálogo com
cena de fundo é bonito e funciona com teclado e leitor de tela.

**O que pesa contra.**
- No desktop a home não tem navegação visível além do logo e do puxador no rodapé da tela.
  O primeiro botão de WhatsApp aparece a cerca de 1.200 px de rolagem. O visitante que
  chega do Google para "cortinas em Volta Redonda" vê um carrossel de ambientes com o
  terceiro cartão cortado e nenhum caminho claro para falar com alguém. A decisão de 15/09
  foi do Isani e está respeitada; a recomendação é medir no GA4 a taxa de clique no
  WhatsApp da home contra a das páginas de cidade (hoje 8 cliques contra 4 em 28 dias com
  tráfego muito maior na home) e, se confirmar, trazer um CTA discreto para a dobra.
- Kickers de 10 px em caixa alta com espaçamento largo são elegantes em tela grande e
  ilegíveis em celular médio (item 2.6).
- As páginas de cidade e de produto têm hero com texto branco sobre foto escurecida, mas o
  breadcrumb fica a 55% de opacidade sobre a parte mais clara da foto.
- O rodapé é a parte menos trabalhada: links de redes separados por ponto, sem ícones, com
  16 px de altura.

## 5. Plano sugerido (30 dias)

| Semana | Ação | Esforço | Efeito esperado |
|---|---|---|---|
| 1 | 1.1 imagens dos 3 artigos; 1.2 puxador no mobile; 1.3 Rocket Loader off + `noscript` | 1 dia | LCP dos 3 artigos, CLS no verde, CTA de cidade visível |
| 1 | 2.1 og:image JPG 1200 × 630 por grupo de página | meio dia | Prévia de link no WhatsApp |
| 2 | 2.2 `srcset` nas grades; variantes 400/600 px; 2.5 cache longo no `_headers` | 1 dia | Cidade de 964 KB para ~450 KB |
| 2 | 2.3 fontes auto-hospedadas com preload; remover Cinzel | meio dia | FCP 200 a 300 ms mais cedo no mobile |
| 3 | 2.4 vídeos: `noindex` nas filhas ou texto próprio; 3.3 `llms.txt` completo | 1 dia | Menos conteúdo raso indexado, GEO mais completo |
| 3 | 2.6 e 2.7 tipografia mínima 12 px e alvos de 24 px; 3.5 rodapé sem `<h4>` | meio dia | Legibilidade e acessibilidade |
| 4 | 3.1 travessões e variantes nas cidades; 3.2 confirmar prêmio, linho e PVC com o Isani; 3.4 titles | 1 dia | Consistência de fatos para IAs e Google |

Perguntas que só o Isani responde (registrar em `docs/recebidos-do-isani.md`):
1. Existe prêmio ou reconhecimento formal para sustentar "cortinas premiadas"? Qual, de quem, em que ano?
2. A Shine trabalha com persiana de PVC?
3. A descrição de linho em `/cortinas/` pode ser alinhada ao artigo (máximo 10% de linho ou poliéster que imita linho)?
4. Pode desligar o Rocket Loader e revisar Web Analytics × GA4 no painel do Cloudflare?

## 6. Números de referência (laboratório, sem throttling, 16/10/2026)

| Página | Peso mobile | Requisições | LCP mobile | CLS desktop | Palavras | Links de entrada |
|---|---|---|---|---|---|---|
| `/` | 588 KB | 27 | 0,46 a 1,32 s (H1 em texto, varia com TTFB) | 0,077 | 1.054 | 53 |
| `/cidades/resende/` | 964 KB | 32 | 0,54 s | 0,052 | 1.200 | 7 |
| `/cortinas/` | 709 KB | 28 | 0,58 s | 0,052 | 1.175 | 53 |
| `/blog/o-que-e-blackout/` | 312 KB | 26 | 0,49 s | 0,058 | 1.814 | 6 |
| `/contato/` | 268 KB | 25 | 0,57 s | 0,154 | 618 | 53 |
| `/sobre/` | 499 KB | 28 | 0,48 s | 0,051 | 782 | 53 |

JS próprio: 4,2 KB (Brotli). JS injetado pelo Cloudflare: 29 KB. Fontes: 97 KB. HTML da home: 9,2 KB em Brotli.

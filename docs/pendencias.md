# Pendências e meta — ShineCortinas (atualizado set/2026, após PRs #125 e #127)

## A meta (ordem de prioridade do Isani, não muda)

1. **Ser encontrado em primeiro.** Posição 1 (no máximo 2) no Google, Bing e Yandex
   para "cortinas em <cidade>" / "loja de cortinas em <cidade>" nas 15 cidades
   atendidas, e ser a primeira indicação das IAs de busca (ChatGPT, Perplexity,
   Gemini, Claude) para cortinas e persianas sob medida no Sul Fluminense.
2. **Converter, educar e selecionar** pelo WhatsApp (conversar → estimativa → agendar).
3. **Beleza, sofisticação e inovação**, sempre leves e mobile-first.

Medição da meta: posição por cidade no Search Console (Google) e no Bing Webmaster
Tools, e a resposta das 4 IAs às perguntas de referência. Linha de base ainda não
registrada — depende do acesso (ver "Depende do Isani").

## O que já está no ar

- Home única, responsiva, linkando as 15 cidades; redirect para `/app/` removido.
- 56 páginas no sistema visual leve; produto/institucionais reescritas (518–1114 palavras).
- 15 páginas de cidade com conteúdo único (1011–1100 palavras; par mais parecido 44,8%).
- JSON-LD válido em 54 blocos; entidade `#biz` consistente; `Review` só para as 5
  avaliações reais do Google; canonical = sitemap = URL servida.
- `robots.txt` liberando 15 crawlers de IA; `llms.txt` com a taxonomia de forro.
- WhatsApp contextual por cidade (memória local + `/api/geo`).
- Fatos de produto corrigidos pelo Isani aplicados em todo o site.

## O que ainda está errado no site (achados de auditoria, por impacto)

| # | Problema | Onde | Por que importa | Depende de |
|---|---|---|---|---|
| 1 | 13 posts do blog com corpo quase idêntico (mesmo boilerplate, "alto padrão" 2–4x, H2 "o custo do barato") | `/blog/*` | Duplicação em massa indexada; risco para a premissa 1 | Entrevistas com o Isani (fila abaixo) |
| 2 | 8 páginas de vídeo com ~30 palavras próprias, indexadas | `/videos/*.html` | Conteúdo fino no sitemap | Isani: o que foi medido/usado em cada projeto |
| 3 | ~~Sem `openingHours` no LocalBusiness~~ **Resolvido 06/09:** seg–sex 08:00–17:00 (do Perfil da Empresa) em 42 nós LocalBusiness | todo JSON-LD | — | — |
| 4 | ~~`aggregateRating` 5.0/292~~ **Resolvido 06/09:** removido de 17 páginas; texto visível agora diz 4,9 com 294 (nota pública real) | `index.html` e 15 cidades | — | — |
| 5 | `Person` do Isani só como "CEO" | schema em todo o site | E-E-A-T e citação por IAs pedem credencial de designer de interiores | Isani: formação, anos, registro, LinkedIn |
| 6 | Heros de 5 páginas usam foto 637×791 ampliada 2,3×; nenhuma página tem `srcset`; home 839 KB e cidade 803 KB no celular | `cortinas`, `cortina-wave`, `contato`, `metodo`, `blackout-e-forros` | Premissa 4 (leve) e LCP | Fotos novas em alta (ver `fotos-necessarias.md`); srcset é trabalho meu |
| 7 | 15 cidades com a mesma foto de hero e as mesmas 9 imagens | `/cidades/*` | Diferenciação real por cidade | Fotos de projeto por cidade (Porto Real primeiro) |
| 8 | Porto Real é a página de cidade com referência local mais fraca | `/cidades/porto-real/` | Era a única cidade ausente das buscas | Isani: bairros, condomínios, projeto real |
| 9 | Canibalização home × `/cidades/volta-redonda/` no mesmo termo | title/H1 | As duas disputam "loja de cortinas sob medida em Volta Redonda" | Trabalho meu: diferenciar intenção |
| 10 | Breadcrumb visível "Como funciona" × schema "Metodo" em 10 páginas; nomes de breadcrumb em title-case automático | páginas de produto | Trilha que o Google exibe | Trabalho meu |
| 11 | Páginas de vídeo sem `BreadcrumbList` | `/videos/*.html` | Rich result de trilha | Trabalho meu |
| 12 | Nó `Organization` mínimo duplicado em 25 páginas (sem `@id`, sem `sameAs`) | JSON-LD | Consolidação de entidade | Trabalho meu |
| 13 | Ícone do manifest com 648 KB; landing com MP4 de 12 MB em autoplay | `site.webmanifest`, `/lp/anuncio-d/` | Peso | Trabalho meu |
| 14 | `blackout-sq.avif` (rolo de tecido) e `linha-puro.avif` (rolo) usados em slots de ambiente | cidades, portfolio | Regra de foto exata; hoje têm alt honesto, mas ainda ocupam lugar de foto de ambiente | Fotos novas |

Fora do site, ainda não feito: Google Business Profile, Bing Places, citações em
diretórios (Solutudo, GuiaFácil, Apontador, GuiaMais, StarOfService), rotina de
pedir avaliação. Depende das credenciais que o Isani vai passar.

## Fases (ordem)

1. **Medir** — acesso ao Search Console e ao Bing; submeter sitemap; registrar a
   linha de base de posição por cidade e a resposta das 4 IAs. *Bloqueado pelo acesso.*
2. **Corrigir o que é só trabalho meu** — itens 9 a 13 da tabela; srcset e derivadas
   de imagem (parte do 6).
3. **Autoridade** — credenciais do Isani no schema, fotos da equipe em `/sobre/`,
   foto de autor; artigo dos tecidos do forro translúcido.
4. **Blog autêntico** — reescrever os 13 posts (uma entrevista curta por post),
   2–3 artigos por semana. Ver `fila-de-conteudo.md`.
5. **Cidades** — +400–600 palavras únicas e foto real por cidade:
   Porto Real → Barra Mansa → Volta Redonda → Resende → demais.
6. **Fora do site** — GBP, Bing Places, diretórios, avaliações.
7. **Relatório mensal** — posição por cidade, cliques, resposta das IAs.

## Depende do Isani (pedido, sem resposta)

- Acesso ao Google Search Console e ao Bing Webmaster Tools. O Isani autorizou o acesso (06/set), mas este ambiente não alcança google.com (bloqueio de rede, não de permissão). **Caminho combinado:** não há como usar o Chrome do Isani a partir deste ambiente e o acesso direto ao Google é bloqueado aqui; ele exporta os relatórios (Search Console → Desempenho → Exportar) e as avaliações do Perfil da Empresa para uma pasta no Google Drive, que está conectado a esta sessão.
- ~~Os 15 depoimentos das páginas de cidade são clientes reais?~~ **Verificado (06/set): não eram** — nenhum dos 15 textos/autores existia entre as 297 avaliações do Google. **Substituídos por 15 avaliações reais e públicas do Google** (uma por cidade, sem repetir as 5 da home; Piraí e Valença com avaliações que citam a cidade; as demais identificadas como "cliente ShineCortinas", sem afirmar cidade). Cada uma entra no schema como `Review` (build-cidades → `withReview`).
- ~~Credenciais~~ **Respondido:** designer de interiores por formação prática (empírica); no schema fica "fundador e especialista em cortinas sob medida". Falta só o LinkedIn, se houver.
- ~~Foto do Isani trabalhando~~ **Recebida e publicada** (`isani-consultoria.avif`: hero de /metodo/ e /sobre/, imagem do Person). Faltam as outras fotos da equipe e, se existir, o original em resolução maior (a recebida tem 1108 px de largura).
- Porto Real: bairros, condomínios, imóvel predominante, um projeto com foto.
- Observações do GPT sobre o trabalho anterior.
- ~~Garantia~~ **Respondido e aplicado:** 1 ano (não motorizado), até 5 anos (motorizado).
- ~~"9.000 ambientes" e "desde 2009"~~ **Confirmados pelo Isani (06/set/2026):** mais de 9.000 ambientes transformados; empresa desde 2009.
- ~~Horário de atendimento~~ **Lido do Perfil da Empresa (06/set):** seg–sex 08:00–17:00.
- ~~Decisão sobre o `aggregateRating`~~ **Removido (06/set).**
- ~~Acesso ao Search Console~~ **Coleta feita no Mac do Isani (06/set):** `docs/dados-google/`. Linha de base: só 2 consultas com nome de cidade em 3 meses (Volta Redonda pos. 4,3 com 3 impressões; Barra Mansa pos. 10,1 com 19). Sitemap reenviado; 7 URLs com indexação solicitada; 54 indexadas / 148 não.
- Descrição de cada tecido do forro translúcido (gabardine, tergal, tergal verão,
  cetim, gorgurinho) para o artigo.

## Corrigido em 08/09/2026 (a partir da auditoria do GPT — ver `docs/auditoria-gpt-2026-09-08.md`)

- `_redirects` reescrito: 47 regras com `301!` (inválidas) e ~150 sombreadas por curingas
  estavam mortas; as duas URLs históricas do blog (62% dos cliques) agora têm 301 válido.
  Causa real do "só 100 regras", achada em 7 prévias de teste: a partir do primeiro curinga `*`
  (as regras de domínio `https://shinecortinas.com/*` estavam na linha 1), o Cloudflare conta todas
  as linhas seguintes no limite de 100 dinâmicas. Curingas movidos para o fim: as 218 regras
  voltaram, incluindo as 119 `/produtos-cidade/<produto>-em-<cidade>` por cidade.
- Arquivos internos (`CLAUDE.md`, `docs/`, `scripts/`, JSON de build) retirados do deploy.
- `/cidades-atendidas.html` e os 8 vídeos viraram pastas (`/…/`): canonical = sitemap = URL servida.
- 23 destinos de link sem barra final corrigidos (um redirect a menos por clique).
- **Lote 2 (08/09, à noite):** fontes Playfair/Montserrat nas 34 páginas que não carregavam;
  dourado de texto `--gold-ink #7F6636` (5,2:1) em kickers, números, legendas e "+" do FAQ;
  `author` = Person Isani (`#isani`) nos 14 artigos; WhatsApp sem "Sou de X" quando a cidade
  veio do IP e simulador só entra no contexto depois de usado; `lastmod` real (dateModified) no
  sitemap; `llms.txt` com links Markdown e "fundador"; robots liberados no painel do Cloudflare
  (decisão do Isani, feito com autorização).
- **Ainda aberto, do relatório:** `srcset` (item 6 acima); promessa "instalação no mesmo dia da
  consultoria" em Porto Real (confirmar com o Isani); artigos repetidos; fotos por cidade.

## Leitura do Search Console em 11/09/2026 (pelo Chrome do Isani, só leitura)

- **Acesso funciona:** com o Claude in Chrome (o Chrome do Isani, logado), o Search Console abre e
  dá para ler desempenho, inspeção de URL e sitemaps. O Cloudflare pede login de novo (sessão expira).
- 28 dias (13/08–09/09): 113 cliques, 12,5 mil impressões, posição média 7. Metade dos cliques (55)
  ainda vinha da URL antiga de altura.
- **Queda a partir de 07/09:** cliques de 4–6/dia para 1/dia; impressões de ~400 para 155 (09/09).
  Causa: a URL antiga de altura foi apagada em 05/09 com redirect inválido (`301!`) e ficou servida
  do cache com `noindex`; o Google a retirou do índice. É o estrago que a auditoria pegou.
- **Recuperação em curso:** em 09/09 11:31 o Google releu a URL antiga e já a trata como
  "página com redirecionamento" para `/blog/altura-ideal-da-cortina/` (canônico = novo). O novo
  artigo está indexado, mas a última visita do Google foi 09/09 20:42, antes do conteúdo novo (10/09).
- Sitemap principal processado (53 páginas, lido em 11/09). Há 8 sitemaps antigos do Wix
  falhando na lista do Search Console (limpeza opcional, pelo Isani).
- **Google Analytics (GA4, lido em 11/09 pelo Chrome do Isani — abre com a conta Google, sem
  precisar do Cloudflare):** 30 dias = 1.324 sessões; 58% de anúncios (Instagram/Facebook) caindo
  na landing `/lp/anuncio-d/` (644 visualizações, 1 min 45 s), 20% direto, **11% Google orgânico
  (151 sessões)**. Artigo antigo de altura: 80 visualizações e 1 min 21 s em 30 dias. Artigo novo
  de altura (9–11/09): 7 visualizações, **2 min 46 s de engajamento** (contra 1 min 21 s do antigo).
  Bainha (11/09): 4 visualizações, 23 s (recém-publicado). `/persianas/`: 6 min 10 s. Linha de base
  para comparar em 2 semanas. Os cliques no WhatsApp da landing contam como "evento principal"
  (1.309 em 30 dias); os artigos ainda não geram evento principal (0).
- **Próximo passo:** pedir indexação dos dois artigos novos no Search Console (um clique cada, na
  conta do Isani). Retenção/tempo na página: só no GA4 (tags injetadas pelo Cloudflare) — depende de login.

## Observação sobre o índice do Google (06/set/2026)

Busca externa ainda mostra títulos e URLs do site antigo (`/sobre-nós`, `/cortinas-volta-redonda`, `/post/7-tipos…`, title com "Premium" no portfólio). Todas essas URLs têm 301 em `_redirects` e os títulos novos estão no ar; é o índice que ainda não recrawlou. Submeter o sitemap e pedir reindexação assim que houver acesso ao Search Console.

## Método que ficou combinado

- Depois de cada bloco de trabalho, um auditor **sem contexto de conversa** confere
  o que está em `main` contra o `CLAUDE.md`. Pegou 4 falhas no primeiro uso.
- Nenhum fato de produto entra no site sem vir do Isani.
- Conteúdo em JSON/JS, HTML só por build; nunca editar página gerada à mão.

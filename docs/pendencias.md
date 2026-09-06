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
| 3 | Sem `openingHours` no LocalBusiness | todo JSON-LD | Dado mais consultado por Google e IAs sobre negócio local | Isani: horário |
| 4 | `aggregateRating` 5.0/292 do Google marcado como próprio | `index.html` e 15 cidades | Google pode ignorar ou punir avaliação autorreferente | Decisão (recomendo remover o aggregateRating e manter só as 5 Review) |
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

- Acesso ao Google Search Console e ao Bing Webmaster Tools. **Caminho combinado:** não há como usar o Chrome do Isani a partir deste ambiente e o acesso direto ao Google é bloqueado aqui; ele exporta os relatórios (Search Console → Desempenho → Exportar) e as avaliações do Perfil da Empresa para uma pasta no Google Drive, que está conectado a esta sessão.
- Os 15 depoimentos das páginas de cidade são clientes reais e atribuíveis?
- ~~Credenciais~~ **Respondido:** designer de interiores por formação prática (empírica); no schema fica "fundador e especialista em cortinas sob medida". Falta só o LinkedIn, se houver.
- ~~Foto do Isani trabalhando~~ **Recebida e publicada** (`isani-consultoria.avif`: hero de /metodo/ e /sobre/, imagem do Person). Faltam as outras fotos da equipe e, se existir, o original em resolução maior (a recebida tem 1108 px de largura).
- Porto Real: bairros, condomínios, imóvel predominante, um projeto com foto.
- Observações do GPT sobre o trabalho anterior.
- ~~Garantia~~ **Respondido e aplicado:** 1 ano (não motorizado), até 5 anos (motorizado). Falta confirmar "9.000 ambientes".
- Horário de atendimento.
- Decisão sobre o `aggregateRating` (item 4).
- Descrição de cada tecido do forro translúcido (gabardine, tergal, tergal verão,
  cetim, gorgurinho) para o artigo.

## Método que ficou combinado

- Depois de cada bloco de trabalho, um auditor **sem contexto de conversa** confere
  o que está em `main` contra o `CLAUDE.md`. Pegou 4 falhas no primeiro uso.
- Nenhum fato de produto entra no site sem vir do Isani.
- Conteúdo em JSON/JS, HTML só por build; nunca editar página gerada à mão.

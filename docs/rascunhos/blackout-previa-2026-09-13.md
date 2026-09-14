# Prévia: O que é blackout para cortina

Preparada por Zhaion em 13/09/2026 a pedido do Isani. Página completa para revisão visual e editorial, no endereço histórico `/blog/o-que-e-blackout/`. Não houve push, merge ou publicação nesta tarefa.

## Localização e versão

- Branch: `codex/artigo-blackout-20260913`.
- Base: `664b97399a6fec0509b401388b91e002953a1622`, versão de `origin/main` conferida em 13/09, já com o guia de forros integrado pelo Claude na PR #146.
- Worktree: `/Users/isanioliveira/shinecortinas-site/.codex-worktrees/artigo-blackout-20260913`.
- Prévia: `http://127.0.0.1:4318/blog/o-que-e-blackout/`.
- A pasta principal antiga não foi usada para editar o artigo.

## Conteúdo e visuais

Título: **O que é blackout para cortina? Entenda o 70% e o 100%**. A definição abre o texto. O artigo explica material e forro, escolha entre 70% e 100%, frestas, privacidade, calor e cuidados de lavagem, com quatro perguntas frequentes e convites para a consultoria.

A redação usa a entrevista confirmada de Isani. Mantém os 5–6 °C como observação nas suas instalações, sem garantia universal, distingue os cuidados conforme a construção do material e não confunde Screen com blackout 100%. O aprofundamento de tecidos e instalação continua no guia de forros, com links para trechos específicos.

Imagem de referência de sala de TV já existente no site: `/blackouts-tecnicos.avif`, identificada como referência no texto alternativo e na legenda. Foto real de Isani no encerramento: `/isani-consultoria-800.avif`. Não há atribuição da imagem de referência a um cliente ou projeto real.

Dois desenhos em SVG, incorporados ao HTML:

1. Comparação qualitativa da passagem de luz em semi blackout 70% e blackout 100%.
2. Vista frontal dos quatro caminhos de luz em uma instalação com frestas: parte superior, laterais, encontro central e barra. O desenho identifica uma situação a corrigir, sem inventar medidas, caixa ou guias laterais.

## Arquivos de origem

- `scripts/content/blackout.mjs`: texto, título, descrição, FAQ, links e metadados.
- `scripts/content/blackout-illustrations.mjs`: os dois desenhos e suas legendas.
- `assets/artigo-blackout.css`: ajustes de apresentação exclusivos deste artigo.
- `scripts/build-blog.mjs`: integração do novo artigo e suporte opcional a gerar somente os slugs informados; o comportamento padrão continua gerando todos.
- `blog/o-que-e-blackout/index.html`: página gerada.
- `blog/posts.json` e `blog/index.html`: cartão do artigo atualizado.

Para gerar somente esta página, no worktree:

```sh
node scripts/build-blog.mjs o-que-e-blackout
```

Para abrir uma nova sessão de prévia, se a porta 4318 estiver livre:

```sh
python3 -m http.server 4318 --bind 127.0.0.1
```

## Conferências realizadas

- Fonte JavaScript válida e geração reproduzível, sem diferença na segunda execução.
- HTML gerado com uma URL canônica histórica; links internos e fragmentos locais válidos, nenhum ID duplicado e quatro FAQs iguais ao JSON-LD.
- Revisão independente da fidelidade à entrevista, incluindo instalação, calor e lavagem.
- Abertura no navegador, carregamento das imagens, navegação por âncoras e expansão de perguntas frequentes.
- Layout conferido no computador (1224 px) e no celular (390 e 320 px), sem rolagem horizontal nessas larguras.
- Arquivos dos artigos de forros, altura e bainha preservados byte a byte em relação à base.
- `git diff --check` sem erros.

## Integração posterior

Este trabalho está em uma branch própria sobre a versão atual do site. Usar o commit da branch para integrar a alteração, incluindo as fontes e o CSS; não copiar somente o HTML gerado. A revisão do Isani nesta etapa é da prévia. O próximo registro deve distinguir a aprovação editorial de uma eventual publicação efetivamente verificada.

A fila foi corrigida apenas no item deste artigo: a referência histórica de 1.466 é de impressões em três meses, não de buscas mensais. Ela não foi transformada em alegação no texto público.

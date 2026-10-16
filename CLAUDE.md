# ShineCortinas — Guia do Projeto (LEIA ANTES DE EDITAR)

Site institucional/comercial da **ShineCortinas** — cortinas e persianas sob medida,
sediada em Volta Redonda (RJ), atendendo todo o **Sul Fluminense**.
CEO: Isani Oliveira. Site estático hospedado no **Cloudflare Pages** (deploy
automático ao dar merge na branch `main`).

## ANTES DE TUDO: `docs/recebidos-do-isani.md`

Cada conversa começa do zero. O que o Isani já enviou (fotos, fatos, decisões) e o que foi
feito com cada item está em `docs/recebidos-do-isani.md`. **Ler antes de pedir qualquer
coisa a ele** e **registrar ali, na hora, tudo que ele mandar.** Página nova só está pronta
quando está ligada no menu ou em outra página (a `/sobre/` ficou 2 dias invisível por isso).

## ORDEM DE PRIORIDADE (decisão do Isani, set/2026) — desempate obrigatório

Quando duas escolhas conflitarem, vence a de número menor. Sempre.

1. **Ser encontrado em primeiro.** Google, Bing, Yandex e os mecanismos de
   busca das IAs (ChatGPT, Perplexity, Gemini, Claude). Esta premissa não muda.
   Nada que enfraqueça indexação, conteúdo único, schema, links internos ou
   velocidade entra no site, por mais bonito que seja.
2. **Converter, educar e selecionar.** O site explica com autoridade e leva à
   conversa no WhatsApp com a escada de pedidos (conversar → estimativa →
   agendar). A seleção do cliente é feita por vocabulário, estética e pelas
   perguntas do próprio funil (cidade, ambiente, objetivo) — nunca por
   hostilidade, preço na cara ou filtro de renda explícito (ver "Linguagem").
   Quem não é cliente hoje se afasta sozinho; quem é, se sente em casa.
3. **Beleza, sofisticação, tecnologia e inovação.** Sistema visual leve,
   celular primeiro, recursos modernos (transições nativas, pré-carregamento,
   simulador, popover) — sempre progressivos e leves. Inovação que custe
   posição na busca ou peso na página é vetada pela premissa 1.

## PREMISSAS INEGOCIÁVEIS (não podem mudar)

Toda alteração no site DEVE respeitar, simultaneamente, estas 5 premissas:

1. **SEO local sem punição.** As páginas de cidade têm que ranquear para as
   cidades atendidas seguindo as diretrizes do Google. Conteúdo **único** por
   cidade (nada de páginas genéricas/duplicadas — risco de "doorway pages").
   Cada cidade tem hero, textos, FAQ e depoimento próprios, com referência real
   à característica local (serra, vale do café, polo industrial, casario etc.).
   Manter canonical, robots, schema JSON-LD válido e breadcrumb por página.
2. **Autoridade para IAs (GEO/AEO).** O site precisa ser fonte que as IAs de
   busca citem em primeiro lugar. Para isso: conteúdo factual, schema.org rico
   (LocalBusiness, Service, FAQPage, BreadcrumbList, Organization), respostas
   diretas e bem estruturadas, FAQ em linguagem natural.
3. **Estética premium.** Visual sofisticado. Paleta: preto, branco e dourado
   `#C6A868` (gradiente `#DFBD69→#FFF0C6→#B89648`). Fontes: Playfair Display
   (luxury), Cinzel (logo), Montserrat (corpo). Navbar **vidro fosco** (glass,
   estilo iOS): `bg-white/10 backdrop-blur-lg`, solidifica ao rolar (`nav-scrolled`).
4. **Leve e mobile-first.** Otimizado para smartphone acima de tudo. Imagens
   `.avif`, `loading="lazy"`, `decoding="async"`, preload só do hero. Sem JS
   pesado. CSS pré-compilado (ver abaixo).
5. **Conectado a todas as redes sociais.** Manter `rel="me"`, Open Graph,
   Twitter card e links coerentes com os perfis da marca.

A beleza e a estrutura evoluem em cima destas premissas — nunca contra elas.

## Restrições técnicas (armadilhas conhecidas)

- **Tailwind está CONGELADO** em `/assets/tailwind.generated.css` (pré-compilado).
  Classes utilitárias novas NÃO existem nele. Páginas ainda no Tailwind (home,
  produto, blog): validar que toda classe existe no CSS gerado. As páginas de
  cidade NÃO usam mais Tailwind — usam `/assets/shine-leve.css`.
- **Bug do `$$` no `String.replace()`:** em JS, `$$` no texto de substituição vira
  um `$` literal. Os builds gravam o JSON-LD com `head.replace(bloco, novoTexto)`, então
  `"priceRange": "$$"` era silenciosamente rebaixado para `"$"` a cada build. Corrigido
  usando função como substituto (`.replace(x, () => texto)`). Nunca passar texto gerado
  direto como 2º argumento de `.replace()`.
- **Marcação `Review` (decisão set/2026):** só marcar como `schema.org/Review` avaliação
  real e atribuível (as 5 da home e as 15 das páginas de cidade vêm do Google Business
  Profile; a fonte completa está em `docs/dados-google/avaliacoes.json`). Depoimento
  escrito para o site fica como texto visível, **sem** marcação de avaliação — marcar copy
  de marketing como Review é spam de dados estruturados e arrisca ação manual do Google,
  exatamente contra a premissa 1. **Nunca inventar depoimento** (os 15 antigos das cidades
  eram inventados e foram trocados em 06/set/2026). Para trocar o depoimento de uma
  cidade: escolher avaliação 5★ de `avaliacoes.json`, preencher `quote`, `quote_by`,
  `quote_google_author`, `quote_date` (AAAA-MM) no `cidades.json` e rodar o build.
- **`_redirects` do Cloudflare Pages (auditoria de 08/09/2026 — 200 das 237 regras estavam mortas):**
  **a partir da primeira linha com curinga `*`, o Cloudflare conta todas as seguintes no limite de
  100 "dinâmicas" e descarta o resto em silêncio** (medido em prévias, 08/09/2026). Por isso todas
  as regras com `*`, inclusive as de domínio `https://shinecortinas.com/*`, ficam no FIM. Formato:
  só `origem destino código`, códigos 301/302/303/307/308. **Nunca `301!`** (sintaxe do
  Netlify, o Cloudflare ignora a linha em silêncio) **nem 410**. Regra específica ANTES do
  curinga `*` (a primeira que casa vence). Origem com acento percent-encoded, destino com
  barra final. **Toda publicação termina com teste no site ao vivo** (`curl -I` nos endereços
  antigos e novos) — conferir só o código foi o que deixou o erro passar por 3 dias.
- **Arquivos internos não vão ao ar:** `scripts/generate-sitemap.mjs` (que roda no deploy) remove
  `docs/`, `scripts/`, `CLAUDE.md`, `README.md` e os JSON de build (só com `CF_PAGES`/`CI`), e o
  `_redirects` manda `/CLAUDE.md`, `/docs/*` e `/scripts/*` para `/`. Conferir depois de publicar:
  `/.node-version` tem que dar 404. Os endereços do site são todos pasta com barra final
  (`/cidades-atendidas/`, `/videos/<slug>/`); não criar página `.html` solta.
- **Bug do `</script>`:** ao gerar páginas via script, escrever a tag de
  fechamento como `</script>` literal. Nunca `<\/script>` — o navegador não
  reconhece e a página renderiza em branco.
- **Fatos de produto e operação (corrigidos pelo Isani — não reintroduzir):**
  - **Sem endereço físico / Service Area Business (14/10/2026):** a Shine não tem mais loja/endereço físico aberto ao público (antiga `Rua K, 60` foi desativada). Usar apenas a cidade-base **Volta Redonda, RJ** (`addressLocality: "Volta Redonda"`, `addressRegion: "RJ"`, `addressCountry: "BR"`, sem `streetAddress`, sem `postalCode` e sem `geo`) e atendimento 100% em domicílio (`areaServed`).
  - **Sem instalação no mesmo dia / sem cortina pronta (14/10/2026):** a Shine trabalha exclusivamente sob medida; **não** vende cortina pronta e **não** faz instalação no mesmo dia. Nunca escrever "instalamos no mesmo dia", "tudo no mesmo dia" ou "concluída no mesmo dia".
  - A Shine **não trabalha** com rolô de **guias laterais** nem **caixa box**.
    Nunca citar "Sistema Box". Também não existe "trilho com vedação lateral".
  - **Forro (corrigido pelo Isani, set/2026):** são dois grupos. O **forro translúcido**
    dá privacidade, protege o tecido decorativo e quebra parte da claridade. O **forro
    blackout** tem duas versões: **70% (semi blackout)**, que deixa penumbra, e
    **100%**, que bloqueia a passagem de luz pelo material. Persianas também podem
    usar material blackout 100%. Para escurecer o ambiente, o forro precisa trabalhar
    junto da instalação: fechamento superior e lateral, tecido suficiente no centro
    e barra beijando o chão.
    "Forro translúcido" é o nome correto, não tem sinônimo comercial. Tecidos que
    compõem esse grupo (informados pelo Isani): **gabardine** (de algodão e de
    poliéster), **tergal**, **tergal verão**, **cetim**, **gorgurinho** e **microfibra**.
    Microfibra foi acrescentada pelo Isani em 12/09/2026, sem substituir os demais.
    Exemplos confirmados: gabardine 100 g/m²; tergal verão 70 g/m²; cetim 70, 90 ou
    110 g/m²; microfibra 65 ou 100 g/m². Não fixar uma gramatura para toda a família
    nem atribuir características adicionais aos tecidos sem confirmação.
  - **Calor (esclarecido pelo Isani, 12/09/2026):** forro blackout de tecido tem
    relato de redução de **5 a 6 °C**, medida pelo Isani comparando a temperatura
    do ambiente antes e depois de instalações. A referência a **até cerca de 11 °C**
    é para **persianas com fibra de vidro**, com **Screen (tela solar)** e **Pinpoint**
    citados como exemplos de materiais. Não trocar as aplicações, prometer redução
    universal, atribuir o mesmo resultado a todo modelo ou chamar Screen de blackout
    100%. As condições de um ensaio controlado não foram informadas.
  - **Instalação (entrevista de 12/09/2026):** finalizador/final de trilho prende a
    ponta do forro; não é um sistema de vedação lateral. No fechamento comum, as
    partes se encostam com tecido e franzimento suficientes. O **trilho triplo com
    transpasse** tem a cortina à frente e duas vias traseiras para sobreposição do
    forro de cerca de 15 cm. Ocupa mais espaço no cortineiro e é usado principalmente
    quando solicitado. Não converter isso em obrigação para toda instalação.
  - **Privacidade e manutenção (entrevista de 12/09/2026):** tecido encorpado, trama
    fechada e, preferencialmente, gramatura acima de 170 g/m² são critérios conjuntos
    para a situação de privacidade descrita; gramatura isolada não dispensa forro nem
    resolve sua função de proteção. Manutenção depende da construção: diferenciar
    microfibra, blackout de tecido com bloqueador interno e blackout com película
    traseira. Os materiais acompanham documento de cuidados. Para película, Isani
    recomenda **higienização profissional específica para blackout**; sua expressão
    "lavagem a seco" não significava limpeza com solvente. Nomes Max Blackout,
    Blackout Ultra e Super Blackout foram exemplos da entrevista, não prova de
    equivalência entre produtos de fabricantes diferentes.
  - **Sala de TV e cor do blackout (esclarecido pelo Isani, 15/10/2026):** na maioria dos projetos de sala de TV, a preferência é trabalhar com **cortina de tecido**, pois deixa o ambiente mais clássico e veda melhor no conjunto (embora a persiana rolô blackout vede 100% na trama, a claridade passa pelas frestas laterais). Sobre a **cor do tecido**: se for **blackout 100%**, a cor **não** influencia (branco, areia, bege ou off-white vedam 100% da mesma forma). Se for **blackout 70% (semi blackout)**, a cor influencia: um tecido mais claro deixa passar mais claridade do que um tecido mais escuro.
  - **Varões e Tubo Suíço (esclarecido pelo Isani, 15/10/2026):** a Shine trabalha com varões de **28 mm e 19 mm**, em **alumínio, inox e madeira** (os de **alumínio** são os mais utilizados e os mais indicados). Cores trabalhadas: **cromado, aço escovado, branco, preto fosco** (em alta), **dourado, ouro velho e cobre**. Ponteiras trabalhadas: vários modelos, entre os mais conhecidos **ponteira bola, ponteira tampão, ponteira diamante e ponteira chama**. Tipos: **varão simples** (1 tecido) e **varão duplo** (2 tecidos: forro ou blackout atrás e cortina na frente, virada para o lado do cliente). Modelos de deslizamento: **varão padrão** (para cortina de argola e de ilhós) e **varão ou tubo suíço** (trilho disfarçado de tubo). Acima de **2,00 m de largura**, é imprescindível usar **suporte no meio do varão**; por isso o Isani prefere o **tubo suíço**, pois a cortina flutua por baixo do tubo e não toca no suporte central.
  - **Cortina Wave: proporções, cordão espaçador, forros e cortineiro (esclarecido pelo Isani, 15/10/2026):** confeccionada nas proporções **2:1, 2,5:1 e 3:1**. O cordão espaçador pode ser de **0,4, 0,5 e 0,8**, e a Shine utiliza uma técnica que consegue reduzir o espaço entre as ondas. O forro atrás da Cortina Wave pode ser **forro slim** (reto, sem prega, igual a um painel), **forro em prega tombada**, **forro em prega plissada**, **forro em prega fêmea**, **forro em prega macho** ou **forro no modelo Wave** (para usar forro em Wave, é necessária uma **distância de 11 cm** da cortina da frente para a de trás para que as ondas não se toquem; é muito raro o cliente optar por isso pois toma muito espaço). O mínimo que o Isani exige para trabalhar com bastante espaço no cortineiro é **15 × 15 cm** (15 cm de largura/profundidade e 15 cm de altura do cortineiro).
  - **Linho e gramatura (esclarecido pelo Isani, 15/10/2026):** quando o cliente deseja linho, o Isani indica tecido com **no máximo 10% de linho** ou **100% poliéster que imita linho** (hoje há poliésteres que imitam linho, seda e algodão). Acima de 10% de linho, a cortina não costuma ter caimento sedoso (fica armada), pode encolher na lavagem, amassa muito fácil (*"só de olhar para ele, ele amarrota"*) e é difícil de passar (assim como o algodão). Para bom caimento, indica sempre **gramatura superior a 170 g/m²** (abaixo de 170 g/m² não tem peso nem bom caimento, **a não ser que seja um tecido peletizado/escovado**, bem sedoso, com trama maleável e bem fechada). Gramatura maior (>170 g/m²) também é mais elegante e mais difícil de queimar a fibra quando o sol bate.
  - **Números confirmados pelo Isani (set/2026):** empresa desde 2009; "mais de 9.000
    ambientes transformados". Podem ser usados no texto e no schema.
  - **Nota do Google (coletada em 06/set/2026 no Perfil da Empresa):** **4,9 com 294
    avaliações**. Nunca escrever "5.0"; o número vem de `docs/dados-google/perfil.json`.
    `aggregateRating` ativo no schema `LocalBusiness` (decisão de 14/10/2026). Horário oficial: **seg–sex 08:00–17:00**,
    já no `openingHoursSpecification` de todo LocalBusiness.
  - **Garantia (informada pelo Isani, set/2026):** 1 ano para cortinas e persianas
    **não motorizadas**; até **5 anos** nos projetos **motorizados**. Não existe "8 anos".
  - **Isani:** designer de interiores por formação prática (empírica), fundador e
    especialista em cortinas sob medida. No schema, `jobTitle` usa "especialista";
    o texto visível pode dizer "designer de interiores por prática". Nunca atribuir
    formação acadêmica ou registro que ele não informou.
  - Não prometer "privacidade absoluta" nem atribuir o escurecimento a acessório que
    a Shine não usa; o resultado depende do **tipo de forro e da instalação adequada**.
  - Fotos: só usar imagem que mostre **o ambiente e a solução exatos**. Quando não
    houver, marcar como referência (ver `docs/fotos-necessarias.md`).
- **WhatsApp (CTA padrão):**
  `https://wa.me/5524993298763?text=Ol%C3%A1%2C%20eu%20vim%20do%20site%20da%20Shine%20e%20quero%20agendar%20uma%20consultoria%20gratuita%20em%20casa.`
  Telefones: (24) 99329-8763 (WhatsApp) e (24) 3338-3069.
- **Linguagem — tom refinado, natural e sem cacoetes de IA (regra reforçada pelo Isani em 15/10/2026):**
  - Nos artigos do blog, escrever em **tom coloquial brasileiro, direto e humano**, na primeira pessoa do Isani (*"Quando eu vou na casa do cliente..."*, *"Muita gente me pergunta..."*, *"Veja bem:"*). Quem ler precisa sentir que foi escrito palavra por palavra pelo Isani.
  - **Proibido cacoetes de IA:** nunca usar travessões (`—` ou `–`) para intercalar frases, ponto-e-vírgula (`;`) artificial, jargões robóticos ou construções engessadas que não fazem parte da fala cotidiana do brasileiro. Usar vírgulas e pontos finais simples.
  - O público é a família que pode investir num projeto sob medida (não cortina de prateleira).
  A seleção é feita pela **estética e pelo vocabulário**, jamais por filtro de renda
  explícito no texto (péssimo para marca e SEO). Marca sofisticada **mostra** o
  alto padrão — quase nunca escreve a palavra "luxo".
  - ✅ **Elevar:** "sob medida", "projeto exclusivo", "tecidos selecionados",
    "curadoria", "acabamento impecável", "caimento perfeito", "requinte",
    "sofisticação", "rigor", "exclusividade", "investimento que valoriza o imóvel".
  - ⚠️ **Com parcimônia (no máx. 1x/página):** "alto padrão", "refinado".
  - ❌ **Proibido (brega/barateia ou excludente):** "premium", "VIP", "de luxo",
    "white-glove", "status", "elite"; e o enquadramento "povão" — "cabe no bolso",
    "qualquer bolso", "caro demais", "muito mais barato", "casa de novela".
  - **Parcelamento (12x): discreto, como conforto.** Entra como comodidade
    ("a comodidade de parcelar em até 12x"), nunca como argumento de "é baratinho".
  - Manter: consultoria gratuita, sem pressão, sem robô (acolhimento ≠ povão).

## Página de referência — Ambientes / Aurora (aprovado em 15/09/2026)

Isani aprovou e autorizou efetivar no site a composição Ambientes: verde claro
`#f2f6ef`, areia suave `#f8f5ed`, dourado nos destaques e logotipo oficial com
Aurora. Cabeçalho central em névoa translúcida suave, sem faixa rígida; navegação
pelo puxador flutuante “Explore a Shine” e menu que abre em duas folhas. Sem dica
repetida abaixo do logo. Esta decisão substitui as direções anteriores de header
sólido e barra inferior de abas. Não reintroduzir as propostas descartadas.

CSS/JS aprovados: `assets/shine-aurora.css` e `assets/shine-aurora.js`, sobre a base
`shine-leve.css`. Menu com links em HTML estático; navegação de fallback disponível
sem JavaScript. Componentes em `scripts/aurora-layout.mjs`, compartilhados pelos
partials. `build-home.mjs` gera a home; `build-aurora.mjs` atualiza somente a moldura
das páginas existentes, preservando conteúdo e metadados. Landings de anúncios
mantêm a composição própria. Não publicar comparadores, rotas de prévia ou
parâmetros `conceito`.

- CSS do sistema: `/assets/shine-leve.css` (semântico, sem Tailwind). **Logotipo:** imagem real
  `logo-shine.avif` no cabeçalho e no rodapé (decisão do Isani, 10/09/2026); nunca voltar ao "S" em texto.
- **Blog:** artigos novos usam `layout: 'editorial'` em `scripts/build-blog.mjs` (capa com foto real,
  autor com foto, índice lateral, seções numeradas, desenhos em SVG, fechamento verde). Modelo de
  conteúdo: pilar + satélites, com "Leia também" entre eles. Fatos só da entrevista em `docs/entrevistas/`.
- **As 15 páginas de cidade são GERADAS**: conteúdo único de cada cidade em
  `cidades/cidades.json`; template em `scripts/build-cidades.mjs`.
  Para alterar copy de uma cidade: edite o JSON e rode
  `node scripts/build-cidades.mjs`. Para alterar layout: edite o template.
  Nunca edite `cidades/<slug>/index.html` à mão — o build sobrescreve.
  O `<head>` (title, metas, canonical, JSON-LD) é preservado do arquivo.
- Estrutura: header → hero (foto + degradê verde, breadcrumb, H1) → faixa de
  confiança → "Imagine" (imagem + copy local) → story (imagem + copy local) →
  prova (17 anos, 5.0/292, 9 mil ambientes, equipe própria) → galeria clara →
  comparação "pela internet × com a Shine" → como funciona → depoimento (faixa
  verde) → FAQ com as 6 perguntas do schema visíveis → CTA final (faixa verde)
  → links internos + cidades próximas → rodapé claro → barra fixa (celular).

## Cidades atendidas (15)

barra-do-pirai, barra-mansa, itatiaia, maromba, miguel-pereira, paulo-de-frontin,
penedo, pinheiral, pirai, porto-real, resende, valenca, vassouras,
visconde-de-maua, volta-redonda.

## Git / Deploy

- Branch de trabalho atual: `claude/cortinas-search-rio-cities-ntit7r` (SEO/GEO + sistema leve).
- **Publicado (set/2026, PRs #125 e #127):** home única e responsiva no sistema
  leve, redirect de celular para `/app/` removido (`/app/` → `/` 301), 56 páginas
  no sistema leve, páginas de produto reescritas. Backlog e meta: `docs/pendencias.md`.
- A branch `claude/audit-website-errors-NmMfH` guarda trabalho NÃO publicado
  (tom âmbar escuro + API v2 do Instagram com vídeo/carrossel) — não apagar
  sem decisão do Isani.
- Deploy: merge na `main` → Cloudflare Pages publica em 1–2 min.
- **Landings de tráfego pago (`/lp/`)**: páginas de anúncio (Meta/Google Ads).
  Ficam FORA do sitemap e com `noindex` — são conversão, não busca orgânica.
  Têm paleta própria (verde `#16302A` + dourado da marca) e não usam o Tailwind
  congelado. Regras e armadilhas: `docs/landing-pages-trafego-pago.md`.
  A primeira é `/lp/anuncio-d/` ("Ferir e Curar").
- **Rastreamento (IMPORTANTE — não "consertar"):** o HTML NÃO tem tags de
  GA4/Meta Pixel/Google Ads **de propósito**. Os IDs de rastreamento são
  gerenciados na camada do **Cloudflare** (injetados por lá). Não adicionar
  tags inline — isso já causou duplicidade no passado e foi removido
  deliberadamente (fev/2026, PR #42). A ausência de `gtag`/`fbq` no código
  NÃO significa que o site está sem medição.

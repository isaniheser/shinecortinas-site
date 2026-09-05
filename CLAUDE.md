# ShineCortinas — Guia do Projeto (LEIA ANTES DE EDITAR)

Site institucional/comercial da **ShineCortinas** — cortinas e persianas sob medida,
sediada em Volta Redonda (RJ), atendendo todo o **Sul Fluminense**.
CEO: Isani Oliveira. Site estático hospedado no **Cloudflare Pages** (deploy
automático ao dar merge na branch `main`).

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
- **Bug do `</script>`:** ao gerar páginas via script, escrever a tag de
  fechamento como `</script>` literal. Nunca `<\/script>` — o navegador não
  reconhece e a página renderiza em branco.
- **Fatos de produto (corrigidos pelo Isani — não reintroduzir):**
  - A Shine **não trabalha** com rolô de **guias laterais** nem **caixa box**.
    Nunca citar "Sistema Box". Também não existe "trilho com vedação lateral".
  - **Forro (corrigido pelo Isani, set/2026):** são dois grupos. O **forro translúcido**
    dá privacidade, protege o tecido decorativo e quebra parte da claridade. O **forro
    blackout** tem duas versões: **70% (semi blackout)**, que deixa penumbra, e
    **100%**, que entrega escuro total. Persianas também têm material blackout 100%.
    Para quarto escuro de verdade: **cortina com forro blackout 100% resolve**.
  - Não prometer "privacidade absoluta" nem atribuir o escurecimento a acessório que
    a Shine não usa; o que define o resultado é o **tipo de forro**.
  - Fotos: só usar imagem que mostre **o ambiente e a solução exatos**. Quando não
    houver, marcar como referência (ver `docs/fotos-necessarias.md`).
- **WhatsApp (CTA padrão):**
  `https://wa.me/5524993298763?text=Ol%C3%A1%2C%20eu%20vim%20do%20site%20da%20Shine%20e%20quero%20agendar%20uma%20consultoria%20gratuita%20em%20casa.`
  Telefones: (24) 99329-8763 (WhatsApp) e (24) 3338-3069.
- **Linguagem — tom refinado e seletivo (DEMONSTRAR, não anunciar):** o público
  é a família que pode investir num projeto sob medida (não cortina de prateleira).
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

## Página de referência (template aprovado) — sistema visual "leve"

Decisão do Isani (set/2026): o tom preto/dourado pesado foi substituído pelo
**sistema visual leve**, derivado da landing `/lp/anuncio-d/`: chão areia
`#FBFAF7`, verde profundo `#16302A` como faixa e voz, dourado `#C6A868` só em
detalhes (kickers, hairlines, um botão). Playfair Display peso 500 (nunca 900),
Montserrat no corpo, Cinzel só no logotipo. Header sólido verde (não mais vidro).
**Celular primeiro:** no celular tudo centralizado, hero ocupa a tela, barra de
ação fixa embaixo (`.sl-bar`); o desktop é derivado, nunca o contrário.

- CSS do sistema: `/assets/shine-leve.css` (semântico, sem Tailwind).
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
- **Pendente (decidido, não feito):** home única e responsiva no sistema leve e
  remoção do redirect JS de celular para `/app/` (a home que o Google indexa
  hoje é o app: 411 palavras, 5 H1, sem links para as cidades).
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

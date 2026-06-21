# ShineCortinas — Guia do Projeto (LEIA ANTES DE EDITAR)

Site institucional/comercial da **ShineCortinas** — cortinas e persianas sob medida,
sediada em Volta Redonda (RJ), atendendo todo o **Sul Fluminense**.
CEO: Isani Oliveira. Site estático hospedado no **Cloudflare Pages** (deploy
automático ao dar merge na branch `main`).

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
  Classes utilitárias novas NÃO existem nele. Qualquer classe nova usada nas
  páginas de cidade precisa ser definida em **`/assets/cidades.css`** (já linkado
  nessas páginas). Sempre validar que toda classe usada existe num dos dois CSS.
- **Bug do `</script>`:** ao gerar páginas via script, escrever a tag de
  fechamento como `</script>` literal. Nunca `<\/script>` — o navegador não
  reconhece e a página renderiza em branco.
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

## Página de referência (template aprovado)

`/cidades/resende/index.html` é o **padrão aprovado** para todas as páginas de
cidade. Estrutura: navbar glass → hero cinematográfico (100svh, hero claro) →
faixa de confiança → bloco "Imagine só" (projeção/PNL) → story → galeria de 6
projetos → "Como Funciona" (3 círculos dourados) → depoimento → FAQ → CTA final
→ links internos → footer → WhatsApp flutuante.

## Cidades atendidas (15)

barra-do-pirai, barra-mansa, itatiaia, maromba, miguel-pereira, paulo-de-frontin,
penedo, pinheiral, pirai, porto-real, resende, valenca, vassouras,
visconde-de-maua, volta-redonda.

## Git / Deploy

- Branch de trabalho atual: `claude/audit-website-errors-NmMfH`.
- Deploy: merge na `main` → Cloudflare Pages publica em 1–2 min.
- Não criar PR sem o usuário pedir.

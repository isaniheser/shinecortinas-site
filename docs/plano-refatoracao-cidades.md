# Plano Diretor de Refatoração Total — Páginas `/cidades/`

## 1) Objetivo estratégico da fase

Iniciar uma refatoração completa das páginas de cidade para reduzir similaridade entre conteúdos, elevar percepção premium (padrão Casa Vogue) e preservar blindagem técnica de SEO.

**Escopo desta entrega:** plano aprovado antes de codificação final.

---

## 2) Restrições inegociáveis (guardrails)

1. **Mobile-first absoluto**: todos os blocos devem nascer para celular e só depois expandir para desktop.
2. **Preservar rigorosamente a malha de links internos dos HUBs** (`/cortinas`, `/persianas`, `/cortina-wave/`, `/cortina-motorizada/`, `/blackout-e-forros/`, `/trilhos-e-acionamentos/`, `/portfolio/`, `/metodo/`, `/sobre/`, `/faq/`, `/contato/`).
3. **Não alterar a natureza dos schemas atuais**: manter `LocalBusiness`, `FAQPage`, `BreadcrumbList` e demais já válidos; **não inserir `VideoObject`**.
4. **Eliminar duplicação semântica entre cidades**: cada página deve ter narrativa regional própria (dor climática + solução técnica + prova de autoridade).
5. **Tom de marca**: dossiê técnico + alfaiataria premium, evitando varejo comum.

---

## 3) Diagnóstico rápido do estado atual

As páginas de `/cidades/` repetem majoritariamente a mesma arquitetura e trechos de copy, variando apenas cidade e pequenas frases locais. Isso gera:

- risco de conteúdo percebido como duplicado;
- menor diferenciação regional para SEO semântico;
- menor poder de persuasão para conversão local.

---

## 4) Nova arquitetura visual (template-base para todas as cidades)

## 4.1 Estrutura mobile-first (ordem de blocos no celular)

1. **Hero editorial** (`py-20`) com:
   - micro-etiqueta dourada (`#C6A868`),
   - headline local forte (dor + promessa),
   - subtítulo técnico curto,
   - CTA principal de WhatsApp com área de toque ampla.
2. **Seção “Dor climática local”** (`py-16`): 3 bullets de dor real da cidade.
3. **Seção “Engenharia da solução”** (`py-16`): combinação de tecido + acionamento + acabamento.
4. **Seção “Protocolo Shine na prática”** (`py-16`): checklist técnico enxuto (4 etapas).
5. **Seção “Comparativo de decisão”** (`py-16`): “solução genérica” vs “especificação premium”.
6. **Bloco de HUBs internos** (inalterado em links e hierarquia).
7. **FAQ local** com perguntas verdadeiramente regionais.
8. **CTA final** com reforço de exclusividade e agendamento.

## 4.2 Expansão desktop (>= md)

- Transição para composição **assimétrica 50/50** no topo:
  - coluna 1: imagem hiper-realista contextual da cidade;
  - coluna 2: copy + CTA.
- Seções internas com alternância de ritmos visuais (texto/visual e visual/texto).
- Mais respiro vertical (`py-20` a `py-24`) para percepção de luxo silencioso.

## 4.3 Direção de estilo

- Fundo principal: `bg-stone-100`.
- Texto: `text-zinc-900` e apoio em `text-zinc-700`.
- Destaques e microdetalhes: `#C6A868`.
- Tipografia: títulos leves/elegantes (menos “peso black” em excesso), leitura confortável em mobile.

---

## 5) Engenharia de conteúdo (framework anti-duplicação)

Cada cidade seguirá uma matriz própria de copy:

1. **Contexto local concreto** (clima, poeira, umidade, UV, tipologia de imóveis).
2. **Dor funcional** (retrabalho, mofo, desgaste, desconforto térmico/lumínico).
3. **Especificação técnica recomendada** (tecidos, abertura, forro, motorização, ferragens).
4. **Ganho percebido** (conforto, status, preservação patrimonial, rotina simplificada).
5. **CTA local** com linguagem específica da cidade.

---

## 6) Plano detalhado de 3 cidades-exemplo

## 6.1 Cidade industrial — Volta Redonda

### Narrativa central
“Conforto premium para rotina urbana com calor acumulado e pó fino industrial.”

### Estrutura de copy por seção
- **Hero**: dor de calor + poeira em superfícies têxteis; promessa de projeto fácil de higienizar.
- **Dor climática local**:
  - ganho térmico por insolação urbana;
  - pó fino aderindo em tramas inadequadas;
  - ofuscamento em home office e salas voltadas para oeste.
- **Engenharia da solução**:
  - telas solares de abertura técnica para controle de brilho;
  - composições com tecidos de manutenção prática;
  - trilhos/acionamentos com operação estável para uso diário intenso.
- **Comparativo**:
  - “tecido bonito sem especificação” vs “tecido + fator de abertura + instalação técnica”.
- **FAQ local**:
  - frequência ideal de manutenção em cenário urbano/industrial;
  - quando usar tela solar + forro;
  - como reduzir desgaste precoce em fachadas críticas.

### Direção visual específica
Imagem com living contemporâneo, luz de fim de tarde e textura limpa (ênfase em praticidade elegante).

---

## 6.2 Cidade de serra — Visconde de Mauá

### Narrativa central
“Aconchego térmico e proteção contra umidade para casas de altitude.”

### Estrutura de copy por seção
- **Hero**: conforto de inverno sem abrir mão da luz natural controlada.
- **Dor climática local**:
  - frio noturno e variação térmica;
  - umidade sazonal elevando risco de mofo;
  - necessidade de privacidade em refúgios de serra com grandes panos de vidro.
- **Engenharia da solução**:
  - camadas têxteis para isolamento (linho + forro/blackout conforme uso);
  - escolhas de materiais com melhor comportamento em ambientes úmidos;
  - acionamentos que preservam tecido e reduzem manuseio excessivo.
- **Comparativo**:
  - “solução apenas decorativa” vs “solução térmica + conforto sensorial”.
- **FAQ local**:
  - como prevenir mofo em cortinas de quartos de serra;
  - qual composição equilibra vista, privacidade e aquecimento;
  - periodicidade de ventilação/manutenção recomendada.

### Direção visual específica
Imagem com chalet/casa de serra, madeira natural, luz fria externa e interior acolhedor.

---

## 6.3 Cidade clássica — Vassouras

### Narrativa central
“Proteção UV e sofisticação sob medida para arquitetura histórica e mobiliário nobre.”

### Estrutura de copy por seção
- **Hero**: unir preservação estética do patrimônio com conforto contemporâneo.
- **Dor climática local**:
  - radiação UV desbotando mobiliário e tapetes;
  - necessidade de respeitar linguagem arquitetônica clássica;
  - controle de luz sem comprometer imponência dos ambientes.
- **Engenharia da solução**:
  - tecidos com desempenho de filtro solar para reduzir dano por luz;
  - desenho de caimento e trilhos discretos integrados a elementos clássicos;
  - motorização silenciosa em ambientes de recepção e salas formais.
- **Comparativo**:
  - “adaptação genérica de varejo” vs “alfaiataria técnica para patrimônio estético”.
- **FAQ local**:
  - como proteger peças de madeira e estofados contra desbotamento;
  - quando optar por wave, prega clássica ou persiana técnica;
  - como compatibilizar tecnologia com ambientação tradicional.

### Direção visual específica
Imagem com casarão/ambiente clássico, pé-direito alto e iluminação natural controlada.

---

## 7) Ordem de implementação após aprovação

1. Definir blueprint visual e classes utilitárias padrão (sem quebrar performance).
2. Reescrever copy e FAQ de 3 cidades-piloto (industrial, serra, clássica).
3. Validar consistência de links internos e schemas JSON-LD.
4. Escalar para demais cidades com matriz de diferenciação regional.
5. Revisão final de SEO on-page + legibilidade mobile + conversão CTA.

---

## 8) Critérios de aceite da próxima etapa (execução)

- Cada página de cidade com narrativa regional distinta e sem blocos idênticos extensos.
- Estrutura mobile-first perceptível (ordem, espaçamento, CTA touch-friendly).
- Bloco de HUBs mantido com os mesmos destinos internos.
- JSON-LD preservado em tipos válidos já existentes (sem `VideoObject`).
- Linguagem premium técnica consistente com a marca ShineCortinas.

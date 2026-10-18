# Auditoria Somente Leitura — Meta Ads (`SHINECORTINAS`)

**Data da auditoria:** 16/10/2026
**Período analisado:** 90 dias (18/07/2026 a 16/10/2026)

---

## 1. Números Consolidados da Conta (90 dias)

| Métrica | Valor |
|---|---|
| **Investido (90 dias)** | **R$ 3.854,00** (média de ~R$ 1.285/mês) |
| **Alcance** | 69.801 pessoas |
| **Frequência** | 2,31 |
| **CPM médio** | R$ 23,90 |
| **CTR médio** | 2,28% |
| **Conversas no WhatsApp iniciadas** | **105** (custo médio geral: **R$ 36,70** por conversa) |

---

## 2. Distribuição do Gasto por Campanha (90 dias)

| Campanha | Gasto | Resultado | Custo por resultado | Status em 16/10/2026 |
|---|---|---|---|---|
| **Mensagem WhatsApp** | R$ 1.742 (45%) | **93 conversas** | **R$ 18,73** | Desligada |
| **Engajamento Site ("Cortina pé-direito Buganville")** | R$ 930 (24%) | 13 contatos no site | R$ 71,53 | Desligada |
| **Nova campanha de Leads** | R$ 825 (21%) | "Múltiplas conversões" (mal configurada) | — | Desligada |
| **Campanha de LandPage** | R$ 126 (3%) | 1 lead | R$ 125,96 | Desligada |
| **3 impulsionamentos de posts do Instagram** | R$ 200 (5%) | 547 visitas ao perfil (**0 conversas**) | R$ 0,37 por visita | **Únicos ativos** (R$ 50/dia somados: R$ 11 + R$ 18 + R$ 21) |
| **"Qual o melhor modelo para cada ambiente?"** | R$ 33 (1%) | 271 cliques | R$ 0,12 | Concluída |

### Detalhamento do conjunto da campanha "Mensagem WhatsAPP" (Desligada)
- Possui um único conjunto de anúncios: **`"Mensagens WhatAPP"`** (concentrou 100% da verba e do resultado da campanha: **R$ 1.741,69 gastos → 93 conversas → R$ 18,73 cada**).

### Detalhamento dos 3 impulsionamentos ativos (90 dias)

| Post | Orçamento/dia | Gasto acumulado | Visitas ao perfil | Conversas | CPM | CTR |
|---|---|---|---|---|---|---|
| `"Tem coisa melhor do que…"` | R$ 11/dia | R$ 45 | 135 | 0 | R$ 4,53 | 1,34% |
| `"A sofisticação que o seu…"` | R$ 18/dia | R$ 73 | 224 | 0 | R$ 7,80 | 2,47% |
| `"❌ Nunca fale a quantidade de…"` | R$ 21/dia | R$ 87 | 202 | 0 | R$ 7,48 | 1,79% |
| **Total ativo hoje** | **R$ 50/dia** | **R$ 205** | **561** | **0** | — | — |

---

## 3. Os 5 Diagnósticos da Auditoria

1. **A única campanha que gerava conversas está desligada, e o que está ativo hoje não é campanha de orçamento:**
   - A campanha **Mensagem WhatsApp** gerou 93 das 105 conversas (89% do total) a **R$ 18,73** cada, mas está **desligada**.
   - O que está rodando hoje são apenas **3 impulsionamentos de posts do Instagram** otimizados para **visita ao perfil** (zero conversas geradas), somando **R$ 50/dia** (R$ 11 + R$ 18 + R$ 21), o que equivale a R$ 1.500/mês comprando apenas visitas ao perfil.
2. **Passagem pelo site encareceu o custo por contato em 4x (R$ 71,53 a R$ 125,96 contra R$ 18,73 no WhatsApp direto):**
   - Além da etapa extra entre anúncio e conversa, o diagnóstico técnico do código da landing (`/lp/anuncio-d/`) mostrou que a página tinha apenas 1 botão de WhatsApp no final (98,2% de saída sem clique no GA4) e usava o protocolo `whatsapp://send`, que sofre bloqueio no navegador interno do Instagram.
3. **Canibalização na "Nova campanha de Leads" (R$ 825 gastos):**
   - Dois conjuntos de anúncios idênticos (`"Novo conjunto de Leads"` e `"— Cópia"`) com os mesmos criativos competiram entre si no leilão.
   - O criativo `"Alphaville Cortina Azul"` consumiu R$ 710 dos R$ 825, enquanto `"Casa da Érika"` e `"Sala da Simone"` receberam entre R$ 1 e R$ 24 e não foram testados de verdade.
   - O evento de otimização ficou como `"múltiplas conversões"`, misturando cliques e eventos sem distinguir leads reais.
4. **Desempenho de criativos (projetos reais em casas de clientes vencem):**
   - Maior CTR: **"Não Compre pela Internet"** (3,9% a 4,3%) e **"Cortina pé-direito Buganville"** (3,8%), mostrando ambientes reais executados.
   - Já o post **"Nunca fale a quantidade de..."** é conteúdo de vendas/motivação (voltado a vendedores/página pessoal, não ao cliente final de cortinas sob medida) e estava rodando com verba da Shine com CTR mais baixo (1,8%).
5. **Higiene da conta:**
   - 238 campanhas e 366 anúncios acumulados historicamente, além de 25 contas/integrações vinculadas ao perfil (Zoho, Kommo, Wati, Bigin, Interakt etc., várias desativadas).

---

## 4. Decisão Estratégica do Isani (16/10/2026 — Executada pelo Isani em 17/10/2026)

1. **Na Meta Ads (Feito pelo Isani):** desativados os demais anúncios e mantido **apenas 1 anúncio ativo de reconhecimento/visita ao perfil** (para ganhar seguidores continuamente e fortalecer o Instagram como vitrine de validação do trabalho da Shine).
2. **No Google (Feito em 17/10/2026):** concentrado o foco de captação de clientes no **Google** (onde o cliente já pesquisa com intenção real de compra e sem o volume de "caroço" do feed social, como comprovado pelo cliente vindo de Vassouras via `/cidades/vassouras/` e pelos últimos 4 a 5 clientes presenciais).

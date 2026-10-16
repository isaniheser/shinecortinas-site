# Auditoria Somente Leitura — Google Ads (`989-725-8460`) e Decisão Estratégica

**Data da auditoria:** 15/10/2026
**Período analisado:** "Todo o período" (28/05/2020 a 15/10/2026)

---

## 1. Identificação e Status Geral da Conta

- **Conta principal:** `ADS Atendimento SHINE` — ID **`989-725-8460`**
- **Titular verificado:** `Shine Cortinas e Persiana LTDA` (BR)
- **Outras contas acessíveis pelo login (`isani.heser@gmail.com`):**
  - `776-282-3153` — *Shine Decor – Isani* (Cancelada)
  - `568-053-7911` — *"Conta do Google Ads"* (sem nome, secundária)
- **Status atual:**
  - **Parada desde abril de 2026** por cobrança recusada no cartão Visa final `8909` (saldo pendente de **R$ 426,57**; último pagamento manual em 05/03/2026 de R$ 2.239,08).
  - **Verificação do anunciante:** 100% concluída (documentos em 19/04/2023, questionário em 24/09/2025, declarações em 21/01/2026).
  - **Alerta crítico de campanha ativa:** A campanha `ShineCortinas – Pesquisa Premium – Região VR` ainda consta com status **Ativa** (apenas bloqueada pelo saldo de R$ 426,57) e possui **5 anúncios reprovados por Erro 404** ("Destino que não funciona"). **Deve ser pausada antes de quitar qualquer saldo.**

---

## 2. Histórico Consolidado (2020–2026)

| Métrica | Valor |
|---|---|
| **Gasto total acumulado** | **R$ 130.289,02** |
| **Interações totais** | 179.679 |
| **CPC médio histórico** | R$ 0,73 (distorcido por Display/PMax) |
| **"Todas as conversões"** | 11.948,91 (infladas por metas de visualização em Display/PMax) |

### Gasto por Ano
- **2020:** R$ 2.724 (2.826 interações)
- **2021:** R$ 8.860 (10.680 interações)
- **2022:** R$ 17.640 (11.488 interações)
- **2023:** R$ 40.616 (112.637 interações)
- **2024:** R$ 18.670 (10.266 interações)
- **2025:** R$ 37.771 (31.311 interações)
- **2026 (jan–abr):** R$ 4.008 (471 interações; mai–out R$ 0,00)

### Gasto por Tipo de Campanha
- **Pesquisa (Search):** R$ 103.354 (52.039 cliques · CPC médio R$ 1,99)
- **Display:** R$ 17.125 (92.149 interações · CPC médio R$ 0,19)
- **Performance Max:** R$ 5.702 (30.936 interações · CPC médio R$ 0,18)
- **Inteligente (Smart):** R$ 4.109 (4.555 cliques · CPC médio R$ 0,90)

### Principais Campanhas por Gasto
1. **`Campanha Vale Paraiba`** (Pausada · Pesquisa · 2022–2025): **R$ 70.997,96** (54% de todo o gasto da conta), 37.453 cliques, CTR 2,96%, CPC médio R$ 1,90 (em 2025 subiu para R$ 4,51 com R$ 24.120 gastos).
2. **`09/01/2023 – Sales-Display-2`** (Pausada · Display · 2023 e 2025): **R$ 15.709,11**, 87.819 interações, CPC R$ 0,18, 7.520 conversões falsas (visualização de página).
3. **`16/03/21`** (Removida · Pesquisa · 2021–2022): **R$ 9.972,96**, 7.678 cliques, CPC R$ 1,30.
4. **`18/04/23 Vendas-Search-14`** (Pausada · Pesquisa · 2023): **R$ 6.251,66**, 3.307 cliques, CPC R$ 1,89.
5. **`ShineCortinas – Pesquisa Premium – Região VR`** (Ativa/limitada por saldo · Pesquisa · nov/2025–abr/2026): **R$ 5.748,51**, 12.788 impressões, 860 cliques, CTR **6,73%**, CPC médio **R$ 6,68**, 49 conversões.
6. **`Leads-Performance Max-6`** (Pausada · PMax · 2025): **R$ 4.055,33**, 15.086 interações, CPC R$ 0,27.

---

## 3. Diagnóstico Técnico dos Vazamentos de Verba

1. **Correspondência ampla sem negativas na campanha `Vale Paraíba` (R$ 71 mil gastos com apenas 17 negativas):**
   - Pagou cliques de termos fora do nicho: `"moveis comprar"` (309 cliques), `"móveis"` (210), `"loja moveis"` (205), `"loja de sofa"` (180), `"design e decoração de interiores"` (222).
   - Pagou cliques em nomes de concorrentes: `"persiana fácil"` (544 cliques / R$ 436), `"farizel resende"` (R$ 333) e, na campanha Premium, `"fácil persianas é confiável"` (R$ 258 por apenas 2 cliques = R$ 129/clique).
2. **Segmentação geográfica aberta ("Presença ou interesse"):**
   - Todas as campanhas antigas (incluindo `Vale Paraíba`) estavam marcadas em *"Presença ou interesse"*, exibindo anúncios fora da região. Apenas a `Pesquisa Premium` estava corretamente em *"Presença"*.
3. **URLs antigas do Wix (Erro 404) e telefone desativado:**
   - Na `Pesquisa Premium`, os anúncios apontavam para `/produtos-de-cortinas-e-persianas-sob-medida-volta-redonda-resende-barra-mansa-e-barra-do-piraí` (hoje 404, gerando 5 anúncios reprovados) e `/cortinas-sob-medida-sul-fluminense`.
   - As extensões/anúncios de chamada ainda usam o telefone antigo `(24) 97405-1283` em vez de `(24) 99329-8763`.
4. **Medição de conversões distorcida e desconectada:**
   - A conta importava do GA4 o evento antigo `click_whatsapp` (sem disparos recentes), enquanto o evento real do site novo é **`whatsapp_click`** (corrigido no GA4 em 14/10/2026).
   - Ações irrelevantes como `YouTube channel subscriptions` e `YouTube follow-on views` estavam marcadas como **Principal**.
   - A campanha de Display inflou 7.252 "conversões" falsas na meta "Contatos".

### Termos que historicamente converteram bem (referência futura)
- `persiana rolo automatizada` (CPA R$ 7,21)
- `cortinas roller tela` (CPA R$ 8,48)
- `cortina blackout sala` (CPA R$ 11,46)
- `persiana volta redonda` (CPA R$ 14,93)

---

## 4. Decisão Estratégica do Isani e Aprendizado de Campo (15/10/2026)

1. **Orçamento atual e foco em projetos completos (não em 1 janela avulsa):**
   - O orçamento diário viável hoje para tráfego pago é de até **R$ 40/dia**, que já está alocado no **Meta Ads (Instagram/Facebook)**.
   - No Google Ads, com CPC entre R$ 6 e R$ 13, R$ 40/dia compram poucos cliques e trazem o risco de atrair clientes procurando apenas **1 persiana avulsa** (ex.: 1 tela solar para janela única), o que não compensa o custo operacional de deslocamento, medição e instalação da ShineCortinas, cujo foco são projetos completos (sacada/varanda inteira, pé-direito duplo, cortina Wave, motorização, casa/apartamento completo).
2. **Descoberta de campo fundamental (jornada real do cliente):**
   - Mesmo com o Google Ads 100% desligado desde abril de 2026 (6 meses sem gastar R$ 1,00), **a maioria dos últimos 4 a 5 clientes atendidos presencialmente pelo Isani relatou a mesma jornada**:
     1. Encontraram a ShineCortinas **no Google (gratuito)**;
     2. Viram as **avaliações no Google Meu Negócio (294 avaliações, nota 4,9)**;
     3. Foram ao **Instagram** conferir os vídeos dos projetos reais e chamaram para orçamento.
3. **Diretriz definida:**
   - **Manter o Google Ads pausado** (não tirar verba da Meta para colocar no Google Ads agora).
   - Redobrar a força no **Google Gratuito** (Google Meu Negócio + SEO orgânico das 15 páginas de cidades e artigos do blog) integrado à vitrine do Instagram.
   - Fazer auditoria dedicada do **Meta Ads** para garantir que os R$ 40/dia estejam atraindo clientes de projetos completos.

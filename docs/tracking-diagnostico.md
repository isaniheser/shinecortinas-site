# Diagnóstico de tracking (Meta Pixel + Google Tags)

## Resumo executivo

Com base no comportamento observado no Tag Assistant, o cenário mais provável é:

1. **Tag do Google existe no código**, mas não está sendo registrada na sessão de debug por contexto de execução (domínio de preview `pages.dev` + bloqueio no navegador + sessão de debug).
2. **Meta Pixel** pode variar por ambiente publicado (deploy diferente entre domínio final e preview).

Em termos práticos: o problema não é apenas “snippet ausente”, e sim **diferença de ambiente + sessão de depuração**.

## Evidências do repositório

- O snippet de Google e Meta está padronizado nas páginas HTML.
- Existe disparo de conversão no CTA de WhatsApp via Google Ads (`send_to`).
- Não há duplicação explícita de `gtag` no mesmo arquivo.

## Leitura do print enviado

No print, o Tag Assistant mostra ao mesmo tempo:

- **“Tag do Google encontrada”** (script base detectado);
- **“Nenhuma tag encontrada”** no resumo (nenhuma tag/ID depurável ativa naquela sessão).

Esse padrão costuma ocorrer quando:

- a sessão foi aberta em URL/ambiente diferente do principal (ex.: `shinecortinas-site.pages.dev`),
- há extensão de privacidade/adblock interferindo,
- ou a conexão de debug não foi “reativada” após reload com a aba correta conectada.

## Como validar sem falso negativo

1. Rodar auditoria na URL exata:
   - `./scripts/audit-tracking.sh https://www.shinecortinas.com/`
   - `./scripts/audit-tracking.sh https://shinecortinas-site.pages.dev/`
2. Testar Tag Assistant em janela anônima sem extensões.
3. Confirmar eventos em GA4 DebugView (com `debug_mode`) e Google Ads Tag Diagnostics.
4. Validar Meta com Pixel Helper na mesma URL da campanha.

## Próximo passo recomendado

Padronizar validação pré-deploy com o script de auditoria e aprovar publicação somente quando:

- domínio final e preview retornarem os snippets esperados;
- Tag Assistant (sem bloqueadores) mostrar o ID GA4 e/ou AW ativos na sessão.

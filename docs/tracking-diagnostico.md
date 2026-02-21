# Diagnóstico de tracking (Meta Pixel + Google Tags)

## Resumo objetivo

A base de código local contém **Meta Pixel + Google tag (GA4 + Ads)** em todas as páginas HTML.

Porém, na home em produção (`https://www.shinecortinas.com/`) foi identificado que o **Meta Pixel não está presente no HTML servido**, enquanto as tags do Google estão presentes.

## Evidências técnicas

- No código local, todas as páginas HTML têm:
  - `fbq('init', '6127327264052084')`
  - `gtag('config', 'G-3T725VG0NZ')`
  - `gtag('config', 'AW-628717241')`
- Na home de produção:
  - Google tag encontrada
  - Google Ads encontrada
  - Meta Pixel **não encontrado**

## Causa provável

1. **Descompasso entre repositório e produção**: a versão atualmente publicada da home não contém o snippet do Meta Pixel.
2. Para Google, em ambientes de teste com bloqueadores/rastreadores anti-tracking, é comum aparecer somente o `gtag.js` sem exibir os requests de coleta nos inspectores.

## Ação recomendada

1. Rodar `./scripts/audit-tracking.sh` antes de deploy.
2. Garantir que o deploy use exatamente a branch/commit com os snippets completos.
3. Validar em produção com:
   - Meta Pixel Helper (sem adblock)
   - Tag Assistant / GA4 DebugView (com URL de produção)


# Diagnóstico de tracking (Google Tags + Meta Pixel)

## Conclusão prática

O problema de “tag não reconhecida” no Tag Assistant é fortemente ligado a **contexto de host/sessão**:

- o site canônico usa `https://www.shinecortinas.com`;
- `https://shinecortinas.com` redireciona para `www`;
- URLs de preview (`*.pages.dev`) podem ter comportamento diferente na depuração.

Se a sessão do Tag Assistant for iniciada em um host e o carregamento efetivo ocorrer em outro, você pode ver “Tag do Google encontrada” mas sem tag depurável ativa no resumo.

## Sobre www vs sem www

Este ponto é real e precisa ser tratado na validação:

1. O teste deve iniciar no mesmo host final (`www`), sem mudança de domínio durante a sessão.
2. O canônico do projeto está em `www` nas páginas principais.
3. Testes em `pages.dev` devem ser considerados apenas para preview técnico, não para validar produção.

## Sobre o Meta Pixel aparecer só em algumas páginas

Pelos seus prints, o Pixel está ativo em páginas internas. O alerta do Meta Pixel Helper (“No pixels have fired on current page...”) pode acontecer por heurística da extensão/sessão, mesmo quando o pixel base está carregado.

O que importa para validar de forma objetiva:

- presença de `fbq('init', '6127327264052084')` no HTML da URL testada;
- presença de request para `connect.facebook.net/en_US/fbevents.js`;
- evento `PageView` (ou outro evento) no carregamento.

## Fluxo correto de validação

1. Rodar auditoria multi-página no host final:
   - `./scripts/audit-tracking.sh https://www.shinecortinas.com`
2. Rodar auditoria no host sem `www` para confirmar redirecionamento:
   - `./scripts/audit-tracking.sh https://shinecortinas.com`
3. No navegador:
   - abrir anônima sem extensões;
   - iniciar Tag Assistant diretamente em `https://www.shinecortinas.com`;
   - recarregar a página conectada;
   - validar GA4/AW no resumo da sessão.

## Diagnóstico atual do repositório

- Snippets de GA4, Google Ads e Meta Pixel estão presentes nos HTMLs locais.
- O risco principal é validação em host/ambiente diferente do canônico, gerando falso negativo na depuração.

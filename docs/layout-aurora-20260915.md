# Layout Ambientes / Aurora — 15/09/2026

Isani aprovou a composição da prévia `0b865ff` e autorizou aplicá-la e publicá-la no site.
Integração sobre `origin/main` (`cb7a5f9`), sem mesclar as propostas descartadas.

- Home Ambientes, marca oficial dourada com Aurora e cabeçalho em névoa suave.
- Menu Cortina compartilhado nas 54 páginas do sistema leve; puxador flutuante e gesto pelo logo.
- Links do menu no HTML, com navegação convencional enquanto o JavaScript não inicializar.
- Sem comparador, rotas de prévia, parâmetros `conceito` ou novas dependências.
- 53 páginas internas conservam exatamente o conteúdo principal, JSON-LD e metadados da base.
- Home conserva título, descrição, canonical, cinco avaliações reais, seis FAQs e links das 15 cidades.
- CTAs contextuais e rastreamento Cloudflare preservados; landings de anúncios mantêm seu formato próprio.

Fontes: `scripts/build-home.mjs`, `scripts/aurora-layout.mjs`, `scripts/partials.mjs` e
`assets/shine-aurora.css` / `.js`. `scripts/build-aurora.mjs` aplica a moldura às páginas
existentes sem regenerar seu conteúdo. Os geradores individuais também preservam o layout.

Verificações antes da publicação:

- Revisão independente de todos os 54 HTML, metadados, links e imagens do menu.
- Ambos os geradores idempotentes em duas execuções simuladas sem gravação.
- JavaScript e diff sem erros.
- Navegador em 320, 390 e 1280 px: home, seleção de ambiente, menu por clique e arraste,
  fechamento por Escape, navegação a Cortinas e artigo de blackout; sem overflow observado.
- Avaliações com tinta escura sobre fundo areia; texto original e autores preservados.

Publicação segue o fluxo existente: branch, PR, merge na main e confirmação do deployment
Cloudflare e das URLs públicas. Aprovação, commit e push por si só não comprovam publicação.

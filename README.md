# shinecortinas-site

## Preview automático em PR

Este repositório possui workflow de preview para Pull Requests:

- Workflow: `.github/workflows/pr-preview.yml`
- Em cada PR, um artifact chamado `site-preview-pr-<numero-do-pr>` é gerado.
- Você pode baixar o artifact na aba **Actions** da execução do PR para validar o conteúdo antes do merge.

## Deploy do site

- Workflow: `.github/workflows/pages-deploy.yml`
- O deploy para GitHub Pages roda em `push` para `main`.

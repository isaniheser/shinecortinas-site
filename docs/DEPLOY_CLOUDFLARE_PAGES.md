# Deploy no Cloudflare Pages

Para garantir que `sitemap.xml` e `robots.txt` sejam sempre gerados em cada build/deploy, configure o projeto no painel do Cloudflare Pages:

1. Acesse **Settings > Build & deployments**.
2. Em **Build command**, configure:

   ```bash
   bash build.sh .
   ```

3. Em **Build output directory**, configure `.` (ou a pasta real do site, caso isso mude no futuro).
4. Em **Root directory**, mantenha `/` se o site continuar na raiz do repositório.

Essas configurações garantem que o script `build.sh` execute `scripts/generate-sitemap.mjs` e publique os arquivos gerados no diretório de saída do build.

# Landing pages de tráfego pago (`/lp/`)

Páginas que recebem clique de anúncio (Meta Ads, Google Ads). São **páginas de
conversão**, não de busca orgânica — e por isso vivem isoladas em `/lp/`.

## Por que `/lp/` e não a raiz

O site tem 15 páginas de cidade que dependem de conteúdo único para ranquear
(premissa 1 do `CLAUDE.md`). Uma landing de anúncio é o oposto disso: copy
repetida entre variantes (A/B/C/D), pouca profundidade, foco em uma única ação.
Deixar essas páginas entrarem no índice do Google ao lado das páginas de cidade
é exatamente o padrão de *doorway page* que o Google pune.

Isolando em `/lp/`, a landing:

- fica **fora do `sitemap.xml`** (`scripts/generate-sitemap.mjs`, `EXCLUDED_PATH_PREFIXES`);
- recebe `X-Robots-Tag: noindex, nofollow` (`_headers`, bloco `/lp/*`);
- **continua rastreável** — o `robots.txt` não bloqueia `/lp/` de propósito.
  Bloquear o crawl impediria o Google de ler o próprio `noindex`, e a URL ainda
  poderia aparecer na busca como link sem conteúdo. Deixar crawlear e mandar
  `noindex` é o caminho correto para "nunca indexe isto".

Uma variante nova (`/lp/anuncio-e/`) herda tudo isso automaticamente. Não há
nada a configurar por landing.

## Estrutura

```
/lp/<nome-da-campanha>/index.html   →  https://www.shinecortinas.com/lp/<nome-da-campanha>/
```

Opcional: URL curta para o anúncio, via `_redirects`:

```
/anuncio-d  /lp/anuncio-d/  301
```

## Checklist ao subir uma landing nova

Armadilhas reais deste repo — todas já custaram tempo antes:

1. **Não copiar o redirect mobile do `index.html` da raiz.** A home tem um
   script que joga celular para `/app/`. Tráfego de Meta Ads é ~90% mobile: com
   esse script, o clique pago iria parar no PWA em vez da landing. A landing
   atende celular e desktop na mesma URL.
2. **Imagens com caminho absoluto.** Os `.avif` ficam na raiz do repo. De dentro
   de `/lp/<campanha>/`, use `/hero-sala.avif`, nunca `hero-sala.avif`.
3. **Tailwind está congelado.** `assets/tailwind.generated.css` é pré-compilado —
   classe utilitária que não existe nele simplesmente não aplica estilo. Ou a
   landing usa só classes já presentes, ou traz o próprio `<style>` inline
   (recomendado numa landing: menos requisições, mais rápida).
4. **Tag `</script>` literal.** Ao gerar HTML por script, nunca escrever a forma
   escapada — a página renderiza em branco.
5. **`noindex` também no HTML.** O header já cobre, mas a meta tag protege caso
   a página seja servida fora do Pages:
   `<meta name="robots" content="noindex, nofollow">`
6. **Sem `<link rel="canonical">` apontando para a home.** Canonical para outra
   página faz o Google tratar as duas como a mesma. Numa página `noindex`,
   canonical é desnecessário — omita.
7. **Rodar `./build.sh` e conferir** que a contagem de URLs do sitemap **não
   mudou**. Se subiu, a landing vazou para o índice.

## Rastreamento

Regra do projeto (`CLAUDE.md`): **nenhuma tag de GA4/Meta Pixel inline no HTML**.
Os IDs são injetados na camada do Cloudflare. Isso já vale para `/lp/*` — o
Pixel cobre o domínio inteiro, então a landing é rastreada sem tocar no código.

### Fluxo atual do anúncio D

A pedido do Isani, o formulário e a confirmação de qualificação foram retirados.
O visitante percorre o conteúdo educativo, os vídeos e os projetos reais e
encontra **um único CTA principal de WhatsApp no final**, antes do rodapé.
Não há coleta de nome/telefone no site, gravação de respostas em sessão nem
tela afirmando que a equipe recebeu um pedido.

A rota antiga `/lp/anuncio-d/obrigado/` redireciona para o contato no final da
landing, sem ler dados antigos nem disparar conversões. O fluxo novo não passa
por essa rota.

Eventos emitidos pelo código da landing, via `zaraz.track()` quando disponível,
com espelho em `dataLayer`:

| Momento | Evento | Significado |
|---|---|---|
| Página carrega | `ViewContent` | Visualização da landing |
| Vídeo começa pela primeira vez | `lp_video_inicio` | Início do vídeo educativo |
| Vídeo chega ao final | `lp_video_completo` | Fim do vídeo educativo |
| Clique no CTA final ou em sua alternativa | `Contact` | Intenção de contato, uma vez por carregamento |

**Não há mais `Lead`, `lp_form_inicio` nem `lp_form_passo` neste fluxo.**
`Contact` não comprova que o aplicativo abriu ou que a mensagem foi enviada,
recebida ou atribuída a um anúncio. Recarregar a página inicia uma nova medição
local de clique. UTMs e `fbclid` permanecem nos eventos, não na mensagem.
Nenhum nome ou telefone de visitante é coletado por este código.

### Abertura do WhatsApp

- O HTML contém o link HTTPS oficial `wa.me`, que continua utilizável sem JS.
- Em iPhone, iPad e Android, o script tenta `whatsapp://send?phone=...&text=...`
  diretamente no toque. Não há `target="_blank"`, clique simulado nem timer.
- Em computador, o CTA abre `web.whatsapp.com/send?phone=...&text=...`.
- Após o toque mobile, um link HTTPS alternativo aparece no mesmo bloco caso
  o navegador impeça a abertura do aplicativo. Não há redirecionamento automático
  de fallback, que poderia disputar com a abertura do app.
- O deep link precisa de validação em aparelhos reais, inclusive com WhatsApp
  Business e nos navegadores internos do Instagram/Facebook. Não há garantia de
  qual app será escolhido nem de ausência de confirmação do sistema.
- A alternativa `wa.me` pode mostrar a página intermediária do próprio WhatsApp.
  Não é possível controlar essa tela pelo código da Shine.
- A mensagem é apenas preenchida. **O visitante ainda toca em enviar no WhatsApp.**

Referências oficiais: [integração iOS do WhatsApp](https://faq.whatsapp.com/425247423114725/?cms_platform=iphone&locale=en_US)
e [universal links da Apple](https://developer.apple.com/documentation/xcode/allowing-apps-and-websites-to-link-to-your-content).
A documentação do WhatsApp recomenda `wa.me` para o destinatário específico;
o parâmetro `phone` no scheme direto não é documentado ali. Por isso a abertura
direta é uma tentativa sujeita a validação, e o link HTTPS não foi removido.

### Conferência antes de publicar

1. Confirmar o destino comercial: `5524993298763`.
2. Testar o CTA no aparelho, sem disparar mensagem real inadvertidamente.
3. Conferir `Contact` no Zaraz e no Gerenciador de Eventos separadamente.
   Evento no `dataLayer` local não comprova processamento pela Meta.
4. Revisar campanhas que ainda otimizam para `Lead`: esse evento não será mais
   emitido pela landing. A mudança de otimização/configuração de conta exige
   autorização separada; não renomear clique como lead recebido para compensar.
5. Manter a política de privacidade compatível com o rastreamento ativo do
   domínio. A retirada do formulário não desativa os serviços do Cloudflare.

### Atribuição no WhatsApp

Não anexar UTMs à mensagem: a frase “vim do anúncio” dá contexto ao atendimento,
sem afirmar qualificação concluída ou recebimento de dados. Fotos e medidas
aproximadas podem ser enviadas pelo próprio cliente na conversa.

## Publicação

Igual ao resto do site: merge na `main` → Cloudflare Pages publica em 1–2 min.

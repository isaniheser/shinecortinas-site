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

Para a **conversão** (clique no WhatsApp), a landing empurra um evento e o
Cloudflare traduz para o `Lead` do Meta. Sem `fbq` inline:

```js
// Helper único da landing. O try/catch importa: se o Zaraz não carregar
// (bloqueador de anúncio, rede ruim), a página não pode quebrar junto.
function track(evento, dados) {
  try {
    if (window.zaraz && typeof window.zaraz.track === 'function') window.zaraz.track(evento, dados);
  } catch (e) {}
  window.dataLayer = window.dataLayer || [];
  window.dataLayer.push(Object.assign({ event: evento }, dados));
}
```

Eventos que a landing dispara:

| Momento | Evento | Tipo |
|---|---|---|
| Página carrega | `ViewContent` | padrão Meta |
| Formulário começa | `lp_form_inicio` | custom |
| Cada passo concluído | `lp_form_passo` | custom |
| Formulário concluído | `Lead` | **padrão Meta** |
| Clique no WhatsApp | `Contact` | **padrão Meta** |

`Lead` e `Contact` são nomes **padrão** da Meta de propósito: as otimizações
dela são treinadas neles. Evento inventado serve para relatório, mas não
alimenta o algoritmo igual. Os `lp_*` existem só para ver onde a pessoa desiste.

Junto do `Lead` vão `event_id` (para a Meta deduplicar navegador × servidor),
`ambiente`, as UTMs e o `fbclid`. Os campos de correspondência avançada seguem
no próprio evento com os nomes reconhecidos pelo componente do Facebook:
telefone normalizado em `ph` (`55DDDNÚMERO`), primeiro nome em `fn`, cidade em
`ct` e país em `country`. O componente aplica SHA-256 no servidor e move essas
chaves para `user_data`; telefone e nome em texto aberto não devem ir para
`custom_data`.

**O que ligar no painel do Cloudflare** (não dá para fazer pelo código):

1. Zaraz → Tools → Meta Pixel → Triggers: um trigger por evento nomeado,
   escutando `Lead` e `Contact`
2. Manter `Include Event Properties` habilitado para que `ph`, `fn`, `ct`,
   `country` e `event_id` cheguem ao componente; não remapear esses valores para
   aliases em texto aberto
3. Conferir no Gerenciador de Eventos da Meta, com um clique real, que o `Lead`
   chega e que a qualidade da correspondência sobe

### LGPD — pendência aberta

A landing envia telefone e nome à Meta para fins de publicidade. Isso precisa
constar na política de privacidade do site. Não bloqueia o deploy, mas está em
aberto desde `/lp/anuncio-d/`.

### Atribuição no WhatsApp

Não anexar UTM na mensagem que o cliente envia — fica poluído e destoa do tom da
marca. Em vez disso, cada landing usa um texto próprio e natural, que já entrega
a origem para quem atende:

```
https://wa.me/5524993298763?text=Ol%C3%A1%2C%20vim%20do%20an%C3%BAncio%20da%20Shine%20e%20quero%20agendar%20minha%20consultoria%20gratuita%20em%20casa.
```

("vim do anúncio", contra "vim do site" das páginas orgânicas.)

## Publicação

Igual ao resto do site: merge na `main` → Cloudflare Pages publica em 1–2 min.

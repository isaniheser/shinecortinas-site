# Verificação do site no ar — 06/09/2026 (Chrome, Mac do Isani)

| URL | Esperado | Resultado |
|---|---|---|
| `https://www.shinecortinas.com/` | Home nova (verde e areia), 15 cidades clicáveis | ✅ Fundo `#FBFAF7`, header verde `#16302A`, título "Loja de Cortinas e Persianas em Volta Redonda \| ShineCortinas". 15 links `/cidades/<slug>/` distintos (volta-redonda, barra-mansa, resende, porto-real, itatiaia, penedo, visconde-de-maua, maromba, pinheiral, pirai, barra-do-pirai, valenca, vassouras, paulo-de-frontin, miguel-pereira). |
| `https://www.shinecortinas.com/app/` | Redireciona para a home | ✅ Terminou em `https://www.shinecortinas.com/` com o título da home. |
| `https://www.shinecortinas.com/sobre/` | Foto do Isani em campo no topo; foto da equipe mais abaixo | ✅ Hero com `/isani-consultoria.avif` (1108 px, alt "Isani Oliveira conferindo o caimento de uma cortina de linho…"). Mais abaixo `/equipe-shine.avif` (HTTP 200, 95 KB, alt "Equipe da ShineCortinas reunida, de uniforme, com Isani Oliveira ao centro"). Também `/ceo-shine.avif` e os dois selos. |
| `https://www.shinecortinas.com/persianas/` | Três cards com a tarja "Referência do modelo, em outro ambiente" | ✅ Três ocorrências da tarja (Madeira não tem tarja; Vertical e Blackout 100% têm — a terceira está em outro card acima da dobra visível). Título "Persianas Sob Medida em Volta Redonda e Sul Fluminense \| ShineCortinas". |

## Observações vistas no Google durante a coleta

- Na busca por "ShineCortinas Volta Redonda" o resultado orgânico da home já mostra o **title novo** ("Loja de Cortinas e Persianas em Volta Redonda | ShineCortinas") e a página de cidade `/cidades/volta-redonda/` também aparece com o title novo.
- O painel do Google Ads no perfil avisa: campanha "Chegou a ShineCortinas" **pausada**, **saldo da conta vencido** e anúncio com qualidade "Ruim" (texto antigo: "Cortina Rolo com Até 30% OFF"). Não é escopo desta coleta, mas o Isani deve saber.

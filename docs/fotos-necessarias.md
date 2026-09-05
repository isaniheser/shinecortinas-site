# Fotos necessárias — simulador e páginas

Regra do Isani (set/2026): **nenhuma foto "aproximada"**. A imagem tem que mostrar
exatamente o ambiente e a solução que o cliente escolheu. Enquanto a foto certa não
existir, o simulador mostra a foto de referência com a legenda
"Referência do modelo, em outro ambiente".

## O que já existe e serve como está (foto exata)

| Combinação | Foto | Mostra |
|---|---|---|
| Sala + decorar | `cortina-sob-medida.avif` | sala com cortina de linho, lareira |
| Sala + privacidade | `duplo.avif` | sala com voil + linho, pé-direito alto |
| Sala + controlar o sol | `tela-solar.avif` | sala envidraçada com rolô screen |
| Sala + escurecer | `blackouts-tecnicos.avif` | home theater com blackout |
| Home office + decorar | `madeira.avif` | escritório/estar com persiana de madeira |
| Motorização (cortina) | `automacao.avif` | sala, cortina + controle |
| Motorização (persiana) | `persiana-motorizada.avif` | sala, rolô screen + celular |

## O que falta fotografar (prioridade = o que o cliente mais escolhe)

Padrão: vertical 4:5, luz natural de dia, ambiente real de cliente (com autorização),
sem pessoas de frente, cortina/persiana fechada ou meio-aberta para mostrar a solução.
Entregar em JPG/HEIC de alta resolução; a conversão para AVIF é feita aqui.

| Prioridade | Ambiente + solução | Nome do arquivo esperado |
|---|---|---|
| 1 | Quarto com cortina blackout instalada (sobreposição na parede e forro à mostra) | `quarto-blackout.avif` |
| 2 | Quarto com cortina dupla (voil + forro/blackout) | `quarto-cortina-dupla.avif` |
| 3 | Quarto com cortina wave e forro | `quarto-wave-forro.avif` |
| 4 | Quarto com screen + blackout (dois sistemas na janela) | `quarto-screen-blackout.avif` |
| 5 | Home office com rolô blackout | `escritorio-rolo-blackout.avif` |
| 6 | Home office com double vision | `escritorio-double-vision.avif` |
| 7 | Home office com tela screen (monitor sem reflexo) | `escritorio-screen.avif` |
| 8 | Cozinha/área com persiana de madeira | `cozinha-madeira.avif` |
| 9 | Cozinha/área com rolô screen | `cozinha-rolo-screen.avif` |
| 10 | Cozinha/área com rolô blackout | `cozinha-rolo-blackout.avif` |

## Fotos por cidade (fase 4 do plano)

Para cada uma das 15 cidades, ao menos **um projeto real feito lá**, com:
- uma foto do ambiente instalado (4:5),
- uma frase do que a cortina resolveu (sol, privacidade, escuro, acabamento),
- o bairro ou condomínio (se o cliente autorizar),
- opcional: uma foto do "antes".

Ordem: Porto Real → Barra Mansa → Volta Redonda → Resende → demais.

## Observações

- `blackout.avif` e `linha-puro.avif` são fotos de **rolo de tecido**, não de ambiente.
  Servem para cards de produto, nunca para representar um cômodo.
- Ao receber uma foto nova, basta trocar o caminho na tabela `SIM` de
  `scripts/build-home.mjs` e marcar o 5º campo como `true`.

## O que a Shine NÃO trabalha (não citar, não fotografar)

- Persiana/cortina rolô com **guias laterais** ou **caixa box**. Correção do Isani (set/2026):
  não faz parte do portfólio. O escurecimento se explica por folga calculada, sobreposição na
  parede, forro e, quando necessário, trilho com vedação lateral.

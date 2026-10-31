// Regras de fatos e linguagem do CLAUDE.md, verificadas no TEXTO VISÍVEL de cada página.
// erro = bloqueia o merge. aviso = aparece no relatório, mas não bloqueia (decisão pendente do Isani).
// Para mudar uma regra: edite aqui e explique no comentário de onde ela vem.

export const REGRAS_TEXTO = [
  // Linguagem (CLAUDE.md, "Linguagem")
  { nivel: 'erro', nome: 'Palavra proibida', re: /\b(premium|VIP|de luxo|white-glove|elite|cabe no (seu )?bolso|qualquer bolso|caro demais|muito mais barato|casa de novela)\b/gi },
  { nivel: 'erro', nome: 'Travessão no texto (cacoete de IA)', re: /\s[—–]\s|[—–]/g },
  { nivel: 'erro', nome: 'Ponto e vírgula no texto (cacoete de IA)', re: /;/g },
  { nivel: 'erro', nome: 'Crase antes de "domicílio"', re: /à domicílio/gi },

  // Fatos de produto e operação (CLAUDE.md, "Fatos corrigidos pelo Isani")
  { nivel: 'erro', nome: 'Instalação no mesmo dia (não existe)', re: /(instalamos|instalação|tudo|concluída|entregamos|pronta)[^.]{0,30}\bno mesmo dia\b(?![^.]{0,40}\bnão\b)/gi, excecao: /\bnão\b[^.]{0,60}mesmo dia|mesmo dia[^.]{0,10}\bnão\b/i },
  { nivel: 'erro', nome: '"Sistema Box" (não existe)', re: /sistema box/gi },
  { nivel: 'erro', nome: 'Vedação lateral (não existe)', re: /trilho com veda[çc][ãa]o lateral|sistema de veda[çc][ãa]o lateral/gi },
  { nivel: 'erro', nome: 'Endereço físico antigo', re: /Rua K\b|27\.?2\d{2}-\d{3}/g },
  { nivel: 'erro', nome: 'Telefone fixo desativado', re: /3338[-\s.]?3069|3511[-\s.]?0195/g },
  { nivel: 'erro', nome: 'Garantia de 8 anos (não existe)', re: /\b8 anos de garantia|garantia de 8 anos/gi },
  { nivel: 'erro', nome: 'Promessa de privacidade absoluta', re: /privacidade (absoluta|total)/gi, excecao: /\bnão\b|precis|quer |busca/i },
  { nivel: 'erro', nome: 'Nota 5.0 no Google', re: /\b5[.,]0\b[^.]{0,30}(google|avalia)/gi },
  { nivel: 'erro', nome: 'Promessa de escuro/vedação total', re: /escuro total|veda[çc][ãa]o total/gi, excecao: /\bnão\b[^.]{0,40}(escuro|veda)|precis[a-z]* de (escuro|veda)/i },
  { nivel: 'erro', nome: 'Garantia vaga ("garantia total")', re: /garantia total/gi },

  // Pendentes de confirmação do Isani (auditoria 31/10/2026): aviso até ele decidir.
  { nivel: 'aviso', nome: 'Pendente Isani: nome comercial "Touch Motion"', re: /Touch Motion/g },
  { nivel: 'aviso', nome: 'Pendente Isani: integração "Apple Home"', re: /Apple Home/g },
  { nivel: 'aviso', nome: 'Pendente Isani: mofo/umidade atribuídos ao tecido', re: /mof(a|am|ar|o)\b|ret[êe]m umidade/gi },
];

// Termos que só podem aparecer no máximo 1x por página (CLAUDE.md: "Com parcimônia").
export const PARCIMONIA = [/alto padrão/gi, /refinad[oa]s?/gi];

// "luxo" só é tolerado em "não é luxo" e afins. Avisa para revisão humana.
export const LUXO = /\bluxo\b|\bluxuos[oa]s?\b/gi;

// Motor a bateria precisa da ressalva "alguns modelos / mediante consulta" (CLAUDE.md, 16/10/2026).
// Verificado por frase: frase que fala de motor/versão a bateria sem a ressalva → erro.
export const BATERIA = /(motor|motores|versão|versões|persiana|cortina)[^.]{0,40}\ba bateria\b/gi;
export const BATERIA_RESSALVA = /alguns modelos|mediante (consulta|avalia)|consulta prévia|sob consulta|modelos específicos|conforme o modelo|consultad[ao]/i;

// Número oficial do WhatsApp.
export const WHATSAPP = '5524993298763';

// 5 a 6 °C é do forro blackout de tecido (CLAUDE.md, 12/09/2026). A frase precisa citar blackout/forro.
export const CALOR_5_6 = /5 a 6\s?°C/g;
export const CALOR_5_6_CONTEXTO = /blackout|forro/i;

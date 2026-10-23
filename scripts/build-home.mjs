// Gerador Oficial da Home (Prévia E Fundida: Estética Editorial + Engenharia Comercial e SEO 100%)
import { writeFileSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import {
  FOUNDED_YEAR,
  CURRENT_YEAR,
  YEARS_ACTIVE,
  GOOGLE_RATING,
  GOOGLE_RATING_PT,
  GOOGLE_REVIEWS,
  waIcon,
  esc
} from './partials.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const FILE = join(ROOT, 'index.html');
const BASE = 'https://www.shinecortinas.com';
const TODAY = '2026-10-22';

const HOME_TITLE =
  'Cortinas, Persianas e Cortina Motorizada em Volta Redonda, Resende e Sul Fluminense | ShineCortinas';
const HOME_DESC =
  'Cortinas e persianas sob medida com consultoria gratuita em domicílio em Volta Redonda, Resende, Barra Mansa, Vassouras e 15 cidades do Sul Fluminense. Ateliê próprio desde 2009 e até 5 anos de garantia.';

const CITIES = [
  ['volta-redonda', 'Volta Redonda'],
  ['barra-mansa', 'Barra Mansa'],
  ['resende', 'Resende'],
  ['porto-real', 'Porto Real'],
  ['itatiaia', 'Itatiaia'],
  ['penedo', 'Penedo'],
  ['visconde-de-maua', 'Visconde de Mauá'],
  ['maromba', 'Maromba'],
  ['pinheiral', 'Pinheiral'],
  ['pirai', 'Piraí'],
  ['barra-do-pirai', 'Barra do Piraí'],
  ['valenca', 'Valença'],
  ['vassouras', 'Vassouras'],
  ['paulo-de-frontin', 'Engenheiro Paulo de Frontin'],
  ['miguel-pereira', 'Miguel Pereira']
];

const AREA_SERVED_NAMES = [
  'Itatiaia',
  'Resende',
  'Penedo',
  'Visconde de Mauá',
  'Maromba',
  'Porto Real',
  'Barra Mansa',
  'Volta Redonda',
  'Pinheiral',
  'Piraí',
  'Barra do Piraí',
  'Valença',
  'Vassouras',
  'Paulo de Frontin',
  'Miguel Pereira',
  'Sul Fluminense',
  'Costa Verde'
];

// 5 avaliações 100% integrais conforme docs/dados-google/avaliacoes.json
const REVIEWS = [
  {
    initials: 'MR',
    name: 'Marcio Rocha',
    tag: '🛡️ Pós-Venda e Compromisso',
    body: 'Atendimento ágil, entrega rápida e cortinas impecáveis. Senhor Isani empresário sério. Fiz uma escolha errada e ele resolveu meu problema sem nenhuma burocracia! Espetacular!'
  },
  {
    initials: 'AR',
    name: 'Amanda Rocha da Silva',
    tag: '⏱️ Pontualidade e Visita em Casa',
    body: 'EXCELÊNCIA! Desde a visita técnica inicial, passando pelo orçamento, cumprimento de prazo de entrega, instalação e pós venda, tudo feito com muita excelência, empatia e compromisso com a satisfação e necessidade do cliente. Atendimento nota mil do início ao fim. Produtos da mais alta qualidade! Indico de olhos fechados!'
  },
  {
    initials: 'MS',
    name: 'Marcio Soares',
    tag: '✨ Cliente Recorrente',
    body: 'Gostaria de agradecer mais uma vez pelo excelente trabalho realizado. Essa já é a segunda vez que escolho a empresa, e novamente fiquei muito satisfeita com o atendimento, cuidado e qualidade do serviço prestado. As cortinas ficaram impecáveis e fizeram toda a diferença no ambiente. Parabéns a toda a equipe pelo profissionalismo e dedicação. Com certeza continuarei recomendando!'
  },
  {
    initials: 'LF',
    name: 'Luan Ferreira',
    tag: '🌟 Atendimento Nota 10',
    body: 'Experiência excelente com a Shine Cortinas! Fiquei muito impressionado com a qualidade impecável do produto e o atendimento foi nota 10 do início ao fim. Recomendo de olhos fechados para quem busca sofisticação e profissionalismo.'
  },
  {
    initials: 'VF',
    name: 'Vitória Fernandes',
    tag: '🏠 Pontualidade e Qualidade',
    body: 'Trabalho de excelência, pontuais e ótimos profissionais. Fiquei muito satisfeita, recomendo.'
  }
];

// 8 Perguntas Frequentes (100% idênticas entre o HTML visível #faq e o FAQPage JSON-LD)
const FAQ = [
  [
    'Como funciona o investimento num projeto sob medida?',
    'Cada projeto é único, então não há tabela de preços fixa: o valor depende do ambiente, dos tecidos escolhidos e do tipo de instalação. Na consultoria em domicílio, gratuita, o consultor apresenta as opções e as condições, incluindo a comodidade de parcelar em até 12x. Você decide com calma, sem compromisso.'
  ],
  [
    'Vocês instalam cortina motorizada e persiana motorizada em Volta Redonda e Resende?',
    'Sim. Projetamos e instalamos cortina motorizada em trilho Wave ou prega e persiana motorizada (rolô, tela solar e blackout) em Volta Redonda, Resende, Barra Mansa, Penedo, Itatiaia e todo o Sul Fluminense, com motorização silenciosa elétrica (110V/220V) ou a bateria recarregável em alguns modelos (mediante consulta) e integração com Alexa e controle remoto.'
  ],
  [
    'Vocês atendem na minha cidade?',
    'Sim. Atendemos todo o Sul Fluminense: Volta Redonda, Barra Mansa, Resende, Itatiaia, Penedo, Visconde de Mauá, Maromba, Porto Real, Pinheiral, Piraí, Barra do Piraí, Valença, Vassouras, Engenheiro Paulo de Frontin e Miguel Pereira. O consultor vai até você.'
  ],
  [
    'Tenho que ir até a loja?',
    'Não. Somos pioneiros no modelo de consultoria em domicílio: o especialista vai até a sua casa com o mostruário, mede cada ambiente a laser e apresenta as melhores opções no seu espaço. Você escolhe sem sair de casa e sem pressão.'
  ],
  [
    'Quanto tempo leva para instalar?',
    'Trabalhamos exclusivamente sob medida: após a medição a laser, cada peça é confeccionada para o seu vão. Quando fica pronta e agendamos a entrega, o serviço de instalação em si leva poucas horas em uma única visita na maioria dos projetos, deixando o ambiente limpo e pronto.'
  ],
  [
    'O blackout bloqueia toda a luz do quarto?',
    'Depende do forro. O forro blackout 100% bloqueia a passagem de luz pelo tecido, reduz de 5 a 6 °C do calor no ambiente e entrega o quarto escuro de verdade, independentemente de a cortina da frente ser clara ou escura. O forro blackout de 70%, chamado de semi blackout, deixa o ambiente em penumbra. Na consultoria o especialista mede a janela e indica o forro certo.'
  ],
  [
    'Vocês fazem lavagem de cortinas sob medida?',
    'Sim. Em Volta Redonda, Barra Mansa, Resende, Barra do Piraí, Piraí e Pinheiral, nossa equipe retira sua cortina de tecido no local, higieniza na vertical conforme a composição do tecido ou blackout e devolve instalada e revisada no trilho.'
  ],
  [
    'Qual é a garantia e qual a medida ideal do cortineiro de gesso?',
    'A garantia é de 1 ano para cortinas e persianas não motorizadas e chega a até 5 anos nos projetos motorizados. Para quem está em obra, pedimos vão livre mínimo de 15 x 15 cm no cortineiro de gesso para a Cortina Wave correr solta (ou 18 a 20 cm para trilho duplo).'
  ]
];

const VIDEO_STORIES = [
  {
    city: 'Resende',
    sub: 'Wave Motor',
    title: '📍 Resende · Cortina Wave Motorizada',
    videoId: 'bf8afe030678afeb1e9bb2ebc369d4c4',
    poster: '/poster-cortina-motorizada-wave-resende.avif',
    alt: 'Vídeo de Cortina Wave Motorizada instalada em Resende RJ',
    pageUrl: '/videos/cortina-motorizada-wave-resende/',
    wa: 'Quero orçar uma Cortina Wave Motorizada como a da obra de Resende.'
  },
  {
    city: 'Vassouras',
    sub: 'Chalé A-Frame',
    title: '📍 Vassouras · Chalé A-Frame Inclinado',
    videoId: '7ca4a561d6c2b83619fe8f61a3938f85',
    poster: '/poster-cortina-cabana-chale-vassouras.avif',
    alt: 'Vídeo de cortina sob medida para Chalé A-Frame em Vassouras RJ',
    pageUrl: '/videos/cortina-cabana-chale-vassouras/',
    wa: 'Vi a obra do Chalé em Vassouras e tenho um vão especial para orçar.'
  },
  {
    city: 'B. Mansa',
    sub: 'Madeira 50mm',
    title: '📍 Barra Mansa · Persiana Madeira 50 mm',
    videoId: 'e5cbe78a24295d14cfa224fbc07fe627',
    poster: '/poster-persiana-horizontal-madeira-barra-mansa.avif',
    alt: 'Vídeo de Persiana Horizontal de Madeira 50 mm em Barra Mansa RJ',
    pageUrl: '/videos/persiana-horizontal-madeira-barra-mansa/',
    wa: 'Vi a Persiana de Madeira 50 mm instalada em Barra Mansa e quero orçar.'
  },
  {
    city: 'B. do Piraí',
    sub: 'Toque de Linho',
    title: '📍 Barra do Piraí · Wave Toque de Linho',
    videoId: '7c540a12c9b267eb30ef2d195258e617',
    poster: '/poster-cortina-wave-linho-barra-do-pirai.avif',
    alt: 'Vídeo de Cortina Wave com toque de linho instalada em Barra do Piraí RJ',
    pageUrl: '/videos/cortina-wave-linho-barra-do-pirai/',
    wa: 'Vi a Cortina Wave com toque de linho instalada em Barra do Piraí e quero orçar.'
  },
  {
    city: 'Mangaratiba',
    sub: 'Tela Solar',
    title: '📍 Mangaratiba · Rolô Screen Motorizada',
    videoId: '43fabc4ce7fc6528fc8a1594bad09a96',
    poster: '/poster-cortina-screen-motorizada-mangaratiba.avif',
    alt: 'Vídeo de Persiana Rolô Screen motorizada instalada em Mangaratiba RJ',
    pageUrl: '/videos/cortina-screen-motorizada-mangaratiba/',
    wa: 'Vi a Persiana Screen motorizada instalada em Mangaratiba e quero orçar.'
  },
  {
    city: 'V. Redonda',
    sub: 'Bainha 1 cm',
    title: '📍 Volta Redonda · Ajuste de Bainha a 1 cm do Piso',
    videoId: 'c9058bc905c6e533b7a31c6013677fbe',
    poster: '/poster-ajuste-bainha-em-casa-alfaiataria.avif',
    alt: 'Vídeo de ajuste de bainha a 1 cm do piso em Volta Redonda RJ',
    pageUrl: '/videos/ajuste-bainha-em-casa-alfaiataria/',
    wa: 'Vi o vídeo do acabamento de bainha a 1 cm do piso e quero agendar visita.'
  },
  {
    city: 'Mostruário',
    sub: 'Alfaiataria',
    title: '✦ Mostruário em Casa · Toque nos Tecidos',
    videoId: '77a0dba5ef28b998dc81c346352e9a2f',
    poster: '/poster-experiencia-tecidos-alfaiataria.avif',
    alt: 'Vídeo da experiência de escolha de tecidos de alfaiataria em domicílio',
    pageUrl: '/videos/experiencia-tecidos-alfaiataria/',
    wa: 'Quero conhecer os tecidos encorpados da Shine na minha casa.'
  },
  {
    city: 'Instalação',
    sub: 'Equipe Própria',
    title: '🛠️ Equipe Própria · Instalação no Sul Fluminense',
    videoId: 'bb5e291aafac2c7c9c24b4b5fcd2af98',
    poster: '/poster-instalacao-sul-fluminense.avif',
    alt: 'Vídeo da equipe própria da ShineCortinas instalando no Sul Fluminense',
    pageUrl: '/videos/instalacao-sul-fluminense/',
    wa: 'Quero agendar uma visita com a equipe própria da Shine.'
  }
];

// 16 Cards do Bento Grid com 16 fotos 100% únicas (zero duplicação na página)
const BENTO_ITEMS = [
  {
    id: 'wave',
    cats: 'tecido wave',
    img: '/cortina-sob-medida.avif',
    alt: 'Imagem de referência de Cortina Prega Wave sob medida para sala',
    pos: 'center 65%',
    tag: '✦ Referência · Wave',
    title: 'Cortina Wave · Sala',
    sub: 'Toque de linho · Ver ficha',
    initialClass: 'bento-pos-0'
  },
  {
    id: 'duplo',
    cats: 'tecido wave pedireitoduplo motorizada insta',
    img: '/hall-wave-volta-redonda.avif',
    alt: 'Obra real de Cortina Wave em pé-direito alto instalada em Volta Redonda RJ',
    pos: 'center 45%',
    tag: '🟢 Obra Real',
    title: 'Pé-Direito Duplo',
    sub: 'Volta Redonda · Ver ficha',
    initialClass: 'bento-pos-1'
  },
  {
    id: 'blackout',
    cats: 'tecido wave blackout',
    img: '/blackouts-tecnicos.avif',
    alt: 'Imagem de referência de Cortina com Forro Blackout 100% para quarto e sala de TV',
    pos: 'center 55%',
    tag: '✦ Referência',
    title: 'Blackout 100%',
    sub: 'Bloqueio de luz · Ver ficha',
    initialClass: 'bento-pos-2'
  },
  {
    id: 'solar',
    cats: 'estruturada rolo persiana',
    img: '/tela-solar-sq.avif',
    alt: 'Imagem de referência de Persiana Rolô Tela Solar corta-calor para varanda',
    pos: 'center 55%',
    tag: '✦ Referência · Tela Solar',
    title: 'Persiana Rolô · Tela Solar',
    sub: 'Corta-calor UV · Ver ficha',
    initialClass: 'bento-pos-3'
  },
  {
    id: 'resende_real',
    cats: 'tecido wave pedireitoduplo motorizada insta',
    img: '/poster-cortina-motorizada-wave-resende.avif',
    alt: 'Obra real de Cortina Wave motorizada instalada em Resende RJ',
    pos: 'center 50%',
    tag: '🟢 Obra Real · Resende',
    title: 'Wave Motorizada · Resende',
    sub: '▶ Vídeo real · Ver ficha',
    initialClass: 'is-hidden'
  },
  {
    id: 'madeira',
    cats: 'persiana horizontal madeira insta',
    img: '/madeira-sq.avif',
    alt: 'Obra real de Persiana Horizontal de Madeira 50 mm em Barra Mansa RJ',
    pos: 'center 50%',
    tag: '🟢 Obra Real · Barra Mansa',
    title: 'Persiana Madeira 50 mm',
    sub: '▶ Vídeo real · Ver ficha',
    initialClass: 'is-hidden'
  },
  {
    id: 'aluminio',
    cats: 'persiana horizontal aluminio',
    img: '/persiana-motorizada-sq.avif',
    alt: 'Imagem de referência de Persiana Horizontal de Alumínio 25 mm',
    pos: 'center 50%',
    tag: '✦ Referência · Alumínio',
    title: 'Persiana de Alumínio 25 mm',
    sub: 'Fácil limpeza · Ver ficha',
    initialClass: 'is-hidden'
  },
  {
    id: 'vassouras',
    cats: 'tecido wave pedireitoduplo blackout insta',
    img: '/poster-cortina-cabana-chale-vassouras.avif',
    alt: 'Obra real de cortina sob medida em Chalé A-Frame em Vassouras RJ',
    pos: 'center 45%',
    tag: '🟢 Obra Real · Vassouras',
    title: 'Chalé A-Frame · Vão Alto',
    sub: '▶ Vídeo real · Ver ficha',
    initialClass: 'is-hidden'
  },
  {
    id: 'barradopirai',
    cats: 'tecido wave insta',
    img: '/poster-cortina-wave-linho-barra-do-pirai.avif',
    alt: 'Obra real de Cortina Wave com toque de linho instalada em Barra do Piraí RJ',
    pos: 'center 50%',
    tag: '🟢 Obra Real · Barra do Piraí',
    title: 'Wave Toque de Linho',
    sub: '▶ Vídeo real · Ver ficha',
    initialClass: 'is-hidden'
  },
  {
    id: 'mangaratiba',
    cats: 'estruturada rolo motorizada insta',
    img: '/poster-cortina-screen-motorizada-mangaratiba.avif',
    alt: 'Obra real de Persiana Rolô Screen motorizada em Mangaratiba RJ',
    pos: 'center 50%',
    tag: '🟢 Obra Real · Mangaratiba',
    title: 'Rolô Screen Motorizada',
    sub: '▶ Vídeo real · Ver ficha',
    initialClass: 'is-hidden'
  },
  {
    id: 'pregamacho',
    cats: 'tecido pregafemea pregamacho franzida',
    img: '/linha-puro.avif',
    alt: 'Imagem de referência de Cortina Prega Fêmea, Prega Macho e Franzida em tecido toque de linho',
    pos: 'center 50%',
    tag: '✦ Referência · Alfaiataria',
    title: 'Prega Fêmea, Macho e Franzida',
    sub: 'Costura própria · Ver ficha',
    initialClass: 'is-hidden'
  },
  {
    id: 'motor',
    cats: 'motorizada tecido wave',
    img: '/automacao-sq.avif',
    alt: 'Imagem de referência de Cortina Motorizada com controle remoto e Alexa',
    pos: 'center 75%',
    tag: '✦ Referência · Automação',
    title: 'Motorizada · Alexa e Controle',
    sub: 'Até 5 anos garantia · Ver ficha',
    initialClass: 'is-hidden'
  },
  {
    id: 'bainha',
    cats: 'tecido wave insta',
    img: '/poster-ajuste-bainha-em-casa-alfaiataria.avif',
    alt: 'Obra real mostrando ajuste de bainha a 1 cm do piso em Volta Redonda RJ',
    pos: 'center 50%',
    tag: '🟢 Obra Real · Volta Redonda',
    title: 'Bainha a 1 cm do Piso',
    sub: '▶ Vídeo real · Ver ficha',
    initialClass: 'is-hidden'
  },
  {
    id: 'lavagem',
    cats: 'lavagem',
    img: '/lavagem-vertical-cortinas-800.avif',
    alt: 'Serviço de lavagem e secagem vertical de cortinas de tecido',
    pos: '50% 68%',
    tag: '🟢 Serviço · 6 Cidades',
    title: 'Lavagem de Cortinas de Tecido',
    sub: 'Retirada em casa · Ver ficha',
    initialClass: 'is-hidden'
  },
  {
    id: 'romana',
    cats: 'estruturada romana doublevision persiana',
    img: '/blackout-sq.avif',
    alt: 'Imagem de referência de Persiana Romana e Double Vision sob medida',
    pos: 'center 50%',
    tag: '✦ Referência · Romana & Double',
    title: 'Romana & Double Vision',
    sub: 'Gomos estruturados · Ver ficha',
    initialClass: 'is-hidden'
  },
  {
    id: 'vertical',
    cats: 'persiana vertical estruturada painel',
    img: '/hero-sala.avif',
    alt: 'Imagem de referência de Persiana Vertical e Cortina Painel para grandes vãos',
    pos: 'center 50%',
    tag: '✦ Referência · Grandes Vãos',
    title: 'Persiana Vertical & Painel',
    sub: 'Giro 180° e folhas largas · Ver ficha',
    initialClass: 'is-hidden'
  }
];

const schemaJson = {
  '@context': 'https://schema.org',
  '@graph': [
    {
      '@type': 'Organization',
      '@id': `${BASE}/#org`,
      name: 'ShineCortinas',
      url: `${BASE}/`,
      logo: `${BASE}/logo-shine.avif`,
      foundingDate: String(FOUNDED_YEAR),
      sameAs: [
        'https://www.instagram.com/shinecortinas/',
        'https://www.facebook.com/shinecortinas',
        'https://www.youtube.com/@shinecortinas',
        'https://www.tiktok.com/@shinecortinas',
        'https://www.pinterest.com/shinecortinas'
      ],
      founder: { '@id': `${BASE}/#isani` },
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+5524993298763',
          contactType: 'customer service',
          areaServed: 'BR',
          availableLanguage: 'Portuguese'
        }
      ],
      areaServed: AREA_SERVED_NAMES
    },
    {
      '@type': ['LocalBusiness', 'HomeAndConstructionBusiness'],
      '@id': `${BASE}/#biz`,
      name: 'ShineCortinas',
      url: `${BASE}/`,
      image: `${BASE}/hall-wave-volta-redonda.avif`,
      telephone: '+5524993298763',
      address: {
        '@type': 'PostalAddress',
        addressLocality: 'Volta Redonda',
        addressRegion: 'RJ',
        addressCountry: 'BR'
      },
      areaServed: AREA_SERVED_NAMES,
      parentOrganization: { '@id': `${BASE}/#org` },
      sameAs: [
        'https://www.instagram.com/shinecortinas/',
        'https://www.facebook.com/shinecortinas',
        'https://www.tiktok.com/@shinecortinas',
        'https://www.youtube.com/@shinecortinas',
        'https://www.pinterest.com/shinecortinas'
      ],
      priceRange: '$$',
      review: REVIEWS.map((r) => ({
        '@type': 'Review',
        author: { '@type': 'Person', name: r.name },
        reviewRating: { '@type': 'Rating', ratingValue: '5', bestRating: '5' },
        reviewBody: r.body
      })),
      openingHoursSpecification: [
        {
          '@type': 'OpeningHoursSpecification',
          dayOfWeek: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday'],
          opens: '08:00',
          closes: '17:00'
        }
      ],
      contactPoint: [
        {
          '@type': 'ContactPoint',
          telephone: '+5524993298763',
          contactType: 'customer service',
          areaServed: 'BR',
          availableLanguage: 'Portuguese'
        }
      ],
      aggregateRating: {
        '@type': 'AggregateRating',
        ratingValue: GOOGLE_RATING,
        reviewCount: GOOGLE_REVIEWS,
        bestRating: '5',
        worstRating: '1'
      }
    },
    {
      '@type': 'Person',
      '@id': `${BASE}/#isani`,
      name: 'Isani Oliveira',
      jobTitle: 'Fundador e especialista em cortinas e persianas sob medida',
      description:
        'Fundador da ShineCortinas, à frente da empresa desde 2009. Projeta cortinas e persianas sob medida para residências do Sul Fluminense.',
      worksFor: { '@id': `${BASE}/#org` },
      url: `${BASE}/sobre/`,
      image: `${BASE}/isani-consultoria.avif`,
      sameAs: [
        'https://www.instagram.com/shinecortinas/',
        'https://www.facebook.com/shinecortinas',
        'https://www.tiktok.com/@shinecortinas',
        'https://www.youtube.com/@shinecortinas',
        'https://www.pinterest.com/shinecortinas'
      ]
    },
    {
      '@type': 'WebSite',
      '@id': `${BASE}/#website`,
      url: `${BASE}/`,
      name: 'ShineCortinas',
      inLanguage: 'pt-BR',
      publisher: { '@id': `${BASE}/#org` }
    },
    {
      '@type': 'Service',
      '@id': `${BASE}/#service-cortinas`,
      name: 'Cortinas sob medida em tecido',
      serviceType: 'Cortina sob medida',
      provider: { '@id': `${BASE}/#biz` },
      areaServed: AREA_SERVED_NAMES,
      url: `${BASE}/cortinas/`
    },
    {
      '@type': 'Service',
      '@id': `${BASE}/#service-cortina-wave`,
      name: 'Cortina Prega Wave sob medida',
      serviceType: 'Cortina Wave',
      provider: { '@id': `${BASE}/#biz` },
      areaServed: AREA_SERVED_NAMES,
      url: `${BASE}/cortina-wave/`
    },
    {
      '@type': 'Service',
      '@id': `${BASE}/#service-persianas`,
      name: 'Persianas sob medida (Rolô, Romana, Double Vision, Madeira e Alumínio)',
      serviceType: 'Persianas sob medida',
      provider: { '@id': `${BASE}/#biz` },
      areaServed: AREA_SERVED_NAMES,
      url: `${BASE}/persianas/`
    },
    {
      '@type': 'Service',
      '@id': `${BASE}/#service-cortina-motorizada`,
      name: 'Cortina motorizada sob medida',
      serviceType: 'Cortina motorizada',
      provider: { '@id': `${BASE}/#biz` },
      areaServed: AREA_SERVED_NAMES,
      url: `${BASE}/cortina-motorizada/`
    },
    {
      '@type': 'Service',
      '@id': `${BASE}/#service-blackout-forros`,
      name: 'Blackout e forros técnicos',
      serviceType: 'Blackout e forros',
      provider: { '@id': `${BASE}/#biz` },
      areaServed: AREA_SERVED_NAMES,
      url: `${BASE}/blackout-e-forros/`
    },
    {
      '@type': 'Service',
      '@id': `${BASE}/#service-trilhos-acionamentos`,
      name: 'Trilhos e acionamentos para cortinas',
      serviceType: 'Trilhos e acionamentos',
      provider: { '@id': `${BASE}/#biz` },
      areaServed: AREA_SERVED_NAMES,
      url: `${BASE}/trilhos-e-acionamentos/`
    },
    {
      '@type': 'Service',
      '@id': `${BASE}/#service-lavagem`,
      name: 'Lavagem e higienização vertical de cortinas de tecido',
      serviceType: 'Lavagem de cortinas',
      provider: { '@id': `${BASE}/#biz` },
      areaServed: ['Volta Redonda', 'Barra Mansa', 'Resende', 'Barra do Piraí', 'Piraí', 'Pinheiral'],
      url: `${BASE}/lavagem-de-cortinas/`
    },
    {
      '@type': 'CollectionPage',
      '@id': `${BASE}/#portfolio`,
      name: 'Portfólio ShineCortinas',
      hasPart: [
        {
          '@type': 'ImageObject',
          name: 'Obra Real em Volta Redonda | Cortina Wave do teto ao piso',
          contentUrl: `${BASE}/hall-wave-volta-redonda.avif`,
          caption: 'Cortina Prega Wave sob medida instalada de ponta a ponta em sala integrada em Volta Redonda.'
        },
        {
          '@type': 'ImageObject',
          name: 'Obra Real em Resende | Cortina Wave motorizada',
          contentUrl: `${BASE}/poster-cortina-motorizada-wave-resende.avif`,
          caption: 'Cortina Wave motorizada sob medida instalada em residência em Resende RJ.'
        },
        {
          '@type': 'ImageObject',
          name: 'Obra Real em Barra Mansa | Persiana Horizontal de Madeira 50 mm',
          contentUrl: `${BASE}/madeira-sq.avif`,
          caption: 'Persiana Horizontal em lâminas de madeira natural de 50 mm instalada em Barra Mansa RJ.'
        }
      ],
      dateModified: TODAY
    },
    {
      '@type': 'FAQPage',
      '@id': `${BASE}/#faq`,
      mainEntity: FAQ.map(([q, a]) => ({
        '@type': 'Question',
        name: q,
        acceptedAnswer: { '@type': 'Answer', text: a }
      }))
    },
    {
      '@type': 'WebPage',
      '@id': `${BASE}/`,
      url: `${BASE}/`,
      name: HOME_TITLE,
      inLanguage: 'pt-BR',
      isPartOf: { '@id': `${BASE}/#website` },
      about: { '@id': `${BASE}/#biz` },
      dateModified: TODAY,
      speakable: {
        '@type': 'SpeakableSpecification',
        xpath: ['/html/body//h1', '/html/body//h1/following-sibling::p[1]']
      }
    }
  ]
};

const html = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>${HOME_TITLE}</title>
  <meta name="description" content="${HOME_DESC}">
  <meta name="yandex-verification" content="329cd5a44fd952c5" />
  <link rel="canonical" href="${BASE}/">
  <meta name="theme-color" content="#08130F">
  <meta name="author" content="Isani Oliveira · ShineCortinas">
  <meta name="robots" content="index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1">

  <link rel="me" href="https://www.instagram.com/shinecortinas/">
  <link rel="me" href="https://www.facebook.com/shinecortinas">
  <link rel="me" href="https://www.youtube.com/@shinecortinas">
  <link rel="me" href="https://www.tiktok.com/@shinecortinas">
  <link rel="me" href="https://www.pinterest.com/shinecortinas">
  <link rel="me" href="https://www.linkedin.com/in/isani-oliveira-93482834b/">

  <meta property="og:type" content="website">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:site_name" content="ShineCortinas">
  <meta property="og:title" content="${HOME_TITLE}">
  <meta property="og:description" content="Levamos o mostruário até a sua sala para você escolher tocando no tecido contra a luz real da sua janela. Ateliê próprio desde 2009 e nota ${GOOGLE_RATING_PT} no Google.">
  <meta property="og:url" content="${BASE}/">
  <meta property="og:image" content="${BASE}/og-cover.jpg">
  <meta property="og:image:width" content="1200">
  <meta property="og:image:height" content="630">
  <meta property="og:image:alt" content="Sala vestida do teto ao piso com cortina sob medida ShineCortinas">

  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:title" content="${HOME_TITLE}">
  <meta name="twitter:description" content="${HOME_DESC}">
  <meta name="twitter:image" content="${BASE}/og-cover.jpg">

  <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96">
  <link rel="icon" type="image/svg+xml" href="/favicon.svg">
  <link rel="shortcut icon" href="/favicon.ico">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
  <link rel="manifest" href="/site.webmanifest">

  <link rel="preload" as="image" href="/duplo.avif" fetchpriority="high" type="image/avif">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="preload" as="style" href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap">
  <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet" media="print" onload="this.media='all'">
  <noscript>
    <link href="https://fonts.googleapis.com/css2?family=Cormorant+Garamond:ital,wght@0,600;0,700;1,600&family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
  </noscript>
  <link rel="stylesheet" href="/assets/shine-home-e.css?v=5">

  <script type="application/ld+json">
${JSON.stringify(schemaJson, null, 2)}
  </script>
</head>
<body class="pv-home" data-concept="previa-e" data-wa-context="a página inicial">
  <a href="#conteudo" class="skip-link">Pular para o conteúdo principal</a>
  <div id="site-viewport">
    <!-- HEADER GLASSMORPHIC STICKY -->
    <header class="d-header">
      <div class="d-header__in">
        <a href="/" class="d-brand">
          <img src="/logo-shine.avif" alt="ShineCortinas Cortinas e Persianas Sob Medida" width="42" height="42" decoding="async">
          <div class="d-brand__text">
            <strong>SHINECORTINAS</strong>
            <small>Ateliê Sob Medida · Desde ${FOUNDED_YEAR}</small>
          </div>
        </a>
        <nav class="d-nav" aria-label="Navegação principal">
          <a href="#diagnostico-isani">Consultor Isani</a>
          <a href="#portfolio">Acervo</a>
          <a href="/cortinas/">Cortinas</a>
          <a href="/persianas/">Persianas</a>
          <a href="#blog">Blog e Guias</a>
          <a href="#faq">Dúvidas</a>
        </nav>
        <div class="d-header__cta">
          <a href="#selection-bar" class="d-saved-badge" id="header-saved-pill">
            <span>♡</span> <span id="header-saved-count">0 salvas</span>
          </a>
          <a class="d-gold-btn" data-wa="header" data-wa-custom="1" href="https://wa.me/5524993298763?text=Ol%C3%A1%2C%20vim%20do%20site%20da%20Shine%20e%20quero%20agendar%20minha%20consultoria%20gratuita." target="_blank" rel="noopener">
            <span class="d-hide-mob">Receber </span>Ateliê em Casa →
          </a>
        </div>
      </div>
    </header>

    <main id="conteudo">
      <!-- HERO COM 1 ÚNICA FOTO IMPONENTE -->
      <section class="d-hero" id="top">
        <div class="d-hero__grid">
          <div>
            <h1>
              <span class="d-hero-kicker">Cortinas e Persianas Sob Medida · Sul Fluminense</span>
              Sabe aquela sala que faz a visita parar na porta? <em>O segredo nunca é só o sofá.</em>
            </h1>
            <p class="d-hero__lead">
              <strong>Não arrisque escolher por foto:</strong> levamos o mostruário até a sua sala para você escolher tocando no tecido, contra a luz real da sua janela.
            </p>

            <div class="d-hero__actions">
              <a class="d-gold-btn" data-wa="hero" data-wa-custom="1" href="https://wa.me/5524993298763?text=Ol%C3%A1%2C%20vim%20do%20site%20da%20Shine%20e%20quero%20receber%20o%20consultor%20com%20as%20amostras%20em%20casa." target="_blank" rel="noopener">
                Quero Minha Consultoria Gratuita em Casa →
              </a>
            </div>

            <div class="d-app-chips">
              <div class="d-trust-chip">
                <small>Google</small>
                <strong>${GOOGLE_RATING_PT} ★</strong>
                <span>${GOOGLE_REVIEWS} Avaliações</span>
              </div>
              <div class="d-trust-chip">
                <small>Tradição</small>
                <strong><b data-since="${FOUNDED_YEAR}" style="font-weight:inherit;">${YEARS_ACTIVE}</b> Anos</strong>
                <span>Ateliê Próprio</span>
              </div>
              <div class="d-trust-chip">
                <small>Segurança</small>
                <strong>Até 5</strong>
                <span>Anos Garantia*</span>
              </div>
            </div>
            <p class="d-warranty-note">*Garantia de 1 ano para cortinas e persianas não motorizadas e até 5 anos para projetos motorizados. Parcelamento em até 12x.</p>
          </div>

          <div class="d-hero__stage">
            <div class="d-hero__single-frame">
              <span class="d-frame-pill">Pé-Direito Duplo · Do Teto ao Piso</span>
              <img src="/duplo.avif" alt="Cortina Prega Wave sob medida do teto ao piso em pé-direito duplo no Sul Fluminense" width="800" height="500" fetchpriority="high" decoding="async">
              <button type="button" class="d-hero-video-trigger" onclick="openVideoModal('📍 Resende · Cortina Wave Motorizada', 'bf8afe030678afeb1e9bb2ebc369d4c4', 'Quero orçar uma Cortina Wave Motorizada como a da obra de Resende.', '/videos/cortina-motorizada-wave-resende/')">
                <span>▶ Ver vídeo de obra real em Resende</span>
                <span>0:15</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      <!-- FAIXA DE OBRAS POR CIDADE (8 STORIES REAIS COM POSTERS AVIF DEDICADOS) -->
      <section class="d-cities-strip" id="obras-reais" aria-label="Obras Reais em Vídeo por Cidade no Sul Fluminense">
        <div class="d-cities-wrap">
          <div class="d-cities-head">
            <div>
              <span class="d-cities-kicker">Obras Reais Filmadas no Sul Fluminense</span>
              <strong>Toque na cidade para assistir ao vídeo da instalação:</strong>
            </div>
            <a href="/videos/" class="d-strip-all-link">Ver todos os vídeos (8) ↗</a>
          </div>

          <div class="d-cities-grid">
${VIDEO_STORIES.map(
  (s) => `            <div class="d-city-story">
              <button type="button" class="d-city-card" onclick="openVideoModal('${esc(s.title)}', '${s.videoId}', '${esc(s.wa)}', '${s.pageUrl}')">
                <div class="d-city-thumb">
                  <img src="${s.poster}" alt="${esc(s.alt)}" width="240" height="427" loading="lazy" decoding="async">
                  <div class="d-city-play">▶</div>
                </div>
                <div class="d-city-meta">
                  <strong>${esc(s.city)}</strong>
                  <small>${esc(s.sub)}</small>
                </div>
              </button>
              <a href="${s.pageUrl}" class="d-city-page-link">Ficha ↗</a>
            </div>`
).join('\n')}
          </div>
        </div>
      </section>

      <!-- CONSULTOR DO ISANI (7 AMBIENTES COM COZINHA E BANHEIRO SEPARADOS + RESUMO INDEXÁVEL) -->
      <section class="d-isani-diag-sec" id="diagnostico-isani">
        <div class="d-container">
          <p class="d-kicker">Simulador por Ambiente · Desde ${FOUNDED_YEAR}</p>
          <h2 class="d-h2">O que o Isani indicaria para o <em>seu ambiente hoje?</em></h2>

          <div class="d-isani-unified-card">
            <div class="d-isani-controls">
              <span class="d-step-title">1. Toque no seu ambiente (veja a recomendação mudar logo abaixo):</span>
              <div class="d-room-grid">
                <button type="button" class="d-app-choice is-active" id="diag-r-estar" onclick="setIsaniDiag('room', 'estar')">🛋️ Sala</button>
                <button type="button" class="d-app-choice" id="diag-r-tv" onclick="setIsaniDiag('room', 'tv')">📺 Sala TV</button>
                <button type="button" class="d-app-choice" id="diag-r-quarto" onclick="setIsaniDiag('room', 'quarto')">🌙 Quarto</button>
                <button type="button" class="d-app-choice" id="diag-r-varanda" onclick="setIsaniDiag('room', 'varanda')">☀️ Varanda</button>
                <button type="button" class="d-app-choice" id="diag-r-office" onclick="setIsaniDiag('room', 'office')">💻 Escritório</button>
                <button type="button" class="d-app-choice" id="diag-r-cozinha" onclick="setIsaniDiag('room', 'cozinha')">🍽️ Cozinha</button>
                <button type="button" class="d-app-choice" id="diag-r-banheiro" onclick="setIsaniDiag('room', 'banheiro')">🚿 Banheiro</button>
              </div>

              <span class="d-step-title">2. Como é o topo da sua janela?</span>
              <div class="d-vao-grid">
                <button type="button" class="d-app-choice is-active" id="diag-v-cortineiro" onclick="setIsaniDiag('vao', 'cortineiro')">Com Gesso</button>
                <button type="button" class="d-app-choice" id="diag-v-semgesso" onclick="setIsaniDiag('vao', 'semgesso')">Sem Gesso</button>
                <button type="button" class="d-app-choice" id="diag-v-duplo" onclick="setIsaniDiag('vao', 'duplo')">Pé-Direito Duplo</button>
              </div>
            </div>

            <div class="d-isani-verdict" id="isani-verdict-box" aria-live="polite">
              <div class="d-verdict-status" id="isani-diag-badge">✓ Indicação para: Sala de Estar · Com Gesso</div>
              <div class="d-isani-head">
                <div class="d-verdict-visual">
                  <img class="d-verdict-room-img" id="isani-diag-img" src="/cortina-sob-medida.avif" alt="Referência do ambiente selecionado para diagnóstico" width="140" height="140" loading="lazy" decoding="async">
                  <img class="d-verdict-avatar" src="/isani-autor.avif" alt="Isani Oliveira Fundador da ShineCortinas" width="64" height="64" loading="lazy" decoding="async">
                </div>
                <div>
                  <h3 id="isani-diag-title">Cortina Wave em Tecido Encorpado</h3>
                  <span>Parecer de Isani Oliveira · Fundador da Shine</span>
                </div>
              </div>

              <p class="d-isani-quote" id="isani-diag-p1">
                "Na sala de estar, a cortina precisa conversar com o sofá e o tapete. Indico tecido encorpado com toque de linho (acima de 170 g/m² e até 10% de linho na composição) que desce pesado e alinhado, sem amarrotar."
              </p>

              <div class="d-isani-techbox">
                <strong id="isani-diag-vao-label">No seu cortineiro:</strong>
                <span id="isani-diag-vao-text">Pedimos vão livre mínimo de 15 × 15 cm no gesso para a onda correr livre (18 a 20 cm para trilho duplo), com acabamento a 1 cm do piso e bainha dupla nos tecidos leves.</span>
              </div>

              <a id="isani-diag-wa" class="d-gold-btn" data-wa="consultor" data-wa-custom="1" style="width: 100%;" href="https://wa.me/5524993298763?text=Ol%C3%A1%21%20Vi%20a%20indica%C3%A7%C3%A3o%20do%20Isani%20para%20Sala%20de%20Estar%20e%20quero%20agendar%20minha%20consultoria%20gratuita." target="_blank" rel="noopener">
                💬 Ver Amostras Dessa Solução em Casa →
              </a>
            </div>
          </div>

          <details class="d-isani-seo-summary">
            <summary>📋 Ver quadro técnico completo de recomendações por ambiente e medidas de obra</summary>
            <div class="d-isani-seo-summary__body">
              <p><strong>• Sala de Estar:</strong> Cortina Prega Wave, Prega Fêmea, Prega Macho ou Franzida em tecido encorpado com gramatura acima de 170 g/m² (toque de linho com até 10% de linho ou 100% poliéster que imita linho, ou tecido peletizado sedoso). Acabamento a 1 cm do piso e bainha dupla nos tecidos leves.</p>
              <p><strong>• Sala de TV e Suítes:</strong> Cortina de tecido na frente com forro Blackout 100% (reduz de 5 a 6 °C na temperatura do ambiente e veda a luz mesmo em tecidos claros como branco ou areia) ou Blackout 70% (semi blackout para penumbra). Opção de transpasse central de 15 cm quando solicitado.</p>
              <p><strong>• Varanda Gourmet e Sacada:</strong> Persiana Rolô em Tela Solar (Screen) ou Pinpoint com fibra de vidro, que filtra os raios UV e reduz o calor em até cerca de 11 °C mantendo a vista externa.</p>
              <p><strong>• Escritório e Home Office:</strong> Persiana Horizontal de Madeira 50 mm, Persiana Romana ou Double Vision para controle preciso de reflexo nas telas.</p>
              <p><strong>• Cozinha vs. Banheiro:</strong> Na cozinha indicamos Persiana Rolô Tela Solar 5% ou Horizontal de Alumínio 25 mm. No banheiro (área com vapor direto do chuveiro) indicamos exclusivamente Persiana Horizontal de Alumínio ou PVC.</p>
              <p><strong>• Cortineiro de Gesso, Tubo Suíço e Motorização:</strong> Cortineiro mínimo de 15 × 15 cm (18 a 20 cm para cortina dupla e 11 cm de distância entre trilhos caso o forro traseiro também seja Wave). Sem gesso em vãos acima de 2,00 m utilizamos Tubo Suíço para a cortina correr sem travar no suporte central. Na motorização, o trilho de cortina de tecido permite abertura manual na falta de luz e acionamento por leve toque, enquanto nas persianas motorizadas Rolô, Romana e Horizontal o freio do motor trava a abertura manual (exceto Painel e Vertical).</p>
            </div>
          </details>
        </div>
      </section>

      <!-- ACERVO EM MOSAICO BENTO (4 POR VEZ + 16 FOTOS ÚNICAS + LINKS DE SOLUÇÕES) -->
      <section class="d-portfolio-sec" id="portfolio">
        <div class="d-container">
          <div class="d-sec-header">
            <p class="d-kicker">Acervo e Soluções · Obras Reais e Referências Sob Medida</p>
            <h2 class="d-h2">Escolha o modelo <em>ou toque na foto para abrir a ficha.</em></h2>
            <p class="d-sub">Filtre pela solução ideal para a sua janela ou toque no card para ver especificações, vídeo e página completa:</p>
          </div>

          <div class="d-intent-bar">
            <div class="d-intent-filters" id="main-group-filters" role="tablist" aria-label="Filtrar projetos por categoria">
              <button type="button" class="d-filter-btn is-active" id="filter-btn-all" data-group="all" onclick="selectMainGroup('all', this)">✦ Todos (${BENTO_ITEMS.length})</button>
              <button type="button" class="d-filter-btn" id="filter-btn-insta" data-group="insta" onclick="selectMainGroup('insta', this)">🟢 Obras Reais (6)</button>
              <button type="button" class="d-filter-btn" data-group="tecido" onclick="selectMainGroup('tecido', this)">Cortinas de Tecido ▾</button>
              <button type="button" class="d-filter-btn" data-group="estruturada" onclick="selectMainGroup('estruturada', this)">Rolô · Romana · Painel ▾</button>
              <button type="button" class="d-filter-btn" data-group="persiana" onclick="selectMainGroup('persiana', this)">Persianas ▾</button>
              <button type="button" class="d-filter-btn" data-group="pedireitoduplo" onclick="selectMainGroup('pedireitoduplo', this)">Pé-Direito Duplo</button>
              <button type="button" class="d-filter-btn" data-group="motorizada" onclick="selectMainGroup('motorizada', this)">Cortina Motorizada</button>
              <button type="button" class="d-filter-btn" data-group="blackout" onclick="selectMainGroup('blackout', this)">Blackout 100%</button>
              <button type="button" class="d-filter-btn" data-group="lavagem" onclick="selectMainGroup('lavagem', this)">Lavagem Vertical</button>
            </div>

            <div class="d-subgroup-panel" id="sub-group-panel">
              <div class="d-subgroup-header">
                <span id="sub-group-title">Acabamentos disponíveis:</span>
                <span id="sub-group-count"></span>
              </div>
              <div class="d-subgroup-list" id="sub-group-list"></div>
              <div class="d-hashtag-rule-badge" id="sub-group-rule"></div>
            </div>
          </div>

          <div class="d-ig-grid" id="cases-grid">
${BENTO_ITEMS.map(
  (item) => `            <div class="d-ig-tile ${item.initialClass}" data-cat="${item.cats}" data-id="${item.id}" onclick="openCaseSheet('${item.id}')">
              <img src="${item.img}" alt="${esc(item.alt)}" width="400" height="400" loading="lazy" decoding="async" style="object-position: ${item.pos};">
              <div class="d-ig-tile__top">
                <span class="d-ig-tag">${esc(item.tag)}</span>
                <button type="button" class="d-ig-heart" aria-label="Salvar projeto na pasta de referências" onclick="event.stopPropagation(); toggleTileRef('${item.id}')">♡</button>
              </div>
              <div class="d-ig-tile__bottom">
                <strong>${esc(item.title)}</strong>
                <span>${esc(item.sub)}</span>
              </div>
            </div>`
).join('\n')}
          </div>

          <div class="d-bento-more-wrap" id="bento-more-wrap">
            <button type="button" class="d-bento-more-btn" id="bento-more-btn" onclick="toggleMoreProjects()">
              ➕ Ver mais projetos (+4 opções) ↓
            </button>
            <span class="d-bento-counter" id="bento-counter">Mostrando 4 de ${BENTO_ITEMS.length} projetos do acervo</span>
          </div>

          <p class="d-portfolio-caption">Fotos identificadas com 🟢 retratam obras reais filmadas pela nossa equipe no Sul Fluminense. Fotos com ✦ são imagens de referência das soluções.</p>

          <!-- BARRA DE ENVIO DA SELEÇÃO DE PROJETOS PARA O WHATSAPP (OCULTA QUANDO 0 SALVAS) -->
          <div class="d-selection-bar is-empty" id="selection-bar">
            <div class="d-selection-info">
              <strong id="selection-title">📋 Sua pasta de referências (0 salvas)</strong>
              <p id="selection-desc">Toque no ♡ nas fotos acima para salvar seus projetos preferidos e enviar pelo WhatsApp.</p>
            </div>
            <a id="selection-wa-btn" class="d-gold-btn" data-wa="favoritos" data-wa-custom="1" href="https://wa.me/5524993298763?text=Ol%C3%A1%21%20Estava%20navegando%20pelo%20portf%C3%B3lio%20da%20Shine%20e%20gostaria%20de%20agendar%20uma%20consultoria%20gratuita%20em%20casa." target="_blank" rel="noopener">
              Enviar Minha Seleção pelo WhatsApp →
            </a>
          </div>

          <!-- BARRA DE PÁGINAS DEDICADAS DE SOLUÇÕES E SERVIÇOS -->
          <div class="d-solutions-bar">
            <span class="d-solutions-bar__title">Explorar páginas completas por solução:</span>
            <div class="d-solutions-links">
              <a href="/cortinas/">Cortinas Sob Medida ↗</a>
              <a href="/cortina-wave/">Cortina Prega Wave ↗</a>
              <a href="/persianas/">Persianas Sob Medida ↗</a>
              <a href="/cortina-motorizada/">Cortina Motorizada ↗</a>
              <a href="/blackout-e-forros/">Blackout e Forros ↗</a>
              <a href="/trilhos-e-acionamentos/">Trilhos e Acionamentos ↗</a>
              <a href="/lavagem-de-cortinas/">Lavagem de Cortinas ↗</a>
              <a href="/portfolio/">Portfólio Completo ↗</a>
            </div>
          </div>
        </div>
      </section>

      <!-- COMPARADOR TÉCNICO -->
      <section class="d-neuro-contrast" id="comparador">
        <div class="d-container">
          <p class="d-kicker">A diferença está no acabamento</p>
          <h2 class="d-h2">Cortina pronta de prateleira <em>versus</em> Alfaiataria Shine</h2>

          <div class="d-vs-grid">
            <div class="d-vs-box d-vs-box--bad">
              <span class="d-vs-label">✕ Cortina Pronta / Internet</span>
              <h3>O improviso que compromete a sala</h3>
              <ul class="d-vs-list">
                <li><span>✕</span> <div><b>Tecido fino e sem caimento:</b> fica armado nas pontas, amarrota com facilidade e não conversa com o ambiente.</div></li>
                <li><span>✕</span> <div><b>Fresta de sol no meio:</b> as bandas ficam curtas nas laterais e deixam vazar claridade na cama ou na TV.</div></li>
                <li><span>✕</span> <div><b>Varão que trava no meio:</b> acima de 2,00 metros, o suporte central impede a cortina de correr inteira.</div></li>
              </ul>
            </div>

            <div class="d-vs-box d-vs-box--good">
              <span class="d-vs-label">✦ Padrão ShineCortinas</span>
              <h3>Feita sob medida para a sua parede</h3>
              <ul class="d-vs-list">
                <li><span>✦</span> <div><b>Caimento encorpado do teto ao piso:</b> tecidos acima de 170 g/m² medidos a laser a 1 cm do chão, com bainha dupla nos tecidos leves.</div></li>
                <li><span>✦</span> <div><b>Acabamento e vedação pensados:</b> opção de transpasse central de 15 cm quando solicitado e pontas laterais fixadas.</div></li>
                <li><span>✦</span> <div><b>Tubo suíço onde não há gesso:</b> em vãos acima de 2,00 m sem cortineiro, a cortina desliza livre de ponta a ponta sem agarrar no suporte.</div></li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      <!-- CONSULTORIA PRESENCIAL COM ISANI -->
      <section class="d-consultoria-sec" id="consultoria">
        <div class="d-consult-grid">
          <div class="d-consult-photo">
            <img src="/isani-consultoria-800.avif" srcset="/isani-consultoria-800.avif 800w, /isani-consultoria.avif 1108w" sizes="(max-width: 960px) 100vw, 42vw" alt="Isani Oliveira em consultoria presencial no Sul Fluminense" width="800" height="840" loading="lazy" decoding="async">
          </div>
          <div>
            <p class="d-kicker">Atendimento 100% em Domicílio · Sul Fluminense</p>
            <h2 class="d-h2">Você não precisa sair de casa <em>nem imaginar como vai ficar.</em></h2>
            <p class="d-sub">Desde ${FOUNDED_YEAR} em Volta Redonda, levamos o ateliê até você em 15 cidades da região com equipe 100% própria:</p>

            <div class="d-step-cards">
              <div class="d-step-card">
                <strong>1. Mostruário na luz real da sua janela</strong>
                <p>Você toca nos tecidos, forros e telas solares ao lado do seu sofá e do seu tapete.</p>
              </div>
              <div class="d-step-card">
                <strong>2. Medição a laser e projeto sob medida</strong>
                <p>Avaliamos cortineiro, recuos e pontos de fixação antes da confecção no nosso ateliê.</p>
              </div>
              <div class="d-step-card">
                <strong>3. Instalação com equipe própria e garantia</strong>
                <p>Instaladores próprios da Shine, parcelamento em até 12x e garantia de 1 ano para não motorizados e até 5 anos nos motorizados.</p>
              </div>
            </div>

            <a class="d-gold-btn" data-wa="consultoria" data-wa-custom="1" href="https://wa.me/5524993298763?text=Ol%C3%A1%2C%20vim%20do%20site%20da%20Shine%20e%20quero%20agendar%20minha%20consultoria%20gratuita%20em%20casa." target="_blank" rel="noopener">
              Agendar Minha Consultoria Gratuita em Casa →
            </a>
            <p style="margin-top: 12px; font-size: 12.5px; color: var(--muted);">
              Conheça também: <a href="/metodo/" style="color: var(--ink); font-weight: 700;">Como funciona a visita ↗</a> · <a href="/sobre/" style="color: var(--ink); font-weight: 700;">Nossa história desde ${FOUNDED_YEAR} ↗</a>
            </p>
          </div>
        </div>
      </section>

      <!-- PROVA SOCIAL OFICIAL DO GOOGLE (5 AVALIAÇÕES INTEGRAIS) -->
      <section class="d-reviews-sec" id="avaliacoes">
        <div class="d-container">
          <div class="d-sec-header">
            <p class="d-kicker">Avaliações Reais · Google ${GOOGLE_RATING_PT}</p>
            <h2 class="d-h2">O que dizem os nossos clientes <em>após a instalação.</em></h2>
          </div>

          <div class="d-g-scorecard">
            <div class="d-g-scorecard__left">
              <div class="d-g-logo-box" aria-hidden="true">
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                  <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                  <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                  <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
                </svg>
              </div>
              <div class="d-g-score-num">${GOOGLE_RATING_PT}</div>
              <div class="d-g-score-meta">
                <div class="d-stars">★★★★★</div>
                <strong>Excelente · ${GOOGLE_REVIEWS} avaliações reais</strong>
                <small>✓ Perfil verificado no Google Maps</small>
              </div>
            </div>
            <div class="d-g-scorecard__actions">
              <button type="button" onclick="document.getElementById('reviews-carousel').scrollBy({left: 280, behavior: 'smooth'});" class="d-g-verify-link">
                <span>Deslizar relatos</span>
                <span>→</span>
              </button>
              <a href="https://www.google.com/maps/search/?api=1&query=Shine+Cortinas+Volta+Redonda" target="_blank" rel="noopener" class="d-g-verify-link">
                <span>Ver no Google Maps</span>
                <span>↗</span>
              </a>
            </div>
          </div>

          <div class="d-reviews-grid" id="reviews-carousel">
${REVIEWS.map(
  (r) => `            <div class="d-review-card">
              <div>
                <div class="d-rev-head">
                  <div class="d-rev-user">
                    <div class="d-rev-avatar">${r.initials}</div>
                    <div class="d-rev-user-info">
                      <strong>${esc(r.name)}</strong>
                      <small>✓ Avaliação Verificada no Google</small>
                    </div>
                  </div>
                  <div class="d-stars">★★★★★</div>
                </div>
                <blockquote style="margin-top: 10px;">
                  "${esc(r.body)}"
                </blockquote>
              </div>
              <footer>${esc(r.tag)}</footer>
            </div>`
).join('\n')}
          </div>
          <p class="d-reviews-swipe-hint">← Deslize para o lado para ler mais relatos reais (5 de ${GOOGLE_REVIEWS}) →</p>
        </div>
      </section>

      <!-- BLOG & GUIAS DO ISANI (RESUMO EM GAVETA RÁPIDA + LINKS REAIS PARA OS ARTIGOS) -->
      <section class="d-blog-sec" id="blog">
        <div class="d-container">
          <div class="d-sec-header">
            <p class="d-kicker">Antes de Escolher · Guias do Isani</p>
            <h2 class="d-h2">Dúvidas antes de decidir? <em>Leia os guias práticos.</em></h2>
            <p class="d-sub">Abra o resumo rápido aqui mesmo na página ou acesse o artigo completo:</p>
          </div>

          <div class="d-blog-editorial">
            <article class="d-blog-featured">
              <div class="d-blog-featured__media" onclick="openArticleSheet('cortineiro')">
                <img src="/cortina-sob-medida.avif" alt="Cortineiro de gesso com Cortina Wave sob medida" width="600" height="400" loading="lazy" decoding="async">
                <span class="d-blog-featured__badge">✦ Guia Mais Lido · 2 min</span>
              </div>
              <div class="d-blog-featured__body">
                <div>
                  <div class="d-blog-row__meta">
                    <span>Guia de Obra · Gesso e Proporção</span>
                  </div>
                  <h3><a href="/blog/altura-ideal-da-cortina/" style="color:inherit;text-decoration:none;">Qual a medida ideal do cortineiro de gesso e a altura da cortina?</a></h3>
                  <p>Descubra a profundidade e a altura interna exatas (15 × 15 cm) para a onda correr livre sem encostar na janela ou no ar-condicionado.</p>
                </div>
                <div class="d-blog-card-actions">
                  <button type="button" class="d-blog-quick-btn" onclick="openArticleSheet('cortineiro')">⚡ Ler resumo rápido aqui</button>
                  <a href="/blog/altura-ideal-da-cortina/" class="d-blog-full-link">Artigo completo ↗</a>
                </div>
              </div>
            </article>

            <div class="d-blog-list">
              <article class="d-blog-row">
                <div class="d-blog-row__thumb" onclick="openArticleSheet('telasolar')">
                  <img src="/tela-solar-sq.avif" alt="Comparativo Tela Solar, Blackout e Forros" width="120" height="120" loading="lazy" decoding="async">
                </div>
                <div class="d-blog-row__info">
                  <div class="d-blog-row__meta">
                    <span>Comparativo · ⏱ 3 min</span>
                  </div>
                  <h4><a href="/blog/tipos-de-forro-para-cortina/">Tela Solar, Blackout 100% ou Toque de Linho com Forro: qual usar?</a></h4>
                  <a href="/blog/tipos-de-forro-para-cortina/" class="d-blog-full-link">Abrir página do guia ↗</a>
                </div>
                <button type="button" class="d-blog-row__cta" onclick="openArticleSheet('telasolar')">⚡ Resumo</button>
              </article>

              <article class="d-blog-row">
                <div class="d-blog-row__thumb" onclick="openArticleSheet('motorizada')">
                  <img src="/duplo-sq.avif" alt="Cortina motorizada em pé-direito duplo" width="120" height="120" loading="lazy" decoding="async">
                </div>
                <div class="d-blog-row__info">
                  <div class="d-blog-row__meta">
                    <span>Pé-Direito Duplo · ⏱ 2 min</span>
                  </div>
                  <h4><a href="/blog/por-que-escolher-cortina-motorizada/">Cortina motorizada elétrica ou a bateria: o que prever na obra?</a></h4>
                  <a href="/blog/por-que-escolher-cortina-motorizada/" class="d-blog-full-link">Abrir página do guia ↗</a>
                </div>
                <button type="button" class="d-blog-row__cta" onclick="openArticleSheet('motorizada')">⚡ Resumo</button>
              </article>

              <article class="d-blog-row">
                <div class="d-blog-row__thumb" onclick="openArticleSheet('lavagem')">
                  <img src="/lavagem-vertical-cortinas-800.avif" alt="Lavagem e secagem vertical de cortinas sob medida" width="120" height="120" loading="lazy" decoding="async">
                </div>
                <div class="d-blog-row__info">
                  <div class="d-blog-row__meta">
                    <span>Conservação · ⏱ 2 min</span>
                  </div>
                  <h4><a href="/blog/lavagem-de-cortinas-sob-medida/">Por que nunca lavar cortina sob medida na máquina doméstica?</a></h4>
                  <a href="/blog/lavagem-de-cortinas-sob-medida/" class="d-blog-full-link">Abrir página do guia ↗</a>
                </div>
                <button type="button" class="d-blog-row__cta" onclick="openArticleSheet('lavagem')">⚡ Resumo</button>
              </article>
            </div>
          </div>

          <div class="d-blog-more-links">
            <a href="/blog/o-que-e-blackout/">Blackout 70% vs 100% ↗</a>
            <a href="/blog/linho-para-cortinas/">Gramatura e Linho ↗</a>
            <a href="/blog/bainha-de-cortina/">Bainha a 1 cm do Piso ↗</a>
            <a href="/blog/">Todos os 40 Artigos ↗</a>
          </div>
        </div>
      </section>

      <!-- 15 CIDADES ATENDIDAS NO SUL FLUMINENSE (LINKS REAIS RASTREÁVEIS) -->
      <section class="d-cities-sec" id="cidades">
        <div class="d-container">
          <div class="d-sec-header">
            <p class="d-kicker">Atendimento Regional · Sul Fluminense</p>
            <h2 class="d-h2">Consultoria gratuita em domicílio nas <em>15 cidades da região.</em></h2>
            <p class="d-sub">Escolha a sua cidade para ver informações locais de atendimento e obras realizadas:</p>
          </div>
          <div class="d-cities-pills">
${CITIES.map(([slug, name]) => `            <a href="/cidades/${slug}/">${esc(name)}</a>`).join('\n')}
            <a href="/cidades-atendidas/">Ver todas as cidades atendidas ↗</a>
          </div>
        </div>
      </section>

      <!-- DÚVIDAS FREQUENTES VISÍVEIS (#faq — 100% PARIDADE COM FAQPage JSON-LD) -->
      <section class="d-faq-sec" id="faq">
        <div class="d-container">
          <div class="d-sec-header">
            <p class="d-kicker">Dúvidas Frequentes · Respostas Diretas</p>
            <h2 class="d-h2">Perguntas comuns antes de <em>agendar a visita.</em></h2>
          </div>

          <div class="d-faq-list">
${FAQ.map(
  ([q, a]) => `            <details class="d-faq-item">
              <summary>${esc(q)}</summary>
              <div>${esc(a)}</div>
            </details>`
).join('\n')}
          </div>

          <p style="margin-top: 14px; font-size: 13px;">
            <a href="/faq/" style="color: var(--ink); font-weight: 700;">Ver página completa de Perguntas Frequentes ↗</a>
          </p>

          <div class="d-closing-cta">
            <p class="d-kicker" style="color: var(--gold-mid);">Consultoria Gratuita nas 15 Cidades do Sul Fluminense</p>
            <h3>Sua janela merece o acabamento que faz a visita <em>perguntar quem fez.</em></h3>
            <p>Volta Redonda, Barra Mansa, Resende, Itatiaia, Penedo, Visconde de Mauá, Maromba, Porto Real, Pinheiral, Piraí, Barra do Piraí, Valença, Vassouras, Miguel Pereira e Engenheiro Paulo de Frontin.</p>
            <a class="d-gold-btn" data-wa="fechamento" data-wa-custom="1" href="https://wa.me/5524993298763?text=Ol%C3%A1%2C%20vim%20do%20site%20da%20Shine%20e%20quero%20agendar%20minha%20consultoria%20gratuita%20em%20casa." target="_blank" rel="noopener">
              Quero Minha Consultoria Gratuita em Casa →
            </a>
          </div>
        </div>
      </section>
    </main>

    <!-- RODAPÉ COMPLETO COM LOGO, SOLUÇÕES, INSTITUCIONAL, REDES E PRIVACIDADE -->
    <footer class="d-footer">
      <div class="d-footer__grid">
        <div class="d-footer__col">
          <a href="/" class="d-brand" style="margin-bottom: 10px;">
            <img src="/logo-shine.avif" alt="ShineCortinas" width="42" height="42" loading="lazy" decoding="async">
            <div class="d-brand__text">
              <strong>SHINECORTINAS</strong>
              <small>Ateliê Sob Medida · Desde ${FOUNDED_YEAR}</small>
            </div>
          </a>
          <p>Volta Redonda, RJ · Atendimento 100% em domicílio em 15 cidades do Sul Fluminense.<br>Seg a Sex, 08h às 17h · WhatsApp <a href="https://wa.me/5524993298763" data-wa="footer" style="color: var(--gold-light); font-weight: 700; text-decoration: none;">(24) 99329-8763</a></p>
        </div>

        <div class="d-footer__col">
          <h4>Soluções Sob Medida</h4>
          <ul class="d-footer__links">
            <li><a href="/cortinas/">Cortinas Sob Medida</a></li>
            <li><a href="/cortina-wave/">Cortina Prega Wave</a></li>
            <li><a href="/persianas/">Persianas Sob Medida</a></li>
            <li><a href="/cortina-motorizada/">Cortina Motorizada</a></li>
            <li><a href="/blackout-e-forros/">Blackout e Forros</a></li>
            <li><a href="/trilhos-e-acionamentos/">Trilhos e Acionamentos</a></li>
            <li><a href="/lavagem-de-cortinas/">Lavagem de Cortinas</a></li>
          </ul>
        </div>

        <div class="d-footer__col">
          <h4>Institucional e Guias</h4>
          <ul class="d-footer__links">
            <li><a href="/sobre/">Sobre a Shine e Isani Oliveira</a></li>
            <li><a href="/metodo/">Como Funciona a Consultoria</a></li>
            <li><a href="/portfolio/">Portfólio de Projetos</a></li>
            <li><a href="/videos/">Vídeos de Obras Reais</a></li>
            <li><a href="/cidades-atendidas/">Cidades Atendidas</a></li>
            <li><a href="/blog/">Blog e Guias Técnicos</a></li>
            <li><a href="/faq/">Perguntas Frequentes</a></li>
            <li><a href="/contato/">Contato</a></li>
            <li><a href="/politica-de-privacidade/">Política de Privacidade</a></li>
          </ul>
        </div>

        <div class="d-footer__col">
          <h4>Redes Oficiais</h4>
          <ul class="d-footer__links">
            <li><a href="https://www.instagram.com/shinecortinas/" rel="me noopener" target="_blank">Instagram @shinecortinas</a></li>
            <li><a href="https://www.facebook.com/shinecortinas" rel="me noopener" target="_blank">Facebook ShineCortinas</a></li>
            <li><a href="https://www.youtube.com/@shinecortinas" rel="me noopener" target="_blank">YouTube @shinecortinas</a></li>
            <li><a href="https://www.tiktok.com/@shinecortinas" rel="me noopener" target="_blank">TikTok @shinecortinas</a></li>
            <li><a href="https://www.pinterest.com/shinecortinas" rel="me noopener" target="_blank">Pinterest ShineCortinas</a></li>
          </ul>
        </div>
      </div>

      <div class="d-footer__in">
        <span>© <span data-current-year>${CURRENT_YEAR}</span> ShineCortinas · Volta Redonda, RJ · Todos os direitos reservados.</span>
        <span>Google ${GOOGLE_RATING_PT} ★ (${GOOGLE_REVIEWS} avaliações reais) · Parcelamento em até 12x</span>
      </div>
    </footer>

    <!-- BOTÃO FLUTUANTE DE WHATSAPP -->
    <a class="sl-wa" data-wa="flutuante" href="https://wa.me/5524993298763?text=Ol%C3%A1%2C%20eu%20vim%20do%20site%20da%20Shine%20e%20quero%20agendar%20uma%20consultoria%20gratuita%20em%20casa." target="_blank" rel="noopener noreferrer" aria-label="Falar no WhatsApp">${waIcon}</a>

    <!-- BARRA FLUTUANTE INFERIOR ESTILO APP -->
    <nav class="d-ig-tabbar" aria-label="Menu inferior rápido">
      <a href="#top" class="d-ig-tab" data-nav-sec="top">
        <strong>⌂</strong>
        <span>Início</span>
      </a>
      <a href="#diagnostico-isani" class="d-ig-tab is-highlight" data-nav-sec="diagnostico-isani">
        <strong>✦</strong>
        <span>Consultor</span>
      </a>
      <a href="#portfolio" class="d-ig-tab" data-nav-sec="portfolio">
        <strong>⊞</strong>
        <span>Acervo</span>
      </a>
      <a href="#blog" class="d-ig-tab" data-nav-sec="blog">
        <strong>📖</strong>
        <span>Blog</span>
      </a>
      <button type="button" class="d-ig-tab" onclick="openMenuSheet()">
        <strong>☰</strong>
        <span>Menu</span>
        <em class="d-ig-tab-badge is-zero" id="ig-tab-count">0</em>
      </button>
    </nav>
  </div>

  <!-- MODAL EXPANSÍVEL DO ACERVO -->
  <div class="d-case-modal" id="case-sheet-modal" role="dialog" aria-modal="true" aria-labelledby="sheet-title" onclick="if(event.target===this) closeCaseSheet()">
    <div class="d-case-sheet-popup">
      <div class="d-sheet-handle"></div>
      <div class="d-sheet-media">
        <img id="sheet-img" src="/cortina-sob-medida.avif" alt="Projeto ShineCortinas" width="400" height="400" onerror="this.onerror=null;this.src='/cortina-sob-medida.avif'">
        <button type="button" class="d-sheet-close" onclick="closeCaseSheet()">Fechar ✕</button>
        <button type="button" id="sheet-video-btn" style="display:none; position:absolute; left:12px; bottom:12px; background:rgba(8,19,15,0.92); color:#FAF6EE; border:1.5px solid #C9A252; border-radius:99px; padding:8px 14px; font-size:12px; font-weight:700; cursor:pointer;">▶ Assistir Vídeo Real</button>
      </div>
      <div class="d-sheet-content">
        <div class="d-sheet-kicker" id="sheet-kicker">✦ Referência da Solução · Cortina Wave</div>
        <h3 id="sheet-title">Sala vestida do teto ao piso com luz suave</h3>
        <div class="d-sheet-details">
          <div>
            <strong>O que o ambiente pedia:</strong>
            <span id="sheet-prob">A sala parecia vazia e a claridade direta incomodava no sofá à tarde.</span>
          </div>
          <div>
            <strong>Solução sob medida Shine:</strong>
            <span id="sheet-sol">Cortina Prega Wave em tecido toque de linho com forro translúcido independente e acabamento a 1 cm do piso.</span>
          </div>
        </div>
        <a id="sheet-page-link" href="/cortina-wave/" class="d-sheet-page-link">Ver página completa desta solução ↗</a>
        <div class="d-sheet-actions">
          <button type="button" class="d-sheet-save-btn" id="sheet-save-btn" onclick="toggleTileRef(currentSheetId)">
            ♡ Salvar referência
          </button>
          <a class="d-gold-btn" id="sheet-wa-btn" data-wa="modal-acervo" data-wa-custom="1" style="padding: 14px 10px; font-size: 12.5px; border-radius: 14px;" href="https://wa.me/5524993298763" target="_blank" rel="noopener">
            💬 Orçar igual →
          </a>
        </div>
      </div>
    </div>
  </div>

  <!-- MODAL LEITOR DE RESUMOS DO BLOG -->
  <div class="d-case-modal" id="article-sheet-modal" role="dialog" aria-modal="true" aria-labelledby="art-title" onclick="if(event.target===this) closeArticleSheet()">
    <div class="d-case-sheet-popup">
      <div class="d-sheet-handle"></div>
      <div class="d-sheet-content" style="padding-top: 10px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:8px;">
          <div class="d-sheet-kicker" id="art-kicker" style="margin:0;">📖 Blog do Isani · Guia Técnico</div>
          <button type="button" onclick="closeArticleSheet()" style="background:#0F201A; color:#fff; border:0; border-radius:99px; padding:6px 12px; font-size:12px; font-weight:700; cursor:pointer;">Fechar ✕</button>
        </div>
        <h3 id="art-title" style="font-size:22px; margin-bottom:12px;">Qual a medida ideal do cortineiro de gesso?</h3>
        <div class="d-sheet-details" id="art-body" style="font-size:13px; line-height:1.6;"></div>
        <a id="art-full-link" href="/blog/altura-ideal-da-cortina/" class="d-sheet-page-link">Abrir artigo completo no Blog ↗</a>
        <a class="d-gold-btn" id="art-wa-btn" data-wa="modal-blog" data-wa-custom="1" style="width:100%; font-size:12.5px; padding:14px 12px;" href="https://wa.me/5524993298763" target="_blank" rel="noopener">
          💬 Tirar dúvida com o Isani no WhatsApp →
        </a>
      </div>
    </div>
  </div>

  <!-- GAVETA DE MENU COMPLETO DO SITE -->
  <div class="d-case-modal" id="menu-sheet-modal" role="dialog" aria-modal="true" aria-label="Menu de navegação completa" onclick="if(event.target===this) closeMenuSheet()">
    <div class="d-case-sheet-popup">
      <div class="d-sheet-handle"></div>
      <div class="d-sheet-content" style="padding-top: 8px;">
        <div style="display:flex; justify-content:space-between; align-items:center; margin-bottom:14px;">
          <div>
            <div class="d-sheet-kicker" style="margin:0;">Navegação Completa · ShineCortinas</div>
            <h3 style="font-size:21px; margin:0;">Menu, Soluções e Cidades</h3>
          </div>
          <button type="button" onclick="closeMenuSheet()" style="background:#0F201A; color:#fff; border:0; border-radius:99px; padding:6px 13px; font-size:12px; font-weight:700; cursor:pointer;">Fechar ✕</button>
        </div>

        <div class="d-menu-group">
          <span class="d-menu-group-title">Páginas de Soluções Sob Medida</span>
          <div class="d-menu-links">
            <a href="/cortinas/" class="d-menu-item">
              <span>Cortinas Sob Medida</span>
              <small>Wave, Prega e Franzida</small>
            </a>
            <a href="/cortina-wave/" class="d-menu-item">
              <span>Cortina Prega Wave</span>
              <small>Toque de linho do teto ao piso</small>
            </a>
            <a href="/persianas/" class="d-menu-item">
              <span>Persianas Sob Medida</span>
              <small>Rolô, Romana, Madeira e Alumínio</small>
            </a>
            <a href="/cortina-motorizada/" class="d-menu-item">
              <span>Cortina Motorizada</span>
              <small>Controle remoto e Alexa</small>
            </a>
            <a href="/blackout-e-forros/" class="d-menu-item">
              <span>Blackout e Forros</span>
              <small>Blackout 100% e 70%</small>
            </a>
            <a href="/trilhos-e-acionamentos/" class="d-menu-item">
              <span>Trilhos e Acionamentos</span>
              <small>Tubo Suíço e Cortineiro</small>
            </a>
            <a href="/lavagem-de-cortinas/" class="d-menu-item">
              <span>Lavagem de Cortinas</span>
              <small>6 cidades atendidas</small>
            </a>
            <a href="/videos/" class="d-menu-item">
              <span>Vídeos de Obras Reais</span>
              <small>8 instalações filmadas</small>
            </a>
          </div>
        </div>

        <div class="d-menu-group">
          <span class="d-menu-group-title">📖 Guias Técnicos do Blog</span>
          <div class="d-menu-blog-list">
            <a href="/blog/altura-ideal-da-cortina/" class="d-menu-blog-btn">
              <div>Altura ideal da cortina e medidas de cortineiro</div>
              <span>Abrir ↗</span>
            </a>
            <a href="/blog/tipos-de-forro-para-cortina/" class="d-menu-blog-btn">
              <div>Tipos de forro para cortina: translúcido, 70% e 100%</div>
              <span>Abrir ↗</span>
            </a>
            <a href="/blog/por-que-escolher-cortina-motorizada/" class="d-menu-blog-btn">
              <div>Cortina motorizada elétrica ou a bateria</div>
              <span>Abrir ↗</span>
            </a>
            <a href="/blog/" class="d-menu-blog-btn">
              <div>Ver todos os 40 artigos do Blog da Shine</div>
              <span>Abrir ↗</span>
            </a>
          </div>
        </div>

        <div class="d-menu-group">
          <span class="d-menu-group-title">Institucional e Atendimento</span>
          <div class="d-menu-links">
            <a href="/sobre/" class="d-menu-item">
              <span>Sobre Nós</span>
              <small>Isani Oliveira · Desde ${FOUNDED_YEAR}</small>
            </a>
            <a href="/cidades-atendidas/" class="d-menu-item">
              <span>15 Cidades Atendidas</span>
              <small>Sul Fluminense</small>
            </a>
            <a href="/faq/" class="d-menu-item">
              <span>Perguntas Frequentes</span>
              <small>Dúvidas sobre visita e prazos</small>
            </a>
            <a href="#selection-bar" class="d-menu-item" onclick="closeMenuSheet()">
              <span id="menu-saved-label">♡ Meus Salvos (0)</span>
              <small>Sua pasta de referências</small>
            </a>
          </div>
        </div>

        <a class="d-gold-btn" data-wa="menu-modal" data-wa-custom="1" style="width:100%; font-size:12.5px; padding:14px 12px;" href="https://wa.me/5524993298763?text=Ol%C3%A1%21%20Estava%20no%20menu%20do%20site%20da%20Shine%20e%20quero%20agendar%20uma%20consultoria%20gratuita." target="_blank" rel="noopener">
          💬 Falar Direto no WhatsApp (24) 99329-8763 →
        </a>
      </div>
    </div>
  </div>

  <!-- MODAL DE VÍDEO REAL DA CIDADE -->
  <div class="d-video-modal" id="video-modal" role="dialog" aria-modal="true" aria-labelledby="video-modal-title" onclick="if(event.target===this) closeVideoModal()">
    <div class="d-video-player">
      <div class="d-video-player__top">
        <strong id="video-modal-title">📍 Obra Real ShineCortinas</strong>
        <button type="button" class="d-video-close" onclick="closeVideoModal()">Fechar ✕</button>
      </div>
      <div class="d-video-player__box" id="video-modal-box"></div>
      <div class="d-video-player__foot">
        <a id="video-modal-wa" class="d-gold-btn" data-wa="modal-video" data-wa-custom="1" style="width: 100%; font-size: 12.5px;" href="https://wa.me/5524993298763" target="_blank" rel="noopener">
          💬 Quero um projeto igual na minha janela →
        </a>
        <a id="video-modal-page" href="/videos/" class="d-video-page-link">Ver ficha técnica completa deste vídeo ↗</a>
      </div>
    </div>
  </div>

  <script data-cfasync="false" src="/assets/shine-home-e.js?v=5" defer></script>
  <script data-cfasync="false" src="/assets/shine-wa.js?v=4" defer></script>
  <script type="speculationrules">
  {"prefetch":[{"where":{"and":[{"href_matches":"/*"},{"not":{"href_matches":"/lp/*"}},{"not":{"href_matches":"/app/*"}}]},"eagerness":"moderate"}]}
  </script>
</body>
</html>
`;

writeFileSync(FILE, html);
console.log(`build-home: index.html gerado com sucesso (${REVIEWS.length} avaliações, ${FAQ.length} FAQs, ${BENTO_ITEMS.length} cards únicos)`);

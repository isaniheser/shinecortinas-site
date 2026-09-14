// Fonte: entrevista de Isani e confirmações de 12/09/2026, registradas em CLAUDE.md.
// Artigo introdutório; o guia de forros mantém o aprofundamento de materiais e instalação.
import { WA } from '../partials.mjs';
import { comparison, lightGaps } from './blackout-illustrations.mjs';

export default {
  slug: 'o-que-e-blackout',
  layout: 'editorial',
  bodyClass: 'sb-blackout',
  sectionLabel: 'Entenda o blackout',
  stylesheet: '/assets/artigo-blackout.css?v=1',
  title: 'O que é blackout para cortina? Entenda o 70% e o 100%',
  seoTitle: 'O que é Blackout para Cortina? 70% ou 100% | ShineCortinas',
  description: 'Entenda a diferença entre blackout 70% e 100%, por que ainda pode entrar claridade e quais cuidados observar antes de escolher e lavar.',
  published: '2026-02-19',
  modified: '2026-09-13',
  kicker: 'Luz e conforto',
  ogImage: '/blackouts-tecnicos.avif',
  about: ['blackout para cortina', 'semi blackout 70%', 'blackout 100%', 'controle de luz'],
  speakableXPath: ['/html/body//h1', '/html/body//div[@class="sl-ed-lead"]/p[1]'],
  tocNote: 'O material bloqueia a luz. A instalação fecha os caminhos por onde ela entra.',
  related: [
    ['/blog/tipos-de-forro-para-cortina/', 'Guia completo dos tipos de forro'],
    ['/blog/altura-ideal-da-cortina/', 'Altura ideal da cortina'],
    ['/blog/bainha-de-cortina/', 'Bainha e acabamento da barra'],
    ['/blackout-e-forros/', 'Blackout e forros sob medida'],
    ['/persianas/', 'Persianas sob medida'],
  ],
  hero: {
    eyebrow: 'Uma escolha que muda a luz da casa',
    h1: 'O que é blackout<br>para cortina?',
    h1em: 'Entenda o 70% e o 100%.',
    lead: `<p><strong>Blackout é o material usado na cortina ou no forro para reduzir ou bloquear a passagem da luz.</strong> Nas opções com que trabalho, o <strong>semi blackout 70%</strong> deixa alguma claridade. O <strong>blackout 100%</strong> bloqueia a luz pelo material, mas depende da instalação para escurecer o cômodo.</p>
      <p>Antes de indicar um deles, eu preciso entender como você quer usar o ambiente. Assistir a um filme com aquela sensação de tardezinha é uma coisa; dormir durante o dia e querer o quarto escuro é outra.</p>`,
    readTo: '70-ou-100',
    readText: 'Veja a diferença entre 70% e 100%',
    photo: '/blackouts-tecnicos.avif',
    photoWidth: 637,
    photoHeight: 791,
    photoAlt: 'Imagem de referência de sala de TV com cortinas fechadas e iluminação acolhedora',
    photoTag: 'Imagem de referência · Sala de TV',
    photoCaption: 'A luz faz parte do conforto. O material e a instalação definem o resultado no seu ambiente.',
  },
  sections: [
    {
      id: 'tecido-e-forro', toc: 'Blackout, cortina e forro',
      h2: 'Blackout, cortina e forro: qual é a diferença?',
      html: `<p>Quando você ouve falar em <strong>cortina blackout</strong>, o ponto central é o controle da luz. Esse bloqueio pode estar no próprio tecido ou em um forro colocado atrás da cortina decorativa.</p>
        <p>No conjunto com forro, o tecido da frente entrega a aparência que você escolheu. O blackout trabalha por trás. No varão duplo, por exemplo, a cortina fica no tubo dianteiro e o forro no traseiro.</p>
        <p>Por isso, falar apenas “quero uma cortina blackout” ainda não fecha a escolha. Eu preciso saber quanto você quer escurecer, qual caimento procura e como pretende cuidar do material depois.</p>
        <div class="sl-aside"><strong>Para comparar todos os forros</strong><p>No <a href="/blog/tipos-de-forro-para-cortina/">guia de tipos de forro para cortina</a>, explico também os translúcidos, os tecidos e as diferenças de privacidade. Aqui, vamos entender o blackout.</p></div>`,
    },
    {
      id: '70-ou-100', toc: '70% ou 100%?',
      h2: 'Blackout 70% ou 100%: o que muda no uso?',
      html: `${comparison}
        <h3>Semi blackout 70%: a sensação de tardezinha</h3>
        <p>É uma opção que utilizo muito em salas. Tem cliente que quer assistir a um filme com mais aconchego, mas quer continuar percebendo alguma claridade no ambiente.</p>
        <p>Eu explico assim: o semi blackout traz aquela <strong>sensação de tardezinha</strong>. Nas opções de microfibra com que trabalho, também consigo fazer pregas e um bom caimento. O investimento costuma ser menor que o das opções de blackout 100%.</p>
        <h3>Blackout 100%: quando a intenção é escurecer</h3>
        <p>Se você precisa dormir durante o dia ou quer um quarto completamente escuro, eu começo avaliando o blackout 100%. Ele bloqueia a passagem de luz pelo material.</p>
        <p>Mas veja bem: <strong>100% no material não significa que qualquer instalação vai deixar o ambiente 100% escuro.</strong> É preciso olhar as aberturas que ficam ao redor e no encontro das partes.</p>`,
    },
    {
      id: 'ainda-entra-luz', toc: 'Por que ainda entra luz?',
      h2: 'Tenho blackout 100% e ainda entra luz. Por quê?',
      html: `<p>A primeira coisa que eu observo é <strong>por onde a luz está entrando</strong>. Ela atravessa o material ou contorna o forro? São situações que precisam ser avaliadas de formas diferentes.</p>
        <p>Quando o material bloqueia a luz, mas a claridade aparece nas bordas, eu confiro o fechamento superior, as laterais, o centro e a barra junto ao piso.</p>
${lightGaps}
        <p>O forro precisa ter tecido suficiente para as duas partes se encontrarem sem trazer as laterais junto. No trilho, os finalizadores mantêm as pontas presas. No fechamento comum, as partes se encostam com tecido e franzimento suficientes.</p>
        <p>E tem um detalhe do qual não abro mão quando o objetivo é escurecer: <strong>o forro precisa beijar o chão</strong>. Se ficar uma abertura por baixo, a claridade passa.</p>
        <p>Isso entra na decisão sobre a <a href="/blog/altura-ideal-da-cortina/">altura da cortina</a>. A posição do trilho ou do varão e o acabamento da barra precisam funcionar juntos. No <a href="/blog/tipos-de-forro-para-cortina/#quarto-escuro">guia de forros, mostro os detalhes da instalação</a>, inclusive o varão duplo visto de lado.</p>
        <aside class="sl-ed-fr-consult" aria-labelledby="sb-consult-title">
          <p class="sl-ed-eyebrow">Olhe a sua janela com a gente</p>
          <h3 id="sb-consult-title">O problema é o material ou a instalação?</h3>
          <p>Na consultoria em casa, avaliamos a janela, a luz e a sua rotina para escolher o conjunto de cortina e forro.</p>
          <a class="sl-btn" data-wa="agendar" href="${WA}" target="_blank" rel="noopener noreferrer">Agendar consultoria gratuita →</a>
          <p class="sl-ed-fr-consult-note">Volta Redonda e Sul Fluminense · Sem compromisso</p>
        </aside>`,
    },
    {
      id: 'quando-usar', toc: 'Privacidade e calor',
      h2: 'Preciso de blackout para ter privacidade ou reduzir o calor?',
      html: `<h3>Para privacidade, o blackout nem sempre é necessário</h3>
        <p>Se você quer manter a sala clara, eu avalio primeiro o tecido decorativo e a possibilidade de usar um <strong>forro translúcido</strong>. Ele dá privacidade, protege o tecido da frente e suaviza parte da claridade.</p>
        <p>Um forro mais leve pode deixar a silhueta perceptível quando alguém chega perto dele. É por isso que eu observo a trama e o material junto com o resultado que você espera. No guia, explico <a href="/blog/tipos-de-forro-para-cortina/#translucido">o que muda entre os forros translúcidos</a>.</p>
        <h3>Para calor, eu observo a construção do material</h3>
        <p>Quando o calor também incomoda, minha preferência é avaliar blackout 100%, especialmente as opções com película traseira siliconada. A escolha exige conversar sobre manutenção antes da compra.</p>
        <p>Em instalações com forro blackout de tecido que acompanhei, medi reduções de aproximadamente <strong>5 a 6 °C</strong> na temperatura do ambiente, comparando antes e depois. É um resultado que observei nesses projetos, não uma redução que eu prometa para qualquer casa.</p>`,
    },
    {
      id: 'lavagem', toc: 'Pode lavar na máquina?',
      h2: 'Posso lavar qualquer blackout na máquina?',
      html: `<p><strong>Não. O nome “blackout” sozinho não informa como lavar.</strong> Eu preciso conferir como aquele material foi construído. Todos os materiais com que trabalhamos acompanham um documento de cuidados.</p>
        <div class="sb-care">
          <div><h3>Semi blackout de microfibra</h3><p>Nas opções que utilizo, permite lavagem em máquina e centrifugação, seguindo as orientações do produto.</p></div>
          <div><h3>Blackout de tecido com bloqueador interno</h3><p>O bloqueio fica por dentro de uma construção de tecido mais encorpada, de dupla face. As opções que descrevo permitem lavagem em máquina. Elas são mais grossas e não têm a mesma maleabilidade de um forro leve.</p></div>
          <div><h3>Blackout com película traseira</h3><p>Recomendo <strong>higienização profissional específica para esse blackout</strong>. Não colocar na máquina, usar água quente ou torcer. A película pode grudar ou se danificar se o procedimento for inadequado.</p></div>
        </div>
        <p>Antes de entregar o blackout com película a uma lavanderia, confirme se ela atende aquele material. Pedir apenas uma “lavagem a seco” não esclarece o procedimento necessário.</p>
        <p>Eu gosto de resolver essa conversa antes da compra: o forro precisa atender o ambiente e também fazer sentido na rotina de cuidados da casa.</p>`,
    },
    {
      id: 'perguntas', toc: 'Dúvidas rápidas', faq: true,
      h2: 'Dúvidas rápidas sobre blackout', html: '',
    },
    {
      id: 'consultoria', toc: 'Escolher para sua casa', closing: true,
      label: 'Converse com a Shine',
      h2: 'Primeiro, me conte como você quer usar o ambiente.',
      html: `<p>Uma sala com luz suave? Um quarto para dormir durante o dia? Privacidade com claridade? É a partir dessa resposta que eu avalio o material, o caimento e a instalação.</p><p>Na consultoria gratuita em domicílio, eu ou alguém da equipe apresenta as opções para o seu projeto. Atendemos Volta Redonda e todo o Sul Fluminense.</p>`,
      cta: 'Conversar sobre meu ambiente →',
      img: '/isani-consultoria-800.avif',
      imgAlt: 'Isani Oliveira conferindo o caimento de uma cortina durante uma consultoria',
    },
  ],
  faq: [
    ['Blackout 70% deixa o quarto totalmente escuro?', 'Não. O semi blackout 70% mantém alguma claridade e cria penumbra. Quando o objetivo é escurecer completamente, eu avalio o blackout 100% junto com o fechamento da instalação.'],
    ['Forro translúcido é a mesma coisa que blackout?', 'Não. O translúcido dá privacidade, protege o tecido decorativo e suaviza parte da luz, mantendo o ambiente claro. O forro blackout atende outro nível de escurecimento: semi blackout 70% ou blackout 100%.'],
    ['Persiana também pode ter blackout 100%?', 'Sim. Persianas também podem usar material blackout 100%. O resultado no ambiente depende do material e da instalação. Tela solar Screen, por exemplo, não deve ser confundida com blackout 100%.'],
    ['Qual é o melhor blackout para uma sala de TV?', 'Se você quer aconchego com alguma claridade, o semi blackout 70% pode atender bem. Se quer escurecimento completo, eu avalio o blackout 100% e as frestas da instalação. A escolha depende de como você quer usar a sala.'],
  ],
};

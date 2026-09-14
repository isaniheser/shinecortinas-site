// Gera artigos do blog no sistema visual "leve".
// Fonte dos fatos: conhecimento do Isani (ver CLAUDE.md → "Fatos de produto").
// Nada aqui pode contradizer aquela seção. Uso: node scripts/build-blog.mjs
import blackout from './content/blackout.mjs';
import { readFileSync, writeFileSync, existsSync } from 'node:fs';
import { join, dirname } from 'node:path';
import { fileURLToPath } from 'node:url';
import { WA, esc, cleanHead, header, cityChip, footer, waFloat, bar, tail, CSS_V, FONTS } from './partials.mjs';

const ROOT = join(dirname(fileURLToPath(import.meta.url)), '..');
const BASE = 'https://www.shinecortinas.com';
const TODAY = new Date().toLocaleDateString('en-CA', { timeZone: 'America/Sao_Paulo' }); // data do Brasil, não UTC

const POSTS = [
  blackout,
  {
    slug: 'tipos-de-forro-para-cortina',
    layout: 'editorial',
    bodyClass: 'sl-ed-fr-forros',
    title: 'Tipos de forro para cortina: translúcido, semi blackout e blackout 100%',
    seoTitle: "Tipos de Forro para Cortina: Tecidos e Como Escolher | ShineCortinas",
    description: "Translúcido, semi blackout ou blackout 100%? Isani Oliveira explica tecidos, privacidade, calor, instalação e lavagem para escolher o forro da cortina.",
    kicker: 'Tecidos e forros',
    published: '2026-02-19',
    modified: TODAY,
    ogImage: '/isani-consultoria.avif',
    faqEm: 'forro de cortina',
    tocNote: "O forro não serve só para escurecer. Ele precisa combinar com a sua rotina.",
    related: [['/blog/altura-ideal-da-cortina/', 'Altura ideal da cortina'], ['/blog/bainha-de-cortina/', 'Bainha de cortina'], ['/blog/o-que-e-blackout/', 'O que é blackout'], ['/blog/como-escurecer-quarto-sala-tv/', 'Como escurecer o quarto'], ['/blackout-e-forros/', 'Blackout e forros'], ['/persianas/', 'Persianas sob medida']],
    hero: {
      eyebrow: 'O olhar de quem instala',
      h1: "Tipos de forro<br>para cortina:", h1em: "qual escolher?",
      lead: "<p>O <strong>translúcido</strong> dá privacidade mantendo a claridade. O <strong>semi blackout 70%</strong> deixa aquela penumbra aconchegante. O <strong>blackout 100%</strong> bloqueia a luz pelo material, mas precisa de uma instalação bem resolvida para escurecer o ambiente.</p><p>Quando eu ajudo um cliente a escolher, preciso entender o que ele quer resolver. Nessa conversa entram o caimento, o investimento e a facilidade de limpeza.</p><p>O forro também protege o tecido decorativo, aquele que você escolheu para aparecer na frente da cortina.</p>",
      readTo: "qual-escolher", readText: "Compare os forros por objetivo",
      photo: "/isani-consultoria.avif", photoAlt: "Isani Oliveira conferindo o caimento de uma cortina durante uma consultoria",
      photoTag: "Consultoria ShineCortinas", photoCaption: "A escolha do tecido e do forro começa pelo uso do ambiente.",
    },
    sections: [
      { id: "precisa-de-forro", toc: "Quando usar forro", label: "Guia de forros", h2: "Translúcido, semi blackout e blackout: o que muda?", html: `
<p>Eu separo os forros em dois grupos: <strong>translúcidos</strong> e <strong>blackout</strong>. Dentro do blackout, trabalho com o semi blackout 70% e o blackout 100%.</p>
<figure class="sl-ed-fig sl-ed-figure sl-ed-fr-light-figure">
  <div class="sl-ed-figtop"><span class="sl-ed-eyebrow">Desenho 01</span><span>O que muda na passagem da luz</span></div>
  <div class="sl-ed-cards sl-ed-fr-light-cards">
    <div class="sl-ed-card">
      <h3>Translúcido</h3>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 230 176" role="img" aria-labelledby="sl-ed-fr-light-translucido-title sl-ed-fr-light-translucido-desc">
    <title id="sl-ed-fr-light-translucido-title">Forro translúcido: passagem de claridade</title>
    <desc id="sl-ed-fr-light-translucido-desc">Esquema da luz da esquerda para a direita: ela atravessa a janela e chega ao forro. O translúcido deixa passar claridade, mantendo o ambiente claro.</desc>
    <rect x="12" y="33" width="206" height="114" rx="7" fill="#FBFAF7"/>
    <path d="M54 40V142M61 40V142" stroke="#9BAFA8" stroke-width="2"/>
    <path d="M54 40H61M54 142H61" stroke="#9BAFA8" stroke-width="2"/>
    <g stroke="#B38D45" stroke-width="3" stroke-linecap="round"><path d="M20 67H119M20 100H119M20 133H119"/><path d="M113 63L119 67L113 71M113 96L119 100L113 104M113 129L119 133L113 137" fill="none"/></g>
    <path d="M128 38Q135 42 142 38V147Q135 151 128 147Z" fill="#DAD9C7" stroke="#647368" stroke-width="1.5"/>
    <path d="M134 40V148" stroke="#FBFAF7" opacity=".45"/>
<g stroke="#B38D45" stroke-width="3" stroke-linecap="round" opacity="0.75"><path d="M150 67H206M150 100H206M150 133H206"/><path d="M200 63L206 67L200 71M200 96L206 100L200 104M200 129L206 133L200 137" fill="none"/></g>
    <g fill="#4D5B52" font-size="13" font-family="Montserrat, sans-serif" text-anchor="middle"><text x="58" y="166">janela</text><text x="135" y="166">forro</text></g>
  </svg>
      <p><strong>Claridade e privacidade.</strong> Filtra parte da luz e mantém o ambiente claro.</p>
    </div>
    <div class="sl-ed-card">
      <h3>Semi blackout 70%</h3>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 230 176" role="img" aria-labelledby="sl-ed-fr-light-semi-title sl-ed-fr-light-semi-desc">
    <title id="sl-ed-fr-light-semi-title">Semi blackout 70%: parte da claridade atravessa o material</title>
    <desc id="sl-ed-fr-light-semi-desc">Esquema da luz da esquerda para a direita: ela atravessa a janela e chega ao forro. O semi blackout deixa passar parte da claridade, criando penumbra.</desc>
    <rect x="12" y="33" width="206" height="114" rx="7" fill="#FBFAF7"/>
    <path d="M54 40V142M61 40V142" stroke="#9BAFA8" stroke-width="2"/>
    <path d="M54 40H61M54 142H61" stroke="#9BAFA8" stroke-width="2"/>
    <g stroke="#B38D45" stroke-width="3" stroke-linecap="round"><path d="M20 67H119M20 100H119M20 133H119"/><path d="M113 63L119 67L113 71M113 96L119 100L113 104M113 129L119 133L113 137" fill="none"/></g>
    <path d="M128 38Q135 42 142 38V147Q135 151 128 147Z" fill="#AFB9A9" stroke="#647368" stroke-width="1.5"/>
    <path d="M134 40V148" stroke="#FBFAF7" opacity=".45"/>
<g stroke="#B38D45" stroke-width="3" stroke-linecap="round" opacity="0.28"><path d="M150 67H206M150 100H206M150 133H206"/><path d="M200 63L206 67L200 71M200 96L206 100L200 104M200 129L206 133L200 137" fill="none"/></g>
    <g fill="#4D5B52" font-size="13" font-family="Montserrat, sans-serif" text-anchor="middle"><text x="58" y="166">janela</text><text x="135" y="166">forro</text></g>
  </svg>
      <p><strong>Sensação de tardezinha.</strong> Reduz a claridade e deixa uma penumbra aconchegante.</p>
    </div>
    <div class="sl-ed-card">
      <h3>Blackout 100%</h3>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 230 176" role="img" aria-labelledby="sl-ed-fr-light-blackout-title sl-ed-fr-light-blackout-desc">
    <title id="sl-ed-fr-light-blackout-title">Blackout 100%: bloqueio da luz pelo material</title>
    <desc id="sl-ed-fr-light-blackout-desc">Esquema da luz da esquerda para a direita: ela atravessa a janela e chega ao forro. O material blackout 100% interrompe a passagem de luz pelo tecido.</desc>
    <rect x="12" y="33" width="206" height="114" rx="7" fill="#FBFAF7"/>
    <path d="M54 40V142M61 40V142" stroke="#9BAFA8" stroke-width="2"/>
    <path d="M54 40H61M54 142H61" stroke="#9BAFA8" stroke-width="2"/>
    <g stroke="#B38D45" stroke-width="3" stroke-linecap="round"><path d="M20 67H119M20 100H119M20 133H119"/><path d="M113 63L119 67L113 71M113 96L119 100L113 104M113 129L119 133L113 137" fill="none"/></g>
    <path d="M128 38Q135 42 142 38V147Q135 151 128 147Z" fill="#284B40" stroke="#647368" stroke-width="1.5"/>
    <path d="M134 40V148" stroke="#FBFAF7" opacity=".45"/>

    <g fill="#4D5B52" font-size="13" font-family="Montserrat, sans-serif" text-anchor="middle"><text x="58" y="166">janela</text><text x="135" y="166">forro</text></g>
  </svg>
      <p><strong>Bloqueio pelo material.</strong> Para escurecer o cômodo, a instalação também precisa resolver as frestas.</p>
    </div>
  </div>
  <figcaption>Mesma janela e mesma luz incidente nos três esquemas. A comparação é ilustrativa: não representa uma medição nem o escurecimento final de um ambiente. Os desenhos mostram a passagem de luz pelo material.</figcaption>
</figure>
<h3>Toda cortina precisa de forro?</h3>
<p>Para dar privacidade, nem sempre.</p>
<p>Em uma sala que precisa continuar clara, posso trabalhar com um tecido encorpado, de trama fechada, preferencialmente com gramatura acima de 170 g/m². Eu observo essas características juntas: o tecido precisa ter corpo e uma trama que ofereça o fechamento necessário.</p>
<p>Agora, se a escolha for um voal ou uma gaze de linho com trama mais aberta, o caminho é acrescentar um forro. Assim, preservamos a aparência do tecido da frente e conseguimos trabalhar a privacidade por trás.</p>
<p>Essa escolha trata da privacidade. A proteção do tecido decorativo também precisa ser considerada antes de decidir pelo uso sem forro.</p>` },
      { id: "translucido", toc: "Translúcido e tecidos", label: "Guia de forros", h2: "Forro translúcido: privacidade com o ambiente claro", html: `
<p>O forro translúcido é uma opção para quem quer suavizar a claridade e ter privacidade, mantendo a sensação de um ambiente claro.</p>
<h3>Quais tecidos podem ser usados como forro translúcido?</h3>
<p>Forro translúcido é o nome do grupo. Entre as opções estão gabardine, tergal, tergal verão, cetim, gorgurinho e microfibra. Na gabardine, há opções de algodão e de poliéster.</p>
<p>Há diferentes gramaturas dentro dessas famílias. Alguns exemplos com que trabalho são:</p>
<ul><li>Gabardine de 100 g/m².</li><li>Tergal verão de 70 g/m².</li><li>Cetim de 70, 90 ou 110 g/m².</li><li>Microfibra de 65 ou 100 g/m².</li></ul>
<p>Esses números são exemplos de opções, não uma gramatura única para cada tipo de tecido. E gramatura não é o percentual de escurecimento: eu preciso observar também a trama, a construção do material e o resultado que o cliente procura.</p>
<h3>Microfibra de 65 ou 100 g/m²: o que muda na privacidade?</h3>
<p>Uma das opções que utilizo é a microfibra de aproximadamente 65 g/m². Ela protege o tecido decorativo e quebra parte da claridade — em torno de 20% a 30%, na minha avaliação desses materiais.</p>
<p>E a pergunta que costuma aparecer é: “Quando eu acender a luz à noite, essa privacidade continua?”</p>
<p>Continua, mas existe uma diferença entre ter privacidade no ambiente e não aparecer nenhuma silhueta quando alguém chega perto da cortina. Com um forro mais leve, a pessoa que se aproxima do tecido pode deixar a silhueta perceptível do lado de fora.</p>
<p>Quando o cliente quer um fechamento maior, posso trabalhar com uma microfibra de aproximadamente 100 g/m². A figura fica menos definida; mesmo perto da cortina, o que pode aparecer é uma sombra difusa, aquela “fumaça”, em vez de uma silhueta marcada.</p>
<p>Por isso, eu não escolho o forro olhando apenas a gramatura. A trama, o material e o resultado desejado precisam ser considerados juntos.</p>` },
      { id: "semi-blackout", toc: "Semi blackout 70%", label: "Guia de forros", h2: "Semi blackout 70%: a sensação de tardezinha dentro da sala", html: `
<p>O semi blackout é muito utilizado em salas. Tem cliente que quer assistir a um filme com mais conforto, mas não quer transformar a sala em um ambiente completamente escuro.</p>
<p>Eu gosto de explicar assim: ele traz aquela sensação de tardezinha. A luz fica mais suave, o ambiente ganha aconchego e continua com alguma claridade.</p>
<p>O semi blackout de microfibra com que trabalho também permite fazer pregas e conseguir um bom caimento. E o investimento costuma ser menor que o das opções de blackout 100%.</p>
<p>É uma escolha interessante quando o objetivo é deixar a sala mais gostosa de usar, sem buscar escuridão total.</p>` },
      { id: "blackout-100", toc: "Blackout 100%", label: "Guia de forros", h2: "Blackout 100%: existem construções diferentes", html: `
<p>O nome “blackout 100%” informa a proposta de bloqueio da luz pelo material, mas não conta tudo sobre sua construção.</p>
<p>Há diferenças que influenciam o caimento, o controle de calor e, principalmente, a manutenção.</p>
<h3>Blackout de tecido com bloqueador interno</h3>
<p>Nesse tipo, o bloqueio fica por dentro de uma construção de tecido mais encorpada, de dupla face. É o tipo a que me refiro quando falo em Max Blackout, Blackout Ultra ou Super Blackout.</p>
<p>Os nomes comerciais precisam ser conferidos junto da descrição do material. O que importa é identificar como aquele produto foi construído.</p>
<p>Nas opções que utilizo, esse blackout pode ser lavado em máquina. Ele não tem aquela película siliconada exposta na parte traseira.</p>
<p>A contrapartida é o caimento: por ser mais grosso, não tem a mesma maleabilidade de um forro leve.</p>
<h3>Blackout com película traseira siliconada</h3>
<p>Esse material tem uma dublagem na parte de trás e merece uma atenção diferente.</p>
<p>É uma das opções que prefiro quando o cliente também quer reduzir o calor. Porém, a manutenção exige mais cuidado: a película pode grudar ou se danificar quando a limpeza é feita de maneira inadequada.</p>
<p>Essa diferença precisa ser explicada antes da compra. A facilidade de lavar também faz parte da escolha do forro.</p><p>Se o nome ainda gera dúvida, veja também <a href="/blog/o-que-e-blackout/">o que é blackout</a>.</p>` },
      { id: "qual-escolher", toc: "Qual forro escolher", label: "Guia de forros", h2: "Qual forro eu escolheria para o seu ambiente?", html: `
<p>O ponto de partida é o que você precisa resolver. Esta comparação ajuda a organizar a escolha antes de olhar o mostruário.</p><div class="sl-ed-table sl-ed-fr-choice-table"><table><caption>Seu objetivo, a opção a avaliar e o cuidado na escolha</caption><thead><tr><th scope="col">Você quer</th><th scope="col">Eu avalio</th><th scope="col">O que considerar</th></tr></thead><tbody><tr><td data-label="Você quer">Manter a sala clara e ter privacidade</td><td data-label="Eu avalio">Forro translúcido</td><td data-label="O que considerar">Observar a trama e a proximidade das pessoas ao tecido, especialmente à noite.</td></tr><tr><td data-label="Você quer">Suavizar a luz para assistir a um filme</td><td data-label="Eu avalio">Semi blackout 70%</td><td data-label="O que considerar">Deixa alguma claridade. Não é a escolha para escuridão total.</td></tr><tr><td data-label="Você quer">Dormir de dia ou deixar o quarto escuro</td><td data-label="Eu avalio">Blackout 100%</td><td data-label="O que considerar">O resultado depende também do fechamento no teto, nas laterais, no centro e junto ao piso.</td></tr><tr><td data-label="Você quer">Reduzir o calor de um ambiente ensolarado</td><td data-label="Eu avalio">Avaliar a construção do blackout 100%</td><td data-label="O que considerar">Considerar o material, a incidência de sol e a manutenção. Não há redução de temperatura garantida para toda casa.</td></tr><tr><td data-label="Você quer">Priorizar a facilidade de lavagem</td><td data-label="Eu avalio">Microfibra ou blackout de tecido com bloqueador interno, conforme o objetivo</td><td data-label="O que considerar">Confirmar as instruções do produto. O blackout com película exige outros cuidados.</td></tr></tbody></table></div><p>Veja também as opções de <a href="/blackout-e-forros/">blackout e forros para o seu projeto</a>.</p><aside class="sl-ed-fr-consult" aria-labelledby="sl-ed-fr-consult-title"><p class="sl-ed-eyebrow">Veja no seu ambiente</p><h3 id="sl-ed-fr-consult-title">Ainda em dúvida entre dois forros?</h3><p>Na consultoria em casa, avaliamos a luz da janela e comparamos o tecido decorativo com o forro. Assim, a escolha considera a sua rotina, o caimento e os cuidados depois da instalação.</p><a class="sl-btn" data-wa="agendar" href="https://wa.me/5524993298763?text=Ol%C3%A1%2C%20eu%20vim%20do%20site%20da%20Shine%20e%20quero%20agendar%20uma%20consultoria%20gratuita%20em%20casa." target="_blank" rel="noopener noreferrer">Agendar consultoria gratuita →</a><p class="sl-ed-fr-consult-note">Volta Redonda e Sul Fluminense · Sem compromisso</p></aside>` },
      { id: "calor", toc: "Forro e redução de calor", label: "Guia de forros", h2: "Para reduzir o calor, eu observo o material", html: `
<p>Nem todo forro entrega o mesmo resultado em relação ao calor.</p>
<p>Para um ambiente que recebe muito sol, minha preferência é trabalhar com blackout 100%, especialmente nas opções com película traseira siliconada.</p>
<p>Em instalações com forro blackout de tecido que acompanhei, medi reduções de aproximadamente 5 a 6 °C ao comparar a temperatura do ambiente antes e depois da instalação. Esse número registra resultados que observei nesses projetos; não é uma redução que eu prometa para qualquer casa.</p>
<p>Quando faço essa indicação, estou falando dos materiais de blackout de tecido que utilizo, e não de qualquer produto de lona ou plástico vendido com o mesmo nome.</p>` },
      { id: "persianas", toc: "E as persianas?", label: "Guia de forros", h2: "E as persianas com blackout?", html: `
<p>Persianas também podem usar material blackout 100%. A escolha entre cortina e persiana é uma decisão; o nível de escurecimento do material é outra. Nos dois casos, é preciso considerar a instalação e os caminhos pelos quais a luz pode entrar.</p>
<p>Também existem persianas com fibra de vidro na composição, como a Screen, que é uma tela solar, e a Pinpoint. Quando faço referência a uma redução térmica de até cerca de 11 °C, estou falando do contexto dessas persianas, e não dos forros blackout de tecido.</p>
<p>Isso não significa que toda Screen ou Pinpoint terá a mesma redução de temperatura. Também não transforma uma tela solar em blackout 100%. O controle de calor e o bloqueio da luz precisam ser avaliados de acordo com o material escolhido e a aplicação.</p>` },
      { id: "quarto-escuro", toc: "Instalação e frestas", label: "Guia de forros", h2: "Blackout 100% deixa o quarto completamente escuro?", html: `
<p>É possível conseguir um ambiente completamente escuro, mesmo durante o dia. Mas o tecido precisa trabalhar junto com a instalação.</p>
<p>O blackout bloqueia a luz pelo material. Se houver uma abertura por cima, pelos lados ou junto ao piso, a claridade encontra esse caminho.</p>
<p>Na instalação com trilho no teto, eu procuro deixar o forro bem próximo ao teto e descendo junto à parede, para que o tecido encoste e evite a passagem de luz.</p>
<p>No varão duplo, a cortina decorativa fica no tubo da frente e o forro no tubo traseiro. A posição desse varão precisa deixar espaço suficiente acima da janela para que o forro saia do tubo, se acomode para trás e consiga tocar a parede.</p>
<figure class="sl-ed-fig sl-ed-figure sl-ed-fr-rod-figure">
  <div class="sl-ed-figtop"><span class="sl-ed-eyebrow">Desenho 02</span><span>Varão duplo visto de lado</span></div>
  <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 428" role="img" aria-labelledby="sl-ed-fr-rod-title sl-ed-fr-rod-desc">
    <title id="sl-ed-fr-rod-title">Corte lateral de um varão duplo: forro atrás e cortina à frente</title>
    <desc id="sl-ed-fr-rod-desc">Parede à esquerda e interior do cômodo à direita. Os dois tubos são vistos como círculos na mesma altura, acima da janela. O traseiro sustenta o forro verde, que se acomoda contra a face da parede antes da verga e segue até beijar o piso. O dianteiro sustenta a cortina decorativa dourada. Esquema sem escala, com suportes omitidos para destacar o caminho dos tecidos.</desc>
    <g font-family="Montserrat, sans-serif" font-size="14" fill="#4D5B52"><text x="27" y="22">Parede</text><text x="243" y="22">Interior →</text></g>
    <!-- A face interna da parede é x=82. O forro toca essa face, sem cruzá-la. -->
    <path d="M30 34H82V198H30ZM30 322H82V388H30Z" fill="#DCD9CF"/>
    <path d="M82 34V198H30M30 322H82V388" fill="none" stroke="#7F887B" stroke-width="2"/>
    <rect x="48" y="202" width="9" height="116" fill="#E6EEEA" stroke="#9BAFA8" stroke-width="1.5"/>
    <path d="M52.5 207V313" stroke="#B5C4BB"/>
    <text x="35" y="284" transform="rotate(-90 35 284)" fill="#56685B" font-size="14" font-family="Montserrat, sans-serif">Janela</text>
    <path d="M30 388H334" stroke="#16302A" stroke-width="2"/>
    <path d="M30 393H334" stroke="#D9D4C8"/>
    <text x="298" y="413" fill="#4D5B52" font-size="14" font-family="Montserrat, sans-serif">Piso</text>
    <!-- Dois tubos vistos de perfil, à mesma altura. -->
    <circle cx="132" cy="78" r="13" fill="#FBFAF7" stroke="#647368" stroke-width="3"/>
    <circle cx="222" cy="78" r="13" fill="#FBFAF7" stroke="#9B713A" stroke-width="3"/>
    <!-- O forro sai do tubo traseiro e volta à parede acima da verga. -->
    <path d="M145 78Q146 94 132 97C113 101 98 120 86 151Q84 155 84 170V386" fill="none" stroke="#284B40" stroke-width="4" stroke-linecap="round"/>
    <!-- A cortina decorativa permanece à frente do forro. -->
    <path d="M235 78Q237 94 224 98C218 124 227 165 224 212S221 294 225 338Q227 365 225 385.5" fill="none" stroke="#AF8B54" stroke-width="5" stroke-linecap="round"/>
    <path d="M89 198H106" stroke="#7F887B" stroke-width="1.2"/>
    <text x="111" y="203" fill="#4D5B52" font-size="14" font-family="Montserrat, sans-serif">Verga</text>
    <!-- Os números remetem às legendas HTML abaixo, legíveis no celular. -->
    <g stroke="#6C786B" stroke-width="1.2" fill="none"><path d="M121 43L128 62"/><path d="M248 44L231 64"/><path d="M156 152H105L88 157"/><path d="M151 365L92 384"/></g>
    <g font-family="Montserrat, sans-serif" font-size="15" font-weight="600" text-anchor="middle">
      <circle cx="116" cy="36" r="13" fill="#284B40"/><text x="116" y="41" fill="#FFF">1</text>
      <circle cx="255" cy="36" r="13" fill="#8D6C3A"/><text x="255" y="41" fill="#FFF">2</text>
      <circle cx="169" cy="152" r="13" fill="#284B40"/><text x="169" y="157" fill="#FFF">3</text>
      <circle cx="164" cy="361" r="13" fill="#284B40"/><text x="164" y="366" fill="#FFF">4</text>
    </g>
  </svg>
  <div class="sl-ed-fr-rod-legend">
    <p><strong><span>1</span> Varão traseiro</strong> Sustenta o forro, mais próximo da parede.</p>
    <p><strong><span>2</span> Varão dianteiro</strong> Sustenta a cortina decorativa, voltada para o ambiente.</p>
    <p><strong><span>3</span> Contato acima da janela</strong> A altura da instalação permite que o forro saia do tubo e se acomode junto à parede antes da verga.</p>
    <p><strong><span>4</span> Barra beijando o chão</strong> O forro chega ao piso, evitando uma abertura para a claridade por baixo.</p>
  </div>
  <figcaption>Corte lateral esquemático, sem escala. Os círculos representam os tubos vistos de ponta; os suportes foram omitidos para destacar os tecidos. Este detalhe mostra a parte superior e o piso. As laterais e o encontro das duas partes do forro também precisam ser resolvidos na instalação.</figcaption>
</figure>
<p>E tem um cuidado do qual não abro mão quando o objetivo é escurecer: <strong>o forro precisa beijar o chão</strong>. Se ficar uma fresta por baixo, passa claridade.</p>
<p>No artigo sobre <a href="/blog/altura-ideal-da-cortina/">altura ideal da cortina</a>, explico a relação entre a instalação, a altura e o encontro do tecido com o piso. O artigo sobre <a href="/blog/bainha-de-cortina/">bainha de cortina</a> detalha o acabamento da barra.</p>
<h3>As laterais precisam permanecer no lugar</h3>
<p>O forro também precisa ter tecido suficiente para fechar no centro sem puxar as laterais junto.</p>
<p>Se ele tiver apenas a medida exata do vão, o movimento de fechar pode deslocar as pontas e abrir uma passagem de luz.</p>
<p>No trilho, utilizo finalizadores nas extremidades para manter as pontas laterais presas. Assim, quando alguém fecha o forro com mais força ou rapidez, as laterais permanecem no lugar. O finalizador prende a ponta do forro; não é um sistema de vedação lateral.</p>
<p>No encontro central comum, as duas partes se encostam com tecido e franzimento suficientes para fechar aquela passagem.</p>
<h3>Quando entra o trilho triplo com transpasse?</h3>
<p>Existe uma solução específica chamada trilho triplo com transpasse.</p>
<p>A cortina decorativa ocupa a via da frente. As duas vias traseiras permitem que uma parte do forro passe por trás da outra, com uma sobreposição de aproximadamente 15 cm.</p>
<p>Isso ajuda no fechamento central, mas o trilho é mais largo e ocupa mais espaço no cortineiro. É uma opção que utilizo principalmente quando o cliente solicita esse sistema, considerando o espaço disponível.</p><p>Para olhar o conjunto da solução, veja também <a href="/blog/como-escurecer-quarto-sala-tv/">como escurecer o quarto e a sala de TV</a>.</p>` },
      { id: "limpeza", toc: "Lavagem e cuidados", label: "Guia de forros", h2: "Como limpar cada tipo de forro", html: `
<p>A primeira referência é o documento de cuidados que acompanha o material. Todos os materiais com que trabalhamos têm essa orientação.</p>
<p>Nas opções que descrevi, os cuidados são diferentes:</p>
<div class="sl-ed-table sl-ed-fr-care-table"><table><caption>Cuidados com os materiais que utilizo</caption><thead><tr><th scope="col">Material</th><th scope="col">Como oriento a manutenção</th></tr></thead><tbody><tr><td>Microfibra e semi blackout de tecido</td><td>Permitem lavagem em máquina e centrifugação, seguindo os cuidados do produto.</td></tr><tr><td>Blackout de tecido com bloqueador interno</td><td>As opções descritas permitem lavagem em máquina. É preciso confirmar a construção e as instruções daquele material.</td></tr><tr><td>Blackout com película traseira</td><td>Recomendo higienização profissional específica para esse blackout. Não colocar na máquina, usar água quente ou torcer.</td></tr></tbody></table></div>
<p>Para o blackout com película, confirme antes se a empresa conhece e atende esse material. Nem toda lavanderia aceita o serviço, justamente pelo risco de danificar a dublagem.</p>
<p>Quando falo em higienização profissional, estou me referindo ao procedimento adequado àquele blackout, conforme suas instruções de conservação. Não basta pedir uma “lavagem a seco” sem esclarecer qual é o material e como ele deve ser tratado.</p>` },
      { id: "perguntas", toc: "Perguntas frequentes", label: "Guia de forros", h2: "Dúvidas frequentes sobre forro de cortina", faq: true, html: `
            ` },
      { id: "consultoria", toc: "Consultoria em casa", label: "Converse com a Shine", closing: true, h2: "O forro precisa fazer sentido na sua casa",
        html: `<p>É assim que eu escolho o forro: olhando o que você precisa resolver, como quer usar o ambiente e como pretende cuidar da cortina depois.</p><p>Na consultoria gratuita em domicílio, eu ou alguém da equipe avalia essas escolhas com você. Atendemos Volta Redonda e todo o Sul Fluminense.</p>`,
        cta: "Conversar sobre meu ambiente →", img: "/isani-consultoria-800.avif", imgAlt: "Isani Oliveira conferindo o caimento de uma cortina durante uma consultoria" },
    ],
    faq: [
      ["O que é blackout?",
       "Blackout é o material usado para bloquear a luz. Nas opções de forro que utilizo, o semi blackout 70% deixa alguma claridade, enquanto o blackout 100% bloqueia a passagem de luz pelo material. Para escurecer o ambiente, a instalação também precisa evitar frestas."],
      ["Qual o melhor tecido para forro de cortina?",
       "Depende do objetivo. Para privacidade com claridade, avalio o grupo translúcido: gabardine, tergal, tergal verão, cetim, gorgurinho e microfibra. Para penumbra, semi blackout 70%. Para escuridão, blackout 100% com instalação adequada. Caimento e manutenção entram na decisão."],
      ["Qual o melhor forro para cortina de voil?",
       "Para manter a leveza visual e ter privacidade, começo avaliando um forro translúcido, como a microfibra, junto do voil. Se o objetivo for escurecer, a escolha pode ser semi blackout ou blackout 100%. O tecido da frente não define sozinho o forro."],
      ["Como escurecer o quarto com cortina?",
       "Eu avalio o blackout 100% junto da instalação: o fechamento superior, as laterais, o encontro das duas partes no centro e a barra beijando o chão. O material bloqueia a luz que passa por ele, mas uma fresta permite a entrada de claridade."],
      ["O forro translúcido dá privacidade à noite?",
       "Nas opções descritas, sim, mas isso não significa ausência de silhueta junto ao tecido. A microfibra mais leve pode deixar a figura perceptível quando alguém chega perto; uma trama mais fechada pode torná-la mais difusa. Eu avalio o material e o uso do ambiente juntos."],
      ["Pode lavar forro blackout na máquina?",
       "Depende da construção. As opções de microfibra e de blackout de tecido com bloqueador interno que descrevo permitem lavagem em máquina, conforme o documento de cuidados. Para blackout com película traseira, recomendo higienização profissional específica para esse material."],
    ],
  },
  {
    slug: 'altura-ideal-da-cortina',
    layout: 'editorial',
    title: 'Qual a altura ideal da cortina? Do chão ao teto',
    seoTitle: 'Altura Ideal da Cortina: do Chão, do Teto e da Janela | ShineCortinas',
    description: 'Cortina de tecido vai até o chão. As três alturas de barra (1 cm do chão, beijando o chão, efeito poodle), a regra de dividir o vão para fixar o varão, teto e cortineiro, e a medição em três pontos. Por Isani Oliveira.',
    kicker: 'Medidas e instalação',
    published: '2026-02-19',
    modified: TODAY,
    ogImage: '/hall-wave-volta-redonda.avif',
    faqEm: 'altura de cortina',
    tocNote: 'A medida certa começa com o olhar para o ambiente.',
    related: [['/blog/bainha-de-cortina/', 'Bainha de cortina'], ['/blog/varao-para-cortina/', 'Varão para cortina'], ['/blog/tipos-de-forro-para-cortina/', 'Tipos de forro'], ['/trilhos-e-acionamentos/', 'Trilhos e acionamentos'], ['/cortinas/', 'Cortinas sob medida'], ['/videos/ajuste-bainha-em-casa-alfaiataria/', 'Vídeo: ajuste de bainha em casa']],
    hero: {
      eyebrow: 'O olhar de quem instala',
      h1: 'Qual a altura<br>ideal da cortina?', h1em: 'Do chão ao teto.',
      lead: '<p><strong>Cortina de tecido vai até o chão.</strong> A barra pode terminar de três jeitos: a <strong>1 cm do chão</strong>, <strong>beijando o chão</strong> (o pé de bailarina) ou com o tecido <strong>sobrando no piso</strong> (efeito poodle). A escolha depende do ambiente, do uso e da luz.</p><p>Em cima, com varão na parede, eu divido ao meio o espaço entre a janela e o teto. Com cortineiro, o trilho vai dentro dele. E na hora de anotar a medida, largura primeiro, altura depois. Abaixo eu explico cada ponto, com desenho.</p>',
      readTo: 'chao', readText: 'Veja os três acabamentos',
      photo: '/hall-wave-volta-redonda.avif', photoAlt: 'Cortina wave off-white em hall com pé-direito duplo, projeto ShineCortinas em Volta Redonda',
      photoTag: 'Projeto ShineCortinas', photoCaption: 'Hall com pé-direito duplo · Volta Redonda · cortina wave em tecido de 170 g/m²',
    },
    sections: [
      { id: 'chao', toc: 'Os três acabamentos', h2: 'Quanto a cortina fica do chão?', html: `
            <p>Antes de falar de centímetro, uma coisa que eu repito em toda consultoria: cortina de tecido não se faz na altura da janela. Ela desce até o piso. A decisão de verdade é como a barra encontra o chão, e existem três jeitos:</p>
            <figure class="sl-ed-fig">
              <div class="sl-ed-figtop"><span class="sl-ed-eyebrow">Desenho 01</span><span>O encontro com o piso</span></div>
              <div class="sl-ed-hems">
                <div class="sl-ed-hem"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 230" role="img" aria-label="Barra a um centímetro do piso"><defs><marker id="arrow-barra-a-um-centimetro-do-piso" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto-start-reverse"><path d="M0 0L6 3L0 6" fill="#9b713a"/></marker></defs><path d="M12 202H248" stroke="#16302a" stroke-width="2"/><path d="M12 208H248" stroke="#ded8ca"/><path d="M45 25H205V180Q195 185 185 180T145 180T105 180T65 180Q55 185 45 180Z" fill="#e2d6c0" stroke="#9c8c72" stroke-width="1.5"/><path d="M65 25V180" stroke="#b9aa91" stroke-width="1.4"/><path d="M85 25V180" stroke="#b9aa91" stroke-width="1.4"/><path d="M105 25V180" stroke="#b9aa91" stroke-width="1.4"/><path d="M125 25V180" stroke="#b9aa91" stroke-width="1.4"/><path d="M145 25V180" stroke="#b9aa91" stroke-width="1.4"/><path d="M165 25V180" stroke="#b9aa91" stroke-width="1.4"/><path d="M185 25V180" stroke="#b9aa91" stroke-width="1.4"/><path d="M214 182H235M214 201H235M227 182V201" stroke="#9b713a"/><text x="135" y="222" fill="#16302a" text-anchor="middle" font-size="15">folga de 1 cm</text></svg><span class="sl-ed-hemnum">01</span><h4>1 cm do chão</h4><p>A barra fica a 1 cm do piso. É a mais comum nas casas.</p></div>
                <div class="sl-ed-hem"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 230" role="img" aria-label="Barra tocando suavemente o piso"><defs><marker id="arrow-barra-tocando-suavemente-o-piso" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto-start-reverse"><path d="M0 0L6 3L0 6" fill="#9b713a"/></marker></defs><path d="M12 202H248" stroke="#16302a" stroke-width="2"/><path d="M12 208H248" stroke="#ded8ca"/><path d="M45 25H205V201Q195 206 185 201T145 201T105 201T65 201Q55 206 45 201Z" fill="#e2d6c0" stroke="#9c8c72" stroke-width="1.5"/><path d="M65 25V201" stroke="#b9aa91" stroke-width="1.4"/><path d="M85 25V201" stroke="#b9aa91" stroke-width="1.4"/><path d="M105 25V201" stroke="#b9aa91" stroke-width="1.4"/><path d="M125 25V201" stroke="#b9aa91" stroke-width="1.4"/><path d="M145 25V201" stroke="#b9aa91" stroke-width="1.4"/><path d="M165 25V201" stroke="#b9aa91" stroke-width="1.4"/><path d="M185 25V201" stroke="#b9aa91" stroke-width="1.4"/></svg><span class="sl-ed-hemnum">02</span><h4>Beijando o chão</h4><p>O pé de bailarina: a barra encosta de leve, sem sobra.</p></div>
                <div class="sl-ed-hem"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 260 230" role="img" aria-label="Sobra de tecido apoiada no piso"><defs><marker id="arrow-sobra-de-tecido-apoiada-no-piso" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto-start-reverse"><path d="M0 0L6 3L0 6" fill="#9b713a"/></marker></defs><path d="M12 202H248" stroke="#16302a" stroke-width="2"/><path d="M12 208H248" stroke="#ded8ca"/><path d="M45 25H205V190Q205 202 220 207Q240 216 212 220L42 220Q19 214 35 207Q45 201 45 188Z" fill="#e2d6c0" stroke="#9c8c72" stroke-width="1.5"/><path d="M65 25V190Q65 205 58 214" fill="none" stroke="#b9aa91" stroke-width="1.4"/><path d="M85 25V190Q85 205 78 214" fill="none" stroke="#b9aa91" stroke-width="1.4"/><path d="M105 25V190Q105 205 98 214" fill="none" stroke="#b9aa91" stroke-width="1.4"/><path d="M125 25V190Q125 205 118 214" fill="none" stroke="#b9aa91" stroke-width="1.4"/><path d="M145 25V190Q145 205 138 214" fill="none" stroke="#b9aa91" stroke-width="1.4"/><path d="M165 25V190Q165 205 158 214" fill="none" stroke="#b9aa91" stroke-width="1.4"/><path d="M185 25V190Q185 205 178 214" fill="none" stroke="#b9aa91" stroke-width="1.4"/></svg><span class="sl-ed-hemnum">03</span><h4>Efeito poodle</h4><p>O estilo europeu: o tecido sobra e se acomoda no chão, de propósito.</p></div>
              </div>
              <figcaption>Três acabamentos possíveis. Esquemas sem escala; a escolha depende do ambiente e do caimento desejado.</figcaption>
            </figure>
            <p><strong>1 cm do chão.</strong> Uma folga pequena entre a barra e o piso. É a medida que vai anotada para a confecção, e a mais comum nas casas.</p>
            <p><strong>Beijando o chão.</strong> Eu chamo de pé de bailarina. A barra encosta de leve no piso, sem sobra. Pede o ambiente nivelado, senão um lado encosta antes do outro.</p>
            <p><strong>Efeito poodle.</strong> O estilo europeu: o tecido ultrapassa o piso e se acomoda no chão. A sobra é de propósito, faz parte do projeto. Não é cortina que ficou comprida por engano.</p>
            <p>Qual dos três? Não existe resposta única para toda casa. Depende do ambiente e do seu gosto, e é para isso que serve o olho de quem instala: olhar o cômodo e dizer qual vai ficar melhor ali. Mas tem uma regra de que eu não abro mão, e ela está na próxima seção.</p>
            <div class="sl-aside"><strong>Leia também</strong><p>A bainha é o que define esses três acabamentos. No artigo sobre <a href="/blog/bainha-de-cortina/">bainha de cortina</a> eu explico como ela é feita e por que a costura tem que ser reta.</p></div>` },

      { id: 'quarto', toc: 'O piso e a luz no quarto', h2: 'No quarto, o piso decide a altura', html: `
            <p class="sl-ed-scenario">Piso que reflete pede cortina beijando o chão.</p>
            <p>Hoje muita casa tem porcelanato polido, que funciona como espelho. Imagine um quarto com esse piso e a cortina a 1 cm do chão. De manhã, a claridade entra por aquela fresta, bate no piso e é jogada para cima. Você acorda com luz no teto.</p>
            <p>Nesse quarto, a barra tem que encostar no chão para bloquear essa claridade. Na sala, o efeito visual e o gosto pesam mais. No quarto, eu acrescento uma pergunta à escolha: como essa cortina vai se comportar quando o sol nascer?</p>
            <p>Encostar no chão não transforma o quarto em escuro total. Isso é trabalho do forro. Veja a diferença entre <a href="/blog/tipos-de-forro-para-cortina/">forro translúcido e blackout</a>.</p>` },

      { id: 'janela', toc: 'Janela pequena e bancada', h2: 'Janela pequena, bancada e pia', html: `
            <p>Janela pequena recebe cortina longa, até o chão. Imagina desperdiçar um tecido bonito cortando ele pela metade, "proporcional à janela". Para cobrir só a janela existe a <a href="/persianas/">persiana</a>, que é feita para o vão.</p>
            <p>A única exceção é a janela com <strong>bancada ou pia</strong> embaixo. Aí a cortina pode terminar um pouco abaixo da bancada, proporcional, porque não tem como descer até o piso. Fora isso, cortina de tecido vai até o chão. Sempre.</p>` },

      { id: 'varao', toc: 'Altura do varão', h2: 'Onde fixar o varão acima da janela', html: `
            <p>Existem dois tipos de fixação. <strong>Na parede</strong>, com suportes que seguram o tubo, que é o varão. E <strong>no teto</strong>, com trilho ou varão. Vou começar pela parede, que é a dúvida que mais chega.</p>
            <p>O objetivo é não deixar exposto o espaço entre a <strong>verga</strong>, que é o topo da janela ou da porta, e o teto. Mas sem criar uma testeira enorme que atrapalhe a arquitetura da casa. A regra que eu uso é dividir esse espaço ao meio:</p>
            <div class="sl-ed-table"><table>
              <thead><tr><th>Distância da verga ao teto ou à sanca</th><th>Onde fica o varão</th></tr></thead>
              <tbody>
                <tr><td>50 cm</td><td>No meio: 25 cm acima da janela</td></tr>
                <tr><td>1 m</td><td>No meio: 50 cm acima da janela</td></tr>
                <tr><td>20 a 30 cm</td><td>Rente ao teto, deixando pelo menos 10 a 15 cm acima da verga</td></tr>
              </tbody>
            </table></div>
            <figure class="sl-ed-fig">
              <div class="sl-ed-figtop"><span class="sl-ed-eyebrow">Desenho 02</span><span>Como dividir o espaço superior</span></div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 470 255" role="img" aria-label="Varão no meio de um espaço de cinquenta centímetros"><defs><marker id="arrow-varao-no-meio-de-um-espaco-de-cinquenta-centimetros" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto-start-reverse"><path d="M0 0L6 3L0 6" fill="#9b713a"/></marker></defs><rect x="60" y="120" width="260" height="90" fill="#f1f3ef" stroke="#a4b1a6"/><path d="M190 120V210" stroke="#a4b1a6"/><path d="M24 20H336" stroke="#16302a" stroke-width="3"/><text x="30" y="44" fill="#16302a" font-size="14">Teto ou sanca</text><path d="M40 70H330" stroke="#9b713a" stroke-width="5"/><circle cx="40" cy="70" r="6" fill="#9b713a"/><circle cx="330" cy="70" r="6" fill="#9b713a"/><text x="190" y="98" text-anchor="middle" fill="#16302a" font-size="14">Varão</text><path d="M340 120H382M340 20H382M374 20V120" stroke="#9b713a"/><text x="389" y="76" fill="#16302a" font-size="17">50 cm</text><path d="M17 70H32M17 120H50M24 70V120" stroke="#9b713a"/><text x="16" y="168" fill="#16302a" font-size="14">25 cm</text><path d="M29 146V124" stroke="#9b713a"/><text x="190" y="232" text-anchor="middle" fill="#16302a" font-size="15">Parte superior do vão · verga</text></svg>
              <figcaption>Varão na parede: com 50 cm entre a verga e o teto, o varão fica no meio, a 25 cm. Esquema sem escala.</figcaption>
            </figure>
            <p>Quando a janela já está quase encostada no teto, não tem o que dividir: o varão vai <strong>rente ao teto</strong>, com pelo menos uns 10 a 15 cm acima da verga, para a cortina cobrir bem a parte de cima e não passar luz por ali.</p>
            <p>O que eu nunca faço é subir o varão além do meio para "alongar" o ambiente. Imagina o tubo lá em cima com um metro de parede nua até a janela. Fica horrível. Defina a posição do varão antes de fechar a altura de confecção: mudar o varão de lugar depois muda a relação da barra com o chão.</p>
            <div class="sl-aside"><strong>Leia também</strong><p>Tubo, suporte, ponteira: no artigo sobre <a href="/blog/varao-para-cortina/">varão para cortina</a> eu mostro o que muda de um varão para outro e como escolher.</p></div>` },

      { id: 'teto', toc: 'Teto e cortineiro', h2: 'Fixação no teto e no cortineiro', html: `
            <p>No teto, a fixação pode ser feita direto na <strong>laje</strong>, no <strong>forro de gesso</strong> ou dentro do <strong>cortineiro</strong>. As três funcionam, desde que a fixação seja bem feita. Gesso aguenta cortina, sim, quando a bucha e o parafuso são os certos.</p>
            <p>Quando a casa tem cortineiro, a instalação vai <strong>dentro do cortineiro</strong>, ou numa <strong>sanca de gesso invertida</strong>. O trilho some e o tecido parece nascer do teto. É o acabamento mais limpo que existe.</p>
            <p>E uma coisa que eu nunca faço, nunca mesmo: <strong>varão de ilhós com suporte dentro de cortineiro</strong>. O cortineiro foi feito para receber trilho. Varão lá dentro estraga o acabamento e o funcionamento da cortina.</p>
            <p>Na medição, o ponto de partida é o plano onde o sistema vai ser fixado de fato: se o trilho vai dentro do cortineiro, é dali que se mede.</p>` },

      { id: 'medir', toc: 'Como medir', h2: 'Como eu meço: três pontos, da esquerda para a direita', html: `
            <p>Quando a instalação vai no teto ou no cortineiro, eu meço a altura em <strong>três pontos, sempre da esquerda para a direita</strong>: lado esquerdo, meio e lado direito, do teto ao chão.</p>
            <figure class="sl-ed-fig">
              <div class="sl-ed-figtop"><span class="sl-ed-eyebrow">Desenho 03</span><span>Uma altura, três conferências</span></div>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 600 350" role="img" aria-label="Medição do teto ao piso à esquerda, ao centro e à direita"><defs><marker id="arrow-medicao-do-teto-ao-piso-a-esquerda-ao-centro-e-a-direita" markerWidth="6" markerHeight="6" refX="3" refY="3" orient="auto-start-reverse"><path d="M0 0L6 3L0 6" fill="#9b713a"/></marker></defs><path d="M30 40H570M30 265H570" stroke="#16302a" stroke-width="3"/><text x="300" y="23" text-anchor="middle" fill="#16302a" font-size="16">Plano de instalação do trilho</text><text x="300" y="293" text-anchor="middle" fill="#16302a" font-size="16">Piso</text><rect x="175" y="95" width="250" height="115" fill="#eef1ec" stroke="#bac6bc"/><path d="M300 95V210" stroke="#bac6bc"/><path d="M90 52V252" stroke="#9b713a" stroke-width="2"/><path d="M85 61L90 51L95 61M85 243L90 253L95 243" fill="none" stroke="#9b713a" stroke-width="2"/><circle cx="90" cy="151" r="18" fill="#16302a"/><text x="90" y="157" text-anchor="middle" fill="white" font-size="17">1</text><text x="90" y="329" text-anchor="middle" fill="#16302a" font-size="16">Esquerda</text><path d="M300 52V252" stroke="#9b713a" stroke-width="2"/><path d="M295 61L300 51L305 61M295 243L300 253L305 243" fill="none" stroke="#9b713a" stroke-width="2"/><circle cx="300" cy="151" r="18" fill="#16302a"/><text x="300" y="157" text-anchor="middle" fill="white" font-size="17">2</text><text x="300" y="329" text-anchor="middle" fill="#16302a" font-size="16">Centro</text><path d="M510 52V252" stroke="#9b713a" stroke-width="2"/><path d="M505 61L510 51L515 61M505 243L510 253L515 243" fill="none" stroke="#9b713a" stroke-width="2"/><circle cx="510" cy="151" r="18" fill="#16302a"/><text x="510" y="157" text-anchor="middle" fill="white" font-size="17">3</text><text x="510" y="329" text-anchor="middle" fill="#16302a" font-size="16">Direita</text></svg>
              <figcaption>Anote os três valores separadamente. Se eles diferem, o ambiente tem desnível.</figcaption>
            </figure>
            <ol>
              <li><strong>Defina onde vai a fixação.</strong> Teto, cortineiro ou parede: é dali que se mede.</li>
              <li><strong>Meça à esquerda</strong>, do plano de fixação ao piso.</li>
              <li><strong>Repita no meio</strong>, com a mesma referência.</li>
              <li><strong>Meça à direita</strong> e anote o terceiro valor separado.</li>
              <li><strong>Compare os três.</strong> Se houver diferença, é o ambiente que está desnivelado, e isso se resolve antes da confecção.</li>
            </ol>
            <p>O correto é não ter desnível. <strong>Até meio centímetro eu aceito.</strong> Quando chega a dois, três centímetros, e isso já aconteceu comigo, o caminho certo é chamar o gesseiro e fazer um enchimento na parte de cima. Em último caso, a gente ajusta a bainha no local.</p>
            <p>O que não se faz de jeito nenhum é costurar a bainha torta, na diagonal, para "compensar" o desnível. Isso danifica a trama do tecido, e com o tempo a cortina vai ficando desengonçada, com aqueles vincos que eu chamo de "caminho de rato". Se você já viu uma cortina torta na casa de alguém, quase sempre foi isso. Cortina se costura em linha reta, no fio do tecido.</p>` },

      { id: 'largura-altura', toc: 'Largura × altura', h2: 'O que vem primeiro: largura ou altura?', html: `
            <p><strong>Largura primeiro, altura depois.</strong> Sempre. Anote largura × altura, na mesma ordem da geometria, base vezes altura. Anotar ao contrário é uma das causas mais comuns de cortina que chega errada.</p>
            <p>Exemplo só de anotação: 3,00 m de largura × 2,60 m de altura. Escreva o nome de cada medida e a unidade, e diga o que foi medido: a janela, o vão de instalação ou a cortina pronta. A distância do teto ao piso não é, sozinha, a altura de confecção: o acabamento da barra e o sistema escolhido entram nessa conta.</p>` },

      { id: 'laterais', toc: 'Espaço nas laterais', h2: 'Quanto o varão passa para cada lado da janela', html: `
            <p>Com varão na parede, o varão precisa passar de cada lado da janela <strong>o suficiente para acolher o pano da cortina recolhida</strong>. Ou seja: com a cortina aberta, todo o vidro tem que ficar livre.</p>
            <p>Não existe um número fixo. Passar 20 centímetros de cada lado pode não ser o suficiente, porque isso depende do volume de tecido. Uma cortina com mais onda ou mais prega pede mais espaço na lateral. O erro clássico é passar pouco e, com a cortina aberta, o tecido ainda cobrir um pedaço da janela.</p>` },

      { id: 'ar-condicionado', toc: 'Ar-condicionado', h2: 'E quando há ar-condicionado acima da janela?', html: `
            <p>O correto é a parte de cima da janela ficar <strong>livre</strong> para receber a cortina ou a persiana. Ar-condicionado não deveria ficar ali. Quando ele já está, ou quando tem outro obstáculo, eu preciso de <strong>no mínimo 30 centímetros livres</strong> para acomodar o suporte e o varão. Se esse espaço não existe, a solução passa a ser trilho no teto.</p>` },

      { id: 'antes-de-comprar', toc: 'Antes de comprar', h2: 'O que conferir antes de comprar ou mandar confeccionar', html: `
            <p>Os erros de medida quase sempre começam quando uma decisão é tomada sozinha. Antes de fechar, confira o conjunto:</p>
            <ul>
              <li>O trilho ou o varão já tem lugar definido?</li>
              <li>A barra vai ficar a 1 cm, beijando o chão ou com sobra no piso?</li>
              <li>A altura foi medida à esquerda, no meio e à direita?</li>
              <li>O espaço nas laterais comporta o tecido recolhido?</li>
              <li>Bancada, pia, cabeceira e ar-condicionado foram considerados?</li>
              <li>A anotação diz largura × altura, com unidade e o que foi medido?</li>
            </ul>` },

      { id: 'perguntas', toc: 'Perguntas frequentes', h2: 'Perguntas frequentes sobre altura de cortina', faq: true, html: `
            <p>As perguntas abaixo são as que mais chegam pelo Google e pelo WhatsApp. Respostas curtas, do jeito que eu respondo na consultoria.</p>` },

      { id: 'consultoria', toc: 'Consultoria em casa', label: 'Converse com a Shine', closing: true, h2: 'Acerte a medida no seu ambiente',
        html: `<p>A distância da barra ao piso, a posição do varão e o espaço para recolher o tecido precisam funcionar juntos. Na consultoria em domicílio, eu ou alguém da equipe mede a laser nos três pontos e decide com você o acabamento, com o tecido na mão, no seu cômodo.</p><p>Atendemos Volta Redonda, Resende, Barra Mansa e todo o Sul Fluminense. Gratuito e sem compromisso.</p>`,
        cta: 'Agendar consultoria em casa →', img: '/isani-consultoria-800.avif', imgAlt: 'Isani Oliveira em consultoria, conferindo o caimento de uma cortina de linho' },
    ],
    faq: [
      ['Qual a altura da cortina no chão?',
       'A cortina de tecido vai até o chão. A barra pode terminar de três formas: a 1 cm do chão, beijando o chão (encostando de leve) ou com o tecido sobrando no piso (efeito poodle). Em piso polido que reflete a luz, a indicação é beijar o chão, para a claridade não entrar por baixo.'],
      ['Qual a altura ideal para cortina de sala e de quarto?',
       'Nos dois, até o chão. Na sala, a barra é escolhida pelo efeito desejado; no quarto, o piso polido costuma pedir a barra beijando o chão, porque o reflexo do piso joga a claridade para cima de manhã.'],
      ['Qual a altura da cortina acima da janela?',
       'Com varão fixado na parede, divida ao meio o espaço entre o topo da janela (a verga) e o teto. Com 50 cm de vão, o varão fica 25 cm acima da janela; com 1 m, fica a 50 cm. Se sobram só 20 ou 30 cm, o varão vai rente ao teto, com pelo menos 10 a 15 cm acima da verga.'],
      ['Qual a altura certa para colocar o varão de cortina?',
       'A mesma regra: no meio do espaço entre a verga e o teto. Nunca suba o varão além disso deixando um metro de parede nua até a janela.'],
      ['O que vem primeiro na medida da cortina, altura ou largura?',
       'Largura primeiro, altura depois. Anote sempre largura × altura, com a unidade e o que foi medido. Anotar ao contrário é uma causa comum de cortina confeccionada errada.'],
      ['Como medir a altura da cortina?',
       'Do plano de fixação ao chão, em três pontos, da esquerda para a direita: lado esquerdo, meio e lado direito. Isso mostra se há desnível. Até meio centímetro é aceitável; acima disso, corrige-se no gesso ou, em último caso, na bainha, nunca com costura enviesada.'],
      ['Cortina pode ficar na altura da janela?',
       'Cortina de tecido não. Ela vai até o chão; proporcional à janela é papel da persiana. A única exceção é janela com bancada ou pia embaixo, em que a cortina termina um pouco abaixo da bancada.'],
      ['Tem ar-condicionado acima da janela. E agora?',
       'O ideal é a parte de cima da janela ficar livre. Se o aparelho está lá, é preciso no mínimo 30 cm livres para o suporte e o varão. Sem esse espaço, a alternativa é trilho no teto.'],
    ],
  },
  {
    slug: 'bainha-de-cortina',
    layout: 'editorial',
    title: 'Bainha de cortina: o tamanho da barra, a dobra e o ajuste',
    seoTitle: 'Bainha de Cortina: Tamanho da Barra, Bainha Dupla e Ajuste em Casa | ShineCortinas',
    description: 'Bainha é a costura; barra é o resultado. O tamanho da barra é proporcional ao pé-direito (15, 20 a 25, 30 cm), a bainha dupla é para tecido leve, e a costura tem que ser reta, no fio. Por Isani Oliveira.',
    kicker: 'Medidas e instalação',
    published: '2026-02-19',
    modified: TODAY,
    ogImage: '/isani-consultoria.avif',
    faqEm: 'bainha de cortina',
    tocNote: 'A bainha é a parte da cortina que a gente mais olha e menos entende.',
    related: [['/blog/altura-ideal-da-cortina/', 'Altura ideal da cortina'], ['/blog/varao-para-cortina/', 'Varão para cortina'], ['/blog/tipos-de-forro-para-cortina/', 'Tipos de forro'], ['/cortinas/', 'Cortinas sob medida'], ['/cortina-wave/', 'Cortina wave'], ['/videos/ajuste-bainha-em-casa-alfaiataria/', 'Vídeo: ajuste de bainha em casa']],
    hero: {
      eyebrow: 'O olhar de quem instala',
      h1: 'Bainha de cortina:', h1em: 'a costura que faz a barra.',
      lead: '<p><strong>A bainha é a dobra costurada na parte de baixo da cortina.</strong> É ela que faz a barra, e é ela que decide se a cortina termina a 1 cm do chão, beijando o chão ou com sobra. Muita gente diz "tamanho da bainha", mas o nome certo do que se vê é <strong>barra</strong>. O tamanho da barra não é fixo: é <strong>proporcional ao pé-direito</strong>. Em teto baixo, uns 15 cm; entre 2,50 e 2,70 m, 20 a 25 cm; perto de 3 m, 30 cm.</p><p>Tecido leve pede <strong>bainha dupla</strong>, para dar corpo. Tecido mais pesado fica bem com bainha simples. E a costura tem que ser reta, no fio do tecido, senão a cortina entorta com o tempo. Quando o pé-direito é alto, a nossa alfaiataria vai até a casa e ajusta a bainha no lugar.</p>',
      readTo: 'tamanho', readText: 'Veja a tabela de tamanho da barra',
      photo: '/isani-consultoria.avif', photoAlt: 'Isani Oliveira conferindo o caimento e a barra de uma cortina de linho durante uma consultoria',
      photoTag: 'Consultoria ShineCortinas', photoCaption: 'Isani conferindo o caimento e a barra de uma cortina de linho, com a equipe ao fundo',
    },
    sections: [
      { id: 'o-que-e', toc: 'Bainha e barra', h2: 'Bainha e barra não são a mesma coisa', html: `
            <p>Bainha é a dobra costurada na parte de baixo do tecido. Barra é o que você vê: a faixa final da cortina, do vinco da dobra até o chão. Uma é a costura, a outra é o resultado. A frase que eu uso com a costureira resume a diferença: <strong>"ajusta a bainha da cortina com uma barra de 20 centímetros"</strong>. Ela entende na hora: mexer na bainha, que é a costura, e deixar 20 cm de barra, que é a faixa que aparece. É assim que este artigo fala: a bainha se faz, a barra se mede. São 20 cm de acabamento no tecido; a distância até o piso é outra medida.</p>
            <figure class="sl-ed-fig sl-ed-figure"><div class="sl-ed-figtop"><span class="sl-ed-eyebrow">Entenda no desenho</span><span>Duas medidas diferentes</span></div><div class="sl-ed-measure"><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 280" role="img" aria-label="Detalhe da parte inferior da cortina: a barra é medida no tecido, entre o limite superior do acabamento e a borda inferior. O espaço até o piso é outra medida.">
<defs><linearGradient id="fold"><stop stop-color="#dfd3bd"/><stop offset=".5" stop-color="#f4eee2"/><stop offset="1" stop-color="#c6b597"/></linearGradient><pattern id="pleats" width="40" height="220" patternUnits="userSpaceOnUse"><rect width="40" height="220" fill="url(#fold)"/></pattern></defs>
<path d="M38 18H238V218H38Z" fill="url(#pleats)"/><rect x="38" y="146" width="200" height="72" fill="#b78b46" fill-opacity=".32"/><path d="M38 146H238" stroke="#795d37" stroke-dasharray="4 4" stroke-width="2"/><path d="M38 218H238" stroke="#795d37" stroke-width="2"/>
<path d="M246 146H284M246 218H284M276 146V218M271 153L276 146L281 153M271 211L276 218L281 211" stroke="#16302a" stroke-width="2" fill="none"/>
<circle cx="305" cy="182" r="16" fill="#16302a"/><text x="305" y="188" text-anchor="middle" fill="white" font-size="18" font-family="Arial">1</text>
<path d="M20 250H336" stroke="#9b9487" stroke-width="2"/><path d="M276 223V245M271 228L276 223L281 228M271 240L276 245L281 240" stroke="#9b713a" fill="none" stroke-width="2"/>
<circle cx="305" cy="235" r="13" fill="#9b713a"/><text x="305" y="241" text-anchor="middle" fill="white" font-size="17" font-family="Arial">2</text></svg>
<div class="sl-ed-legend"><p><b><span>1</span> Tamanho da barra</b>A altura da faixa de acabamento, medida no próprio tecido.</p><p><b><span>2</span> Distância até o chão</b>O espaço entre a borda inferior da cortina e o piso.</p></div></div><figcaption>Detalhe da parte inferior da cortina. Esquema sem escala; o espaço até o piso está ampliado para facilitar a leitura.</figcaption></figure>
            <p>Na altura final, eu trabalho com três opções: 1 cm do chão, beijando o chão, o pé de bailarina, ou efeito poodle, com tecido sobrando no piso. Uma barra de 20 cm pode fazer parte de qualquer uma dessas escolhas. Quando a bainha é bem feita, a barra cai reta, pesa certo e para no lugar combinado.</p>
            <p>É a bainha que entrega os três acabamentos de que eu falo no artigo sobre <a href="/blog/altura-ideal-da-cortina/">altura ideal da cortina</a>: a barra a 1 cm do chão, a barra beijando o chão e o efeito poodle, com o tecido sobrando no piso. A altura é a decisão; a bainha é quem executa.</p>
            <div class="sl-aside"><strong>Leia também</strong><p>Antes de decidir a bainha, decida onde a cortina termina. No artigo sobre <a href="/blog/altura-ideal-da-cortina/">altura ideal da cortina</a> eu explico as três alturas, a regra do varão e como medir em três pontos.</p></div>` },

      { id: 'tamanho', toc: 'Tamanho da barra', h2: 'Tamanho da barra: proporcional ao pé-direito', html: `
            <p>A pergunta que mais chega é "qual o tamanho da bainha?". O que a pessoa quer saber é o tamanho da barra que a bainha vai deixar. Não existe um número único. A barra tem que ser <strong>proporcional à altura do ambiente</strong>. Imagina uma cortina de 2,30 m de altura com uma barra de 30 cm: o teto fica achatado, esquisito. A mesma barra de 30 cm, num pé-direito de 3 m, fica bonita.</p>
            <div class="sl-ed-table"><table>
              <thead><tr><th>Pé-direito</th><th>Barra que eu uso</th></tr></thead>
              <tbody>
                <tr><td>Baixo, por volta de 2,30 m</td><td>Cerca de 15 cm</td></tr>
                <tr><td>2,50 a 2,70 m, o mais comum</td><td>20 a 25 cm</td></tr>
                <tr><td>2,90 a 3,00 m</td><td>30 cm</td></tr>
                <tr><td>Pé-direito duplo, 5 a 6 m</td><td>40 a 50 cm de barra com acabamento</td></tr>
              </tbody>
            </table></div>
            <figure class="sl-ed-fig sl-ed-figure"><div class="sl-ed-figtop"><span class="sl-ed-eyebrow">Entenda no desenho</span><span>A proporção muda com o ambiente</span></div><div class="sl-ed-cards"><div class="sl-ed-card"><p class="sl-ed-card-label">Pé-direito de 2,30 m</p><svg viewBox="0 0 220 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pé-direito de 2,30 m, barra de cerca de 15 cm"><defs><linearGradient id="f0"><stop stop-color="#d1c1a5"/><stop offset=".45" stop-color="#f2e9d9"/><stop offset="1" stop-color="#baa583"/></linearGradient><pattern id="p0" width="27" height="250" patternUnits="userSpaceOnUse"><rect width="27" height="250" fill="url(#f0)"/></pattern></defs><path d="M25 67H195M25 225H195" stroke="#16302a" stroke-width="2"/><rect x="42" y="72" width="135" height="149" fill="url(#p0)"/><rect x="42" y="210" width="135" height="11" fill="#ac854b" opacity=".38"/><path d="M42 210H177" stroke="#8c6d43" stroke-dasharray="3 3"/></svg><p class="sl-ed-card-value">Barra de cerca de 15 cm</p></div><div class="sl-ed-card"><p class="sl-ed-card-label">Pé-direito de 2,50 a 2,70 m</p><svg viewBox="0 0 220 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pé-direito de 2,50 a 2,70 m, barra de 20 a 25 cm"><defs><linearGradient id="f1"><stop stop-color="#d1c1a5"/><stop offset=".45" stop-color="#f2e9d9"/><stop offset="1" stop-color="#baa583"/></linearGradient><pattern id="p1" width="27" height="250" patternUnits="userSpaceOnUse"><rect width="27" height="250" fill="url(#f1)"/></pattern></defs><path d="M25 46H195M25 225H195" stroke="#16302a" stroke-width="2"/><rect x="42" y="51" width="135" height="170" fill="url(#p1)"/><rect x="42" y="204" width="135" height="17" fill="#ac854b" opacity=".38"/><path d="M42 204H177" stroke="#8c6d43" stroke-dasharray="3 3"/></svg><p class="sl-ed-card-value">Barra de 20 a 25 cm</p></div><div class="sl-ed-card"><p class="sl-ed-card-label">Pé-direito de 2,90 a 3,00 m</p><svg viewBox="0 0 220 250" xmlns="http://www.w3.org/2000/svg" role="img" aria-label="Pé-direito de 2,90 a 3,00 m, barra de 30 cm"><defs><linearGradient id="f2"><stop stop-color="#d1c1a5"/><stop offset=".45" stop-color="#f2e9d9"/><stop offset="1" stop-color="#baa583"/></linearGradient><pattern id="p2" width="27" height="250" patternUnits="userSpaceOnUse"><rect width="27" height="250" fill="url(#f2)"/></pattern></defs><path d="M25 22H195M25 225H195" stroke="#16302a" stroke-width="2"/><rect x="42" y="27" width="135" height="194" fill="url(#p2)"/><rect x="42" y="199" width="135" height="22" fill="#ac854b" opacity=".38"/><path d="M42 199H177" stroke="#8c6d43" stroke-dasharray="3 3"/></svg><p class="sl-ed-card-value">Barra de 30 cm</p></div></div><figcaption>Exemplos das proporções usadas pela Shine. Os desenhos são esquemáticos; a tabela traz as medidas.</figcaption></figure>
            <p>No pé-direito duplo, como num hall de entrada de 5 ou 6 metros, uma barra de 40 a 50 cm com acabamento é o que dá imponência ao tecido. É elegante, e valoriza a arquitetura em vez de disputar com ela.</p>` },

      { id: 'dupla', toc: 'Bainha dupla ou simples', h2: 'Bainha dupla ou simples: a gramatura decide', html: `
            <p>Gramatura é o peso do tecido por metro quadrado. Tecido leve, como o voil, tem gramatura <strong>abaixo de 150 g/m²</strong>. Nesses, eu faço <strong>bainha dupla</strong>: a barra dobrada duas vezes, as duas dobras com a altura inteira da barra. Quero uma barra de 15 cm com mais peso? Então eu dobro 15 cm duas vezes: são <strong>30 cm de tecido na bainha, 15 mais 15</strong>. É essa segunda camada que dá corpo. Sem ela, a barra do voil fica mole e não cai reta.</p>
            <p>Tecido mais pesado, de <strong>170, 180 ou 200 g/m²</strong>, não precisa. A própria dobra já dá o efeito encorpado. Bainha dupla ali só acrescenta volume onde não faz falta.</p>
            <figure class="sl-ed-fig sl-ed-figure"><div class="sl-ed-figtop"><span class="sl-ed-eyebrow">Entenda no desenho</span><span>As dobras vistas de perfil</span></div><div class="sl-ed-cards sl-ed-two"><div class="sl-ed-card sl-ed-profile-card"><h3>Bainha simples</h3><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 290" role="img" aria-label="Bainha simples, vista de perfil. O tecido faz uma volta para dentro. Uma dobra de 15 cm.">
 <path d="M25 40H64" stroke="#b3a080" stroke-width="1"/><text x="24" y="24" font-family="Arial" font-size="14" fill="#625d51">tecido da cortina</text>
 <path d="M78 30V237Q78 250 91 250Q104 250 104 237V130" stroke="#887554" stroke-width="5" fill="none" stroke-linecap="butt"/>
 <path d="M78 30V237Q78 250 91 250Q104 250 104 237V130" stroke="#eee3cd" stroke-width="2.4" fill="none" stroke-linecap="butt"/>
 <path d="M101 130H107" stroke="#806d50" stroke-width="1.3"/>
 <path d="M148 130H171M148 250H171M165 130V250M160 137L165 130L170 137M160 243L165 250L170 243" stroke="#9b713a" stroke-width="1.5" fill="none"/>
 <text x="181" y="190" font-family="Arial" font-size="20" fill="#75562b" font-weight="600">15 cm</text>
 <text x="181" y="211" font-family="Arial" font-size="14" fill="#625d51">de barra</text>
 </svg><p>O tecido faz uma volta para dentro.</p><p class="sl-ed-card-value">Uma dobra de 15 cm</p></div><div class="sl-ed-card sl-ed-profile-card"><h3>Bainha dupla</h3><svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 290" role="img" aria-label="Bainha dupla, vista de perfil. O tecido faz duas voltas para dentro, ambas com 15 cm. 15 + 15 cm de tecido → barra de 15 cm.">
 <path d="M25 40H64" stroke="#b3a080" stroke-width="1"/><text x="24" y="24" font-family="Arial" font-size="14" fill="#625d51">tecido da cortina</text>
 <path d="M78 30V228Q78 250 104 250Q130 250 130 228V143Q130 130 117 130Q104 130 104 143V235" stroke="#887554" stroke-width="5" fill="none" stroke-linecap="butt"/>
 <path d="M78 30V228Q78 250 104 250Q130 250 130 228V143Q130 130 117 130Q104 130 104 143V235" stroke="#eee3cd" stroke-width="2.4" fill="none" stroke-linecap="butt"/>
 <path d="M101 235H107" stroke="#806d50" stroke-width="1.3"/>
 <path d="M148 130H171M148 250H171M165 130V250M160 137L165 130L170 137M160 243L165 250L170 243" stroke="#9b713a" stroke-width="1.5" fill="none"/>
 <text x="181" y="190" font-family="Arial" font-size="20" fill="#75562b" font-weight="600">15 cm</text>
 <text x="181" y="211" font-family="Arial" font-size="14" fill="#625d51">de barra</text>
 </svg><p>O tecido faz duas voltas para dentro, ambas com 15 cm.</p><p class="sl-ed-card-value">15 + 15 cm de tecido → barra de 15 cm</p></div></div><figcaption>Corte lateral da bainha: imagine olhar o tecido pela borda. As camadas estão afastadas para você enxergar as voltas. Na dupla, as duas dobras têm a altura inteira da barra: 15 cm cada. Esquema sem escala.</figcaption></figure>` },

      { id: 'costura', toc: 'Costura reta, no fio', h2: 'Costura reta, no fio do tecido. Sempre.', html: `
            <p>Cortina se costura em linha reta, seguindo o fio do tecido. É a regra mais simples e a mais desrespeitada. Quando a costura sai enviesada, na diagonal, ela danifica a trama. Na hora parece que ficou bom. Com o tempo, a cortina vai ficando desengonçada, torta, com aqueles vincos que eu chamo de <strong>caminho de rato</strong>.</p>
            <p>Isso acontece muito quando alguém tenta corrigir na costura um problema que é do ambiente: teto desnivelado, piso fora de esquadro. Não é assim que se resolve. Desnível se corrige no gesso, e em último caso ajustando a bainha no local, com a costura continuando reta. Nunca costurando torto para "compensar". E gesso corrige o teto, não o piso: se o desnível está no piso, o ajuste é outro.</p>
            <p>A costura enviesada é a causa mais comum, mas quando eu examino uma barra repuxada eu confiro também a <strong>tensão da linha</strong>, a <strong>alimentação do tecido na máquina</strong> e se a cortina <strong>encolheu</strong>. Qualquer um desses três também produz franzido.</p>` },

      { id: 'ajuste', toc: 'Ajuste em casa', h2: 'Ajuste em casa: a alfaiataria vai até você', html: `
            <p>A Shine tem uma <strong>equipe de alfaiataria</strong> que se desloca até a casa do cliente para ajustar a bainha no lugar. Não é para toda cortina. É para os casos em que não dá para prever, na oficina, como a cortina vai assentar depois de instalada.</p>
            <p>O caso clássico é o <strong>pé-direito alto</strong>. O tecido é pesado, o vão é grande, e só com a cortina pendurada é que se vê exatamente onde a barra vai parar. O outro caso é quando as <strong>ondas e os obstáculos do vão</strong> pedem uma adequação: um rodapé mais alto de um lado, um degrau, um móvel fixo.</p>
            <p>Nesses projetos, a cortina é instalada, a costureira confere a barra com a peça já no lugar e faz o ajuste ali. Assim, a decisão considera o que está acontecendo no ambiente, e não o que a gente imaginou na oficina.</p>
            <figure class="sl-ed-video"><div class="sl-ed-video-heading"><span class="sl-ed-eyebrow">Veja o trabalho de perto</span><h3>Ajuste de bainha na casa do cliente</h3></div><div class="sl-ed-video-stage" id="video-ajuste"><button type="button" class="sl-ed-play" data-video="https://customer-zheg6rb9ddhx9h8y.cloudflarestream.com/c9058bc905c6e533b7a31c6013677fbe/iframe" aria-label="Reproduzir vídeo de ajuste de bainha em casa"><img src="https://customer-zheg6rb9ddhx9h8y.cloudflarestream.com/c9058bc905c6e533b7a31c6013677fbe/thumbnails/thumbnail.jpg" alt="" loading="lazy" decoding="async"><span class="sl-ed-play-label"><span aria-hidden="true">▶</span> Assistir ao vídeo</span></button></div><figcaption>Vídeo da ShineCortinas. <a href="/videos/ajuste-bainha-em-casa-alfaiataria/">Abrir a página do vídeo</a>.</figcaption></figure>` },

      { id: 'erros', toc: 'O erro que mais vejo', h2: 'O erro que mais vejo em bainha de cortina', html: `
            <p>Quando eu entro numa casa e a cortina está feia embaixo, quase sempre é a bainha. Ela está <strong>empachocada</strong>, embolada, com <strong>fio puxado</strong>, costurada com o <strong>ponto errado da máquina</strong>. Ou a cortina foi lavada, <strong>encolheu</strong>, e ninguém ajustou: a barra subiu e ficou curta.</p>
            <p>Dá para consertar? Dá, mas não é remendo. Costura com ponto errado ou repuxada: <strong>desmanchar a bainha e refazer</strong>, com o ponto certo, no fio. Cortina que encolheu: primeiro eu confiro quanto ela encolheu e <strong>quanto tecido ainda existe na bainha</strong>. Se sobrou margem, refaço o acabamento e recupero a altura. Se não sobrou, desmanchar e costurar de novo não devolve o comprimento que falta. Tentar "puxar" ou "esticar" só piora o caminho de rato.</p>
            <div class="sl-aside"><strong>Leia também</strong><p>A bainha cai bem quando o varão está na altura certa. No artigo sobre <a href="/blog/varao-para-cortina/">varão para cortina</a> eu mostro tubo, suporte e ponteira, e o que muda de um para outro.</p></div>` },

      { id: 'antes', toc: 'Antes de mandar fazer', h2: 'O que conferir antes de mandar fazer a bainha', html: `
            <ul class="sl-ed-checklist">
              <li>Qual é o pé-direito? O tamanho da barra vai ser proporcional a ele.</li>
              <li>Qual é a gramatura do tecido? Abaixo de 150 g/m², bainha dupla.</li>
              <li>A barra vai ficar a 1 cm, beijando o chão ou com sobra? A bainha executa essa escolha.</li>
              <li>A altura foi medida em três pontos? Desnível se resolve antes da costura, não nela.</li>
              <li>É pé-direito alto ou vão com obstáculo? Então o ajuste é no local, com a cortina pendurada.</li>
              <li>A cortina já ficou curta? Confira quanto tecido sobrou na bainha antes de contar com o ajuste.</li>
            </ul>` },

      { id: 'perguntas', toc: 'Perguntas frequentes', h2: 'Perguntas frequentes sobre bainha de cortina', faq: true, html: `
            <p>Respostas curtas, do jeito que eu respondo na consultoria.</p>` },

      { id: 'consultoria', toc: 'Consultoria em casa', label: 'Converse com a Shine', closing: true, h2: 'A bainha certa começa na medição',
        html: `<p>Pé-direito, gramatura do tecido e o acabamento que você quer para a barra: as três coisas se decidem juntas, e na sua casa. Na consultoria em domicílio, eu ou alguém da equipe mede a laser, mostra o tecido no seu ambiente e define a bainha com você.</p><p>Atendemos Volta Redonda, Resende, Barra Mansa e todo o Sul Fluminense. Gratuito e sem compromisso.</p>`,
        cta: 'Agendar consultoria em casa →', img: '/hall-wave-volta-redonda-800.avif', imgAlt: 'Cortina wave com barra de acabamento em hall de pé-direito duplo, projeto ShineCortinas em Volta Redonda' },
    ],
    faq: [
      ['O que é a bainha da cortina?',
       'É a dobra costurada na parte de baixo do tecido, que forma a barra da cortina. A altura da cortina é a decisão; a bainha é quem executa: é ela que faz a barra parar a 1 cm do chão, beijar o chão ou sobrar no piso.'],
      ['Qual o tamanho ideal da bainha (barra) da cortina?',
       'O nome certo do que se mede é barra; a bainha é a costura que faz a barra. O tamanho é proporcional ao pé-direito. Em teto baixo, por volta de 2,30 m, cerca de 15 cm. Entre 2,50 e 2,70 m, 20 a 25 cm. Perto de 3 m, 30 cm. Em pé-direito duplo, de 5 a 6 m, uma barra de 40 a 50 cm com acabamento.'],
      ['O tamanho da barra é a distância da cortina até o chão?',
       'Não. O tamanho da barra é medido no próprio tecido, na faixa de acabamento que a bainha forma. A distância até o chão é outra medida: a cortina pode terminar a 1 cm do piso, beijando o chão ou com efeito poodle, e uma barra de 20 cm serve para qualquer uma dessas três.'],
      ['Bainha dupla é melhor que bainha simples?',
       'Depende do tecido. Tecido leve, abaixo de 150 g/m², como o voil, pede bainha dupla para ganhar corpo: a barra dobrada duas vezes, na altura inteira da barra (uma barra de 15 cm usa 30 cm de tecido). Tecido de 170 a 200 g/m² fica bem com bainha simples, porque a própria dobra já dá o efeito encorpado.'],
      ['A bainha pode ser ajustada depois da cortina instalada?',
       'Pode, e em pé-direito alto é o certo: só com a cortina pendurada dá para ver onde a barra vai parar. A Shine leva a equipe de alfaiataria até a casa para esse ajuste. A costura continua reta, no fio; o que muda é a medida.'],
      ['Minha cortina encolheu na lavagem e ficou curta. E agora?',
       'É um dos problemas mais comuns. Primeiro se confere quanto tecido ainda existe na bainha: se sobrou margem, a bainha é desmanchada e refeita na medida nova, com o ponto certo. Se não sobrou, refazer a costura não devolve o comprimento que falta. Puxar ou esticar não resolve e estraga a trama.'],
      ['Por que a bainha da minha cortina ficou torta?',
       'Quase sempre por costura enviesada, na diagonal, feita para compensar um desnível do teto ou do piso. Isso danifica a trama e, com o tempo, a cortina fica desengonçada. Tensão da linha errada, tecido mal alimentado na máquina e encolhimento também repuxam a barra. Desnível se corrige no gesso ou no ajuste da bainha no local, nunca costurando torto.'],
    ],
  },
];

// ---- layout editorial (rascunho aprovado pelo Isani em 10/09/2026, portado para o sistema do site) ----
function editorialBody(post) {
  const secs = post.sections;
  const nn = (i) => String(i + 1).padStart(2, '0');
  const toc = secs.map((sec, i) => `<li><a href="#${sec.id}"><span>${nn(i)}</span>${sec.toc || sec.h2}</a></li>`).join('\n            ');
  const faqEd = post.faq.map(([q, a]) => `          <details class="sl-ed-faq"><summary>${q}</summary><div><p>${a}</p></div></details>`).join('\n');
  const sections = secs.map((sec, i) => {
    if (sec.closing) {
      return `          <section id="${sec.id}" class="sl-ed-sec sl-ed-closing">
            <div class="sl-ed-label">${nn(i)} / ${sec.label}</div>
            <h2>${sec.h2}</h2>
            <div>${sec.html}
              <a class="sl-btn" data-wa="agendar" href="${WA}" target="_blank" rel="noopener noreferrer">${sec.cta}</a>
            </div>
            <img src="${sec.img}" alt="${esc(sec.imgAlt)}" width="640" height="800" loading="lazy" decoding="async">
          </section>`;
    }
    const html = sec.faq ? sec.html + '\n' + faqEd : sec.html;
    return `          <section id="${sec.id}" class="sl-ed-sec">
            <div class="sl-ed-label">${nn(i)} / ${sec.label || post.sectionLabel || 'Guia de medidas'}</div>
            <h2>${sec.h2}</h2>
${html}
          </section>`;
  }).join('\n');
  const h = post.hero;
  return `<body class="${post.bodyClass || ''}" data-wa-context="o artigo sobre ${esc(post.kicker.toLowerCase())}">
${header('/blog/')}
${cityChip(null)}
  <main>
    <section class="sl-ed-hero">
      <div>
        <nav aria-label="Breadcrumb" class="sl-ed-crumbs"><a href="/">Início</a><span aria-hidden="true">/</span><a href="/blog/">Blog</a><span aria-hidden="true">/</span><span>${post.kicker}</span></nav>
        <p class="sl-ed-eyebrow">${h.eyebrow}</p>
        <h1 class="sl-ed-h1" id="topo">${h.h1} <em>${h.h1em}</em></h1>
        <div class="sl-ed-author"><span style="display:block;width:48px;height:48px;border-radius:50%;overflow:hidden;flex-shrink:0"><img src="/ceo-shine.avif" alt="Isani Oliveira, fundador da ShineCortinas" width="48" height="48" style="width:100%;height:100%;object-fit:cover;object-position:50% 0;transform:scale(1.7);transform-origin:50% 16%;border-radius:0" loading="eager" decoding="async"></span><div><strong>Por Isani Oliveira</strong><span>Fundador da ShineCortinas e especialista em cortinas sob medida · Atualizado em ${post.modified.split('-').reverse().join('/')}</span></div></div>
        <div class="sl-ed-lead">${h.lead}</div>
        <a class="sl-ed-readlink" href="#${h.readTo}">${h.readText} <span aria-hidden="true">↓</span></a>
      </div>
      <figure class="sl-ed-photo">
        <img src="${h.photo}" alt="${esc(h.photoAlt)}" width="${h.photoWidth || 1216}" height="${h.photoHeight || 1632}" fetchpriority="high" decoding="async">
        <figcaption><span>${h.photoTag}</span>${h.photoCaption}</figcaption>
      </figure>
    </section>

    <div class="sl-ed-shell" id="artigo">
      <aside class="sl-ed-toc">
        <nav aria-label="Neste artigo">
          <p class="sl-ed-eyebrow">Neste artigo</p>
          <ol>
            ${toc}
          </ol>
        </nav>
        <p class="sl-ed-tocnote">${post.tocNote}</p>
      </aside>
      <div class="sl-ed-col">
        <details class="sl-ed-tocm"><summary>Encontre sua dúvida neste artigo</summary><nav aria-label="Neste artigo"><ol>
            ${toc}
        </ol></nav></details>
        <article>
${sections}
        </article>
        <div class="sl-ed-authorend">
          <span style="display:block;width:64px;height:64px;border-radius:50%;overflow:hidden;flex-shrink:0"><img src="/ceo-shine.avif" alt="" width="64" height="64" style="width:100%;height:100%;object-fit:cover;object-position:50% 0;transform:scale(1.7);transform-origin:50% 16%;border-radius:0" loading="lazy" decoding="async"></span>
          <p><strong>Conhecimento de quem está no projeto.</strong><br>Orientações de Isani Oliveira, fundador da ShineCortinas e especialista em cortinas sob medida, desde 2009 no Sul Fluminense. <a href="/sobre/">Conheça a Shine</a>.</p>
        </div>
      </div>
    </div>

    <section class="sl-section sl-section--tight"><div class="sl-wrap">
      <p class="sl-label">Continue no site</p>
      <div class="sl-links">
${(post.related || []).map(([hh, t]) => `<a href="${hh}">${t}</a>`).join('')}
        <a href="/blog/">Todos os artigos</a><a href="/portfolio/">Projetos reais</a><a href="/metodo/">Como funciona</a><a href="/cidades-atendidas/">Cidades atendidas</a>
      </div>
    </div></section>
  </main>
  <script>
    (function(){var l=[].slice.call(document.querySelectorAll('.sl-ed-toc a'));if(!l.length||!('IntersectionObserver' in window))return;
    var o=new IntersectionObserver(function(es){es.forEach(function(e){if(!e.isIntersecting)return;l.forEach(function(a){var on=a.hash==='#'+e.target.id;a.classList.toggle('active',on);if(on)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});});},{rootMargin:'-5% 0px -70% 0px'});
    document.querySelectorAll('.sl-ed-sec').forEach(function(s){o.observe(s);});})();
    (function(){var b=document.querySelector('[data-video]');if(b)b.addEventListener('click',function(){var f=document.createElement('iframe');f.src=b.getAttribute('data-video');f.title=b.getAttribute('aria-label')||'Vídeo ShineCortinas';f.allow='accelerometer; gyroscope; encrypted-media; picture-in-picture; fullscreen';f.allowFullscreen=true;b.replaceWith(f);});
    document.querySelectorAll('.sl-ed-tocm a').forEach(function(a){a.addEventListener('click',function(){var d=a.closest('details');if(d)d.open=false;});});})();
  </script>
${footer()}${waFloat()}${bar('single')}${tail()}`;
}

function build(post) {
  const url = `${BASE}/blog/${post.slug}/`;
  const faqHtml = post.faq.map(([q, a]) => `        <details><summary>${q}</summary><div>${a}</div></details>`).join('\n');
  const ld = {
    '@context': 'https://schema.org',
    '@graph': [
      { '@type': 'Organization', '@id': `${BASE}/#org`, name: 'ShineCortinas', url: BASE, logo: `${BASE}/logo-shine.avif`,
        sameAs: ['https://www.instagram.com/shinecortinas/', 'https://www.facebook.com/shinecortinas', 'https://www.tiktok.com/@shinecortinas', 'https://www.youtube.com/@shinecortinas', 'https://www.pinterest.com/shinecortinas'] },
      { '@type': 'Person', '@id': `${BASE}/#isani`, name: 'Isani Oliveira', jobTitle: 'Fundador e especialista em cortinas e persianas sob medida', description: 'Fundador da ShineCortinas, à frente da empresa desde 2009. Designer de interiores por formação prática, projeta cortinas e persianas sob medida para residências do Sul Fluminense.', url: `${BASE}/sobre/`, image: `${BASE}/isani-consultoria.avif`, worksFor: { '@id': `${BASE}/#org` } },
      { '@type': 'Article', '@id': `${url}#article`, headline: post.title, description: post.description,
        datePublished: post.published, dateModified: post.modified,
        author: { '@id': `${BASE}/#isani` }, publisher: { '@id': `${BASE}/#org` },
        ...(post.ogImage ? { image: `${BASE}${post.ogImage}` } : {}),
        mainEntityOfPage: { '@id': url }, inLanguage: 'pt-BR',
        about: post.about || ['forro para cortina', 'blackout', 'semi blackout', 'cortinas sob medida'] },
      { '@type': 'FAQPage', '@id': `${url}#faq`,
        mainEntity: post.faq.map(([q, a]) => ({ '@type': 'Question', name: q, acceptedAnswer: { '@type': 'Answer', text: a } })) },
      { '@type': 'BreadcrumbList', '@id': `${url}#breadcrumb`, itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Início', item: `${BASE}/` },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: `${BASE}/blog/` },
        { '@type': 'ListItem', position: 3, name: post.title, item: url } ] },
      { '@type': 'WebPage', '@id': url, url, name: post.seoTitle, inLanguage: 'pt-BR',
        breadcrumb: { '@id': `${url}#breadcrumb` }, dateModified: post.modified,
        speakable: { '@type': 'SpeakableSpecification', xpath: post.speakableXPath || ['/html/body//h1', '/html/body//p[@class="sl-lead"]'] } },
    ],
  };

  const head = `<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, maximum-scale=5.0">
  <meta name="theme-color" content="#16302A">
  <title>${esc(post.seoTitle)}</title>
  <meta name="description" content="${esc(post.description)}">
  <meta name="robots" content="index, follow">
  <link rel="canonical" href="${url}">
  <meta property="og:type" content="article">
  <meta property="og:locale" content="pt_BR">
  <meta property="og:title" content="${esc(post.seoTitle)}">
  <meta property="og:description" content="${esc(post.description)}">
  <meta property="og:url" content="${url}">
  <meta property="og:image" content="${BASE}${post.ogImage || '/blackouts-tecnicos.avif'}">
  <meta name="twitter:card" content="summary_large_image">
  <meta name="twitter:site" content="@shinecortinas">
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link href="${FONTS}" rel="stylesheet">
  <script type="application/ld+json">
${JSON.stringify(ld, null, 2)}
  </script>
  <link rel="stylesheet" href="/assets/shine-leve.css?v=${CSS_V}">${post.stylesheet ? `\n  <link rel="stylesheet" href="${esc(post.stylesheet)}">` : ''}
  <link rel="icon" type="image/png" href="/favicon-96x96.png" sizes="96x96" />
  <link rel="icon" type="image/svg+xml" href="/favicon.svg" />
  <link rel="shortcut icon" href="/favicon.ico" />
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png" />
  <link rel="manifest" href="/site.webmanifest" />
</head>
`;

  const body = post.layout === 'editorial' ? editorialBody(post) : `<body data-wa-context="o artigo sobre ${esc(post.kicker.toLowerCase())}">
${header('/blog/')}
  <section class="sl-hero sl-hero--post">
    <div class="sl-wrap"><div class="sl-hero__in">
      <nav aria-label="Breadcrumb"><ol class="sl-crumbs">
        <li><a href="/">Início</a></li><li aria-hidden="true">/</li>
        <li><a href="/blog/">Blog</a></li><li aria-hidden="true">/</li>
        <li aria-current="page">${post.kicker}</li>
      </ol></nav>
      <p class="sl-kicker">${post.kicker}</p>
      <h1 class="sl-h1" style="font-size:clamp(28px,4.2vw,46px)">${post.title}</h1>
      <p class="sl-postmeta"><span>Por <a href="/sobre/">Isani Oliveira</a>, fundador da ShineCortinas e especialista em cortinas sob medida</span><span>Atualizado em ${post.modified.split('-').reverse().join('/')}</span></p>
    </div></div>
  </section>
${cityChip(null)}
  <main>
    <article class="sl-section"><div class="sl-wrap">
      <div class="sl-article">
        <p class="sl-lead">${post.lead}</p>
${post.body.trim()}
        <div class="sl-cta-inline">
          <h3>${post.cta?.h3 || 'Não sabe qual forro o seu ambiente pede?'}</h3>
          <p>${post.cta?.p || 'O consultor vai até a sua casa com o mostruário e mostra a diferença na luz do seu próprio cômodo. Gratuito e sem compromisso.'}</p>
          <a class="sl-btn" data-wa="estimativa" href="${WA}" target="_blank" rel="noopener noreferrer">Falar com um consultor →</a>
        </div>
      </div>
    </div></article>

    <section class="sl-section"><div class="sl-wrap">
      <div class="sl-center" style="margin-bottom:28px">
        <p class="sl-kicker sl-kicker--center">Dúvidas frequentes</p>
        <h2 class="sl-h2">Perguntas sobre <em>${post.faqEm || 'forro de cortina'}</em></h2>
      </div>
      <div class="sl-faq">
${faqHtml}
      </div>
    </div></section>

    <section class="sl-band"><div class="sl-wrap sl-center">
      <p class="sl-kicker sl-kicker--center">Consultoria em domicílio · Sul Fluminense</p>
      <h2 class="sl-h2">${post.bandH2 || 'Veja os tecidos e os forros <em>na sua casa</em>'}</h2>
      <p class="sl-sub" style="margin:0 auto 26px">A consultoria é gratuita, vai até você e não obriga a decidir nada na hora.</p>
      <a class="sl-btn" data-wa="agendar" href="${WA}" target="_blank" rel="noopener noreferrer">Agendar consultoria em casa →</a>
      <p class="sl-note">Gratuita · Sem compromisso · (24) 99329-8763</p>
    </div></section>

    <section class="sl-section sl-section--tight"><div class="sl-wrap">
      <p class="sl-label">Continue no site</p>
      <div class="sl-links">
${(post.related || [['/blog/o-que-e-blackout/', 'O que é blackout'], ['/cortinas/', 'Cortinas sob medida'], ['/persianas/', 'Persianas técnicas'], ['/blackout-e-forros/', 'Blackout e forros']]).map(([h, t]) => `<a href="${h}">${t}</a>`).join('')}
        <a href="/blog/">Todos os artigos</a><a href="/portfolio/">Projetos reais</a><a href="/metodo/">Como funciona</a><a href="/cidades-atendidas/">Cidades atendidas</a>
      </div>
    </div></section>
  </main>
${footer()}${waFloat()}${bar('single')}${tail()}`;

  const file = join(ROOT, 'blog', post.slug, 'index.html');
  if (!existsSync(file)) throw new Error(`pasta do post não existe: blog/${post.slug}/`);
  writeFileSync(file, head + body);
  return post.slug;
}

// Um slug opcional permite gerar somente o artigo em revisão.
const requested = process.argv.slice(2);
for (const slug of requested) {
  if (!POSTS.some(post => post.slug === slug)) throw new Error(`Artigo desconhecido: ${slug}`);
}
const done = POSTS.filter(post => !requested.length || requested.includes(post.slug)).map(build);
console.log(`build-blog: ${done.length} artigo(s) gerado(s) — ${done.join(', ')}`);

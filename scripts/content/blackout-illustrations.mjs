export const comparison = `
<figure class="sl-ed-fig sl-ed-figure sb-comparison-figure">
  <div class="sl-ed-figtop"><span class="sl-ed-eyebrow">O que passa pelo material</span><span>Comparação ilustrativa</span></div>
  <p class="sb-figure-intro">A mesma luz chega aos dois materiais. O que muda é a passagem dessa luz para o ambiente.</p>
  <div class="sb-comparison">
    <div class="sb-panel">
      <h3>Semi blackout 70%</h3>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 185" role="img" aria-labelledby="sb-semi-title sb-semi-desc">
        <title id="sb-semi-title">Parte da luz atravessa o semi blackout</title>
        <desc id="sb-semi-desc">Desenho esquemático. A luz chega pela esquerda. Depois do material, à direita, ainda há claridade. As setas não representam uma medição.</desc>
        <defs>
          <marker id="sb-semi-in-arrow" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0 0L6 3L0 6Z" fill="#a67b30"/></marker>
          <marker id="sb-semi-out-arrow" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0 0L6 3L0 6Z" fill="#ad925b"/></marker>
          <pattern id="sb-semi-weave" width="7" height="7" patternUnits="userSpaceOnUse"><path d="M0 0H7M0 0V7" fill="none" stroke="#a49b87" stroke-width=".6"/></pattern>
        </defs>
        <rect x="157" y="43" width="99" height="104" rx="7" fill="#eee3c3" opacity=".65"/>
        <g fill="none" stroke="#a67b30" stroke-width="2" stroke-linecap="round">
          <circle cx="33" cy="95" r="12" fill="#ead9ad"/>
          <path d="M33 72V65M33 118V125M10 95H3M49 79L54 74M17 111L12 116M17 79L12 74M49 111L54 116"/>
          <path d="M58 68H119M58 95H119M58 122H119" marker-end="url(#sb-semi-in-arrow)"/>
        </g>
        <rect x="127" y="30" width="29" height="129" rx="3" fill="#d7cdb7" stroke="#7c7665" stroke-width="1.5"/>
        <rect x="128" y="31" width="27" height="127" rx="3" fill="url(#sb-semi-weave)"/>
        <path d="M136 33V156M149 33V156" stroke="#c1b49a" stroke-width="2"/>
        <g fill="none" stroke="#ad925b" stroke-width="1.8" stroke-linecap="round" opacity=".72" marker-end="url(#sb-semi-out-arrow)">
          <path d="M164 68H246M164 95H246M164 122H246"/>
        </g>
        <g font-family="Montserrat, Arial, sans-serif" font-size="12" fill="#45584e" text-anchor="middle">
          <text x="73" y="177">Luz</text><text x="207" y="177">Ambiente</text>
        </g>
      </svg>
      <p><strong>A claridade diminui, mas continua presente.</strong> É aquela sensação de tardezinha que eu costumo indicar para quem quer aconchego na sala.</p>
    </div>
    <div class="sb-panel">
      <h3>Blackout 100%</h3>
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 280 185" role="img" aria-labelledby="sb-full-title sb-full-desc">
        <title id="sb-full-title">O blackout 100% bloqueia a luz pelo material</title>
        <desc id="sb-full-desc">A mesma luz chega pela esquerda e para no material. Nenhuma seta atravessa para a direita. O desenho trata do material; as frestas da instalação são explicadas separadamente.</desc>
        <defs>
          <marker id="sb-full-in-arrow" markerWidth="7" markerHeight="7" refX="5.5" refY="3" orient="auto" markerUnits="strokeWidth"><path d="M0 0L6 3L0 6Z" fill="#a67b30"/></marker>
          <pattern id="sb-full-weave" width="7" height="7" patternUnits="userSpaceOnUse"><path d="M0 0H7M0 0V7" fill="none" stroke="#a49b87" stroke-width=".6"/></pattern>
        </defs>
        <rect x="157" y="43" width="99" height="104" rx="7" fill="#e6e9e2"/>
        <g fill="none" stroke="#a67b30" stroke-width="2" stroke-linecap="round">
          <circle cx="33" cy="95" r="12" fill="#ead9ad"/>
          <path d="M33 72V65M33 118V125M10 95H3M49 79L54 74M17 111L12 116M17 79L12 74M49 111L54 116"/>
          <path d="M58 68H119M58 95H119M58 122H119" marker-end="url(#sb-full-in-arrow)"/>
        </g>
        <rect x="127" y="30" width="29" height="129" rx="3" fill="#d7cdb7" stroke="#7c7665" stroke-width="1.5"/>
        <rect x="128" y="31" width="27" height="127" rx="3" fill="url(#sb-full-weave)"/>
        <path d="M136 33V156M149 33V156" stroke="#c1b49a" stroke-width="2"/>
        <path d="M159 58V132" stroke="#16302a" stroke-width="3" stroke-linecap="round"/>
        <g font-family="Montserrat, Arial, sans-serif" font-size="12" fill="#45584e" text-anchor="middle">
          <text x="73" y="177">Luz</text><text x="207" y="177">Ambiente</text>
        </g>
      </svg>
      <p><strong>A luz não atravessa o material.</strong> Para deixar o quarto escuro, eu também preciso cuidar dos caminhos por onde ela pode contornar o forro.</p>
    </div>
  </div>
  <figcaption>Esquemas qualitativos, sem escala de luminosidade. As cores apenas ajudam a leitura do desenho; não representam cores de produtos nem um resultado medido no ambiente.</figcaption>
</figure>`;

export const lightGaps = `
<figure class="sl-ed-fig sl-ed-figure sb-gaps-figure">
  <div class="sl-ed-figtop"><span class="sl-ed-eyebrow">Por onde a luz pode entrar</span><span>Vista frontal</span></div>
  <p class="sb-figure-intro"><strong>Aqui eu mostro uma instalação com frestas.</strong> Mesmo com material blackout 100%, a luz encontra espaço para passar ao redor e entre as duas partes.</p>
  <div class="sl-ed-measure sb-gaps-layout">
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 480 395" role="img" aria-labelledby="sb-gaps-title sb-gaps-desc">
      <title id="sb-gaps-title">Quatro caminhos de luz em um forro com fechamento insuficiente</title>
      <desc id="sb-gaps-desc">Vista frontal de uma janela atrás de duas partes de forro. A luz aparece acima, nas duas laterais, entre as partes e abaixo da barra. Os números de um a quatro correspondem à legenda. É uma situação a corrigir, não a instalação recomendada.</desc>
      <defs>
        <linearGradient id="sb-floor-light" x1="0" y1="0" x2="0" y2="1"><stop offset="0" stop-color="#e4bd63" stop-opacity=".7"/><stop offset="1" stop-color="#e4bd63" stop-opacity=".08"/></linearGradient>
        <linearGradient id="sb-fabric-shade" x1="0" y1="0" x2="1" y2="0"><stop offset="0" stop-color="#d8cdb6"/><stop offset=".45" stop-color="#ede5d3"/><stop offset="1" stop-color="#c9bda4"/></linearGradient>
      </defs>
      <rect x="45" y="36" width="390" height="309" rx="3" fill="#e9e5da"/>
      <rect x="80" y="61" width="320" height="266" fill="#f2dea7" stroke="#b9ac90" stroke-width="4"/>
      <path d="M240 63V325M82 190H398" fill="none" stroke="#c1b391" stroke-width="3"/>
      <path d="M77 328L62 366H418L403 328Z" fill="url(#sb-floor-light)"/>
      <path d="M25 345H455" fill="none" stroke="#a9a89a" stroke-width="2"/>
      <g fill="#e4bd63" opacity=".65">
        <rect x="83" y="65" width="314" height="21"/>
        <rect x="83" y="87" width="16" height="235"/>
        <rect x="381" y="87" width="16" height="235"/>
        <rect x="235" y="87" width="11" height="235"/>
        <rect x="99" y="316" width="282" height="11"/>
      </g>
      <g fill="url(#sb-fabric-shade)" stroke="#998d74" stroke-width="1.5">
        <path d="M99 85Q112 91 125 85Q139 91 153 85Q167 91 181 85Q194 91 207 85Q221 91 234 85L234 316Q221 321 207 316Q194 321 181 316Q167 321 153 316Q139 321 125 316Q112 321 99 316Z"/>
        <path d="M246 85Q260 91 273 85Q287 91 300 85Q314 91 327 85Q341 91 354 85Q368 91 381 85L381 316Q368 321 354 316Q341 321 327 316Q314 321 300 316Q287 321 273 316Q260 321 246 316Z"/>
      </g>
      <g fill="none" stroke="#b9aa8e" stroke-width="1.5" opacity=".8">
        <path d="M112 96V305M140 96V307M167 96V305M195 96V307M221 96V305M260 96V305M287 96V307M314 96V305M341 96V307M368 96V305"/>
      </g>
      <g fill="none" stroke="#16302a" stroke-width="1.7" stroke-linecap="round">
        <path d="M240 50V76M429 177H390M279 218L241 201M240 353V330"/>
      </g>
      <g fill="#16302a" stroke="#f7f3e9" stroke-width="3">
        <circle cx="240" cy="32" r="18"/><circle cx="446" cy="177" r="18"/><circle cx="292" cy="227" r="18"/><circle cx="240" cy="372" r="18"/>
      </g>
      <g fill="#fff" font-family="Montserrat, Arial, sans-serif" font-size="19" font-weight="600" text-anchor="middle">
        <text x="240" y="39">1</text><text x="446" y="184">2</text><text x="292" y="234">3</text><text x="240" y="379">4</text>
      </g>
    </svg>
    <div class="sb-gaps-legend">
      <p><b><span>1</span>Fechamento superior</b>A altura e a posição da instalação precisam impedir a passagem por cima do forro.</p>
      <p><b><span>2</span>Laterais</b>As pontas precisam ficar próximas da parede e permanecer no lugar quando eu fecho o forro.</p>
      <p><b><span>3</span>Encontro central</b>As duas partes precisam se encostar, com tecido e franzimento suficientes.</p>
      <p><b><span>4</span>Barra até o piso</b>Para escurecer o quarto, eu digo que o forro precisa “beijar o chão”.</p>
    </div>
  </div>
  <figcaption>Os espaços estão destacados para explicar os caminhos da luz. O desenho não indica medidas de instalação nem representa o fechamento recomendado.</figcaption>
</figure>`;

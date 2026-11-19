/* ====================================================================
   Kart over Karlsøya og festivalområdet
   Tegnet som SVG etter det håndtegnede kartet i programheftet 2026.
   Forenklet, ikke i målestokk. Stedene bygger på den felles stedslista (DATA.venues).
   I den ferdige løsningen: festivalområdet som eget tegnet kart, og steder utenfor øya
   med MapLibre og kartfliser fra OpenStreetMap-data på egen server.
   ==================================================================== */

const ISLAND_D = 'M574,658 C558,662 564,663 549,657 C534,651 505,637 483,624 C460,611 439,598 415,579 C391,559 358,520 341,508 C323,495 329,503 311,503 C293,504 254,513 231,511 C209,510 190,494 176,493 C161,491 153,512 147,502 C142,492 142,449 144,432 C146,414 164,414 158,398 C152,381 116,352 108,331 C100,311 113,289 112,274 C110,260 110,259 99,244 C89,229 58,203 50,186 C42,169 47,155 50,143 C53,130 53,119 69,109 C84,99 122,85 144,82 C166,78 181,94 200,89 C220,83 245,56 260,50 C275,44 282,48 293,51 C303,54 313,68 325,70 C338,72 349,55 368,63 C388,70 426,93 442,113 C457,133 446,157 461,182 C476,207 514,248 529,262 C545,277 544,270 555,270 C567,270 586,261 597,260 C608,259 608,254 622,263 C636,271 669,297 681,311 C693,324 686,332 693,342 C701,352 713,365 725,372 C736,379 750,383 764,385 C777,387 792,389 804,385 C817,380 825,366 839,357 C854,349 875,334 891,334 C907,333 924,343 934,354 C944,364 947,382 950,396 C953,411 952,426 950,439 C947,453 947,460 936,478 C924,497 892,525 880,549 C868,573 872,612 862,623 C852,634 836,621 821,615 C806,609 790,591 774,587 C758,582 739,584 723,586 C708,588 695,591 682,600 C668,608 659,626 641,635Z';

/* Fargene på hjertene følger tegnforklaringen i programheftet 2026. */
DATA.mapSpots = {
  /* Karlsøya */
  kaia:      { lvl: 'island', x: 158, y: 505, kind: 'fac', n: { nb: 'Ferjekaia', en: 'Ferry quay' }, d: { nb: 'Ferja fra Hansnes legger til her. Gratis ferge under festivalen. Herfra er det en kort gåtur til festivalområdet.', en: 'The ferry from Hansnes arrives here. Free ferry during the festival. A short walk to the festival area.' } },
  galsa:     { lvl: 'island', x: 238, y: 468, kind: 'heart', c: '#E33FC8', venue: 'galsa', sn: { nb: 'Butikken / GÁLSÁ', en: 'Shop / GÁLSÁ' }, n: { nb: 'Butikken og Galleri GÁLSÁ', en: 'The shop and Galleri GÁLSÁ' } },
  kirka:     { lvl: 'island', x: 300, y: 424, kind: 'fac', venue: 'kirka', n: { nb: 'Kirka', en: 'The church' } },
  omr:       { lvl: 'island', x: 398, y: 404, kind: 'heart', c: '#E2343B', n: { nb: 'Festivalområdet', en: 'The festival area' }, d: { nb: 'Festivalhuset, scenene, plassen og campen. Trykk for å se kartet over festivalområdet.', en: 'The festival house, the stages, the square and the camp. Tap to see the map of the festival area.' }, go: 'area' },
  sandvika:  { lvl: 'island', x: 292, y: 118, kind: 'fac', n: { nb: 'Sandvika', en: 'Sandvika' }, d: { nb: 'Strand på nordsida. Turer og etterfest, med oppmøte på festivalplassen.', en: 'Beach on the north side. Walks and after-parties, meeting at the festival square.' } },
  korsneset: { lvl: 'island', x: 884, y: 432, kind: 'fac', n: { nb: 'Korsneset', en: 'Korsneset' }, d: { nb: 'Neset i øst. Fin tur langs stranda, med utsikt mot Vanna og Ringvassøya.', en: 'The headland to the east. A good walk along the shore.' } },

  /* Festivalområdet */
  inngang:   { lvl: 'area', x: 330, y: 70, kind: 'fac', n: { nb: 'Inngang', en: 'Entrance' }, d: { nb: 'Her kommer du inn fra veien. Deltakerhuben ligger rett innenfor.', en: 'Where you come in from the road. The Participant Hub is just inside.' } },
  hub:       { lvl: 'area', x: 452, y: 168, lp: 'l', kind: 'fac', venue: 'hub', meet: ['vertskap'] },
  stor:      { lvl: 'area', x: 640, y: 118, lp: 'b', kind: 'heart', c: '#2F3FC0', venue: 'stor', meet: ['praktisk'] },
  hagen:     { lvl: 'area', x: 132, y: 236, kind: 'fac', venue: 'hagen', meet: ['miljo'], sn: { nb: 'Pusterom og hage', en: 'Rest lavvo and garden' }, n: { nb: 'Pusterom-lavvoen og felleskapshagen', en: 'The rest lavvo and the community garden' } },
  zap:       { lvl: 'area', x: 205, y: 430, kind: 'heart', c: '#F2E27A', venue: 'zap', meet: ['kjokken'], sn: { nb: 'Festivalhuset', en: 'Festival house' } },
  kjokk:     { lvl: 'area', x: 152, y: 382, kind: 'fac', venue: 'kjokk' },
  media:     { lvl: 'area', x: 268, y: 500, kind: 'fac', n: { nb: 'Mediahuben', en: 'The Media Hub' }, d: { nb: 'Gjør-det-selv-verksted i festivalhuset: fanzine, postkontor og kanskje lokalradio.', en: 'Do-it-yourself workshop in the festival house: fanzine, post office and perhaps local radio.' } },
  vann:      { lvl: 'area', x: 120, y: 560, kind: 'fac', sn: { nb: 'Vann og do', en: 'Water, WC' }, n: { nb: 'Vann, dusjer og do', en: 'Water, showers and toilets' }, d: { nb: 'Drikkevann, dusjer og toaletter ved festivalhuset.', en: 'Drinking water, showers and toilets by the festival house.' } },
  lille:     { lvl: 'area', x: 222, y: 618, kind: 'heart', c: '#A66EE0', venue: 'lille', meet: ['program'] },
  plass:     { lvl: 'area', x: 508, y: 430, kind: 'heart', c: '#F2C21B', venue: 'plass' },
  barneo:    { lvl: 'area', x: 112, y: 778, kind: 'heart', c: '#3FB2EA', venue: 'barneo', meet: ['barn'] },
  yurta:     { lvl: 'area', x: 440, y: 818, kind: 'heart', c: '#2FA84A', venue: 'yurta' },
  lavvo:     { lvl: 'area', x: 682, y: 690, kind: 'heart', c: '#EE8263', venue: 'lavvo' },
  do:        { lvl: 'area', x: 300, y: 880, kind: 'fac', n: { nb: 'Do', en: 'Toilets' }, d: { nb: 'Utedo nederst på området.', en: 'Outdoor toilets at the bottom of the area.' } }
};
/* Verk og steder utenfor øya (valgfritt på hvert verk). */
DATA.elsewhere = {
  tulkarem: { n: { nb: 'Tulkarem, Vestbredden i Palestina', en: 'Tulkarem, the West Bank, Palestine' }, lat: 32.31, lon: 35.03 }
};

const spot = id => DATA.mapSpots[id];
const spotName = s => s.n ? L(s.n) : (s.venue ? venue(s.venue) : '');
const spotDesc = s => s.d ? L(s.d) : (s.venue ? DATA.venues[s.venue].d : '');
const spotOf = loc => loc && (loc.spot || Object.keys(DATA.mapSpots).find(k => DATA.mapSpots[k].venue === loc.v));
const HEART = 'M0,9 C-3,6 -13,0 -13,-7 C-13,-12 -9,-15 -5,-15 C-2,-15 0,-13 0,-11 C0,-13 2,-15 5,-15 C9,-15 13,-12 13,-7 C13,0 3,6 0,9Z';

function mapMarker(id, s, opts) {
  const sel = opts.sel === id, dim = opts.only && opts.only !== id;
  const label = esc(spotName(s)), short = esc(s.sn ? L(s.sn) : spotName(s));
  const shape = s.kind === 'heart'
    ? `<path d="${HEART}" transform="scale(${sel ? 1.55 : 1.25})" fill="${s.c}" stroke="#1A1614" stroke-width="1.6" stroke-linejoin="round"/>`
    : `<circle r="${sel ? 9 : 7}" fill="#FDFBF9" stroke="#433B35" stroke-width="2.4"/>${s.meet ? `<circle r="3" fill="#433B35"/>` : ''}`;
  const tx = s.kind === 'heart' ? 22 : 15;
  const anchor = s.lp === 'b' ? 'middle' : s.lp === 'l' ? 'end' : s.x > (s.lvl === 'island' ? 760 : 600) ? 'end' : 'start';
  const lx = anchor === 'end' ? -tx : anchor === 'middle' ? 0 : tx, ly = s.lp === 'b' ? 50 : 5;
  const inter = opts.interactive !== false;
  return `<g class="mk${sel ? ' sel' : ''}${dim ? ' dim' : ''}" transform="translate(${s.x},${s.y})"${inter ? ` data-act="mapsel" data-v="${id}" tabindex="0" role="button" aria-pressed="${sel}"` : ''} aria-label="${label}">
    ${sel ? `<circle r="26" fill="#F0604C" opacity=".18"/>` : ''}${shape}
    ${opts.labels === false && !sel ? '' : `<text x="${lx}" y="${ly}" text-anchor="${anchor}" class="mk-l">${short}</text>`}</g>`;
}

/* Karlsøya: øya, sjøen og ferjeleia */
function islandSVG(opts) {
  const spots = Object.entries(DATA.mapSpots).filter(([, s]) => s.lvl === 'island');
  return `<svg class="kart isl" viewBox="0 0 1000 708" role="img" aria-label="${esc(t('mapIsland'))}">
    <defs><pattern id="kw" width="24" height="10" patternUnits="userSpaceOnUse"><path d="M0 6 Q6 2 12 6 T24 6" fill="none" stroke="#B9D3DB" stroke-width="1.2"/></pattern></defs>
    <rect width="1000" height="708" fill="#E4EFF2"/><rect width="1000" height="708" fill="url(#kw)" opacity=".55"/>
    <path d="${ISLAND_D}" fill="#C9DCC0" transform="translate(6,8)" opacity=".5"/>
    <path d="${ISLAND_D}" fill="#EEF0E2" stroke="#6D645C" stroke-width="2.5"/>
    <path d="M190,470 C260,440 330,420 400,404 C470,390 540,360 600,330" fill="none" stroke="#BDB2AA" stroke-width="3" stroke-dasharray="1 0"/>
    <path d="M300,140 C320,220 360,300 398,404" fill="none" stroke="#BDB2AA" stroke-width="2.2" stroke-dasharray="6 6"/>
    <path d="M0,560 C60,540 110,520 150,507" fill="none" stroke="#433B35" stroke-width="2" stroke-dasharray="8 7" opacity=".6"/>
    <text x="14" y="590" class="kt-sea">${esc(t('ferryFrom'))}</text>
    <text x="560" y="380" class="kt-area">Lågmyra</text>
    <text x="620" y="560" class="kt-island">Karlsøya</text>
    ${opts.sel === 'omr' || !opts.sel ? `<ellipse cx="398" cy="404" rx="56" ry="38" fill="none" stroke="#E2343B" stroke-width="2" stroke-dasharray="4 5"/>` : ''}
    ${spots.map(([id, s]) => mapMarker(id, s, opts)).join('')}
    ${compass(930, 90)}</svg>`;
}
/* Festivalområdet: enga, sjøen, husene og scenene */
function areaSVG(opts) {
  const spots = Object.entries(DATA.mapSpots).filter(([, s]) => s.lvl === 'area');
  const tent = (cx, cy, r) => `<circle cx="${cx}" cy="${cy}" r="${r}" fill="#FDFBF9" stroke="#433B35" stroke-width="2"/>${[0, 60, 120, 180, 240, 300].map(a => `<line x1="${cx}" y1="${cy}" x2="${cx + r * Math.cos(a * Math.PI / 180)}" y2="${cy + r * Math.sin(a * Math.PI / 180)}" stroke="#BDB2AA" stroke-width="1.4"/>`).join('')}<circle cx="${cx}" cy="${cy}" r="${r / 6}" fill="#BDB2AA"/>`;
  return `<svg class="kart" viewBox="0 0 800 920" role="img" aria-label="${esc(t('mapArea'))}">
    <defs><pattern id="kw2" width="24" height="10" patternUnits="userSpaceOnUse"><path d="M0 6 Q6 2 12 6 T24 6" fill="none" stroke="#B9D3DB" stroke-width="1.2"/></pattern>
    <pattern id="gr" width="18" height="18" patternUnits="userSpaceOnUse"><path d="M4 12 l2 -5 M9 14 l1 -6 M14 11 l2 -4" stroke="#C5D4B2" stroke-width="1.1"/></pattern></defs>
    <rect width="800" height="920" fill="#FDFBF9"/>
    <path d="M800,520 C740,600 720,700 650,780 C600,840 560,880 520,920 L800,920Z" fill="#E4EFF2"/>
    <path d="M800,520 C740,600 720,700 650,780 C600,840 560,880 520,920 L800,920Z" fill="url(#kw2)" opacity=".6"/>
    <path d="M60,40 C220,10 560,20 760,60 C790,200 780,420 770,520 C720,620 690,720 620,790 C560,850 480,900 360,905 C220,910 90,880 40,820 C10,640 20,300 60,40Z" fill="#EEF2E2" stroke="#BDB2AA" stroke-width="2"/>
    <path d="M60,40 C220,10 560,20 760,60 C790,200 780,420 770,520 C720,620 690,720 620,790 C560,850 480,900 360,905 C220,910 90,880 40,820 C10,640 20,300 60,40Z" fill="url(#gr)" opacity=".7"/>
    <g fill="none" stroke="#D8CCBF" stroke-width="16" stroke-linecap="round" stroke-linejoin="round">
      <path d="M330,0 L330,70 C360,120 420,150 452,170 C480,240 500,330 508,430 C500,560 470,700 440,818"/>
      <path d="M452,170 C520,150 580,135 640,128"/><path d="M508,430 C400,430 300,430 220,430"/><path d="M508,430 C580,520 640,600 682,690"/>
      <path d="M220,430 C222,500 222,560 222,618 C200,680 150,730 112,778"/><path d="M222,618 C260,720 290,800 300,880"/></g>
    <rect x="300" y="380" width="0" height="0"/>
    <ellipse cx="508" cy="430" rx="110" ry="74" fill="#F7EDCB" stroke="#E7D7A3" stroke-width="2"/>
    <g transform="translate(150,330) rotate(-4)"><rect width="120" height="200" rx="6" fill="#FDFBF9" stroke="#433B35" stroke-width="2.4"/><rect x="10" y="12" width="46" height="50" fill="none" stroke="#BDB2AA" stroke-width="1.5"/><rect x="64" y="12" width="46" height="80" fill="none" stroke="#BDB2AA" stroke-width="1.5"/><rect x="10" y="140" width="100" height="48" fill="none" stroke="#BDB2AA" stroke-width="1.5"/></g>
    <g transform="translate(580,86)"><path d="M0,0 L120,0 L106,64 L14,64Z" fill="#FDFBF9" stroke="#433B35" stroke-width="2.4"/><path d="M14,64 L106,64" stroke="#433B35" stroke-width="5"/><path d="M8,6 L40,58 M112,6 L80,58" stroke="#BDB2AA" stroke-width="1.4"/></g>
    <g transform="translate(420,148)"><path d="M0,22 L32,0 L64,22 L64,46 L0,46Z" fill="#FDFBF9" stroke="#433B35" stroke-width="2.2"/></g>
    <g transform="translate(300,48)"><path d="M0,20 L30,0 L60,20 L60,40 L0,40Z" fill="none" stroke="#433B35" stroke-width="2"/></g>
    <g transform="translate(88,200)"><path d="M0,60 L44,0 L88,60Z" fill="#FDFBF9" stroke="#433B35" stroke-width="2.2"/><circle cx="130" cy="40" r="26" fill="#DDE8CC" stroke="#9DB884" stroke-width="1.6"/><circle cx="150" cy="70" r="16" fill="#DDE8CC" stroke="#9DB884" stroke-width="1.6"/></g>
    <g transform="translate(190,596)"><rect width="64" height="44" rx="4" fill="#FDFBF9" stroke="#433B35" stroke-width="2.2"/></g>
    <g transform="translate(96,540)"><rect width="48" height="34" rx="4" fill="#FDFBF9" stroke="#433B35" stroke-width="2"/><path d="M12,8 q4,8 0,14 M24,8 q4,8 0,14 M36,8 q4,8 0,14" stroke="#7FB9D0" stroke-width="2" fill="none"/></g>
    ${tent(112, 778, 58)}${tent(440, 818, 48)}${tent(682, 690, 62)}
    <path d="M700,630 C730,600 760,560 790,540" stroke="#BDB2AA" stroke-width="10" stroke-linecap="round" fill="none" opacity=".45"/>
    <text x="700" y="880" class="kt-sea" text-anchor="end">${esc(t('mapSea'))}</text>
    ${spots.map(([id, s]) => mapMarker(id, s, opts)).join('')}
    ${compass(740, 120)}</svg>`;
}
const compass = (x, y) => `<g transform="translate(${x},${y})" class="kompass" aria-hidden="true"><circle r="22" fill="#FDFBF9" stroke="#BDB2AA" stroke-width="1.5"/><path d="M0,-16 L6,4 L0,0 L-6,4Z" fill="#433B35"/><text y="-26" text-anchor="middle">N</text></g>`;

/* Sidepanel: valgt sted, eller tegnforklaring */
function mapSide(lvl, sel) {
  const s = sel && spot(sel);
  if (s) {
    const v = s.venue;
    const next = v ? DATA.program.filter(p => p.venue === v && p.start && (p.day > DEMO.day || (p.day === DEMO.day && sortKey(p.end) > DEMO.min))).sort((a, b) => a.day - b.day || sortKey(a.start) - sortKey(b.start)).slice(0, 3) : [];
    const works = DATA.items.filter(i => spotOf(i.loc) === sel);
    return `<div class="map-info">
      <p class="kicker">${s.kind === 'heart' ? `<svg width="16" height="16" viewBox="-14 -16 28 26" aria-hidden="true"><path d="${HEART}" fill="${s.c}" stroke="#1A1614" stroke-width="1.6"/></svg>` : ''}${s.lvl === 'area' ? t('mapArea') : t('mapIsland')}</p>
      <h2>${esc(spotName(s))}</h2><p>${esc(spotDesc(s))}</p>
      ${s.meet ? `<p class="meet"><strong>${t('meetPoint')}:</strong> ${s.meet.map(g => `<a class="gchip" href="#/handbok/gruppe/${g}"><span class="swatch" style="background:${DATA.groups[g].c}"></span>${esc(groupName(g))}</a>`).join(' ')}</p>` : ''}
      ${s.go ? `<p><button class="btn btn-dark" data-act="maplvl" data-v="${s.go}">${t('mapOpenArea')}</button></p>` : ''}
      ${next.length ? `<h3>${t('mapNextHere')}</h3><ul class="plist">${next.map(x => progItem(x, { prefix: fmt(dayDate(x.day), { weekday: 'short' }) })).join('')}</ul>` : ''}
      ${works.length ? `<h3>${t('mapWorksHere')}</h3><ul class="mini-works">${works.map(w => `<li><a href="#/innhold/${w.id}">${esc(w.title)}</a><span>${L(DATA.itemTypes[w.type])}</span></li>`).join('')}</ul>` : ''}
      <p><button class="btn btn-small" data-act="mapsel" data-v="">${t('mapAll')}</button></p></div>`;
  }
  const list = Object.entries(DATA.mapSpots).filter(([, x]) => x.lvl === lvl);
  const hearts = list.filter(([, x]) => x.kind === 'heart'), facs = list.filter(([, x]) => x.kind !== 'heart');
  const row = ([id, x]) => `<li><button data-act="mapsel" data-v="${id}">${x.kind === 'heart' ? `<svg width="18" height="18" viewBox="-14 -16 28 26" aria-hidden="true"><path d="${HEART}" fill="${x.c}" stroke="#1A1614" stroke-width="1.6"/></svg>` : `<span class="fdot${x.meet ? ' m' : ''}"></span>`}<span>${esc(spotName(x))}</span></button></li>`;
  return `<div class="map-info"><h2>${lvl === 'area' ? t('mapArea') : t('mapIsland')}</h2>
    <h3>${t('mapVenues')}</h3><ul class="legend">${hearts.map(row).join('')}</ul>
    <h3>${t('mapPractical')}</h3><ul class="legend">${facs.map(row).join('')}</ul>
    ${lvl === 'area' ? `<p class="small"><span class="fdot m"></span> ${t('mapMeetNote')}</p>` : ''}</div>`;
}

/* Håndboka: Kart over festivalen */
function pMap(r) {
  if (r.c && spot(r.c)) { STATE.mapSel = r.c; STATE.mapLvl = spot(r.c).lvl; }
  const lvl = STATE.mapLvl || 'area', sel = STATE.mapSel && spot(STATE.mapSel) && spot(STATE.mapSel).lvl === lvl ? STATE.mapSel : '';
  const tab = (v, k) => `<button data-act="maplvl" data-v="${v}" aria-pressed="${lvl === v}">${t(k)}</button>`;
  const canvas = lvl === 'drawn'
    ? `<figure class="drawn"><img src="assets/img/kart-2026.jpg" alt="${esc(t('mapDrawnAlt'))}"><figcaption>${t('mapDrawnCap')}</figcaption></figure>`
    : `<div class="map-canvas">${lvl === 'island' ? islandSVG({ sel }) : areaSVG({ sel })}</div>`;
  return `<article class="wrap map-page">
    <p class="crumb"><a href="#/handbok">${t('handbook')}</a></p>
    <h1>${t('mapTitle')}</h1><p class="lead narrowtext">${t('mapLead')}</p>
    <div class="maptabs" role="group" aria-label="${t('mapTitle')}">${tab('area', 'mapArea')}${tab('island', 'mapIsland')}${tab('drawn', 'mapDrawn')}</div>
    <div class="map-layout${lvl === 'drawn' ? ' one' : ''}">${canvas}${lvl === 'drawn' ? '' : `<aside class="map-side">${mapSide(lvl, sel)}</aside>`}</div>
    <p class="small">${t('mapNote')}</p>
  </article>`;
}

/* Verk: valgfritt sted, med lite kart */
function workPlace(w) {
  if (!w.loc) return '';
  if (w.loc.away) {
    const p = DATA.elsewhere[w.loc.away];
    return `<section class="placebox away"><h2>${t('place')}</h2>
      <div class="away-card"><svg viewBox="0 0 120 60" width="120" height="60" aria-hidden="true"><path d="M8,44 C30,10 90,10 112,40" fill="none" stroke="#BDB2AA" stroke-width="2" stroke-dasharray="4 4"/><circle cx="8" cy="44" r="5" fill="#E2343B"/><circle cx="112" cy="40" r="6" fill="#FDFBF9" stroke="#433B35" stroke-width="2.4"/></svg>
      <div><strong>${esc(L(p.n))}</strong><span>${t('awayNote')}</span><span class="small">${p.lat.toFixed(2)}° N, ${p.lon.toFixed(2)}° Ø</span>
      <a href="https://www.openstreetmap.org/?mlat=${p.lat}&amp;mlon=${p.lon}#map=12/${p.lat}/${p.lon}" target="_blank" rel="noopener">${t('openOSM')}</a></div></div></section>`;
  }
  const id = spotOf(w.loc), s = spot(id);
  if (!s) return '';
  const svg = s.lvl === 'island' ? islandSVG({ sel: id, only: id, labels: false, interactive: false }) : areaSVG({ sel: id, only: id, labels: false, interactive: false });
  return `<section class="placebox"><h2>${t('place')}</h2>
    <a class="minimap" href="#/handbok/kart/${id}" aria-label="${esc(t('seeOnMap'))}: ${esc(spotName(s))}">${svg}</a>
    <p><strong>${esc(spotName(s))}</strong> · <a href="#/handbok/kart/${id}">${t('seeOnMap')}</a></p></section>`;
}

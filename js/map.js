/* ====================================================================
   Kart over Karlsøya og festivalområdet
   Tegnet som SVG etter det håndtegnede kartet i programheftet 2026.
   Forenklet, ikke i målestokk. Stedene bygger på den felles stedslista (DATA.venues).
   I den ferdige løsningen: festivalområdet som eget tegnet kart, og steder utenfor øya
   med MapLibre og kartfliser fra OpenStreetMap-data på egen server.
   ==================================================================== */

const ISLAND_D = 'M575,636 C568,636 563,637 558,636 C552,635 552,635 542,632 C532,628 509,620 499,615 C488,610 488,610 478,601 C469,593 454,577 441,566 C427,555 414,550 397,535 C381,520 354,487 343,476 C331,465 333,471 329,470 C325,470 323,474 320,474 C318,475 316,476 313,473 C309,471 315,470 300,458 C284,446 245,422 219,403 C193,384 163,354 146,342 C129,329 123,334 117,329 C112,324 113,322 115,314 C116,307 124,294 126,284 C128,273 134,267 125,251 C117,236 85,203 76,192 C68,180 75,186 74,183 C72,180 67,179 65,175 C64,171 67,162 65,159 C63,157 58,158 55,157 C53,155 51,154 50,150 C49,147 48,140 51,137 C54,133 65,133 68,130 C71,126 69,119 70,115 C71,111 71,111 75,108 C79,106 88,102 95,100 C102,99 111,104 117,101 C124,97 123,82 136,80 C148,77 176,85 193,84 C210,83 228,79 238,76 C247,73 248,70 252,67 C256,63 255,60 261,55 C266,51 281,42 287,40 C293,37 293,38 297,41 C301,44 305,53 310,58 C316,63 325,69 332,71 C339,72 345,70 351,68 C357,65 361,60 366,58 C370,56 374,56 379,58 C385,59 392,64 397,69 C402,74 403,82 408,87 C414,92 422,96 429,98 C436,100 444,97 449,98 C454,99 456,101 458,104 C459,108 460,113 459,120 C458,128 452,145 450,151 C449,157 451,155 452,158 C453,161 453,163 457,167 C462,170 471,173 478,179 C485,185 495,193 500,202 C504,212 501,229 504,236 C507,244 510,244 515,248 C520,252 527,258 533,261 C538,264 538,265 547,265 C556,265 578,263 588,261 C598,258 598,251 605,249 C612,247 625,249 631,250 C636,252 636,252 637,259 C638,266 636,286 638,292 C639,298 642,296 645,297 C648,297 651,298 655,297 C660,295 667,287 673,287 C679,288 687,296 690,300 C694,303 695,304 695,309 C696,313 691,323 693,327 C696,331 706,329 709,333 C713,337 711,346 712,349 C713,353 713,354 717,355 C721,356 729,356 734,357 C739,359 739,363 746,364 C754,366 770,365 779,366 C788,367 794,371 800,371 C806,372 808,372 817,368 C825,363 840,349 850,343 C859,338 867,339 873,336 C880,333 884,327 888,325 C892,323 893,324 897,325 C901,327 907,334 912,335 C916,336 921,331 925,331 C929,331 931,323 935,335 C939,346 947,382 949,399 C952,416 949,429 948,438 C947,447 947,445 942,454 C937,462 926,477 917,488 C908,499 894,507 886,522 C878,536 869,565 866,575 C863,586 866,584 868,587 C870,589 876,589 878,591 C880,592 883,594 881,598 C879,602 873,611 868,614 C864,618 857,618 853,616 C848,614 847,607 841,605 C835,602 822,602 817,599 C811,597 813,592 810,588 C806,584 807,582 796,578 C785,574 757,567 745,565 C732,564 733,565 720,569 C708,573 682,583 670,591 C659,598 660,605 652,612 C645,618 633,624 625,628 C617,631 611,633 603,634 C595,636 583,636 575,636Z';

/* Fargene på hjertene følger tegnforklaringen i programheftet 2026. */
DATA.mapSpots = {
  /* Karlsøya (plasseringer etter kartet over øya; festivalområdet, butikken og kirka er omtrentlige) */
  kaia:      { lvl: 'island', x: 300, y: 482, kind: 'fac', lp: 'l', n: { nb: 'Ferjekaia', en: 'Ferry quay' }, d: { nb: 'Ferja fra Hansnes legger til her, i bygda Karlsøy. Gratis ferge under festivalen. Herfra er det en kort gåtur til festivalområdet.', en: 'The ferry from Hansnes arrives here, in the village of Karlsøy. Free ferry during the festival. A short walk to the festival area.' } },
  galsa:     { lvl: 'island', x: 340, y: 468, kind: 'heart', c: '#E33FC8', venue: 'galsa', sn: { nb: 'Butikken / GÁLSÁ', en: 'Shop / GÁLSÁ' }, n: { nb: 'Butikken og Galleri GÁLSÁ', en: 'The shop and Galleri GÁLSÁ' } },
  kirka:     { lvl: 'island', x: 322, y: 430, kind: 'fac', venue: 'kirka', lp: 'l', n: { nb: 'Kirka', en: 'The church' } },
  omr:       { lvl: 'island', x: 400, y: 432, kind: 'heart', c: '#E2343B', n: { nb: 'Festivalområdet', en: 'The festival area' }, d: { nb: 'Festivalhuset, scenene, plassen og campen. Trykk for å se kartet over festivalområdet.', en: 'The festival house, the stages, the square and the camp. Tap to see the map of the festival area.' }, go: 'area' },
  sandvika:  { lvl: 'island', x: 700, y: 342, kind: 'fac', n: { nb: 'Sandvika', en: 'Sandvika' }, d: { nb: 'Strand på nordsida. Turer og etterfest, med oppmøte på festivalplassen.', en: 'Beach on the north side. Walks and after-parties, meeting at the festival square.' } },
  veten:     { lvl: 'island', x: 319, y: 265, kind: 'fac', n: { nb: 'Veten', en: 'Veten' }, d: { nb: 'Toppen på øya, med utsikt over fjordene. Fin tur fra festivalområdet.', en: 'The top of the island, with a view of the fjords. A good walk from the festival area.' } },
  arvik:     { lvl: 'island', x: 202, y: 106, kind: 'fac', n: { nb: 'Arvik kystfort', en: 'Arvik coastal fort' }, d: { nb: 'Gammelt kystfort på nordvestsida av øya.', en: 'An old coastal fort on the north-west side of the island.' } },
  kystfort:  { lvl: 'island', x: 836, y: 569, kind: 'fac', n: { nb: 'Karlsøy kystfort', en: 'Karlsøy coastal fort' }, d: { nb: 'Gammelt kystfort helt i sørøst.', en: 'An old coastal fort at the far south-east.' } },

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
  return `<svg class="kart isl" viewBox="0 0 1000 675" role="img" aria-label="${esc(t('mapIsland'))}">
    <defs><pattern id="kw" width="24" height="10" patternUnits="userSpaceOnUse"><path d="M0 6 Q6 2 12 6 T24 6" fill="none" stroke="#B9D3DB" stroke-width="1.2"/></pattern></defs>
    <rect width="1000" height="675" fill="#E4EFF2"/><rect width="1000" height="675" fill="url(#kw)" opacity=".55"/>
    <path d="${ISLAND_D}" fill="#C9DCC0" transform="translate(6,8)" opacity=".5"/>
    <path d="${ISLAND_D}" fill="#EEF0E2" stroke="#6D645C" stroke-width="2.5"/>
    <path d="M300,482 C330,470 360,452 400,432 C480,400 600,370 700,342" fill="none" stroke="#BDB2AA" stroke-width="2.4" stroke-dasharray="6 6"/>
    <path d="M400,432 C380,360 350,300 319,265" fill="none" stroke="#BDB2AA" stroke-width="2.4" stroke-dasharray="6 6"/>
    <path d="M60,675 C150,600 240,520 296,486" fill="none" stroke="#433B35" stroke-width="2" stroke-dasharray="8 7" opacity=".6"/>
    <text x="70" y="640" class="kt-sea">${esc(t('ferryFrom'))}</text>
    <text x="490" y="300" class="kt-area" text-anchor="middle">Lågmyra</text>
    <text x="640" y="470" class="kt-island" text-anchor="middle">Karlsøya</text>
    ${opts.sel === 'omr' || !opts.sel ? `<ellipse cx="400" cy="432" rx="52" ry="34" fill="none" stroke="#E2343B" stroke-width="2" stroke-dasharray="4 5"/>` : ''}
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

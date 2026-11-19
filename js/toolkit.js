/* ====================================================================
   Verktøykassa (fase 2)
   Bygger på bookleten «A festival as a practice in living together» (utkast mai 2026,
   laget med Demos vzw) og håndboka. Tekstene er gjenfortalt og forkortet.
   ==================================================================== */

DATA.tkPrinciples = [
  { id: 'roller', title: { nb: 'Gjør roller synlige, men fleksible', en: 'Make roles visible but flexible' },
    lead: { nb: 'Definer roller tydelig, men la dem være midlertidige og overførbare. Bruk et kart, et flagg, en vegg eller en dagsplan, og presenter rollene i starten.', en: 'Define roles explicitly, but keep them temporary and transferable. Use a map, a flag, a wall or a daily schedule, and introduce the roles at the start.' },
    here: { nb: 'På Karlsøya: Tavla ved Deltakerhuben viser rolle, gruppe, los, energi og tidsrom på hvert kort.', en: 'On Karlsøy: the Board at the Participant Hub shows role, group, guide, energy and time on every card.' }, sheet: 'tavla' },
  { id: 'eierskap', title: { nb: 'Bygg inn eierskap nedenfra', en: 'Build in bottom-up ownership' },
    lead: { nb: 'Sett av budsjett og tid til initiativ i siste liten. Gi gruppene mandat og ressurser til å bestemme selv, og godta at det gjør resultatet mindre forutsigbart.', en: 'Set aside budget and time for last-minute initiatives. Give groups a mandate and resources, and accept the unpredictability that follows.' },
    here: { nb: 'På Karlsøya: arbeidsgruppene bestemmer selv ved konsensus, og alle kan foreslå nye prosjekter innenfor manifestet.', en: 'On Karlsøy: working groups decide by consensus, and anyone can propose projects within the manifesto.' }, sheet: 'trapp' },
  { id: 'omsorg', title: { nb: 'Gjør omsorg eksplisitt', en: 'Make care explicit' },
    lead: { nb: 'Utnevn omsorgsverter med tydelig rolle og navn, og gi dem støtte. Avtal hvordan dere håndterer upassende oppførsel, som omsorg og ikke som byråkrati.', en: 'Appoint carekeepers with a clear role and name, and support them. Agree how to deal with inappropriate behaviour, as care rather than bureaucracy.' },
    here: { nb: 'På Karlsøya: dagens omsorgsverter står på Tavla, og hvilerom-lavvoen ved felleshagen er åpen hele dagen.', en: 'On Karlsøy: today’s carekeepers are on the Board, and the rest lavvo by the garden is open all day.' }, sheet: 'omsorg' },
  { id: 'visuelt', title: { nb: 'Bruk visuelt språk', en: 'Use visual language' },
    lead: { nb: 'Tegninger, symboler og kart gjør avtaler håndfaste. Et manifest som bilde, et rollekart man kan peke på og en tidslinje senker terskelen. Visuelt språk er demokratisk.', en: 'Drawings, symbols and maps make agreements tangible. A manifesto as a picture, a role chart you can point to and a timeline lower the barrier. Visual language is democratic.' },
    here: { nb: 'På Karlsøya: det tegnede kartet, gruppesymbolene og årshjulet.', en: 'On Karlsøy: the drawn map, the group symbols and the year wheel.' }, sheet: 'roller', map: true },
  { id: 'rytme', title: { nb: 'Bygg rytme inn i året', en: 'Build rhythm into the year' },
    lead: { nb: 'En festival som bare finnes under arrangementet, mister fellesskapet. Lag faste møter gjennom året, og la dem også handle om hva som virker og hva dere vil endre.', en: 'A festival that only exists during the event loses its community. Hold regular meetings through the year, and make them reflective too.' },
    here: { nb: 'På Karlsøya: medlemsmøte siste torsdag hver måned og tre fysiske møter på øya.', en: 'On Karlsøy: a members’ meeting on the last Thursday of every month and three physical meetings on the island.' }, sheet: 'rytme' },
  { id: 'politikk', title: { nb: 'Koble struktur og politikk', en: 'Link structure with politics' },
    lead: { nb: 'Hvordan dere organiserer dere, er også det dere sier. En flat struktur med konsensus bærer et politisk budskap. Gjør koblingen tydelig.', en: 'How you organise is also what you communicate. A horizontal, consensus-based structure carries a political message. Make it explicit.' },
    here: { nb: 'På Karlsøya: fellesmåltider, ingen VIP-område og gratis for barn er en del av programmet.', en: 'On Karlsøy: shared meals, no VIP area and free entry for children are part of the programme.' } }
];

DATA.tkChapters = [
  { n: 1, for: ['alle'], t: { nb: 'Historie', en: 'History' }, s: { nb: 'Fra en protest på ei øy i nord til et levende nettverk. Manifestet er et moralsk kompass, og årshjulet av møter holder fellesskapet sammen.', en: 'From a protest on a northern island to a living network. The manifesto is a moral compass, and the wheel of meetings holds the community together.' }, q: { nb: 'Hva er deres manifest, skrevet eller uskrevet?', en: 'What is your manifesto, written or unwritten?' } },
  { n: 2, for: ['arr'], t: { nb: 'Deltakerfestivalen', en: 'The participants’ festival' }, s: { nb: 'Alle er eiere. Innsatsen er en del av deltakerpasset, og grensen mellom publikum, frivillig og arrangør er visket ut. Gjør det sammen, og gjør det sjøl.', en: 'Everyone is an owner. Contribution is part of the pass, and the line between visitor, volunteer and organiser is blurred. Do it together, and do it yourself.' }, q: { nb: 'Hva betyr det å eie arrangementet hos dere?', en: 'What does ownership mean in your context?' } },
  { n: 3, for: ['alle'], t: { nb: 'Deltakelse', en: 'Participation' }, s: { nb: 'Deltakelse som en måte å være på, fra digitale møter til oppriggingsuker. Det krever tillit, og ærlighet når noe ikke går.', en: 'Participation as a way of being, from online meetings to set-up weeks. It requires trust, and honesty when something does not work.' }, q: { nb: 'Hvem faller utenfor når deltakelse er en selvfølge?', en: 'Who is left out when participation is taken for granted?' } },
  { n: 4, for: ['arr'], t: { nb: 'Roller og struktur', en: 'Roles and structure' }, s: { nb: 'Roller er ikke identiteter. Å si en rolle høyt gjør den til felles grunn. Deep Democracy, rolleflyt og Tavla som levende kunstverk.', en: 'Roles are not identities. Saying a role out loud makes it common ground. Deep Democracy, role fluidity and the Board as a living artwork.' }, q: { nb: 'Hvilke roller finnes hos dere uten å ha et navn?', en: 'Which roles exist in your group without a name?' }, sheet: 'roller' },
  { n: 5, for: ['alle'], t: { nb: 'Inkludering og omsorg', en: 'Inclusion and care' }, s: { nb: 'Spenningen mellom frihet og omsorg. Omsorgsverter, tryggere og modigere rom, og radikal inkludering som et aktivt valg.', en: 'The tension between freedom and care. Carekeepers, safer and braver spaces, and radical inclusion as an active choice.' }, q: { nb: 'Hvem gir omsorg hos dere, og er det en tydelig rolle?', en: 'Who provides care, and is it an explicit role?' }, sheet: 'omsorg' },
  { n: 6, for: ['alle'], t: { nb: 'Fellesskap', en: 'Community' }, s: { nb: 'Kjernegruppa og den bredere kretsen. Eierskap spres gjennom åpne møter og grupper som bestemmer selv. Tillit bygges i de små øyeblikkene.', en: 'The core team and the wider circle. Ownership spreads through open meetings and self-deciding groups. Trust is built in small moments.' }, q: { nb: 'Hvordan holder dere nettverket levende mellom arrangementene?', en: 'How do you keep the network alive between events?' }, sheet: 'rytme' },
  { n: 7, for: ['kunst'], t: { nb: 'Kunst og kultur skapt sammen', en: 'Co-creative art and culture' }, s: { nb: 'Programmet er en politisk handling. Fredskoret, åpen scene, fanzine og Mediehuben, laget av deltakerne selv uten en kurator.', en: 'The programme is a political act. The Peace Choir, open stage, fanzine and the Media Hub, made by the participants without a curator.' }, q: { nb: 'Hvem er synlige i programmet deres, og hvem er ikke med i prosessen?', en: 'Who is visible in your programme, and who is missing from the process?' } },
  { n: 8, for: ['kunst'], t: { nb: 'Aktivisme', en: 'Activism' }, s: { nb: 'Kunst som fredelig motstand. Seminarer, samtaler og solidaritet med Palestina, og et samarbeid med The Freedom Theatre.', en: 'Art as peaceful resistance. Seminars, conversations and solidarity with Palestine, and a collaboration with The Freedom Theatre.' }, q: { nb: 'Hvor går grensen mellom scene og organisering hos dere?', en: 'Where is the line between stage and organisation for you?' } },
  { n: 9, for: ['arr', 'forsk'], t: { nb: 'Organisasjonsmodeller', en: 'Organisational models' }, s: { nb: 'Struktur uten hierarki: sosiokrati, holakrati og eksempler fra andre festivaler og prosjekter i Europa og USA.', en: 'Structure without hierarchy: sociocracy, holacracy and examples from other festivals and projects in Europe and the US.' }, q: { nb: 'Hvilken modell ligner dere mest på, og hva skiller dere?', en: 'Which model are you closest to, and what sets you apart?' } },
  { n: 10, for: ['alle'], t: { nb: 'Inspirasjon og verktøy', en: 'Inspiration and toolkit' }, s: { nb: 'Seks prinsipper og fire arbeidsark som kan brukes hver for seg.', en: 'Six principles and four worksheets that can be used on their own.' }, q: { nb: 'Hvilket prinsipp vil dere prøve først?', en: 'Which principle will you try first?' } }
];
DATA.tkFor = { alle: { nb: 'Alle kapitler', en: 'All chapters' }, kunst: { nb: 'Kunstnere og utøvere', en: 'Artists and performers' }, arr: { nb: 'Arrangører og programmerere', en: 'Organisers and programmers' }, forsk: { nb: 'Forskere og lærere', en: 'Researchers and teachers' } };

DATA.tkSheets = [
  { id: 'tavla', src: 'hb', t: { nb: 'Lag deres egen Tavla', en: 'Make your own Board' }, d: { nb: 'Lag kort for roller og oppgaver: rolle, gruppe, los, energi og tidsrom. Skriv dem ut og heng dem opp.', en: 'Make cards for roles and tasks: role, group, guide, energy and time. Print them and put them up.' } },
  { id: 'roller', src: 'bk', t: { nb: 'Rollekart', en: 'Roles chart' }, d: { nb: 'Hvilke roller finnes hos dere? Er de definert? Er de midlertidige? Hvem kan ta dem, og gi dem fra seg?', en: 'What roles exist? Are they defined? Are they temporary? Who can take them on and let them go?' } },
  { id: 'trapp', src: 'bk', t: { nb: 'Deltakelsestrappa', en: 'Participation continuum' }, d: { nb: 'Hvor på trappa fra tilfeldig innom til medeierskap står dere i dag, og hvor vil dere?', en: 'Where on the continuum from casual involvement to co-ownership are you, and where do you want to go?' } },
  { id: 'omsorg', src: 'bk', t: { nb: 'Omsorgsstruktur', en: 'Care structure' }, d: { nb: 'Hvem gir omsorg, er det en tydelig rolle, og hva trenger dere for at den skal vare?', en: 'Who provides care, is it an explicit role, and what do you need to sustain it?' } },
  { id: 'rytme', src: 'bk', t: { nb: 'Helårsnettverket', en: 'Year-round network' }, d: { nb: 'Hvilken rytme vil dere ha gjennom året, og hvem holder i den?', en: 'What rhythm do you want through the year, and who leads it?' } },
  { id: 'los', src: 'hb', t: { nb: 'Sjekkliste for gruppelos', en: 'Checklist for group guides' }, d: { nb: 'Fra håndboka: lag rammer så det blir lett for andre å bidra.', en: 'From the handbook: create frames that make it easy for others to contribute.' } }
];
DATA.tkSteps = [
  { nb: 'Tilfeldig innom', en: 'Dropping in' }, { nb: 'Bidrar når det passer', en: 'Contributing when it suits' }, { nb: 'Tar ansvar for noe', en: 'Taking responsibility' }, { nb: 'Skaper sammen', en: 'Co-creating' }, { nb: 'Eier det sammen', en: 'Co-owning' }
];
DATA.tkExamples = [
  { t: 'Burning Man og Nowhere', d: { nb: 'Regionale samlinger og nettfora holder fellesskapet i gang hele året. Å gi uten å forvente noe tilbake ligner Karlsøyas bidragskultur.', en: 'Regional gatherings and online forums keep the community going all year. Gifting without transaction echoes Karlsøy’s culture of contribution.' } },
  { t: 'Park Poétik og Zinneke Parade, Brussel', d: { nb: 'Et lite budsjett, enkle regler og stor frihet til deltakerne. Det ligner arbeidsgruppene på Karlsøya.', en: 'A small budget, simple rules and great freedom for participants, much like Karlsøy’s working groups.' } },
  { t: 'Yes We Camp, Frankrike', d: { nb: 'Åpne møter der alle kan si sin mening, og beslutninger ved konsensus eller samtykke.', en: 'Open meetings where everyone has a say, with decisions by consensus or consent.' } },
  { t: 'Open Design School, Matera', d: { nb: 'Diagrammer, kart og tidslinjer gjør komplekse strukturer forståelige for alle.', en: 'Diagrams, maps and timelines make complex structures clear to everyone.' } },
  { t: 'Safe ’n Sound og Demos vzw', d: { nb: 'Omsorgsverter og en sjekkliste for inkluderende festivaler: psykologisk trygghet, tilgjengelig språk og håndtering av upassende oppførsel.', en: 'Carekeepers and a checklist for inclusive festivals: psychological safety, accessible communication and dealing with inappropriate behaviour.' } }
];
DATA.tkCare = [
  { nb: 'Vi har utnevnt omsorgsverter med navn og rolle.', en: 'We have appointed carekeepers with names and roles.' },
  { nb: 'Alle vet hvor de finner dagens omsorgsvert.', en: 'Everyone knows where to find today’s carekeeper.' },
  { nb: 'Vi har et rolig rom der man kan trekke seg tilbake.', en: 'We have a quiet space to withdraw to.' },
  { nb: 'Vi har avtaler om kamera, telefon og vern av barn.', en: 'We have agreements on cameras, phones and protection of children.' },
  { nb: 'Vi vet hva vi gjør ved upassende oppførsel.', en: 'We know what to do about inappropriate behaviour.' },
  { nb: 'Omsorgsvertene får selv støtte og pauser.', en: 'The carekeepers get support and breaks themselves.' },
  { nb: 'Vi har en partner med fagkunnskap om sårbare deltakere.', en: 'We have a partner with expertise in vulnerable participants.' }
];
DATA.tkLos = [
  { nb: 'Planlegg og strukturer arbeidet i forkant. Lag gjerne undergrupper med navn på ansvarlige.', en: 'Plan and structure the work in advance. Make subgroups with named people responsible.' },
  { nb: 'Gjør utstyr tilgjengelig: åpne og merkede dører, verktøy på en tavle.', en: 'Make equipment available: open, labelled doors and tools on a board.' },
  { nb: 'Lag korte beskrivelser av arbeidet, eller tavler med instruksjoner og tegninger.', en: 'Write short descriptions of the work, or boards with instructions and drawings.' },
  { nb: 'Planlegg vaktskifter. La heller folk få fri enn å bruke dem opp.', en: 'Plan shift changes. Rather give people time off than wear them out.' },
  { nb: 'Ta imot nye folk når de kommer til øya.', en: 'Welcome new people when they arrive.' },
  { nb: 'Si rollen din høyt på allmøtet, så andre vet hvem de kan spørre.', en: 'Say your role out loud at the morning meeting, so others know whom to ask.' }
];
DATA.tkMonths = { nb: ['jan', 'feb', 'mar', 'apr', 'mai', 'jun', 'jul', 'aug', 'sep', 'okt', 'nov', 'des'], en: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'] };

const tkv = (k, d) => (STATE.tk && STATE.tk[k] !== undefined ? STATE.tk[k] : d);
const tkSheet = id => DATA.tkSheets.find(s => s.id === id);

function pToolkit(r) {
  if (r && r.b === 'ark' && tkSheet(r.c)) return pSheet(tkSheet(r.c));
  const f = STATE.tkFor || 'alle';
  const chapters = DATA.tkChapters.filter(c => f === 'alle' || c.for.includes(f) || c.for.includes('alle'));
  return `<div class="hb-hero tk-hero"><div class="wrap"><p class="kicker">${t('toolkit')} ${f2tag()}</p><h1>${t('toolkitTitle')}</h1><p class="lead narrowtext">${t('toolkitLead2')}</p>
      <p class="actions"><a class="btn btn-dark" href="#/verktoykasse/ark/tavla">${t('tkStart')}</a><button class="btn" data-act="toast" data-v="${esc(t('sheetDl'))}">${t('tkBooklet')}</button></p></div></div>
    <div class="wrap">
      <h2>${t('tkPrinciples')}</h2><p class="blocklead">${t('tkPrinciplesLead')}</p>
      <div class="toolkit">${DATA.tkPrinciples.map((x, i) => `<article class="tk" style="--c:${RAINBOW12[i * 2]}"><span class="tk-n">${i + 1}</span><h3>${esc(L(x.title))}</h3><p>${esc(L(x.lead))}</p><p class="tk-here">${esc(L(x.here))}</p>
        <p class="tk-links">${x.sheet ? `<a href="#/verktoykasse/ark/${x.sheet}">${t('worksheet')}: ${esc(L(tkSheet(x.sheet).t))}</a>` : ''}${x.map ? `<a href="#/handbok/kart">${t('mapTitle')}</a>` : ''}</p></article>`).join('')}</div>

      <h2>${t('tkSheets')}</h2><p class="blocklead">${t('tkSheetsLead')}</p>
      <div class="tk-sheets">${DATA.tkSheets.map(s => `<a class="tk-sheet" href="#/verktoykasse/ark/${s.id}"><span class="tk-src">${s.src === 'hb' ? t('fromHandbook') : t('fromBooklet')}</span><strong>${esc(L(s.t))}</strong><span>${esc(L(s.d))}</span><span class="more">${t('tkOpen')}</span></a>`).join('')}</div>

      <h2>${t('tkChapters')}</h2><p class="blocklead">${t('tkChaptersLead')}</p>
      <div class="chips tk-for" role="group" aria-label="${t('tkWho')}">${Object.keys(DATA.tkFor).map(k => `<button data-act="tkfor" data-v="${k}" aria-pressed="${f === k}">${esc(L(DATA.tkFor[k]))}</button>`).join('')}</div>
      <ol class="tk-chapters">${chapters.map(c => `<li><span class="tk-cn">${String(c.n).padStart(2, '0')}</span><div><h3>${esc(L(c.t))}</h3><p>${esc(L(c.s))}</p><p class="tk-q"><strong>${t('tkQuestion')}:</strong> ${esc(L(c.q))}</p>${c.sheet ? `<a class="more" href="#/verktoykasse/ark/${c.sheet}">${esc(L(tkSheet(c.sheet).t))}</a>` : ''}</div></li>`).join('')}</ol>

      <h2>${t('tkExamples')}</h2><p class="blocklead">${t('tkExamplesLead')}</p>
      <ul class="tk-ex">${DATA.tkExamples.map(x => `<li><strong>${esc(x.t)}</strong><span>${esc(L(x.d))}</span></li>`).join('')}</ul>

      <h2>${t('fromHandbook')}</h2>
      <ul class="tk-hb">${['los', 'rytme', 'organisering', 'delta'].map(id => { const ch = byId(DATA.chapters, id); return ch ? `<li><a href="#/handbok/${id}">${esc(L(ch.title))}</a></li>` : ''; }).join('')}<li><a href="#/handbok/kart">${t('mapTitle')}</a></li></ul>
      <p class="small">${t('toolkitSrc')} ${t('tkLangs')}</p>
    </div>`;
}

function sheetShell(s, body) {
  return `<article class="wrap narrow tk-page">
    <p class="crumb"><a href="#/verktoykasse">${t('toolkit')}</a></p>
    <p class="kicker">${t('worksheet')} · ${s.src === 'hb' ? t('fromHandbook') : t('fromBooklet')}</p>
    <h1>${esc(L(s.t))}</h1><p class="lead">${esc(L(s.d))}</p>
    ${body}
    <p class="actions noprint"><button class="btn btn-dark" data-act="print">${t('tkPrint')}</button><a class="btn" href="#/verktoykasse">${t('back')}</a></p>
    <p class="small">${t('tkSaved')}</p>
  </article>`;
}
const tkInput = (k, ph, d) => `<input class="tk-in" data-act="tkf" data-v="${k}" value="${esc(tkv(k, d || ''))}" placeholder="${esc(ph)}">`;

function pSheet(s) {
  if (s.id === 'tavla') {
    const g = tkv('tv-g', 'kjokken'), e = +tkv('tv-e', 2);
    const card = `<div class="tcard tk-card" style="--g:${DATA.groups[g].c}"><div class="tc-top"><span class="tc-kind">${t('role')}</span></div>
      <h3 data-bind="tv-r">${esc(tkv('tv-r', t('tkRoleEx')))}</h3><p class="tc-d" data-bind="tv-d">${esc(tkv('tv-d', t('tkDescEx')))}</p>
      <dl class="tc-meta"><div><dt>${t('group')}</dt><dd>${groupIcon(g, 16)}${esc(groupName(g))}</dd></div><div><dt>${t('guide')}</dt><dd data-bind="tv-l">${esc(tkv('tv-l', 'Jonas'))}</dd></div>
      <div><dt>${t('when')}</dt><dd data-bind="tv-t">${esc(tkv('tv-t', '12:30–14:00'))}</dd></div></dl>${energyDots(e)}</div>`;
    return sheetShell(s, `<div class="tk-two"><form class="tk-form" onsubmit="return false">
      <label class="field"><span>${t('role')}</span>${tkInput('tv-r', t('tkRoleEx'))}</label>
      <label class="field"><span>${t('tkDesc')}</span>${tkInput('tv-d', t('tkDescEx'))}</label>
      <label class="field"><span>${t('group')}</span><select data-act="tksel" data-v="tv-g">${DATA.festivalGroups.map(x => `<option value="${x}"${x === g ? ' selected' : ''}>${esc(groupName(x))}</option>`).join('')}</select></label>
      <label class="field"><span>${t('guide')}</span>${tkInput('tv-l', 'Jonas')}</label>
      <label class="field"><span>${t('when')}</span>${tkInput('tv-t', '12:30–14:00')}</label>
      <label class="field"><span>${t('tkEnergy')}</span><select data-act="tksel" data-v="tv-e">${[1, 2, 3].map(n => `<option value="${n}"${n === e ? ' selected' : ''}>${esc(L(DATA.energy[n]))}</option>`).join('')}</select></label>
    </form><div class="tk-preview"><p class="small">${t('tkPreview')}</p>${card}</div></div>
    <div class="print-only"><div class="tk-printgrid">${card}${card}${card}${card}</div></div>`);
  }
  if (s.id === 'roller') {
    const n = +tkv('rl-n', 3);
    const kinds = ['tkFunc', 'tkSocial', 'tkEmo', 'tkIdeo', 'tkBody'];
    return sheetShell(s, `<p>${t('tkRolesIntro')}</p>
      <ul class="tk-kinds">${kinds.map(k => `<li>${t(k)}</li>`).join('')}</ul>
      <table class="tk-table"><thead><tr><th>${t('role')}</th><th>${t('tkWhoTakes')}</th><th>${t('tkTemporary')}</th><th>${t('tkSaidAloud')}</th></tr></thead><tbody>
      ${Array.from({ length: n }, (_, i) => `<tr><td>${tkInput('rl-r' + i, i === 0 ? t('tkRoleEx2') : '')}</td><td>${tkInput('rl-w' + i, '')}</td>
        <td><input type="checkbox" data-act="tkchk" data-v="rl-t${i}"${tkv('rl-t' + i, false) ? ' checked' : ''} aria-label="${t('tkTemporary')}"></td><td><input type="checkbox" data-act="tkchk" data-v="rl-s${i}"${tkv('rl-s' + i, false) ? ' checked' : ''} aria-label="${t('tkSaidAloud')}"></td></tr>`).join('')}
      </tbody></table><p><button class="btn btn-small" data-act="tkadd" data-v="rl-n">${t('tkAddRow')}</button></p>
      ${tkTips(['Deep Democracy (Arnold Mindell)', 'Sociocracy 3.0', t('tkTipTavla')])}`);
  }
  if (s.id === 'trapp') {
    const now = +tkv('tr-now', 2), goal = +tkv('tr-goal', 4);
    const step = (v, i) => `<li class="${i + 1 === now ? 'now' : ''}${i + 1 === goal ? ' goal' : ''}" style="--h:${30 + i * 18}px"><span class="bar"></span><span>${esc(L(v))}</span>${i + 1 === now ? `<em>${t('tkNow')}</em>` : ''}${i + 1 === goal ? `<em class="g">${t('tkGoal')}</em>` : ''}</li>`;
    return sheetShell(s, `<ol class="tk-stairs">${DATA.tkSteps.map(step).join('')}</ol>
      <label class="field"><span>${t('tkNow')}: <strong data-bind="tr-now-l">${esc(L(DATA.tkSteps[now - 1]))}</strong></span><input type="range" min="1" max="5" value="${now}" data-act="tkrange" data-v="tr-now"></label>
      <label class="field"><span>${t('tkGoal')}: <strong data-bind="tr-goal-l">${esc(L(DATA.tkSteps[goal - 1]))}</strong></span><input type="range" min="1" max="5" value="${goal}" data-act="tkrange" data-v="tr-goal"></label>
      <label class="field"><span>${t('tkNextStep')}</span><textarea class="tk-in" rows="3" data-act="tkf" data-v="tr-next" placeholder="${esc(t('tkNextStepPh'))}">${esc(tkv('tr-next', ''))}</textarea></label>
      ${tkTips([t('tkTipPass'), t('tkTipDiy'), 'Park Poétik']) }`);
  }
  if (s.id === 'omsorg') {
    const done = DATA.tkCare.filter((_, i) => tkv('om' + i, false)).length;
    return sheetShell(s, `<p class="tk-score"><strong>${done} / ${DATA.tkCare.length}</strong> ${t('tkInPlace')}</p>
      <ul class="checklist">${DATA.tkCare.map((c, i) => `<li><label><input type="checkbox" data-act="tkchk" data-v="om${i}"${tkv('om' + i, false) ? ' checked' : ''}> ${esc(L(c))}</label></li>`).join('')}</ul>
      <label class="field"><span>${t('tkNeed')}</span><textarea class="tk-in" rows="3" data-act="tkf" data-v="om-need">${esc(tkv('om-need', ''))}</textarea></label>
      ${tkTips(['Safe ’n Sound', t('tkTipChecklist'), t('tkTipOmsorg')])}`);
  }
  if (s.id === 'rytme') {
    const months = DATA.tkMonths[STATE.lang === 'nb' ? 'nb' : 'en'];
    const sel = tkv('ry-m', [0, 2, 4, 6, 9, 11]);
    const R = 120, C = 150;
    const wheel = `<svg viewBox="0 0 300 300" class="tk-wheel" aria-hidden="true">${months.map((m, i) => { const a = (i / 12) * 2 * Math.PI - Math.PI / 2 - Math.PI / 12, b = a + 2 * Math.PI / 12, on = sel.includes(i);
      const p = (r, x) => `${C + r * Math.cos(x)},${C + r * Math.sin(x)}`, mid = a + Math.PI / 12;
      return `<path d="M${p(60, a)} L${p(R, a)} A${R},${R} 0 0 1 ${p(R, b)} L${p(60, b)} A60,60 0 0 0 ${p(60, a)}Z" fill="${on ? RAINBOW12[i] : '#F3EEEA'}" stroke="#fff" stroke-width="2"/><text x="${C + 90 * Math.cos(mid)}" y="${C + 90 * Math.sin(mid) + 4}" text-anchor="middle">${m}</text>`; }).join('')}<circle cx="150" cy="150" r="56" fill="#fff"/><text x="150" y="146" text-anchor="middle" class="big">${sel.length}</text><text x="150" y="166" text-anchor="middle">${t('tkMeetings')}</text></svg>`;
    return sheetShell(s, `<div class="tk-two"><div>${wheel}</div><div>
      <p>${t('tkRhythmIntro')}</p><div class="chips">${months.map((m, i) => `<button data-act="tkmonth" data-v="${i}" aria-pressed="${sel.includes(i)}">${m}</button>`).join('')}</div>
      <label class="field"><span>${t('tkWhoLeads')}</span>${tkInput('ry-who', '')}</label>
      <label class="field"><span>${t('tkReflect')}</span>${tkInput('ry-ref', t('tkReflectPh'))}</label></div></div>
      ${tkTips([t('tkTipWheel'), 'Burning Man / Nowhere', t('tkTipDigital')])}`);
  }
  if (s.id === 'los') {
    return sheetShell(s, `<ul class="checklist">${DATA.tkLos.map((c, i) => `<li><label><input type="checkbox" data-act="tkchk" data-v="lo${i}"${tkv('lo' + i, false) ? ' checked' : ''}> ${esc(L(c))}</label></li>`).join('')}</ul>
      <p><a class="more" href="#/handbok/los">${t('tkReadHb')}</a></p>`);
  }
  return '';
}
const tkTips = list => `<section class="tk-tips"><h2>${t('tkTips')}</h2><ul>${list.map(x => `<li>${esc(x)}</li>`).join('')}</ul></section>`;

/* Hendelser for verktøykassa */
Object.assign(window.TK_ACTIONS = {}, {
  tkfor(v) { STATE.tkFor = v; },
  tkadd(v) { STATE.tk = STATE.tk || {}; STATE.tk[v] = tkv(v, 3) + 1; },
  tkmonth(v) { STATE.tk = STATE.tk || {}; const s = tkv('ry-m', [0, 2, 4, 6, 9, 11]).slice(); const i = s.indexOf(+v); i < 0 ? s.push(+v) : s.splice(i, 1); STATE.tk['ry-m'] = s; }
});
document.addEventListener('input', e => {
  const el = e.target, a = el.dataset && el.dataset.act;
  if (a !== 'tkf' && a !== 'tkrange') return;
  STATE.tk = STATE.tk || {};
  const k = el.dataset.v;
  if (a === 'tkrange') { STATE.tk[k] = +el.value; const lab = document.querySelector(`[data-bind="${k}-l"]`); if (lab) lab.textContent = L(DATA.tkSteps[+el.value - 1]); }
  else { STATE.tk[k] = el.value; document.querySelectorAll(`[data-bind="${k}"]`).forEach(n => { n.textContent = el.value; }); }
  saveState();
});
document.addEventListener('change', e => {
  const el = e.target, a = el.dataset && el.dataset.act;
  if (a === 'tkrange') { render(true); return; }
  if (a !== 'tkchk' && a !== 'tksel') return;
  STATE.tk = STATE.tk || {};
  STATE.tk[el.dataset.v] = a === 'tkchk' ? el.checked : (el.dataset.v === 'tv-e' ? +el.value : el.value);
  saveState(); render(true);
});

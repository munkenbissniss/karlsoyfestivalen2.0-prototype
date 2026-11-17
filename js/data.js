/* Karlsøyfestivalen – prototype. All data ligger her, ett sted.
   Kilder: Programhefte 2026, Håndboka v9.1, karlsoyfestivalen.no, Hypa Poiesis-spesifikasjonen.
   Personer på innsiden, Tavla-kort, samreise og statuser er eksempeldata. */

const DATA = {};

/* ---------- Årgang: faste fakta som settes inn i tekst ---------- */
DATA.edition = {
  year: 2026,
  from: '2026-08-04',
  to: '2026-08-09',
  next: { from: '2027-07-27', to: '2027-08-01' },
  price: 600,
  freeUnder: 18,
  breakfast: '11:00',
  dinner: '18:00',
  dinnerWeekend: '17:00',
  movement: '10:00',
  kidsMeal: '14:00',
  openCallDeadline: '31. mars',
  email: 'deltakere@karlsoyfestivalen.no'
};

/* ---------- Programkategorier (felles liste) ---------- */
DATA.cats = {
  musikk:   { c: '#F0604C', nb: 'Musikk', en: 'Music', fr: 'Musique', nl: 'Muziek' },
  kunst:    { c: '#F04DAF', nb: 'Kunst og teater', en: 'Art and theatre', fr: 'Art et théâtre', nl: 'Kunst en theater' },
  politikk: { c: '#C49BEB', nb: 'Politikk', en: 'Politics', fr: 'Politique', nl: 'Politiek' },
  workshop: { c: '#4DF0A0', nb: 'Workshops og annet', en: 'Workshops and more', fr: 'Ateliers et autres', nl: 'Workshops en meer' },
  barn:     { c: '#F7C531', nb: 'Barn og ungdom', en: 'Children and youth', fr: 'Enfants et jeunes', nl: 'Kinderen en jongeren' },
  maltid:   { c: '#F5932E', nb: 'Felles måltider', en: 'Shared meals', fr: 'Repas communs', nl: 'Gezamenlijke maaltijden' },
  arbeid:   { c: '#BDB2AA', nb: 'Felles arbeid', en: 'Shared work', fr: 'Travail commun', nl: 'Gezamenlijk werk' },
  blandet:  { c: '#4DE4F0', nb: 'Blandet arrangement', en: 'Mixed event', fr: 'Événement mixte', nl: 'Gemengd evenement' }
};

/* ---------- Steder (felles liste) ---------- */
DATA.venues = {
  stor:   { n: 'Storscenen', d: 'Hovedscenen på festivalplassen. Kveldskonsertene fredag og lørdag.' },
  lille:  { n: 'Lillescenen', d: 'Mindre scene for konserter, samtaler og broderi.' },
  zap:    { n: 'Festivalhuset / Zapatista bar', d: 'Blackbox-scene, bar, kjøkken og mediahub. Åpent nett i og rundt huset.' },
  yurta:  { n: 'Yurta', d: 'Rundt rom for workshops, dans og samtaler.' },
  lavvo:  { n: 'Storlavvoen', d: 'Konserter rundt bålet.' },
  hagen:  { n: 'Hagen', d: 'Felleshagen. Verksteder med ull, brennesle og jord.' },
  plass:  { n: 'Plassen', d: 'Festivalplassen. Morgenbevegelse, fellesmåltider og jam.' },
  kirka:  { n: 'Kirka', d: 'Karlsøy kirke. Korøvelser med Peacechoir.' },
  galsa:  { n: 'Galleri GÁLSÁ', d: 'Galleri i butikken på øya.' },
  garasj: { n: 'Galleri Garasjen', d: 'Galleri med åpning torsdag kveld.' },
  natur:  { n: 'Natur', d: 'Oppmøte på festivalplassen. Turer, fiske, skogfilosofi og etterfest i Sandvika.' },
  barneo: { n: 'Barneområdet', d: 'Barnelavvo, bålmat og steinhugging.' },
  kjokk:  { n: 'Kjøkkenet', d: 'Festivalkjøkkenet i festivalhuset.' },
  hub:    { n: 'Deltakerhuben', d: 'Ved inngangen. Tavla, spørsmål og svar, kaffe og dagens omsorgskontakt.' }
};

/* ---------- Dag-til-dag-program 2026 ----------
   [dag 0–5 (tir–søn), start, slutt, tittel, sted, kategori, bidragsyter-id] */
DATA.program = [
  [0,'11:00','12:00','Frokost med allmøte','zap','maltid'],
  [0,'12:30','18:00','Praktisk arbeid','plass','arbeid'],
  [0,'15:30','16:15','Tryggere sted / Modigere sted','zap','workshop'],
  [0,'19:00','00:00','Festivalåpning','zap','blandet'],

  [1,'09:30','11:00','Morgentur','natur','workshop'],
  [1,'11:00','12:00','Frokost med allmøte','plass','maltid'],
  [1,'12:30','13:45','Peacepainting','zap','workshop','peacepainting'],
  [1,'12:30','14:00','Kreativt urverksted for barn','yurta','barn'],
  [1,'12:30','14:00','Ull og rytmeegg','hagen','workshop'],
  [1,'13:00','14:00','Meg og kammeraten min','lille','musikk','hagfors'],
  [1,'13:00','17:00','Small landscapes from Karlsøya','natur','workshop'],
  [1,'14:00','15:30','Steinhuggerverksted','barneo','barn'],
  [1,'14:00','15:15','Migration in Transition','zap','workshop'],
  [1,'14:15','15:15','Puste med jorda','yurta','workshop'],
  [1,'15:00','16:30','Embroidery','lille','politikk'],
  [1,'15:00','16:30','Fra brennesle til rep','hagen','workshop'],
  [1,'16:00','17:30','JORD','yurta','workshop'],
  [1,'16:30','17:45','Peacechoir','kirka','workshop','peacechoir'],
  [1,'17:00','18:00','Pleasure is the measure','zap','workshop'],
  [1,'19:30','20:30','Bjørn Tomren','zap','musikk','tomren'],
  [1,'20:00','22:00','Møljekos (cuddle space)','yurta','workshop'],
  [1,'20:40','21:30','home . between the lines – akustisk konsert','zap','musikk','antrushin'],
  [1,'21:30','00:00','Åpen scene','zap','workshop'],
  [1,'22:30','00:30','Ekstatisk dans med DJ Krux','yurta','workshop','krux'],

  [2,'09:30','11:00','Morgentur','natur','workshop'],
  [2,'11:00','12:00','Frokost med allmøte','zap','maltid'],
  [2,'12:30','14:00','Ull og rytmeegg','hagen','workshop'],
  [2,'12:30','13:45','Peacepainting','zap','workshop','peacepainting'],
  [2,'12:30','14:00','Kreativt urverksted for barn','yurta','barn'],
  [2,'13:00','15:00','Embroidery','lille','politikk'],
  [2,'14:00','15:30','Steinhuggerverksted','barneo','barn'],
  [2,'14:30','15:30','Robin in the Hood – kortfilm og musikal','zap','kunst','slave'],
  [2,'15:00','17:00','5Rytmer – Den soniske kroppen','yurta','workshop'],
  [2,'15:00','16:30','Fra brennesle til rep','hagen','workshop'],
  [2,'15:00','17:00','Skogfilosofi: Villnis og uorden','natur','workshop'],
  [2,'16:00','18:00','Agroøkologi og antimilitarisme','zap','workshop'],
  [2,'16:30','17:45','Peacechoir','kirka','workshop','peacechoir'],
  [2,'18:00','20:00','Åpning Galleri GÁLSÁ','galsa','kunst','blix'],
  [2,'19:00','21:00','Between Here and There – Ahmed Tobasi','yurta','workshop','tobasi'],
  [2,'20:00','00:00','Galleriåpning','garasj','blandet'],
  [2,'22:00','01:00','DJ Krux','zap','musikk','krux'],
  [2,'00:00','01:30','Hyperboreans','lille','musikk','hyperboreans'],

  [3,'09:30','11:00','Morgentur','natur','workshop'],
  [3,'11:00','12:00','Frokost med allmøte','zap','maltid'],
  [3,'12:30','13:45','Peacepainting','zap','workshop','peacepainting'],
  [3,'12:30','14:00','Kreativt urverksted for barn','yurta','barn'],
  [3,'13:00','15:00','Embroidery','lille','politikk'],
  [3,'14:15','15:15','Puste med jorda','yurta','workshop'],
  [3,'14:30','15:15','Datakollektivet','zap','politikk'],
  [3,'15:45','16:45','JORD','yurta','workshop'],
  [3,'16:00','17:00','Art, Technology, and Palestinian Stories','zap','politikk','tobasi'],
  [3,'16:30','17:45','Peacechoir','kirka','workshop','peacechoir'],
  [3,'18:00','19:15','New anarchism','zap','politikk'],
  [3,'18:45','19:45','Spiritchaser / CrotonicX','yurta','kunst'],
  [3,'20:00','20:45','The Musical Slave','lavvo','musikk','slave'],
  [3,'21:00','21:30','Tante Hjørdis','lille','musikk','hjordis'],
  [3,'21:45','22:15','Loke og Elle','lille','musikk','loke'],
  [3,'22:30','23:00','Penenglan','lille','musikk','penenglan'],
  [3,'23:15','23:45','Bens Bluesband','lille','musikk','bens'],
  [3,'00:00','00:50','Ella Marie','stor','musikk','ellamarie'],
  [3,'01:00','02:00','SOS / DJ Dabaka','stor','musikk','dabaka'],

  [4,'09:30','11:00','Morgentur','natur','workshop'],
  [4,'11:00','12:00','Frokost med allmøte','zap','maltid'],
  [4,'12:00','13:30','Global Sumud Flotilla','zap','workshop'],
  [4,'16:00','17:30','Urfolks rettigheter. Maya- og samisk motstand','zap','politikk','ellamarie'],
  [4,'17:00','17:30','Kreativt urverksted for barn – visning','yurta','barn'],
  [4,'17:30','18:45','Akustisk jam','plass','workshop'],
  [4,'18:45','19:15','Peacechoir – konsert','stor','musikk','peacechoir'],
  [4,'19:15','19:30','Aerial Silks med Erika Elida','stor','kunst'],
  [4,'19:30','20:00','«Manufacture» – Aerial Hoop','stor','kunst'],
  [4,'20:15','21:00','Puentes','stor','musikk','puentes'],
  [4,'21:30','22:15','Kajsa Balto','stor','musikk','balto'],
  [4,'22:45','23:30','Karlsøy Prestegaard','stor','musikk','prestegaard'],
  [4,'03:00','10:00','Subsonisk Samband','natur','musikk','subsonisk'],

  [5,'','','Opprydding og nedrigg','plass','arbeid'],
  [5,'','','Takk for i år og restefest','stor','maltid'],
  [5,'11:00','12:00','Frokost med allmøte','plass','maltid'],
  [5,'13:00','14:30','Sløyd, salong og søndagstur','natur','kunst']
].map((r, i) => ({ id: 'p' + i, day: r[0], start: r[1], end: r[2], title: r[3], venue: r[4], cat: r[5], who: r[6] || null }));

/* Hver dag */
DATA.daily = [
  ['','','Fiske på Karlsøya','natur','workshop'],
  ['','','Renhold, rydding og miljø','zap','arbeid'],
  ['','','Kjøkken og matlaging','kjokk','arbeid'],
  ['','','Salg av mat og drikke','kjokk','arbeid'],
  ['','','Slackline Corner','plass','workshop'],
  ['09:00','13:00','Lage frokost','kjokk','arbeid'],
  ['10:00','11:00','Bevegelse','plass','workshop'],
  ['12:00','12:15','Møte om praktisk arbeid','stor','arbeid'],
  ['12:00','12:30','Barnemat','barneo','barn'],
  ['18:00','19:00','Fellesmiddag (fredag og lørdag 17:00)','plass','maltid'],
  ['18:00','18:30','Kjøkkenmøte','kjokk','arbeid']
].map(r => ({ start: r[0], end: r[1], title: r[2], venue: r[3], cat: r[4] }));

/* ---------- Bidragsytere (offentlige profiler, kort omtale) ---------- */
DATA.people = {
  balto: { n: 'Kajsa Balto', k: 'musikk', b: 'Samisk artist som fornyer joiketradisjonen med pop og verdensmusikk. Kom med trio til Storscenen lørdag.' },
  hagfors: { n: 'Martin Hagfors', k: 'musikk', b: 'Låtskriver og liveartist med gitar, munnspill og historier. Spilte også som Meg og kammeraten min.' },
  tomren: { n: 'Bjørn Tomren', k: 'musikk', b: 'Musiker som spenner fra americana og folketoner til jodling og strupesang.' },
  ellamarie: { n: 'Ella Marie', k: 'musikk', b: 'Artist og tydelig stemme for samiske rettigheter og naturvern. Deltok i samtale om urfolks rettigheter før konserten.' },
  puentes: { n: 'Puentes', k: 'musikk', b: 'Ensemble som bygger broer mellom flamenco, arabisk musikk, jazz og folkemusikk.' },
  prestegaard: { n: 'Karlsøy Prestegaard', k: 'musikk', b: 'Øyas eget punk-prog-rockeband og en festivalinstitusjon.' },
  harbak: { n: 'Trine Harbak', k: 'musikk', b: 'Visesanger fra Trøndelag med nære, samfunnskritiske viser.' },
  penenglan: { n: 'Penenglan', k: 'musikk', b: 'Samisk band som tar tilbake språk og identitet etter fornorskningen.' },
  loke: { n: 'Loke og Elle', k: 'musikk', b: 'Gamle venner av festivalen med egenkomponert sang, rap og joik.' },
  slave: { n: 'The Musical Slave', k: 'musikk', b: 'Kristin Vollset: musiker, historieforteller og filmskaper. Konsert i lavvoen og filmen Robin in the Hood.' },
  subsonisk: { n: 'Subsonisk Samband', k: 'musikk', b: 'Soundsystem-kollektiv fra Tromsø med håndbygd lydanlegg. Etterfest i Sandvika.' },
  krux: { n: 'DJ Krux', k: 'musikk', b: 'Initiativtaker til Lavvo Land. DJ-sett som lydreiser og workshop i ekstatisk dans.' },
  hyperboreans: { n: 'Hyperboreans', k: 'musikk', b: 'Elias Dass og Andvari med psykedeliske lydlandskap og dype grooves.' },
  hjordis: { n: 'Tante Hjørdis', k: 'musikk', b: 'Kampsanger i vise- og metallsjanger.' },
  bens: { n: 'Bens Bluesband', k: 'musikk', b: 'Øyas bluesband.' },
  dabaka: { n: 'DJ Dabaka', k: 'musikk', b: 'Tunge trommer og dyp bass. Motkraft i klubbformat.' },
  antrushin: { n: 'Andrei Antrushin', k: 'musikk', b: 'Musiker og kunstner fra Arkhangelsk med lang tilknytning til Karlsøya. Prosjektet home . between the lines.' },
  peacechoir: { n: 'Karlsøy Peacechoir', k: 'musikk', b: 'Koret vi lager sammen under festivalen. Ingen forkunnskaper trengs. Støttet av Frifond.' },
  blix: { n: 'Elind Rui Blix', k: 'kunst', b: 'Maler. Utstillingen Understrøm ble til under tre ukers kunstneropphold på øya.' },
  tobasi: { n: 'Ahmed Tobasi', k: 'kunst', b: 'Teaterkunstner fra Sharara Theatre i Tulkarem på Vestbredden i Palestina. Workshopen Between Here and There.' },
  peacepainting: { n: 'Peacepainting', k: 'workshop', b: 'Ideell organisasjon som bruker kunst som verktøy for likeverd og fred.' }
};

/* ---------- Innhold fra festivalen ----------
   Enkeltstykker som lages før, under og etter festivalen: tekst, bilder, video, lyd, avisoppslag.
   (I Hypa Poiesis heter dette «verk».) Hvert stykke kan kobles til en bidragsyter og en programpost. */
const pid = (day, title) => DATA.program.find(p => p.day === day && p.title.startsWith(title)).id;

DATA.items = [
  { id: 'urfolk-video', type: 'video', title: 'Opptak: Urfolks rettigheter. Maya- og samisk motstand', who: 'ellamarie', date: '08.08.26', lic: 'CC BY-NC-ND', img: 'gruppemoter', mock: true, post: pid(4, 'Urfolks rettigheter'),
    body: ['Samtalen ble strømmet fra Zapatista bar og ligger her som opptak. Eksempel: det finnes ikke noe ekte opptak i prototypen.'] },
  { id: 'urfolk-presse', type: 'presse', title: 'Avisoppslag: Urfolkskamp på tvers av kontinenter', by: 'Lokalavisa', date: '12.08.26', lic: 'Lenke til avisa', img: 'plassen', mock: true, post: pid(4, 'Urfolks rettigheter'),
    body: ['Noen dager etter festivalen skriver lokalavisa om samtalen. Oppslaget legges inn som lenke med ingress, og havner i samme forløp som samtalen og opptaket. Eksempel.'] },
  { id: 'kor-lyd', type: 'lyd', title: 'Lydopptak: Peacechoir på Storscenen', who: 'peacechoir', date: '08.08.26', lic: 'CC BY-NC', img: 'storscenen', mock: true, post: pid(4, 'Peacechoir – konsert'),
    body: ['Koret øvde tre ettermiddager i kirka og sang på Storscenen lørdag. Eksempel på et lydopptak. Lyd er nyttig på svakt nett.'] },
  { id: 'bilder26', type: 'bilder', title: 'Bilder fra festivalen', by: 'Karlsøyfestivalen', date: '2026', lic: 'Lisens ikke satt', img: 'i-ring',
    gallery: ['i-ring', 'storscenen', 'plassen', 'mat', 'gruppemoter', 'nedrigg', 'villsau', 'hb-langbord', 'hb-tommerstokk'],
    body: ['Bildene er hentet fra dagens nettside. Fotograf og lisens mangler på alle. I den nye løsningen er begge deler obligatoriske felt.'] },
  { id: 'omsorg', type: 'artikkel', title: 'Å ta vare på hverandre', by: 'Karlsøyfestivalen', date: '2026', lic: 'CC BY-NC-ND', img: 'hb-telt',
    body: ['Nytt i 2026: trygt rom-workshop i starten av festivalen, en hvilerom-lavvo ved felleshagen, omsorgsverter og et daglig omsorgs- og trygghetsteam.',
      'Dagens kontaktpersoner blir slått opp i Deltakerhuben. I den nye løsningen vises de også på forsiden din når du er logget inn.'] },
  { id: 'deltaker', type: 'artikkel', title: 'Slik fungerer deltakerfestivalen', by: 'Karlsøyfestivalen', date: '2026', lic: 'CC BY-NC-ND', img: 'gruppemoter',
    body: ['Alle voksne bidrar med {price} kroner til felleskassa. Det er gratis for alle under {freeUnder} år.',
      'Det finnes ingen tydelig grense mellom deltaker, frivillig og arrangør. Du kan bli med i en festivalgruppe, eller plukke et kort fra Tavla ved Deltakerhuben når du har tid og energi.',
      'Felles frokost er kl. {breakfast} og fellesmiddag kl. {dinner}. Hver dag starter med felles bevegelse kl. {movement}.'] },
  { id: 'historie', type: 'artikkel', title: 'Fra protestfestival til levende fellesskap', by: 'Karlsøyfestivalen', date: '2026', lic: 'CC BY-NC-ND', img: 'plassen',
    body: ['Fra 1970-tallet ble Karlsøya et hjem for unge kunstnere, aktivister og folk som lette etter andre måter å leve på.',
      'Festivalen startet i 2000 og førte tradisjonen videre som en protestfestival mot rasisme, miljøødeleggelser, kolonialisme og profittlogikk.',
      'I dag er den et helårlig nettverk. Festivalen har bevisst blitt mindre: fra over tusen besøkende til en samling på noen hundre som skaper opplevelsen sammen.'] },
  { id: 'manifest', type: 'tekst', title: 'Karlsøyfestivalens manifest', by: 'Karlsøyfestivalen', date: '2000', lic: 'CC BY-NC-ND', img: 'i-ring',
    body: ['Karlsøyfestivalen er ei markering av motstand mot et samfunn der de viktigste verdiene er lønnsomhet, konkurranse og grådighet. Den er en protest mot raseringen av distriktene, miljøødeleggelsene, rasisme og diskriminering. Den protesterer mot kolonialismen, utbyttinga og den brutale undertrykkinga av verdens folk.',
      'Karlsøyfestivalen er en fest for og ei feiring av alle positive motkrefter! Den skal gjenspeile, gjenskape og fremme alle de alternative kreftene som kjemper for en annen og bedre verden preget av solidaritet, medfølelse og kjærlighet!'] }
];
DATA.itemTypes = {
  artikkel: { nb: 'Artikkel', en: 'Article', fr: 'Article', nl: 'Artikel' },
  tekst: { nb: 'Tekst', en: 'Text', fr: 'Texte', nl: 'Tekst' },
  bilder: { nb: 'Bilder', en: 'Photos', fr: 'Photos', nl: 'Foto’s' },
  video: { nb: 'Video', en: 'Video', fr: 'Vidéo', nl: 'Video' },
  lyd: { nb: 'Lyd', en: 'Audio', fr: 'Audio', nl: 'Audio' },
  presse: { nb: 'Avisoppslag', en: 'Press', fr: 'Presse', nl: 'Pers' }
};

/* ---------- Forløp og samlinger ----------
   Kobler ting som hører sammen, slik at de kan oppleves som noe som skjer over tid.
   (I Hypa Poiesis heter dette «dialoger».) Et ledd er en programpost, et stykke innhold eller en kort merknad. */
DATA.threads = [
  { id: 'urfolk', kind: 'forlop', title: 'Urfolks rettigheter: fra samtale til avisoppslag', img: 'gruppemoter',
    lead: 'En samtale i Zapatista bar ble til strøm, opptak, konsert og omtale. Slik kan et foredrag følges fra kunngjøring til etterspill.',
    steps: [
      { when: '1. mai', t: 'Kunngjort i programslippet', note: 'Samtalen om samiske rettigheter, ressurskamp og rettferdighet presenteres sammen med konserten.' },
      { post: pid(3, 'Ella Marie') },
      { post: pid(4, 'Urfolks rettigheter'), note: 'Strømmet direkte.' },
      { item: 'urfolk-video' },
      { when: 'Søndag 9. august', t: 'Paneldebatt i etterkant', note: 'En oppfølgende samtale kan legges til som eget ledd.', ex: true },
      { item: 'urfolk-presse' }
    ] },
  { id: 'peacechoir', kind: 'forlop', title: 'Fredskoret: øvelser, popup-konserter og konsert', img: 'storscenen',
    lead: 'Fredskoret (Peacechoir) er koret vi lager sammen: tre ettermiddager med øvelse i kirka, popup-konserter rundt på øya, repertoaret, og til slutt Storscenen.',
    steps: [
      { post: pid(1, 'Peacechoir') }, { post: pid(2, 'Peacechoir') }, { post: pid(3, 'Peacechoir') },
      { when: 'Underveis', t: 'Popup-konserter rundt på øya', note: 'Koret dukker opp der folk er, og øver repertoaret foran publikum.', ex: true },
      { when: 'Repertoar', t: 'Sangene, tekstene og notene', note: 'Legges ut som verk med lisens, så andre kor kan bruke dem.', ex: true },
      { post: pid(4, 'Peacechoir – konsert') }, { item: 'kor-lyd' }
    ] },
  { id: 'urverksted', kind: 'forlop', title: 'Kreativt urverksted for barn: fra verksted til visning', img: 'hb-drage',
    lead: 'Tre dager med verksted i yurta, og visning for alle lørdag.',
    steps: [
      { post: pid(1, 'Kreativt urverksted') }, { post: pid(2, 'Kreativt urverksted') }, { post: pid(3, 'Kreativt urverksted') },
      { post: pid(4, 'Kreativt urverksted') }
    ] },
  { id: 'understrom', kind: 'forlop', title: 'Understrøm: fra kunstneropphold til åpning', img: 'villsau',
    lead: 'Elind Rui Blix malte i samspill med øyas lys, vær og landskap.',
    steps: [
      { when: 'Juli', t: 'Tre ukers kunstneropphold på Karlsøya', note: 'Maleriene blir til på øya.' },
      { post: pid(2, 'Åpning Galleri GÁLSÁ') },
      { when: 'Etter festivalen', t: 'Bilder av utstillingen', note: 'Foto av kunst legges ut fortløpende, med fotograf og lisens.', ex: true }
    ] },
  { id: 'tidslinje', kind: 'tema', title: 'Karlsøya fra 1970-tallet til i dag', img: 'plassen',
    lead: 'Fra motkultur til deltakerfestival.',
    steps: [
      { when: '1970-tallet', t: 'Kunstnere, aktivister og idealister flytter til Karlsøya', note: 'De bygger et samfunn som utfordrer etablerte forestillinger.' },
      { when: '2000', t: 'Den første Karlsøyfestivalen', note: 'Manifestet skrives.' }, { item: 'manifest' },
      { when: '2018', t: 'Den gamle prestegården går tapt i brann' },
      { when: '2020', t: 'Festivalen holdes digitalt' },
      { when: '2024', t: '25 år, og håndboka kommer i versjon 9.1' },
      { when: '2026', t: 'Deltakerhuben, Tavla og nye omsorgsstrukturer' }, { item: 'omsorg' },
      { when: '2027', t: 'Neste festival: 27. juli til 1. august' }
    ] },
  { id: 'opencall', kind: 'tema', title: 'Fra åpen utlysning til scene', img: 'nedrigg',
    lead: 'Slik blir programmet til, år etter år.',
    steps: [
      { when: 'Desember–januar', t: 'Open call skrives og slippes', note: 'Senest 15. januar.' },
      { when: '31. mars', t: 'Søknadsfrist' },
      { when: '1.–15. april', t: 'Vårmøtet velger ut og svarer alle', note: 'Teknisk og innkvartering avklares.' },
      { when: '15. april', t: 'Alt program er booket' },
      { when: '1. mai', t: 'Programslipp og plakat' },
      { when: 'Festivaluka', t: 'Alle på programmet møter i gruppa Program og teknikk hver dag' }
    ] },
  { id: 'tobasi-tulkarem', kind: 'tema', title: 'Tobasi på Karlsøyfestivalen', img: 'gruppemoter',
    lead: 'En rød tråd over flere år: Ahmed Tobasis prosjekter på Karlsøya og historien om teateret i Tulkarem på Vestbredden i Palestina.',
    steps: [
      { when: 'Tidligere år', t: 'Tobasis prosjekter på Karlsøyfestivalen', note: 'Hentes fra festivalarkivet: program, bilder og omtale.', ex: true },
      { when: 'Tulkarem', t: 'Historien om teateret', note: 'Tekst, bilder og opptak om teateret i Tulkarem på Vestbredden i Palestina, med kreditering og lisens.', ex: true },
      { post: pid(2, 'Between Here and There') },
      { when: 'Neste år', t: 'Tråden fortsetter', note: 'Nye programposter og verk legges til temaet når de kommer.', ex: true }
    ] },
  { id: 'kom-i-gang', kind: 'tema', title: 'Ny på Karlsøyfestivalen?', img: 'i-ring',
    lead: 'Tre ting å lese før du kommer.',
    steps: [{ item: 'deltaker' }, { item: 'omsorg' }, { item: 'historie' }] }
];

/* ---------- Grupper (fra håndboka) ---------- */
DATA.groups = {
  styret:   { c: '#4DF068', n: 'Styret og økonomi', kind: 'organ', d: 'Økonomisk, juridisk og administrativt ansvarlig. Velges av årsmøtet.',
    tasks: ['Regnskap, likviditet og budsjett', 'Betalingsterminaler og vekslepenger', 'Forsikringer', 'Finne folk til bong-salget'] },
  koord:    { c: '#F5932E', n: 'Koordinatorgruppa', kind: 'organ', d: 'Husker søknader, rapporter og tillatelser, og forbereder de åpne medlemsmøtene siste torsdag hver måned.',
    tasks: ['Søknader og rapportering', 'Formelle tillatelser', 'Innkalle til medlemsmøter, høstmøte, romjulsmøte og vårmøte', 'Ta utgangspunkt i årshjulet på møtene'] },
  program:  { c: '#F7C531', n: 'Program og teknisk', kind: 'forb', d: 'Booker og tilrettelegger for alt innholdet. Undergrupper for booking, kunst, seminar, barn og ungdom og teknisk.',
    tasks: ['Foreslå, kontakte og inngå skriftlige avtaler', 'Booke helhetlig, variert og innenfor manifestet', 'Holde budsjettet satt av årsmøtet', 'Skrive programtekster til markedsføring', 'Lage tidsplan og dag-til-dag-program', 'Bestille lyd, lys og aggregat og kryssjekke mot raidere'] },
  marked:   { c: '#F04DAF', n: 'Markedsføring', kind: 'forb', d: 'Plakat, programhefte, presse, sosiale medier og nettside. Mest å gjøre i forkant.',
    tasks: ['Få noen til å lage plakat ut fra årets tema', 'Design og distribusjon av programhefte', 'Presseskriv og kontakt med journalister', 'Synliggjøre de som har gitt støtte', 'Oppdatere nettsida'] },
  logistikk:{ c: '#BDB2AA', n: 'Logistikk', kind: 'forb', d: 'Buss, ferge og fly. Tilbudet til øya er begrenset, så ekstraturer må avtales i god tid.',
    tasks: ['Be om ekstra fergeanløp fredag, lørdag og søndag', 'Kjøpe ekstra bussturer, særlig søndag', 'Én ansvarlig booker flybilletter', 'Avtale ekstra parkering på Hansnes', 'Transport på øya med bil og traktor'] },
  vertskap: { c: '#C49BEB', n: 'Vertskap og vakt', kind: 'begge', d: 'Tar imot folk, står i porten og på kontoret, planlegger innkvartering og vakthold. Arbeidssentral under festivalen.',
    tasks: ['Lage innkvarteringsliste sammen med bookinggruppa', 'Registrere deltakere og dele ut bånd', 'Infotavler og skilting av vann og do', 'Humørtog for de som jobber mye', 'Vaktliste: som oftest to i hver port', 'Opplæring i skjenkeregler'] },
  kjokken:  { c: '#4DE4F0', n: 'Kjøkken og bar', kind: 'begge', d: 'Lokale råvarer, vegetariske retter og sanking. Frokost og middag til alle, og mat til salg.',
    tasks: ['Planlegge frokost og middag hele uka', 'Bestille varer og sjekke varetellinga først', 'Turnusplan: ikke bruk opp folk, fordel dem utover', 'Ta imot og lære opp nye i gruppa', 'Vaktlister for baren'] },
  praktisk: { c: '#C9E83A', n: 'Vaktmester og praktisk', kind: 'begge', d: 'Ly for folk og utstyr. Presenninger, lavvoer, ved, bålplasser og verktøy.',
    tasks: ['Presenninger på scene og tekniske telt', 'Sette opp barnelavvo', 'Portable verktøykasser', 'Bålplasser, sittegrupper og spiseplasser', 'Sette opp søppelteltet sammen med miljøgruppa'] },
  miljo:    { c: '#4DF0A0', n: 'Miljø og renhold', kind: 'begge', d: 'En grønnere festival for hvert år. Sortering, kompost og en kultur der alle rydder.',
    tasks: ['Plan for sortering: mat, plast, pant, brennbart, rest, metall', 'Sorteringssystem på campen og mot Sandvika', 'Male skilter og lage miljøstasjoner', 'Vaske doer og holde sanitære forhold', 'Retur av søppel og pant'] },
  barn:     { c: '#4DF0D7', n: 'Barn og ungdom', kind: 'gjenn', d: 'Programmet settes opp sammen når festivalen åpner. Varmt måltid over bål hver dag.',
    tasks: ['Lage en helhetlig plan for dagene sammen', 'Sørge for at barn får medvirke', 'Barnemat over bål', 'Kino og popcorn i festivalhuset i helga'] },
  media:    { c: '#F0604C', n: 'Mobilisering og media', kind: 'gjenn', d: 'Ny festivalgruppe i 2026. Står i programheftet, men mangler i håndboka.',
    tasks: ['Beskrivelse mangler i håndboka'] }
};
DATA.festivalGroups = ['kjokken', 'vertskap', 'program', 'barn', 'miljo', 'media', 'praktisk'];
DATA.prepGroups = ['program', 'marked', 'logistikk', 'vertskap', 'kjokken', 'praktisk', 'miljo'];

/* ---------- Frister (årshjulet tegnes fra denne lista) ---------- */
DATA.deadlines = [
  [1, 15, 'program', 'Open call slippes (senest)'],
  [1, 20, 'koord', 'Søknad Sparebank1'],
  [1, 25, 'styret', 'Varsel om årsmøtet sendes ut'],
  [2, 22, 'styret', 'Årsmøtet (siste søndag kl. 12)'],
  [3, 10, 'styret', 'Frist for MVA-regnskap'],
  [3, 15, 'koord', 'Søknad Fritt Ord'],
  [3, 31, 'program', 'Søknadsfrist Open call'],
  [4, 8, 'program', 'Vårmøtet: svar på Open call, teknisk, innkvartering'],
  [4, 8, 'vertskap', 'Innkvarteringsliste lages på vårmøtet'],
  [4, 15, 'program', 'Alt program ferdig booket'],
  [4, 15, 'program', 'Bestille lyd- og lysanlegg (til 1. mai)'],
  [4, 25, 'koord', 'Søknad Karlsøy kommune'],
  [5, 1, 'program', 'Programslipp og plakat ferdig'],
  [5, 1, 'marked', 'Program klart, pressemelding'],
  [5, 10, 'logistikk', 'Ekstraferger, busser og billetter til artister'],
  [5, 12, 'koord', 'Snakke med politiet om arrangementet'],
  [5, 15, 'marked', 'Plakater klare for distribusjon'],
  [5, 20, 'kjokken', 'Menyen påbegynnes'],
  [5, 25, 'koord', 'Søknad Fritt Ord'],
  [6, 1, 'program', 'Tekniske behov klargjort, aggregat bestilt'],
  [6, 10, 'program', 'Program med dag og klokkeslett'],
  [6, 15, 'miljo', 'Bestille pantesekker og søppelcontainer'],
  [6, 20, 'praktisk', 'Liste over arbeidsoppgaver'],
  [7, 1, 'kjokken', 'Bestilling av varer: Asko, Vinmonopolet, øl'],
  [7, 1, 'program', 'Oversikt over teknisk utstyr som må hentes'],
  [7, 10, 'koord', 'Søknad Sametinget'],
  [7, 15, 'program', 'Kryssjekke teknisk levering mot raidere'],
  [8, 20, 'koord', 'Søknad Kulturrådet'],
  [10, 20, 'koord', 'Høstmøtet: evalueringer, visjoner, sluttrapporter'],
  [11, 15, 'koord', 'Søknad Frifond'],
  [12, 10, 'koord', 'Søknad fylket'],
  [12, 15, 'marked', 'Klistremerke-konkurranse'],
  [12, 20, 'vertskap', 'Kartlegging av innkvartering'],
  [12, 28, 'koord', 'Romjulsmøtet: håndbok, årshjul og tema']
].map((r, i) => ({ id: 'd' + i, m: r[0], d: r[1], g: r[2], t: r[3] }));
DATA.monthly = { g: 'koord', t: 'Medlemsmøte på Discord, siste torsdag kl. 19' };

/* ---------- Prinsipper (håndboka) ---------- */
DATA.principles = [
  ['Gjør-det-i-lag', 'Vi jobber i arbeidsgrupper og åpne prosesser, og løser oppgavene sammen.'],
  ['Ansvar', 'Gruppa og hver deltaker tar ansvar for oppgavene gruppa har påtatt seg.'],
  ['Gjør-det-sjøl', 'Har du en idé som ikke krever festivalens ressurser: gjør det. Gruppa har autonomi til å løse oppgavene på sin måte.'],
  ['Konsensus', 'Vi prøver først å bli enige, og leter aktivt etter løsninger som tar hensyn til innvendinger.'],
  ['Demokratisk', 'Mest mulig deltakelse fra flest mulig.'],
  ['I prosess', 'Alt kan endres ut fra hvem som er engasjert. Håndboka er i stadig endring.'],
  ['Mer gøy og mindre stress', 'Vi går etter løsningene som gjør dette mest mulig artig.']
];

/* ---------- FAQ (bruker faste fakta) ---------- */
DATA.faq = [
  ['Hva koster det?', 'Deltakerpasset koster {price} kroner for voksne og gjelder hele festivalen. Barn og ungdom under {freeUnder} år betaler ikke. Det er ingen påmeldingsfrist.'],
  ['Hvorfor betaler alle, også artister og arrangører?', 'Festivalen er et spleiselag. Samme lave pris for alle gir mindre byråkrati og færre kategorier.'],
  ['Hvor mye må jeg bidra?', 'Det er ingen plikt og ingen timetelling. Du bidrar så mye eller lite du ønsker og kan. Viktigst er at det er lystbetont.'],
  ['Hvordan er det med mat?', 'Passet inkluderer enkel felles frokost kl. {breakfast} og middag kl. {dinner} fra tirsdag til lørdag. Fredag og lørdag er middagen kl. {dinnerWeekend}.'],
  ['Kan jeg bytte gruppe?', 'Ja, når som helst. I den nye løsningen gjør du det selv på forsiden din.'],
  ['Hvordan kommer jeg meg dit?', 'Gratis ferge fra Hansnes, 63 kilometer fra Tromsø. Buss 430 går fra Tromsø på hverdager. Se alltid oppdaterte rutetider.'],
  ['Er det tilrettelagt for camping?', 'Det er fri camping i utmarka, en festivalcamp og en rusfri familiecamp. Utedoer er satt ut, også i Sandvika.'],
  ['Kan jeg ta med kjæledyr?', 'Det er båndtvang på øya til 20. august, og vi anbefaler at dyrene blir hjemme.'],
  ['Er det nett?', 'Det er åpent nett i og rundt festivalhuset.']
];

/* ---------- Innsiden: eksempeldata ---------- */
DATA.personas = {
  deltaker: { name: 'Mari', level: 'deltaker', groups: ['kjokken'], role: { nb: 'Deltaker', en: 'Participant', fr: 'Participante', nl: 'Deelnemer' } },
  los:      { name: 'Jonas', level: 'medlem', groups: ['kjokken', 'miljo'], role: { nb: 'Gruppelos, kjøkken og bar', en: 'Group guide, kitchen and bar', fr: 'Guide de groupe, cuisine et bar', nl: 'Groepsloods, keuken en bar' } },
  verv:     { name: 'Aila', level: 'verv', groups: ['program', 'koord'], role: { nb: 'Koordinator, program og teknisk', en: 'Coordinator, programme and tech', fr: 'Coordinatrice, programme et technique', nl: 'Coördinator, programma en techniek' } },
  english:  { name: 'Sam', level: 'medlem', lang: 'en', groups: ['media', 'program'], role: { nb: 'Media (engelsk)', en: 'Media (English)', fr: 'Média (anglais)', nl: 'Media (Engels)' } },
  drift:    { name: 'Sindre', level: 'drift', groups: ['koord'], role: { nb: 'Driftsgruppa', en: 'Operations group', fr: 'Groupe d’exploitation', nl: 'Beheergroep' } }
};

DATA.tavla = [
  { id: 't1', p: 'kritisk', t: 'Vakt i porten 20–22', g: 'vertskap', min: 120, where: 'hub' },
  { id: 't2', p: 'kritisk', t: 'Bære stoler til Zapatista bar før samtalen kl. 16', g: 'program', min: 15, where: 'zap' },
  { id: 't3', p: 'viktig', t: 'Skjære grønnsaker til fellesmiddagen', g: 'kjokken', min: 45, where: 'kjokk' },
  { id: 't4', p: 'viktig', t: 'Vaske doene ved festivalhuset', g: 'miljo', min: 30, where: 'zap' },
  { id: 't5', p: 'viktig', t: 'Hente ved til fellesbålet', g: 'praktisk', min: 30, where: 'plass' },
  { id: 't6', p: 'kjekt', t: 'Male skilt til miljøstasjonen', g: 'miljo', min: 20, where: 'hub' },
  { id: 't7', p: 'kjekt', t: 'Samle pant på plassen', g: 'miljo', min: 5, where: 'plass' },
  { id: 't8', p: 'kjekt', t: 'Humørtog: kaffe til de som rigger', g: 'vertskap', min: 15, where: 'kjokk' }
];

DATA.bidrag = [
  { t: 'Kajsa Balto', k: 'musikk', cp: [1, 1, 1, 1, 1, 0], open: ['Utbetaling'], mine: true },
  { t: 'Puentes', k: 'musikk', cp: [1, 1, 1, 1, 1, 0], open: [], mine: true },
  { t: 'Between Here and There', k: 'workshop', cp: [1, 1, 0, 1, 0, 0], open: ['Kontrakt', 'Overnatting ikke plassert'], mine: true },
  { t: 'Peacechoir – konsert', k: 'musikk', cp: [1, 1, 0, 1, 1, 0], open: ['Teknisk ansvarlig mangler'], mine: false },
  { t: 'Understrøm', k: 'kunst', cp: [1, 1, 1, 0, 0, 0], open: ['Ikke i programmet ennå'], mine: false },
  { t: 'Datakollektivet', k: 'politikk', cp: [1, 1, 1, 1, 1, 1], open: [], mine: false }
];
DATA.checkpoints = ['E-post', 'Bekreftet', 'Kontrakt', 'Program', 'Publisert', 'Utbetalt'];

DATA.rides = [
  { dir: 'til', from: 'Tromsø', when: 'tirsdag 14:00', seats: 2, by: 'Deltaker i kjøkkengruppa' },
  { dir: 'til', from: 'Tromsø lufthavn', when: 'onsdag 15:30', seats: 3, by: 'Deltaker i miljøgruppa' },
  { dir: 'fra', from: 'Hansnes', when: 'søndag etter ferga 15:50', seats: 1, by: 'Deltaker i program og teknikk' },
  { dir: 'trenger', from: 'Tromsø', when: 'torsdag ettermiddag', seats: 2, by: 'To deltakere med barn' }
];

DATA.services = [
  ['Felles innlogging', 'ok'], ['Nettside (Hypa Poiesis)', 'ok'], ['Koordinering', 'ok'], ['Filer og dokumenter', 'ok'],
  ['Kalender', 'ok'], ['E-post', 'warn', 'Flyttes høsten 2027'], ['Nyhetsbrev', 'ok'], ['Strømmetjeneste (PeerTube)', 'ok'],
  ['Backup i natt', 'ok', '02:14, 38 GB'], ['Sist testet gjenoppretting', 'warn', 'For 5 måneder siden']
];

DATA.care = { names: 'Dagens omsorgs- og trygghetsteam', where: 'Deltakerhuben, ved inngangen' };


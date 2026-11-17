/* Karlsøyfestivalen – tilleggsdata for prototypen (utkast 2).
   Kilder: Programhefte 2026, Håndboka v9.1, booklet «A festival as a practice in living together» (mai 2026).
   Eksempeldata er merket i kommentarene. */

/* ---------- Faste fakta: hvor hver verdi er satt ---------- */
DATA.factSource = {
  price: 'Håndboka › Praktisk', freeUnder: 'Håndboka › Praktisk', breakfast: 'Håndboka › Rytmen på festivalen',
  dinner: 'Håndboka › Rytmen på festivalen', dinnerWeekend: 'Håndboka › Rytmen på festivalen', movement: 'Håndboka › Rytmen på festivalen',
  kidsMeal: 'Håndboka › Rytmen på festivalen', openCallDeadline: 'Programpost › Åpen utlysning 2027', email: 'Håndboka › Kontakt'
};

/* ---------- Lengre presentasjoner av bidragsytere (fra programheftet 2026) ---------- */
const MORE = {
  balto: { long: 'Kajsa Balto er en av den nye generasjonen samiske artister som fornyer joiketradisjonen med pop og verdensmusikk. Tekstene handler om språk, identitet, historie og samisk motstand. Til Karlsøyfestivalen kom hun med Kajsa Balto Trio til Storscenen lørdag, med et uttrykk som er forankret i tradisjonen og åpent mot nye landskap.', links: ['Nettside', 'Strømmetjenester'] },
  hagfors: { long: 'Martin Hagfors er låtskriver og liveartist med gitar, munnspill og historier. Siste plate, Folk-A-Dots, ble nominert til Spellemannprisen i kategorien country. På festivalen spilte han også i duoen Meg og kammeraten min på Lillescenen.', links: ['Nettside'] },
  tomren: { long: 'Bjørn Tomren spenner fra americana, folketoner og jazz til jodling, strupesang og psykedelisk protestmusikk. En artist som er vanskelig å sette i bås, og som spilte i Zapatista bar onsdag kveld.', links: ['Nettside'] },
  ellamarie: { long: 'Ella Marie er artist, skuespiller og en av de tydeligste stemmene for samiske rettigheter og naturvern. På Karlsøyfestivalen deltok hun først i en samtale om samiske rettigheter, ressurskamp og rettferdighet, før hun tok med bandet sitt opp på Storscenen.', links: ['Nettside', 'Instagram'] },
  puentes: { long: 'Puentes bygger broer mellom flamenco, arabisk musikk, jazz og folkemusikk. Med Marianne Holmboe i spissen, kjent fra Kofia og fjorårets festival, byr ensemblet på rytmer og tekster på arabisk, svensk og spansk. Musikk både for lytting og dans.', links: ['Nettside'] },
  prestegaard: { long: 'Karlsøy Prestegaard er øyas eget punk-prog-rockeband og en festivalinstitusjon. Albumet Basement Tapes ble spilt inn i kjelleren på den gamle prestegården i 2005, før bygningen gikk tapt i brannen i 2018.', links: [] },
  slave: { long: 'The Musical Slave er Kristin Vollset, musiker, historieforteller og filmskaper fra Bergen. Musikken beveger seg mellom folkrock og tropisk punk. Hun står bak prisbelønte filmer som No Plan og Robin in the Hood, og kom tilbake til favorittarenaen sin: lavvoen rundt leirbålet.', links: ['Nettside', 'Filmene'] },
  peacechoir: { long: 'Karlsøy Peacechoir er koret vi lager sammen på festivalen. Ingen forkunnskaper trengs: kom som du er og finn stemmen din. Vi øver i Karlsøy kirke, og synger på Storscenen lørdag. For voksne, ungdom og barn som kan lese. Støttet av Frifond.', links: [] },
  blix: { long: 'Understrøm er en stedsspesifikk utstilling av Elind Rui Blix, utviklet under tre ukers kunstneropphold på Karlsøya. Maleriene ble til i samspill med øyas lys, vær, hav, mennesker og landskap. Øya er ikke bare motiv, men en medskapende kraft.', links: ['Nettside'] },
  tobasi: { long: 'Between Here and There er en interaktiv teaterworkshop om migrasjon, identitet og tilhørighet. Den ledes av den palestinske teaterregissøren og skuespilleren Ahmed Tobasi fra Sharara Theatre, som bruker sin egen reise som utgangspunkt.', links: ['Sharara Theatre'] },
  krux: { long: 'DJ Krux er initiativtaker til Lavvo Land, en omreisende festival som også besøkte Karlsøya i sommer. Han kom med DJ-sett formet som lydreiser og en workshop i ekstatisk dans, i et trygt rom der musikk, bevegelse og fellesskap står i sentrum.', links: [] },
  subsonisk: { long: 'Subsonisk Samband er et nytt soundsystem-kollektiv fra Tromsø, med røtter i nordnorsk soundsystem-kultur. Karlsøyfestivalen var den første festivalen der det håndbygde anlegget ble tatt skikkelig i bruk, med etterfest i Sandvika.', links: [] },
  dabaka: { long: 'DJ Dabaka er lyden av tunge trommer og dyp bass. Hver drop er en protest mot fascisme, kolonialisme, krig og korrupsjon. Motkraft i klubbformat, ytterst mot havet.', links: [] },
  antrushin: { long: 'Andrei Antrushin er musiker og kunstner fra Arkhangelsk med lang tilknytning til Karlsøya. Prosjektet home . between the lines er en poetisk utforskning av hjem, tilhørighet og øyas landskap gjennom lyd, video og personlige refleksjoner.', links: [] }
};
Object.keys(MORE).forEach(k => Object.assign(DATA.people[k], MORE[k]));

/* ---------- Blogg: «Nytt fra festivalen» (eksempler bygget på ekte stoff) ---------- */
DATA.posts = [
  { id: 'utlysning-2027', date: '2026-09-13', title: 'Åpen utlysning for Karlsøyfestivalen 2027', img: 'hb-utsikt', by: 'Program og teknisk',
    lead: 'Har du en konsert, en workshop, en utstilling eller en idé som passer manifestet? Søk innen {openCallDeadline}.',
    body: ['Programmet blir til gjennom det folk foreslår. Alle kan søke, og alle får svar etter vårmøtet.', 'Fristen er {openCallDeadline}. Skjemaet sendes rett inn i koordineringsappen, så ingen søknader forsvinner i en e-postboks.'],
    embed: { thread: 'opencall' } },
  { id: 'takk-2026', date: '2026-08-12', title: 'Takk for Karlsøyfestivalen 2026', img: 'plassen', by: 'Koordinatorgruppa',
    lead: 'Rundt fem hundre mennesker skapte festivalen sammen. Her er noe av det som skjedde.',
    body: ['Takk til alle som bar stoler, skar grønnsaker, sto i porten, sang i koret og holdt workshop.', 'Opptak, bilder og omtale legges ut fortløpende her, og samles i historier du kan følge fra start til slutt.'],
    embed: { thread: 'urfolk' } },
  { id: 'peacechoir-lyd', date: '2026-08-10', title: 'Hør koret vi lagde sammen', img: 'storscenen', by: 'Karlsøy Peacechoir',
    lead: 'Tre øvelser i kirka og én konsert på Storscenen. Nå ligger opptaket ute.',
    body: ['Koret var åpent for alle, uten forkunnskaper. Lydopptaket er tatt opp fra miksebordet.'], embed: { item: 'kor-lyd' } },
  { id: 'hostmote', date: '2026-10-20', title: 'Høstmøtet på Karlsøya 7. og 8. november', img: 'hb-huset', by: 'Koordinatorgruppa',
    lead: 'Evalueringer, visjoner og sluttrapporter. Velkommen til festivalhuset, eller på Discord.',
    body: ['Alle møter holdes på Discord, også de fysiske, slik at alle kan være med uansett hvor de bor.'], embed: null },
  { id: 'omsorg-2026', date: '2026-06-02', title: 'Nytt i år: omsorgsverter og trygge rom', img: 'hb-telt', by: 'Vertskap og vakt',
    lead: 'Festivalen skal være et tryggere sted for flest mulig. Her er hva som er nytt.', body: ['Les hele saken.'], embed: { item: 'omsorg' } }
];

/* ---------- Håndboka: kapitler med kjerne (papirutgaven) og utdyping (nettet) ---------- */
DATA.chapters = [
  { id: 'om', img: 'hb-drage', title: { nb: 'Om festivalen', en: 'About the festival' },
    core: { nb: 'Karlsøyfestivalen er en øvelse i å leve sammen, organisere og ta vare på hverandre. Alle er deltakere, og alle betaler det samme.', en: 'Karlsøyfestivalen is a practice in living together, organising and caring for one another. Everyone is a participant, and everyone pays the same.' },
    more: ['Fra 1970-tallet ble Karlsøya et hjem for kunstnere, aktivister og folk som lette etter andre måter å leve på. Festivalen startet i 2000 som en protestfestival, og førte tradisjonen videre.', 'Festivalen har bevisst blitt mindre: fra over tusen besøkende til noen hundre som skaper opplevelsen sammen. Grensen mellom publikum, frivillig og arrangør er visket ut med vilje.', 'Vi ønsker en kultur der alle føler ansvar og eierskap: der alle tar vare på barna som løper rundt, skjærer grønnsaker så vi kan spise sammen, tar en vakt i porten, og der alle kan spille på en scene eller hjelpe noen andre å spille.'],
    quote: { nb: 'Denne festivalen er ikke bare noe vi organiserer. Det er noe vi øver på – sammen.', src: 'Programhefte 2026' } },
  { id: 'delta', img: 'hb-tommerstokk', title: { nb: 'Slik deltar du', en: 'How to take part' },
    core: { nb: 'Kjøp deltakerpass og velg en gruppe. Under festivalen møtes gruppa etter frokost. Har du tid og energi til mer, ta et kort fra Tavla.', en: 'Buy a participant pass and choose a group. During the festival your group meets after breakfast. If you have time and energy for more, take a card from the Board.' },
    more: ['Det er ingen plikt og ingen timetelling. Du bidrar så mye eller lite du ønsker og kan.', 'Tavla står ved Deltakerhuben. Hvert kort viser en rolle eller oppgave, hvilken gruppe den hører til, hvem som er los, hvor krevende den er, og når den skal gjøres. Tavla er et levende kunstverk som vi lager og bruker sammen.', 'Roller er ikke identiteter. Du kan ta og gi fra deg mange roller på én dag. Å si en rolle høyt gjør den til felles grunn.'],
    quote: { nb: 'Gjør det sjøl og gjør det sammen.', src: 'Håndboka' } },
  { id: 'rytme', img: 'hb-langbord', title: { nb: 'Rytmen på festivalen', en: 'The rhythm of the festival' },
    core: { nb: 'Bevegelse kl. {movement}, frokost og allmøte kl. {breakfast}, gruppemøter kl. 12:30, barnemat kl. {kidsMeal}, fellesmiddag kl. {dinner}.', en: 'Movement at {movement}, breakfast and plenary at {breakfast}, group meetings at 12:30, children’s meal at {kidsMeal}, shared dinner at {dinner}.' },
    rhythm: true,
    more: ['Fredag og lørdag er middagen kl. {dinnerWeekend}, fordi kveldskonsertene starter tidligere.', 'Allmøtet etter frokost er stedet for beskjeder, roller som trengs i dag, og ting som har skjedd.'] },
  { id: 'omsorg', img: 'hb-telt', title: { nb: 'Omsorg og trygghet', en: 'Care and safety' },
    core: { nb: 'Dagens omsorgsverter finner du ved Deltakerhuben. De har navn og rolle, og er der for deg.', en: 'Today’s carekeepers are at the Participant Hub. They have a name and a role, and they are there for you.' },
    more: ['Festivalen skal være et tryggere sted, der flest mulig med ulike identiteter kan føle seg velkomne.', 'Det er avtaler om kamera, telefon og vern av barn. I 2026 ble telefonfrie timer prøvd ut.', 'Hvilerom-lavvoen ved felleshagen er åpen hele dagen.'] },
  { id: 'organisering', img: 'hb-huset', title: { nb: 'Slik er vi organisert', en: 'How we are organised' },
    core: { nb: 'Karlsøyfestivalforeninga er en åpen, demokratisk forening. Årsmøtet velger styret. Gruppene tar beslutninger selv ved konsensus. Medlemsmøte siste torsdag hver måned.', en: 'Karlsøyfestivalforeninga is an open, democratic association. The annual meeting elects the board. Groups decide for themselves by consensus. Members’ meeting on the last Thursday of every month.' },
    principles: true, wheelImg: true,
    more: ['Årsmøtet er foreningas øverste organ og velger et styre som har det økonomiske, juridiske og administrative ansvaret.', 'Koordinatorgruppa forbereder medlemsmøtene, der hver gruppe forteller hvor de står og planlegger videre sammen.', 'Alle møter holdes på Discord, også de fysiske, slik at alle kan være med.', 'Husgruppa har ansvar for festivalhuset og området.'] },
  { id: 'los', img: 'hb-gamme', title: { nb: 'Tips til gruppelos', en: 'Tips for group guides' },
    core: { nb: 'Losen gjør ikke arbeidet selv, men lager rammer og oversikter så det blir lett for andre å bidra.', en: 'The guide doesn’t do the work alone, but creates the frames and overviews that make it easy for others to contribute.' },
    more: ['Planlegg og strukturer arbeidet på forhånd. Lag gjerne undergrupper med navn på ansvarlige.', 'Gjør utstyr tilgjengelig: åpne og merkede dører, verktøy på en tavle.', 'Lag korte beskrivelser av arbeidet, eller tavler med instruksjoner og tegninger.', 'Planlegg vaktskifter. La heller folk få fri enn å bruke dem opp.', 'Ta imot nye folk når de kommer til øya.'] },
  { id: 'reise', img: 'hb-ferga', title: { nb: 'Reise og overnatting', en: 'Travel and accommodation' },
    core: { nb: 'Gratis ferge fra Hansnes, 63 kilometer fra Tromsø. Fri camping i utmarka, festivalcamp og rusfri familiecamp.', en: 'Free ferry from Hansnes, 63 km from Tromsø. Free camping, a festival camp and an alcohol-free family camp.' },
    more: ['Buss 430 går fra Tromsø på hverdager. Sjekk alltid oppdaterte rutetider.', 'Samreise: tilby eller be om plass i bil når du har logget inn.'] }
];

/* ---------- Kunngjøringer fra Discord (eksempler) ---------- */
DATA.announce = [
  { ch: 'alle', from: 'Vertskap og vakt', when: 'fre. 10:45', t: 'Ekstraferge fra Hansnes søndag kl. 15:50. Fellesmiddag i dag er kl. {dinnerWeekend}.' },
  { ch: 'alle', from: 'Miljø og renhold', when: 'tor. 12:00', t: 'Husk egen kopp og tallerken til fellesmåltidene.' },
  { ch: 'alle', from: 'Koordinatorgruppa', when: 'ons. 09:10', t: 'Telefonfri time i dag kl. 15–16. Barna får skjermfri ettermiddag, og vi voksne også.' },
  { ch: 'kjokken', from: 'Jonas', when: 'fre. 08:02', t: 'Vi trenger to til på frokost i morgen. Si fra i kanalen om du kan.' },
  { ch: 'miljo', from: 'Tuva', when: 'ons. 16:20', t: 'Pantesekkene ligger i bussen ved inngangen.' },
  { ch: 'program', from: 'Nora', when: 'tor. 23:10', t: 'Raideren for lørdag er sjekket. Én ekstra DI-boks trengs på Storscenen.' },
  { ch: 'koord', from: 'Sindre', when: 'man. 10:30', t: 'Saksliste til medlemsmøtet ligger i fellesmappa. Legg inn punkter innen onsdag.' },
  { ch: 'vertskap', from: 'Ali', when: 'fre. 09:30', t: 'Portvakt 20–22 mangler fortsatt én. Ta kortet på Tavla.' }
];

/* ---------- Deltakere (eksempler, bare fornavn) ---------- */
DATA.folk = [
  ['Mari', ['kjokken']], ['Jonas', ['kjokken', 'miljo']], ['Ingvild', ['kjokken']], ['Aila', ['program', 'koord']], ['Nora', ['program']],
  ['Sindre', ['koord']], ['Tuva', ['miljo']], ['Emil', ['miljo']], ['Ali', ['vertskap']], ['Sara', ['vertskap']], ['Ole', ['program', 'koord']],
  ['Øyvind', ['koord', 'media']], ['Ann', ['media']], ['Danja', ['media', 'barn']], ['Sander', ['barn']], ['Kari', ['barn']], ['Per', ['praktisk']],
  ['Ronja', ['praktisk']], ['Mathias', ['praktisk', 'vertskap']], ['Lea', ['kjokken']], ['Hamid', ['kjokken']], ['Maja', ['miljo']], ['Ivar', ['vertskap']],
  ['Siri', ['program']], ['Eirik', ['media']], ['Fatima', ['barn']], ['Johanne', ['vertskap']], ['Lukas', ['praktisk']]
].map(([n, g], i) => ({ id: 'f' + i, n, g }));
DATA.groupToday = {
  kjokken: 'Frokost for 400, grønnsaker til middag kl. 15, oppvask etter middag.', vertskap: 'Porten hele dagen, kontoret 12–18, skilting av do.',
  program: 'Rigg Storscenen til lørdag, stoler til Zapatista bar kl. 16.', barn: 'Urverksted i yurta, bålmat kl. {kidsMeal}.',
  miljo: 'Dovask morgen og kveld, ny miljøstasjon ved Sandvika.', media: 'Fanzine-redaksjon i mediehuben kl. 13, postkontoret åpent.',
  praktisk: 'Ved til fellesbålet, presenning over lydbua.'
};

/* ---------- Tavla: kort med rolle, gruppe, los, energinivå og tidsrom (eksempler) ---------- */
DATA.tavla = [
  { id: 't1', kind: 'rolle', p: 'kritisk', t: 'Portvakt', g: 'vertskap', los: 'Ali', energy: 2, time: '20:00–22:00', where: 'hub', d: 'Ta imot folk, sjekk bånd, svar på spørsmål. To i porten.' },
  { id: 't2', kind: 'oppgave', p: 'kritisk', t: 'Bære stoler til Zapatista bar', g: 'program', los: 'Nora', energy: 2, time: '15:30–15:45', where: 'zap', d: 'Før samtalen om urfolks rettigheter kl. 16.' },
  { id: 't3', kind: 'rolle', p: 'kritisk', t: 'Omsorgsvert', g: 'vertskap', los: 'Sara', energy: 1, time: '14:00–18:00', where: 'hub', d: 'Være tilgjengelig ved Deltakerhuben. Du får en kort innføring først.' },
  { id: 't4', kind: 'oppgave', p: 'viktig', t: 'Skjære grønnsaker til fellesmiddagen', g: 'kjokken', los: 'Jonas', energy: 1, time: '15:00–15:45', where: 'kjokk', d: 'Sitt ned og skjær. Godt selskap garantert.' },
  { id: 't5', kind: 'oppgave', p: 'viktig', t: 'Vaske doene ved festivalhuset', g: 'miljo', los: 'Tuva', energy: 2, time: '17:00–17:30', where: 'zap', d: 'Utstyr står i bodene merket «Miljø».' },
  { id: 't6', kind: 'oppgave', p: 'viktig', t: 'Hente ved til fellesbålet', g: 'praktisk', los: 'Per', energy: 3, time: 'Før 19:00', where: 'plass', d: 'Trillebår ved verktøytavla.' },
  { id: 't7', kind: 'rolle', p: 'viktig', t: 'Digitalt ansvarlig på allmøtet', g: 'media', los: 'Øyvind', energy: 1, time: '11:00–12:00', where: 'zap', d: 'Sette opp Discord så de som ikke er på øya kan følge med.' },
  { id: 't8', kind: 'oppgave', p: 'kjekt', t: 'Male skilt til miljøstasjonen', g: 'miljo', los: 'Emil', energy: 1, time: 'Når som helst', where: 'hub', d: 'Maling og plater ligger i mediehuben.' },
  { id: 't9', kind: 'oppgave', p: 'kjekt', t: 'Samle pant på plassen', g: 'miljo', los: 'Tuva', energy: 1, time: '5 min', where: 'plass', d: 'Sekker i bussen ved inngangen.' },
  { id: 't10', kind: 'rolle', p: 'kjekt', t: 'Humørtog: kaffe til de som rigger', g: 'vertskap', los: 'Sara', energy: 1, time: '16:00', where: 'kjokk', d: 'Kaffe, boller og et smil.' }
];
DATA.energy = { 1: { nb: 'Lav energi', en: 'Low energy', fr: 'Peu d’énergie', nl: 'Weinig energie' }, 2: { nb: 'Middels energi', en: 'Medium energy', fr: 'Énergie moyenne', nl: 'Gemiddelde energie' }, 3: { nb: 'Høy energi', en: 'High energy', fr: 'Beaucoup d’énergie', nl: 'Veel energie' } };

/* ---------- Driftsmeldinger (eksempler, slik de postes i Discord) ---------- */
DATA.alerts = [
  { id: 'a1', p: 'rod', when: 'fre. 14:02', what: 'Strømmetjenesten (PeerTube) på serveren svarer ikke.', why: 'Sendingen fra Storscenen i kveld stopper hvis den ikke er oppe før kl. 18.', fix: 'Kjør reparer. Den starter strømmetjenesten på nytt og sjekker disken.', link: 'Driftshåndboka › Strømming', notify: 'Driftsgruppa og koordinatorgruppa' },
  { id: 'a2', p: 'gul', when: 'tor. 03:00', what: 'Disken på serveren er 86 prosent full.', why: 'Ved full disk stopper e-post og opplasting av filer.', fix: 'Kjør reparer for å rydde gamle logger, eller flytt opptak til lagringen for video.', link: 'Driftshåndboka › Lagring', notify: 'Driftsgruppa' },
  { id: 'a3', p: 'gul', when: 'ons. 09:00', what: 'Sist testet gjenoppretting er 35 dager gammel.', why: 'En sikkerhetskopi som ikke er testet, regnes ikke som en sikkerhetskopi.', fix: 'Den automatiske testen feilet i forrige måned. Se loggen og kjør testen på nytt.', link: 'Driftshåndboka › Sikkerhetskopier', notify: 'Driftsgruppa' },
  { id: 'a4', p: 'gronn', when: 'i natt 02:14', what: 'Sikkerhetskopi tatt, 38 GB.', why: 'Til orientering.', fix: 'Ingenting å gjøre.', link: 'Driftshåndboka › Sikkerhetskopier', notify: '' },
  { id: 'a5', p: 'gronn', when: 'man. 18:00', what: 'Ny versjon 1.4.2 lagt ut i produksjon.', why: 'Rettet visning av programposter etter midnatt.', fix: 'Ingenting å gjøre.', link: 'Endringslogg', notify: '' }
];
DATA.repairSteps = [
  ['Undersøker', 'Ser etter feil uten å endre noe.'],
  ['Funnet', 'Strømmetjenesten har stoppet. Disken er 86 prosent full.'],
  ['Forslag', 'Starte strømmetjenesten på nytt. Slette logger eldre enn 30 dager (4,2 GB).'],
  ['Sikkerhetskopi', 'Tar kopi av oppsettet til strømmetjenesten før endring.'],
  ['Utfører', 'Starter tjenesten på nytt. Rydder logger.'],
  ['Sjekker', 'Strømmetjenesten svarer. Disken er 79 prosent full.'],
  ['Melder', 'Resultatet er postet i Discord-kanalen for drift.']
];
DATA.services = [
  ['Felles innlogging', 'ok'], ['Nettside', 'ok'], ['Koordineringsappen', 'ok'], ['Filer og dokumenter', 'ok'], ['Kalender', 'ok'],
  ['Passordhvelv', 'ok'], ['E-post', 'ok'], ['Nyhetsbrev', 'ok'], ['Strømming', 'rod', 'Svarer ikke'], ['Disk', 'warn', '86 prosent full'],
  ['Sikkerhetskopi i natt', 'ok', '02:14, 38 GB'], ['Sist testet gjenoppretting', 'warn', '35 dager siden']
];

/* Huskeliste per gruppe hentes fra håndboka (DATA.groups[g].tasks) og krysses av for årets utgave. */

/* ====================================================================
   FASE 2 – valgfrie tillegg (eksempeldata)
   ==================================================================== */
DATA.channels = [
  { id: 'c-kjokken', g: 'kjokken', name: 'kjøkken-og-bar', msgs: [
    ['Jonas', 'tor. 21:14', 'Vi trenger to til på frokost i morgen. Si fra her om du kan.'],
    ['Ingvild', 'tor. 21:40', 'Jeg kan ta frokost. Stiller kl. 9.'],
    ['Jonas', 'fre. 08:02', 'Supert. Brennesla er sanket og står på kjølerommet.']] },
  { id: 'c-miljo', g: 'miljo', name: 'miljø-og-renhold', msgs: [
    ['Tuva', 'ons. 16:20', 'Pantesekkene er levert i bussen ved inngangen.'],
    ['Emil', 'ons. 18:05', 'Fint. Jeg maler skilt til stasjonen ved Sandvika i morgen.']] },
  { id: 'c-program', g: 'program', name: 'program-og-teknisk', msgs: [
    ['Nora', 'tor. 23:10', 'Raideren for lørdag er kryssjekket. Én ekstra DI-boks trengs på Storscenen.'],
    ['Aila', 'fre. 09:15', 'Noterer det. Kan noen bære stoler til Zapatista bar før kl. 16?']] },
  { id: 'c-koord', g: 'koord', name: 'koordinatorgruppa', msgs: [
    ['Sindre', 'man. 10:30', 'Saksliste til medlemsmøtet ligger i fellesmappa. Legg inn punkter innen onsdag.']] },
  { id: 'c-prat', g: null, name: 'allmenn-prat', msgs: [
    ['Lea', 'fre. 11:20', 'Noen som har en ekstra sovepose? Min ble våt i natt.'],
    ['Per', 'fre. 11:34', 'Det ligger to i hittegods i Deltakerhuben.']] }
].map(c => Object.assign(c, { msgs: c.msgs.map(m => ({ from: m[0], when: m[1], t: m[2] })) }));
DATA.voice = [
  { id: 'v1', name: 'Medlemsmøtet', who: ['Sindre', 'Aila', 'Øyvind', 'Ole', 'Ann', 'Danja'], note: 'Siste torsdag kl. 19' },
  { id: 'v2', name: 'Kjøkken og bar', who: ['Jonas'], note: '' },
  { id: 'v3', name: 'Program og teknisk', who: [], note: '' }
];
DATA.tasks = [
  { id: 'o1', t: 'Søknad til Kulturrådet', g: 'koord', role: 'Søknadsskriver', to: 'Aila', by: 'Sindre', status: 'igang', due: '20. aug.' },
  { id: 'o2', t: 'Bestille pantesekker', g: 'miljo', role: 'Innkjøper miljø', to: 'Tuva', by: 'Jonas', status: 'ferdig', due: '15. jun.' },
  { id: 'o3', t: 'Lage plakat for 2027', g: 'marked', role: 'Plakatkunstner', to: null, by: 'Ann', status: 'ny', due: '1. mai' },
  { id: 'o4', t: 'Rydde tørrlageret og merke hyllene', g: 'kjokken', role: 'Lageransvarlig', to: 'Mari', by: 'Jonas', status: 'ny', due: '27. jul.' }
];
DATA.receipts = [
  { id: 'k1', t: 'Gass til kjøkkenet', kr: 1249, g: 'kjokken', date: '05.08.26', status: 'utbetalt' },
  { id: 'k2', t: 'Maling til skilt', kr: 389, g: 'miljo', date: '06.08.26', status: 'godkjent' }
];
DATA.archive = [
  { y: 2025, img: 'hb-langbord', t: 'Abide with each other', n: 64 }, { y: 2024, img: 'hb-utsikt', t: '25 år', n: 71 },
  { y: 2023, img: 'hb-tommerstokk', t: '', n: 58 }, { y: 2022, img: 'hb-fjord', t: '', n: 49 }, { y: 2020, img: 'hb-gamme', t: 'Digital festival', n: 22 },
  { y: 2018, img: 'hb-huset', t: 'Året prestegården brant', n: 66 }, { y: 2010, img: 'hb-drage', t: '', n: 0 }, { y: 2000, img: 'plassen', t: 'Den første festivalen', n: 0 }
];
DATA.house = { name: 'Festivalhuset', units: ['Festivalhuset', 'Boligen', 'Nykåken', 'Vognplass'], booked: { 3: [3, 4, 5, 6], 4: [10, 11, 12], 5: [1, 2, 22, 23, 24, 25, 26, 27, 28, 29, 30] } };
DATA.toolkit = [
  { id: 'roller', title: 'Gjør roller synlige, men fleksible', lead: 'Definer roller tydelig, men la dem være midlertidige og overførbare. Bruk et kart, et flagg, en vegg eller en dagsplan.', sheet: 'Arbeidsark: lag deres egen Tavla' },
  { id: 'eierskap', title: 'Bygg inn eierskap nedenfra', lead: 'Sett av budsjett og tid til initiativ i siste liten. Gi gruppene mandat og ressurser til å bestemme selv.', sheet: 'Arbeidsark: mandat for en arbeidsgruppe' },
  { id: 'omsorg', title: 'Gjør omsorg eksplisitt', lead: 'Utnevn omsorgsverter med tydelig rolle og navn. Avtal hvordan dere håndterer upassende oppførsel, som omsorg og ikke byråkrati.', sheet: 'Arbeidsark: avtaler om trygghet' },
  { id: 'visuelt', title: 'Bruk visuelt språk', lead: 'Tegninger, symboler og kart gjør avtaler håndfaste. Visuelt språk er demokratisk.', sheet: 'Arbeidsark: tegn organisasjonen deres' },
  { id: 'rytme', title: 'Bygg rytme inn i året', lead: 'En festival som bare finnes under arrangementet, mister fellesskapet. Lag faste møter som også reflekterer.', sheet: 'Arbeidsark: lag deres eget årshjul' },
  { id: 'politikk', title: 'Koble struktur og politikk', lead: 'Hvordan dere organiserer dere, er også det dere kommuniserer. La organisasjonsformen uttrykke verdiene.', sheet: 'Arbeidsark: verdier og valg' }
];

/* ---------- Fase 2: e-post og kalender (eksempeldata) ---------- */
DATA.mailboxes = [
  { id: 'me' },
  { id: 'info', addr: 'info@karlsoyfestivalen.no', groups: ['koord'] },
  { id: 'deltakere', addr: 'deltakere@karlsoyfestivalen.no', groups: ['koord', 'vertskap'] },
  { id: 'booking', addr: 'booking@karlsoyfestivalen.no', groups: ['program'] },
  { id: 'kjokken', addr: 'kjokken@karlsoyfestivalen.no', groups: ['kjokken'] },
  { id: 'miljo', addr: 'miljo@karlsoyfestivalen.no', groups: ['miljo'] },
  { id: 'faktura', addr: 'faktura@karlsoyfestivalen.no', groups: ['styret'] },
  { id: 'drift', addr: 'drift@karlsoyfestivalen.no', groups: [], level: 'drift' }
];
DATA.mails = [
  { id: 'm1', box: 'me', from: 'Koordinatorgruppa', fromAddr: 'koord-liste@karlsoyfestivalen.no', subj: 'Referat fra medlemsmøtet i oktober', when: 'fre. 10:12', ts: 9, unread: true, status: 'ny',
    body: 'Hei alle sammen.\nReferatet ligger i fellesmappa under Møter/2026. Neste medlemsmøte er siste torsdag i november kl. 19 på Discord.\nHusk å legge inn saker innen onsdag.' },
  { id: 'm2', box: 'me', from: 'Nora', fromAddr: 'nora@karlsoyfestivalen.no', subj: 'Kan du ta vakt i romjula?', when: 'tor. 21:40', ts: 8, status: 'ny',
    body: 'Hei!\nVi trenger noen som kan åpne festivalhuset før romjulsmøtet 28. desember. Har du mulighet?' },
  { id: 'm3', box: 'info', from: 'Kari N.', fromAddr: 'kari.n@example.no', subj: 'Kan vi ta med hund?', when: 'i dag 09:05', ts: 10, unread: true, status: 'ny',
    body: 'Hei, vi er en familie som vil komme for første gang neste år. Kan vi ta med hunden vår?' },
  { id: 'm4', box: 'info', from: 'Lokalavisa', fromAddr: 'tips@example.no', subj: 'Pressehenvendelse om festivalen 2027', when: 'ons. 14:20', ts: 7, unread: true, status: 'ny',
    body: 'Vi vil gjerne lage en sak om festivalen som deltakerfestival. Hvem kan vi snakke med?' },
  { id: 'm5', box: 'info', from: 'Per A.', fromAddr: 'per.a@example.no', subj: 'Leie av festivalhuset i mars', when: 'man. 11:00', ts: 5, status: 'tatt', who: 'Sindre',
    body: 'Er huset ledig 13.–15. mars til et lite seminar for 20 personer?' },
  { id: 'm6', box: 'deltakere', from: 'Jonas B.', fromAddr: 'jonasb@example.no', subj: 'Refusjon av deltakerpass', when: 'tir. 18:30', ts: 6, unread: true, status: 'ny',
    body: 'Jeg kan dessverre ikke komme likevel. Er det mulig å få pengene tilbake?' },
  { id: 'm7', box: 'booking', from: 'Trio fra Bodø', fromAddr: 'trio@example.no', subj: 'Søknad til åpen utlysning 2027', when: 'i dag 08:40', ts: 10, unread: true, status: 'ny', attach: 'presentasjon.pdf',
    body: 'Hei! Vi er en trio som spiller nordnorske viser og vil gjerne søke om å spille på festivalen.\nSøknaden er også sendt inn via skjemaet.' },
  { id: 'm8', box: 'booking', from: 'Puentes', fromAddr: 'booking@example.org', subj: 'Teknisk rider 2027', when: 'tor. 16:02', ts: 7, status: 'tatt', who: 'Aila', attach: 'rider-2027.pdf',
    body: 'Vedlagt er oppdatert teknisk rider. Vi trenger to vokalmikrofoner mer enn i fjor.' },
  { id: 'm9', box: 'kjokken', from: 'Grossisten', fromAddr: 'salg@example.no', subj: 'Tilbud på økologiske grønnsaker', when: 'ons. 09:30', ts: 6, unread: true, status: 'ny',
    body: 'Vi kan tilby økologiske grønnsaker levert til Hansnes i festivaluka. Prisliste vedlagt.', attach: 'prisliste.pdf' },
  { id: 'm10', box: 'miljo', from: 'Kommunen', fromAddr: 'renovasjon@example.no', subj: 'Søppelcontainer 2027', when: 'man. 13:10', ts: 4, status: 'besvart', who: 'Tuva',
    body: 'Bekreftelse: container leveres festivalplassen 24. juli og hentes 3. august.' },
  { id: 'm11', box: 'faktura', from: 'Lydfirmaet', fromAddr: 'faktura@example.no', subj: 'Faktura 2026-118', when: 'fre. 08:00', ts: 9, unread: true, status: 'ny', attach: 'faktura-2026-118.pdf',
    body: 'Vedlagt faktura for lydanlegg, festivalen 2026. Forfall 30 dager.' },
  { id: 'm12', box: 'drift', from: 'Overvåkingen', fromAddr: 'drift@karlsoyfestivalen.no', subj: '[Rød] Strømmetjenesten (PeerTube) svarer ikke', when: 'fre. 14:02', ts: 9, unread: true, status: 'ny',
    body: 'Strømmetjenesten har ikke svart på 5 minutter.\nForslag: kjør reparer. Se Driftshåndboka › Strømming.' }
];
DATA.mailTemplates = [
  { name: 'Svar på åpen utlysning: takk for søknaden', body: 'Hei!\nTusen takk for søknaden til Karlsøyfestivalen. Fristen er {openCallDeadline}, og alle får svar etter vårmøtet i april.\n\nHilsen Program og teknisk\n' },
  { name: 'Praktisk info til deltakere', body: 'Hei!\nDeltakerpasset koster {price} kroner, og er gratis for alle under {freeUnder} år. Felles frokost er kl. {breakfast} og fellesmiddag kl. {dinner}.\n\nVelkommen!\n' },
  { name: 'Bekreftelse til artist', body: 'Hei!\nVi gleder oss til å ha dere med. Kontrakten kommer i egen e-post, og spørsmål om reise og overnatting svarer vi på her.\n\n' }
];
DATA.bigMeetings = [
  { y: 2026, m: 11, d: 7, t: 'Høstmøtet på Karlsøya', time: '12:00', g: 'koord', where: 'Festivalhuset og Discord' },
  { y: 2026, m: 12, d: 28, t: 'Romjulsmøtet: håndbok, årshjul og tema', time: '12:00', g: 'koord', where: 'Festivalhuset og Discord' },
  { y: 2027, m: 2, d: 28, t: 'Årsmøtet', time: '12:00', g: 'styret', where: 'Discord og Tromsø' },
  { y: 2027, m: 4, d: 10, t: 'Vårmøtet', time: '12:00', g: 'koord', where: 'Festivalhuset og Discord' },
  { y: 2027, m: 7, d: 27, t: 'Karlsøyfestivalen starter', time: '', g: 'koord', where: 'Karlsøya' }
];

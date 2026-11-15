/* Karlsøy 2.0 – statisk prototype. Ingen server, ingen sporing, ingen eksterne kall. */

/* ---------- Tilstand ---------- */
const STORE_KEY = 'karlsoy-proto-v1';
const STATE = Object.assign(
  { lang: 'nb', persona: null, fest: true, fav: [], taken: [], group: null, sent: {}, read: {} },
  loadState(),
  { day: 3, cat: 'all', wMonth: null, wGroup: 'mine', menu: false, sheet: false, subscribed: false, chat: false, chatId: null }
);
function loadState() {
  try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; }
}
function saveState() {
  const { lang, persona, fest, fav, taken, group, sent, read } = STATE;
  try { localStorage.setItem(STORE_KEY, JSON.stringify({ lang, persona, fest, fav, taken, group, sent, read })); } catch (e) { /* privat modus */ }
}

/* ---------- Hjelpere ---------- */
const E = DATA.edition;
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
const facts = s => s.replace(/\{(\w+)\}/g, (m, k) => (k in E ? E[k] : m));
const fmt = (d, o) => new Intl.DateTimeFormat(LOCALE[STATE.lang], o).format(d);
const dayDate = i => new Date(2026, 7, 4 + i);
const iso = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const sortKey = s => { if (!s) return -1; const [h, m] = s.split(':').map(Number); return (h < 6 ? h + 24 : h) * 60 + m; };
const cat = k => DATA.cats[k];
const venue = k => DATA.venues[k].n;
const img = (k, alt) => `<img src="assets/img/${k}.jpg" alt="${esc(alt || '')}" loading="lazy">`;
const persona = () => DATA.personas[STATE.persona || 'deltaker'];
const myGroups = () => (STATE.persona === 'deltaker' && STATE.group ? [STATE.group] : persona().groups);
const levelAtLeast = l => ['deltaker', 'medlem', 'verv', 'drift'].indexOf(persona().level) >= ['deltaker', 'medlem', 'verv', 'drift'].indexOf(l);
const monthName = (m, style) => fmt(new Date(2026, m - 1, 1), { month: style || 'long' });
function range(a, b) {
  const s = fmt(iso(a), { day: 'numeric', month: 'long' }), e = fmt(iso(b), { day: 'numeric', month: 'long', year: 'numeric' });
  return s + ' – ' + e;
}
function nextDate(dl) {
  const now = new Date(); now.setHours(0, 0, 0, 0);
  let d = new Date(now.getFullYear(), dl.m - 1, dl.d);
  if (d < now) d = new Date(now.getFullYear() + 1, dl.m - 1, dl.d);
  return { date: d, days: Math.round((d - now) / 864e5) };
}
/* Demoklokke for festivaluka: fredag 7. august kl. 14:00 */
const DEMO = { day: 3, min: 14 * 60 };
const inDays = n => (n === 0 ? t('today') : n === 1 ? t('tomorrow') : t('inDays', { n }));

/* ---------- Ruter ---------- */
function route() {
  const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  return { a: parts[0] || '', b: parts[1] || '', c: parts[2] || '' };
}
const SECTION = { '': 'gul', program: 'rosa', live: 'rosa', fra: 'gronn', forlop: 'cyan', bidragsytere: 'gul', handbok: 'gul', praktisk: 'gul', om: 'gul' };

function render(keepScroll) {
  const r = route();
  const inside = r.a === 'inn';
  if (inside && !STATE.persona) { STATE.persona = 'deltaker'; saveState(); }
  document.documentElement.lang = STATE.lang;
  document.body.dataset.section = inside ? 'inn' : (SECTION[r.a] || 'gul');
  document.getElementById('app').innerHTML = inside ? insideShell(r) : outsideShell(r);
  if (!keepScroll) window.scrollTo(0, 0);
  const msgs = document.querySelector('.chat-msgs');
  if (msgs) msgs.scrollTop = msgs.scrollHeight;
}

/* ====================================================================
   UTSIDEN – nettsiden, bygget som en Hypa Poiesis-instans
   Menyen bruker hverdagsord. Innholdsstykker («verk») og forløp («dialoger»)
   er måter å organisere og oppleve innholdet på, ikke menypunkter.
   ==================================================================== */
const NAV = [['program', 'program'], ['bidragsytere', 'people'], ['fra', 'fromFestival'], ['handbok', 'handbook'], ['praktisk', 'practical']];
const byId = (list, id) => list.find(x => x.id === id);
const post = id => byId(DATA.program, id);
const item = id => byId(DATA.items, id);
const itemBy = it => (it.who ? DATA.people[it.who].n : it.by);
const threadsFor = test => DATA.threads.filter(th => th.steps.some(test));
const whenOf = p => fmt(dayDate(p.day + (p.start && +p.start.slice(0, 2) < 6 ? 1 : 0)), { weekday: 'long' }) + (p.start ? ' ' + p.start : '');

function langSelect() {
  return `<label class="lang"><span class="sr">${t('language')}</span><select data-act="lang" aria-label="${t('language')}">${Object.keys(LANGS).map(k =>
    `<option value="${k}"${k === STATE.lang ? ' selected' : ''}>${LANGS[k]}</option>`).join('')}</select></label>`;
}
function ribbon() { return `<a class="ribbon" href="#/om">${t('proto')}</a>`; }

function outsideShell(r) {
  const pages = { '': pHome, program: r.b ? pPost : pProgram, fra: r.b ? pItem : pFeed, forlop: pThread,
    bidragsytere: r.b ? pPerson : pPeople, handbok: r.b ? pGroup : pHandbook, praktisk: pPractical, live: pLive, om: pAbout };
  const page = (pages[r.a] || pHome)(r);
  const note = t('contentNote');
  return `${ribbon()}
  <header class="top">
    <a class="brand" href="#/"><img src="assets/logo.png" alt="" width="46" height="33"><span>Karlsøyfestivalen</span></a>
    <nav class="topnav" aria-label="${t('menu')}">${NAV.map(([h, k]) => `<a href="#/${h}"${r.a === h ? ' aria-current="page"' : ''}>${t(k)}</a>`).join('')}</nav>
    <div class="top-actions">
      ${STATE.fest ? `<a class="livepill" href="#/live">${t('liveNow')}</a>` : ''}
      <a class="btn btn-light" href="#/inn">${t('login')}</a>
      <button class="burger" data-act="menu" aria-expanded="${STATE.menu}" aria-label="${t('menu')}"><span></span><span></span><span></span></button>
    </div>
  </header>
  ${STATE.menu ? `<nav class="sheetmenu" aria-label="${t('menu')}">
      ${STATE.fest ? `<a href="#/live" class="live">${t('liveNow')}</a>` : ''}
      ${NAV.map(([h, k]) => `<a href="#/${h}">${t(k)}</a>`).join('')}
      <a href="#/om">${t('about')}</a>
      <div class="sheetmenu-foot">${langSelect()}<button class="btn" data-act="menu">${t('close')}</button></div>
    </nav>` : ''}
  <main id="main">${note ? `<p class="note wrap">${note}</p>` : ''}${page}</main>
  <footer class="foot">
    <div class="wrap foot-grid">
      <div><strong>Karlsøyfestivalen</strong><p>${range(E.next.from, E.next.to)}</p><p><a href="mailto:${E.email}">${E.email}</a></p></div>
      <nav aria-label="footer">${NAV.map(([h, k]) => `<a href="#/${h}">${t(k)}</a>`).join('')}<a href="#/om">${t('about')}</a></nav>
      <div>${langSelect()}<p class="small">Hypa Poiesis</p></div>
    </div>
  </footer>`;
}

/* ---------- Forside ---------- */
function pHome() {
  const stories = DATA.threads.filter(th => th.kind === 'forlop').slice(0, 3);
  return `
  <section class="hero wrap">
    <div class="hero-text">
      <p class="hero-date">${t('nextFestival')}: <strong>${range(E.next.from, E.next.to)}</strong></p>
      <h1>${t('heroTitle')}</h1>
      <p class="lead">${t('heroLead')}</p>
      <p class="actions"><a class="btn btn-dark" href="#/program">${t('seeProgram')}</a><a class="btn" href="#/fra/deltaker">${t('howJoin')}</a></p>
    </div>
    <figure class="hero-img">${img('plassen', 'Festivalplassen på Karlsøya')}<figcaption>${t('thanks')}</figcaption></figure>
  </section>
  ${STATE.fest ? liveBanner() : ''}
  <section class="wrap block">
    <div class="block-head"><h2>${t('latest')}</h2><a href="#/fra">${t('seeAll')}</a></div>
    <div class="grid grid-4">${DATA.items.slice(0, 4).map(itemCard).join('')}</div>
  </section>
  <section class="wrap block">
    <div class="block-head"><h2>${t('stories')}</h2></div>
    <p class="blocklead">${t('storiesLead')}</p>
    <div class="grid grid-3">${stories.map(threadCard).join('')}</div>
  </section>
  <section class="manifest"><div class="wrap">
    <h2>${t('manifest')}</h2>
    ${item('manifest').body.map(p => `<p>${esc(p)}</p>`).join('')}
  </div></section>
  ${newsletter()}`;
}
function liveBanner() {
  const n = nowNext().now[0];
  return n ? `<a class="livebar" href="#/live"><span class="livedot"></span><strong>${t('liveNow')}</strong><span>${esc(n.title)}, ${esc(venue(n.venue))}</span></a>` : '';
}
function newsletter() {
  return `<section class="wrap block news">
    <div><h2>${t('newsletter')}</h2><p>${t('newsletterSub')}</p></div>
    ${STATE.subscribed ? `<p class="ok" role="status">${t('subscribed')}</p>` :
      `<form data-act="subscribe"><label><span class="sr">${t('email')}</span><input type="email" required placeholder="${t('email')}" autocomplete="email"></label><button class="btn btn-dark">${t('subscribe')}</button></form>`}
  </section>`;
}

/* ---------- Program ---------- */
function starBtn(id) {
  const on = STATE.fav.includes(id);
  return `<button class="star" data-act="fav" data-v="${id}" aria-pressed="${on}" aria-label="${on ? t('saved') : t('save')}" title="${on ? t('saved') : t('save')}">
    <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="M12 3.2l2.7 5.6 6.1.8-4.5 4.3 1.1 6.1L12 17.1 6.6 20l1.1-6.1-4.5-4.3 6.1-.8z"/></svg></button>`;
}
function progItem(p, opts) {
  const c = cat(p.cat), who = p.who && DATA.people[p.who], o = opts || {};
  const state = o.state ? `<span class="tag tag-live">${o.state}</span>` : '';
  const title = (o.prefix ? o.prefix + ': ' : '') + p.title;
  const more = p.id && threadsFor(s => s.post === p.id).length;
  return `<li class="pi">
    <div class="pi-time">${p.start ? `${p.start}<span>${p.end}</span>` : `<span class="allday">${t('allDay')}</span>`}</div>
    <div class="pi-main">
      <h3>${state}${p.id ? `<a href="#/program/${p.id}">${esc(title)}</a>` : esc(title)}</h3>
      <p class="pi-venue">${esc(venue(p.venue))}</p>
      <p class="pi-cat"><span class="dot" style="background:${c.c}"></span>${L(c)}${who ? ` <a href="#/bidragsytere/${p.who}">${esc(who.n)}</a>` : ''}</p>
      ${more ? `<p class="pi-more">${t('wholeStory')}</p>` : ''}
    </div>
    ${p.id ? starBtn(p.id) : ''}
  </li>`;
}
function dayTabs() {
  return `<div class="daytabs" role="tablist">${[0, 1, 2, 3, 4, 5].map(i =>
    `<button role="tab" data-act="day" data-v="${i}" aria-selected="${STATE.day === i}"><span>${fmt(dayDate(i), { weekday: 'short' })}</span><strong>${dayDate(i).getDate()}</strong></button>`).join('')}</div>`;
}
function catChips() {
  return `<div class="chips" role="group" aria-label="${t('category')}">
    <button data-act="cat" data-v="all" aria-pressed="${STATE.cat === 'all'}">${t('all')}</button>
    ${Object.keys(DATA.cats).map(k => `<button data-act="cat" data-v="${k}" aria-pressed="${STATE.cat === k}"><span class="dot" style="background:${cat(k).c}"></span>${L(cat(k))}</button>`).join('')}
  </div>`;
}
function pProgram() {
  const items = DATA.program.filter(p => p.day === STATE.day && (STATE.cat === 'all' || p.cat === STATE.cat)).sort((a, b) => sortKey(a.start) - sortKey(b.start));
  const daily = DATA.daily.filter(p => STATE.cat === 'all' || p.cat === STATE.cat);
  return `<div class="wrap narrow">
    <h1>${t('program')} ${E.year}</h1>
    <p class="lead">${range(E.from, E.to)}</p>
  </div>
  <div class="sticky"><div class="wrap narrow">${dayTabs()}${catChips()}</div></div>
  <div class="wrap narrow">
    <h2 class="daytitle">${fmt(dayDate(STATE.day), { weekday: 'long', day: 'numeric', month: 'long' })}</h2>
    ${items.length ? `<ul class="plist">${items.map(p => progItem(p)).join('')}</ul>` : `<p class="empty">${t('noResults')}</p>`}
    ${daily.length && STATE.day < 5 ? `<details class="daily"><summary>${t('everyDay')} (${daily.length})</summary><ul class="plist">${daily.map(p => progItem(p)).join('')}</ul></details>` : ''}
  </div>`;
}

/* ---------- Én programpost: bidragsyter, tid og sted, og hele forløpet ---------- */
function personBox(k) {
  const p = DATA.people[k];
  return `<a class="personbox" href="#/bidragsytere/${k}"><span class="avatar">${esc(p.n[0])}</span><span><strong>${esc(p.n)}</strong><span>${esc(p.b)}</span></span></a>`;
}
function pPost(r) {
  const p = post(r.b) || DATA.program[0], c = cat(p.cat);
  const ths = threadsFor(s => s.post === p.id);
  const others = p.who ? DATA.program.filter(x => x.who === p.who && x.id !== p.id) : [];
  const made = DATA.items.filter(i => i.post === p.id);
  return `<article class="wrap narrow">
    <p class="crumb"><a href="#/program">${t('program')}</a></p>
    <p class="kicker"><span class="dot" style="background:${c.c}"></span>${L(c)}</p>
    <h1>${esc(p.title)}</h1>
    <div class="when">
      <div><strong>${fmt(dayDate(p.day), { weekday: 'long', day: 'numeric', month: 'long' })}</strong><span>${p.start ? p.start + '–' + p.end : t('allDay')}</span></div>
      <div><strong>${esc(venue(p.venue))}</strong><span>${esc(DATA.venues[p.venue].d)}</span></div>
      ${starBtn(p.id)}
    </div>
    ${p.who ? personBox(p.who) : ''}
    ${ths.map(th => `<section class="story"><h2>${t('wholeStory')}</h2><p>${esc(th.lead)}</p>${stepsList(th, p.id)}<a class="more" href="#/forlop/${th.id}">${esc(th.title)}</a></section>`).join('')}
    ${!ths.length && made.length ? `<h2>${t('fromFestival')}</h2><div class="grid grid-2">${made.map(itemCard).join('')}</div>` : ''}
    ${!ths.length && others.length ? `<h2>${t('moreFrom')} ${esc(DATA.people[p.who].n)}</h2><ul class="plist">${others.map(x => progItem(x, { prefix: fmt(dayDate(x.day), { weekday: 'long' }) })).join('')}</ul>` : ''}
  </article>`;
}

/* ---------- Forløp og samlinger ---------- */
function stepsList(th, currentId) {
  return `<ol class="steps">${th.steps.map(s => {
    let when, tag, title, note = s.note || '', href = '', ex = s.ex;
    if (s.post) { const p = post(s.post); when = whenOf(p); tag = t('programPost'); title = p.title; href = '#/program/' + p.id; note = note || venue(p.venue); }
    else if (s.item) { const it = item(s.item); when = it.date; tag = L(DATA.itemTypes[it.type]); title = it.title; href = '#/fra/' + it.id; ex = it.mock; note = note || itemBy(it); }
    else { when = s.when; tag = ''; title = s.t; }
    const cur = s.post && s.post === currentId;
    return `<li class="${cur ? 'cur' : ''}${s.item ? ' has-item' : ''}">
      <p class="step-when">${esc(when)}</p>
      <h3>${href && !cur ? `<a href="${href}">${esc(title)}</a>` : esc(title)}</h3>
      <p class="step-note">${tag ? `<span class="tag">${tag}</span> ` : ''}${ex ? `<span class="tag tag-ex">${t('example')}</span> ` : ''}${esc(note)}</p>
    </li>`; }).join('')}</ol>`;
}
function threadCard(th) {
  return `<a class="card story-card" href="#/forlop/${th.id}">
    <div class="card-img">${img(th.img, '')}</div>
    <div class="card-body"><h3>${esc(th.title)}</h3><p>${esc(th.lead)}</p><p class="small">${t('nSteps', { n: th.steps.length })}</p></div></a>`;
}
function pThread(r) {
  const th = byId(DATA.threads, r.b) || DATA.threads[0];
  const people = [...new Set(th.steps.map(s => (s.post && post(s.post).who) || (s.item && item(s.item).who)).filter(Boolean))];
  return `<article class="wrap narrow">
    <p class="crumb"><a href="#/fra">${t('fromFestival')}</a></p>
    <h1>${esc(th.title)}</h1><p class="lead">${esc(th.lead)}</p>
    ${people.map(personBox).join('')}
    ${stepsList(th)}
  </article>`;
}

/* ---------- Fra festivalen: innhold som legges ut fortløpende ---------- */
function itemCard(it) {
  return `<a class="card item" href="#/fra/${it.id}">
    <div class="card-img">${img(it.img, '')}${it.type === 'video' || it.type === 'lyd' ? '<span class="play small-play" aria-hidden="true"></span>' : ''}</div>
    <div class="card-body"><p class="kicker">${L(DATA.itemTypes[it.type])}${it.mock ? ` <span class="tag tag-ex">${t('example')}</span>` : ''}</p><h3>${esc(it.title)}</h3><p class="small">${esc(itemBy(it))}, ${esc(it.date)}</p></div>
  </a>`;
}
function pFeed() {
  const stories = DATA.threads.filter(th => th.kind === 'forlop'), coll = DATA.threads.filter(th => th.kind === 'samling');
  return `<div class="wrap">
    <h1>${t('fromFestival')}</h1><p class="lead">${t('fromLead')}</p>
    <div class="grid grid-4">${DATA.items.map(itemCard).join('')}</div>
    <h2>${t('stories')}</h2><p class="blocklead">${t('storiesLead')}</p>
    <div class="grid grid-3">${stories.map(threadCard).join('')}</div>
    <h2>${t('collections')}</h2>
    <div class="grid grid-3">${coll.map(threadCard).join('')}</div>
    <h2>${t('venues')}</h2>
    <ul class="venues grid grid-3">${Object.keys(DATA.venues).map(k => { const n = DATA.program.filter(p => p.venue === k).length;
      return `<li><h3>${esc(DATA.venues[k].n)}</h3><p>${esc(DATA.venues[k].d)}</p>${n ? `<p class="small">${n} programposter i 2026</p>` : ''}</li>`; }).join('')}</ul>
  </div>`;
}
function pItem(r) {
  const w = item(r.b) || DATA.items[0];
  const media = w.type === 'video' || w.type === 'lyd'
    ? `<div class="player ${w.type}">${img(w.img, '')}<span class="play" aria-hidden="true"></span><p>${t('mockMedia')}</p></div>`
    : w.gallery ? `<div class="gallery">${w.gallery.map(g => `<figure>${img(g, 'Bilde fra festivalen')}<figcaption>Foto: mangler</figcaption></figure>`).join('')}</div>`
    : `<figure class="work-img">${img(w.img, '')}</figure>`;
  const ths = threadsFor(s => s.item === w.id);
  return `<article class="wrap narrow work-page">
    <p class="crumb"><a href="#/fra">${t('fromFestival')}</a></p>
    <p class="kicker">${L(DATA.itemTypes[w.type])}${w.mock ? ` <span class="tag tag-ex">${t('example')}</span>` : ''}</p>
    <h1>${esc(w.title)}</h1>
    ${media}
    ${w.body.map((p, i) => `<p class="${i === 0 ? 'lead' : ''}">${esc(facts(p))}</p>`).join('')}
    ${w.who ? personBox(w.who) : ''}
    <dl class="meta">
      ${w.who ? '' : `<div><dt>${t('contributor')}</dt><dd>${esc(w.by)}</dd></div>`}
      <div><dt>${t('published')}</dt><dd>${esc(w.date)}</dd></div>
      <div><dt>${t('licence')}</dt><dd>${esc(w.lic)}</dd></div>
    </dl>
    ${ths.map(th => `<section class="story"><h2>${t('partOf')}: ${esc(th.title)}</h2>${stepsList(th)}</section>`).join('')}
  </article>`;
}

/* ---------- Bidragsytere ---------- */
function pPeople() {
  return `<div class="wrap"><h1>${t('people')}</h1><ul class="people">${Object.keys(DATA.people).map(k => {
    const p = DATA.people[k];
    return `<li><a href="#/bidragsytere/${k}"><span class="dot" style="background:${cat(p.k).c}"></span><strong>${esc(p.n)}</strong><span>${L(cat(p.k))}</span></a></li>`; }).join('')}</ul></div>`;
}
function pPerson(r) {
  const k = DATA.people[r.b] ? r.b : Object.keys(DATA.people)[0], p = DATA.people[k];
  const posts = DATA.program.filter(x => x.who === k), made = DATA.items.filter(i => i.who === k);
  const ths = threadsFor(s => (s.post && post(s.post).who === k) || (s.item && item(s.item).who === k));
  return `<article class="wrap narrow"><p class="crumb"><a href="#/bidragsytere">${t('people')}</a></p>
    <p class="kicker"><span class="dot" style="background:${cat(p.k).c}"></span>${L(cat(p.k))}</p>
    <h1>${esc(p.n)}</h1><p class="lead">${esc(p.b)}</p>
    ${posts.length ? `<h2>${t('inProgram')}</h2><ul class="plist">${posts.map(x => progItem(x, { prefix: fmt(dayDate(x.day), { weekday: 'long' }) })).join('')}</ul>` : ''}
    ${made.length ? `<h2>${t('fromFestival')}</h2><div class="grid grid-2">${made.map(itemCard).join('')}</div>` : ''}
    ${ths.map(th => `<section class="story"><h2>${t('wholeStory')}</h2><p>${esc(th.lead)}</p>${stepsList(th)}</section>`).join('')}
  </article>`;
}

/* ---------- Håndboka ---------- */
function groupLink(k, base) {
  const g = DATA.groups[k];
  return `<li><a href="${base}${k}"><span class="swatch" style="background:${g.c}"></span><span><strong>${esc(g.n)}</strong><span>${esc(g.d)}</span></span></a></li>`;
}
function pHandbook() {
  return `<div class="wrap narrow">
    <h1>${t('handbook')}</h1>
    <p class="lead">Hvordan Karlsøyfestivalen organiseres, og hvordan du kan bli med. Håndboka er arbeidsverktøyet vårt og oppdateres fortløpende.</p>
    <p class="note">${t('factsNote')}</p>
    <h2>${t('dayRhythm')}</h2>
    <ul class="rhythm">
      <li><strong>${E.movement}</strong>Felles bevegelse</li>
      <li><strong>${E.breakfast}</strong>Frokost og morgenmøte</li>
      <li><strong>12:30</strong>Gruppemøter</li>
      <li><strong>${E.kidsMeal}</strong>Måltid for barn og ungdom</li>
      <li><strong>${E.dinner}</strong>Fellesmiddag (fredag og lørdag ${E.dinnerWeekend})</li>
    </ul>
    <h2>${t('principles')}</h2>
    <ol class="principles">${DATA.principles.map(p => `<li><strong>${esc(p[0])}</strong><p>${esc(p[1])}</p></li>`).join('')}</ol>
    <h2>${t('festGroups')}</h2><ul class="grouplist">${DATA.festivalGroups.map(k => groupLink(k, '#/handbok/')).join('')}</ul>
    <h2>${t('prepGroups')}</h2><ul class="grouplist">${DATA.prepGroups.map(k => groupLink(k, '#/handbok/')).join('')}</ul>
    <h2>${t('organs')}</h2><ul class="grouplist">${['styret', 'koord'].map(k => groupLink(k, '#/handbok/')).join('')}</ul>
  </div>`;
}
function groupBody(k) {
  const g = DATA.groups[k];
  const dl = DATA.deadlines.filter(d => d.g === k).sort((a, b) => a.m - b.m || a.d - b.d);
  return `<p class="lead">${esc(g.d)}</p>
    <h2>${t('tasks')}</h2><ul class="ticks">${g.tasks.map(x => `<li>${esc(x)}</li>`).join('')}</ul>
    ${dl.length ? `<h2>${t('dates')}</h2><ul class="dl">${dl.map(d => `<li><time>${d.d}. ${monthName(d.m)}</time>${esc(d.t)}</li>`).join('')}</ul>` : ''}`;
}
function pGroup(r) {
  const k = DATA.groups[r.b] ? r.b : 'kjokken', g = DATA.groups[k];
  return `<article class="wrap narrow"><p class="crumb"><a href="#/handbok">${t('handbook')}</a></p>
    <h1><span class="swatch big" style="background:${g.c}"></span>${esc(g.n)}</h1>${groupBody(k)}</article>`;
}

/* ---------- Praktisk ---------- */
function pPractical() {
  return `<div class="wrap narrow">
    <h1>${t('practical')}</h1>
    <ul class="factgrid">
      <li><strong>${E.price} kr</strong>Deltakerpass for voksne</li>
      <li><strong>0 kr</strong>Under ${E.freeUnder} år</li>
      <li><strong>${E.breakfast} og ${E.dinner}</strong>Felles frokost og middag</li>
      <li><strong>${fmt(iso(E.next.from), { day: 'numeric', month: 'short' })} – ${fmt(iso(E.next.to), { day: 'numeric', month: 'short', year: 'numeric' })}</strong>Neste festival</li>
    </ul>
    <p class="note">${t('factsNote')}</p>
    <h2>${t('faq')}</h2>
    <div class="faq">${DATA.faq.map(f => `<details><summary>${esc(f[0])}</summary><p>${esc(facts(f[1]))}</p></details>`).join('')}</div>
  </div>`;
}

/* ---------- Live ---------- */
function pLive() {
  const nn = nowNext(), n = nn.now[0];
  return `<div class="wrap narrow">
    <h1>${t('live')}</h1>
    <div class="player video">${img('storscenen', '')}<span class="play" aria-hidden="true"></span><p>${t('mockMedia')}</p></div>
    ${n ? `<h2>${t('liveNow')}</h2><ul class="plist">${progItem(n)}</ul>` : ''}
    <h2>${t('nowNext')}</h2><ul class="plist">${nn.next.map(p => progItem(p)).join('')}</ul>
    <p class="note">Live vises i menyen bare når en sending pågår eller er nær. Sendingen opprettes fra programposten, og opptaket legges etterpå inn i samme forløp.</p>
  </div>`;
}

/* ---------- Om prototypen ---------- */
function pAbout() {
  return `<div class="wrap narrow about">
    <h1>${t('about')}</h1>
    <p class="lead">Dette er en statisk skisse av brukeropplevelsen i Karlsøy 2.0. Den viser hvordan utsiden og innsiden kan henge sammen, ikke hvordan det skal se ut til slutt.</p>
    <h2>Hva du kan prøve</h2>
    <ul class="ticks">
      <li>Åpne en programpost, for eksempel <a href="#/forlop/urfolk">samtalen om urfolks rettigheter</a>, og følg hele forløpet: kunngjøring, konsert, samtale, opptak og avisoppslag.</li>
      <li>Bla i programmet for 2026, filtrer på kategori og lagre poster med stjerna.</li>
      <li>Trykk «${t('login')}» og bytt mellom fire eksempelbrukere. Hver ser bare det den trenger.</li>
      <li>Åpne «${t('messages')}» nederst til høyre på innsiden og send en melding.</li>
      <li>Bytt mellom «${t('festivalWeek')}» og «${t('restOfYear')}» på forsiden innenfor.</li>
      <li>Åpne årshjulet, trykk på en måned og velg en gruppe.</li>
      <li>Bytt språk. Grensesnittet finnes på norsk, engelsk, fransk og nederlandsk.</li>
    </ul>
    <h2>Slik henger innholdet sammen</h2>
    <p>En bidragsyter har programposter. Rundt en programpost lages det innhold: strøm, opptak, bilder, tekst og avisoppslag. Det som hører sammen, kobles i et forløp og vises i rekkefølge. En samling er det samme grepet brukt på ting som ikke er ett arrangement, for eksempel historien til øya.</p>
    <table>
      <tr><th>I menyen og på sidene</th><th>I Hypa Poiesis</th></tr>
      <tr><td>Innhold fra festivalen: artikkel, bilder, video, lyd, avisoppslag</td><td>Verk</td></tr>
      <tr><td>Forløp og samlinger</td><td>Dialoger (prosess, tidslinje, katalog)</td></tr>
      <tr><td>Programpost, sted, kategori</td><td>Program</td></tr>
      <tr><td>Bidragsyter</td><td>Bidragsyter</td></tr>
    </table>
    <p>Ordene «verk» og «dialog» brukes ikke i grensesnittet. De er prinsipper for hvordan innhold organiseres og oppleves.</p>
    <h2>Hva som er ekte, og hva som er eksempler</h2>
    <table>
      <tr><th>Ekte, fra kildene</th><td>Program 2026, steder, kategorier, bidragsytere, manifest, grupper, huskelister, frister, prinsipper, FAQ, bilder fra dagens nettside.</td></tr>
      <tr><th>Eksempler</th><td>Opptak, avisoppslag og paneldebatt (merket «${t('example')}»), brukerne Mari, Jonas, Aila og Sindre, meldinger, Tavla-kort, samreise, statuser på bidrag og driftsstatus.</td></tr>
      <tr><th>Mangler</th><td>Fotograf og lisens på bildene, beskrivelse av gruppa Mobilisering og media, innhold på andre språk enn norsk.</td></tr>
    </table>
    <h2>Data ett sted</h2>
    <p>All data ligger i fila <code>js/data.js</code>. Pris, datoer og klokkeslett står én gang øverst i fila og settes inn i FAQ, håndbok og praktisk info. Årshjulet og fristene på forsiden innenfor tegnes fra samme liste.</p>
    <p>Der kildene var uenige, bruker prototypen programheftet for 2026: bevegelse kl. ${E.movement} og fellesmiddag kl. ${E.dinner}.</p>
    <h2>Meldinger</h2>
    <p>Meldinger er asynkrone: du skriver når det passer, og får varsel på e-post om noe står ulest. Samtalene følger gruppene, bidragene og enkeltpersoner. I prototypen lagres det du skriver bare i din egen nettleser.</p>
    <h2>Teknisk</h2>
    <p>Ren HTML, CSS og JavaScript uten byggesteg, rammeverk eller eksterne kall. Fargene følger designet for Hypa Poiesis. Siden ber utvidelsen Dark Reader om å la fargene være.</p>
  </div>`;
}

/* ====================================================================
   INNSIDEN – dashbord etter innlogging
   ==================================================================== */
function nowNext() {
  const today = DATA.program.filter(p => p.day === DEMO.day && p.start).sort((a, b) => sortKey(a.start) - sortKey(b.start));
  const now = today.filter(p => sortKey(p.start) <= DEMO.min && sortKey(p.end) > DEMO.min && p.cat !== 'arbeid');
  const next = today.filter(p => sortKey(p.start) > DEMO.min).slice(0, 4);
  return { now, next };
}
function insideTabs(r) {
  const deltaker = !levelAtLeast('medlem');
  const tabs = [['', 'dash', 'M4 11l8-7 8 7v9h-5v-6H9v6H4z'], ['program', 'myProgram', 'M12 3.2l2.7 5.6 6.1.8-4.5 4.3 1.1 6.1L12 17.1 6.6 20l1.1-6.1-4.5-4.3 6.1-.8z'],
    ['tavla', 'board', 'M4 4h7v9H4zM13 4h7v5h-7zM13 11h7v9h-7zM4 15h7v5H4z'],
    deltaker ? ['gruppe', 'yourGroup', 'M8 11a3 3 0 100-6 3 3 0 000 6zm8 0a3 3 0 100-6 3 3 0 000 6zM2 20c0-3.3 2.7-6 6-6s6 2.7 6 6zm12.5 0c0-2-.7-3.8-1.9-5.2.9-.5 2-.8 3.4-.8 3.3 0 6 2.7 6 6z']
             : ['arshjul', 'yearWheel', 'M12 2a10 10 0 100 20 10 10 0 000-20zm0 3v7l5 3'],
    ['mer', 'more', 'M4 6h16M4 12h16M4 18h16']];
  return `<nav class="tabs" aria-label="${t('menu')}">${tabs.map(([h, k, d]) =>
    `<a href="#/inn${h ? '/' + h : ''}"${r.b === h ? ' aria-current="page"' : ''}><svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="${d}"/></svg><span>${t(k)}</span></a>`).join('')}</nav>`;
}
function insideShell(r) {
  const pages = { '': iDash, program: iMyProgram, tavla: iBoard, arshjul: iWheel, gruppe: iGroup, koordinering: iCoord, samreise: iRides, mer: iMore, verktoy: iTool, drift: iOps };
  const p = persona();
  return `${ribbon()}
  <header class="itop">
    <a class="brand" href="#/inn"><img src="assets/logo.png" alt="" width="40" height="28"><span>Karlsøy 2.0</span></a>
    <button class="who" data-act="sheet" aria-expanded="${STATE.sheet}"><span class="avatar">${p.name[0]}</span><span><strong>${p.name}</strong><span>${L(p.role)}</span></span></button>
  </header>
  ${STATE.sheet ? `<div class="sheet" role="dialog" aria-label="${t('viewAs')}">
      <h2>${t('viewAs')}</h2>
      <div class="rolelist">${Object.keys(DATA.personas).map(k => `<button data-act="persona" data-v="${k}" aria-pressed="${STATE.persona === k}"><span class="avatar">${DATA.personas[k].name[0]}</span><span><strong>${DATA.personas[k].name}</strong><span>${L(DATA.personas[k].role)}</span></span></button>`).join('')}</div>
      <p class="small">Eksempelbrukere. I den ferdige løsningen er dette din egen konto.</p>
      <div class="sheet-foot">${langSelect()}<a class="btn" href="#/" data-act="logout">${t('logout')}</a><button class="btn btn-dark" data-act="sheet">${t('close')}</button></div>
    </div>` : ''}
  <div class="ishell">${insideTabs(r)}<main id="main" class="imain">${(pages[r.b] || iDash)(r)}</main></div>
  ${STATE.chat ? chatPop() : chatFab()}`;
}

/* ---------- Meldinger: asynkron chat i et vindu over grensesnittet ---------- */
function chatsFor() {
  return DATA.chats.filter(c => c.kind === 'gruppe' ? myGroups().includes(c.g) : c.kind === 'bidrag' ? levelAtLeast('verv') : true);
}
const chatName = c => (c.kind === 'gruppe' ? DATA.groups[c.g].n : c.name);
const chatMsgs = c => c.msgs.concat(STATE.sent[c.id] || []);
const isMe = m => m.from === persona().name;
const unreadOf = c => Math.max(0, c.msgs.filter(m => !isMe(m)).length - (STATE.read[c.id] || 0));
function chatFab() {
  const n = chatsFor().reduce((a, c) => a + unreadOf(c), 0);
  return `<button class="chatfab" data-act="chat" aria-label="${t('messages')}${n ? ', ' + n + ' ' + t('unread') : ''}">
    <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z"/></svg>${n ? `<span class="badge">${n}</span>` : ''}</button>`;
}
function chatPop() {
  const list = chatsFor(), c = byId(list, STATE.chatId);
  if (c) {
    const canWrite = c.kind !== 'beskjed' || levelAtLeast('medlem');
    return `<section class="chatpop" role="dialog" aria-label="${esc(chatName(c))}">
      <header><button class="iconbtn" data-act="chatback" aria-label="${t('back')}">‹</button><h2>${esc(chatName(c))}</h2><button class="iconbtn" data-act="chat" aria-label="${t('close')}">×</button></header>
      <ol class="chat-msgs">${chatMsgs(c).map(m => `<li class="${isMe(m) ? 'me' : ''}"><p class="who-when">${isMe(m) ? t('you') : esc(m.from)}, ${esc(m.when || t('justNow'))}</p><p class="bubble">${esc(m.t)}</p></li>`).join('')}</ol>
      ${canWrite ? `<form class="chat-form" data-act="chatsend"><label class="sr" for="chat-in">${t('writeMsg')}</label><textarea id="chat-in" rows="1" placeholder="${t('writeMsg')}" required></textarea><button class="btn btn-dark">${t('send')}</button></form>`
        : `<p class="chat-ro">${t('chatReadOnly')}</p>`}
    </section>`;
  }
  const group = (label, kind) => { const l = list.filter(x => x.kind === kind); return l.length ? `<h3>${label}</h3><ul>${l.map(x => { const m = chatMsgs(x).slice(-1)[0], n = unreadOf(x);
    return `<li><button data-act="chatopen" data-v="${x.id}">${x.kind === 'gruppe' ? `<span class="swatch" style="background:${DATA.groups[x.g].c}"></span>` : `<span class="avatar sm">${esc(chatName(x)[0])}</span>`}<span><strong>${esc(chatName(x))}</strong><span>${esc(m.t)}</span></span>${n ? `<span class="badge">${n}</span>` : `<span class="when">${esc(m.when || t('justNow'))}</span>`}</button></li>`; }).join('')}</ul>` : ''; };
  return `<section class="chatpop" role="dialog" aria-label="${t('messages')}">
    <header><h2>${t('messages')}</h2><button class="iconbtn" data-act="chat" aria-label="${t('close')}">×</button></header>
    <div class="chat-list">
      ${group(t('chatGroups'), 'gruppe')}${group(t('chatContrib'), 'bidrag')}${group(t('chatDirect'), 'direkte')}${group(t('chatAnnounce'), 'beskjed')}
      <p class="small">${t('chatAsync')}</p>
    </div>
  </section>`;
}

/* ---------- Dashbord ---------- */
function modeSwitch() {
  return `<div class="seg" role="group"><button data-act="fest" data-v="1" aria-pressed="${STATE.fest}">${t('festivalWeek')}</button><button data-act="fest" data-v="0" aria-pressed="${!STATE.fest}">${t('restOfYear')}</button></div>`;
}
function deadlineRows(groups, n) {
  const rows = DATA.deadlines.filter(d => groups.includes(d.g)).map(d => Object.assign({ nx: nextDate(d) }, d)).sort((a, b) => a.nx.days - b.nx.days).slice(0, n);
  return rows.length ? `<ul class="dlist">${rows.map(d => `<li><span class="swatch" style="background:${DATA.groups[d.g].c}"></span><div><strong>${esc(d.t)}</strong><span>${esc(DATA.groups[d.g].n)}</span></div><time>${fmt(d.nx.date, { day: 'numeric', month: 'short' })}<span>${inDays(d.nx.days)}</span></time></li>`).join('')}</ul>`
    : `<p class="empty">${t('noDeadlines')}</p>`;
}
function boardCard(c, compact) {
  const mine = STATE.taken.includes(c.id);
  return `<li class="tcard p-${c.p}${mine ? ' mine' : ''}">
    <div><span class="tag p">${t(c.p)}</span><h3>${esc(c.t)}</h3><p>${esc(venue(c.where))}, ${c.min} ${t('minutes')}. ${esc(DATA.groups[c.g].n)}</p></div>
    ${compact && mine ? '' : `<button class="btn ${mine ? '' : 'btn-dark'}" data-act="take" data-v="${c.id}">${mine ? t('release') : t('take')}</button>`}
  </li>`;
}
function shortcuts() {
  const all = [['files', 'medlem', 'M4 5h6l2 2h8v12H4z'], ['calendar', 'medlem', 'M5 5h14v15H5zM5 9h14M9 3v4M15 3v4'], ['mail', 'verv', 'M3 6h18v12H3zM3 7l9 6 9-6'],
    ['streaming', 'verv', 'M4 6h12v12H4zM16 10l5-3v10l-5-3'], ['editHandbook', 'medlem', 'M5 4h11l3 3v13H5zM8 9h8M8 13h8M8 17h5']];
  const list = all.filter(s => levelAtLeast(s[1]));
  return list.length ? `<section class="panel"><h2>${t('tools')}</h2><div class="tiles">${list.map(([k, , d]) =>
    `<a href="#/inn/verktoy/${k}"><svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="${d}"/></svg>${t(k)}</a>`).join('')}</div></section>` : '';
}
function iDash() {
  const p = persona(), g = myGroups()[0], grp = DATA.groups[g];
  let html = `<div class="greet"><h1>${t('hello')}, ${p.name}</h1>${modeSwitch()}</div>`;
  if (STATE.persona === 'drift') html += opsPanel(true);
  if (STATE.fest) {
    const nn = nowNext();
    const favNext = DATA.program.filter(x => STATE.fav.includes(x.id) && x.day === DEMO.day && sortKey(x.start) > DEMO.min).sort((a, b) => sortKey(a.start) - sortKey(b.start));
    html += `<p class="small clock">${t('demoClock')}</p>
    <section class="panel now"><h2>${t('nowNext')}</h2><ul class="plist">${nn.now.slice(0, 2).map(x => progItem(x, { state: t('liveNow') })).join('')}${nn.next.slice(0, 3).map(x => progItem(x)).join('')}</ul>
      <a class="more" href="#/program">${t('seeProgram')}</a></section>
    ${favNext.length ? `<section class="panel"><h2>${t('myProgram')}</h2><ul class="plist">${favNext.map(x => progItem(x)).join('')}</ul></section>` : ''}
    <section class="panel group" style="--g:${grp.c}"><h2>${t('yourGroup')}: ${esc(grp.n)}</h2><p>${t('meetsAt')} ${g === 'kjokken' ? 'Kjøkkenet' : 'Deltakerhuben'}.</p><a class="more" href="#/inn/gruppe">${esc(grp.n)}</a></section>
    <section class="panel"><h2>${t('board')}</h2><ul class="tlist">${DATA.tavla.filter(c => c.p === 'kritisk' || STATE.taken.includes(c.id)).slice(0, 3).map(c => boardCard(c)).join('')}</ul><a class="more" href="#/inn/tavla">${t('board')}</a></section>
    <section class="panel care"><h2>${t('care')}</h2><p>${t('careSub')}</p></section>`;
  } else {
    if (levelAtLeast('medlem')) {
      html += `<section class="panel"><h2>${t('deadlines')}</h2>${deadlineRows(myGroups(), 5)}<p class="monthly"><span class="swatch" style="background:${DATA.groups.koord.c}"></span>${esc(DATA.monthly.t)}</p><a class="more" href="#/inn/arshjul">${t('yearWheel')}</a></section>`;
    } else {
      const days = Math.max(0, Math.round((iso(E.next.from) - new Date()) / 864e5));
      html += `<section class="panel count"><h2>${t('nextFestival')}</h2><p class="big">${range(E.next.from, E.next.to)}</p><p>${inDays(days)}</p></section>
      <section class="panel group" style="--g:${grp.c}"><h2>${t('yourGroup')}: ${esc(grp.n)}</h2><p>${esc(grp.d)}</p><a class="more" href="#/inn/gruppe">${esc(grp.n)}</a></section>`;
    }
    if (levelAtLeast('verv')) {
      const mine = DATA.bidrag.filter(b => b.mine), open = mine.reduce((n, b) => n + b.open.length, 0);
      html += `<section class="panel"><h2>${t('yourContrib')}</h2><p class="big">${mine.length} <span>${t('openItems').toLowerCase()}: ${open}</span></p><ul class="blist">${mine.map(bidragRow).join('')}</ul><a class="more" href="#/inn/koordinering">${t('coord')}</a></section>`;
    }
    html += shortcuts();
    html += `<section class="panel"><h2>${t('rides')}</h2><p>${t('ridesLead')}</p><a class="more" href="#/inn/samreise">${t('rides')}</a></section>`;
  }
  return html;
}

/* ---------- Mitt program ---------- */
function iMyProgram() {
  const favs = DATA.program.filter(p => STATE.fav.includes(p.id));
  let html = `<h1>${t('myProgram')}</h1>`;
  if (!favs.length) return html + `<p class="empty">${t('myProgramEmpty')}</p><a class="btn btn-dark" href="#/program">${t('seeProgram')}</a>`;
  [0, 1, 2, 3, 4, 5].forEach(d => {
    const l = favs.filter(p => p.day === d).sort((a, b) => sortKey(a.start) - sortKey(b.start));
    if (l.length) html += `<h2 class="daytitle">${fmt(dayDate(d), { weekday: 'long', day: 'numeric', month: 'long' })}</h2><ul class="plist">${l.map(p => progItem(p)).join('')}</ul>`;
  });
  return html + `<p><a class="btn" href="#/program">${t('seeProgram')}</a></p>`;
}

/* ---------- Tavla ---------- */
function iBoard() {
  const mine = DATA.tavla.filter(c => STATE.taken.includes(c.id));
  return `<h1>${t('board')}</h1><p class="lead">${t('boardLead')}</p>
    ${mine.length ? `<section class="panel"><h2>${t('yourTasks')}</h2><ul class="tlist">${mine.map(c => boardCard(c)).join('')}</ul></section>` : ''}
    ${['kritisk', 'viktig', 'kjekt'].map(p => { const l = DATA.tavla.filter(c => c.p === p && !STATE.taken.includes(c.id));
      return l.length ? `<h2 class="prio p-${p}">${t(p)}</h2><ul class="tlist">${l.map(c => boardCard(c)).join('')}</ul>` : ''; }).join('')}`;
}

/* ---------- Årshjul ---------- */
const RINGS = ['praktisk', 'miljo', 'kjokken', 'vertskap', 'logistikk', 'marked', 'program', 'koord', 'styret', 'barn'];
function polar(r, deg) { const a = (deg - 90) * Math.PI / 180; return [180 + r * Math.cos(a), 180 + r * Math.sin(a)]; }
function wedge(r0, r1, a0, a1) {
  const [x0, y0] = polar(r1, a0), [x1, y1] = polar(r1, a1), [x2, y2] = polar(r0, a1), [x3, y3] = polar(r0, a0);
  return `M${x0.toFixed(1)} ${y0.toFixed(1)}A${r1} ${r1} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}A${r0} ${r0} 0 0 0 ${x3.toFixed(1)} ${y3.toFixed(1)}Z`;
}
function wheelGroups() { return STATE.wGroup === 'mine' ? myGroups() : STATE.wGroup === 'all' ? Object.keys(DATA.groups) : [STATE.wGroup]; }
function wheelSvg() {
  const R0 = 50, W = 9.6, active = wheelGroups(), now = new Date();
  const ringR = g => R0 + RINGS.indexOf(g) * W + W / 2;
  let s = '';
  RINGS.forEach(g => { s += `<circle cx="180" cy="180" r="${ringR(g)}" fill="none" stroke="${DATA.groups[g].c}" stroke-width="${W - 1}" opacity="${active.includes(g) ? 0.85 : 0.22}"/>`; });
  for (let m = 0; m < 12; m++) {
    const a0 = m * 30, a1 = a0 + 30, [lx, ly] = polar(163, a0 + 15), sel = STATE.wMonth === m + 1;
    s += `<path d="${wedge(147, 153, a0 + 0.8, a1 - 0.8)}" fill="hsl(${(m * 30 + 10) % 360} 75% 80%)"/>`;
    if (sel) s += `<path d="${wedge(R0, 147, a0, a1)}" fill="#000033" opacity="0.12"/>`;
    s += `<line x1="${polar(R0, a0)[0].toFixed(1)}" y1="${polar(R0, a0)[1].toFixed(1)}" x2="${polar(147, a0)[0].toFixed(1)}" y2="${polar(147, a0)[1].toFixed(1)}" stroke="#fff" stroke-width="1.2"/>`;
    s += `<text x="${lx.toFixed(1)}" y="${(ly + 4).toFixed(1)}" text-anchor="middle" class="wm${sel ? ' sel' : ''}">${monthName(m + 1, 'short').replace('.', '')}</text>`;
  }
  /* festivaluka */
  s += `<path d="${wedge(153, 158, 6 * 30 + 26, 7 * 30 + 1)}" fill="#000033"/>`;
  DATA.deadlines.forEach(d => {
    if (!RINGS.includes(d.g)) return;
    const [x, y] = polar(ringR(d.g), (d.m - 1) * 30 + (d.d - 1) / 31 * 30), on = active.includes(d.g);
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${on ? 4.4 : 2.4}" fill="${on ? '#000033' : '#00003355'}" stroke="#fff" stroke-width="${on ? 1.2 : 0}"/>`;
  });
  const [tx, ty] = polar(158, now.getMonth() * 30 + (now.getDate() - 1) / 31 * 30), [ux, uy] = polar(R0 - 6, now.getMonth() * 30 + (now.getDate() - 1) / 31 * 30);
  s += `<line x1="${ux.toFixed(1)}" y1="${uy.toFixed(1)}" x2="${tx.toFixed(1)}" y2="${ty.toFixed(1)}" stroke="#c43d55" stroke-width="2" stroke-linecap="round"/>`;
  for (let m = 0; m < 12; m++) s += `<path d="${wedge(R0, 176, m * 30, m * 30 + 30)}" fill="transparent" class="wtap" data-act="wmonth" data-v="${m + 1}" role="button" tabindex="0" aria-label="${monthName(m + 1)}"/>`;
  s += `<circle cx="180" cy="180" r="${R0 - 8}" fill="#fff"/><text x="180" y="${STATE.wMonth ? 178 : 185}" text-anchor="middle" class="wc">${STATE.wMonth ? monthName(STATE.wMonth, 'short').replace('.', '') : now.getFullYear()}</text>`;
  if (STATE.wMonth) s += `<text x="180" y="194" text-anchor="middle" class="wc2" data-act="wmonth" data-v="0" role="button" tabindex="0">${t('wholeYear')}</text>`;
  return `<svg class="wheel" viewBox="0 0 360 360" role="img" aria-label="${t('yearWheel')}">${s}</svg>`;
}
function iWheel() {
  const active = wheelGroups();
  const rows = DATA.deadlines.filter(d => active.includes(d.g) && (!STATE.wMonth || d.m === STATE.wMonth)).sort((a, b) => a.m - b.m || a.d - b.d);
  const chip = (v, label, c) => `<button data-act="wgroup" data-v="${v}" aria-pressed="${STATE.wGroup === v}">${c ? `<span class="dot" style="background:${c}"></span>` : ''}${label}</button>`;
  return `<h1>${t('yearWheel')}</h1><p class="lead">${t('wheelLead')}</p>
    <div class="chips">${chip('mine', t('myGroups'))}${chip('all', t('all'))}${RINGS.slice().reverse().map(g => chip(g, esc(DATA.groups[g].n), DATA.groups[g].c)).join('')}</div>
    <div class="wheelwrap">${wheelSvg()}
      <div class="wheellist">
        <h2>${STATE.wMonth ? monthName(STATE.wMonth) : t('wholeYear')}</h2>
        ${rows.length ? `<ul class="dlist">${rows.map(d => `<li><span class="swatch" style="background:${DATA.groups[d.g].c}"></span><div><strong>${esc(d.t)}</strong><span>${esc(DATA.groups[d.g].n)}</span></div><time>${d.d}. ${monthName(d.m, 'short')}</time></li>`).join('')}</ul>` : `<p class="empty">${t('noDeadlines')}</p>`}
        ${active.includes('koord') ? `<p class="monthly"><span class="swatch" style="background:${DATA.groups.koord.c}"></span>${esc(DATA.monthly.t)}</p>` : ''}
      </div>
    </div>`;
}

/* ---------- Gruppa ---------- */
function iGroup() {
  const k = myGroups()[0], g = DATA.groups[k];
  return `<h1><span class="swatch big" style="background:${g.c}"></span>${esc(g.n)}</h1>${groupBody(k)}
    ${STATE.persona === 'deltaker' ? `<section class="panel"><h2>${t('changeGroup')}</h2><label class="field"><span class="sr">${t('changeGroup')}</span><select data-act="group">${DATA.festivalGroups.map(x => `<option value="${x}"${x === k ? ' selected' : ''}>${esc(DATA.groups[x].n)}</option>`).join('')}</select></label><p class="small">Du kan bytte når som helst, og gå til og fra flere grupper.</p></section>` : ''}
    <p><a class="btn" href="#/handbok/${k}">${t('handbook')}</a></p>`;
}

/* ---------- Koordinering ---------- */
function bidragRow(b) {
  return `<li class="brow"><div><strong>${esc(b.t)}</strong><span><span class="dot" style="background:${cat(b.k).c}"></span>${L(cat(b.k))}</span></div>
    <ol class="cps" aria-label="Sjekkpunkter">${b.cp.map((v, i) => `<li class="${v ? 'on' : ''}" title="${DATA.checkpoints[i]}"><span class="sr">${DATA.checkpoints[i]}: ${v ? 'ja' : 'nei'}</span></li>`).join('')}</ol>
    ${b.open.length ? `<p class="open">${b.open.map(esc).join(', ')}</p>` : `<p class="clear">${t('allClear')}</p>`}</li>`;
}
function iCoord() {
  if (!levelAtLeast('medlem')) return `<h1>${t('coord')}</h1><p class="empty">Denne delen er for dem som har ansvar for bidrag.</p>`;
  return `<h1>${t('coord')}</h1><p class="note">${t('coordNote')}</p>
    <p class="legend">${DATA.checkpoints.map(c => `<span>${c}</span>`).join('')}</p>
    <h2>${t('yourContrib')}</h2><ul class="blist">${DATA.bidrag.filter(b => b.mine).map(bidragRow).join('')}</ul>
    <h2>${t('allContrib')}</h2><ul class="blist">${DATA.bidrag.filter(b => !b.mine).map(bidragRow).join('')}</ul>
    <p class="note">Når «Publisert» settes, opprettes programposten og bidragsyteren på nettsiden. Honorar, kontaktinfo, reise og overnatting blir her.</p>`;
}

/* ---------- Samreise ---------- */
function iRides() {
  return `<h1>${t('rides')}</h1><p class="lead">${t('ridesLead')}</p><ul class="rides">${DATA.rides.map(r =>
    `<li class="${r.dir === 'trenger' ? 'need' : ''}"><span class="tag">${r.dir === 'trenger' ? t('needs') : t('offers')}</span><h3>${r.dir === 'fra' ? 'Fra' : 'Til'} festivalen, ${esc(r.from)}</h3><p>${esc(r.when)}. ${r.seats} ${t('seats')}.</p><p class="small">${esc(r.by)}</p></li>`).join('')}</ul>
    <p class="small">Eksempler. Erstatter Facebook-gruppa som brukes i dag.</p>`;
}

/* ---------- Mer ---------- */
function iMore() {
  const links = [['#/inn/gruppe', t('yourGroup')], ['#/inn/samreise', t('rides')]];
  if (levelAtLeast('medlem')) links.push(['#/inn/arshjul', t('yearWheel')], ['#/inn/koordinering', t('coord')]);
  if (levelAtLeast('drift')) links.push(['#/inn/drift', t('ops')]);
  links.push(['#/handbok', t('handbook')], ['#/praktisk', t('practical')], ['#/', t('toSite')], ['#/om', t('about')]);
  return `<h1>${t('more')}</h1><ul class="morelist">${links.map(l => `<li><a href="${l[0]}">${l[1]}</a></li>`).join('')}</ul>${shortcuts()}
    <section class="panel"><h2>${t('language')}</h2>${langSelect()}</section>`;
}
function iTool(r) {
  return `<h1>${t(I18N[r.c] ? r.c : 'tools')}</h1><p class="empty">${t('notInProto')}</p><p><a class="btn" href="#/inn">${t('back')}</a></p>`;
}

/* ---------- Drift ---------- */
function opsPanel(compact) {
  const warn = DATA.services.filter(s => s[1] !== 'ok');
  return `<section class="panel"><h2>${t('ops')}</h2>${compact ? `<p class="big">${DATA.services.length - warn.length} <span>av ${DATA.services.length} uten merknad</span></p>` : ''}
    <ul class="svc">${(compact ? warn : DATA.services).map(s => `<li class="${s[1]}"><span class="led"></span><strong>${esc(s[0])}</strong><span>${esc(s[2] || (s[1] === 'ok' ? 'OK' : ''))}</span></li>`).join('')}</ul>
    ${compact ? `<a class="more" href="#/inn/drift">${t('ops')}</a>` : ''}</section>`;
}
function iOps() { return `<h1>${t('ops')}</h1><p class="lead">${t('opsLead')}</p>${opsPanel(false)}`; }

/* ====================================================================
   Hendelser
   ==================================================================== */
const toggle = (arr, v) => { const i = arr.indexOf(v); i < 0 ? arr.push(v) : arr.splice(i, 1); };
const ACTIONS = {
  menu() { STATE.menu = !STATE.menu; },
  sheet() { STATE.sheet = !STATE.sheet; },
  day(v) { STATE.day = +v; },
  cat(v) { STATE.cat = v; },
  fav(v) { toggle(STATE.fav, v); },
  take(v) { toggle(STATE.taken, v); },
  fest(v) { STATE.fest = v === '1'; },
  persona(v) { STATE.persona = v; STATE.sheet = false; STATE.wGroup = 'mine'; STATE.chat = false; STATE.chatId = null; if (['arshjul', 'koordinering', 'drift'].includes(route().b)) location.hash = '#/inn'; },
  logout() { STATE.sheet = false; },
  wmonth(v) { STATE.wMonth = +v === STATE.wMonth ? null : (+v || null); },
  wgroup(v) { STATE.wGroup = v; },
  chat() { STATE.chat = !STATE.chat; STATE.chatId = null; },
  chatback() { STATE.chatId = null; },
  chatopen(v) { STATE.chatId = v; const c = byId(DATA.chats, v); STATE.read[v] = c.msgs.filter(m => !isMe(m)).length; }
};
document.addEventListener('click', e => {
  const el = e.target.closest('[data-act]');
  if (!el || el.tagName === 'SELECT' || el.tagName === 'FORM') return;
  const act = ACTIONS[el.dataset.act];
  if (!act) return;
  if (el.tagName !== 'A') e.preventDefault();
  act(el.dataset.v);
  saveState();
  if (el.tagName !== 'A') render(true);
});
document.addEventListener('keydown', e => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('svg [data-act]')) { e.preventDefault(); e.target.dispatchEvent(new MouseEvent('click', { bubbles: true })); }
  if (e.key === 'Escape' && (STATE.menu || STATE.sheet || STATE.chat)) { STATE.menu = STATE.sheet = STATE.chat = false; render(true); }
  if (e.key === 'Enter' && !e.shiftKey && e.target.id === 'chat-in') { e.preventDefault(); e.target.form.requestSubmit(); }
});
document.addEventListener('change', e => {
  const el = e.target.closest('select[data-act]');
  if (!el) return;
  if (el.dataset.act === 'lang') STATE.lang = el.value;
  if (el.dataset.act === 'group') STATE.group = el.value;
  saveState(); render(true);
});
document.addEventListener('submit', e => {
  if (e.target.dataset.act === 'subscribe') { e.preventDefault(); STATE.subscribed = true; render(true); }
  if (e.target.dataset.act === 'chatsend') {
    e.preventDefault();
    const txt = e.target.querySelector('textarea').value.trim();
    if (!txt || !STATE.chatId) return;
    (STATE.sent[STATE.chatId] = STATE.sent[STATE.chatId] || []).push({ from: persona().name, t: txt, when: '' });
    saveState(); render(true);
    const inp = document.getElementById('chat-in'); if (inp) inp.focus();
  }
});
window.addEventListener('hashchange', () => { STATE.menu = false; STATE.sheet = false; STATE.chat = false; render(false); });
render(false);

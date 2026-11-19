/* Karlsøyfestivalen – statisk prototype (utkast 2).
   Ingen server, ingen sporing, ingen eksterne kall. PHASE settes i index.html (1) og fase2.html (2). */

const PHASE = window.PHASE || 1;
const F2 = PHASE >= 2;

/* ---------- Tilstand ---------- */
const STORE_KEY = 'kf2-proto-v3';
const STATE = Object.assign(
  { lang: 'nb', persona: null, when: 'under', fav: [], taken: [], group: null, checks: {}, hidden: false, sent: {}, read: {},
    tasks: null, receipts: null, member: false, houseReq: [], mailState: {}, sentMail: [], myEvents: [] },
  loadState(),
  { day: 3, cat: 'all', venue: 'all', q: '', energy: 0, folkG: 'all', wMonth: null, wGroup: 'mine', menu: false, sub: false, sheet: false,
    subscribed: false, chat: false, chatId: null, repair: 0, claimed: [], toast: '', newTask: false, houseMonth: 4, houseUnit: 0, mailBox: 'me', replyTo: null, calY: new Date().getFullYear(), calM: new Date().getMonth() + 1, calDay: 0, calGroups: 'mine', newEvent: false }
);
function loadState() { try { return JSON.parse(localStorage.getItem(STORE_KEY)) || {}; } catch (e) { return {}; } }
function saveState() {
  const { lang, persona, when, fav, taken, group, checks, hidden, sent, read, tasks, receipts, member, houseReq, mailState, sentMail, myEvents, tk } = STATE;
  try { localStorage.setItem(STORE_KEY, JSON.stringify({ lang, persona, when, fav, taken, group, checks, hidden, sent, read, tasks, receipts, member, houseReq, mailState, sentMail, myEvents, tk })); } catch (e) { /* privat modus */ }
}
if (!STATE.tasks) STATE.tasks = JSON.parse(JSON.stringify(DATA.tasks));
if (!STATE.receipts) STATE.receipts = JSON.parse(JSON.stringify(DATA.receipts));

/* ---------- Hjelpere ---------- */
const E = DATA.edition;
const esc = s => String(s).replace(/[&<>"']/g, c => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;' }[c]));
/* Faste fakta settes inn fra ett sted, og merkes så man ser hvor de kommer fra. */
const facts = s => esc(s).replace(/\{(\w+)\}/g, (m, k) => (k in E ? `<span class="fact" title="${esc(t('factFrom'))}: ${esc(DATA.factSource[k] || 'Håndboka')}">${esc(E[k])}</span>` : m));
const factsPlain = s => String(s).replace(/\{(\w+)\}/g, (m, k) => (k in E ? E[k] : m));
const fmt = (d, o) => new Intl.DateTimeFormat(LOCALE[STATE.lang], o).format(d);
const dayDate = i => new Date(2026, 7, 4 + i);
const iso = s => { const [y, m, d] = s.split('-').map(Number); return new Date(y, m - 1, d); };
const sortKey = s => { if (!s) return -1; const [h, m] = s.split(':').map(Number); return (h < 6 ? h + 24 : h) * 60 + m; };
const cat = k => DATA.cats[k];
const venue = k => DATA.venues[k].n;
const img = (k, alt) => `<img src="assets/img/${k}.jpg" alt="${esc(alt || '')}" loading="lazy">`;
const persona = () => DATA.personas[STATE.persona || 'deltaker'];
const myGroups = () => (STATE.persona === 'deltaker' && STATE.group ? [STATE.group] : persona().groups);
const LEVELS = ['deltaker', 'medlem', 'verv', 'drift'];
const levelAtLeast = l => LEVELS.indexOf(persona().level) >= LEVELS.indexOf(l);
const monthName = (m, style) => fmt(new Date(2026, m - 1, 1), { month: style || 'long' });
const f2tag = () => `<span class="f2" title="${esc(t('phase2Tip'))}">${t('phase2')}</span>`;
function range(a, b) { return fmt(iso(a), { day: 'numeric', month: 'long' }) + ' – ' + fmt(iso(b), { day: 'numeric', month: 'long', year: 'numeric' }); }
function nextDate(dl) {
  const now = new Date(); now.setHours(0, 0, 0, 0);
  let d = new Date(now.getFullYear(), dl.m - 1, dl.d);
  if (d < now) d = new Date(now.getFullYear() + 1, dl.m - 1, dl.d);
  return { date: d, days: Math.round((d - now) / 864e5) };
}
/* Demoklokke under festivalen: fredag 7. august kl. 14:00 */
const DEMO = { day: 3, min: 14 * 60 };
const inDays = n => (n === 0 ? t('today') : n === 1 ? t('tomorrow') : t('inDays', { n }));
const during = () => STATE.when === 'under';
const byId = (list, id) => list.find(x => x.id === id);
const post = id => byId(DATA.program, id);
const item = id => byId(DATA.items, id);
const itemBy = it => (it.who ? DATA.people[it.who].n : it.by);
const threadsFor = test => DATA.threads.filter(th => th.steps.some(test));
const whenOf = p => fmt(dayDate(p.day + (p.start && +p.start.slice(0, 2) < 6 ? 1 : 0)), { weekday: 'long' }) + (p.start ? ' ' + p.start : '');
const groupName = g => DATA.groups[g] ? DATA.groups[g].n : g;

/* Plassholder for portrett: bidragsyteren laster opp eget bilde med fotograf og lisens. */
function portrait(k, size) {
  const p = DATA.people[k], PAL = ['#F0604C', '#F5932E', '#F7C531', '#4DF0A0', '#4DE4F0', '#F04DAF', '#4DF0D7', '#C9E83A'], c = PAL[[...k].reduce((a, ch) => a + ch.charCodeAt(0), 0) % PAL.length], init = p.n.split(/\s+/).map(w => w[0]).slice(0, 2).join('');
  const cols = ['#F0604C', '#F5932E', '#F7C531', '#4DF0A0', '#4DE4F0', '#9B4FD0'];
  const arcs = cols.map((col, i) => `<path d="M${20 + i * 9} 200 A ${80 - i * 9} ${80 - i * 9} 0 0 1 ${180 - i * 9} 200" fill="none" stroke="${col}" stroke-width="7" opacity=".9"/>`).join('');
  return `<svg class="portrait${size ? ' ' + size : ''}" viewBox="0 0 200 200" role="img" aria-label="${esc(t('photoComing'))}: ${esc(p.n)}"><rect width="200" height="200" fill="${c}"/>${arcs}<text x="100" y="98" text-anchor="middle">${esc(init)}</text></svg>`;
}

/* ---------- Ruter ---------- */
function route() {
  const parts = location.hash.replace(/^#\/?/, '').split('/').filter(Boolean);
  return { a: parts[0] || '', b: parts[1] || '', c: parts[2] || '' };
}
function render(keepScroll) {
  const r = route(), inside = r.a === 'inn';
  if (inside && !STATE.persona) { STATE.persona = 'deltaker'; saveState(); }
  if (inside && F2 && (r.b === 'epost' || r.b === 'kalender') && !mailUser()) { STATE.persona = 'los'; STATE.toast = t('tryAs'); saveState(); }
  if (inside && F2 && r.b === 'verktoy' && (r.c === 'mail' || r.c === 'calendar')) { location.replace('#/inn/' + (r.c === 'mail' ? 'epost' : 'kalender')); return; }
  document.documentElement.lang = STATE.lang;
  document.body.dataset.inside = inside ? '1' : '0';
  document.getElementById('app').innerHTML = protoBar() + (inside ? insideShell(r) : outsideShell(r)) + (STATE.toast ? `<p class="toast" role="status">${esc(STATE.toast)}</p>` : '');
  if (!keepScroll) window.scrollTo(0, 0);
  const msgs = document.querySelector('.chat-msgs'); if (msgs) msgs.scrollTop = msgs.scrollHeight;
  if (STATE.toast) { clearTimeout(render.tt); render.tt = setTimeout(() => { STATE.toast = ''; const el = document.querySelector('.toast'); if (el) el.remove(); }, 3800); }
}

/* Prototype-stripe: velg tidspunkt og fase */
function protoBar() {
  const w = (v, k) => `<button data-act="when" data-v="${v}" aria-pressed="${STATE.when === v}">${t(k)}</button>`;
  return `<div class="protobar">
    <a href="#/om" class="pb-label">${t('proto')} · ${F2 ? t('phase2Proto') : t('phase1Proto')}</a>
    <div class="pb-when" role="group" aria-label="${t('showAs')}"><span>${t('showAs')}:</span>${w('for', 'whenBefore')}${w('under', 'whenDuring')}${w('etter', 'whenAfter')}</div>
    ${F2 ? `<div class="pb-try"><button data-act="try2" data-v="epost">${t('tryMail')}</button><button data-act="try2" data-v="kalender">${t('tryCal')}</button></div>` : ''}
    <a class="pb-switch" href="${F2 ? 'index.html' : 'fase2.html'}${location.hash}">${F2 ? t('toPhase1') : t('toPhase2')}</a>
  </div>`;
}

/* ====================================================================
   UTSIDEN – nettsiden
   Håndboka og faste sider holdes år etter år. Årets festival (program, bidragsytere,
   historier, blogg) er en egen utgave per år, bygget på prinsippene fra Hypa Poiesis.
   ==================================================================== */
const PROGRAM_SUB = [['program', 'thisHappens'], ['program/dag', 'dayByDay'], ['program/alle', 'allPosts'], ['bidragsytere', 'people']];
function navItems() {
  const l = [['historier', 'stories'], ['handbok', 'handbook'], ['praktisk', 'practical']];
  return l;
}
function liveNow() { return during() && nowNext().now.length > 0; }

function langSelect(cls) {
  return `<label class="lang ${cls || ''}"><span class="sr">${t('language')}</span><select data-act="lang" aria-label="${t('language')}">${Object.keys(LANGS).map(k =>
    `<option value="${k}"${k === STATE.lang ? ' selected' : ''}>${LANGS[k]}</option>`).join('')}</select></label>`;
}

function outsideShell(r) {
  const pages = {
    '': pHome, program: r.b === 'dag' ? pDay : r.b === 'alle' ? pAll : r.b ? pPost : pHappens,
    bidragsytere: r.b ? pPerson : pPeople, historier: r.b ? pThread : pStories, tema: pThread, innhold: pItem,
    nytt: r.b ? pBlogPost : pBlog, handbok: r.b === 'gruppe' ? pGroup : r.b === 'kart' ? pMap : r.b ? pChapter : pHandbook,
    praktisk: pPractical, live: pLive, om: pAbout,
    arkiv: F2 ? pArchive : pHome, verktoykasse: F2 ? pToolkit : pHome, huset: F2 ? pHouse : pHome, 'bli-medlem': F2 ? pJoin : pHome
  };
  const progActive = r.a === 'program' || r.a === 'bidragsytere';
  const page = (pages[r.a] || pHome)(r);
  const live = liveNow();
  return `
  <header class="top">
    <a class="brand" href="#/"><img src="assets/logo.png" alt="" width="52" height="37"><span>Karlsøyfestivalen</span></a>
    <nav class="topnav" aria-label="${t('menu')}">
      <div class="dd">
        <button class="dd-btn" data-act="sub" aria-expanded="${STATE.sub}"${progActive ? ' aria-current="page"' : ''}>${t('program')}<svg viewBox="0 0 12 8" width="12" height="8" aria-hidden="true"><path d="M1 1l5 5 5-5"/></svg></button>
        ${STATE.sub ? `<div class="dd-menu">${PROGRAM_SUB.map(([h, k]) => `<a href="#/${h}">${t(k)}</a>`).join('')}</div>` : ''}
      </div>
      ${navItems().map(([h, k]) => `<a href="#/${h}"${r.a === h ? ' aria-current="page"' : ''}${h === 'live' ? ' class="navlive"' : ''}>${h === 'live' ? '<span class="livedot"></span>' : ''}${t(k)}</a>`).join('')}
    </nav>
    <div class="top-actions">
      ${live ? `<a class="livepill" href="#/live"><span class="livedot"></span>${t('live')}</a>` : ''}
      <a class="btn btn-small" href="#/inn">${t('login')}</a>
      <button class="burger" data-act="menu" aria-expanded="${STATE.menu}" aria-label="${t('menu')}"><span></span><span></span><span></span></button>
    </div>
  </header>
  ${STATE.menu ? `<nav class="sheetmenu" aria-label="${t('menu')}">
      ${live ? `<a href="#/live" class="live"><span class="livedot"></span>${t('liveNow')}</a>` : ''}
      <p class="sm-head">${t('program')}</p>
      ${PROGRAM_SUB.map(([h, k]) => `<a class="sm-sub" href="#/${h}">${t(k)}</a>`).join('')}
      ${navItems().filter(n => n[0] !== 'live').map(([h, k]) => `<a href="#/${h}">${t(k)}</a>`).join('')}
      <a href="#/nytt">${t('blog')}</a>
      ${F2 ? `<a href="#/arkiv">${t('archive')} ${f2tag()}</a><a href="#/verktoykasse">${t('toolkit')} ${f2tag()}</a>` : ''}
      <div class="sheetmenu-foot">${langSelect()}<button class="btn" data-act="menu">${t('close')}</button></div>
    </nav>` : ''}
  <main id="main">${STATE.lang !== 'nb' ? `<p class="note wrap">${t('contentNote')}</p>` : ''}${page}</main>
  ${footer()}`;
}
function footer() {
  return `<footer class="foot">
    <div class="rainbow-arc" aria-hidden="true"></div>
    <div class="wrap foot-grid">
      <div><img src="assets/logo.png" alt="" width="64" height="45"><p><strong>Karlsøyfestivalen</strong><br>${range(E.next.from, E.next.to)}</p><p><a href="mailto:${E.email}">${E.email}</a></p></div>
      <nav aria-label="${t('footerNav')}">${PROGRAM_SUB.map(([h, k]) => `<a href="#/${h}">${t(k)}</a>`).join('')}<a href="#/historier">${t('stories')}</a><a href="#/nytt">${t('blog')}</a><a href="#/handbok">${t('handbook')}</a><a href="#/praktisk">${t('practical')}</a>${F2 ? `<a href="#/arkiv">${t('archive')}</a><a href="#/verktoykasse">${t('toolkit')}</a><a href="#/huset">${t('house')}</a><a href="#/bli-medlem">${t('joinAssoc')}</a>` : ''}<a href="#/om">${t('about')}</a></nav>
      <div>${langSelect()}<p class="small">${t('builtWith')}</p></div>
    </div>
  </footer>`;
}

/* ---------- Forside ---------- */
function pHome() {
  const stories = DATA.threads.filter(th => th.kind === 'forlop').slice(0, 3);
  const themes = DATA.threads.filter(th => th.kind === 'tema');
  const posts = DATA.posts.slice().sort((a, b) => b.date.localeCompare(a.date)).slice(0, 4);
  const heroDate = STATE.when === 'under' ? range(E.from, E.to) : range(E.next.from, E.next.to);
  const kick = STATE.when === 'under' ? t('festivalOn') : t('nextFestival');
  return `
  <section class="hero">
    <div class="wrap hero-grid">
      <div class="hero-text">
        <p class="hero-kick">${kick}</p>
        <p class="hero-date">${heroDate}</p>
        <h1>${t('heroTitle')}</h1>
        <p class="lead">${t('heroLead')}</p>
        <p class="actions">${STATE.when === 'under' ? `<a class="btn btn-dark" href="#/program">${t('thisHappens')}</a>` : `<a class="btn btn-dark" href="${'#/praktisk'}">${t('buyPass')}</a>`}<a class="btn" href="#/handbok/delta">${t('howJoin')}</a></p>
      </div>
      <figure class="hero-img">${img('hb-utsikt', 'Karlsøya sett fra fjellet')}<figcaption>${t('photoBy')} Håndboka v9.1</figcaption></figure>
    </div>
  </section>
  ${liveNow() ? liveBanner() : ''}
  <section class="wrap block">
    <div class="block-head"><h2>${t('latest')}</h2><a href="#/nytt">${t('allNews')}</a></div>
    <div class="grid grid-4">${posts.map(postCard).join('')}</div>
  </section>
  <section class="threadband">
    <div class="wrap">
      <div class="block-head"><h2>${t('enterStory')}</h2><a href="#/historier">${t('allStories')}</a></div>
      <p class="blocklead">${t('enterStoryLead')}</p>
      <div class="grid grid-3">${stories.map(threadCard).join('')}</div>
    </div>
  </section>
  <section class="wrap block">
    <div class="block-head"><h2>${t('themes')}</h2></div>
    <p class="blocklead">${t('themesLead')}</p>
    <div class="themes">${themes.map(themeChip).join('')}</div>
  </section>
  <section class="manifest"><div class="wrap">
    <h2>${t('manifest')}</h2>
    ${item('manifest').body.map(p => `<p>${esc(p)}</p>`).join('')}
  </div></section>
  ${F2 ? memberCta() : ''}
  ${newsletter()}`;
}
function liveBanner() {
  const n = nowNext().now[0];
  return n ? `<a class="livebar wrap" href="#/live"><span class="livedot"></span><strong>${t('liveNow')}</strong><span>${esc(n.title)}, ${esc(venue(n.venue))}</span></a>` : '';
}
function newsletter() {
  return `<section class="wrap block news">
    <div><h2>${t('newsletter')}</h2><p>${t('newsletterSub')}</p></div>
    ${STATE.subscribed ? `<p class="ok" role="status">${t('subscribed')}</p>` :
      `<form data-act="subscribe"><label><span class="sr">${t('email')}</span><input type="email" required placeholder="${t('email')}" autocomplete="email"></label><button class="btn btn-dark">${t('subscribe')}</button></form>`}
  </section>`;
}
function postCard(p) {
  return `<a class="card post" href="#/nytt/${p.id}"><div class="card-img">${img(p.img, '')}</div>
    <div class="card-body"><p class="kicker">${fmt(iso(p.date), { day: 'numeric', month: 'long' })}</p><h3>${esc(p.title)}</h3><p>${facts(p.lead)}</p></div></a>`;
}
function themeChip(th) {
  return `<a class="theme" href="#/tema/${th.id}"><span class="theme-img">${img(th.img, '')}</span><span><strong>${esc(th.title)}</strong><span>${esc(th.lead)}</span></span></a>`;
}

/* ---------- Program: «Dette skjer» tilpasser seg tiden ---------- */
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
  return `<li class="pi" style="--c:${c.c}">
    <div class="pi-time">${p.start ? `${p.start}<span>${p.end}</span>` : `<span class="allday">${t('allDay')}</span>`}</div>
    <div class="pi-main">
      <h3>${state}${p.id ? `<a href="#/program/${p.id}">${esc(title)}</a>` : esc(title)}</h3>
      <p class="pi-venue">${esc(venue(p.venue))}</p>
      <p class="pi-cat"><span class="dot" style="background:${c.c}"></span>${L(c)}${who ? ` · <a href="#/bidragsytere/${p.who}">${esc(who.n)}</a>` : ''}</p>
      ${more ? `<p class="pi-more">${t('hasStory')}</p>` : ''}
    </div>
    ${p.id ? starBtn(p.id) : ''}
  </li>`;
}
function progTabs(active) {
  return `<nav class="subtabs" aria-label="${t('program')}">${PROGRAM_SUB.map(([h, k]) => `<a href="#/${h}"${active === h ? ' aria-current="page"' : ''}>${t(k)}</a>`).join('')}</nav>`;
}
function pHappens() {
  const head = `<div class="wrap narrow"><h1>${t('program')} ${E.year}</h1>${progTabs('program')}</div>`;
  if (STATE.when === 'for') {
    const headliners = ['ellamarie', 'balto', 'puentes', 'prestegaard', 'tomren', 'slave'];
    return head + `<div class="wrap narrow">
      <p class="lead">${t('beforeLead')}</p>
      <div class="countdown"><strong>${range(E.from, E.to)}</strong><span>${t('releaseNote')}</span></div>
      <h2>${t('comingArtists')}</h2></div>
      <div class="wrap"><div class="pgrid">${headliners.map(personCard).join('')}</div>
      <p class="center"><a class="btn" href="#/bidragsytere">${t('allPeople')}</a> <a class="btn btn-dark" href="#/program/dag">${t('dayByDay')}</a></p></div>`;
  }
  if (STATE.when === 'etter') {
    const media = DATA.items.filter(i => ['video', 'lyd', 'bilder', 'presse'].includes(i.type));
    return head + `<div class="wrap narrow"><p class="lead">${t('afterLead')}</p></div>
      <div class="wrap"><h2>${t('recorded')}</h2><div class="grid grid-4">${media.map(itemCard).join('')}</div>
      <h2>${t('enterStory')}</h2><div class="grid grid-3">${DATA.threads.filter(th => th.kind === 'forlop').map(threadCard).join('')}</div>
      <p class="center"><a class="btn" href="#/program/alle">${t('allPosts')}</a></p></div>`;
  }
  const nn = nowNext();
  const rest = DATA.program.filter(p => p.day === DEMO.day && p.start && sortKey(p.start) > DEMO.min).sort((a, b) => sortKey(a.start) - sortKey(b.start));
  return head + `<div class="wrap narrow">
    <p class="small clock">${t('demoClock')}</p>
    <section class="nowbox"><h2>${t('now')}</h2>${nn.now.length ? `<ul class="plist">${nn.now.map(x => progItem(x, { state: t('liveNow') })).join('')}</ul>` : `<p>${t('nothingNow')}</p>`}</section>
    <h2>${t('laterToday')}</h2><ul class="plist">${rest.map(x => progItem(x)).join('')}</ul>
    <details class="daily"><summary>${t('everyDay')} (${DATA.daily.length})</summary><ul class="plist">${DATA.daily.map(p => progItem(p)).join('')}</ul></details>
  </div>`;
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
function pDay() {
  const items = DATA.program.filter(p => p.day === STATE.day && (STATE.cat === 'all' || p.cat === STATE.cat)).sort((a, b) => sortKey(a.start) - sortKey(b.start));
  const daily = DATA.daily.filter(p => STATE.cat === 'all' || p.cat === STATE.cat);
  return `<div class="wrap narrow"><h1>${t('program')} ${E.year}</h1>${progTabs('program/dag')}<p class="lead">${range(E.from, E.to)}</p></div>
  <div class="sticky"><div class="wrap narrow">${dayTabs()}${catChips()}</div></div>
  <div class="wrap narrow">
    <h2 class="daytitle">${fmt(dayDate(STATE.day), { weekday: 'long', day: 'numeric', month: 'long' })}</h2>
    ${items.length ? `<ul class="plist">${items.map(p => progItem(p)).join('')}</ul>` : `<p class="empty">${t('noResults')}</p>`}
    ${daily.length && STATE.day < 5 ? `<details class="daily"><summary>${t('everyDay')} (${daily.length})</summary><ul class="plist">${daily.map(p => progItem(p)).join('')}</ul></details>` : ''}
  </div>`;
}
function pAll() {
  const q = STATE.q.trim().toLowerCase();
  const list = DATA.program.filter(p => (STATE.cat === 'all' || p.cat === STATE.cat) && (STATE.venue === 'all' || p.venue === STATE.venue)
    && (!q || (p.title + ' ' + (p.who ? DATA.people[p.who].n : '')).toLowerCase().includes(q)))
    .sort((a, b) => a.day - b.day || sortKey(a.start) - sortKey(b.start));
  return `<div class="wrap narrow"><h1>${t('program')} ${E.year}</h1>${progTabs('program/alle')}
    <div class="filters">
      <label class="field"><span>${t('search')}</span><input type="search" data-act="q" value="${esc(STATE.q)}" placeholder="${t('searchPh')}"></label>
      <label class="field"><span>${t('venue')}</span><select data-act="venue"><option value="all">${t('allVenues')}</option>${Object.keys(DATA.venues).map(k => `<option value="${k}"${STATE.venue === k ? ' selected' : ''}>${esc(venue(k))}</option>`).join('')}</select></label>
    </div>${catChips()}
    <p class="small">${t('nPosts', { n: list.length })}</p>
    ${list.length ? `<ul class="plist">${list.map(p => progItem(p, { prefix: fmt(dayDate(p.day), { weekday: 'short' }) })).join('')}</ul>` : `<p class="empty">${t('noResults')}</p>`}
  </div>`;
}

/* ---------- Én programpost ---------- */
function personBox(k) {
  const p = DATA.people[k];
  return `<a class="personbox" href="#/bidragsytere/${k}">${portrait(k, 'sm')}<span><strong>${esc(p.n)}</strong><span>${esc(p.b)}</span></span></a>`;
}
function pPost(r) {
  const p = post(r.b) || DATA.program[0], c = cat(p.cat);
  const ths = threadsFor(s => s.post === p.id);
  const others = p.who ? DATA.program.filter(x => x.who === p.who && x.id !== p.id) : [];
  const made = DATA.items.filter(i => i.post === p.id);
  return `<article class="wrap narrow">
    <p class="crumb"><a href="#/program/dag">${t('program')}</a></p>
    <p class="kicker"><span class="dot" style="background:${c.c}"></span>${L(c)}</p>
    <h1>${esc(p.title)}</h1>
    <div class="when" style="--c:${c.c}">
      <div><strong>${fmt(dayDate(p.day), { weekday: 'long', day: 'numeric', month: 'long' })}</strong><span>${p.start ? p.start + '–' + p.end : t('allDay')}</span></div>
      <div><strong>${spotOf({ v: p.venue }) ? `<a href="#/handbok/kart/${spotOf({ v: p.venue })}">${esc(venue(p.venue))}</a>` : esc(venue(p.venue))}</strong><span>${esc(DATA.venues[p.venue].d)}</span></div>
      ${starBtn(p.id)}
    </div>
    ${p.who ? personBox(p.who) : ''}
    ${ths.map(th => `<section class="story"><h2>${t('wholeStory')}</h2><p>${esc(th.lead)}</p>${stepsList(th, p.id)}<a class="more" href="#/historier/${th.id}">${esc(th.title)}</a></section>`).join('')}
    ${!ths.length && made.length ? `<h2>${t('madeHere')}</h2><div class="grid grid-2">${made.map(itemCard).join('')}</div>` : ''}
    ${others.length ? `<h2>${t('moreFrom')} ${esc(DATA.people[p.who].n)}</h2><ul class="plist">${others.map(x => progItem(x, { prefix: fmt(dayDate(x.day), { weekday: 'long' }) })).join('')}</ul>` : ''}
  </article>`;
}

/* ---------- Historier og temaer ---------- */
function stepsList(th, currentId) {
  return `<ol class="steps">${th.steps.map(s => {
    let when, tag, title, note = s.note || '', href = '', ex = s.ex, color = '';
    if (s.post) { const p = post(s.post); when = whenOf(p); tag = t('programPost'); title = p.title; href = '#/program/' + p.id; note = note || venue(p.venue); color = cat(p.cat).c; }
    else if (s.item) { const it = item(s.item); when = it.date; tag = L(DATA.itemTypes[it.type]); title = it.title; href = '#/innhold/' + it.id; ex = it.mock; note = note || itemBy(it); }
    else { when = s.when; tag = ''; title = s.t; }
    const cur = s.post && s.post === currentId;
    return `<li class="${cur ? 'cur' : ''}${s.item ? ' has-item' : ''}"${color ? ` style="--c:${color}"` : ''}>
      <p class="step-when">${esc(when)}</p>
      <h3>${href && !cur ? `<a href="${href}">${esc(title)}</a>` : esc(title)}</h3>
      <p class="step-note">${tag ? `<span class="tag">${tag}</span> ` : ''}${ex ? `<span class="tag tag-ex">${t('example')}</span> ` : ''}${esc(note)}</p>
    </li>`; }).join('')}</ol>`;
}
function threadCard(th) {
  return `<a class="card story-card" href="#/${th.kind === 'tema' ? 'tema' : 'historier'}/${th.id}">
    <div class="card-img">${img(th.img, '')}<span class="thread-line" aria-hidden="true"></span></div>
    <div class="card-body"><h3>${esc(th.title)}</h3><p>${esc(th.lead)}</p><p class="small">${t('nSteps', { n: th.steps.length })}</p></div></a>`;
}
function pStories() {
  const stories = DATA.threads.filter(th => th.kind === 'forlop'), themes = DATA.threads.filter(th => th.kind === 'tema');
  return `<div class="wrap">
    <h1>${t('stories')}</h1><p class="lead narrowtext">${t('storiesLead')}</p>
    <h2>${t('enterStory')}</h2><p class="blocklead">${t('enterStoryLead')}</p>
    <div class="grid grid-3">${stories.map(threadCard).join('')}</div>
    <h2>${t('themes')}</h2><p class="blocklead">${t('themesLead')}</p>
    <div class="themes">${themes.map(themeChip).join('')}</div>
    <h2>${t('allContent')}</h2><p class="blocklead">${t('allContentLead')}</p>
    <div class="grid grid-4">${DATA.items.filter(i => i.id !== 'manifest').map(itemCard).join('')}</div>
    <h2>${t('venues')}</h2>
    <ul class="venues grid grid-3">${Object.keys(DATA.venues).map(k => { const n = DATA.program.filter(p => p.venue === k).length;
      const sp = spotOf({ v: k });
      return `<li><h3>${esc(DATA.venues[k].n)}</h3><p>${esc(DATA.venues[k].d)}</p>${n ? `<p class="small">${t('nPosts', { n })}</p>` : ''}${sp ? `<a class="more" href="#/handbok/kart/${sp}">${t('seeOnMap')}</a>` : ''}</li>`; }).join('')}</ul>
  </div>`;
}
function pThread(r) {
  const th = byId(DATA.threads, r.b) || DATA.threads[0];
  const people = [...new Set(th.steps.map(s => (s.post && post(s.post).who) || (s.item && item(s.item).who)).filter(Boolean))];
  return `<article class="wrap narrow">
    <p class="crumb"><a href="#/historier">${t('stories')}</a></p>
    <p class="kicker">${th.kind === 'tema' ? t('theme') : t('story')}</p>
    <h1>${esc(th.title)}</h1>
    <figure class="work-img">${img(th.img, '')}</figure>
    <p class="lead">${esc(th.lead)}</p>
    ${people.map(personBox).join('')}
    ${stepsList(th)}
  </article>`;
}
function itemCard(it) {
  return `<a class="card item" href="#/innhold/${it.id}">
    <div class="card-img">${img(it.img, '')}${it.type === 'video' || it.type === 'lyd' ? '<span class="play small-play" aria-hidden="true"></span>' : ''}</div>
    <div class="card-body"><p class="kicker">${L(DATA.itemTypes[it.type])}${it.mock ? ` <span class="tag tag-ex">${t('example')}</span>` : ''}</p><h3>${esc(it.title)}</h3><p class="small">${esc(itemBy(it))}, ${esc(it.date)}</p></div>
  </a>`;
}
function pItem(r) {
  const w = item(r.b) || DATA.items[0];
  const media = w.type === 'video' || w.type === 'lyd'
    ? `<div class="player ${w.type}">${img(w.img, '')}<span class="play" aria-hidden="true"></span><p>${t('mockMedia')}</p></div>`
    : w.gallery ? `<div class="gallery">${w.gallery.map(g => `<figure>${img(g, '')}<figcaption>${t('photoMissing')}</figcaption></figure>`).join('')}</div>`
    : `<figure class="work-img">${img(w.img, '')}</figure>`;
  const ths = threadsFor(s => s.item === w.id);
  return `<article class="wrap narrow work-page">
    <p class="crumb"><a href="#/historier">${t('stories')}</a></p>
    <p class="kicker">${L(DATA.itemTypes[w.type])}${w.mock ? ` <span class="tag tag-ex">${t('example')}</span>` : ''}</p>
    <h1>${esc(w.title)}</h1>
    ${media}
    ${w.body.map((p, i) => `<p class="${i === 0 ? 'lead' : ''}">${facts(p)}</p>`).join('')}
    ${w.who ? personBox(w.who) : ''}
    <dl class="meta">
      ${w.who ? '' : `<div><dt>${t('contributor')}</dt><dd>${esc(w.by)}</dd></div>`}
      <div><dt>${t('published')}</dt><dd>${esc(w.date)}</dd></div>
      <div><dt>${t('licence')}</dt><dd>${esc(w.lic)}</dd></div>
    </dl>
    ${workPlace(w)}
    ${ths.map(th => `<section class="story"><h2>${t('partOf')}: ${esc(th.title)}</h2>${stepsList(th)}</section>`).join('')}
  </article>`;
}

/* ---------- Blogg ---------- */
function pBlog() {
  const posts = DATA.posts.slice().sort((a, b) => b.date.localeCompare(a.date));
  return `<div class="wrap"><h1>${t('blog')}</h1><p class="lead narrowtext">${t('blogLead')}</p><div class="grid grid-3">${posts.map(postCard).join('')}</div></div>`;
}
function pBlogPost(r) {
  const p = byId(DATA.posts, r.b) || DATA.posts[0];
  let embed = '';
  if (p.embed && p.embed.thread) { const th = byId(DATA.threads, p.embed.thread); embed = `<section class="story embed"><p class="kicker">${th.kind === 'tema' ? t('theme') : t('story')}</p><h2>${esc(th.title)}</h2>${stepsList(th)}</section>`; }
  if (p.embed && p.embed.item) embed = `<div class="embed-card">${itemCard(item(p.embed.item))}</div>`;
  return `<article class="wrap narrow">
    <p class="crumb"><a href="#/nytt">${t('blog')}</a></p>
    <p class="kicker">${fmt(iso(p.date), { day: 'numeric', month: 'long', year: 'numeric' })} · ${esc(p.by)}</p>
    <h1>${esc(p.title)}</h1><figure class="work-img">${img(p.img, '')}</figure>
    <p class="lead">${facts(p.lead)}</p>${p.body.map(b => `<p>${facts(b)}</p>`).join('')}${embed}
  </article>`;
}

/* ---------- Bidragsytere ---------- */
function personCard(k) {
  const p = DATA.people[k];
  return `<a class="pcard" href="#/bidragsytere/${k}">${portrait(k)}<span class="pcard-body"><strong>${esc(p.n)}</strong><span>${L(cat(p.k))}</span></span></a>`;
}
function pPeople() {
  return `<div class="wrap"><h1>${t('people')} ${E.year}</h1>${progTabs('bidragsytere')}<p class="lead narrowtext">${t('peopleLead')}</p>
    <div class="pgrid">${Object.keys(DATA.people).map(personCard).join('')}</div></div>`;
}
function pPerson(r) {
  const k = DATA.people[r.b] ? r.b : Object.keys(DATA.people)[0], p = DATA.people[k];
  const posts = DATA.program.filter(x => x.who === k), made = DATA.items.filter(i => i.who === k);
  const ths = threadsFor(s => (s.post && post(s.post).who === k) || (s.item && item(s.item).who === k));
  return `<article class="wrap narrow"><p class="crumb"><a href="#/bidragsytere">${t('people')}</a></p>
    <div class="phead">${portrait(k, 'lg')}<div><p class="kicker"><span class="dot" style="background:${cat(p.k).c}"></span>${L(cat(p.k))}</p><h1>${esc(p.n)}</h1><p class="lead">${esc(p.b)}</p></div></div>
    <p class="small">${t('photoComingLong')}</p>
    ${p.long ? `<p>${esc(p.long)}</p>` : ''}
    ${p.links && p.links.length ? `<p class="links">${p.links.map(l => typeof l === 'string' ? `<a class="chiplink" href="#/bidragsytere/${k}">${esc(l)}</a>` : `<a class="chiplink" href="${esc(l.u)}" target="_blank" rel="noopener">${esc(l.t)}</a>`).join('')}</p>` : ''}
    ${posts.length ? `<h2>${t('inProgram')}</h2><ul class="plist">${posts.map(x => progItem(x, { prefix: fmt(dayDate(x.day), { weekday: 'long' }) })).join('')}</ul>` : ''}
    ${made.length ? `<h2>${t('madeHere')}</h2><div class="grid grid-2">${made.map(itemCard).join('')}</div>` : ''}
    ${ths.map(th => `<section class="story"><h2>${t('wholeStory')}</h2><p>${esc(th.lead)}</p>${stepsList(th)}</section>`).join('')}
  </article>`;
}

/* ---------- Håndboka ---------- */
const GROUP_ICON = {
  styret: 'M4 20h16M6 20V10M10 20V10M14 20V10M18 20V10M3 10l9-6 9 6z', koord: 'M12 3a9 9 0 100 18 9 9 0 000-18zm0 4v5l3 2',
  program: 'M9 18V5l11-2v13M9 18a3 3 0 11-6 0 3 3 0 016 0zm11-2a3 3 0 11-6 0 3 3 0 016 0z', marked: 'M3 11l15-6v14L3 13zM7 12v6h3',
  logistikk: 'M3 15h18M5 15l2-6h10l2 6M7 19a2 2 0 100-4 2 2 0 000 4zm10 0a2 2 0 100-4 2 2 0 000 4zM2 21h20', vertskap: 'M4 21V9l8-6 8 6v12M10 21v-6h4v6',
  kjokken: 'M6 3v8a2 2 0 004 0V3M8 11v10M16 3c-2 2-2 6 0 8v10', praktisk: 'M14 6l4-3 3 3-3 4M14 6L4 16l4 4 10-10M14 6l4 4',
  miljo: 'M12 21c-5-3-8-7-8-11a8 8 0 0116 0c0 4-3 8-8 11zM12 21V9', barn: 'M12 7a3 3 0 100-6 3 3 0 000 6zM6 21l2-9h8l2 9M4 12l4-2M20 12l-4-2',
  media: 'M4 5h16v11H8l-4 4zM8 9h8M8 12h5'
};
const groupIcon = (g, size) => `<span class="gicon" style="--g:${DATA.groups[g].c}"><svg viewBox="0 0 24 24" width="${size || 22}" height="${size || 22}" aria-hidden="true"><path d="${GROUP_ICON[g] || GROUP_ICON.koord}"/></svg></span>`;
function groupLink(k) {
  const g = DATA.groups[k];
  return `<li><a href="#/handbok/gruppe/${k}">${groupIcon(k)}<span><strong>${esc(g.n)}</strong><span>${esc(g.d)}</span></span></a></li>`;
}
function rhythmList() {
  return `<ul class="rhythm">
    <li><strong>${facts('{movement}')}</strong>${t('rMove')}</li><li><strong>${facts('{breakfast}')}</strong>${t('rBreakfast')}</li>
    <li><strong>12:30</strong>${t('rGroups')}</li><li><strong>${facts('{kidsMeal}')}</strong>${t('rKids')}</li>
    <li><strong>${facts('{dinner}')}</strong>${t('rDinner')} (${t('friSat')} ${facts('{dinnerWeekend}')})</li></ul>`;
}
function pHandbook() {
  return `<div class="hb-hero"><div class="wrap">
      <p class="kicker">${t('handbook')} · ${t('version')} 10 (${t('draft')})</p>
      <h1>${t('hbTitle')}</h1><p class="lead narrowtext">${t('hbLead')}</p>
      <p class="actions"><button class="btn btn-dark" data-act="print">${t('printShort')}</button><a class="btn" href="#/handbok/delta">${t('howJoin')}</a></p>
    </div></div>
    <div class="wrap">
      <p class="note">${t('factsNote')}</p>
      <a class="map-teaser" href="#/handbok/kart"><span class="mt-img">${areaSVG({ labels: false, interactive: false })}</span><span class="mt-body"><strong>${t('mapTitle')}</strong><span>${t('mapTeaser')}</span><span class="more">${t('mapOpen')}</span></span></a>
      <h2>${t('hbEditions')}</h2>
      <div class="hb-editions">
        <div class="hb-ed"><strong>${t('hbEdOnline')}</strong><p>${t('hbEdOnlineD')}</p></div>
        <div class="hb-ed"><strong>${t('hbEdPaper')}</strong><p>${t('hbEdPaperD')}</p><button class="btn" data-act="print">${t('hbEdPaperBtn')}</button></div>
        <div class="hb-ed"><strong>${t('hbEdBooklet')}</strong><p>${t('hbEdBookletD')}</p><a class="btn" href="#/verktoykasse">${t('hbEdBookletBtn')}</a></div>
      </div>
      <div class="chapters">${DATA.chapters.map(ch => `<a class="chapter" href="#/handbok/${ch.id}"><span class="ch-img">${img(ch.img, '')}</span><span class="ch-body"><strong>${esc(L(ch.title))}</strong><span>${facts(L(ch.core))}</span></span></a>`).join('')}</div>
      <h2>${t('festGroups')} ${E.next.from.slice(0, 4)}</h2><ul class="grouplist">${DATA.festivalGroups.map(groupLink).join('')}</ul>
      <h2>${t('prepGroups')}</h2><ul class="grouplist">${DATA.prepGroups.map(groupLink).join('')}</ul>
      <h2>${t('organs')}</h2><ul class="grouplist">${['styret', 'koord'].map(groupLink).join('')}</ul>
      <p class="small">${t('hbPhotos')}</p>
    </div>
    <div class="print-only">${printShort()}</div>`;
}
function printShort() {
  return `<h1>Karlsøyfestivalen ${E.next.from.slice(0, 4)} – ${t('shortVersion')}</h1>${DATA.chapters.map(ch => `<h2>${esc(L(ch.title))}</h2><p>${factsPlain(L(ch.core))}</p>`).join('')}
    <h2>${t('festGroups')}</h2><ul>${DATA.festivalGroups.map(g => `<li><strong>${esc(groupName(g))}</strong>: ${esc(DATA.groups[g].d)}</li>`).join('')}</ul>`;
}
function pChapter(r) {
  const ch = byId(DATA.chapters, r.b) || DATA.chapters[0], i = DATA.chapters.indexOf(ch), nx = DATA.chapters[i + 1];
  return `<article class="wrap narrow chapter-page">
    <p class="crumb"><a href="#/handbok">${t('handbook')}</a></p>
    <h1>${esc(L(ch.title))}</h1>
    <figure class="work-img">${img(ch.img, '')}<figcaption>${t('photoBy')} Håndboka v9.1</figcaption></figure>
    <div class="core"><p class="core-label">${t('coreLabel')}</p><p>${facts(L(ch.core))}</p></div>
    ${ch.rhythm ? rhythmList() : ''}
    ${ch.more.map(p => `<p>${facts(p)}</p>`).join('')}
    ${ch.quote ? `<blockquote><p>${esc(ch.quote.nb)}</p><cite>${esc(ch.quote.src)}</cite></blockquote>` : ''}
    ${ch.principles ? `<h2>${t('principles')}</h2><ol class="principles">${DATA.principles.map(p => `<li><strong>${esc(p[0])}</strong><p>${esc(p[1])}</p></li>`).join('')}</ol>` : ''}
    ${ch.wheelImg ? `<h2>${t('yearWheel')}</h2><figure class="work-img">${img('hb-arshjul-gammelt', t('oldWheel'))}<figcaption>${t('oldWheel')}</figcaption></figure>` : ''}
    ${ch.id === 'delta' ? `<h2>${t('boardExample')}</h2><ul class="tlist">${DATA.tavla.slice(0, 2).map(c => boardCard(c, true)).join('')}</ul>` : ''}
    <p class="edit-note">${t('editNote')}</p>
    ${nx ? `<a class="nextch" href="#/handbok/${nx.id}"><span>${t('next')}</span><strong>${esc(L(nx.title))}</strong></a>` : ''}
  </article>`;
}
function groupBody(k, inside) {
  const g = DATA.groups[k];
  const dl = DATA.deadlines.filter(d => d.g === k).sort((a, b) => a.m - b.m || a.d - b.d);
  const year = E.next.from.slice(0, 4), key = k + year, done = STATE.checks[key] || [];
  const list = inside
    ? `<ul class="todo">${g.tasks.map((x, i) => `<li><label><input type="checkbox" data-act="check" data-v="${k}|${i}"${done.includes(i) ? ' checked' : ''}><span>${esc(x)}</span></label></li>`).join('')}</ul><p class="small">${t('todoNote', { n: done.length, m: g.tasks.length, y: year })}</p>`
    : `<ul class="ticks">${g.tasks.map(x => `<li>${esc(x)}</li>`).join('')}</ul>`;
  return `<p class="lead">${esc(g.d)}</p>
    <h2>${t('tasks')}</h2>${list}
    ${dl.length ? `<h2>${t('dates')}</h2><ul class="dl">${dl.map(d => `<li><time>${d.d}. ${monthName(d.m)}</time>${esc(d.t)}</li>`).join('')}</ul>` : ''}
    <div class="gives"><h2>${t('groupGives')}</h2><ul class="givelist"><li>${t('gFiles')}</li><li>${t('gCal')}</li><li>${t('gList')}</li><li>${t('gColor')}</li><li>${t('gDiscord')}</li></ul></div>`;
}
function pGroup(r) {
  const k = DATA.groups[r.c] ? r.c : 'kjokken', g = DATA.groups[k];
  return `<article class="wrap narrow"><p class="crumb"><a href="#/handbok">${t('handbook')}</a></p>
    <h1 class="gtitle">${groupIcon(k, 30)}${esc(g.n)}</h1>${groupBody(k, false)}</article>`;
}

/* ---------- Praktisk ---------- */
function pPractical() {
  return `<div class="wrap narrow">
    <h1>${t('practical')}</h1>
    <ul class="factgrid">
      <li><strong>${facts('{price}')} kr</strong>${t('passAdult')}</li>
      <li><strong>0 kr</strong>${t('under')} ${facts('{freeUnder}')} ${t('years')}</li>
      <li><strong>${facts('{breakfast}')} · ${facts('{dinner}')}</strong>${t('meals')}</li>
      <li><strong>${fmt(iso(E.next.from), { day: 'numeric', month: 'short' })} – ${fmt(iso(E.next.to), { day: 'numeric', month: 'short' })}</strong>${t('nextFestival')}</li>
    </ul>
    <section class="checkin"><h2>${t('buyPass')}</h2><div class="iframe-ph"><strong>Checkin</strong><span>${t('checkinNote')}</span></div></section>
    <p class="note">${t('factsNote')}</p>
    <h2>${t('faq')}</h2>
    <div class="faq">${DATA.faq.map(f => `<details><summary>${esc(f[0])}</summary><p>${facts(f[1])}</p></details>`).join('')}</div>
    <a class="map-teaser" href="#/handbok/kart"><span class="mt-img">${islandSVG({ labels: false, interactive: false })}</span><span class="mt-body"><strong>${t('mapTitle')}</strong><span>${t('mapTeaser')}</span><span class="more">${t('mapOpen')}</span></span></a>
    <figure class="work-img">${img('hb-ferga', '')}<figcaption>${t('ferryCap')}</figcaption></figure>
  </div>`;
}

/* ---------- Live ---------- */
function pLive() {
  const nn = nowNext(), n = nn.now[0];
  if (!liveNow()) return `<div class="wrap narrow"><h1>${t('live')}</h1><p class="empty">${t('noLive')}</p><a class="btn" href="#/program">${t('thisHappens')}</a></div>`;
  return `<div class="wrap narrow">
    <h1>${t('live')}</h1>
    <div class="player video">${img('storscenen', '')}<span class="play" aria-hidden="true"></span><p>${t('mockMedia')}</p></div>
    <p class="small">${t('audioOnly')}</p>
    ${n ? `<h2>${t('liveNow')}</h2><ul class="plist">${progItem(n)}</ul>` : ''}
    <h2>${t('laterToday')}</h2><ul class="plist">${nn.next.map(p => progItem(p)).join('')}</ul>
  </div>`;
}

/* ---------- Om prototypen ---------- */
function pAbout() {
  return `<div class="wrap narrow about">
    <h1>${t('about')}</h1>
    <p class="lead">Dette er en klikkbar skisse av nettsiden og innsiden til Karlsøyfestivalen, laget til kravspesifikasjonen for det digitale løftet (utkast 2). Den finnes i to utgaver: <a href="index.html">fase 1</a>, med det som skal virke til festivalen 2027, og <a href="fase2.html">fase 2</a>, med de valgfrie tilleggene merket «${t('phase2')}».</p>
    <h2>Prøv dette</h2>
    <ul class="ticks">
      <li>Bytt mellom <strong>${t('whenBefore')}</strong>, <strong>${t('whenDuring')}</strong> og <strong>${t('whenAfter')}</strong> i stripa øverst. Program-siden, forsiden og Live endrer seg.</li>
      <li>Åpne Program i menyen: Dette skjer, Dag for dag, Alle programposter og Bidragsytere.</li>
      <li>Gå inn i <a href="#/historier/urfolk">historien om urfolks rettigheter</a>, fra kunngjøring til avisoppslag.</li>
      <li>Les <a href="#/handbok">håndboka</a> og skriv ut den korte utgaven. Tall med prikket strek er faste fakta som settes ett sted.</li>
      <li>Logg inn og bytt mellom fire eksempelbrukere. Se Tavla, Folk, kunngjøringer og gruppas huskeliste.</li>
      <li>Som Sindre i driftsgruppa: se driftsmeldingene og prøv reparer-kommandoen.</li>
      ${F2 ? '<li>Fase 2: Discord-kanaler i et vindu, møterom, oppgaver med roller, kvitteringer, medlemskap, husutleie, arkiv og verktøykasse.</li>' : ''}
    </ul>
    <h2>Navn som kan diskuteres</h2>
    <table><tr><th>I prototypen</th><th>Andre forslag</th><th>I Hypa Poiesis</th></tr>
      <tr><td>Historier</td><td>Opplev festivalen, Dykk ned i festivalen, Historier fra festivalen</td><td>Dialoger</td></tr>
      <tr><td>Temaer</td><td>I fokus, Tråder</td><td>Dialoger (katalog)</td></tr>
      <tr><td>Innhold (video, bilder, tekst)</td><td></td><td>Verk</td></tr>
      <tr><td>Nytt (blogg)</td><td>Siste fra festivalen</td><td></td></tr></table>
    <h2>Hva som er ekte, og hva som er eksempler</h2>
    <table>
      <tr><th>Ekte, fra kildene</th><td>Program 2026, steder, kategorier, bidragsytere og omtaler, manifest, grupper, huskelister, frister, prinsipper, FAQ, tekst fra håndboka og bookleten, bilder fra håndboka og nettsiden.</td></tr>
      <tr><th>Eksempler</th><td>Opptak, avisoppslag, blogginnlegg, brukerne Mari, Jonas, Aila og Sindre, deltakerlista, kunngjøringer, Tavla-kort, samreise, statuser, driftsmeldinger${F2 ? ', oppgaver, kvitteringer, husbookinger og arkiv' : ''}.</td></tr>
      <tr><th>Mangler</th><td>Portretter av bidragsytere (plassholdere med initialer), fotograf og lisens på flere bilder, innhold på engelsk.</td></tr>
    </table>
    <h2>Teknisk</h2>
    <p>Ren HTML, CSS og JavaScript uten byggesteg, slik at den kan ligge på Codeberg Pages. Den ferdige løsningen skal bygges med Django og Wagtail, med Vue for de interaktive delene. All data ligger i <code>js/data.js</code> og <code>js/data-extra.js</code>. Det du gjør lagres bare i din egen nettleser.</p>
    <p>Fargene bygger på hovedpaletten (rød, hvit, grå, gråbrun og mørk gråbrun) og regnbuefargene fra logoen.</p>
  </div>`;
}

/* ====================================================================
   INNSIDEN – etter innlogging
   ==================================================================== */
function nowNext() {
  const today = DATA.program.filter(p => p.day === DEMO.day && p.start).sort((a, b) => sortKey(a.start) - sortKey(b.start));
  const now = today.filter(p => sortKey(p.start) <= DEMO.min && sortKey(p.end) > DEMO.min && p.cat !== 'arbeid');
  const next = today.filter(p => sortKey(p.start) > DEMO.min).slice(0, 4);
  return { now, next };
}
const ICON = {
  home: 'M4 11l8-7 8 7v9h-5v-6H9v6H4z', star: 'M12 3.2l2.7 5.6 6.1.8-4.5 4.3 1.1 6.1L12 17.1 6.6 20l1.1-6.1-4.5-4.3 6.1-.8z',
  board: 'M4 4h7v9H4zM13 4h7v5h-7zM13 11h7v9h-7zM4 15h7v5H4z', folk: 'M8 11a3 3 0 100-6 3 3 0 000 6zm8 0a3 3 0 100-6 3 3 0 000 6zM2 20c0-3.3 2.7-6 6-6s6 2.7 6 6zm12.5 0c0-2-.7-3.8-1.9-5.2.9-.5 2-.8 3.4-.8 3.3 0 6 2.7 6 6z',
  more: 'M4 6h16M4 12h16M4 18h16', mail: 'M3 6h18v12H3zM3 7l9 6 9-6', cal: 'M5 5h14v15H5zM5 9h14M9 3v4M15 3v4'
};
const mailUser = () => levelAtLeast('medlem');
function insideTabs(r) {
  const tabs = F2 && mailUser()
    ? [['', 'dash', 'home'], ['epost', 'mail', 'mail'], ['kalender', 'calendar', 'cal'], ['tavla', 'board', 'board'], ['mer', 'more', 'more']]
    : [['', 'dash', 'home'], ['program', 'myProgram', 'star'], ['tavla', 'board', 'board'], ['folk', 'folk', 'folk'], ['mer', 'more', 'more']];
  return `<nav class="tabs" aria-label="${t('menu')}">${tabs.map(([h, k, ic]) => { const n = h === 'epost' ? unreadMail() : 0;
    return `<a href="#/inn${h ? '/' + h : ''}"${r.b === h ? ' aria-current="page"' : ''}><svg viewBox="0 0 24 24" width="24" height="24" aria-hidden="true"><path d="${ICON[ic]}"/></svg><span>${t(k)}</span>${n ? `<span class="tabbadge">${n}</span>` : ''}</a>`; }).join('')}</nav>`;
}
function insideShell(r) {
  const pages = { '': iDash, program: iMyProgram, tavla: iBoard, folk: iFolk, kunngjoringer: iAnnounce, arshjul: iWheel, gruppe: iGroup,
    koordinering: iCoord, samreise: iRides, mer: iMore, verktoy: iTool, drift: iOps,
    oppgaver: F2 ? iTasks : iDash, epost: F2 ? iMail : iDash, kalender: F2 ? iCal : iDash, utlegg: F2 ? iReceipts : iDash, medlemskap: F2 ? iMember : iDash, moterom: F2 ? iVoice : iDash, husutleie: F2 ? iHouseAdmin : iDash };
  const p = persona();
  return `
  <header class="itop">
    <a class="brand" href="#/" title="${t('toSite')}"><img src="assets/logo.png" alt="" width="44" height="31"><span>Karlsøyfestivalen</span></a>
    <a class="homepill" href="#/inn"${r.b === '' ? ' aria-current="page"' : ''}><svg viewBox="0 0 24 24" width="18" height="18" aria-hidden="true"><path d="${ICON.home}"/></svg><span class="sr">${t('loggedIn')}: </span>${t('dash')}</a>
    <button class="who" data-act="sheet" aria-expanded="${STATE.sheet}"><span class="avatar">${p.name[0]}</span><span><strong>${p.name}</strong><span>${L(p.role)}</span></span></button>
  </header>
  ${STATE.sheet ? `<div class="sheet" role="dialog" aria-label="${t('viewAs')}">
      <h2>${t('viewAs')}</h2>
      <div class="rolelist">${Object.keys(DATA.personas).map(k => `<button data-act="persona" data-v="${k}" aria-pressed="${STATE.persona === k}"><span class="avatar">${DATA.personas[k].name[0]}</span><span><strong>${DATA.personas[k].name}</strong><span>${L(DATA.personas[k].role)}</span></span></button>`).join('')}</div>
      <p class="small">${t('sampleUsers')}</p>
      <div class="sheet-foot">${langSelect()}<a class="btn" href="#/" data-act="logout">${t('logout')}</a><button class="btn btn-dark" data-act="sheet">${t('close')}</button></div>
    </div>` : ''}
  <div class="ishell">${insideTabs(r)}<main id="main" class="imain">${(pages[r.b] || iDash)(r)}</main></div>
  ${F2 ? (STATE.chat ? chatPop() : chatFab()) : ''}`;
}

/* ---------- Kunngjøringer fra Discord ---------- */
function announceFor(groups) { return DATA.announce.filter(a => a.ch === 'alle' || groups.includes(a.ch)); }
function announceList(list) {
  return `<ul class="alist">${list.map(a => `<li${a.ch !== 'alle' ? ` style="--g:${DATA.groups[a.ch].c}"` : ''}><p class="a-meta"><strong>${a.ch === 'alle' ? t('toAll') : esc(groupName(a.ch))}</strong> · ${esc(a.from)}, ${esc(a.when)}</p><p>${facts(a.t)}</p></li>`).join('')}</ul>`;
}
function iAnnounce() {
  const g = myGroups();
  return `<h1>${t('announcements')}</h1><p class="lead">${t('announceLead')}</p>
    <h2>${t('toAll')}</h2>${announceList(DATA.announce.filter(a => a.ch === 'alle'))}
    ${g.map(x => { const l = DATA.announce.filter(a => a.ch === x); return l.length ? `<h2 class="gtitle">${groupIcon(x)}${esc(groupName(x))}</h2>${announceList(l)}` : ''; }).join('')}
    <p><a class="btn" href="#/inn/kunngjoringer">${t('openDiscord')}</a></p>`;
}

/* ---------- Dashbord ---------- */
function deadlineRows(groups, n) {
  const rows = DATA.deadlines.filter(d => groups.includes(d.g)).map(d => Object.assign({ nx: nextDate(d) }, d)).sort((a, b) => a.nx.days - b.nx.days).slice(0, n);
  return rows.length ? `<ul class="dlist">${rows.map(d => `<li><span class="swatch" style="background:${DATA.groups[d.g].c}"></span><div><strong>${esc(d.t)}</strong><span>${esc(DATA.groups[d.g].n)}</span></div><time>${fmt(d.nx.date, { day: 'numeric', month: 'short' })}<span>${inDays(d.nx.days)}</span></time></li>`).join('')}</ul>`
    : `<p class="empty">${t('noDeadlines')}</p>`;
}
function energyDots(n) { return `<span class="energy e${n}" title="${esc(L(DATA.energy[n]))}">${[1, 2, 3].map(i => `<i class="${i <= n ? 'on' : ''}"></i>`).join('')}<span>${L(DATA.energy[n])}</span></span>`; }
function boardCard(c, compact) {
  const mine = STATE.taken.includes(c.id), g = DATA.groups[c.g];
  return `<li class="tcard p-${c.p}${mine ? ' mine' : ''}" style="--g:${g.c}">
    <div class="tc-top"><span class="tag p">${t(c.p)}</span><span class="tc-kind">${t(c.kind === 'rolle' ? 'role' : 'task')}</span></div>
    <h3>${esc(c.t)}</h3><p class="tc-d">${esc(c.d)}</p>
    <dl class="tc-meta"><div><dt>${t('group')}</dt><dd>${groupIcon(c.g, 16)}${esc(g.n)}</dd></div><div><dt>${t('guide')}</dt><dd>${esc(c.los)}</dd></div>
      <div><dt>${t('when')}</dt><dd>${esc(c.time)}</dd></div><div><dt>${t('where')}</dt><dd>${esc(venue(c.where))}</dd></div></dl>
    ${energyDots(c.energy)}
    ${compact ? '' : `<button class="btn ${mine ? '' : 'btn-dark'}" data-act="take" data-v="${c.id}">${mine ? t('release') : t('take')}</button>`}
  </li>`;
}
function shortcuts() {
  const all = [['files', 'medlem', 'M4 5h6l2 2h8v12H4z'], ['calendar', 'medlem', 'M5 5h14v15H5zM5 9h14M9 3v4M15 3v4'], ['vault', 'medlem', 'M6 10V8a6 6 0 0112 0v2M5 10h14v11H5zM12 14v3'],
    ['mail', 'verv', 'M3 6h18v12H3zM3 7l9 6 9-6'], ['streaming', 'verv', 'M4 6h12v12H4zM16 10l5-3v10l-5-3'], ['editHandbook', 'medlem', 'M5 4h11l3 3v13H5zM8 9h8M8 13h8M8 17h5']];
  const list = all.filter(s => levelAtLeast(s[1]));
  return list.length ? `<section class="panel"><h2>${t('tools')}</h2><div class="tiles">${list.map(([k, , d]) =>
    `<a href="${F2 && k === 'mail' ? '#/inn/epost' : F2 && k === 'calendar' ? '#/inn/kalender' : '#/inn/verktoy/' + k}"><svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="${d}"/></svg>${t(k)}</a>`).join('')}</div><p class="small">${t('sso')}</p></section>` : '';
}
function iDash() {
  const p = persona(), g = myGroups()[0], grp = DATA.groups[g];
  let html = `<div class="greet"><h1>${t('hello')}, ${p.name}</h1><p class="small">${during() ? t('demoClock') : STATE.when === 'for' ? t('modeBefore') : t('modeAfter')}</p></div>`;
  if (STATE.persona === 'drift') html += opsPanel(true);
  if (F2 && mailUser() && !during()) html += mailPanel() + calPanel();
  const ann = announceFor(myGroups()).slice(0, 3);
  if (during()) {
    const nn = nowNext();
    const favNext = DATA.program.filter(x => STATE.fav.includes(x.id) && x.day === DEMO.day && sortKey(x.start) > DEMO.min).sort((a, b) => sortKey(a.start) - sortKey(b.start));
    html += `<section class="panel now"><h2>${t('nowNext')}</h2><ul class="plist">${nn.now.slice(0, 2).map(x => progItem(x, { state: t('liveNow') })).join('')}${nn.next.slice(0, 3).map(x => progItem(x)).join('')}</ul>
      <a class="more" href="#/program">${t('thisHappens')}</a></section>
    ${favNext.length ? `<section class="panel"><h2>${t('myProgram')}</h2><ul class="plist">${favNext.map(x => progItem(x)).join('')}</ul></section>` : ''}
    <section class="panel"><h2>${t('announcements')}</h2>${announceList(ann)}<a class="more" href="#/inn/kunngjoringer">${t('allAnnouncements')}</a></section>
    <section class="panel group" style="--g:${grp.c}"><h2 class="gtitle">${groupIcon(g)}${t('yourGroup')}: ${esc(grp.n)}</h2><p>${t('meetsAt')} ${g === 'kjokken' ? 'Kjøkkenet' : 'Deltakerhuben'}, 12:30.</p>${DATA.groupToday[g] ? `<p><strong>${t('today')}:</strong> ${facts(DATA.groupToday[g])}</p>` : ''}<a class="more" href="#/inn/gruppe">${esc(grp.n)}</a></section>
    <section class="panel"><h2>${t('board')}</h2><ul class="tlist">${DATA.tavla.filter(c => c.p === 'kritisk' || STATE.taken.includes(c.id)).slice(0, 2).map(c => boardCard(c)).join('')}</ul><a class="more" href="#/inn/tavla">${t('wholeBoard')}</a></section>
    <section class="panel care"><h2>${t('care')}</h2><p>${t('careSub')}</p></section>`;
  } else {
    if (levelAtLeast('medlem')) {
      html += `<section class="panel"><h2>${t('deadlines')}</h2>${deadlineRows(myGroups(), 5)}<p class="monthly"><span class="swatch" style="background:${DATA.groups.koord.c}"></span>${esc(DATA.monthly.t)}</p><a class="more" href="#/inn/arshjul">${t('yearWheel')}</a></section>`;
    } else {
      const days = Math.max(0, Math.round((iso(E.next.from) - new Date()) / 864e5));
      html += `<section class="panel count"><h2>${t('nextFestival')}</h2><p class="big">${range(E.next.from, E.next.to)}</p><p>${inDays(days)}</p></section>`;
    }
    html += `<section class="panel"><h2>${t('announcements')}</h2>${announceList(ann)}<a class="more" href="#/inn/kunngjoringer">${t('allAnnouncements')}</a></section>`;
    const key = g + E.next.from.slice(0, 4), done = (STATE.checks[key] || []).length;
    html += `<section class="panel group" style="--g:${grp.c}"><h2 class="gtitle">${groupIcon(g)}${t('yourGroup')}: ${esc(grp.n)}</h2><p>${esc(grp.d)}</p><div class="progress"><span style="width:${Math.round(done / grp.tasks.length * 100)}%"></span></div><p class="small">${t('todoNote', { n: done, m: grp.tasks.length, y: E.next.from.slice(0, 4) })}</p><a class="more" href="#/inn/gruppe">${t('tasks')}</a></section>`;
    if (levelAtLeast('verv')) {
      const mine = DATA.bidrag.filter(b => b.mine), open = mine.reduce((n, b) => n + b.open.length, 0);
      html += `<section class="panel"><h2>${t('yourContrib')}</h2><p class="big">${mine.length} <span>${t('openItems').toLowerCase()}: ${open}</span></p><ul class="blist">${mine.map(bidragRow).join('')}</ul><a class="more" href="#/inn/koordinering">${t('coord')}</a></section>`;
    }
    if (F2) html += `<section class="panel"><h2>${t('tasksTitle')} ${f2tag()}</h2>${taskRows(STATE.tasks.filter(x => x.to === persona().name || x.by === persona().name).slice(0, 3))}<a class="more" href="#/inn/oppgaver">${t('tasksTitle')}</a></section>`;
    html += shortcuts();
    html += `<section class="panel"><h2>${t('rides')}</h2><p>${t('ridesLead')}</p><a class="more" href="#/inn/samreise">${t('rides')}</a></section>`;
  }
  if (F2 && !STATE.member) html += `<section class="panel member"><h2>${t('joinAssoc')} ${f2tag()}</h2><p>${t('joinShort')}</p><a class="more" href="#/inn/medlemskap">${t('readMore')}</a></section>`;
  return html;
}

/* ---------- Mitt program ---------- */
function iMyProgram() {
  const favs = DATA.program.filter(p => STATE.fav.includes(p.id));
  let html = `<h1>${t('myProgram')}</h1>`;
  if (!favs.length) return html + `<p class="empty">${t('myProgramEmpty')}</p><a class="btn btn-dark" href="#/program/dag">${t('dayByDay')}</a>`;
  [0, 1, 2, 3, 4, 5].forEach(d => {
    const l = favs.filter(p => p.day === d).sort((a, b) => sortKey(a.start) - sortKey(b.start));
    if (l.length) html += `<h2 class="daytitle">${fmt(dayDate(d), { weekday: 'long', day: 'numeric', month: 'long' })}</h2><ul class="plist">${l.map(p => progItem(p)).join('')}</ul>`;
  });
  return html + `<p class="small">${t('offline')}</p><p><a class="btn" href="#/program/dag">${t('dayByDay')}</a></p>`;
}

/* ---------- Tavla ---------- */
function iBoard() {
  const mine = DATA.tavla.filter(c => STATE.taken.includes(c.id));
  const fit = c => !STATE.energy || c.energy <= STATE.energy;
  const chip = (v, label) => `<button data-act="energy" data-v="${v}" aria-pressed="${STATE.energy === v}">${label}</button>`;
  return `<h1>${t('board')}</h1><p class="lead">${t('boardLead')}</p>
    <div class="chips">${chip(0, t('allEnergy'))}${chip(1, L(DATA.energy[1]))}${chip(2, t('upToMedium'))}${chip(3, t('anyEnergy'))}</div>
    <p><button class="btn" data-act="print">${t('printBoard')}</button></p>
    ${mine.length ? `<section class="panel"><h2>${t('yourTasks')}</h2><ul class="tlist">${mine.map(c => boardCard(c)).join('')}</ul></section>` : ''}
    ${['kritisk', 'viktig', 'kjekt'].map(p => { const l = DATA.tavla.filter(c => c.p === p && !STATE.taken.includes(c.id) && fit(c));
      return l.length ? `<h2 class="prio p-${p}">${t(p)}</h2><ul class="tlist">${l.map(c => boardCard(c)).join('')}</ul>` : ''; }).join('')}
    <p class="small">${t('boardSource')}</p>
    <div class="print-only"><h1>${t('board')} – ${t('demoClock')}</h1><ul class="tlist">${DATA.tavla.map(c => boardCard(c, true)).join('')}</ul></div>`;
}

/* ---------- Folk ---------- */
function iFolk() {
  const gs = DATA.festivalGroups;
  const list = DATA.folk.filter(f => STATE.folkG === 'all' || f.g.includes(STATE.folkG)).filter(f => !(STATE.hidden && f.n === persona().name));
  const chip = (v, label, c) => `<button data-act="folkg" data-v="${v}" aria-pressed="${STATE.folkG === v}">${c ? `<span class="dot" style="background:${c}"></span>` : ''}${label}</button>`;
  return `<h1>${t('folk')}</h1><p class="lead">${t('folkLead')}</p>
    <div class="chips">${chip('all', t('all'))}${gs.map(g => chip(g, esc(groupName(g)), DATA.groups[g].c)).join('')}</div>
    ${STATE.folkG !== 'all' && DATA.groupToday[STATE.folkG] ? `<section class="panel group" style="--g:${DATA.groups[STATE.folkG].c}"><h2 class="gtitle">${groupIcon(STATE.folkG)}${t('groupToday')}</h2><p>${facts(DATA.groupToday[STATE.folkG])}</p></section>` : ''}
    <ul class="folk">${list.map(f => `<li><span class="avatar sm">${esc(f.n[0])}</span><strong>${esc(f.n)}</strong><span class="fg">${f.g.map(g => `<span class="gchip" style="--g:${DATA.groups[g].c}">${esc(groupName(g))}</span>`).join('')}</span></li>`).join('')}</ul>
    <section class="panel"><h2>${t('privacy')}</h2><label class="switch"><input type="checkbox" data-act="hide"${STATE.hidden ? ' checked' : ''}><span>${t('hideMe')}</span></label><p class="small">${t('folkPrivacy')}</p></section>`;
}

/* ---------- Årshjul ---------- */
const RINGS = ['praktisk', 'miljo', 'kjokken', 'vertskap', 'logistikk', 'marked', 'program', 'koord', 'styret', 'barn'];
function polar(r, deg) { const a = (deg - 90) * Math.PI / 180; return [180 + r * Math.cos(a), 180 + r * Math.sin(a)]; }
function wedge(r0, r1, a0, a1) {
  const [x0, y0] = polar(r1, a0), [x1, y1] = polar(r1, a1), [x2, y2] = polar(r0, a1), [x3, y3] = polar(r0, a0);
  return `M${x0.toFixed(1)} ${y0.toFixed(1)}A${r1} ${r1} 0 0 1 ${x1.toFixed(1)} ${y1.toFixed(1)}L${x2.toFixed(1)} ${y2.toFixed(1)}A${r0} ${r0} 0 0 0 ${x3.toFixed(1)} ${y3.toFixed(1)}Z`;
}
function wheelGroups() { return STATE.wGroup === 'mine' ? myGroups() : STATE.wGroup === 'all' ? Object.keys(DATA.groups) : [STATE.wGroup]; }
const RAINBOW12 = ['#F0604C', '#F27A3D', '#F5932E', '#F7C531', '#C9E83A', '#4DF068', '#4DF0A0', '#4DF0D7', '#4DE4F0', '#6FA8F5', '#B07FE0', '#F04DAF'];
function wheelSvg() {
  const R0 = 50, W = 9.6, active = wheelGroups(), now = new Date();
  const ringR = g => R0 + RINGS.indexOf(g) * W + W / 2;
  let s = '';
  RINGS.forEach(g => { s += `<circle cx="180" cy="180" r="${ringR(g)}" fill="none" stroke="${DATA.groups[g].c}" stroke-width="${W - 1}" opacity="${active.includes(g) ? 0.95 : 0.2}"/>`; });
  for (let m = 0; m < 12; m++) {
    const a0 = m * 30, a1 = a0 + 30, [lx, ly] = polar(165, a0 + 15), sel = STATE.wMonth === m + 1;
    s += `<path d="${wedge(147, 154, a0 + 0.8, a1 - 0.8)}" fill="${RAINBOW12[(m + 6) % 12]}"/>`;
    if (sel) s += `<path d="${wedge(R0, 147, a0, a1)}" fill="#433B35" opacity="0.14"/>`;
    s += `<line x1="${polar(R0, a0)[0].toFixed(1)}" y1="${polar(R0, a0)[1].toFixed(1)}" x2="${polar(147, a0)[0].toFixed(1)}" y2="${polar(147, a0)[1].toFixed(1)}" stroke="#FDFBF9" stroke-width="1.2"/>`;
    s += `<text x="${lx.toFixed(1)}" y="${(ly + 4).toFixed(1)}" text-anchor="middle" class="wm${sel ? ' sel' : ''}">${monthName(m + 1, 'short').replace('.', '')}</text>`;
  }
  s += `<path d="${wedge(154, 159, 6 * 30 + 26, 7 * 30 + 1)}" fill="#433B35"/>`;
  DATA.deadlines.forEach(d => {
    if (!RINGS.includes(d.g)) return;
    const [x, y] = polar(ringR(d.g), (d.m - 1) * 30 + (d.d - 1) / 31 * 30), on = active.includes(d.g);
    s += `<circle cx="${x.toFixed(1)}" cy="${y.toFixed(1)}" r="${on ? 4.4 : 2.4}" fill="${on ? '#433B35' : '#433B3555'}" stroke="#FDFBF9" stroke-width="${on ? 1.2 : 0}"/>`;
  });
  const ang = now.getMonth() * 30 + (now.getDate() - 1) / 31 * 30, [tx, ty] = polar(159, ang), [ux, uy] = polar(R0 - 6, ang);
  s += `<line x1="${ux.toFixed(1)}" y1="${uy.toFixed(1)}" x2="${tx.toFixed(1)}" y2="${ty.toFixed(1)}" stroke="#F0604C" stroke-width="2.4" stroke-linecap="round"/>`;
  for (let m = 0; m < 12; m++) s += `<path d="${wedge(R0, 176, m * 30, m * 30 + 30)}" fill="transparent" class="wtap" data-act="wmonth" data-v="${m + 1}" role="button" tabindex="0" aria-label="${monthName(m + 1)}"/>`;
  s += `<circle cx="180" cy="180" r="${R0 - 8}" fill="#FDFBF9"/><text x="180" y="${STATE.wMonth ? 178 : 186}" text-anchor="middle" class="wc">${STATE.wMonth ? monthName(STATE.wMonth, 'short').replace('.', '') : now.getFullYear()}</text>`;
  if (STATE.wMonth) s += `<text x="180" y="194" text-anchor="middle" class="wc2" data-act="wmonth" data-v="0" role="button" tabindex="0">${t('wholeYear')}</text>`;
  return `<svg class="wheel" id="wheel" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 360 360" role="img" aria-label="${t('yearWheel')}">${s}</svg>`;
}
function iWheel() {
  if (!levelAtLeast('medlem')) return `<h1>${t('yearWheel')}</h1><p class="empty">${t('forActive')}</p>`;
  const active = wheelGroups();
  const rows = DATA.deadlines.filter(d => active.includes(d.g) && (!STATE.wMonth || d.m === STATE.wMonth)).sort((a, b) => a.m - b.m || a.d - b.d);
  const chip = (v, label, c) => `<button data-act="wgroup" data-v="${v}" aria-pressed="${STATE.wGroup === v}">${c ? `<span class="dot" style="background:${c}"></span>` : ''}${label}</button>`;
  return `<h1>${t('yearWheel')}</h1><p class="lead">${t('wheelLead')}</p>
    <div class="chips">${chip('mine', t('myGroups'))}${chip('all', t('all'))}${RINGS.slice().reverse().map(g => chip(g, esc(DATA.groups[g].n), DATA.groups[g].c)).join('')}</div>
    <div class="wheelwrap">${wheelSvg()}
      <div class="wheellist">
        <p><button class="btn" data-act="dlwheel">${t('downloadWheel')}</button></p>
        <h2>${STATE.wMonth ? monthName(STATE.wMonth) : t('wholeYear')}</h2>
        ${rows.length ? `<ul class="dlist">${rows.map(d => `<li><span class="swatch" style="background:${DATA.groups[d.g].c}"></span><div><strong>${esc(d.t)}</strong><span>${esc(DATA.groups[d.g].n)}</span></div><time>${d.d}. ${monthName(d.m, 'short')}</time></li>`).join('')}</ul>` : `<p class="empty">${t('noDeadlines')}</p>`}
        ${active.includes('koord') ? `<p class="monthly"><span class="swatch" style="background:${DATA.groups.koord.c}"></span>${esc(DATA.monthly.t)}</p>` : ''}
      </div>
    </div>`;
}

/* ---------- Gruppa ---------- */
function iGroup() {
  const k = myGroups()[0], g = DATA.groups[k], ann = DATA.announce.filter(a => a.ch === k);
  const members = DATA.folk.filter(f => f.g.includes(k));
  return `<h1 class="gtitle">${groupIcon(k, 30)}${esc(g.n)}</h1>
    ${ann.length ? `<section class="panel"><h2>${t('announcements')}</h2>${announceList(ann)}</section>` : ''}
    ${groupBody(k, true)}
    <section class="panel"><h2>${t('members')} (${members.length})</h2><p class="avatars">${members.map(m => `<span class="avatar sm" title="${esc(m.n)}">${esc(m.n[0])}</span>`).join('')}</p><p class="small">${members.map(m => esc(m.n)).join(', ')}</p></section>
    ${F2 ? `<section class="panel"><h2>${t('channel')} ${f2tag()}</h2><p>${t('channelLead')}</p><button class="btn" data-act="chatopen" data-v="c-${k}">${t('openChannel')}</button></section>` : ''}
    ${STATE.persona === 'deltaker' ? `<section class="panel"><h2>${t('changeGroup')}</h2><label class="field"><span class="sr">${t('changeGroup')}</span><select data-act="group">${DATA.festivalGroups.map(x => `<option value="${x}"${x === k ? ' selected' : ''}>${esc(DATA.groups[x].n)}</option>`).join('')}</select></label><p class="small">${t('changeGroupNote')}</p></section>` : ''}
    <p><a class="btn" href="#/handbok/gruppe/${k}">${t('inHandbook')}</a></p>`;
}

/* ---------- Koordinering ---------- */
function bidragRow(b) {
  return `<li class="brow"><div><strong>${esc(b.t)}</strong><span><span class="dot" style="background:${cat(b.k).c}"></span>${L(cat(b.k))}</span></div>
    <ol class="cps" aria-label="${t('checkpoints')}">${b.cp.map((v, i) => `<li class="${v ? 'on' : ''}" title="${DATA.checkpoints[i]}"><span class="sr">${DATA.checkpoints[i]}: ${v ? 'ja' : 'nei'}</span></li>`).join('')}</ol>
    ${b.open.length ? `<p class="open">${b.open.map(esc).join(', ')}</p>` : `<p class="clear">${t('allClear')}</p>`}</li>`;
}
function iCoord() {
  if (!levelAtLeast('medlem')) return `<h1>${t('coord')}</h1><p class="empty">${t('forActive')}</p>`;
  return `<h1>${t('coord')}</h1><p class="note">${t('coordNote')}</p>
    <p class="legend">${DATA.checkpoints.map(c => `<span>${c}</span>`).join('')}</p>
    <h2>${t('yourContrib')}</h2><ul class="blist">${DATA.bidrag.filter(b => b.mine).map(bidragRow).join('')}</ul>
    <h2>${t('allContrib')}</h2><ul class="blist">${DATA.bidrag.filter(b => !b.mine).map(bidragRow).join('')}</ul>
    <p class="note">${t('publishNote')}</p>`;
}

/* ---------- Samreise ---------- */
function iRides() {
  return `<h1>${t('rides')}</h1><p class="lead">${t('ridesLead')}</p><ul class="rides">${DATA.rides.map(r =>
    `<li class="${r.dir === 'trenger' ? 'need' : ''}"><span class="tag">${r.dir === 'trenger' ? t('needs') : t('offers')}</span><h3>${r.dir === 'fra' ? t('fromFest') : t('toFest')}, ${esc(r.from)}</h3><p>${esc(r.when)}. ${r.seats} ${t('seats')}.</p><p class="small">${esc(r.by)}</p></li>`).join('')}</ul>
    <p class="small">${t('ridesNote')}</p>`;
}

/* ---------- Mer ---------- */
function iMore() {
  const links = [['#/inn/gruppe', t('yourGroup')], ['#/inn/kunngjoringer', t('announcements')], ['#/inn/samreise', t('rides')]];
  if (F2 && mailUser()) links.unshift(['#/inn/program', t('myProgram')], ['#/inn/folk', t('folk')]);
  if (levelAtLeast('medlem')) links.push(['#/inn/arshjul', t('yearWheel')], ['#/inn/koordinering', t('coord')]);
  if (levelAtLeast('drift')) links.push(['#/inn/drift', t('ops')]);
  const f2 = F2 ? [['#/inn/epost', t('mail')], ['#/inn/kalender', t('calendar')], ['#/inn/oppgaver', t('tasksTitle')], ['#/inn/moterom', t('meetingRooms')], ['#/inn/utlegg', t('receipts')], ['#/inn/medlemskap', t('membership')]].concat(myGroups().includes('styret') || levelAtLeast('drift') ? [['#/inn/husutleie', t('house')]] : []) : [];
  links.push(['#/handbok', t('handbook')], ['#/praktisk', t('practical')], ['#/', t('toSite')], ['#/om', t('about')]);
  return `<h1>${t('more')}</h1><ul class="morelist">${links.map(l => `<li><a href="${l[0]}">${l[1]}</a></li>`).join('')}</ul>
    ${f2.length ? `<h2>${t('phase2')}</h2><ul class="morelist">${f2.map(l => `<li><a href="${l[0]}">${l[1]} ${f2tag()}</a></li>`).join('')}</ul>` : ''}
    ${shortcuts()}
    <section class="panel"><h2>${t('language')}</h2>${langSelect()}</section>
    <section class="panel"><h2>${t('myData')}</h2><p>${t('myDataLead')}</p><p class="actions"><button class="btn" data-act="toast" data-v="${esc(t('exportDone'))}">${t('exportData')}</button></p></section>`;
}
function iTool(r) {
  if (r.c === 'mail' || r.c === 'calendar') {
    const k = r.c === 'mail' ? 'epost' : 'kalender';
    return `<h1>${t(r.c)}</h1><div class="panel"><p>${t(r.c === 'mail' ? 'f1Mail' : 'f1Cal')}</p><p class="actions"><a class="btn btn-dark" href="fase2.html#/inn/${k}">${t('seeInF2')}</a><a class="btn" href="#/inn">${t('back')}</a></p></div>`;
  }
  return `<h1>${t(I18N[r.c] ? r.c : 'tools')}</h1><p class="empty">${t('notInProto')}</p><p><a class="btn" href="#/inn">${t('back')}</a></p>`;
}

/* ---------- Drift ---------- */
function opsPanel(compact) {
  const red = DATA.alerts.filter(a => a.p === 'rod'), warn = DATA.services.filter(s => s[1] !== 'ok');
  return `<section class="panel ops"><h2>${t('ops')}</h2>
    ${compact ? `<p class="big">${DATA.services.length - warn.length} <span>${t('ofNoRemark', { n: DATA.services.length })}</span></p>${red.length ? `<p class="alert-line rod">${esc(red[0].what)}</p>` : ''}<a class="more" href="#/inn/drift">${t('opsMessages')}</a>` :
      `<ul class="svc">${DATA.services.map(s => `<li class="${s[1]}"><span class="led"></span><strong>${esc(s[0])}</strong><span>${esc(s[2] || 'OK')}</span></li>`).join('')}</ul>`}</section>`;
}
function iOps() {
  if (!levelAtLeast('drift')) return `<h1>${t('ops')}</h1><p class="empty">${t('forOps')}</p>`;
  const step = STATE.repair;
  return `<h1>${t('ops')}</h1><p class="lead">${t('opsLead')}</p>
    <h2>${t('opsMessages')}</h2>
    <ul class="alerts">${DATA.alerts.map(a => `<li class="al ${a.p}">
      <p class="al-top"><span class="prio-badge ${a.p}">${t('prio_' + a.p)}</span><span>${esc(a.when)}</span></p>
      <h3>${esc(a.what)}</h3>
      <dl><div><dt>${t('why')}</dt><dd>${esc(a.why)}</dd></div><div><dt>${t('fix')}</dt><dd>${esc(a.fix)}</dd></div><div><dt>${t('link')}</dt><dd><a href="#/inn/drift">${esc(a.link)}</a></dd></div>${a.notify ? `<div><dt>${t('notified')}</dt><dd>${esc(a.notify)}</dd></div>` : ''}</dl>
      ${a.p !== 'gronn' ? (STATE.claimed.includes(a.id) ? `<p class="claimed">${t('claimedBy', { n: persona().name })}</p>` : `<button class="btn" data-act="claim" data-v="${a.id}">${t('claim')}</button>`) : ''}
    </li>`).join('')}</ul>
    <section class="panel repair"><h2>${t('repairTitle')}</h2><p>${t('repairLead')}</p>
      <pre class="term">$ karlsoy reparer${DATA.repairSteps.slice(0, step).map((s, i) => `\n<b>${i + 1}. ${esc(s[0])}</b>  ${esc(s[1])}`).join('')}${step === 3 ? `\n\n${t('repairAsk')}` : ''}</pre>
      <p class="actions">${step === 0 ? `<button class="btn btn-dark" data-act="repair" data-v="3">${t('repairRun')}</button>` : step === 3 ? `<button class="btn btn-dark" data-act="repair" data-v="7">${t('repairYes')}</button><button class="btn" data-act="repair" data-v="0">${t('repairNo')}</button>` : `<button class="btn" data-act="repair" data-v="0">${t('repairReset')}</button>`}</p>
    </section>
    ${opsPanel(false)}
    <section class="panel"><h2>${t('envs')}</h2><ul class="envs"><li><strong>${t('envTest')}</strong><span>test.karlsoyfestivalen.no · v1.5.0-rc2</span></li><li><strong>${t('envProd')}</strong><span>karlsoyfestivalen.no · v1.4.2</span></li><li><strong>${t('freeze')}</strong><span>13. juli – 1. august 2027</span></li></ul></section>`;
}

/* ====================================================================
   FASE 2 – valgfrie tillegg
   ==================================================================== */
/* Discord-kanaler i et vindu */
function chansFor() { return DATA.channels.filter(c => !c.g || myGroups().includes(c.g)); }
const chanMsgs = c => c.msgs.concat(STATE.sent[c.id] || []);
const isMe = m => m.from === persona().name;
const unreadOf = c => Math.max(0, c.msgs.filter(m => !isMe(m)).length - (STATE.read[c.id] || 0));
function chatFab() {
  const n = chansFor().reduce((a, c) => a + unreadOf(c), 0);
  return `<button class="chatfab" data-act="chat" aria-label="${t('discordChannels')}${n ? ', ' + n + ' ' + t('unread') : ''}">
    <svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="M4 5h16v11H9l-5 4z"/></svg>${n ? `<span class="badge">${n}</span>` : ''}</button>`;
}
function chatPop() {
  const list = chansFor(), c = byId(DATA.channels, STATE.chatId);
  if (c) {
    return `<section class="chatpop" role="dialog" aria-label="#${esc(c.name)}">
      <header><button class="iconbtn" data-act="chatback" aria-label="${t('back')}">‹</button><h2># ${esc(c.name)}</h2><button class="iconbtn" data-act="chat" aria-label="${t('close')}">×</button></header>
      <ol class="chat-msgs">${chanMsgs(c).map(m => `<li class="${isMe(m) ? 'me' : ''}"><p class="who-when">${isMe(m) ? t('you') : esc(m.from)}, ${esc(m.when || t('justNow'))}</p><p class="bubble">${esc(m.t)}</p></li>`).join('')}</ol>
      <form class="chat-form" data-act="chatsend"><label class="sr" for="chat-in">${t('writeMsg')}</label><textarea id="chat-in" rows="1" placeholder="${t('writeMsg')}" required></textarea><button class="btn btn-dark">${t('send')}</button></form>
      <p class="chat-ro">${t('viaDiscord', { n: persona().name })}</p>
    </section>`;
  }
  return `<section class="chatpop" role="dialog" aria-label="${t('discordChannels')}">
    <header><h2>${t('discordChannels')}</h2><button class="iconbtn" data-act="chat" aria-label="${t('close')}">×</button></header>
    <div class="chat-list"><ul>${list.map(x => { const m = chanMsgs(x).slice(-1)[0], n = unreadOf(x);
      return `<li><button data-act="chatopen" data-v="${x.id}">${x.g ? `<span class="swatch" style="background:${DATA.groups[x.g].c}"></span>` : '<span class="swatch hash">#</span>'}<span><strong># ${esc(x.name)}</strong><span>${esc(m.t)}</span></span>${n ? `<span class="badge">${n}</span>` : `<span class="when">${esc(m.when || t('justNow'))}</span>`}</button></li>`; }).join('')}</ul>
      <h3>${t('meetingRooms')}</h3><ul>${DATA.voice.map(v => `<li><a class="voice-row" href="#/inn/moterom"><span class="swatch hash">◖</span><span><strong>${esc(v.name)}</strong><span>${v.who.length ? v.who.join(', ') : t('empty')}</span></span></a></li>`).join('')}</ul>
      <p class="small">${t('chatNote')}</p></div>
  </section>`;
}
function iVoice() {
  return `<h1>${t('meetingRooms')} ${f2tag()}</h1><p class="lead">${t('voiceLead')}</p>
    <ul class="voice">${DATA.voice.map(v => `<li><div><h3>${esc(v.name)}</h3>${v.note ? `<p class="small">${esc(v.note)}</p>` : ''}<p class="avatars">${v.who.map(n => `<span class="avatar sm" title="${esc(n)}">${esc(n[0])}</span>`).join('') || `<span class="small">${t('empty')}</span>`}</p></div><a class="btn ${v.who.length ? 'btn-dark' : ''}" href="#/inn/moterom">${t('joinDiscord')}</a></li>`).join('')}</ul>
    <p class="note">${t('voiceNote')}</p>`;
}


/* E-post: personlig adresse og fellesadresser, med tildeling og status */
const myBoxes = () => DATA.mailboxes.filter(b => b.id === 'me' || (b.groups || []).some(g => myGroups().includes(g)) || (b.level && levelAtLeast(b.level)));
const boxAddr = b => (b.id === 'me' ? persona().name.toLowerCase() + '@karlsoyfestivalen.no' : b.addr);
const mailState = m => Object.assign({ status: m.status, who: m.who || null, read: !m.unread }, STATE.mailState[m.id] || {});
const mailsIn = id => DATA.mails.filter(m => m.box === id).concat(id === 'sendt' ? STATE.sentMail : []);
function unreadMail() { const ids = myBoxes().map(b => b.id); return DATA.mails.filter(m => ids.includes(m.box) && !mailState(m).read).length; }
function mailPanel() {
  const boxes = myBoxes().filter(b => b.id !== 'me');
  return `<section class="panel mailpanel"><h2>${t('mail')} ${f2tag()}</h2><ul class="boxsum">${myBoxes().map(b => { const l = mailsIn(b.id), open = l.filter(m => b.id !== 'me' && mailState(m).status !== 'besvart').length, un = l.filter(m => !mailState(m).read).length;
    return `<li><a href="#/inn/epost" data-act="mailbox" data-v="${b.id}"><strong>${esc(boxAddr(b))}</strong><span>${b.id === 'me' ? t('personal') : t('sharedFor', { g: (b.groups || []).map(groupName).join(', ') || t('ops') })}</span></a><span class="nums">${un ? `<span class="badge">${un}</span>` : ''}${open ? `<span class="small">${t('nOpen', { n: open })}</span>` : ''}</span></li>`; }).join('')}</ul>
    ${boxes.length ? `<p class="small">${t('sharedNote')}</p>` : ''}<a class="more" href="#/inn/epost">${t('openMail')}</a></section>`;
}
function iMail(r) {
  if (!mailUser()) return `<h1>${t('mail')}</h1><p class="empty">${t('forActive')}</p>`;
  if (r.c === 'ny') return mailCompose();
  if (r.c) return mailRead(r.c);
  const boxes = myBoxes(), cur = boxes.find(b => b.id === STATE.mailBox) ? STATE.mailBox : 'me', box = boxes.find(b => b.id === cur);
  const list = mailsIn(cur).slice().sort((a, b) => (b.ts || 0) - (a.ts || 0));
  return `<div class="mhead"><h1>${t('mail')} ${f2tag()}</h1><a class="btn btn-dark" href="#/inn/epost/ny">${t('newMail')}</a></div>
    <div class="chips">${boxes.map(b => { const un = mailsIn(b.id).filter(m => !mailState(m).read).length;
      return `<button data-act="mailbox" data-v="${b.id}" aria-pressed="${cur === b.id}">${esc(b.id === 'me' ? t('personal') : b.addr.split('@')[0] + '@')}${un ? ` <span class="badge sm">${un}</span>` : ''}</button>`; }).join('')}<button data-act="mailbox" data-v="sendt" aria-pressed="${STATE.mailBox === 'sendt'}">${t('sent')}</button></div>
    <p class="small boxline">${STATE.mailBox === 'sendt' ? t('sent') : `${esc(boxAddr(box))} · ${cur === 'me' ? t('personal') : t('sharedFor', { g: (box.groups || []).map(groupName).join(', ') || t('ops') })}`}</p>
    ${(STATE.mailBox === 'sendt' ? STATE.sentMail : list).length ? `<ul class="mlist">${(STATE.mailBox === 'sendt' ? STATE.sentMail.slice().reverse() : list).map(m => { const st = mailState(m);
      return `<li class="${st.read ? '' : 'unread'}"><a href="#/inn/epost/${m.id}"><span class="avatar sm">${esc((m.from || m.to)[0])}</span><span class="mmain"><span class="mtop"><strong>${esc(m.from || t('to') + ' ' + m.to)}</strong><time>${esc(m.when)}</time></span><span class="msubj">${esc(m.subj)}</span><span class="msnip">${esc(m.body.split('\n')[0])}</span>
        ${cur !== 'me' && STATE.mailBox !== 'sendt' ? `<span class="mstat"><span class="status s-${st.status}">${t('ms_' + st.status)}</span>${st.who ? `<span class="small">${esc(st.who)}</span>` : ''}</span>` : ''}</span></a></li>`; }).join('')}</ul>` : `<p class="empty">${t('noMail')}</p>`}
    <section class="panel"><h2>${t('mailApps')}</h2><p>${t('mailAppsLead')}</p><p class="small">IMAP: mail.karlsoyfestivalen.no · SMTP: mail.karlsoyfestivalen.no:587</p></section>`;
}
function mailRead(id) {
  const m = DATA.mails.find(x => x.id === id) || STATE.sentMail.find(x => x.id === id);
  if (!m) return `<p class="empty">${t('noMail')}</p>`;
  if (!STATE.mailState[id] || !STATE.mailState[id].read) { STATE.mailState[id] = Object.assign({}, STATE.mailState[id], { read: true }); saveState(); }
  const st = mailState(m), box = DATA.mailboxes.find(b => b.id === m.box), shared = box && box.id !== 'me';
  return `<p class="crumb"><a href="#/inn/epost">${t('mail')}</a></p>
    <article class="mread"><p class="kicker">${box ? esc(boxAddr(box)) : t('sent')}</p><h1 class="msubj-h">${esc(m.subj)}</h1>
    <p class="mfrom"><span class="avatar sm">${esc((m.from || m.to)[0])}</span><span><strong>${esc(m.from || persona().name)}</strong>${m.fromAddr ? ` &lt;${esc(m.fromAddr)}&gt;` : ''}<br><span class="small">${esc(m.when)}${m.to ? ' · ' + t('to') + ' ' + esc(m.to) : ''}</span></span></p>
    ${m.body.split('\n').map(p => `<p>${esc(p)}</p>`).join('')}
    ${m.attach ? `<p class="attach">📎 ${esc(m.attach)}</p>` : ''}</article>
    ${shared ? `<section class="panel"><h2>${t('handling')}</h2><p><span class="status s-${st.status}">${t('ms_' + st.status)}</span> ${st.who ? t('takenBy', { n: st.who }) : t('noOneYet')}</p>
      <p class="actions">${!st.who ? `<button class="btn btn-dark" data-act="mailtake" data-v="${id}">${t('takeMail')}</button>` : ''}${st.status !== 'besvart' ? `<button class="btn" data-act="maildone" data-v="${id}">${t('markAnswered')}</button>` : ''}</p>
      <p class="small">${t('handlingNote')}</p></section>` : ''}
    <p class="actions"><a class="btn btn-dark" href="#/inn/epost/ny" data-act="reply" data-v="${id}">${t('reply')}${shared ? ' ' + t('as') + ' ' + esc(box.addr) : ''}</a><button class="btn" data-act="mail2cal" data-v="${id}">${t('toCalendar')}</button><button class="btn" data-act="mail2task" data-v="${id}">${t('toTask')}</button></p>`;
}
function mailCompose() {
  const re = STATE.replyTo && (DATA.mails.find(x => x.id === STATE.replyTo));
  const fromBox = re ? re.box : 'me';
  const tpl = DATA.mailTemplates;
  return `<p class="crumb"><a href="#/inn/epost">${t('mail')}</a></p><h1>${re ? t('reply') : t('newMail')}</h1>
    <form class="panel form" data-act="sendmail">
      <label class="field"><span>${t('from')}</span><select name="from">${myBoxes().map(b => `<option value="${esc(boxAddr(b))}"${b.id === fromBox ? ' selected' : ''}>${esc(boxAddr(b))}</option>`).join('')}</select></label>
      <label class="field"><span>${t('to')}</span><input name="to" required value="${re ? esc(re.fromAddr || '') : ''}" placeholder="${t('toPh')}" list="addrs"><datalist id="addrs">${myGroups().map(g => `<option value="${g}-liste@karlsoyfestivalen.no">`).join('')}<option value="alle-deltakere@karlsoyfestivalen.no"></datalist></label>
      <label class="field"><span>${t('subject')}</span><input name="subj" required value="${re ? 'Re: ' + esc(re.subj) : ''}"></label>
      <label class="field"><span>${t('template')}</span><select name="tpl" data-act="tpl"><option value="">${t('noTemplate')}</option>${tpl.map((x, i) => `<option value="${i}">${esc(x.name)}</option>`).join('')}</select></label>
      <label class="field"><span>${t('message')}</span><textarea name="body" rows="8" id="mailbody">${re ? '\n\n' + esc(`${re.from} skrev:\n> ${re.body.split('\n')[0]}`) : ''}</textarea></label>
      <p class="small">${t('factsInMail')}</p>
      <button class="btn btn-dark">${t('send')}</button></form>`;
}

/* Kalender: frister fra håndboka, møter og egne avtaler, filtrert på grupper */
const CAL_REPEAT = [
  { g: 'koord', t: 'Koordinatormøte', wd: 1, every: 'week', time: '18:00', where: 'Discord · #koordinatorgruppa' },
  { g: 'program', t: 'Møte i Program og teknisk', wd: 2, every: 'week', time: '19:00', where: 'Discord · #program-og-teknisk' },
  { g: 'kjokken', t: 'Møte i Kjøkken og bar', wd: 3, every: 'first', time: '19:00', where: 'Discord · #kjøkken-og-bar' },
  { g: 'miljo', t: 'Møte i Miljø og renhold', wd: 1, every: 'second', time: '19:30', where: 'Discord · #miljø-og-renhold' },
  { g: 'styret', t: 'Styremøte', wd: 1, every: 'first', time: '20:00', where: 'Discord · #styret' },
  { g: 'marked', t: 'Møte i Markedsføring', wd: 4, every: 'first', time: '19:00', where: 'Discord · #markedsføring' }
];
function calEvents(y, m) {
  const ev = [], days = new Date(y, m, 0).getDate();
  DATA.deadlines.filter(d => d.m === m).forEach(d => ev.push({ d: d.d, g: d.g, t: d.t, kind: 'frist' }));
  for (let d = 1; d <= days; d++) {
    const wd = new Date(y, m - 1, d).getDay(), nth = Math.ceil(d / 7);
    CAL_REPEAT.forEach(r => { if (r.wd === wd && (r.every === 'week' || (r.every === 'first' && nth === 1) || (r.every === 'second' && nth === 2))) ev.push({ d, g: r.g, t: r.t, time: r.time, where: r.where, kind: 'mote' }); });
    if (wd === 4 && d + 7 > days) ev.push({ d, g: 'koord', t: 'Medlemsmøte for alle', time: '19:00', where: 'Discord · Medlemsmøtet', kind: 'mote', all: true });
  }
  (DATA.bigMeetings || []).filter(x => x.y === y && x.m === m).forEach(x => ev.push(Object.assign({ kind: 'mote', all: true }, x)));
  STATE.myEvents.filter(x => x.y === y && x.m === m).forEach(x => ev.push(Object.assign({ kind: 'egen' }, x)));
  return ev.sort((a, b) => a.d - b.d || String(a.time || '').localeCompare(String(b.time || '')));
}
const calShown = e => e.all || e.kind === 'egen' || (STATE.calGroups === 'all' ? true : myGroups().includes(e.g));
function calPanel() {
  const now = new Date(), ev = calEvents(now.getFullYear(), now.getMonth() + 1).filter(calShown).filter(e => e.d >= now.getDate()).slice(0, 4);
  return `<section class="panel"><h2>${t('calendar')} ${f2tag()}</h2>${ev.length ? `<ul class="agenda">${ev.map(agendaRow).join('')}</ul>` : `<p class="empty">${t('noEvents')}</p>`}<a class="more" href="#/inn/kalender">${t('openCal')}</a></section>`;
}
function agendaRow(e) {
  const y = STATE.calY, m = STATE.calM, g = DATA.groups[e.g];
  return `<li class="ev ev-${e.kind}" style="--g:${g ? g.c : 'var(--gra)'}"><time><strong>${e.d}.</strong><span>${e.time || t('allDay')}</span></time>
    <div><strong>${esc(e.t)}</strong><span>${e.kind === 'frist' ? t('deadline') + ' · ' : ''}${g ? esc(g.n) : ''}${e.where ? ' · ' + esc(e.where) : ''}</span></div>
    ${e.where && e.where.startsWith('Discord') ? `<a class="btn btn-small" href="#/inn/kalender">${t('join')}</a>` : ''}</li>`;
}
function iCal() {
  if (!mailUser()) return `<h1>${t('calendar')}</h1><p class="empty">${t('forActive')}</p>`;
  const y = STATE.calY, m = STATE.calM, ev = calEvents(y, m).filter(calShown);
  const first = new Date(y, m - 1, 1), days = new Date(y, m, 0).getDate(), off = (first.getDay() + 6) % 7, today = new Date();
  let cells = '';
  for (let i = 0; i < off; i++) cells += '<span></span>';
  for (let d = 1; d <= days; d++) {
    const de = ev.filter(e => e.d === d), isT = today.getFullYear() === y && today.getMonth() + 1 === m && today.getDate() === d;
    cells += `<button class="${isT ? 'today' : ''}${STATE.calDay === d ? ' sel' : ''}" data-act="calday" data-v="${d}" aria-label="${d}. ${monthName(m)}, ${de.length}"><span>${d}</span><i>${de.slice(0, 4).map(e => `<b style="background:${DATA.groups[e.g] ? DATA.groups[e.g].c : 'var(--gra)'}"></b>`).join('')}</i></button>`;
  }
  const list = STATE.calDay ? ev.filter(e => e.d === STATE.calDay) : ev;
  return `<div class="mhead"><h1>${t('calendar')} ${f2tag()}</h1><button class="btn btn-dark" data-act="newevent">${STATE.newEvent ? t('close') : t('newMeeting')}</button></div>
    ${STATE.newEvent ? `<form class="panel form" data-act="addevent">
      <label class="field"><span>${t('what')}</span><input name="t" required placeholder="${t('meetingPh')}"></label>
      <div class="row2"><label class="field"><span>${t('date')}</span><input name="date" type="date" required value="${y}-${String(m).padStart(2, '0')}-${String(STATE.calDay || today.getDate()).padStart(2, '0')}"></label><label class="field"><span>${t('time')}</span><input name="time" type="time" value="19:00"></label></div>
      <label class="field"><span>${t('group')}</span><select name="g">${myGroups().map(g => `<option value="${g}">${esc(groupName(g))}</option>`).join('')}</select></label>
      <label class="field"><span>${t('where')}</span><select name="where"><option>Discord · gruppas møterom</option><option>Festivalhuset</option><option>Discord og Festivalhuset</option></select></label>
      <label class="switch"><input type="checkbox" name="invite" checked><span>${t('inviteList')}</span></label>
      <button class="btn btn-dark">${t('create')}</button></form>` : ''}
    <div class="cal-head"><button class="iconbtn" data-act="calmonth" data-v="-1" aria-label="${t('prev')}">‹</button><strong>${monthName(m)} ${y}</strong><button class="iconbtn" data-act="calmonth" data-v="1" aria-label="${t('next')}">›</button></div>
    <div class="chips"><button data-act="calgroups" data-v="mine" aria-pressed="${STATE.calGroups !== 'all'}">${t('myGroups')}</button><button data-act="calgroups" data-v="all" aria-pressed="${STATE.calGroups === 'all'}">${t('allGroups')}</button></div>
    <div class="cal mcal">${['ma', 'ti', 'on', 'to', 'fr', 'lø', 'sø'].map(d => `<span class="dow">${d}</span>`).join('')}${cells}</div>
    <h2 class="daytitle">${STATE.calDay ? `${STATE.calDay}. ${monthName(m)}` : t('wholeMonth')}${STATE.calDay ? ` <button class="linkbtn" data-act="calday" data-v="0">${t('wholeMonth')}</button>` : ''}</h2>
    ${list.length ? `<ul class="agenda">${list.map(agendaRow).join('')}</ul>` : `<p class="empty">${t('noEvents')}</p>`}
    <section class="panel"><h2>${t('subscribe')}</h2><p>${t('subscribeLead')}</p><ul class="icslist">${myGroups().map(g => `<li><span class="swatch" style="background:${DATA.groups[g].c}"></span><code>karlsoyfestivalen.no/kalender/${g}.ics</code><button class="btn btn-small" data-act="toast" data-v="${esc(t('copied'))}">${t('copy')}</button></li>`).join('')}</ul></section>`;
}

/* Oppgaver med roller og status */
const STATUS = ['ny', 'igang', 'ferdig'];
function taskRows(list) {
  return list.length ? `<ul class="tasks">${list.map(x => `<li class="task st-${x.status}">
    <div><p class="kicker">${groupIcon(x.g, 16)}${esc(groupName(x.g))} · ${t('due')} ${esc(x.due)}</p><h3>${esc(x.t)}</h3>
    <p class="small">${t('role')}: <strong>${esc(x.role)}</strong> · ${x.to ? `${t('assigned')}: ${esc(x.to)}` : t('unassigned')} · ${t('createdBy')} ${esc(x.by)}</p></div>
    <div class="task-act"><span class="status s-${x.status}">${t('st_' + x.status)}</span>
      ${x.status !== 'ferdig' && (x.to === persona().name || !x.to) ? `<button class="btn btn-small" data-act="taskstep" data-v="${x.id}">${!x.to ? t('takeRole') : x.status === 'ny' ? t('start') : t('markDone')}</button>` : ''}</div></li>`).join('')}</ul>` : `<p class="empty">${t('noTasks')}</p>`;
}
function iTasks() {
  return `<h1>${t('tasksTitle')} ${f2tag()}</h1><p class="lead">${t('tasksLead')}</p>
    <p><button class="btn btn-dark" data-act="newtask">${STATE.newTask ? t('close') : t('newTask')}</button></p>
    ${STATE.newTask ? `<form class="panel form" data-act="addtask">
      <label class="field"><span>${t('taskName')}</span><input name="t" required></label>
      <label class="field"><span>${t('role')}</span><input name="role" required placeholder="${t('rolePh')}"></label>
      <label class="field"><span>${t('group')}</span><select name="g">${myGroups().map(g => `<option value="${g}">${esc(groupName(g))}</option>`).join('')}</select></label>
      <label class="field"><span>${t('assignTo')}</span><select name="to"><option value="">${t('openForAll')}</option>${DATA.folk.filter(f => f.g.some(g => myGroups().includes(g))).map(f => `<option>${esc(f.n)}</option>`).join('')}</select></label>
      <label class="field"><span>${t('due')}</span><input name="due" placeholder="1. mai"></label>
      <button class="btn btn-dark">${t('create')}</button></form>` : ''}
    <h2>${t('mine')}</h2>${taskRows(STATE.tasks.filter(x => x.to === persona().name || x.by === persona().name))}
    <h2>${t('openTasks')}</h2>${taskRows(STATE.tasks.filter(x => !x.to && x.by !== persona().name))}
    <h2>${t('allTasks')}</h2>${taskRows(STATE.tasks.filter(x => x.to && x.to !== persona().name && x.by !== persona().name))}
    <p class="note">${t('tasksNote')}</p>`;
}

/* Kvitteringer og utlegg */
function iReceipts() {
  const st = { sendt: t('rc_sendt'), godkjent: t('rc_godkjent'), utbetalt: t('rc_utbetalt') };
  return `<h1>${t('receipts')} ${f2tag()}</h1><p class="lead">${t('receiptsLead')}</p>
    <form class="panel form" data-act="receipt">
      <label class="photo"><input type="file" accept="image/*" capture="environment" data-act="photo"><span class="photo-ph" id="photo-ph">${t('takePhoto')}</span></label>
      <label class="field"><span>${t('whatFor')}</span><input name="t" required placeholder="${t('whatForPh')}"></label>
      <label class="field"><span>${t('amount')}</span><input name="kr" type="number" inputmode="decimal" required min="1"></label>
      <label class="field"><span>${t('group')}</span><select name="g">${myGroups().map(g => `<option value="${g}">${esc(groupName(g))}</option>`).join('')}</select></label>
      <button class="btn btn-dark">${t('sendReceipt')}</button>
    </form>
    <h2>${t('myReceipts')}</h2>
    <ul class="receipts">${STATE.receipts.map(r => `<li><div><strong>${esc(r.t)}</strong><span>${esc(groupName(r.g))} · ${esc(r.date)}</span></div><span class="kr">${r.kr.toLocaleString('nb-NO')} kr</span>
      <ol class="rsteps">${['sendt', 'godkjent', 'utbetalt'].map((s, i) => `<li class="${['sendt', 'godkjent', 'utbetalt'].indexOf(r.status) >= i ? 'on' : ''}">${st[s]}</li>`).join('')}</ol></li>`).join('')}</ul>
    <p class="note">${t('receiptsNote')}</p>`;
}

/* Medlemskap i foreninga */
function memberCta() {
  return `<section class="wrap block membercta"><div><h2>${t('joinAssoc')} ${f2tag()}</h2><p>${t('joinShort')}</p></div><a class="btn btn-dark" href="#/bli-medlem">${t('readMore')}</a></section>`;
}
function memberInfo() {
  return `<div class="rights"><div><h3>${t('rights')}</h3><ul class="ticks"><li>${t('r1')}</li><li>${t('r2')}</li><li>${t('r3')}</li></ul></div>
    <div><h3>${t('duties')}</h3><ul class="ticks"><li>${t('d1')}</li><li>${t('d2')}</li><li>${t('d3')}</li></ul></div></div>`;
}
function pJoin() {
  return `<div class="wrap narrow"><h1>${t('joinAssoc')} ${f2tag()}</h1><p class="lead">${t('joinLead')}</p>${memberInfo()}
    ${STATE.member ? `<p class="ok">${t('youAreMember')}</p>` : `<form class="panel form" data-act="join"><label class="field"><span>${t('name')}</span><input required autocomplete="name"></label><label class="field"><span>${t('email')}</span><input type="email" required autocomplete="email"></label><button class="btn btn-dark">${t('payJoin')}</button></form>`}
    <p class="note">${t('joinNote')}</p></div>`;
}
function iMember() {
  const voters = DATA.folk.slice(0, 18);
  return `<h1>${t('membership')} ${f2tag()}</h1>
    ${STATE.member ? `<section class="panel count"><h2>${t('youAreMember')}</h2><p>${t('memberUntil')}</p></section>` : `<section class="panel"><h2>${t('joinAssoc')}</h2><p>${t('joinLead')}</p><button class="btn btn-dark" data-act="becomemember">${t('payJoin')}</button></section>`}
    ${memberInfo()}
    ${myGroups().includes('styret') || levelAtLeast('verv') ? `<section class="panel"><h2>${t('voters')}</h2><p class="small">${t('votersNote')}</p><p>${voters.map(v => esc(v.n)).join(', ')}</p><p class="big">${voters.length} <span>${t('withVote')}</span></p><button class="btn" data-act="toast" data-v="${esc(t('exportDone'))}">${t('exportList')}</button></section>` : ''}`;
}

/* Husutleie */
function houseCal() {
  const m = STATE.houseMonth, booked = (DATA.house.booked[m] || []).concat(STATE.houseReq.filter(r => r.m === m).map(r => r.d));
  const first = new Date(2027, m - 1, 1), days = new Date(2027, m, 0).getDate(), off = (first.getDay() + 6) % 7;
  let cells = '';
  for (let i = 0; i < off; i++) cells += '<span></span>';
  for (let d = 1; d <= days; d++) { const b = booked.includes(d), mine = STATE.houseReq.some(r => r.m === m && r.d === d);
    cells += `<button class="${b ? 'booked' : ''}${mine ? ' mine' : ''}" data-act="houseday" data-v="${d}" ${b && !mine ? 'disabled' : ''} aria-label="${d}. ${monthName(m)}${b ? ', ' + t('booked') : ''}">${d}</button>`; }
  return `<div class="cal-head"><button class="iconbtn" data-act="housemonth" data-v="-1" aria-label="${t('prev')}">‹</button><strong>${monthName(m)} 2027</strong><button class="iconbtn" data-act="housemonth" data-v="1" aria-label="${t('next')}">›</button></div>
    <div class="cal">${['ma', 'ti', 'on', 'to', 'fr', 'lø', 'sø'].map(d => `<span class="dow">${d}</span>`).join('')}${cells}</div>
    <p class="small"><span class="key booked"></span>${t('booked')} <span class="key mine"></span>${t('yourRequest')}</p>`;
}
function pHouse() {
  return `<div class="wrap narrow"><h1>${t('house')} ${f2tag()}</h1><figure class="work-img">${img('hb-huset', '')}</figure><p class="lead">${t('houseLead')}</p>
    <div class="chips">${DATA.house.units.map((u, i) => `<button data-act="houseunit" data-v="${i}" aria-pressed="${STATE.houseUnit === i}">${esc(u)}</button>`).join('')}</div>
    ${houseCal()}<p class="note">${t('houseNote')}</p></div>`;
}
function iHouseAdmin() {
  return `<h1>${t('house')} ${f2tag()}</h1><p class="lead">${t('houseAdminLead')}</p>${houseCal()}
    <h2>${t('requests')}</h2>${STATE.houseReq.length ? `<ul class="receipts">${STATE.houseReq.map(r => `<li><div><strong>${r.d}. ${monthName(r.m)}</strong><span>${esc(DATA.house.units[r.u || 0])}</span></div><span class="status s-ny">${t('st_ny')}</span></li>`).join('')}</ul>` : `<p class="empty">${t('noRequests')}</p>`}`;
}

/* Arkiv og verktøykasse */
function pArchive() {
  return `<div class="wrap"><h1>${t('archive')} ${f2tag()}</h1><p class="lead narrowtext">${t('archiveLead')}</p>
    <div class="archive">${DATA.archive.map(a => `<a class="arch" href="#/arkiv"><span class="arch-img">${img(a.img, '')}</span><strong>${a.y}</strong><span>${esc(a.t)}${a.n ? ` · ${t('nPosts', { n: a.n })}` : ` · ${t('toBuild')}`}</span></a>`).join('')}</div></div>`;
}

/* ====================================================================
   Hendelser
   ==================================================================== */
const toggle = (arr, v) => { const i = arr.indexOf(v); i < 0 ? arr.push(v) : arr.splice(i, 1); };
const ACTIONS = {
  menu() { STATE.menu = !STATE.menu; },
  sub() { STATE.sub = !STATE.sub; },
  sheet() { STATE.sheet = !STATE.sheet; },
  when(v) { STATE.when = v; },
  day(v) { STATE.day = +v; },
  cat(v) { STATE.cat = v; },
  fav(v) { toggle(STATE.fav, v); },
  take(v) { toggle(STATE.taken, v); },
  energy(v) { STATE.energy = +v; },
  folkg(v) { STATE.folkG = v; },
  persona(v) { const prev = DATA.personas[STATE.persona]; STATE.persona = v; if (DATA.personas[v].lang) STATE.lang = DATA.personas[v].lang; else if (prev && prev.lang && STATE.lang === prev.lang) STATE.lang = 'nb'; STATE.sheet = false; STATE.wGroup = 'mine'; STATE.chat = false; STATE.chatId = null; if (['arshjul', 'koordinering', 'drift', 'husutleie'].includes(route().b)) location.hash = '#/inn'; },
  logout() { STATE.sheet = false; },
  wmonth(v) { STATE.wMonth = +v === STATE.wMonth ? null : (+v || null); },
  wgroup(v) { STATE.wGroup = v; },
  print() { setTimeout(() => window.print(), 50); },
  dlwheel() {
    const svg = document.getElementById('wheel').outerHTML.replace('<svg', '<svg font-family="Manrope, sans-serif"');
    const a = document.createElement('a'); a.href = URL.createObjectURL(new Blob([svg], { type: 'image/svg+xml' })); a.download = 'arshjul-karlsoyfestivalen.svg'; a.click();
  },
  claim(v) { if (!STATE.claimed.includes(v)) STATE.claimed.push(v); STATE.toast = t('claimToast'); },
  repair(v) { STATE.repair = +v; },
  toast(v) { STATE.toast = v; },
  chat() { STATE.chat = !STATE.chat; STATE.chatId = null; },
  chatback() { STATE.chatId = null; },
  chatopen(v) { STATE.chat = true; STATE.chatId = v; const c = byId(DATA.channels, v); if (c) STATE.read[v] = c.msgs.filter(m => !isMe(m)).length; },
  newtask() { STATE.newTask = !STATE.newTask; },
  taskstep(v) {
    const x = STATE.tasks.find(k => k.id === v);
    if (!x.to) { x.to = persona().name; STATE.toast = t('toastTaken', { r: x.role }); }
    else { x.status = STATUS[Math.min(2, STATUS.indexOf(x.status) + 1)]; if (x.status === 'ferdig') STATE.toast = t('toastDone', { n: x.by }); }
  },
  mailbox(v) { STATE.mailBox = v; },
  reply(v) { STATE.replyTo = v; },
  mailtake(v) { STATE.mailState[v] = Object.assign({}, STATE.mailState[v], { who: persona().name, status: 'tatt' }); STATE.toast = t('mailTaken'); },
  maildone(v) { STATE.mailState[v] = Object.assign({}, STATE.mailState[v], { status: 'besvart', who: (STATE.mailState[v] || {}).who || persona().name }); STATE.toast = t('mailDone'); },
  try2(v) { if (!mailUser()) { STATE.persona = 'los'; STATE.toast = t('tryAs'); } saveState(); if (location.hash === '#/inn/' + v) render(false); else location.hash = '#/inn/' + v; },
  mapsel(v) { STATE.mapSel = v; location.hash = v ? '#/handbok/kart/' + v : '#/handbok/kart'; },
  maplvl(v) { STATE.mapLvl = v; STATE.mapSel = ''; if (location.hash !== '#/handbok/kart') location.hash = '#/handbok/kart'; },
  mail2cal(v) { STATE.newEvent = true; location.hash = '#/inn/kalender'; },
  mail2task(v) { const m = DATA.mails.find(x => x.id === v); STATE.tasks.unshift({ id: 'o' + Date.now(), t: m.subj, role: t('mailFollow'), g: myGroups()[0], to: persona().name, by: persona().name, status: 'ny', due: '–' }); STATE.toast = t('taskFromMail'); },
  calmonth(v) { STATE.calM += +v; if (STATE.calM < 1) { STATE.calM = 12; STATE.calY--; } if (STATE.calM > 12) { STATE.calM = 1; STATE.calY++; } STATE.calDay = 0; },
  calday(v) { STATE.calDay = +v === STATE.calDay ? 0 : +v; },
  calgroups(v) { STATE.calGroups = v; },
  newevent() { STATE.newEvent = !STATE.newEvent; },
  becomemember() { STATE.member = true; STATE.toast = t('youAreMember'); },
  housemonth(v) { STATE.houseMonth = Math.min(12, Math.max(1, STATE.houseMonth + +v)); },
  houseunit(v) { STATE.houseUnit = +v; },
  houseday(v) {
    const d = +v, m = STATE.houseMonth, i = STATE.houseReq.findIndex(r => r.m === m && r.d === d);
    if (i >= 0) STATE.houseReq.splice(i, 1); else { STATE.houseReq.push({ m, d, u: STATE.houseUnit }); STATE.toast = t('houseToast'); }
  }
};
Object.assign(ACTIONS, window.TK_ACTIONS || {});
document.addEventListener('click', e => {
  const el = e.target.closest('[data-act]');
  if (!el || el.tagName === 'SELECT' || el.tagName === 'FORM' || el.tagName === 'INPUT') return;
  if (STATE.sub && !el.closest('.dd')) STATE.sub = false;
  const act = ACTIONS[el.dataset.act];
  if (!act) return;
  if (el.tagName !== 'A') e.preventDefault();
  act(el.dataset.v);
  saveState();
  if (el.tagName !== 'A') render(true);
});
document.addEventListener('keydown', e => {
  if ((e.key === 'Enter' || e.key === ' ') && e.target.matches('svg [data-act]')) { e.preventDefault(); e.target.dispatchEvent(new MouseEvent('click', { bubbles: true })); }
  if (e.key === 'Escape' && (STATE.menu || STATE.sheet || STATE.chat || STATE.sub)) { STATE.menu = STATE.sheet = STATE.chat = STATE.sub = false; render(true); }
  if (e.key === 'Enter' && !e.shiftKey && e.target.id === 'chat-in') { e.preventDefault(); e.target.form.requestSubmit(); }
});
document.addEventListener('change', e => {
  const el = e.target.closest('[data-act]');
  if (!el) return;
  const a = el.dataset.act;
  if (a === 'lang') STATE.lang = el.value;
  else if (a === 'group') STATE.group = el.value;
  else if (a === 'venue') STATE.venue = el.value;
  else if (a === 'hide') STATE.hidden = el.checked;
  else if (a === 'check') { const [g, i] = el.dataset.v.split('|'), key = g + E.next.from.slice(0, 4); STATE.checks[key] = STATE.checks[key] || []; toggle(STATE.checks[key], +i); }
  else if (a === 'tpl') { const x = DATA.mailTemplates[+el.value]; const b = document.getElementById('mailbody'); if (x && b) b.value = factsPlain(x.body) + b.value; return; }
  else if (a === 'photo') {
    const f = el.files[0], ph = document.getElementById('photo-ph');
    if (f && ph) { const u = URL.createObjectURL(f); ph.innerHTML = `<img src="${u}" alt="${esc(t('receiptPhoto'))}">`; }
    return;
  } else return;
  saveState(); render(true);
});
document.addEventListener('input', e => {
  if (e.target.dataset.act === 'q') { STATE.q = e.target.value; const pos = e.target.selectionStart; render(true); const inp = document.querySelector('[data-act="q"]'); if (inp) { inp.focus(); inp.setSelectionRange(pos, pos); } }
});
document.addEventListener('submit', e => {
  const a = e.target.dataset.act; if (!a) return;
  e.preventDefault();
  const fd = new FormData(e.target);
  if (a === 'subscribe') STATE.subscribed = true;
  if (a === 'chatsend') {
    const txt = e.target.querySelector('textarea').value.trim();
    if (!txt || !STATE.chatId) return;
    (STATE.sent[STATE.chatId] = STATE.sent[STATE.chatId] || []).push({ from: persona().name, t: txt, when: '' });
  }
  if (a === 'addtask') { STATE.tasks.unshift({ id: 'o' + Date.now(), t: fd.get('t'), role: fd.get('role'), g: fd.get('g'), to: fd.get('to') || null, by: persona().name, status: 'ny', due: fd.get('due') || '–' }); STATE.newTask = false; STATE.toast = fd.get('to') ? t('toastAssigned', { n: fd.get('to') }) : t('toastOpen'); }
  if (a === 'receipt') { STATE.receipts.unshift({ id: 'k' + Date.now(), t: fd.get('t'), kr: +fd.get('kr'), g: fd.get('g'), date: new Date().toLocaleDateString('nb-NO', { day: '2-digit', month: '2-digit', year: '2-digit' }), status: 'sendt' }); STATE.toast = t('receiptSent'); }
  if (a === 'join') { STATE.member = true; STATE.toast = t('youAreMember'); }
  if (a === 'sendmail') { STATE.sentMail.push({ id: 'u' + Date.now(), box: 'sendt', from: '', to: fd.get('to'), subj: fd.get('subj'), body: fd.get('body') || '', when: t('justNow'), ts: Date.now() }); if (STATE.replyTo) STATE.mailState[STATE.replyTo] = Object.assign({}, STATE.mailState[STATE.replyTo], { status: 'besvart', who: persona().name }); STATE.replyTo = null; STATE.toast = t('mailSent', { f: fd.get('from') }); saveState(); location.hash = '#/inn/epost'; return; }
  if (a === 'addevent') { const [y, m, d] = String(fd.get('date')).split('-').map(Number); STATE.myEvents.push({ y, m, d, t: fd.get('t'), time: fd.get('time'), g: fd.get('g'), where: fd.get('where') }); STATE.calY = y; STATE.calM = m; STATE.calDay = d; STATE.newEvent = false; STATE.toast = fd.get('invite') ? t('eventInvited', { l: fd.get('g') + '-liste@' }) : t('eventAdded'); }
  saveState(); render(true);
  const inp = document.getElementById('chat-in'); if (inp) inp.focus();
});
window.addEventListener('hashchange', () => { STATE.menu = false; STATE.sub = false; STATE.sheet = false; STATE.chat = false; STATE.chatId = null; STATE.repair = 0; if (route().c !== 'ny' && route().b === 'epost' && !route().c) STATE.replyTo = null; render(false); });
render(false);

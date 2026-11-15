# Karlsøy 2.0 – prototype

Statisk skisse av brukeropplevelsen i Karlsøy 2.0: utsiden (nettside bygget som en Hypa Poiesis-instans) og innsiden (dashbord, årshjul, Tavla, koordinering, meldinger).

Utsiden er bygget rundt programposter og bidragsytere. Innhold som lages rundt en programpost (strøm, opptak, bilder, tekst, avisoppslag) kobles i et forløp. Ordene «verk» og «dialog» fra Hypa Poiesis brukes ikke i grensesnittet; se `DATA.items` og `DATA.threads` i `js/data.js`.

Ren HTML, CSS og JavaScript. Ingen byggesteg, ingen rammeverk, ingen eksterne kall.

## Kjøre lokalt

Åpne `index.html` i en nettleser, eller start en enkel server:

    python3 -m http.server 8000

## Legge ut på GitHub Pages

1. Opprett et repo og last opp alt innholdet i denne mappa (også `.nojekyll`).
2. Gå til Settings → Pages.
3. Velg «Deploy from a branch», branch `main` og mappe `/ (root)`.
4. Siden blir tilgjengelig på `https://<bruker>.github.io/<repo>/`.

Alle lenker er relative, så prototypen fungerer i en undermappe.

## Filer

| Fil | Innhold |
| --- | --- |
| `index.html` | Skallet |
| `css/style.css` | Utseende, mobil først |
| `js/data.js` | All data: årgang, program, steder, grupper, frister, verk, eksempelbrukere |
| `js/i18n.js` | Grensesnitt-tekster på norsk, engelsk, fransk og nederlandsk |
| `js/app.js` | Sider, ruter og hendelser |
| `assets/` | Logo og bilder fra dagens nettside |

## Endre innhold

Alt innhold ligger i `js/data.js`. Pris, datoer og klokkeslett står én gang i `DATA.edition` og settes inn i tekster med `{price}`, `{dinner}` og så videre. Årshjulet tegnes fra `DATA.deadlines`.

## Ekte data og eksempler

Ekte, fra programhefte 2026, håndboka v9.1 og nettsiden: program, steder, kategorier, bidragsytere, manifest, grupper, huskelister, frister, prinsipper og FAQ.

Eksempler: brukerne på innsiden, meldinger, Tavla-kort, samreise, statuser på bidrag, driftsstatus, medieopptak, avisoppslag og paneldebatt.

Bildene er hentet fra karlsoyfestivalen.no. Fotograf og lisens mangler og bør avklares før prototypen deles åpent. `index.html` har `noindex`, slik at søkemotorer ikke lister siden.

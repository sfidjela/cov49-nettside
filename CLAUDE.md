# Caroline Øverlands vei 49 – Nobello Nettside

## Prosjektbeskrivelse
Markedsføringsnettside for et eksklusivt boligprosjekt i Bekkestua, Bærum. Prosjektet består av én enebolig og én tomannsbolig (2 enheter), alle med høy standard og arkitektutforming. Utviklet av Nobello AS.

## Teknologi
- **HTML5 / CSS3 / Vanilla JavaScript (ES6+)** – ingen rammeverk
- **Hosting:** Netlify (konfigurasjon i `netlify.toml`)
- **Skjema:** FormSubmit.co via AJAX
- **Kart:** Google Maps Embed API

## Viktige filer
| Fil | Innhold |
|-----|---------|
| `index.html` | Hele nettsiden (én enkelt HTML-fil, ~42 KB) |
| `index.css` | All styling (~30 KB) |
| `main.js` | All interaktivitet (~8 KB) |
| `netlify.toml` | Hosting, cache-regler og sikkerhetsheadere |
| `sitemap.xml` / `robots.txt` | SEO |

## Mappestruktur
- `images/` – produktbilder og livsstilsbilder; `images/optimized/` har responsive varianter (768w, 1280w, 1920w i WebP)
- `brown_font/` og `fonts/` – custom fonten "Brown" i ulike vekter/formater
- `Logo/` og `Nobello logo/` – logoer i SVG og JPG
- `Underlagsdokumenter CØV49/` – tekniske tegninger, plantegninger, prospekt (ikke brukt på nettsiden direkte)

## Kodekonvensjoner
- **Språk i kode og kommentarer:** Norsk bokmål
- **CSS-variabler:** Brukes gjennomgående for farger, spacing og typografi – endre alltid via variablene, ikke hardkode verdier
- **Responsiv typografi:** `clamp(min, preferred, max)` – ikke endre til faste px-verdier
- **Bilder:** Bruk alltid `srcset` med WebP-varianter fra `images/optimized/`
- **Animasjoner:** Scroll-trigget via `IntersectionObserver` og klassen `.reveal` (med `.reveal-delay-1` osv.)

## Seksjoner på forsiden (i rekkefølge)
1. Hero – Hovedbilde & introduksjon
2. Boligene – Enebolig og tomannsbolig
3. Konsept – Prosjektbeskrivelse og arkitektur
4. Kvaliteter & Materialer – Overflater og leveranse
5. Smart hjem – Plejd-system og tekniske detaljer
6. Bildegalleri – 20 illustrasjoner med filter
7. Kjøpsprosessen – Trinn-for-trinn og tilvalg
8. Beliggenhet & Nærområde – Utsikt og interaktivt kart
9. Kontakt oss – Skjema og prospektnedlasting

## Viktige mønstre i JavaScript (`main.js`)
- Alt er pakket i én IIFE for å unngå global scope
- Plantegningsfaner: `data-plan`-attributt styrer hvilken plan som vises
- Kart-POI: `data-dest`-attributt med koordinater
- Kontaktskjema: AJAX til FormSubmit.co, viser suksessmelding ved innsending
- Flytende notat: Bruker `sessionStorage` for å huske om brukeren har lukket det

## Regler for arbeid
- Les alltid filen før du foreslår endringer
- Ikke introduser nye avhengigheter eller rammeverk uten å spørre
- Behold eksisterende designspråk og CSS-variabler
- Test at siden fortsatt ser riktig ut på mobil etter endringer (responsivt design er kritisk)
- Ikke endre `netlify.toml` uten god grunn – sikkerhetsheadere og cache-regler er nøye satt opp

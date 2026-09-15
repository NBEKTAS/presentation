# ECEE 2026 — HTML Slide System

Standalone per-slide HTML presentation generated from `Bektas_ECEE2026_Presentation.pptx`.

## Structure

```
index.html              Overview menu (links to all slides)
presentation.html       ★ CENTRAL PLAYER — the one file you open to present
slides/
  slide01.html … slide11.html   Each slide = independent HTML page
  assets/                       Figures extracted from the PPTX
css/
  slide01.css … slide11.css     One stylesheet PER SLIDE (fully isolated)
  menu.css                      Stylesheet for index.html only
  player.css                    Stylesheet for presentation.html only
js/
  deck.js                       Slide-side nav (standalone mode; relays to
                                the player when embedded)
build_slides.py                 Regenerates slides 02–11 + their CSS
serve.py                        Detached local server (port 8642)
```

## Presenting (one central file)

Open **`presentation.html`** — it plays the whole deck in a 16:9 letterboxed
frame with unified controls:

- `→` / `Space` / `PgDn` next · `←` / `PgUp` previous · `Home` / `End` jump ·
  `Esc` exit to overview · `F` fullscreen
- Dot navigation, progress bar, slide counter, hover edge arrows, touch swipe
- Deep-link to any slide: `presentation.html#7`

Slides still work fully standalone when opened directly — `deck.js` detects
whether a slide runs inside the player and relays navigation to it via
`postMessage` (hiding the slide's own footer bar, since the player has chrome).

## Isolation guarantee

- `slides/slideNN.html` loads **only** `../css/slideNN.css` — no slide shares a
  stylesheet with another, so no style can ever bleed across slides.
- `deck.js` injects its own footer-bar styles at runtime and never touches slide
  markup; a slide page can omit it entirely with no side effects.
- Slide 1 was hand-crafted (title layout); slides 02–11 are generated — edit
  either the HTML files directly for one-off changes, or `build_slides.py` and
  re-run `python3 build_slides.py` for content changes.

## Speaker notes

The full speaker notes from the PPTX are embedded as an HTML comment at the top
of each slide file (search "SPEAKER NOTES").

## Navigation (slide opened directly)

- `→` / `Space` / `PgDn` — next · `←` / `PgUp` — previous
- `Home` — first slide · `End` — last · `Esc` — back to overview
- Click right edge = next, left edge = previous; swipe on touch screens
- Footer bar: ☰ Overview · slide counter · Prev / Next

## Run locally

```
python3 serve.py            # starts detached server on http://127.0.0.1:8642
open http://127.0.0.1:8642  # then present from slides/slide01.html
```

Stop the server with: `kill $(cat /tmp/ppt_server.pid)`

## Framework cycle diagram (slide 4)

Slide 4's static PPTX figure is replaced by a **live HTML/SVG diagram**: the four
components orbit a central "City-Scale Operational Integration" hub, connected
by animated dashed arcs in stage colors (blue → amber → green → violet). The
whole diagram scales as a unit via container queries, so it fits any viewport
without clipping. The original static figure remains available at
`slides/assets/slide04-framework.jpeg`.

## Live EFEHR map (slide 3)

Slide 3 embeds the **European Seismic Risk Index (ESRM20)** as a live,
interactive Leaflet + WMS layer from the official EFEHR MapProxy
(`maps.eu-risk.eucentre.it`, CC BY 4.0, attribution shown on-slide), with an
İzmir marker. If the venue network blocks the service, the slide automatically
falls back to the static figure from the paper within ~6 s — the status badge
reads `EFEHR ESRM20 · LIVE` or `EFEHR ESRM20 · OFFLINE · static figure`.

## Theme

Colors and fonts mirror the PPTX theme: slate `#44546A`, accent `#4472C4`,
Calibri Light headings, Calibri body.

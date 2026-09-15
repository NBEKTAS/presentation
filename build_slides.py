#!/usr/bin/env python3
"""Generate standalone slide HTML + per-slide CSS files from PPTX-extracted content.

Every slide gets:
  slides/slideNN.html  -> links ONLY ../css/slideNN.css and ../js/deck.js
  css/slideNN.css      -> used by that one slide alone

No shared stylesheet exists between slides, so styles can never bleed
across slides. Re-run this script any time to regenerate all slides.
"""

import os

ROOT = os.path.dirname(os.path.abspath(__file__))

# ----------------------------------------------------------------------------
# Content extracted from Bektas_ECEE2026_Presentation.pptx
# ----------------------------------------------------------------------------
SLIDES = {
    2: {
        "title": "Urban earthquake risk is systemic",
        "bullets": [
            "Physical damage disrupts infrastructure, services and livelihoods.",
            "Fragmented responsibilities weaken coordinated action.",
            "The challenge: connect technical risk assessment with municipal decisions.",
        ],
        "notes": ("Earthquake risk in cities extends beyond the capacity of individual "
                  "buildings. Damage can disrupt lifeline networks, essential services, "
                  "economic activity, and housing. These consequences depend on both "
                  "physical vulnerability and the ability of institutions and communities "
                  "to act. The paper identifies a gap between technical risk assessment "
                  "and operational urban management."),
    },
    3: {
        "title": "İzmir motivates a city-scale approach",
        "bullets": [
            "Interconnected urban assets require coordinated risk management.",
            "İRAP and local planning provide an institutional entry point.",
            "The map provides regional context, not a new loss calculation.",
        ],
        "figure": "assets/slide03-map.jpeg",
        "figure_caption": ("Live layer: European Seismic Risk Index (ESRM20, EFEHR) — "
                           "context only, not a new loss calculation. "
                           "Static figure from the paper shown when offline."),
        "live_map": {
            "service": "https://maps.eu-risk.eucentre.it/mapproxy/European_Risk_Index_Gridded/ows",
            "layers": "seismic-risk,shaded-relief,country",
            "center": [40.5, 18.0],
            "zoom": 4,
            "izmir": [38.4237, 27.1428],
        },
        "notes": ("İzmir provides the setting for the proposed framework. The seismic "
                  "risk map reproduced from the paper locates the city within the wider "
                  "European risk context. It supports the motivation for coordinated "
                  "risk management; it is not a new calculation produced by this study."),
    },
    4: {
        "title": "Four components form one learning cycle",
        "bullets": [
            "Risk understanding",
            "Governance",
            "Resilience investment",
            "Preparedness and recovery",
        ],
        "link_note": "Shared data, budget alignment and monitoring connect the components.",
        "grid": True,
        "diagram": True,
        "notes": ("The framework is organized around four interconnected components, "
                  "aligned with the Sendai priorities: shared understanding of risk, "
                  "governance and coordination, structural and non-structural investment, "
                  "and preparedness with Build Back Better recovery. Their value lies in "
                  "their interaction, with experience and new evidence feeding back into "
                  "future decisions."),
    },
    5: {
        "title": "1 | Build a shared understanding of risk",
        "bullets": [
            "Combine hazard, exposure, vulnerability and institutional capacity.",
            "Maintain shared GIS data and a Common Operating Picture.",
            "Translate evidence into accessible risk communication.",
        ],
        "notes": ("The first component establishes the information base for action. It "
                  "combines hazard assessment, exposure mapping, vulnerability "
                  "characterization, and institutional capacity assessment. A Common "
                  "Operating Picture gives participating agencies a shared basis for "
                  "understanding risks and operational needs."),
    },
    6: {
        "title": "2 | Make coordination operational",
        "bullets": [
            "Establish a City-Level Resilience Coordination Platform.",
            "Define mandates across authorities, operators and communities.",
            "Link risk evidence to planning, budgets and accountability.",
        ],
        "notes": ("The second component makes responsibilities explicit. The proposed "
                  "City-Level Resilience Coordination Platform brings together public "
                  "authorities, infrastructure operators, technical experts, the private "
                  "sector, and civil society. Risk information becomes actionable only "
                  "when institutions know who is responsible."),
    },
    7: {
        "title": "3 | Turn priorities into investment",
        "bullets": [
            "Structural: retrofit buildings and strengthen critical lifelines.",
            "Non-structural: improve land-use planning and institutional capacity.",
            "Use economic and multi-criteria appraisal with sustained financing.",
        ],
        "notes": ("The third component connects priorities to resources. Structural "
                  "measures include seismic retrofitting and strengthening critical "
                  "lifeline systems; non-structural measures include risk-informed "
                  "land-use planning, capacity building, and monitoring or warning "
                  "systems."),
    },
    8: {
        "title": "4 | Prepare for response and recovery",
        "bullets": [
            "Coordinate emergency plans, communication protocols and drills.",
            "Plan recovery before an earthquake occurs.",
            "Build Back Better: reduce future vulnerability and feed lessons into mitigation.",
        ],
        "notes": ("The fourth component integrates preparedness with recovery planning. "
                  "Build Back Better means using reconstruction to reduce future "
                  "vulnerability. Mitigation, preparedness, response, and recovery "
                  "overlap rather than forming isolated stages."),
    },
    9: {
        "title": "Embed the roadmap in municipal routines",
        "roadmap": [
            ("I", "Establish the shared risk information base."),
            ("II", "Formalize mandates and cross-sector coordination."),
            ("III", "Prioritize and finance risk reduction measures."),
            ("IV", "Integrate preparedness, recovery and continuous review."),
        ],
        "notes": ("The implementation roadmap follows four phases, providing an "
                  "organizational sequence while feedback continues throughout "
                  "implementation. In Türkiye, alignment with İRAP and local Earthquake "
                  "Master Plans can support coherence."),
    },
    10: {
        "title": "Contribution and evidence boundaries",
        "bullets": [
            "Contribution: a municipal architecture linking risk, governance and action.",
            "İzmir supplies the context for the proposed roadmap.",
            "Implementation effectiveness, costs and loss reduction remain to be evaluated.",
        ],
        "notes": ("The main contribution is the integration of technical risk "
                  "understanding with institutional coordination, investment, and "
                  "preparedness in one municipal architecture. The paper does not report "
                  "a municipal pilot or measured improvements in losses or recovery time."),
    },
    11: {
        "title": "Resilience needs coordinated decisions",
        "bullets": [
            "Connect engineering evidence with municipal responsibility.",
            "Sustain investment, preparedness and inclusive participation.",
            "Use monitoring and recovery to improve the next decision cycle.",
        ],
        "closing": "Thank you",
        "notes": ("Urban earthquake resilience requires both engineering evidence and "
                  "the institutional capacity to act on it. Resilience depends on "
                  "maintaining the connection between what a city knows about its risks "
                  "and what its institutions and communities can do about them. Thank you."),
    },
}

TOTAL = 11

# ----------------------------------------------------------------------------
# CSS template (identical rules for every standard slide, but delivered as a
# separate physical file per slide so edits never propagate between slides)
# ----------------------------------------------------------------------------
CSS_TEMPLATE = """/* ============================================================
   slide@@NUM@@.css — ONLY used by slides/slide@@NUM@@.html.
   ECEE2026 theme: slate #44546A, accent #4472C4, Calibri Light.
   No other slide loads this file.
   ============================================================ */
:root{
  --c-primary:#44546A;
  --c-primary-dark:#2E3A52;
  --c-accent:#4472C4;
  --c-ink:#22262E;
  --c-muted:#66707F;
  --c-paper:#FFFFFF;
  --c-line:#D9DEE7;
  --font-head:"Calibri Light","Segoe UI",Roboto,Helvetica,Arial,sans-serif;
  --font-body:Calibri,"Segoe UI",Roboto,Helvetica,Arial,sans-serif;
}
*{box-sizing:border-box;margin:0;padding:0}
html,body{height:100%}
body{
  font-family:var(--font-body);
  color:var(--c-ink);
  background:var(--c-paper);
}
.stage{
  min-height:100%;
  display:flex;align-items:center;justify-content:center;
  padding:48px clamp(24px,5vw,72px) 104px;
}
.slide{width:min(1180px,100%)}

/* ---- title ---- */
.slide-title{
  font-family:var(--font-head);font-weight:300;
  font-size:clamp(1.6rem,2.6vw,2.4rem);line-height:1.18;
  color:var(--c-primary-dark);
  padding-left:16px;border-left:5px solid var(--c-accent);
  margin-bottom:clamp(24px,4vh,44px);
  max-width:30ch;
}

/* ---- bullet list ---- */
.points{list-style:none}
.points li{
  position:relative;
  font-size:clamp(1.08rem,1rem + .45vw,1.32rem);
  line-height:1.5;
  padding-left:30px;
  margin-bottom:clamp(14px,2.4vh,24px);
  max-width:58ch;
}
.points li::before{
  content:"";
  position:absolute;left:2px;top:.52em;
  width:11px;height:11px;
  background:var(--c-accent);
  transform:rotate(45deg);
}
.points li strong{color:var(--c-primary-dark)}

/* ---- 2x2 component grid (slide 4) ---- */
.points--grid{
  display:grid;grid-template-columns:1fr 1fr;
  gap:14px;max-width:640px;
}
.points--grid li{
  background:#F4F6FA;
  border:1px solid var(--c-line);
  border-left:4px solid var(--c-accent);
  border-radius:8px;
  padding:16px 18px;margin-bottom:0;
  font-weight:700;color:var(--c-primary-dark);
}
.points--grid li::before{display:none}
.link-note{
  margin-top:18px;
  font-size:1.05rem;color:var(--c-muted);
  padding-left:30px;position:relative;
  max-width:56ch;
}
.link-note::before{
  content:"⇄";
  position:absolute;left:2px;top:0;
  color:var(--c-accent);font-weight:700;
}

/* ---- roadmap (slide 9) ---- */
.roadmap{list-style:none;max-width:760px}
.roadmap li{
  display:flex;align-items:baseline;gap:16px;
  padding:clamp(10px,1.8vh,16px) 0;
  border-bottom:1px solid var(--c-line);
  font-size:clamp(1.08rem,1rem + .4vw,1.3rem);line-height:1.45;
}
.roadmap li:last-child{border-bottom:none}
.roman{
  font-family:var(--font-head);
  font-weight:700;color:var(--c-accent);
  min-width:52px;text-align:right;
  font-size:1.05em;letter-spacing:.02em;
}

/* ---- figure (slides 3, 4) ---- */
.cols{display:grid;gap:clamp(24px,4vw,48px);align-items:center}
.cols--figure{grid-template-columns:minmax(0,5fr) minmax(0,6fr)}
.figure{min-width:0}
.figure img{
  width:100%;height:auto;
  max-height:58vh;object-fit:contain;
  border:1px solid var(--c-line);
  border-radius:10px;
  box-shadow:0 10px 28px rgba(46,58,82,.14);
  background:#fff;
}
.figure figcaption{
  margin-top:12px;
  font-size:.88rem;color:var(--c-muted);line-height:1.45;
}

/* ---- closing chip (slide 11) ---- */
.closing{
  display:inline-block;margin-top:clamp(18px,3vh,30px);
  font-family:var(--font-head);
  font-size:1.25rem;font-weight:700;letter-spacing:.04em;
  color:#fff;background:var(--c-primary);
  border-radius:999px;padding:10px 30px;
}

@media (max-width:860px){
  .cols--figure{grid-template-columns:1fr}
  .points li,.link-note{max-width:none}
}
@@EXTRA_CSS@@
"""

# ------------------------------------------------------------------
# Live EFEHR map additions (used only by slides that set "live_map")
# ------------------------------------------------------------------
LIVE_CSS = """
/* ---- live EFEHR seismic-risk map ---- */
.map-wrap{
  position:relative;width:100%;aspect-ratio:1200/560;
  background:#DFE6EF;
  border:1px solid var(--c-line);border-radius:10px;
  box-shadow:0 10px 28px rgba(46,58,82,.14);
  overflow:hidden;
}
.map{position:absolute;inset:0;cursor:grab;z-index:400}
.map:active{cursor:grabbing}
.map-fallback{position:absolute;inset:0;width:100%;height:100%;object-fit:cover;z-index:100}
.map-wrap.map--live .map-fallback{display:none}
.map-badge{
  position:absolute;top:10px;left:10px;z-index:700;
  background:rgba(46,58,82,.9);color:#fff;
  font-size:.66rem;font-weight:700;letter-spacing:.09em;
  padding:4px 11px;border-radius:999px;
}
.map-badge .st{color:#8FE3A8}
.map-wrap.map--static .map-badge .st{color:#FFD37D}
.map-legend{
  position:absolute;left:10px;bottom:10px;z-index:700;
  background:rgba(255,255,255,.94);border-radius:6px;
  padding:4px 6px;max-height:44%;width:auto;
}
.map-wrap.map--static .map-legend{display:none}
.leaflet-control-attribution{display:none}
"""

LIVE_HEAD = (
    '<link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" crossorigin="">\n'
    '<script src="https://unpkg.com/leaflet@1.9.4/dist/leaflet.js" crossorigin=""></script>'
)

LIVE_JS_TEMPLATE = """
/* Live EFEHR European Seismic Risk Index layer (ESRM20, CC BY 4.0).
   Falls back to the static paper figure if tiles/Leaflet are unavailable. */
(function () {
  var wrap = document.querySelector('.map-wrap');
  if (!wrap) return;
  var badge = wrap.querySelector('.map-badge .st');
  function goStatic() {
    wrap.classList.remove('map--live');
    wrap.classList.add('map--static');
    if (badge) badge.textContent = 'OFFLINE · static figure';
  }
  if (typeof L === 'undefined') { goStatic(); return; }

  var map = L.map('liveMap', {
    zoomControl: false, attributionControl: false,
    scrollWheelZoom: false, keyboard: false,
    zoomSnap: 0.25, inertia: false
  }).setView([@@LAT@@, @@LON@@], @@ZOOM@@);

  var tilesOk = false;
  var risk = L.tileLayer.wms('@@SERVICE@@', {
    layers: '@@LAYERS@@',
    format: 'image/png', transparent: true, version: '1.1.1',
    styles: '', uppercase: true
  });
  risk.on('tileload', function () {
    if (!tilesOk) {
      tilesOk = true;
      wrap.classList.add('map--live');
      if (badge) badge.textContent = 'LIVE';
    }
  });
  risk.on('tileerror', function () { /* counted below */ });
  risk.addTo(map);

  /* If no tile has loaded within 6s, show the static figure instead */
  setTimeout(function () { if (!tilesOk) goStatic(); }, 6000);

  /* İzmir marker + label */
  L.circleMarker([@@IZMIR_LAT@@, @@IZMIR_LON@@], {
    radius: 7, color: '#FFFFFF', weight: 2,
    fillColor: '#E74C3C', fillOpacity: 1
  }).addTo(map).bindTooltip('İzmir', {
    permanent: true, direction: 'right', offset: [10, 0],
    className: 'izmir-label'
  }).openTooltip();

  /* Zoom controls styled to stay visible over the map */
  L.control.zoom({ position: 'topright' }).addTo(map);
})();
"""

# ----------------------------------------------------------------------------
# Framework cycle diagram (slide 4) — colorful SVG-arrow HTML version,
# replacing the static PPTX figure. Styles live in slide04.css only.
# ----------------------------------------------------------------------------
DIAGRAM_CSS = """
/* ---- framework cycle diagram (HTML/SVG, colorful) ---- */
.diagram-zone{margin-top:6px}
.diagram-link-note{margin-top:10px;max-width:none}
.figure--diagram{container-type:inline-size}
.diagram-card{
  position:relative;
  background:var(--c-paper);
  border:1px solid var(--c-line);
  border-radius:14px;
  aspect-ratio:4/3;
  width:min(100%,calc(58vh * 4 / 3));
  margin-inline:auto;
  padding:16px;
  overflow:hidden;
  display:flex;align-items:center;justify-content:center;
  font-size:clamp(8.5px,2.1cqw,14px); /* everything below scales in em */
}
.arrows-layer{
  position:absolute;inset:0;width:100%;height:100%;
  pointer-events:none;z-index:1;
}
.cycle-arc{
  fill:none;stroke-linecap:round;stroke-linejoin:round;
  stroke-width:3.2;
  stroke-dasharray:7,7;
  animation:dashCycle 22s linear infinite;
}
#arc-1{stroke:#2563EB;marker-end:url(#ah-1)}
#arc-2{stroke:#D97706;marker-end:url(#ah-2)}
#arc-3{stroke:#059669;marker-end:url(#ah-3)}
#arc-4{stroke:#7C3AED;marker-end:url(#ah-4)}
@keyframes dashCycle{to{stroke-dashoffset:-400}}
.diagram-grid{
  position:relative;width:100%;height:100%;z-index:2;
  display:grid;
  grid-template-columns:minmax(0,1fr) minmax(180px,216px) minmax(0,1fr);
  grid-template-rows:1fr minmax(0,52%) 1fr;
  align-items:center;justify-items:center;
}
.node{
  display:flex;flex-direction:column;z-index:3;padding:6px 10px;border-radius:12px;
}
.node-title{
  font-family:var(--font-head);
  font-size:1.32em;font-weight:700;
  color:var(--stage);line-height:1.22;
  display:inline-block;width:fit-content;
  padding-bottom:3px;margin-bottom:7px;
  border-bottom:2px solid var(--stage);
  white-space:nowrap;
}
.node ul,.hub ul{list-style:none;padding:0;margin:0}
.node li{
  display:flex;align-items:center;gap:.5em;
  font-size:1em;line-height:1.42;
  font-weight:500;color:var(--c-ink);
  margin-bottom:3px;white-space:nowrap;
}
.node li::before{
  content:"";display:inline-block;width:5px;height:5px;border-radius:50%;
  background:var(--stage);flex-shrink:0;
}
.node--top{grid-column:2;grid-row:1;align-items:center;align-self:flex-start;text-align:center;padding-top:2px;--stage:#2563EB}
.node--top ul{text-align:left;display:inline-block}
.node--right{grid-column:3;grid-row:2;align-items:flex-start;justify-self:start;padding-left:18px;--stage:#D97706}
.node--bottom{grid-column:2;grid-row:3;align-items:center;align-self:flex-end;text-align:center;padding-bottom:2px;--stage:#059669}
.node--bottom ul{text-align:left;display:inline-block}
.node--left{grid-column:1;grid-row:2;align-items:flex-start;justify-self:end;padding-right:18px;--stage:#7C3AED}
.node--left .node-title{white-space:normal}
.hub{
  grid-column:2;grid-row:2;
  width:100%;max-width:216px;aspect-ratio:1/1;
  border-radius:50%;border:2px solid var(--c-primary-dark);
  background:#fff;z-index:3;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  padding:12px 16px;text-align:center;
  box-shadow:0 4px 18px rgba(15,23,42,.05);
}
.hub-title{
  font-family:var(--font-head);
  font-size:1.12em;font-weight:700;line-height:1.22;
  color:var(--c-primary-dark);
  display:inline-block;border-bottom:1.5px solid var(--c-primary-dark);
  padding-bottom:4px;margin-bottom:7px;width:88%;
}
.hub li{
  display:flex;align-items:center;gap:.45em;
  font-size:.95em;line-height:1.4;
  font-weight:500;color:var(--c-ink);
  margin-bottom:2px;white-space:nowrap;
}
.hub li::before{
  content:"";display:inline-block;width:4px;height:4px;border-radius:50%;
  background:var(--c-primary-dark);flex-shrink:0;
}
@media (max-width:860px){
  .diagram-card{aspect-ratio:auto;width:100%;max-width:560px;padding:18px 12px}
  .arrows-layer{display:none}
  .diagram-grid{display:flex;flex-direction:column;gap:16px}
  .node--top,.node--right,.node--bottom,.node--left{padding:0;align-items:center;text-align:center}
  .node li,.hub li{white-space:normal}
  .hub{order:-1;margin-bottom:6px}
}
"""

DIAGRAM_HTML = """<div class="diagram-zone">
    <figure class="figure figure--diagram">
      <div class="diagram-card">
        <svg class="arrows-layer" viewBox="0 0 1000 750" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <marker id="ah-1" markerWidth="8" markerHeight="8" refX="6" refY="3.5" orient="auto"><polygon points="0 0, 7.5 3.5, 0 7" fill="#2563EB"/></marker>
            <marker id="ah-2" markerWidth="8" markerHeight="8" refX="6" refY="3.5" orient="auto"><polygon points="0 0, 7.5 3.5, 0 7" fill="#D97706"/></marker>
            <marker id="ah-3" markerWidth="8" markerHeight="8" refX="6" refY="3.5" orient="auto"><polygon points="0 0, 7.5 3.5, 0 7" fill="#059669"/></marker>
            <marker id="ah-4" markerWidth="8" markerHeight="8" refX="6" refY="3.5" orient="auto"><polygon points="0 0, 7.5 3.5, 0 7" fill="#7C3AED"/></marker>
          </defs>
          <path id="arc-1" class="cycle-arc" d="M 620 125 A 285 285 0 0 1 760 265"/>
          <path id="arc-2" class="cycle-arc" d="M 760 485 A 285 285 0 0 1 620 625"/>
          <path id="arc-3" class="cycle-arc" d="M 380 625 A 285 285 0 0 1 240 485"/>
          <path id="arc-4" class="cycle-arc" d="M 240 265 A 285 285 0 0 1 380 125"/>
        </svg>
        <div class="diagram-grid">
          <section class="node node--top">
            <div class="node-title-wrapper"><h2 class="node-title">1. Understanding Risk</h2></div>
            <ul>
              <li>Hazard Assessment</li>
              <li>Exposure Mapping</li>
              <li>Vulnerability Analysis</li>
              <li>Risk Communication</li>
            </ul>
          </section>
          <section class="node node--left">
            <div class="node-title-wrapper"><h2 class="node-title">4. Preparedness &amp;<br>Build Back Better</h2></div>
            <ul>
              <li>Emergency Planning</li>
              <li>Early Warning Systems</li>
              <li>Response Capacity</li>
              <li>Resilient Reconstruction</li>
            </ul>
          </section>
          <section class="hub">
            <h1 class="hub-title">City-Scale<br>Operational Integration</h1>
            <ul>
              <li>Data Platform</li>
              <li>Budget Alignment</li>
              <li>Monitoring &amp; Evaluation</li>
              <li>Adaptive Learning</li>
            </ul>
          </section>
          <section class="node node--right">
            <div class="node-title-wrapper"><h2 class="node-title">2. Risk Governance</h2></div>
            <ul>
              <li>Institutional Mandates</li>
              <li>Regulatory Framework</li>
              <li>Multi-Stakeholder Coordination</li>
              <li>Political Commitment</li>
            </ul>
          </section>
          <section class="node node--bottom">
            <div class="node-title-wrapper"><h2 class="node-title">3. Resilience Investment</h2></div>
            <ul>
              <li>Structural Mitigation</li>
              <li>Infrastructure Reinforcement</li>
              <li>Financial Instruments</li>
              <li>Urban Planning Integration</li>
            </ul>
          </section>
        </div>
      </div>
      <figcaption>The four components form a continuous learning cycle around an operational-integration core (adapted from the paper).</figcaption>
    </figure>
    <p class="link-note diagram-link-note">@@LINK_NOTE@@</p>"""

# ----------------------------------------------------------------------------
# HTML template
# ----------------------------------------------------------------------------
HTML_TEMPLATE = """<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>Slide @@NUM@@ — @@TITLE_HTML@@</title>
<link rel="stylesheet" href="../css/slide@@NUM@@.css">
@@EXTRA_HEAD@@
<!--
  SPEAKER NOTES (from PPTX):
  @@NOTES@@
-->
</head>
<body>
<main class="stage">
  <section class="slide">
    <h1 class="slide-title">@@TITLE_HTML@@</h1>
    @@CONTENT@@
  </section>
</main>

<script>
  const DECK = { prev:@@PREV@@, next:@@NEXT@@, first:"slide01.html", last:"slide11.html", num:@@N@@, total:@@TOTAL@@, menu:"../index.html" };
</script>
<script src="../js/deck.js"></script>
@@EXTRA_BODY@@
</body>
</html>
"""


def esc(s: str) -> str:
    return s.replace("&", "&amp;").replace("<", "&lt;").replace(">", "&gt;")


def bold_lead(s: str) -> str:
    """Bold a leading 'Word:' label, e.g. 'Structural: retrofit ...'."""
    if ":" in s:
        head, rest = s.split(":", 1)
        if 0 < len(head) <= 40 and " " not in head.strip() or len(head.split()) <= 2:
            return f"<strong>{esc(head)}:</strong>{esc(rest)}"
    return esc(s)


def build_content(num: int, data: dict):
    parts = []
    has_figure = "figure" in data
    grid = data.get("grid", False)

    # ---- slide 4: live HTML/SVG cycle diagram instead of a static figure ----
    if data.get("diagram"):
        bullets = "\n".join(f"        <li>{esc(b)}</li>" for b in data["bullets"])
        html = (
            DIAGRAM_HTML
            .replace("@@DIAGRAM_BULLETS@@", bullets)
            .replace("@@LINK_NOTE@@", esc(data.get("link_note", "")))
        )
        return html, {"live": False, "diagram": True}

    if has_figure:
        parts.append('<div class="cols cols--figure">')
        open_list = "<div>"
        close_list = "</div>"
    else:
        open_list, close_list = "", ""

    # ---- list content ----
    if "roadmap" in data:
        items = "\n".join(
            f'      <li><span class="roman">{roman}</span><span>{esc(text)}</span></li>'
            for roman, text in data["roadmap"]
        )
        inner = f'<ol class="roadmap">\n{items}\n    </ol>'
    elif grid:
        items = "\n".join(
            f"      <li>{esc(b)}</li>" for b in data["bullets"]
        )
        inner = f'<ul class="points points--grid">\n{items}\n    </ul>'
        if "link_note" in data:
            inner += f'\n    <p class="link-note">{esc(data["link_note"])}</p>'
    else:
        items = "\n".join(
            f"      <li>{bold_lead(b)}</li>" for b in data["bullets"]
        )
        inner = f'<ul class="points">\n{items}\n    </ul>'

    if has_figure:
        parts.append(f"    <div>\n{inner}\n    </div>")
        if "live_map" in data:
            lm = data["live_map"]
            parts.append(
                '    <figure class="figure figure--map">\n'
                '      <div class="map-wrap map--static" id="mapWrap">\n'
                '        <img class="map-fallback" src="' + data["figure"] + '" alt="' + esc(data.get("figure_caption", "")) + '">\n'
                '        <div class="map" id="liveMap" aria-label="Interactive European seismic risk map"></div>\n'
                '        <span class="map-badge">EFEHR ESRM20 · <span class="st">loading…</span></span>\n'
                '        <div class="map-legend" id="mapLegend"></div>\n'
                '      </div>\n'
                f'      <figcaption>{esc(data.get("figure_caption", ""))}</figcaption>\n'
                "    </figure>"
            )
        else:
            parts.append(
                '    <figure class="figure">\n'
                f'      <img src="{data["figure"]}" alt="{esc(data.get("figure_caption", ""))}">\n'
                f'      <figcaption>{esc(data.get("figure_caption", ""))}</figcaption>\n'
                "    </figure>"
            )
        parts.append("  </div>")
    else:
        parts.append("    " + inner)

    if "closing" in data:
        parts.append(f'<p class="closing">{esc(data["closing"])}</p>')

    return "\n".join(parts), {"live": "live_map" in data, "diagram": False}


def build_slide(num: int, data: dict) -> None:
    prev = f'"slide{num-1:02d}.html"' if num > 1 else "null"
    nxt = f'"slide{num+1:02d}.html"' if num < TOTAL else "null"

    content, extras = build_content(num, data)

    extra_css = (LIVE_CSS if extras["live"] else "") + (DIAGRAM_CSS if extras["diagram"] else "")
    extra_head = LIVE_HEAD if extras["live"] else ""
    extra_body = ""
    if extras["live"]:
        lm = data["live_map"]
        extra_body = (
            "<script>\n"
            + LIVE_JS_TEMPLATE
            .replace("@@SERVICE@@", lm["service"])
            .replace("@@LAYERS@@", lm["layers"])
            .replace("@@LAT@@", str(lm["center"][0]))
            .replace("@@LON@@", str(lm["center"][1]))
            .replace("@@ZOOM@@", str(lm["zoom"]))
            .replace("@@IZMIR_LAT@@", str(lm["izmir"][0]))
            .replace("@@IZMIR_LON@@", str(lm["izmir"][1]))
            + "</script>"
        )

    html = (
        HTML_TEMPLATE
        .replace("@@NUM@@", f"{num:02d}")
        .replace("@@TITLE_HTML@@", esc(data["title"]))
        .replace("@@NOTES@@", data.get("notes", "").replace("--", "—"))
        .replace("@@N@@", str(num))
        .replace("@@PREV@@", prev)
        .replace("@@NEXT@@", nxt)
        .replace("@@TOTAL@@", str(TOTAL))
        .replace("@@CONTENT@@", content)
        .replace("@@EXTRA_HEAD@@", extra_head)
        .replace("@@EXTRA_BODY@@", extra_body)
    )
    css = CSS_TEMPLATE.replace("@@NUM@@", f"{num:02d}").replace("@@EXTRA_CSS@@", extra_css)

    with open(os.path.join(ROOT, "slides", f"slide{num:02d}.html"), "w", encoding="utf-8") as f:
        f.write(html)
    with open(os.path.join(ROOT, "css", f"slide{num:02d}.css"), "w", encoding="utf-8") as f:
        f.write(css)
    print(f"  wrote slides/slide{num:02d}.html + css/slide{num:02d}.css")


def main() -> None:
    os.makedirs(os.path.join(ROOT, "slides"), exist_ok=True)
    os.makedirs(os.path.join(ROOT, "css"), exist_ok=True)
    print("Generating standalone slides:")
    for num in sorted(SLIDES):
        build_slide(num, SLIDES[num])
    print("Done.")


if __name__ == "__main__":
    main()

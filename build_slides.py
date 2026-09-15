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
    5: {
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
    6: {
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
    7: {
        "title": "Prioritize risks on a likelihood \u00d7 impact matrix",
        "heat_matrix": True,
        "link_note": ("Rate each risk by likelihood and impact, act on red cells first, "
                      "and keep the register alive \u2014 reviewed annually and after every "
                      "significant incident."),
        "notes": ("Risk assessment is the systematic process of identifying, analyzing "
                  "and evaluating potential risks. A nine-cell matrix rates likelihood "
                  "against impact: high-probability, high-impact risks such as annual "
                  "flooding take priority; rare-but-severe risks call for insurance and "
                  "contingency arrangements. The register is a living document, updated "
                  "as threats evolve."),
    },
    8: {
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
    9: {
        "title": "Assess governance readiness with a self-assessment tool",
        "mdrga_wheel": True,
        "link_note": ("A municipal self-assessment empowers authorities to review "
                      "disaster-risk-governance status, identify needs and priorities, "
                      "and take action \u2014 after the IFRC / NRCS / MoFAGA MDRGA tool."),
        "notes": ("Structured self-assessment strengthens local disaster risk "
                  "governance: it raises awareness of roles and responsibilities, "
                  "identifies gaps and opportunities, and tracks progress over time. "
                  "The MDRGA tool organizes 65 indicators across six thematic areas, "
                  "from policy and legal frameworks to cross-cutting issues. It was "
                  "developed through a partnership between IFRC, the Nepal Red Cross "
                  "Society and MoFAGA, co-designed with CBDRM platform partners."),
    },
    10: {
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
    11: {
        "title": "4 | Prepare for response and recovery",
        "cycle_chart": True,
        "link_note": ("Mitigation, preparedness, response and recovery overlap rather "
                      "than forming isolated stages \u2014 lessons feed back into the "
                      "next planning cycle."),
        "notes": ("The fourth component integrates preparedness with recovery planning. "
                  "Build Back Better means using reconstruction to reduce future "
                  "vulnerability. Mitigation, preparedness, response, and recovery "
                  "overlap rather than forming isolated stages."),
    },
    12: {
        "title": "Validate readiness before the earthquake occurs",
        "checklist": True,
        "link_note": ("Preparedness is validated through practice: response plans, "
                      "crisis communication, incident command and regular drills keep "
                      "the municipality ready to act."),
        "notes": ("Crisis management prepares the municipality to respond when risks "
                  "materialize. A well-developed emergency response plan assigns roles, "
                  "communication protocols and resources; a crisis communication plan "
                  "designates spokespeople and multi-channel alerts; an Incident "
                  "Command System streamlines inter-agency decisions; and regular "
                  "drills rehearse roles and expose weaknesses before a real event."),
    },
    13: {
        "title": "Embed the roadmap in municipal routines",
        "roadmap_diagram": [
            ("I", "Establish the shared risk information base.",
             "Shared GIS and a Common Operating Picture."),
            ("II", "Formalize mandates and cross-sector coordination.",
             "City-Level Resilience Coordination Platform."),
            ("III", "Prioritize and finance risk reduction measures.",
             "Structural and non-structural investment."),
            ("IV", "Integrate preparedness, recovery and continuous review.",
             "Build Back Better; lessons feed the next cycle."),
        ],
        "link_note": ("Feedback continues throughout implementation \u2014 in T\u00fcrkiye, "
                      "alignment with \u0130RAP and local Earthquake Master Plans can "
                      "support coherence."),
        "notes": ("The implementation roadmap follows four phases, providing an "
                  "organizational sequence while feedback continues throughout "
                  "implementation. In Türkiye, alignment with İRAP and local Earthquake "
                  "Master Plans can support coherence."),
    },
    14: {
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
    15: {
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

TOTAL = 15

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
# Disaster management cycle chart (slide 9) — pre/during/post phases +
# feedback loop, laid out horizontally for the 16:9 stage.
# Styles live in slide09.css only.
# ----------------------------------------------------------------------------
CYCLE_CSS = """
/* ---- disaster management cycle chart (HTML/SVG) ---- */
.cycle-zone{margin-top:6px}
.figure--cycle{container-type:inline-size}
.cycle-card{
  --cyc-pre:#1b803a;
  --cyc-during:#d85718;
  --cyc-post:#166db8;
  --cyc-feedback:#1b803a;
  background:var(--c-paper);
  border:1px solid var(--c-line);
  border-radius:14px;
  width:min(100%,1180px);
  margin-inline:auto;
  padding:clamp(10px,1.7cqw,20px) clamp(10px,1.9cqw,24px);
  font-size:clamp(7.5px,1.5cqw,13.5px); /* everything below scales in em */
}
.cycle-row{
  display:grid;
  grid-template-columns:1fr 26px 1fr 26px 1fr;
  gap:6px;align-items:stretch;
}
.phase{display:flex;flex-direction:column;min-width:0}
.phase-banner{
  color:#fff;text-align:center;
  padding:.5em 1em;border-radius:3px;
  box-shadow:0 2px 4px rgba(0,0,0,.08);
}
.phase-title{font-family:var(--font-head);font-size:1.12em;font-weight:800;line-height:1.25}
.phase-sub{font-size:.95em;font-weight:600;line-height:1.25;margin-top:1px}
.phase--pre .phase-banner{background:var(--cyc-pre)}
.phase--during .phase-banner{background:var(--cyc-during)}
.phase--post .phase-banner{background:var(--cyc-post)}
.phase-frame{
  flex:1;display:flex;flex-direction:column;gap:.8em;
  border:2px solid;border-radius:3px;
  padding:.9em .8em;margin-top:2px;
}
.phase--pre .phase-frame{border-color:var(--cyc-pre)}
.phase--during .phase-frame{border-color:var(--cyc-during)}
.phase--post .phase-frame{border-color:var(--cyc-post)}
.sub-card{flex:1;display:flex;flex-direction:column;background:#fff;border-radius:2px;overflow:hidden}
.sub-card>header{
  color:#fff;font-size:.98em;font-weight:700;text-align:center;
  padding:.45em .5em;white-space:nowrap;
}
.phase--pre .sub-card>header{background:var(--cyc-pre)}
.phase--during .sub-card>header{background:var(--cyc-during)}
.phase--post .sub-card>header{background:var(--cyc-post)}
.sub-body{
  flex:1;background:#fff;border:1px solid;border-top:none;
  padding:.6em .8em;
  display:flex;flex-direction:column;justify-content:center;
}
.phase--pre .sub-body{border-color:#94c9a4}
.phase--during .sub-body{border-color:#f1aa86}
.phase--post .sub-body{border-color:#97c3e8}
.bullet-list{list-style-type:disc;padding-left:1.5em;margin:0}
.bullet-list li{
  font-size:.95em;line-height:1.45;
  color:var(--c-ink);font-weight:500;margin-bottom:2px;
}
.bullet-list li:last-child{margin-bottom:0}
.seismic-box{display:flex;align-items:center;justify-content:center;height:100%}
.seismic-svg{width:88%;height:auto;overflow:visible}
.flow-arrow{display:flex;align-items:center;justify-content:center}
.flow-arrow svg{width:100%;height:24px}
.cycle-connector-down{display:flex;justify-content:center;height:14px;margin-top:2px}
.cycle-connector-down svg{height:100%;width:auto}
.cycle-feedback{
  position:relative;width:74%;margin:.3em auto 0;
  display:flex;align-items:center;justify-content:center;
}
.feedback-banner{
  width:100%;background:var(--cyc-feedback);color:#fff;text-align:center;
  padding:.5em 3.2em;border-radius:2px;
  box-shadow:0 2px 4px rgba(0,0,0,.08);
}
.feedback-title{font-family:var(--font-head);font-size:1.12em;font-weight:800;line-height:1.25}
.feedback-sub{font-size:.95em;font-weight:600;line-height:1.25;margin-top:1px}
.loop-arrow{
  position:absolute;top:50%;transform:translateY(-50%);
  width:6.2em;z-index:3;pointer-events:none;
  filter:drop-shadow(0 2px 3px rgba(0,0,0,.22));
}
.loop-arrow--left{left:-1em}
.loop-arrow--right{right:-1em}
.cycle-link-note{margin-top:10px}
@media (max-width:860px){
  .cycle-row{grid-template-columns:1fr;gap:10px}
  .flow-arrow{height:22px}
  .flow-arrow svg{width:24px;height:100%}
  .cycle-feedback{width:100%}
  .loop-arrow{width:4.6em}
  .loop-arrow--left{left:0}
  .loop-arrow--right{right:0}
  .sub-card>header{white-space:normal}
}
"""

CYCLE_HTML = """<div class="cycle-zone">
    <figure class="figure figure--cycle">
      <div class="cycle-card">
        <div class="cycle-row">
          <section class="phase phase--pre">
            <div class="phase-banner">
              <div class="phase-title">Pre-Disaster Phase</div>
              <div class="phase-sub">Preparedness &amp; Mitigation</div>
            </div>
            <div class="phase-frame">
              <article class="sub-card">
                <header>Risk Identification &amp; Assessment</header>
                <div class="sub-body"><ul class="bullet-list"><li>Hazard Modeling</li><li>Vulnerability Analysis</li></ul></div>
              </article>
              <article class="sub-card">
                <header>Risk Prevention &amp; Mitigation</header>
                <div class="sub-body"><ul class="bullet-list"><li>Structural Retrofitting</li><li>Land-Use Planning</li></ul></div>
              </article>
              <article class="sub-card">
                <header>Emergency Preparedness</header>
                <div class="sub-body"><ul class="bullet-list"><li>Early Warning Systems</li><li>Response Planning</li></ul></div>
              </article>
            </div>
          </section>
          <div class="flow-arrow" aria-hidden="true">
            <svg viewBox="0 0 26 24" fill="none"><path d="M2 12 L18 12" stroke="#1b803a" stroke-width="4.5" stroke-linecap="square"/><polygon points="15,4 25,12 15,20" fill="#1b803a"/></svg>
          </div>
          <section class="phase phase--during">
            <div class="phase-banner">
              <div class="phase-title">During Disaster Phase</div>
              <div class="phase-sub">Disturbance &amp; Response</div>
            </div>
            <div class="phase-frame">
              <article class="sub-card">
                <header>Seismic Event (Disequilibrium)</header>
                <div class="sub-body">
                  <div class="seismic-box">
                    <svg class="seismic-svg" viewBox="0 0 160 55" xmlns="http://www.w3.org/2000/svg">
                      <ellipse cx="80" cy="46" rx="20" ry="5.5" fill="none" stroke="#f28b82" stroke-width="1.2" opacity="0.6"/>
                      <ellipse cx="80" cy="46" rx="13" ry="3.8" fill="none" stroke="#ea4335" stroke-width="1.2" opacity="0.8"/>
                      <ellipse cx="80" cy="46" rx="6" ry="1.8" fill="none" stroke="#d93025" stroke-width="1.2"/>
                      <circle cx="80" cy="46" r="1.5" fill="#d93025"/>
                      <path d="M 12 36 L 46 36 L 52 28 L 57 42 L 62 18 L 68 47 L 74 6 L 80 50 L 86 16 L 92 42 L 97 29 L 102 36 L 148 36" fill="none" stroke="#ea4335" stroke-width="1.8" stroke-linejoin="round" stroke-linecap="round"/>
                    </svg>
                  </div>
                </div>
              </article>
              <article class="sub-card">
                <header>Emergency Response</header>
                <div class="sub-body"><ul class="bullet-list"><li>Search &amp; Rescue</li><li>Evacuation Operations</li></ul></div>
              </article>
              <article class="sub-card">
                <header>Rapid Damage Assessment</header>
                <div class="sub-body"><ul class="bullet-list"><li>Damage Evaluation</li><li>Resource Deployment</li></ul></div>
              </article>
            </div>
          </section>
          <div class="flow-arrow" aria-hidden="true">
            <svg viewBox="0 0 26 24" fill="none"><path d="M2 12 L18 12" stroke="#d85718" stroke-width="4.5" stroke-linecap="square"/><polygon points="15,4 25,12 15,20" fill="#d85718"/></svg>
          </div>
          <section class="phase phase--post">
            <div class="phase-banner">
              <div class="phase-title">Post-Disaster Phase</div>
              <div class="phase-sub">Recovery &amp; Continuous Improvement</div>
            </div>
            <div class="phase-frame">
              <article class="sub-card">
                <header>Recovery &amp; Rehabilitation</header>
                <div class="sub-body"><ul class="bullet-list"><li>Infrastructure Repair</li><li>Community Support</li></ul></div>
              </article>
              <article class="sub-card">
                <header>Adaptation &amp; Transformation</header>
                <div class="sub-body"><ul class="bullet-list"><li>Building Resilience</li><li>Urban Renewal</li></ul></div>
              </article>
            </div>
          </section>
        </div>
        <div class="cycle-connector-down" aria-hidden="true">
          <svg viewBox="0 0 24 14" fill="none"><path d="M12 0 L12 8" stroke="#166db8" stroke-width="3.5"/><polygon points="5,6 12,14 19,6" fill="#166db8"/></svg>
        </div>
        <div class="cycle-feedback">
          <svg class="loop-arrow loop-arrow--left" viewBox="0 0 90 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="cyc-silver-left" x1="0%" y1="100%" x2="100%" y2="0%">
                <stop offset="0%" stop-color="#9ca3af"/><stop offset="45%" stop-color="#d1d5db"/><stop offset="70%" stop-color="#f3f4f6"/><stop offset="100%" stop-color="#9ca3af"/>
              </linearGradient>
            </defs>
            <path d="M 80 50 C 35 50, 10 42, 10 26 C 10 14, 30 6, 60 6 L 60 0 L 84 12 L 60 24 L 60 16 C 36 16, 22 21, 22 27 C 22 36, 45 40, 80 40 Z" fill="url(#cyc-silver-left)" stroke="#6b7280" stroke-width="0.75"/>
          </svg>
          <div class="feedback-banner">
            <div class="feedback-title">The Feedback Loop</div>
            <div class="feedback-sub">Lessons Learned &amp; Ongoing Monitoring</div>
          </div>
          <svg class="loop-arrow loop-arrow--right" viewBox="0 0 90 60" fill="none" xmlns="http://www.w3.org/2000/svg">
            <defs>
              <linearGradient id="cyc-silver-right" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stop-color="#f3f4f6"/><stop offset="35%" stop-color="#e5e7eb"/><stop offset="70%" stop-color="#9ca3af"/><stop offset="100%" stop-color="#6b7280"/>
              </linearGradient>
            </defs>
            <path d="M 10 10 C 55 10, 80 18, 80 34 C 80 46, 60 54, 30 54 L 30 60 L 6 48 L 30 36 L 30 44 C 54 44, 68 39, 68 33 C 68 24, 45 20, 10 20 Z" fill="url(#cyc-silver-right)" stroke="#4b5563" stroke-width="0.75"/>
          </svg>
        </div>
      </div>
      <figcaption>The disaster management cycle: mitigation and preparedness before an event, response during, recovery and adaptation after — closed by a continuous feedback loop.</figcaption>
    </figure>
    <p class="link-note cycle-link-note">@@CYCLE_NOTE@@</p>"""

# ----------------------------------------------------------------------------
# Ascending roadmap diagram (slide 10) — four phases climbing a gradient
# arrow toward an outcome circle, per the user's reference visuals.
# Styles live in slide10.css only.
# ----------------------------------------------------------------------------
ROADMAP_CSS = """
/* ---- ascending roadmap diagram (HTML/SVG) ---- */
.rm-zone{margin-top:6px}
.figure--rm{container-type:inline-size}
.rm-card{
  position:relative;
  background:var(--c-paper);
  border:1px solid var(--c-line);
  border-radius:14px;
  width:min(100%,1180px);
  margin-inline:auto;
  padding:clamp(8px,1.3cqw,16px);
  font-size:clamp(7px,1.3cqw,12.5px); /* everything below scales in em */
  overflow:hidden;
}
.rm-svg{position:absolute;inset:0;width:100%;height:100%;z-index:1;pointer-events:none}
.rm-stage{
  position:relative;z-index:2;
  display:grid;
  grid-template-columns:repeat(4,1fr);
  gap:1em;
  align-items:end;
  padding:6.5em 12em .5em .8em; /* top rail for the goal circle, right rail so cards clear it */
}
.rm-step{display:flex;flex-direction:column;gap:.45em;min-width:0}
.rm-step--2{margin-bottom:4.5em}
.rm-step--3{margin-bottom:9em}
.rm-step--4{margin-bottom:13.5em}
.rm-chip{
  width:2.7em;height:2.7em;border-radius:50%;
  display:flex;align-items:center;justify-content:center;
  color:#fff;font-family:var(--font-head);font-weight:800;font-size:1.1em;
  box-shadow:0 3px 10px rgba(15,23,42,.2);
}
.rm-step--1 .rm-chip{background:#2563EB}
.rm-step--2 .rm-chip{background:#D97706}
.rm-step--3 .rm-chip{background:#059669}
.rm-step--4 .rm-chip{background:#7C3AED}
.rm-stepbox{
  background:#fff;border:1px solid var(--c-line);border-left:4px solid;
  border-radius:8px;padding:.7em .8em;
  box-shadow:0 4px 14px rgba(15,23,42,.06);
}
.rm-step--1 .rm-stepbox{border-left-color:#2563EB}
.rm-step--2 .rm-stepbox{border-left-color:#D97706}
.rm-step--3 .rm-stepbox{border-left-color:#059669}
.rm-step--4 .rm-stepbox{border-left-color:#7C3AED}
.rm-card-title{
  font-family:var(--font-head);font-weight:700;
  font-size:1.05em;line-height:1.3;margin:0 0 .3em;
  color:var(--c-ink);
}
.rm-sub{font-size:.95em;line-height:1.42;margin:0;font-weight:500;color:var(--c-muted)}
.rm-goal{
  position:absolute;top:1em;right:1.4em;z-index:3;
  width:9.5em;aspect-ratio:1/1;border-radius:50%;
  background:#4472C4;color:#fff;
  display:flex;align-items:center;justify-content:center;text-align:center;
  padding:1em;
  font-family:var(--font-head);font-weight:700;font-size:1.02em;line-height:1.3;
  box-shadow:0 6px 18px rgba(68,114,196,.35);
}
.rm-link-note{margin-top:10px}
@media (max-width:860px){
  .rm-card{width:100%;max-width:560px}
  .rm-svg,.rm-goal{display:none}
  .rm-stage{display:flex;flex-direction:column;gap:14px;padding:6px}
  .rm-step--2,.rm-step--3,.rm-step--4{margin-bottom:0}
}
"""

ROADMAP_HTML = """<div class="rm-zone">
    <figure class="figure figure--rm">
      <div class="rm-card">
        <svg class="rm-svg" viewBox="0 0 1000 620" preserveAspectRatio="none" aria-hidden="true">
          <defs>
            <linearGradient id="rm-grad" x1="0" y1="1" x2="1" y2="0">
              <stop offset="0" stop-color="#4472C4"/>
              <stop offset="1" stop-color="#7C3AED"/>
            </linearGradient>
            <marker id="rm-head" markerWidth="5" markerHeight="5" refX="2.5" refY="2.5" orient="auto">
              <polygon points="0 0, 5 2.5, 0 5" fill="#7C3AED"/>
            </marker>
          </defs>
          <path d="M 25 585 C 320 565, 600 430, 800 230" fill="none" stroke="url(#rm-grad)" stroke-width="34" stroke-linecap="round" opacity="0.22" marker-end="url(#rm-head)"/>
        </svg>
        <div class="rm-stage">
@@RM_STEPS@@
        </div>
        <div class="rm-goal">Resilience embedded in municipal routines</div>
      </div>
      <figcaption>Implementation roadmap: four phases embedded in municipal routines, closing the loop with continuous feedback (adapted from the paper).</figcaption>
    </figure>
    <p class="link-note rm-link-note">@@RM_NOTE@@</p>"""

# ----------------------------------------------------------------------------
# Risk assessment matrix (slide 6) — 3x3 likelihood x impact grid.
# Styles live in slide06.css only.
# ----------------------------------------------------------------------------
HEAT_CSS = """
/* ---- risk assessment matrix ---- */
.mx-zone{margin-top:6px}
.figure--mx{container-type:inline-size}
.mx-card{
  background:var(--c-paper);border:1px solid var(--c-line);border-radius:14px;
  width:min(100%,1100px);margin-inline:auto;
  padding:clamp(8px,1.4cqw,16px) clamp(8px,1.6cqw,18px);
  font-size:clamp(7px,1.35cqw,12.5px);
}
.mx-grid{
  display:grid;gap:.45em;
  grid-template-columns:2.2em repeat(3,1fr);
  grid-template-rows:repeat(3,1fr) 2.2em;
}
.mx-cell{
  border-radius:6px;padding:.6em .7em;
  display:flex;flex-direction:column;justify-content:center;gap:.15em;
  color:#fff;min-height:5.2em;
}
.mx-cell b{font-size:1.02em;line-height:1.25;font-weight:700}
.mx-cell span{font-size:.88em;line-height:1.3;opacity:.92;font-weight:500}
.mx-g{background:#15803d}.mx-y{background:#b45309}.mx-r{background:#b91c1c}
.mx-lab{
  display:flex;align-items:center;justify-content:center;
  font-size:.85em;font-weight:700;color:var(--c-muted);
  text-transform:uppercase;letter-spacing:.04em;
}
.mx-x{
  flex-direction:row;gap:.4em;
  background:linear-gradient(90deg,#15803d33,#b4530933,#b91c1c33);
  color:var(--c-ink);min-height:0;font-weight:700;
}
.mx-axis{font-size:.85em;font-weight:700;color:var(--c-muted);text-transform:uppercase;letter-spacing:.05em;display:flex;align-items:center;justify-content:center}
.mx-note{font-size:.92em;color:var(--c-muted);margin:.6em 0 0;line-height:1.45}
.mx-link-note{margin-top:8px}
@media (max-width:860px){.mx-cell{min-height:4.2em}}
"""

HEAT_HTML = """<div class="mx-zone">
    <figure class="figure figure--mx">
      <div class="mx-card">
        <div class="mx-grid">
          <div class="mx-axis">Impact \u2192</div>
          <div class="mx-cell mx-y"><b>Likely \u00d7 Moderate</b><span>Plan retrofits and budget reserves</span></div>
          <div class="mx-cell mx-r"><b>Likely \u00d7 Major</b><span>Priority: lifeline strengthening, land-use controls</span></div>
          <div class="mx-cell mx-r"><b>Likely \u00d7 Severe</b><span>Act now: retrofit programs, early warning, drills</span></div>
          <div class="mx-axis">\u2190</div>
          <div class="mx-cell mx-g"><b>Occasional \u00d7 Moderate</b><span>Monitor; update the risk register annually</span></div>
          <div class="mx-cell mx-y"><b>Occasional \u00d7 Major</b><span>Mitigation plans with named owners</span></div>
          <div class="mx-cell mx-r"><b>Occasional \u00d7 Severe</b><span>Insurance + emergency preparedness</span></div>
          <div class="mx-axis">\u2190</div>
          <div class="mx-cell mx-g"><b>Rare \u00d7 Moderate</b><span>Watch list</span></div>
          <div class="mx-cell mx-g"><b>Rare \u00d7 Major</b><span>Contingency arrangements</span></div>
          <div class="mx-cell mx-y"><b>Rare \u00d7 Severe</b><span>Business continuity, mutual aid</span></div>
          <div class="mx-lab">Likelihood</div>
          <div class="mx-cell mx-x">Lower</div>
          <div class="mx-cell mx-x">Rising</div>
          <div class="mx-cell mx-x">Higher</div>
        </div>
        <p class="mx-note">Nine-cell matrix: rate each risk by likelihood and impact, then act on the red cells first \u2014 the discipline behind a municipal risk register.</p>
      </div>
      <figcaption>Risk prioritization matrix \u2014 likelihood \u00d7 impact (after standard municipal risk-management practice).</figcaption>
    </figure>
    <p class="link-note mx-link-note">@@MX_NOTE@@</p>"""

# ----------------------------------------------------------------------------
# MDRGA governance-assessment wheel (slide 8) — six thematic areas around
# "65 indicators" (after the IFRC / NRCS / MoFAGA Municipal Disaster Risk
# Governance Assessment Tool). Styles live in slide08.css only.
# ----------------------------------------------------------------------------
MDRGA_CSS = """
/* ---- MDRGA governance wheel ---- */
.mw-zone{margin-top:6px}
.figure--mw{container-type:inline-size}
.mw-card{
  background:var(--c-paper);border:1px solid var(--c-line);border-radius:14px;
  width:min(100%,1140px);margin-inline:auto;
  padding:clamp(8px,1.4cqw,16px) clamp(8px,1.6cqw,18px);
  font-size:clamp(7px,1.4cqw,13px);
  display:flex;gap:1.6em;align-items:center;
}
.mw-side{
  flex:0 0 21%;align-self:stretch;
  background:#1e3a5f;color:#fff;border-radius:10px;
  padding:1.2em 1em;display:flex;flex-direction:column;gap:.9em;
}
.mw-side h3{font-family:var(--font-head);font-size:1.02em;font-weight:800;line-height:1.3;margin:0}
.mw-side ul{list-style:none;padding:0;margin:0}
.mw-side li{font-size:.88em;line-height:1.42;font-weight:500;margin-bottom:.5em}
.mw-side li::before{content:\"\u2713\";margin-right:.45em;font-weight:800;color:#7fb3e8}
.mw-side p{font-size:.8em;line-height:1.4;margin:.2em 0 0;opacity:.85}
.mw-wheel{flex:1;min-width:0}
.mw-cols{display:grid;grid-template-columns:repeat(3,1fr);gap:.6em;margin-bottom:.5em}
.mw-chip{
  background:#e2e8f0;border-radius:6px;padding:.55em .6em;
  display:flex;align-items:center;gap:.5em;
  font-size:.9em;font-weight:600;color:var(--c-ink);line-height:1.3;
}
.mw-chip::before{content:\"\u2713\";display:flex;align-items:center;justify-content:center;
  width:1.5em;height:1.5em;border-radius:50%;border:.14em solid #1e3a5f;
  color:#1e3a5f;font-weight:800;flex-shrink:0;font-size:.95em}
.mw-flex{display:flex;align-items:center;gap:.8em}
.mw-donut{position:relative;width:19em;aspect-ratio:1/1;flex-shrink:0}
.mw-donut .seg{position:absolute;inset:0;border-radius:50%}
.mw-center{
  position:absolute;inset:29%;background:#fff;border-radius:50%;
  display:flex;flex-direction:column;align-items:center;justify-content:center;
  text-align:center;padding:.4em;box-shadow:0 3px 12px rgba(15,23,42,.12);
}
.mw-center b{font-family:var(--font-head);font-size:2.1em;font-weight:800;color:#1e3a5f;line-height:1}
.mw-center span{font-size:.82em;line-height:1.3;color:var(--c-ink);font-weight:600}
.mw-cats{flex:1;min-width:0;display:flex;flex-direction:column;gap:.45em}
.mw-cat{display:flex;align-items:center;gap:.55em;font-weight:600;font-size:.95em;color:var(--c-ink)}
.mw-cat i{font-style:normal;display:flex;align-items:center;justify-content:center;
  width:1.7em;height:1.7em;border-radius:50%;color:#fff;font-weight:800;font-size:.92em;flex-shrink:0}
.mw-c1{background:#f4a7ab}.mw-c2{background:#e05c46}.mw-c3{background:#c9482f}
.mw-c4{background:#f4a7ab}.mw-c5{background:#e05c46}.mw-c6{background:#c9482f}
.mw-cat span b{display:block;font-size:.85em;color:var(--c-muted);font-weight:500}
.mw-link-note{margin-top:8px}
@media (max-width:860px){
  .mw-card{flex-direction:column}
  .mw-side{flex:none;width:100%}
  .mw-flex{flex-direction:column}
}
"""

MDRGA_HTML = """<div class="mw-zone">
    <figure class="figure figure--mw">
      <div class="mw-card">
        <div class="mw-side">
          <h3>MDRGA \u2014 Municipal Disaster Risk Governance Assessment</h3>
          <ul>
            <li>Raise awareness of roles and responsibilities</li>
            <li>Identify gaps and opportunities</li>
            <li>Track progress over time</li>
          </ul>
          <p>Developed by IFRC, Nepal Red Cross Society and MoFAGA, co-designed with CBDRM platform partners.</p>
        </div>
        <div class="mw-wheel">
          <div class="mw-cols">
            <div class="mw-chip">Awareness of mandates</div>
            <div class="mw-chip">Gap identification</div>
            <div class="mw-chip">Progress tracking</div>
          </div>
          <div class="mw-flex">
            <div class="mw-donut">
              <svg viewBox=\"0 0 200 200\" style=\"width:100%;height:100%\" aria-hidden=\"true\">
                <circle cx=\"100\" cy=\"100\" r=\"78\" fill=\"none\" stroke=\"#f4a7ab\" stroke-width=\"44\" stroke-dasharray=\"245 490\" transform=\"rotate(-90 100 100)\"/>
                <circle cx=\"100\" cy=\"100\" r=\"78\" fill=\"none\" stroke=\"#e05c46\" stroke-width=\"44\" stroke-dasharray=\"163 490\" stroke-dashoffset=\"-245\" transform=\"rotate(-90 100 100)\"/>
                <circle cx=\"100\" cy=\"100\" r=\"78\" fill=\"none\" stroke=\"#c9482f\" stroke-width=\"44\" stroke-dasharray=\"82 490\" stroke-dashoffset=\"-408\" transform=\"rotate(-90 100 100)\"/>
              </svg>
              <div class="mw-center"><b>65</b><span>indicators across six thematic areas</span></div>
            </div>
            <div class="mw-cats">
              <div class="mw-cat"><i class="mw-c1">1</i><span>Policy, Legal and Regulatory Framework</span></div>
              <div class="mw-cat"><i class="mw-c2">2</i><span>Institutional and Organizational Structure</span></div>
              <div class="mw-cat"><i class="mw-c3">3</i><span>Planning, Budgeting and Monitoring</span></div>
              <div class="mw-cat"><i class="mw-c4">4</i><span>Coordination, Partnerships and Collaboration</span></div>
              <div class="mw-cat"><i class="mw-c5">5</i><span>Resources and Capacities</span></div>
              <div class="mw-cat"><i class="mw-c6">6</i><span>Cross-cutting Issues</span></div>
            </div>
          </div>
        </div>
      </div>
      <figcaption>Governance self-assessment: 65 indicators across six thematic areas (after the IFRC / NRCS / MoFAGA MDRGA tool).</figcaption>
    </figure>
    <p class="link-note mw-link-note">@@MW_NOTE@@</p>"""

# ----------------------------------------------------------------------------
# Crisis-readiness checklist (slide 11) — four groups from the municipal
# crisis-management playbook. Styles live in slide11.css only.
# ----------------------------------------------------------------------------
CHECK_CSS = """
/* ---- crisis-readiness checklist ---- */
.ck-zone{margin-top:6px}
.figure--ck{container-type:inline-size}
.ck-card{
  background:var(--c-paper);border:1px solid var(--c-line);border-radius:14px;
  width:min(100%,1140px);margin-inline:auto;
  padding:clamp(8px,1.4cqw,16px) clamp(8px,1.6cqw,18px);
  font-size:clamp(7px,1.35cqw,12.5px);
  display:grid;grid-template-columns:1fr 1fr;gap:.9em;
}
.ck-group{background:#fff;border:1px solid var(--c-line);border-radius:10px;padding:.8em .9em}
.ck-group h3{
  font-family:var(--font-head);font-size:1em;font-weight:800;margin:0 0 .5em;
  color:var(--c-primary-dark);border-bottom:2px solid var(--c-line);padding-bottom:.35em;
}
.ck-group ul{list-style:none;padding:0;margin:0}
.ck-group li{
  display:flex;gap:.5em;align-items:flex-start;
  font-size:.92em;line-height:1.42;font-weight:500;color:var(--c-ink);margin-bottom:.4em;
}
.ck-group li::before{content:"";flex-shrink:0;width:1.1em;height:1.1em;margin-top:.12em;
  border:.14em solid var(--c-accent);border-radius:.25em;background:#fff}
.ck-link-note{margin-top:8px}
@media (max-width:860px){.ck-card{grid-template-columns:1fr}}
"""

CHECK_HTML = """<div class="ck-zone">
    <figure class="figure figure--ck">
      <div class="ck-card">
        <div class="ck-group">
          <h3>Emergency Response Plan</h3>
          <ul>
            <li>Roles and responsibilities defined across departments</li>
            <li>Scenario playbooks for the priority risks in the register</li>
            <li>Coordination with regional and state emergency services</li>
          </ul>
        </div>
        <div class="ck-group">
          <h3>Crisis Communication</h3>
          <ul>
            <li>Designated spokespeople and backup contacts</li>
            <li>Multi-channel alerts: SMS, social media, local media</li>
            <li>Pre-approved message templates for fast release</li>
          </ul>
        </div>
        <div class="ck-group">
          <h3>Incident Command System</h3>
          <ul>
            <li>Standard ICS structure adopted across agencies</li>
            <li>Staff trained in ICS roles and decision thresholds</li>
            <li>Clear escalation and handover procedures</li>
          </ul>
        </div>
        <div class="ck-group">
          <h3>Drills and Training</h3>
          <ul>
            <li>Annual or semi-annual multi-agency exercises</li>
            <li>After-action reviews feeding the risk register</li>
            <li>Recovery pre-planning: Build Back Better criteria</li>
          </ul>
        </div>
      </div>
      <figcaption>Crisis-readiness checklist \u2014 preparedness validated through practice, not paperwork alone.</figcaption>
    </figure>
    <p class="link-note ck-link-note">@@CK_NOTE@@</p>"""

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
  const DECK = { prev:@@PREV@@, next:@@NEXT@@, first:"slide01.html", last:"slide@@LAST@@.html", num:@@N@@, total:@@TOTAL@@, menu:"../index.html" };
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
        return html, {"live": False, "diagram": True, "cycle": False}

    # ---- slide 9: disaster management cycle chart ----
    if data.get("cycle_chart"):
        html = CYCLE_HTML.replace("@@CYCLE_NOTE@@", esc(data.get("link_note", "")))
        return html, {"live": False, "diagram": False, "cycle": True}

    # ---- slide 7: risk assessment matrix ----
    if data.get("heat_matrix"):
        html = HEAT_HTML.replace("@@MX_NOTE@@", esc(data.get("link_note", "")))
        return html, {"live": False, "diagram": False, "heat": True}

    # ---- slide 9: MDRGA governance wheel ----
    if data.get("mdrga_wheel"):
        html = MDRGA_HTML.replace("@@MW_NOTE@@", esc(data.get("link_note", "")))
        return html, {"live": False, "diagram": False, "mdrga": True}

    # ---- slide 12: crisis-readiness checklist ----
    if data.get("checklist"):
        html = CHECK_HTML.replace("@@CK_NOTE@@", esc(data.get("link_note", "")))
        return html, {"live": False, "diagram": False, "check": True}

    # ---- slide 13: ascending roadmap diagram ----
    if data.get("roadmap_diagram"):
        steps = "\n".join(
            (f'          <section class="rm-step rm-step--{i}">'
             f'\n            <span class="rm-chip">{esc(roman)}</span>'
             f'\n            <div class="rm-stepbox">'
             f'\n              <h3 class="rm-card-title">{esc(title)}</h3>'
             f'\n              <p class="rm-sub">{esc(sub)}</p>'
             f'\n            </div>'
             f'\n          </section>')
            for i, (roman, title, sub) in enumerate(data["roadmap_diagram"], 1)
        )
        html = (ROADMAP_HTML
                .replace("@@RM_STEPS@@", steps)
                .replace("@@RM_NOTE@@", esc(data.get("link_note", ""))))
        return html, {"live": False, "diagram": False, "cycle": False, "roadmap": True}

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

    extra_css = ((LIVE_CSS if extras["live"] else "")
                 + (DIAGRAM_CSS if extras["diagram"] else "")
                 + (CYCLE_CSS if extras.get("cycle") else "")
                 + (ROADMAP_CSS if extras.get("roadmap") else "")
                 + (HEAT_CSS if extras.get("heat") else "")
                 + (MDRGA_CSS if extras.get("mdrga") else "")
                 + (CHECK_CSS if extras.get("check") else ""))
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
        .replace("@@LAST@@", f"{TOTAL:02d}")
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

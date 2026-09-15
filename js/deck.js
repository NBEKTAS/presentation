/* ============================================================
   deck.js — shared navigation chrome for standalone slide pages.
   Does NOT touch slide content: it appends a footer toolbar and
   wires keyboard/click-zone navigation. Each slide page sets:
     const DECK = { prev:"slide02.html", next:"slide04.html",
                    num:3, total:11, menu:"../index.html" };
   before loading this file. If DECK is absent it exits silently,
   so CSS/slide markup remain fully isolated from this script.
   ============================================================ */
(function () {
  if (typeof DECK === "undefined") return;

  /* ---- Player mode: when this slide runs inside presentation.html's
         iframe, "player" is non-null and all navigation is delegated to
         the player via postMessage. The slide itself stays inert. ---- */
  var player = null;
  try {
    player = window.parent !== window && window.parent.location.pathname.indexOf("presentation") !== -1
      ? window.parent : null;
  } catch (err) {
    player = window.parent !== window ? window.parent : null; /* cross-origin: assume player */
  }
  var inPlayer = !!player;
  function nav(rel) {
    if (!rel) return;
    if (inPlayer) player.postMessage({ type: "deck-nav", rel: rel }, "*");
    else window.location.href = rel;
  }

  /* Hide the footer bar inside the player: chrome comes from the player.
     Also reclaim the bottom padding that cleared the hidden bar. */
  if (inPlayer) {
    var st = document.createElement("style");
    st.textContent = ".deck-bar{display:none !important}.stage{padding-bottom:44px !important}";
    document.head.appendChild(st);
  }

  /* Inject bar styles from here so slide CSS files stay untouched */
  var style = document.createElement("style");
  style.textContent = [
    ".deck-bar{position:fixed;left:0;right:0;bottom:0;z-index:9999;",
    "display:flex;align-items:center;gap:18px;",
    "padding:10px 22px;",
    "background:rgba(46,58,82,.92);backdrop-filter:blur(4px);",
    "font-family:Calibri,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;",
    "font-size:.9rem;color:#E8ECF3;}",
    ".deck-bar a{color:#E8ECF3;text-decoration:none;padding:4px 10px;",
    "border-radius:6px;transition:background .15s ease;}",
    ".deck-bar a:hover{background:rgba(255,255,255,.14);}",
    ".deck-count{margin-left:auto;color:#B9C2D4;",
    "font-variant-numeric:tabular-nums;letter-spacing:.06em;}",
    ".deck-nav{background:rgba(255,255,255,.10);}",
    ".deck-nav--next{background:#4472C4;}",
    ".deck-nav--next:hover{background:#5B87D6 !important;}"
  ].join("");
  document.head.appendChild(style);

  var bar = document.createElement("footer");
  bar.className = "deck-bar";

  var left = document.createElement("a");
  left.className = "deck-link";
  left.href = DECK.menu || "../index.html";
  left.textContent = "☰ Overview";

  var mid = document.createElement("span");
  mid.className = "deck-count";
  mid.textContent = DECK.num + " / " + (DECK.total || 11);

  var prev = document.createElement("a");
  prev.className = "deck-nav";
  prev.textContent = "‹ Prev";
  prev.style.visibility = DECK.prev ? "visible" : "hidden";
  if (DECK.prev) prev.href = DECK.prev;

  var next = document.createElement("a");
  next.className = "deck-nav deck-nav--next";
  next.textContent = "Next ›";
  next.style.visibility = DECK.next ? "visible" : "hidden";
  if (DECK.next) next.href = DECK.next;

  bar.appendChild(left);
  bar.appendChild(mid);
  bar.appendChild(prev);
  bar.appendChild(next);
  document.body.appendChild(bar);

  function go(rel) { nav(rel); }

  /* Keyboard: arrows, space, page keys, Home/End */
  document.addEventListener("keydown", function (e) {
    if (e.altKey || e.ctrlKey || e.metaKey) return;
    switch (e.key) {
      case "ArrowRight": case " ": case "PageDown":
        e.preventDefault(); go(DECK.next); break;
      case "ArrowLeft": case "PageUp":
        e.preventDefault(); go(DECK.prev); break;
      case "Home":
        e.preventDefault(); go(DECK.first || DECK.menu); break;
      case "End":
        e.preventDefault(); go(DECK.last); break;
      case "Escape":
        go(DECK.menu || "../index.html"); break;
    }
  });

  /* Click zones: right 25% = next, left 15% = prev (middle untouched) */
  document.addEventListener("click", function (e) {
    if (e.target.closest("a,button") || bar.contains(e.target)) return;
    if (e.clientX > window.innerWidth * 0.75) go(DECK.next);
    else if (e.clientX < window.innerWidth * 0.15) go(DECK.prev);
  });

  /* Touch swipe */
  var x0 = null;
  document.addEventListener("touchstart", function (e) {
    x0 = e.touches[0].clientX;
  }, { passive: true });
  document.addEventListener("touchend", function (e) {
    if (x0 === null) return;
    var dx = e.changedTouches[0].clientX - x0;
    if (dx < -60) go(DECK.next);
    else if (dx > 60) go(DECK.prev);
    x0 = null;
  }, { passive: true });
})();

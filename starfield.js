(() => {
  // ── Reduced Motion: statische Sterne, keine Animation ──
  const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

  // ── Canvas einrichten ──────────────────────────────────
  const canvas = document.createElement("canvas");
  canvas.id = "starfield";
  Object.assign(canvas.style, {
    position: "fixed",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    zIndex: "-1",
    pointerEvents: "none",
  });
  document.body.prepend(canvas);

  const ctx = canvas.getContext("2d");

  // ── Hilfsfunktionen ────────────────────────────────────
  const rand = (min, max) => Math.random() * (max - min) + min;
  const pick = (arr) => arr[Math.floor(Math.random() * arr.length)];

  // ── Stern-Farben (terminal-passend, dezent) ────────────
  const COLORS = [
    "rgba(220,255,220,",   // weiß-grünlich  (häufig)
    "rgba(220,255,220,",
    "rgba(220,255,220,",
    "rgba(200,255,200,",
    "rgba(255,255,255,",
    "rgba(0,255,255,",     // cyan           (selten)
    "rgba(255,0,255,",     // magenta        (sehr selten)
  ];

  // ── Layer-Konfiguration ────────────────────────────────
  // Mobile: weniger Sterne
  const isMobile = window.innerWidth < 600;
  const LAYERS = [
    { count: isMobile ? 30 : 70,  sizeMin: 0.5, sizeMax: 1.2, opMin: 0.15, opMax: 0.45, drift: 0.03, parallax: 0.05 },
    { count: isMobile ? 20 : 50,  sizeMin: 1.0, sizeMax: 2.0, opMin: 0.25, opMax: 0.65, drift: 0.06, parallax: 0.12 },
    { count: isMobile ? 10 : 30,  sizeMin: 1.5, sizeMax: 3.0, opMin: 0.30, opMax: 0.80, drift: 0.10, parallax: 0.22 },
  ];

  // ── Sterne generieren ──────────────────────────────────
  let W, H;
  let stars = [];

  function generateStars() {
    W = canvas.width  = window.innerWidth;
    H = canvas.height = window.innerHeight;
    stars = [];

    LAYERS.forEach((layer, layerIdx) => {
      for (let i = 0; i < layer.count; i++) {
        const color = pick(COLORS);
        const opacity = rand(layer.opMin, layer.opMax);
        stars.push({
          x:       rand(0, W),
          y:       rand(0, H),
          size:    rand(layer.sizeMin, layer.sizeMax),
          color:   color + opacity + ")",
          opacity,
          layer:   layerIdx,
          // Drift-Richtung: leicht diagonal nach unten-rechts
          dx:      rand(-0.2, 0.4) * layer.drift,
          dy:      rand(0.1,  0.3) * layer.drift,
          // Twinkle
          twinkleSpeed: rand(0.003, 0.012),
          twinklePhase: rand(0, Math.PI * 2),
        });
      }
    });
  }

  // ── Scroll-Offset (nur Desktop — Mobile-Viewport springt beim Scrollen) ──
  const disableParallax = window.innerWidth <= 768;
  let scrollY = 0;
  if (!disableParallax) {
    scrollY = window.scrollY;
    window.addEventListener("scroll", () => { scrollY = window.scrollY; }, { passive: true });
  }

  // ── Resize ─────────────────────────────────────────────
  let resizeTimer;
  window.addEventListener("resize", () => {
    clearTimeout(resizeTimer);
    resizeTimer = setTimeout(generateStars, 150);
  });

  // ── Render-Loop ────────────────────────────────────────
  let frame = 0;

  function draw() {
    ctx.clearRect(0, 0, W, H);
    frame++;

    stars.forEach((s) => {
      const layer = LAYERS[s.layer];

      // Parallax-Offset: vordere Layer scrollen stärker
      const parallaxY = -(scrollY * layer.parallax) % H;

      // Twinkle: Opacity leicht pulsieren
      const twinkle = 0.7 + 0.3 * Math.sin(frame * s.twinkleSpeed + s.twinklePhase);
      const baseColor = s.color.replace(/[\d.]+\)$/, (s.opacity * twinkle).toFixed(3) + ")");

      ctx.beginPath();
      ctx.arc(s.x, (s.y + parallaxY + H) % H, s.size, 0, Math.PI * 2);
      ctx.fillStyle = baseColor;
      ctx.fill();

      if (!prefersReduced) {
        // Drift: Sterne bewegen sich langsam
        s.x = (s.x + s.dx + W) % W;
        s.y = (s.y + s.dy + H) % H;
      }
    });

    if (!prefersReduced) {
      requestAnimationFrame(draw);
    }
  }

  // ── Init ───────────────────────────────────────────────
  generateStars();
  draw();

  // Statisches Bild bei reduced motion (einmalig gezeichnet, kein Loop)
  // → draw() wird nur einmal aufgerufen, requestAnimationFrame nicht gesetzt
})();

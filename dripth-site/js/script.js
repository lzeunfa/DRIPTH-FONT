

//1. Fade de cores ao rolar
(function () {
  const root = document.documentElement;
  const blocks = document.querySelectorAll("[data-bg]");

  const apply = (el) => {
    root.style.setProperty("--bg", el.dataset.bg);
    root.style.setProperty("--fg", el.dataset.fg);
    root.style.setProperty("--accent", el.dataset.accent || el.dataset.fg);
  };

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) apply(entry.target);
      });
    },
    { rootMargin: "-50% 0px -50% 0px", threshold: 0 }
  );

  blocks.forEach((b) => observer.observe(b));
})();

//2. Alfabeto: grade de caracteres + visualizador
(function () {
  const groups = [
    { title: "Maiúsculas", chars: "ABCDEFGHIJKLMNOPQRSTUVWXYZÇ" },
    { title: "Minúsculas", chars: "abcdefghijklmnopqrstuvwxyzç" },
    { title: "Números", chars: "0123456789" },
    { title: "Pontuação e símbolos", chars: ".,:;!?@#" },
  ];

  const names = {
    ".": "ponto",
    ",": "vírgula",
    ":": "dois-pontos",
    ";": "ponto e vírgula",
    "!": "exclamação",
    "?": "interrogação",
    "@": "arroba",
    "#": "hashtag",
  };

  const container = document.getElementById("glyph-groups");
  const viewerGlyph = document.getElementById("viewer-glyph");
  const viewerCode = document.getElementById("viewer-code");
  let active = null;

  const unicode = (ch) =>
    "U+" + ch.codePointAt(0).toString(16).toUpperCase().padStart(4, "0");

  const select = (btn) => {
    if (active) active.setAttribute("aria-pressed", "false");
    btn.setAttribute("aria-pressed", "true");
    active = btn;
    const ch = btn.dataset.char;
    viewerGlyph.textContent = ch;
    viewerCode.textContent = unicode(ch) + (names[ch] ? " – " + names[ch] : "");
  };

  groups.forEach((g) => {
    const wrap = document.createElement("div");
    wrap.className = "glyph-group";

    const title = document.createElement("h3");
    title.textContent = g.title;
    wrap.appendChild(title);

    const grid = document.createElement("div");
    grid.className = "glyphs";

    [...g.chars].forEach((ch) => {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "glyph";
      b.textContent = ch;
      b.dataset.char = ch;
      b.setAttribute("aria-label", names[ch] || ch);
      b.setAttribute("aria-pressed", "false");
      b.addEventListener("click", () => select(b));
      grid.appendChild(b);
    });

    wrap.appendChild(grid);
    container.appendChild(wrap);
  });

  // começa mostrando o "D"
  const first = container.querySelector('[data-char="D"]');
  if (first) select(first);
})();

// 3. Teste de texto e tamanho
(function () {
  const text = document.getElementById("tester-text");
  const size = document.getElementById("tester-size");
  const out = document.getElementById("tester-output");
  const sizeOut = document.getElementById("tester-size-out");

  const update = () => {
    out.textContent = text.value || "\u00A0";
    out.style.fontSize = size.value + "px";
    sizeOut.textContent = size.value + " px";
  };

  text.addEventListener("input", update);
  size.addEventListener("input", update);
  update();
})();
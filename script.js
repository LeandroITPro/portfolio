document.addEventListener("DOMContentLoaded", () => {
  const h1 = document.querySelector("h1");
  const originalText = h1.textContent;

  // Ghost-Span: reserviert die volle Breite/Höhe, bleibt unsichtbar
  const ghost = document.createElement("span");
  ghost.classList.add("h1-ghost");
  ghost.textContent = originalText;

  // Typed-Span: liegt absolut über dem Ghost, enthält die Animation
  const typed = document.createElement("span");
  typed.classList.add("h1-typed");

  h1.textContent = "";
  h1.appendChild(ghost);
  h1.appendChild(typed);

  let i = 0;

  function typeNextChar() {
    if (i < originalText.length) {
      typed.innerHTML =
        originalText.slice(0, i) +
        '<span style="white-space:nowrap">' +
          originalText[i] +
          '<span class="cursor">▮</span>' +
        '</span>';
      i++;
      setTimeout(typeNextChar, 80);
    }
  }

  typeNextChar();
});

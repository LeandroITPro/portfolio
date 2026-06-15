document.addEventListener("DOMContentLoaded", () => {
  const h1 = document.querySelector("h1");
  const originalText = h1.textContent;

  h1.textContent = "";

  let i = 0;

  function typeNextChar() {
    if (i < originalText.length) {
      h1.innerHTML =
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

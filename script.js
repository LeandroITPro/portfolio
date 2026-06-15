document.addEventListener("DOMContentLoaded", () => {
  const h1 = document.querySelector("h1");
  const originalText = h1.textContent;

  // Wrapper-Span für Text + Cursor (verhindert Zeilenumbruch zwischen beiden)
  const wrapper = document.createElement("span");
  wrapper.classList.add("typed-line");

  // Cursor-Element erstellen
  const cursor = document.createElement("span");
  cursor.classList.add("cursor");
  cursor.textContent = "▮";

  wrapper.appendChild(cursor);

  // h1 leeren und Wrapper einfügen
  h1.textContent = "";
  h1.appendChild(wrapper);

  let i = 0;

  function typeNextChar() {
    if (i < originalText.length) {
      wrapper.insertBefore(document.createTextNode(originalText[i]), cursor);
      i++;
      setTimeout(typeNextChar, 80);
    }
  }

  typeNextChar();
});

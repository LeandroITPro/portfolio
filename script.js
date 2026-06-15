document.addEventListener("DOMContentLoaded", () => {
  const h1 = document.querySelector("h1");
  const originalText = h1.textContent;

  // Cursor-Element erstellen
  const cursor = document.createElement("span");
  cursor.classList.add("cursor");
  cursor.textContent = "▮";

  // h1 leeren und Cursor einfügen
  h1.textContent = "";
  h1.appendChild(cursor);

  let i = 0;

  function typeNextChar() {
    if (i < originalText.length) {
      // Buchstaben vor dem Cursor einfügen
      h1.insertBefore(document.createTextNode(originalText[i]), cursor);
      i++;
      setTimeout(typeNextChar, 80);
    }
  }

  typeNextChar();
});

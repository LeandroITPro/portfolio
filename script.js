document.addEventListener("DOMContentLoaded", () => {
  const h1 = document.querySelector("h1");

  // Zwei feste Teile – Zeilenumbruch wird dazwischen eingefügt
  const part1 = "Leandro – Developer";
  const part2 = "in Training";
  const fullText = [part1, part2];

  h1.innerHTML = "";

  let line = 0;
  let i = 0;

  function typeNextChar() {
    const currentPart = fullText[line];

    if (i < currentPart.length) {
      // Aktuell getippten Inhalt aufbauen
      const typed1 = line === 0 ? currentPart.slice(0, i) : part1;
      const typed2 = line === 1 ? currentPart.slice(0, i) : "";
      const currentChar = currentPart[i];

      if (line === 0) {
        h1.innerHTML =
          typed1 +
          '<span style="white-space:nowrap">' +
            currentChar +
            '<span class="cursor">▮</span>' +
          '</span>';
      } else {
        h1.innerHTML =
          part1 + "<br>" +
          typed2 +
          '<span style="white-space:nowrap">' +
            currentChar +
            '<span class="cursor">▮</span>' +
          '</span>';
      }

      i++;
      setTimeout(typeNextChar, 80);

    } else if (line < fullText.length - 1) {
      // Erste Zeile fertig → zur zweiten wechseln
      line++;
      i = 0;
      setTimeout(typeNextChar, 80);
    }
  }

  typeNextChar();
});

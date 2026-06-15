document.addEventListener("DOMContentLoaded", () => {
  const line1 = document.getElementById("h1-line1");
  const line2 = document.getElementById("h1-line2");

  const part1 = "Leandro – Developer";
  const part2 = "in Training";

  // Cursor-Span erzeugen
  function cursorSpan() {
    return '<span style="white-space:nowrap"><span class="cursor">▮</span></span>';
  }

  function withCursor(text, char) {
    return text + '<span style="white-space:nowrap">' + char + '<span class="cursor">▮</span></span>';
  }

  // Cursor in line1 anzeigen während line2 noch leer ist
  line1.innerHTML = cursorSpan();

  let line = 0;
  let i = 0;
  const parts = [part1, part2];
  const targets = [line1, line2];

  function typeNextChar() {
    const currentPart = parts[line];
    const target = targets[line];

    if (i < currentPart.length) {
      target.innerHTML = withCursor(currentPart.slice(0, i), currentPart[i]);
      i++;
      setTimeout(typeNextChar, 80);
    } else if (line < parts.length - 1) {
      // Zeile 1 fertig: Cursor entfernen, Zeile 2 starten
      targets[line].innerHTML = currentPart;
      line++;
      i = 0;
      setTimeout(typeNextChar, 80);
    }
    // Wenn alles fertig: Cursor bleibt in letzter Zeile (kein cleanup nötig)
  }

  typeNextChar();
});

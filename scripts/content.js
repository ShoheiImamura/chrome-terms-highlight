const terms = ["拡張機能", "拡張", "用語3"];

// 用語集を用語の長さの降順にソートします。
terms.sort((a, b) => b.length - a.length);

function walk(node) {
  if (node.nodeType === Node.TEXT_NODE) {
    let newContent = node.textContent;
    for (let term of terms) {
      const termRegex = new RegExp(`(?<!\\w)${term}(?!\\w)`, "g");
      if (newContent.match(termRegex)) {
        newContent = newContent.replace(
          termRegex,
          `
          <span class="text-tooltip">
            ${term}
            <span class="tooltip-content">Tooltip on bottom</span>
          </span>`
        );
      }
    }
    if (newContent !== node.textContent) {
      const newElement = document.createElement("span");
      newElement.innerHTML = newContent;
      node.replaceWith(newElement);
    }
  } else {
    const childNodes = Array.from(node.childNodes);
    for (let child of childNodes) {
      walk(child);
    }
  }
}

walk(document.body);

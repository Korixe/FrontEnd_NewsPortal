const details = document.getElementsByName("details")[0];
const detailsBlock = details.parentNode;
let hint = null;

const HINT_WIDTH = 190;
const HINT_GAP = 12;

detailsBlock.style.position = "relative";

function placeHint() {
  const rightEdge = detailsBlock.getBoundingClientRect().right;
  const freeSpace = document.documentElement.clientWidth - rightEdge;

  if (freeSpace >= HINT_WIDTH + HINT_GAP + 16) {
    hint.style.position = "absolute";
    hint.style.display = "";
    hint.style.width = HINT_WIDTH + "px";
    hint.style.left = "100%";
    hint.style.top = "50%";
    hint.style.marginTop = "0";
    hint.style.marginLeft = HINT_GAP + "px";
    hint.style.transform = "translateY(-50%)";
  } else {
    hint.style.position = "static";
    hint.style.display = "block";
    hint.style.width = "auto";
    hint.style.left = "";
    hint.style.top = "";
    hint.style.marginTop = "8px";
    hint.style.marginLeft = "0";
    hint.style.transform = "none";
  }
}

function showHint() {
  details.style.backgroundColor = "rgb(253, 242, 244)";
  details.style.border = "2px solid #7a1f2b";
  details.style.padding = "7px";
  details.style.boxShadow = "0 0 10px rgba(122, 31, 43, 0.5)";

  if (hint === null) {
    hint = document.createElement("span");
    hint.innerHTML = "Дякуючи Вам, ми стаємо кращі! Конкретизуйте мету звернення, будь ласка";
    hint.style.padding = "8px 12px";
    hint.style.background = "white";
    hint.style.border = "1px solid #7a1f2b";
    hint.style.borderRadius = "6px";
    hint.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.2)";
    hint.style.fontSize = "0.85rem";
    hint.style.zIndex = "50";
    hint.style.boxSizing = "border-box";

    detailsBlock.appendChild(hint);
    placeHint();
  }
}

function hideHint() {
  details.style.backgroundColor = "";
  details.style.border = "";
  details.style.padding = "";
  details.style.boxShadow = "";

  if (hint !== null) {
    detailsBlock.removeChild(hint);
    hint = null;
  }
}

details.addEventListener("mouseover", showHint);
details.addEventListener("mouseout", hideHint);
const details = document.getElementsByName("details")[0];
const detailsBlock = details.parentNode;
let hint = null;

detailsBlock.style.position = "relative";

function showHint() {
  details.style.backgroundColor = "rgb(253, 242, 244)";
  details.style.border = "2px solid #7a1f2b";
  details.style.padding = "7px";
  details.style.boxShadow = "0 0 10px rgba(122, 31, 43, 0.5)";

  if (hint === null) {
    hint = document.createElement("span");
    hint.innerHTML = "Дякуючи Вам, ми стаємо кращі! Конкретизуйте мету звернення, будь ласка";
    hint.style.position = "absolute";
    hint.style.width = "190px";
    hint.style.padding = "8px 12px";
    hint.style.background = "white";
    hint.style.border = "1px solid #7a1f2b";
    hint.style.borderRadius = "6px";
    hint.style.boxShadow = "0 2px 8px rgba(0, 0, 0, 0.2)";
    hint.style.fontSize = "0.85rem";
    hint.style.zIndex = "50";

    hint.style.left = "100%";
    hint.style.top = "50%";
    hint.style.marginLeft = "12px";
    hint.style.transform = "translateY(-50%)";

    detailsBlock.appendChild(hint);
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
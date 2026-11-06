const nav = document.getElementsByTagName("nav")[0];
const pageHeader = document.getElementsByTagName("header")[0];
const mainBlock = document.getElementsByTagName("main")[0];
const asideBlock = document.getElementsByTagName("aside")[0];
const footer = document.getElementsByTagName("footer")[0];

const cultureSections = ["Література", "Кіно", "Музика", "Театр", "Образотворче мистецтво"];

const navLinks = nav.getElementsByTagName("a");
let navHtml = "";

for (let i = 0; i < navLinks.length; i++) {
  const href = navLinks[i].getAttribute("href");
  const text = navLinks[i].innerHTML;

  if (href === "culture_news.html") {
    navHtml += '<div id="cultureItem"><a href="' + href + '" id="cultureLink">' + text + '</a>';
    navHtml += '<nav id="cultureSubmenu">';
    for (let j = 0; j < cultureSections.length; j++) {
      navHtml += '<a href="culture_news.html">' + cultureSections[j] + '</a>';
    }
    navHtml += '</nav></div>';
  } else {
    navHtml += navLinks[i].outerHTML;
  }
}
nav.innerHTML = navHtml;

const cultureItem = document.getElementById("cultureItem");
const cultureLink = document.getElementById("cultureLink");
const submenu = document.getElementById("cultureSubmenu");
const submenuLinks = submenu.getElementsByTagName("a");

cultureItem.style.position = "relative";
cultureLink.style.display = "block";

submenu.style.display = "none";
submenu.style.background = "white";
submenu.style.textAlign = "left";
submenu.style.zIndex = "200";
for (let i = 0; i < submenuLinks.length; i++) {
  submenuLinks[i].style.display = "block";
}

cultureLink.onclick = function () {
  submenu.style.display = submenu.style.display === "none" ? "block" : "none";
  return false;
};

function closeSubmenu() {
  submenu.style.display = "none";
}

document.addEventListener("click", function (event) {
  if (!cultureItem.contains(event.target)) {
    closeSubmenu();
  }
});

document.addEventListener("keydown", function (event) {
  if (event.key === "Escape") {
    closeSubmenu();
  }
});

const navProps = ["position", "top", "left", "width", "maxHeight", "padding", "flexDirection",
  "flexWrap", "background", "borderRight", "boxShadow", "zIndex", "overflowY"];

function clearNavStyles() {
  for (let i = 0; i < navProps.length; i++) {
    nav.style[navProps[i]] = "";
  }
}

function setSubmenuDropdown(centered) {
  submenu.style.position = "absolute";
  submenu.style.top = "100%";
  submenu.style.left = centered ? "50%" : "0";
  submenu.style.transform = centered ? "translateX(-50%)" : "";
  submenu.style.minWidth = centered ? "210px" : "230px";
  submenu.style.border = "1px solid rgb(200, 208, 216)";
  submenu.style.borderTop = "3px solid #7a1f2b";
  submenu.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.15)";
  submenu.style.margin = "0";
}

function setSubmenuInline() {
  submenu.style.position = "static";
  submenu.style.left = "";
  submenu.style.transform = "";
  submenu.style.minWidth = "0";
  submenu.style.border = "none";
  submenu.style.borderLeft = "3px solid #7a1f2b";
  submenu.style.boxShadow = "none";
  submenu.style.margin = "4px 0 0 8px";
}

function updateNavLayout() {
  const width = window.innerWidth;

  clearNavStyles();
  mainBlock.style.paddingLeft = "";
  footer.style.paddingLeft = "";
  if (asideBlock) {
    asideBlock.style.marginLeft = "";
  }

  if (width > 768) {
    setSubmenuDropdown(false);
    return;
  }

  if (width <= 600) {
    setSubmenuDropdown(true);
    return;
  }

  const top = pageHeader.offsetHeight + 16;

  nav.style.position = "fixed";
  nav.style.top = top + "px";
  nav.style.left = "0";
  nav.style.width = "160px";
  nav.style.maxHeight = (window.innerHeight - top - 16) + "px";
  nav.style.overflowY = "auto";
  nav.style.padding = "8px";
  nav.style.flexDirection = "column";
  nav.style.flexWrap = "nowrap";
  nav.style.background = "white";
  nav.style.borderRight = "4px solid #7a1f2b";
  nav.style.boxShadow = "2px 2px 8px rgba(0, 0, 0, 0.15)";
  nav.style.zIndex = "150";

  mainBlock.style.paddingLeft = "176px";
  footer.style.paddingLeft = "176px";
  if (asideBlock) {
    asideBlock.style.marginLeft = "176px";
  }

  setSubmenuInline();
}

updateNavLayout();
window.addEventListener("resize", updateNavLayout);
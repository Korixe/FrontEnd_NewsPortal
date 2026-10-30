const nav = document.getElementsByTagName("nav")[0];
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
    navHtml += '<a href="' + href + '">' + text + '</a>';
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
submenu.style.zIndex = "200";
for (let i = 0; i < submenuLinks.length; i++) {
  submenuLinks[i].style.display = "block";
}

cultureLink.onclick = function () {
  submenu.style.display = submenu.style.display === "none" ? "block" : "none";
  return false;
};

function updateNavLayout() {
  if (window.innerWidth <= 768) {
    nav.style.position = "fixed";
    nav.style.top = "116px";
    nav.style.left = "0";
    nav.style.width = "120px";
    nav.style.padding = "8px";
    nav.style.flexDirection = "column";
    nav.style.background = "white";
    nav.style.borderRight = "4px solid #7a1f2b";
    nav.style.boxShadow = "2px 2px 8px rgba(0, 0, 0, 0.15)";
    nav.style.zIndex = "150";

    document.body.style.paddingLeft = "136px";
    document.body.style.paddingTop = "104px";
    footer.style.marginLeft = "-136px";
    footer.style.paddingLeft = "136px";

    submenu.style.position = "static";
    submenu.style.minWidth = "0";
    submenu.style.border = "none";
    submenu.style.borderLeft = "3px solid #7a1f2b";
    submenu.style.boxShadow = "none";
    submenu.style.margin = "4px 0 0 8px";
  } else {
    nav.style.position = "";
    nav.style.top = "";
    nav.style.left = "";
    nav.style.width = "";
    nav.style.padding = "";
    nav.style.flexDirection = "";
    nav.style.background = "";
    nav.style.borderRight = "";
    nav.style.boxShadow = "";
    nav.style.zIndex = "";

    document.body.style.paddingLeft = "";
    document.body.style.paddingTop = "";
    footer.style.marginLeft = "";
    footer.style.paddingLeft = "";

    submenu.style.position = "absolute";
    submenu.style.top = "100%";
    submenu.style.left = "0";
    submenu.style.minWidth = "230px";
    submenu.style.border = "1px solid rgb(200, 208, 216)";
    submenu.style.borderTop = "3px solid #7a1f2b";
    submenu.style.boxShadow = "0 4px 10px rgba(0, 0, 0, 0.15)";
    submenu.style.margin = "0";
  }
}

updateNavLayout();
window.addEventListener("resize", updateNavLayout);
const X = 5;
const Y = 2;

// Пошук
const newsSection = document.getElementsByTagName("section")[0];
newsSection.innerHTML = '<input type="text" id="search" placeholder="Пошук новин за назвою...">' +
                        '<p id="searchInfo"></p>' +
                        newsSection.innerHTML;

const search = document.getElementById("search");
const searchInfo = document.getElementById("searchInfo");
const newsItems = document.querySelectorAll("main li");
const newsTitles = document.querySelectorAll("main article h3");

search.style.width = "100%";
search.style.padding = "10px 12px";
search.style.border = "1px solid rgb(200, 208, 216)";
search.style.font = "inherit";
searchInfo.style.margin = "8px 0 16px";
searchInfo.style.color = "dimgray";
searchInfo.style.fontSize = "0.9rem";

const titleTexts = [];
for (let i = 0; i < newsTitles.length; i++) {
  titleTexts.push(newsTitles[i].innerHTML.toLowerCase());
}

function searchNews() {
  const query = search.value.toLowerCase();
  let found = 0;

  for (let i = 0; i < newsItems.length; i++) {
    if (titleTexts[i].indexOf(query) !== -1) {
      newsItems[i].style.display = "";
      found++;
    } else {
      newsItems[i].style.display = "none";
    }
  }

  if (query.length === 0) {
    searchInfo.innerHTML = "";
  } else if (found === 0) {
    searchInfo.innerHTML = "Нічого не знайдено";
  } else {
    searchInfo.innerHTML = "Знайдено новин: " + found;
  }
}

search.addEventListener("keyup", searchNews);
search.addEventListener("change", searchNews);


// Текст "увага"
const importantTitles = document.getElementsByClassName("important");
const warnings = [];

for (let i = 0; i < importantTitles.length; i++) {
  const warning = document.createElement("span");
  warning.innerHTML = "Увага!";
  warning.style.color = "red";
  warning.style.fontSize = "1.2em";
  warning.style.marginLeft = "12px";
  warning.style.display = "none";
  importantTitles[i].appendChild(warning);
  warnings.push(warning);
}

function hideWarning() {
  for (let i = 0; i < warnings.length; i++) {
    warnings[i].style.display = "none";
  }
}

function showWarning() {
  for (let i = 0; i < warnings.length; i++) {
    warnings[i].style.display = "inline";
  }
  setTimeout(hideWarning, Y * 1000);
}

setInterval(showWarning, X * 1000);
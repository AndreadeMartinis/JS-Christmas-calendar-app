// Array di URL delle immagini
const imageUrls = Array.from(
  { length: 24 },
  (_, index) => `src/img/${index + 1}_dayPromo.png`
);

// Array di icone

const iconElements = [
  "fa-gift",
  "fa-star",
  "fa-snowman",
  "fa-cookie-bite",
  "fa-bell",
  "fa-candy-cane",
  "fa-tree",
  "fa-snowflake",
  "fa-sleigh",
  "fa-gifts",
  "fa-star",
  "fa-bell",
  "fa-snowflake",
  "fa-tree",
  "fa-candy-cane",
  "fa-sleigh",
  "fa-cookie-bite",
  "fa-gift",
  "fa-snowman",
  "fa-star",
  "fa-tree",
  "fa-snowflake",
  "fa-sleigh",
  "fa-gifts",
];

//const today = new Date().getDate();
// Data odierna
const today = 11;

//Giorni di chiusura
const closingDays = [3, 4, 8, 9, 10, 17, 24];

// Array per tenere traccia dello stato di apertura di ciascun giorno
const openedBoxes = Array(24).fill(false);

// Funzione per creare il calendario
function createCalendar() {
  const calendar = document.querySelector(".calendar");

  for (let day = 1; day <= 24; day++) {
    const dayBoxEl = document.createElement("div");
    dayBoxEl.classList.add("dayBox");
    dayBoxEl.textContent = day;

    //prettier-ignore
    if (closingDays.includes(day)) {
      //Giorni di chiusura
      const dayoffOverlay = addOverlay(dayBoxEl, "dayBox-overlay-dayoff");
      addBoxMessage("Oggi", "Chiuso", dayoffOverlay)
    } 
    else if (day === today)
      // Effetto risalto casella del giorno
      dayBoxEl.classList.add("dayBox-today-animation");
    else if(day === today+1){
      // Casella del giorno dopo
      const tomorrowOverlay = addOverlay(dayBoxEl, "dayBox-overlay-dayoff");
      addBoxMessage("Offerta di", "Domani", tomorrowOverlay)
    }

    if (day < today) {
      const svgElement = createSVG("rgba(184, 8, 8, 0.6)", "20px", "20px");
      const groupElement = createGroupWithPath();
      svgElement.appendChild(groupElement);
      dayBoxEl.appendChild(svgElement);
      /* dayBoxEl.style.backgroundImage = `url(${imageUrls[day - 1]})`; */
    }
    const clickHandler = () => openBox(dayBoxEl, day);

    dayBoxEl.addEventListener("click", clickHandler);
    calendar.appendChild(dayBoxEl);
  }
}

function openBox(dayBoxEl, day) {
  if (day <= today + 1) {
    //Se la casella non è stata ancora aperta, applica l'effetto
    if (!openedBoxes[day - 1]) {
      dayBoxEl.classList.add("dayBox-flip");
      if (!closingDays.includes(day)) openedBoxes[day - 1] = true;
      // Rimuovi la classe dopo l'animazione
      setTimeout(() => {
        controlPopup(dayBoxEl, day);
      }, 600);
    } else controlPopup(dayBoxEl, day);
  } else {
    const futureOfferOverlay = document.createElement("span");
    futureOfferOverlay.classList.add("dayBox-overlay-futureOffer");
    futureOfferOverlay.textContent = "Ogni giorno una sorpresa diversa!";
    dayBoxEl.appendChild(futureOfferOverlay);
    setTimeout(() => {
      futureOfferOverlay.classList.add("fade-out");
      setTimeout(() => {
        dayBoxEl.removeChild(futureOfferOverlay);
      }, 600);
    }, 1200);
  }
}

function addOverlay(el, overlayClass) {
  const overlay = document.createElement("span");
  overlay.classList.add(overlayClass);
  el.appendChild(overlay);
  return overlay;
}

function addBoxMessage(firstMessage, secondMessage, overlay) {
  const firstMessageP = document.createElement("p");
  firstMessageP.textContent = firstMessage;
  overlay.appendChild(firstMessageP);
  const secondMessageP = document.createElement("p");
  secondMessageP.textContent = secondMessage;
  overlay.appendChild(secondMessageP);
}

function openInfoPopup() {
  const popupImage = document.querySelector(".popupImage");
  const overlayPopup = document.querySelector(".overlay-popup");

  popupImage.src = "src/img/infoPromo.png";
  popupImage.alt = "Info Evento";
  overlayPopup.style.display = "flex";

  overlayPopup.addEventListener("click", () => {
    overlayPopup.style.display = "none";
  });
}

function writeTodayMessage() {
  const countdownEl = document.querySelector(".countdown");
  const todayEl = document.querySelector(".today");
  //prettier-ignore
  countdownEl.textContent = `-${25 - today} a Natale!`;
  todayEl.textContent = today;
}

function closeStarterOverlay() {
  const body = document.querySelector("body");
  const overlay = document.querySelector(".overlay-welcome");
  const calendar = document.querySelector(".calendar");
  const infoIcon = document.querySelector(".fa-candy-cane");
  overlay.classList.add("fade-out");
  setTimeout(() => {
    body.removeChild(overlay);
  }, 600);
  infoIcon.addEventListener("click", openInfoPopup);
  writeTodayMessage();
  calendar.style.display = "grid";
}

function loadingAnimation() {
  const loaderBar = document.getElementById("loader-bar");
  const loaderText = document.getElementById("loader-text");
  const giftIcon = document.querySelector(".fa-gift");
  const iconMessage = document.querySelector(".icon-message");

  let progress = 0;

  function updateLoader() {
    if (progress < 100) {
      progress += 2;
      loaderBar.style.width = `${progress}%`;
      loaderText.textContent = `${progress}%`;
      if (progress === 100) {
        // Caricamento completato: applica gli effetti all'icona
        giftIcon.style.color = "rgb(165, 10, 10)";
        iconMessage.style.color = "rgb(165, 10, 10)";
        giftIcon.classList.add("shake");
      }
      setTimeout(updateLoader, 20);
    }
  }

  updateLoader();
}

function loadApp() {
  loadingAnimation();
  const startButton = document.querySelector(".icon-button");
  createCalendar();
  startButton.addEventListener("click", closeStarterOverlay);
}

loadApp();

// Crea un elemento SVG con attributi
function createSVG(color, width, height) {
  const svg = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  svg.setAttribute("fill", color);
  svg.setAttribute("version", "1.1");
  svg.setAttribute("id", "Capa_1");
  svg.setAttribute("xmlns", "http://www.w3.org/2000/svg");
  svg.setAttribute("xmlns:xlink", "http://www.w3.org/1999/xlink");
  svg.setAttribute("width", width);
  svg.setAttribute("height", height);
  svg.setAttribute("viewBox", "0 0 191.721 191.72");
  svg.setAttribute("xml:space", "preserve");
  return svg;
}

// Crea un elemento 'g' con il path
function createGroupWithPath() {
  const g = document.createElementNS("http://www.w3.org/2000/svg", "g");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");
  path.setAttribute(
    "d",
    "M191.328,133.248c-6.39-12.188-19.232-21.508-29.474-30.397c-10.948-9.502-22.332-18.497-33.687-27.513c12.985-16.615,26.197-33.1,39.136-49.818c2.477-0.111,4.292-2.813,3.856-5.3c1.225-3.119-2.752-6.463-5.736-5.2c-5.744-3.401-12.061-6.335-17.977-9.095c-2.389-1.115-5.137,1.275-4.309,3.452c-14.211,14.521-28.93,28.564-43.797,42.467c-6.208-5.272-12.332-10.644-18.3-16.188c-0.028-0.026-0.054-0.056-0.082-0.082c-0.013-1.002-0.447-2.013-1.469-2.859c-0.295-0.244-0.615-0.452-0.916-0.687l0.01-0.013c-0.038-0.02-0.075-0.044-0.113-0.065c-1.137-0.884-2.283-1.755-3.453-2.59c-5.625-6.393-11.027-13.564-17.396-18.717c-0.107-3.117-3.365-6.168-6.835-4.063c-11.694,7.096-25.984,14.422-35.003,24.937c-0.285,0.332-0.502,0.674-0.675,1.023c-2.405,0-4.331,3.555-2.289,5.636c16.229,16.54,34.895,30.518,53.126,44.752c-20.276,18.875-40.302,37.979-59.288,58.052c-0.08,0.071-0.165,0.098-0.243,0.18c-1.737,1.782-3.445,3.593-5.122,5.431c-2.882,3.107-0.485,7.23,2.663,7.824c5.768,9.427,14.606,16.436,23.635,22.602c6.122,4.182,17.289,11.836,24.996,8.038c1.435,0.256,2.953-0.159,3.71-1.67c12.661-25.268,27.836-48.728,44.177-71.383c9.179,8.064,18.289,16.209,27.48,24.216c2.699,2.351,32.588,33.965,37.721,23.447c0.705,0.192,1.441,0.281,2.169,0.147c4.673-0.851,8.372-6.737,10.926-10.222c2.64-3.602,5.362-7.41,7.675-11.325C189.584,140.387,192.869,136.188,191.328,133.248z M21.652,139.835c-0.232,0.629-0.283,1.287-0.24,1.938c-1.146,0.634-1.929,1.723-2.232,2.958c-1.187,0.104-2.329,0.498-3.314,1.236c-0.14-0.058-0.277-0.118-0.417-0.176C17.506,143.8,19.571,141.813,21.652,139.835z M51.05,177.043c-0.836-0.394-1.706-0.678-2.581-0.959c1.438-0.5,2.758-1.215,3.959-2.127C51.977,174.988,51.492,176.008,51.05,177.043z M72.621,76.7c-10.23-8.269-20.595-16.375-30.994-24.432c3.282,2.261,6.666,4.363,10.146,6.318c6.855,6.141,13.933,12.056,21.077,17.901C72.772,76.559,72.696,76.63,72.621,76.7z"
  );

  g.appendChild(path);
  return g;
}

function controlPopup(dayBoxEl, day) {
  dayBoxEl.classList.remove("dayBox-flip");
  const imageUrl = imageUrls[day - 1];
  const popupImage = document.querySelector(".popupImage");
  const overlayPopup = document.querySelector(".overlay-popup");
  const infoPromo = document.createElement("p");

  popupImage.src = imageUrl;
  popupImage.alt = `Info ${day} Dicembre`;

  overlayPopup.style.display = "flex";
  overlayPopup.addEventListener("click", overlayClickHandler);

  if (!closingDays.includes(day)) {
    infoPromo.textContent = `L'offerta del ${day} dicembre purtroppo è scaduta!`;
    if (day === today)
      infoPromo.innerHTML = `Offerta del giorno! <br> Corri da noi, ti stiamo aspettando!`;
    if (day === today + 1)
      infoPromo.innerHTML = `Questa è l'offerta di domani!<br> Non fartela scappare!`;
    popupImage.insertAdjacentElement("afterend", infoPromo);
  }

  function overlayClickHandler() {
    overlayPopup.style.display = "none";
    /* dayBoxEl.style.backgroundImage = `url(${imageUrl})`; */
    if (!closingDays.includes(day)) {
      const openBoxOverlay = addOverlay(dayBoxEl, "dayBox-overlay-openbox");
      const dayInTheCorner = document.createElement("p");

      dayBoxEl.textContent = "";
      infoPromo.textContent = "";

      dayInTheCorner.textContent = day;
      openBoxOverlay.appendChild(dayInTheCorner);

      dayBoxEl.classList.add("dayBox-open");
      dayBoxEl.classList.remove("dayBox-today-animation");

      const icon = document.createElement("icon");
      icon.classList.add("fa-solid", iconElements[day - 1]);
      dayBoxEl.appendChild(icon);
    }

    overlayPopup.removeEventListener("click", overlayClickHandler);
  }
}

/* 
TODO:

- Sistemare footer
- Sistemare messaggio di benvenuto
- Alla pressione sul pulsante, cambiare colore (onfocus?)
- Far gestire il colore dell'svg dal css
- Capire cosa accade al caricamento con il contenuto "sotto" che appare "sopra"
- Sistemare flickering delle immagini
- Mettere offerta di domani


*/

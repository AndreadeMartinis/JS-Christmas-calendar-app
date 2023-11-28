import { addOverlay, addBoxMessage } from "./controlOverlay.js";
import { createSVG, createGroupWithPath } from "./createSVG.js";
import { loaderBarAnimation } from "./loaderBarAnimation.js";
import { writeTodayMessage } from "./writeTodayMessage.js";

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
const today = 5;

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

    if (day < today && today !== 30) {
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
  if (today === 30) {
    const dayBoxEl = document.querySelector(".dayBox");
    const tomorrowOverlay = addOverlay(dayBoxEl, "dayBox-overlay-dayoff");
    addBoxMessage("Offerta di", "Domani", tomorrowOverlay);
  }
}

function openBox(dayBoxEl, day) {
  if (day <= today + 1 && today !== 30) {
    //Se la casella non è stata ancora aperta:
    if (!openedBoxes[day - 1]) {
      //Applica l'effetto flip
      dayBoxEl.classList.add("dayBox-flip");
      //Se non è un giorno di chiusura e non è domani, setta la casella su "aperta"
      if (!closingDays.includes(day) && day !== today + 1)
        openedBoxes[day - 1] = true;
      // Aspetta l'animazione e poi apri il popup
      setTimeout(() => {
        openDayOfferPopup(dayBoxEl, day);
      }, 600);
    } else openDayOfferPopup(dayBoxEl, day); //Se la casella fosse già stata aperta, apri subito il popup
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

function openDayOfferPopup(dayBoxEl, day) {
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
    if (!closingDays.includes(day) && day !== today + 1) {
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

function closeStarterOverlay() {
  const body = document.querySelector("body");
  const overlay = document.querySelector(".overlay-welcome");
  overlay.classList.add("fade-out");
  setTimeout(() => {
    body.removeChild(overlay);
  }, 600);
  startApp();
}

function startApp() {
  const infoIcon = document.querySelector(".fa-candy-cane");
  const calendar = document.querySelector(".calendar");
  const main = document.querySelector("main");
  infoIcon.addEventListener("click", openInfoPopup);
  writeTodayMessage(today);
  calendar.style.display = "grid";
  main.style.display = "flex";
}

function loadApp() {
  loaderBarAnimation();
  const startButton = document.querySelector(".icon-button");
  createCalendar();
  startButton.addEventListener("click", closeStarterOverlay);
}

loadApp();

/* 
TODO:

- Sistemare messaggio di benvenuto
- Alla pressione sul pulsante, cambiare colore (onfocus?)
- Far gestire il colore dell'svg dal css
- Capire cosa accade al caricamento con il contenuto "sotto" che appare "sopra"
- Sistemare flickering delle immagini


*/

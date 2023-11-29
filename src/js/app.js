import { addOverlay, addBoxMessage } from "./controlOverlay.js";
import { createSVG, createGroupWithPath } from "./createSVG.js";
import { handleOpenedBox } from "./handleOpenedBox.js";
import { loaderBarAnimation } from "./loaderBarAnimation.js";
import { openInfoPopup } from "./openInfoPopup.js";
import { setInfoPromoText } from "./setInfoPromoText.js";
import { showFutureOfferMessage } from "./showFutureOfferMessage.js";
import { writeTodayMessage } from "./writeTodayMessage.js";

const imageUrls = Array.from(
  { length: 24 },
  (_, index) => `src/img/${index + 1}_dayPromo.jpg`
);

export const iconElements = [
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
export const today = 5;
const closingDays = [3, 4, 8, 9, 10, 17, 24];
const openedBoxes = Array(24).fill(false);

function createCalendar() {
  const calendar = document.querySelector(".calendar");

  for (let day = 1; day <= 24; day++) {
    const dayBoxEl = createDayBox(day);
    calendar.appendChild(dayBoxEl);
  }

  if (today === 30) {
    const dayBoxEl = document.querySelector(".dayBox");
    const tomorrowOverlay = addOverlay(dayBoxEl, "dayBox-overlay-dayoff");
    addBoxMessage("Offerta di", "Domani", tomorrowOverlay);
  }
}

function createDayBox(day) {
  const dayBoxEl = document.createElement("div");
  dayBoxEl.classList.add("dayBox");
  dayBoxEl.textContent = day;

  if (closingDays.includes(day)) {
    const dayoffOverlay = addOverlay(dayBoxEl, "dayBox-overlay-dayoff");
    addBoxMessage("", "Chiuso", dayoffOverlay);
  } else if (day === today) {
    dayBoxEl.classList.add("dayBox-today-animation");
  } else if (day === today + 1) {
    const tomorrowOverlay = addOverlay(dayBoxEl, "dayBox-overlay-tomorrow");
    addBoxMessage("Offerta di", "Domani", tomorrowOverlay);
  }

  if (day < today && today !== 30) {
    addPastDayElements(dayBoxEl, day);
  }

  const clickHandler = () => openBox(dayBoxEl, day);
  dayBoxEl.addEventListener("click", clickHandler);

  return dayBoxEl;
}

function addPastDayElements(dayBoxEl, day) {
  const svgElement = createSVG("rgba(184, 8, 8, 0.6)", "20px", "20px");
  const groupElement = createGroupWithPath();
  svgElement.appendChild(groupElement);
  dayBoxEl.appendChild(svgElement);
  // Uncomment the line below if needed
  // dayBoxEl.style.backgroundImage = `url(${imageUrls[day - 1]})`;
}

function openBox(dayBoxEl, day) {
  if (day <= today + 1 && today !== 30) {
    if (!openedBoxes[day - 1]) {
      //Se la casella non è stata ancora aperta
      dayBoxEl.classList.add("dayBox-flip"); //Esegui l'animazione di flip
      if (!closingDays.includes(day) && day !== today + 1)
        //Se non è un giorno di chiusura o non è domani, segna la casella come aperta
        openedBoxes[day - 1] = true;

      setTimeout(() => {
        //Aspetta l'animazione e poi apri il popup
        openDayOfferPopup(dayBoxEl, day);
      }, 600);
    } else {
      //Se la casella è stata già aperta, non eseguire l'animazione e apri il popup
      openDayOfferPopup(dayBoxEl, day);
    }
  } else if (today !== 30 && !closingDays.includes(day)) {
    showFutureOfferMessage(dayBoxEl);
  } else if (closingDays.includes(day)) {
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
    setInfoPromoText(infoPromo, day);
    popupImage.insertAdjacentElement("afterend", infoPromo);
  }

  function overlayClickHandler() {
    overlayPopup.style.display = "none";
    if (!closingDays.includes(day) && day !== today + 1) {
      handleOpenedBox(dayBoxEl, infoPromo, day);
    } else if (day === today + 1) {
      infoPromo.textContent = "";
    }
    overlayPopup.removeEventListener("click", overlayClickHandler);
  }
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
  const infoContainer = document.querySelector(".info-container");
  const main = document.querySelector("main");
  const footer = document.querySelector("footer");
  const header = document.querySelector("header");

  infoContainer.addEventListener("click", openInfoPopup);
  writeTodayMessage(today);

  main.style.display = "flex";
  footer.style.display = "flex";
  header.style.display = "block";
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
- Sistemare colori: 
  - Header
  - Footer
  - Messaggio di ingaggio
  - Al click su caselle apribili future

- Alla pressione sul pulsante, cambiare colore (onfocus?) ???
- Ridimensionare le immagini

- CIAO!!!

*/

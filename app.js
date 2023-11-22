// Array di URL delle immagini
const imageUrls = Array.from(
  { length: 24 },
  (_, index) => `src/img/${index + 1}_dayPromo.png`
);

//const today = new Date().getDate();
// Data odierna
const today = 12;

// Funzione per creare il calendario
function createCalendar() {
  const calendar = document.querySelector(".calendar");

  for (let day = 1; day <= 24; day++) {
    const dayBoxEl = document.createElement("div");
    dayBoxEl.classList.add("dayBoxEl");

    if (day > today) {
      dayBoxEl.textContent = day;
    } else if (day < today) {
      const expiredOverflow = document.createElement("span");
      expiredOverflow.classList.add("expiredOffer");
      dayBoxEl.appendChild(expiredOverflow);
      dayBoxEl.style.backgroundImage = `url(${imageUrls[day - 1]})`;
      dayBoxEl.classList.add("dayBoxEl-open");
    } else {
      dayBoxEl.textContent = day;
      dayBoxEl.classList.add("dayBoxEl-today");
    }

    dayBoxEl.addEventListener("click", () => openImage(dayBoxEl, day));
    calendar.appendChild(dayBoxEl);
  }
  writeDateMessage();
}

// Funzione per aprire l'immagine come popup
function openImage(dayBoxEl, day) {
  if (day <= today) {
    const imageUrl = imageUrls[day - 1];

    const popupImage = document.querySelector(".popupImage");
    popupImage.src = imageUrl;
    popupImage.alt = `Offerta del giorno ${day} Dicembre`;

    const infoPromo = document.createElement("p");
    infoPromo.textContent = `L'offerta del ${day} dicembre purtroppo è scaduta!`;
    if (day === today)
      infoPromo.innerHTML = `Offerta del giorno! <br> Corri da noi, ti stiamo aspettando!`;
    popupImage.insertAdjacentElement("afterend", infoPromo);

    const overlayPopup = document.querySelector(".overlay-popup");
    overlayPopup.style.display = "flex";

    overlayPopup.addEventListener("click", () => {
      overlayPopup.style.display = "none";
      dayBoxEl.style.backgroundImage = `url(${imageUrl})`;
      infoPromo.textContent = "";
      if (day === today) dayBoxEl.textContent = "";
      dayBoxEl.classList.add("dayBoxEl-open");
      dayBoxEl.classList.remove("dayBoxEl-today");
    });
  } else {
    const futureOfferOverflow = document.createElement("span");
    futureOfferOverflow.classList.add("futureOffer");
    futureOfferOverflow.textContent = "Ogni giorno una sorpresa diversa!";
    dayBoxEl.appendChild(futureOfferOverflow);
    setTimeout(() => {
      futureOfferOverflow.classList.add("fade-out");
      setTimeout(() => {
        dayBoxEl.removeChild(futureOfferOverflow);
      }, 600);
    }, 1200);
  }
}

function openInfoPanel() {
  const popupImage = document.querySelector(".popupImage");
  popupImage.src = "src/img/infoPromo.png";
  popupImage.alt = "Info Evento";

  const overlayPopup = document.querySelector(".overlay-popup");
  overlayPopup.style.display = "flex";

  overlayPopup.addEventListener("click", () => {
    overlayPopup.style.display = "none";
  });
}

function writeDateMessage() {
  const messageEl = document.querySelector(".dateMessage");
  const todayEl = document.querySelector(".today");
  //prettier-ignore
  messageEl.textContent = `-${25 - today}`;
  todayEl.textContent = today;
}

const infoIcon = document.querySelector(".fa-candy-cane");
infoIcon.addEventListener("click", openInfoPanel);

function closeStarterOverlay() {
  const overlay = document.querySelector(".overlay-welcome");
  const calendar = document.querySelector(".calendar");
  overlay.style.display = "none";
  calendar.style.display = "grid";
}

function loadApp() {
  const startButton = document.querySelector(".icon-button");
  createCalendar();

  startButton.addEventListener("click", closeStarterOverlay);
}

document.addEventListener("DOMContentLoaded", function () {
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
});

loadApp();
/* 
TODO:

- Al caricamento mandare un popup di auguri che si chiude e mostra il calendario


*/

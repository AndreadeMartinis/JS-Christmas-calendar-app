// Array di URL delle immagini
const imageUrls = Array.from(
  { length: 24 },
  (_, index) => `src/img/${index + 1}_dayPromo.png`
);

//const today = new Date().getDate();
// Data odierna
const today = 16;

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

    const overlay = document.querySelector(".overlay");
    overlay.style.display = "flex";

    overlay.addEventListener("click", () => {
      overlay.style.display = "none";
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

  const overlay = document.querySelector(".overlay");
  overlay.style.display = "flex";

  overlay.addEventListener("click", () => {
    overlay.style.display = "none";
  });
}

function writeDateMessage() {
  const messageEl = document.querySelector(".dateMessage");
  //prettier-ignore
  messageEl.textContent = `Oggi è ${today} Dicembre, mancano ${25 - today} giorni a Natale!`;
}

const infoIcon = document.querySelector(".fa-candy-cane");
infoIcon.addEventListener("click", openInfoPanel);

window.addEventListener("DOMContentLoaded", createCalendar);

/* 
TODO:

- Al caricamento mandare un popup di auguri che si chiude e mostra il calendario


*/

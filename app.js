// Array di URL delle immagini
const imageUrls = [
  "src/img/1_dayPromo.png",
  "src/img/2_dayPromo.png",
  "src/img/3_dayPromo.png",
  "src/img/4_dayPromo.png",
  "src/img/5_dayPromo.png",
  "src/img/6_dayPromo.png",
  "src/img/7_dayPromo.png",
  "src/img/8_dayPromo.png",
  "src/img/9_dayPromo.png",
  "src/img/10_dayPromo.png",
  "src/img/11_dayPromo.png",
  "src/img/12_dayPromo.png",
  "src/img/13_dayPromo.png",
  "src/img/14_dayPromo.png",
  "src/img/15_dayPromo.png",
  "src/img/16_dayPromo.png",
  "src/img/17_dayPromo.png",
  "src/img/18_dayPromo.png",
  "src/img/19_dayPromo.png",
  "src/img/20_dayPromo.png",
  "src/img/21_dayPromo.png",
  "src/img/22_dayPromo.png",
  "src/img/23_dayPromo.png",
  "src/img/24_dayPromo.png",
];

//const today = new Date().getDate();
const today = 16;

// Funzione per creare il calendario
function createCalendar() {
  const calendar = document.querySelector(".calendar");

  for (let day = 1; day <= 24; day++) {
    const dayBoxEl = document.createElement("div");
    dayBoxEl.classList.add("dayBoxEl");

    if (day >= today) {
      dayBoxEl.textContent = day;
    }
    if (day < today) {
      dayBoxEl.style.backgroundImage = `url(${imageUrls[day - 1]})`;
      dayBoxEl.classList.add("dayBoxEl-open");
    }
    if (day === today) {
      dayBoxEl.classList.add("dayBoxEl-today");
    }
    dayBoxEl.addEventListener("click", () => openImage(dayBoxEl, day));
    calendar.appendChild(dayBoxEl);
  }
}

// Funzione per aprire l'immagine come popup
function openImage(dayBoxEl, day) {
  if (day <= today) {
    // Ottieni l'URL dell'immagine corrispondente al giorno
    const imageUrl = imageUrls[day - 1];

    // Mostra l'immagine nel popup
    const popupImage = document.querySelector(".popupImage");
    popupImage.src = imageUrl;
    popupImage.alt = `Offerta del giorno ${day} Dicembre`;

    // Aggiunge una descrizione all'immagine
    const infoPromo = document.createElement("p");
    infoPromo.textContent = `Offerta del ${day} dicembre`;
    popupImage.insertAdjacentElement("afterend", infoPromo);

    // Mostra l'overlay
    const overlay = document.querySelector(".overlay");
    overlay.style.display = "flex";

    // Chiude l'overlay al clic sull'overlay
    overlay.addEventListener("click", () => {
      overlay.style.display = "none";
      // Assegna l'immagine come sfondo della casella
      dayBoxEl.style.backgroundImage = `url(${imageUrl})`;

      infoPromo.textContent = "";
      dayBoxEl.textContent = "";

      dayBoxEl.classList.add("dayBoxEl-open");
      dayBoxEl.classList.remove("dayBoxEl-today");
    });
  }
  if (day > today) {
    const alertEl = document.createElement("span");
    alertEl.classList.add("alertEl");
    alertEl.textContent = "Ogni giorno una sorpresa diversa!";
    dayBoxEl.appendChild(alertEl);
    setTimeout(() => {
      alertEl.classList.add("fade-out");
      setTimeout(() => {
        dayBoxEl.removeChild(alertEl);
      }, 600);
    }, 1200);
  }
}

function openInfoPanel() {
  const popupImage = document.querySelector(".popupImage");
  popupImage.src = "src/img/infoPromo.png";
  popupImage.alt = "Info Evento";

  // Mostra l'overlay
  const overlay = document.querySelector(".overlay");
  overlay.style.display = "flex";

  // Chiudi l'overlay al clic sull'overlay
  overlay.addEventListener("click", () => {
    overlay.style.display = "none";
  });
}

const infoIcon = document.querySelector(".fa-candy-cane");

infoIcon.addEventListener("click", openInfoPanel);

// Chiama la funzione per creare il calendario quando la pagina è caricata
window.addEventListener("DOMContentLoaded", createCalendar);

/* 
TODO:

- Al caricamento mandare un popup di auguri che si chiude e mostra il calendario


*/

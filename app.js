// Array di URL delle immagini
const imageUrls = [
  "https://image.jimcdn.com/app/cms/image/transf/dimension=940x10000:format=png/path/s8bc0749396092fd4/image/ife39e4302520f913/version/1653580461/buono-regalo-estetica.png",
  "https://image.jimcdn.com/app/cms/image/transf/dimension=940x10000:format=png/path/s8bc0749396092fd4/image/ife39e4302520f913/version/1653580461/buono-regalo-estetica.png",
  "https://image.jimcdn.com/app/cms/image/transf/dimension=940x10000:format=png/path/s8bc0749396092fd4/image/ife39e4302520f913/version/1653580461/buono-regalo-estetica.png",
  "https://image.jimcdn.com/app/cms/image/transf/dimension=940x10000:format=png/path/s8bc0749396092fd4/image/ife39e4302520f913/version/1653580461/buono-regalo-estetica.png",
  "https://image.jimcdn.com/app/cms/image/transf/dimension=940x10000:format=png/path/s8bc0749396092fd4/image/ife39e4302520f913/version/1653580461/buono-regalo-estetica.png",
  "https://image.jimcdn.com/app/cms/image/transf/dimension=940x10000:format=png/path/s8bc0749396092fd4/image/ife39e4302520f913/version/1653580461/buono-regalo-estetica.png",
  "https://image.jimcdn.com/app/cms/image/transf/dimension=940x10000:format=png/path/s8bc0749396092fd4/image/ife39e4302520f913/version/1653580461/buono-regalo-estetica.png",
  "https://image.jimcdn.com/app/cms/image/transf/dimension=940x10000:format=png/path/s8bc0749396092fd4/image/ife39e4302520f913/version/1653580461/buono-regalo-estetica.png",
  "https://image.jimcdn.com/app/cms/image/transf/dimension=940x10000:format=png/path/s8bc0749396092fd4/image/ife39e4302520f913/version/1653580461/buono-regalo-estetica.png",
  "https://image.jimcdn.com/app/cms/image/transf/dimension=940x10000:format=png/path/s8bc0749396092fd4/image/ife39e4302520f913/version/1653580461/buono-regalo-estetica.png",
  "https://image.jimcdn.com/app/cms/image/transf/dimension=940x10000:format=png/path/s8bc0749396092fd4/image/ife39e4302520f913/version/1653580461/buono-regalo-estetica.png",
  "https://image.jimcdn.com/app/cms/image/transf/dimension=940x10000:format=png/path/s8bc0749396092fd4/image/ife39e4302520f913/version/1653580461/buono-regalo-estetica.png",
  "https://image.jimcdn.com/app/cms/image/transf/dimension=940x10000:format=png/path/s8bc0749396092fd4/image/ife39e4302520f913/version/1653580461/buono-regalo-estetica.png",
  "https://image.jimcdn.com/app/cms/image/transf/dimension=940x10000:format=png/path/s8bc0749396092fd4/image/ife39e4302520f913/version/1653580461/buono-regalo-estetica.png",
  "https://image.jimcdn.com/app/cms/image/transf/dimension=940x10000:format=png/path/s8bc0749396092fd4/image/ife39e4302520f913/version/1653580461/buono-regalo-estetica.png",
  "https://image.jimcdn.com/app/cms/image/transf/dimension=940x10000:format=png/path/s8bc0749396092fd4/image/ife39e4302520f913/version/1653580461/buono-regalo-estetica.png",
  "https://image.jimcdn.com/app/cms/image/transf/dimension=940x10000:format=png/path/s8bc0749396092fd4/image/ife39e4302520f913/version/1653580461/buono-regalo-estetica.png",
  "https://image.jimcdn.com/app/cms/image/transf/dimension=940x10000:format=png/path/s8bc0749396092fd4/image/ife39e4302520f913/version/1653580461/buono-regalo-estetica.png",
  "https://image.jimcdn.com/app/cms/image/transf/dimension=940x10000:format=png/path/s8bc0749396092fd4/image/ife39e4302520f913/version/1653580461/buono-regalo-estetica.png",
  "https://image.jimcdn.com/app/cms/image/transf/dimension=940x10000:format=png/path/s8bc0749396092fd4/image/ife39e4302520f913/version/1653580461/buono-regalo-estetica.png",
  "https://image.jimcdn.com/app/cms/image/transf/dimension=940x10000:format=png/path/s8bc0749396092fd4/image/ife39e4302520f913/version/1653580461/buono-regalo-estetica.png",
  "https://image.jimcdn.com/app/cms/image/transf/dimension=940x10000:format=png/path/s8bc0749396092fd4/image/ife39e4302520f913/version/1653580461/buono-regalo-estetica.png",
  "https://image.jimcdn.com/app/cms/image/transf/dimension=940x10000:format=png/path/s8bc0749396092fd4/image/ife39e4302520f913/version/1653580461/buono-regalo-estetica.png",
  "https://image.jimcdn.com/app/cms/image/transf/dimension=940x10000:format=png/path/s8bc0749396092fd4/image/ife39e4302520f913/version/1653580461/buono-regalo-estetica.png",
];

// Funzione per creare il calendario
function createCalendar() {
  const calendar = document.getElementById("calendar");

  for (let i = 1; i <= 24; i++) {
    const day = document.createElement("div");
    day.classList.add("day");
    day.textContent = i;
    day.addEventListener("click", () => openImage(day, i));
    calendar.appendChild(day);
  }
}

// Funzione per aprire l'immagine come popup
function openImage(dayElement, day) {
  const today = new Date().getDate();

  if (day === today) {
    // Ottieni l'URL dell'immagine corrispondente al giorno
    const imageUrl = imageUrls[day - 1];

    // Mostriamo l'immagine nel popup
    const popupImage = document.getElementById("popupImage");
    popupImage.src = imageUrl;

    // Mostra l'overlay
    const overlay = document.getElementById("overlay");
    overlay.style.display = "flex";

    // Chiudi l'overlay al clic sull'overlay
    overlay.addEventListener("click", () => {
      overlay.style.display = "none";
      // Assegna l'immagine come sfondo della casella
      dayElement.style.backgroundImage = `url(${imageUrl})`;
    });
  } else {
    alert("Questo regalo non può essere aperto oggi!");
  }
}

// Chiama la funzione per creare il calendario quando la pagina è caricata
window.addEventListener("DOMContentLoaded", createCalendar);

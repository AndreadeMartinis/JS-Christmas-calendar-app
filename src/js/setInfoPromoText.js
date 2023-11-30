import { today } from "./app.js";

export function setInfoPromoText(infoPromo, day) {
  infoPromo.textContent = `L'offerta del ${day} dicembre purtroppo è scaduta!`;

  if (day === today)
    infoPromo.innerHTML = `Offerta del giorno! <br> Corri da noi, ti stiamo aspettando!`;

  if (day === today + 1 || today === 30)
    infoPromo.innerHTML = `Questa è l'offerta di domani!<br> Non fartela scappare!`;
}

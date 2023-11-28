import { addOverlay } from "./controlOverlay.js";
import { iconElements } from "./app.js";

export function handleOpenedBox(dayBoxEl, infoPromo, day) {
  dayBoxEl.classList.add("dayBox-open");
  dayBoxEl.classList.remove("dayBox-today-animation");

  const openBoxOverlay = addOverlay(dayBoxEl, "dayBox-overlay-openbox");
  const dayInTheCorner = document.createElement("p");
  const icon = document.createElement("icon");

  dayBoxEl.textContent = "";
  infoPromo.textContent = "";

  dayInTheCorner.textContent = day;
  openBoxOverlay.appendChild(dayInTheCorner);

  icon.classList.add("fa-solid", iconElements[day - 1]);
  dayBoxEl.appendChild(icon);
}

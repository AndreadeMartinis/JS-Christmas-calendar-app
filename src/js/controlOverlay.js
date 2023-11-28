export const addOverlay = function (el, overlayClass) {
  const overlay = document.createElement("span");
  overlay.classList.add(overlayClass);
  el.appendChild(overlay);
  return overlay;
};
export const addBoxMessage = function (firstMessage, secondMessage, overlay) {
  const firstMessageP = document.createElement("p");
  firstMessageP.textContent = firstMessage;
  overlay.appendChild(firstMessageP);
  const secondMessageP = document.createElement("p");
  secondMessageP.textContent = secondMessage;
  overlay.appendChild(secondMessageP);
};

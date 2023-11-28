export function showFutureOfferMessage(dayBoxEl) {
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

export function openInfoPopup() {
  const popupImage = document.querySelector(".popupImage");
  const overlayPopup = document.querySelector(".overlay-popup");

  popupImage.src = "src/img/infoPromo.jpg";
  popupImage.alt = "Info Evento";
  overlayPopup.style.display = "flex";

  overlayPopup.addEventListener("click", () => {
    overlayPopup.style.display = "none";
  });
}

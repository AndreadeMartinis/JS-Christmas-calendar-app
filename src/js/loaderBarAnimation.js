export const loaderBarAnimation = function () {
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
};

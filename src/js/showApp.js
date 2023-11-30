export function showApp() {
  const main = document.querySelector("main");
  const footer = document.querySelector("footer");
  const header = document.querySelector("header");

  main.style.display = "flex";
  footer.style.display = "flex";
  header.style.display = "block";
}

export function writeTodayMessage(today) {
  const countdownEl = document.querySelector(".countdown");
  const todayEl = document.querySelector(".today");
  const monthEl = document.querySelector(".month");
  //prettier-ignore
  countdownEl.textContent = `-${25 - today} a Natale!`;
  todayEl.textContent = today;
  if (today === 30) {
    monthEl.textContent = "NOV";
    countdownEl.textContent = `-26 a Natale!`;
  }
}

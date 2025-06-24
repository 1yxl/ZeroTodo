import { timeh1 } from "./elements.js";

export const initTime = () => {
  setInterval(() => {
    const now = new Date();
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    const time = `${hours}:${minutes}`;
    timeh1.innerText = time;
  }, 1000);
};

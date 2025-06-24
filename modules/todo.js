import { getTodoData, storeTodoData } from "./storage.js";
import { renderUI } from "./ui.js";

export const filterActive = () => {
  todos.innerHTML = "";
  const data = getTodoData("todo").filter((el) => !el.done);
  if (data) {
    data.forEach((el) => {
      renderUI(el);
    });
  }
};
export const filterCompleted = () => {
  todos.innerHTML = "";
  const data = getTodoData("todo").filter((el) => el.done);
  if (data) {
    data.forEach((el) => {
      renderUI(el);
    });
  }
};

import { getTodoData, storeTodoData } from "./modules/storage.js";
import { loadUIData, Todo } from "./modules/ui.js";
import {
  addBtn,
  clearBtn,
  inputTitle,
  todos,
  activeBtn,
  completeBtn,
  allBtn,
} from "./modules/elements.js";
import { filterActive, filterCompleted } from "./modules/todo.js";
import { initTime } from "./modules/time.js";

const addToUI = () => {
  const tit = inputTitle.value.trim();

  if (tit) {
    const newTodo = new Todo(tit);
    inputTitle.value = "";
  }
};

inputTitle.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addToUI();
    inputTitle.value = "";
  }
});
addBtn.addEventListener("click", addToUI);

window.addEventListener("load", loadUIData);

clearBtn.addEventListener("click", () => {
  localStorage.clear();
  loadUIData();
});

console.log(activeBtn);
activeBtn.addEventListener("click", filterActive);
completeBtn.addEventListener("click", filterCompleted);
allBtn.addEventListener("click", loadUIData);

initTime();

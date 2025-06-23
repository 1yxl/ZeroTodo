const addBtn = document.querySelector("#addBtn");
const clearBtn = document.querySelector("#clearBtn");
const inputTitle = document.querySelector("#inpt");
const todos = document.querySelector(".todos");
const activeBtn = document.querySelector("#activeBtn");
const completeBtn = document.querySelector("#completeBtn");
const allBtn = document.querySelector("#allBtn");

const getTodoData = (item) => JSON.parse(localStorage.getItem(item) || "[]");
const storeTodoData = (name, item) => {
  localStorage.setItem(name, JSON.stringify(item));
};

function changeState(e) {
  const isChecked = e.target.checked;
  e.target.parentElement.classList.toggle("done", isChecked);
  const data = getTodoData("todo");
  const newData = data.map((el) => {
    if (el.title === e.target.nextSibling.innerText) {
      el.done = isChecked;
      return el;
    }
    return el;
  });
  storeTodoData("todo", newData);
}

const createUIElem = (title, done) => {
  const todoContainer = document.createElement("div");
  todoContainer.classList.add("todo-item");
  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  const titl = document.createElement("h2");
  const delBtn = document.createElement("button");
  delBtn.classList.add("fas", "fa-trash", "delete-btn");
  return [todoContainer, checkbox, titl, delBtn];
};

const manageInteraction = (titl, checkbox, delBtn) => {
  checkbox.addEventListener("change", changeState);

  titl.addEventListener("dblclick", function (e) {
    const inp = document.createElement("input");
    inp.type = "text";
    const oldTitle = e.target.innerText;
    inp.value = oldTitle;

    e.target.replaceWith(inp);
    inp.focus();

    const saveEdit = (e) => {
      titl.innerText = e.target.value;
      inp.replaceWith(titl);

      const oldData = getTodoData("todo");
      const newData = oldData.map((el) => {
        if (el.title === oldTitle) {
          el.title = inp.value;
          return el;
        }
        return el;
      });

      storeTodoData("todo", newData);
    };

    inp.addEventListener("change", saveEdit);
  });

  delBtn.addEventListener("click", function (e) {
    const match = Number(e.target.parentElement.dataset.id);
    e.target.parentElement.remove();

    const oldData = getTodoData("todo");
    const newData = oldData.filter((el) => {
      return el.id !== match;
    });
    storeTodoData("todo", newData);
  });
};

const renderUI = ({ title, done, id }) => {
  const [todoContainer, checkbox, titl, delBtn] = createUIElem();
  todoContainer.dataset.id = id;
  titl.innerText = title;

  checkbox.checked = done;
  if (checkbox.checked) {
    todoContainer.classList.add("done");
  }

  manageInteraction(titl, checkbox, delBtn);

  todoContainer.append(checkbox, titl, delBtn);
  todos.prepend(todoContainer);
};

function loadUIData() {
  todos.innerHTML = "";
  const data = getTodoData("todo");
  if (data) {
    data.forEach((el) => {
      renderUI(el);
    });
  }
}

class Todo {
  constructor(title, done = false) {
    this.title = title;
    this.done = done;
    this.id = this.getNextID();
    this.storeTodo();
    this.appendTodo();
  }

  appendTodo() {
    const [todoContainer, checkbox, titl, delBtn] = createUIElem();

    todoContainer.dataset.id = this.id;

    titl.innerText = this.title;

    checkbox.addEventListener("change", changeState);

    manageInteraction(titl, checkbox, delBtn);

    todoContainer.append(checkbox, titl, delBtn);
    todos.prepend(todoContainer);
  }

  storeTodo() {
    const todoData = {
      id: this.id,
      title: this.title,
      done: this.done,
    };

    const data = getTodoData("todo");
    data.push(todoData);
    storeTodoData("todo", data);
  }

  getNextID() {
    const oldId = parseInt(localStorage.getItem("lastId") || "0", 10);
    const newId = oldId + 1;
    localStorage.setItem("lastId", newId);
    console.log(newId);

    return newId;
  }
}

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

const filterActive = () => {
  todos.innerHTML = "";
  const data = getTodoData("todo").filter((el) => !el.done);
  if (data) {
    data.forEach((el) => {
      renderUI(el);
    });
  }
};
const filterCompleted = () => {
  todos.innerHTML = "";
  const data = getTodoData("todo").filter((el) => el.done);
  if (data) {
    data.forEach((el) => {
      renderUI(el);
    });
  }
};

activeBtn.addEventListener("click", filterActive);
completeBtn.addEventListener("click", filterCompleted);
allBtn.addEventListener("click", loadUIData);

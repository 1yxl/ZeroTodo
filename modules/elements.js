const $ = (q) => document.querySelector(q);

const addBtn = $("#addBtn");
const clearBtn = $("#clearBtn");
const inputTitle = $("#inpt");
const todos = $(".todos");
const activeBtn = $("#activeBtn");
const completeBtn = $("#completeBtn");
const allBtn = $("#allBtn");
const timeh1 = $(".current-time");

export {
  addBtn,
  clearBtn,
  inputTitle,
  todos,
  activeBtn,
  completeBtn,
  allBtn,
  timeh1,
};

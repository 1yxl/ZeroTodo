const $ = (q) => document.querySelector(q);

const addBtn = $("#addBtn");
const clearBtn = $("#clearBtn");
const inputTitle = $("#inpt");
const todos = $(".todos");
const activeBtn = $("#activeBtn");
const completeBtn = $("#completeBtn");
const allBtn = $("#allBtn");

export { addBtn, clearBtn, inputTitle, todos, activeBtn, completeBtn, allBtn };

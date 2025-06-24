export const getTodoData = (item) =>
  JSON.parse(localStorage.getItem(item) || "[]");
export const storeTodoData = (name, item) => {
  localStorage.setItem(name, JSON.stringify(item));
};

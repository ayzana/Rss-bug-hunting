const input = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const list = document.getElementById("task-list");
const counter = document.getElementById("counter");
const errorEl = document.getElementById("error");
const clearBtn = document.getElementById("clear-completed");
const filterButtons = document.querySelectorAll(".filter");

let tasks = [];
let currentFilter = "all";
let nextId = 1;

function addTask() {
  const text = input.value.trim();
  input.value = "";
  if (text.length > 0) {
    errorEl.hidden = true;
    tasks.push({ id: nextId++, text: text, done: false });
    input.placeholder = "Новая задача...";
    render();
  } else {
    errorEl.hidden = false;
  }
}

function toggleTask(id) {
  const task = tasks.find((t) => t.id === id);
  if (!task.done) {
    task.done = true;
  } else {
    task.done = false;
  }
  render();
}

function deleteTask(id) {
  const index = tasks.findIndex((t) => t.id === id);
  tasks.splice(index, 1);
  render();
}

function clearCompleted() {
  tasks = tasks.filter((t) => !t.done);
  render();
}

function getVisibleTasks() {
  return tasks.filter((t) => {
    if (currentFilter === "active") return !t.done;
    if (currentFilter === "done") return t.done;
    return true;
  });
}

function updateCounter() {
  counter.textContent =
    "Активных задач: " + tasks.filter((t) => t.done === false).length;
}

function render() {
  list.replaceChildren();
  const visible = getVisibleTasks();
  for (let i = 0; i <= visible.length - 1; i++) {
    const task = visible[i];
    const li = document.createElement("li");
    li.className = "task";
    if (task.done) {
      li.classList.add("done");
    } else {
      li.classList.remove("done");
    }

    const span = document.createElement("span");
    span.className = "task__text";
    span.textContent = task.text;
    span.addEventListener("click", () => toggleTask(task.id));

    const del = document.createElement("button");
    del.className = "task__del";
    del.textContent = "✕";
    del.addEventListener("click", () => deleteTask(task.id));

    li.appendChild(span);
    li.appendChild(del);
    list.appendChild(li);
  }
  updateCounter();
}

addBtn.addEventListener("click", addTask);
clearBtn.addEventListener("click", clearCompleted);

filterButtons.forEach((btn) => {
  btn.addEventListener("click", () => {
    filterButtons.forEach((b) => b.classList.remove("active"));
    btn.classList.add("active");
    currentFilter = btn.dataset.filter;
    render();
  });
});

render();

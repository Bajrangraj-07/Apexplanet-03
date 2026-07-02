const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const emptyMsg = document.getElementById("empty-msg");
const taskCount = document.getElementById("task-count");
const clearBtn = document.getElementById("clear-btn");

// localStorage se purane tasks nikal lo, agar kuch nahi hai to empty array
let tasks = JSON.parse(localStorage.getItem("myTasks")) || [];

function saveTasks() {
  localStorage.setItem("myTasks", JSON.stringify(tasks));
}

function renderTasks() {
  taskList.innerHTML = "";

  if (tasks.length === 0) {
    emptyMsg.style.display = "block";
  } else {
    emptyMsg.style.display = "none";
  }

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    li.classList.add("task-item");
    if (task.completed) {
      li.classList.add("completed");
    }

    const leftDiv = document.createElement("div");
    leftDiv.classList.add("task-left");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.checked = task.completed;
    checkbox.addEventListener("change", () => toggleComplete(index));

    const span = document.createElement("span");
    span.textContent = task.text;

    leftDiv.appendChild(checkbox);
    leftDiv.appendChild(span);

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "✕";
    deleteBtn.classList.add("delete-btn");
    deleteBtn.addEventListener("click", () => deleteTask(index));

    li.appendChild(leftDiv);
    li.appendChild(deleteBtn);
    taskList.appendChild(li);
  });

  const pending = tasks.filter((t) => !t.completed).length;
  taskCount.textContent = pending + " task" + (pending !== 1 ? "s" : "") + " left";
}

function addTask() {
  const text = taskInput.value.trim();

  if (text === "") {
    return;
  }

  tasks.push({ text: text, completed: false });
  taskInput.value = "";
  saveTasks();
  renderTasks();
}

function toggleComplete(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

addBtn.addEventListener("click", addTask);

// enter dabane pe bhi add ho jaye
taskInput.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    addTask();
  }
});

clearBtn.addEventListener("click", () => {
  tasks = tasks.filter((t) => !t.completed);
  saveTasks();
  renderTasks();
});

// page load hote hi purane tasks dikha do
renderTasks();

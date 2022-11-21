const form = document.querySelector("#form");
const taskInput = document.querySelector("#taskInput");
const tasksList = document.querySelector("#tasksList");
const emptyList = document.querySelector("#emptyList");

let tasks = [];

if (localStorage.getItem("tasks")) {
  tasks = JSON.parse(localStorage.getItem("tasks"));
  console.log(tasks);
}

tasks.forEach(function (task) {
  render(task);
});

form.addEventListener("submit", addTask);
tasksList.addEventListener("click", deleteTask);
tasksList.addEventListener("click", doneTask);

function addTask(e) {
  e.preventDefault();

  let taskText = taskInput.value;

  let newTask = {
    id: Date.now(),
    text: taskText,
    done: false,
  };

  tasks.push(newTask);

  render(newTask);

  taskInput.value = "";
  taskInput.focus();

  if (tasksList.children.length > 1) {
    emptyList.classList.add("none");
  }

  saveToLS();
}

function deleteTask(e) {
  if (e.target.dataset.action === "delete") {
    console.log("delete");
    let delTask = e.target.closest("li");

    let id = delTask.id;

    let index = tasks.findIndex(function (task) {
      if (task.id == id) {
        return true;
      }
    });

    tasks.splice(index, 1);

    saveToLS();

    delTask.remove();
  }

  if (tasksList.children.length === 1) {
    emptyList.classList.remove("none");
  }
}
function doneTask(e) {
  if (e.target.dataset.action === "done") {
    let doneT = e.target.closest("li");
    let taskTitle = doneT.querySelector(".task-title");
    taskTitle.classList.toggle("task-title--done");
  }
  saveToLS();
}

function saveToLS() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

function render(task) {
  let cssClass = task.done ? "task-title task-title--done" : "task-title";

  let taskHTML = `<li id="${task.id}" class="list-group-item d-flex justify-content-between task-item"> 
  <span class="${cssClass}">${task.text}</span> 
  <div class="task-item__buttons"> 
  <button type="button" data-action="done" class="btn-action"> 
  <img src="./images/icons8-галочка-24.png" alt="Done" width="22" height="22" /  
  </button> 
  <button type="button" data-action="delete" class="btn-action"> 
  <img src="./images/icons8-удалить-навсегда-30.png" alt="Done" width="18" height="18" /> 
</button> 
<button type="button" data-action="delete" class="btn-action"> 
<img 
  src="./images/icons8-edit-24.png" 
  alt="Done" 
  width="18" 
  height="18" 
/> 
</button> 
  </div> 
</li>`;

  tasksList.insertAdjacentHTML("beforeend", taskHTML);
}

const form = document.getElementById("form");
const input = document.getElementById("inputTask");
const filter = document.getElementById("filter");
const taskList = document.getElementById("taskList");
const clear = document.getElementById("clearTask");

form.addEventListener("submit", addTask);

function addTask(e) {
  e.preventDefault();
  if (input.value == "") {
    alert("Please enter your tasks");
  } else {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(input.value + " "));
    taskList.appendChild(li);
    const link = document.createElement("a");
    link.setAttribute("href", "#");
    link.innerHTML = "x";
    li.appendChild(link);
    storeItemLocalStorage(input.value);
    input.value = "";
  }
}

taskList.addEventListener("click", removeTask);

function removeTask(e) {
  if (e.target.hasAttribute("href")) {
    if (confirm("Are you sure you?")) {
      let ele = e.target.parentElement;
      ele.remove();
      removeFromLs(ele);
    }
  }
}

clear.addEventListener("click", clearTask);

function clearTask(e) {
  while (taskList.firstChild) {
    taskList.removeChild(taskList.firstChild);
  }
  localStorage.clear();
}

filter.addEventListener("keyup", filterTask);

function filterTask(e) {
  let text = e.target.value.toLowerCase();
  document.querySelectorAll("li").forEach((element) => {
    let item = element.firstChild.textContent;
    if (item.toLowerCase().indexOf(text) == -1) {
      element.style.display = "none";
    } else {
      element.style.display = "block";
    }
  });
}

function storeItemLocalStorage(myValue) {
  let tasks = [];
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  tasks.push(myValue);
  localStorage.setItem("tasks", JSON.stringify(tasks));
}

document.addEventListener("DOMContentLoaded", addTasksFromLs);

function addTasksFromLs(e) {
  let tasks = [];
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }

  tasks.forEach((task) => {
    const li = document.createElement("li");
    li.appendChild(document.createTextNode(task + " "));
    taskList.appendChild(li);
    const link = document.createElement("a");
    link.setAttribute("href", "#");
    link.innerHTML = "x";
    li.appendChild(link);
  });
}

function removeFromLs(e) {
  let tasks = [];
  if (localStorage.getItem("tasks") === null) {
    tasks = [];
  } else {
    tasks = JSON.parse(localStorage.getItem("tasks"));
  }
  let li = e;
  li.removeChild(li.lastChild);
  tasks.forEach((taskValue, index) => {
    if(li.textContent.trim() === taskValue){
      tasks.splice(index, 1);
    }
  });
  localStorage.setItem("tasks", JSON.stringify(tasks))
}

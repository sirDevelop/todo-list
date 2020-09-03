const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filterOption = document.querySelector(".filter-todo");

todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filterOption.addEventListener("click", filterTodo);
getTodosFromLocalStorage();

function deleteCheck(e) {
  //Click on Trash Icon
  const item = e.target;
  const todo = item.parentElement;
  const description = todo.children[0].innerText;

  if (item.classList[0] === "trash-btn") {
    // Animation
    todo.classList.add("fall");

    // Remove once animation finishes
    todo.addEventListener("transitionend", function () {
      todo.remove();
      removeTodosFromLocalStorage(description);
    });
  }

  // Click on CHECK MARK
  if (item.classList[0] === "complete-btn") {
    const todo = item.parentElement;
    todo.classList.toggle("completed");
    completed = todo.classList.contains("completed");
    saveTodosToLocalStorage(todo.innerText, completed);
  }
}

function createTodoFromValue(description, completed) {
  const todoDiv = document.createElement("div");
  todoDiv.classList.add("todo");

  const newTodo = document.createElement("li");
  newTodo.innerText = description;
  newTodo.classList.add("todo-item");

  todoDiv.appendChild(newTodo);
  if (completed) {
    // for those todos loaded from localStorage that are already completed
    todoDiv.classList.add("completed");
  }

  //CHECK MARK BUTTON
  const completedButton = document.createElement("button");
  completedButton.innerHTML = '<i class="fas fa-check"> </i>';
  completedButton.classList.add("complete-btn");
  todoDiv.appendChild(completedButton);

  //TRASH BUTTON
  const trashButton = document.createElement("button");
  trashButton.innerHTML = '<i class="fas fa-trash"> </i>';
  trashButton.classList.add("trash-btn");
  todoDiv.appendChild(trashButton);

  return todoDiv;
}

function addTodo(e) {
  //prevent form from submitting
  e.preventDefault();

  //ADD TODO TO LOCAL STORAGE
  console.log("add to localStorage", todoInput.value);
  saveTodosToLocalStorage(todoInput.value, false);

  todoDiv = createTodoFromValue(todoInput.value);
  todoList.appendChild(todoDiv);

  //RESET THE INPUT AND REFOCUS IT
  todoInput.value = "";
  document.querySelector(".todo-input").focus();
}

function filterTodo(e) {
  const todos = todoList.childNodes;

  todos.forEach(function (todo) {
    switch (e.target.value) {
      case "all":
        todo.style.display = "flex";
        break;
      case "completed":
        if (todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
      case "uncompleted":
        if (!todo.classList.contains("completed")) {
          todo.style.display = "flex";
        } else {
          todo.style.display = "none";
        }
        break;
    }
  });
}

function saveTodosToLocalStorage(todo, completed) {
  //CHECK IF ALREADY EXISTS IN LOCAL STORAGE
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = {};
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  todos[todo] = completed;
  localStorage.setItem("todos", JSON.stringify(todos));
}

function getTodosFromLocalStorage() {
  let todos;

  if (localStorage.getItem("todos") === null) {
    todos = {};
  } else {
    todos = JSON.parse(localStorage.getItem("todos"));
  }

  for (let description in todos) {
    let completed = todos[description];
    todoDiv = createTodoFromValue(description, completed);
    todoList.appendChild(todoDiv);
  }
}

function removeTodosFromLocalStorage(todo) {
  let todos;

  if (localStorage.getItem("todos") !== null) {
    todos = JSON.parse(localStorage.getItem("todos"));

    delete todos[todo];
    localStorage.setItem("todos", JSON.stringify(todos));
  }
}

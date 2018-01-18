//TODO APP
document.addEventListener("DOMContentLoaded", function() {

  let state = [];

  // select elements from the DOM
  var todoList = document.getElementById("todoList");
  var addTodoButt = document.getElementById("addTodoButt");
  var todoVal = document.getElementById("todoVal");

  // add event handler to button
  addTodoButt.addEventListener("click", addTodo);

  function addTodo(ev) {
    var todo = {};
    todo.id = uuidv1();
    todo.value = todoVal.value;
    todo.status = 'pending';
    state = [
      ...state,
      todo
    ];

    var deleteButtText = document.createTextNode("Delete");
    var deleteButt = document.createElement("button");
    deleteButt.appendChild(deleteButtText);
    deleteButt.addEventListener('click', removeTodo)

    var todoText = document.createTextNode(todoVal.value);
    var todoListItem = document.createElement("li");
    todoListItem.setAttribute('id', todo.id);
    todoListItem.appendChild(todoText);
    todoListItem.appendChild(deleteButt);
    todoList.appendChild(todoListItem);
    todoVal.value = "";

    console.table(state);
  }


  function removeTodo(ev) {
    var id = ev.target.parentNode.getAttribute('id')
    state = state.filter(function(el, i) {
      return id !== el.id;
    });

    ev.target.parentNode.remove();
    console.table(state);
  }
});

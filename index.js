var yo = require('yo-yo')
const uuidv1 = require('uuid/v1');

var tasks = [];
var pendingTasks = [];
var doneTasks = [];
var states = {
    pending: "PENDING",
    done: "DONE"
}
var todoInput = 'todoInput';
var markUp = render(pendingTasks, doneTasks, addToDo);

function render(pending, done, addToDo) {
    return yo`<div>
    <main role="main">
        <h1>Things ToDo:</h1>
        <div class="ctas">
          <input type="text" id=${'todoInput'}>
          <button onclick=${addToDo} class="button-secondary pure-button">Add Todo</button>
        </div>
        <ul>
            ${fillPendingList(pending)}
        </ul>
        <h1>Done:</h1>
        <ul>
            ${fillDoneList(done)}
        </ul>
    </main>`
}

function fillPendingList(items) {
    return yo`${items.map(function (item, index) {
            return yo`<li>${item.value}
                        <input type="checkbox" onclick=${
                            function() {
                                updateList (item, states.done)
                            }
                        }>Done</button>
                      </li>`
        document.getElementById('todoInput').value = "";
    })}`
}

function fillDoneList(items) {
    return yo`${items.map(function (item, index) {
            return yo`<li>${item.value}
                        <button onclick=${
                            function() {
                                updateList (item, states.pending)
                            }
                        }>Pending</button>
                    </li>`
        document.getElementById('todoInput').value = "";
    })}`
}

function addToDo () {
  let task = {
      id: uuidv1(),
      value: document.getElementById('todoInput').value,
      state: states.pending
  }

  pendingTasks.push(task);
  tasks.push(task);
  
  var newList = render(pendingTasks, doneTasks, addToDo)
  yo.update(markUp, newList)
}

function updateList (item, state) {
    item.state=state

    if (state === states.pending){
        pendingTasks.push(item);
        doneTasks = doneTasks.filter(function(el) {
            return el.state !== states.pending;
        });
    } else {
        doneTasks.push(item);
        pendingTasks = pendingTasks.filter(function(el) {
            return el.state !== states.done;
        });
    }
    
    var newList = render(pendingTasks, doneTasks, addToDo)
    yo.update(markUp, newList)
}

document.body.appendChild(markUp)
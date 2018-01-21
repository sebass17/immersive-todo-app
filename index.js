// Main entry file for the Konrad Group entry tes

// import external modules
import html from 'yo-yo'
import EventEmitter from 'events'

// import app modules
// here we import the main reducer, the reducer, like in Redux
// is the only place we modify the app's state
import reducer from './reducer'

// we create an instance of EventEmitter to emit and
// listen to events
const bus = new EventEmitter
// we listen to events with the 'on' method, so everytime
// the 'update' event is fired via 'emit', the next line
// will call the update function
bus.on('update', update)

// we define the state object, this will hold all the app's state
// if you need to add state, this is the place to do it
const taskStates = {
    pending: "PENDING",
    done: "DONE"
}

const state = {
  pendingList: [],
  doneList: []
}

// we call the reducer function, imported above, and send it
// the bus and state created here as arguments
reducer(bus, state)

// create root element to mount app
const root = document.body.appendChild(document.createElement('div'))
const todoInput = 'todoInput'

// update method, renders the HTML template string
// using the html method provided by the yo-yo module
// IMPORTANT: note that yo-yo html method is used
// as a ES6 tagged template string
function update() {
  html.update(root,
    html`
    <div>
        <main role="main">
            <h1>Things ToDo:</h1>
            <div class="ctas">
            <input type="text" id=${todoInput}>
            <button onclick=${addTodoItem} class="button-secondary pure-button">Add Todo</button>
            </div>
            <ul>
            ${
                createList (taskStates.pending)
            }
            </ul>
            <h1>Done:</h1>
            <ul>
            ${
                createList (taskStates.done)
            }
            </ul>
        </main>
    </div>
    `)
}

function createList (type) {
    if (type === taskStates.pending) {
        return state.pendingList.map(task => 
            html`<li> ${task.value}
                    <input type="checkbox" onclick=${function() { updateList (task, taskStates.done) }}>
                </li>`);
    } else {
        return state.doneList.map(task => 
            html`<li> ${task.value}
                    <button onclick=${function() { updateList (task, taskStates.pending) }}>Pending</button>
                </li>`)
    }
}

// calls update for the fist time to render the UI when the app loads
update()

// this is the example function that emits an event
// to increment the state of the counter, use this as an example
// to make your code
function addTodoItem() {
    let taskValue = document.getElementById(todoInput).value;
    document.getElementById(todoInput).value = "";
    
    bus.emit('addTodoItem', taskValue)
}

function updateList (item, taskState) {
    item.state = taskState

    if (taskState === taskStates.pending){
        state.pendingList.push(item);
        state.doneList = state.doneList.filter(function(task) {
            return task.state !== taskStates.pending;
        });
    } else {
        state.doneList.push(item);
        state.pendingList = state.pendingList.filter(function(task) {
            return task.state !== taskStates.done;
        });
    }
    
    update();
}

export default taskStates
// this is the main reducer of the app
// it's job is to update the state
// this is the single source of truth for the state
import taskStates from './index'
import uuidv1 from './node_modules/uuid/v1'

function reducer(bus, state) {

    bus.on('addTodoItem', function(taskValue) {
        let task = {
            id: uuidv1(),
            value: taskValue,
            state: taskStates.pending
        }

        state.pendingList.push(task);
        bus.emit('update')
    })
  
  }
  
  export default reducer
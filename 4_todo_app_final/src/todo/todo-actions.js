import Reflux from 'reflux';
import Http from '../util/http';
import {asyncAction} from '../util/action-utils';


const todoActions = Reflux.createActions({
    'load': asyncAction(),            // load the todos list
    'add': asyncAction(),             // add todo
    'remove': asyncAction(),          // remove
    'edit': asyncAction(),            // edit todo
    'toggleCompleted': asyncAction(), // toggle todo completed
    'changeFilter': {}                // show all / incomplete todos
});



export const todoActionCreator = {

    load(todolistId) {
        Http.get(todoActions.load, `todolists/${todolistId}?_embed=todos`);
    },

    addTodo(todoListId, todoText) {
        Http.post(todoActions.add, 'todos', {
            todolistId: todoListId,
            text: todoText,
            completed: false
        })
    },

    changeFilter(filter) {
        todoActions.changeFilter(filter);
    },

    toggleCompleted(todoItem) {
        Http.put(todoActions.toggleCompleted, 'todos/' + todoItem.id, {...todoItem, completed: !todoItem.completed})
    },

    remove(todoItemId) {
        Http.delete(todoActions.remove, 'todos/' + todoItemId, todoItemId);
    }
};

export default todoActions;
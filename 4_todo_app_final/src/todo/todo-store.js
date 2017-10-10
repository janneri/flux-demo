import Reflux from 'reflux';
import actions from './todo-actions';

export default class TodoStore extends Reflux.Store {

    constructor() {
        super();
        // set the default state
        this.state = {
            todolist: {
                id: 1,
                todos: [],
                name: '',
                filter: 'all'
            },
        };
        this.listenables = actions;
    }

    onLoadCompleted(todolist) {
        this.setState({todolist});
    }

    // filter incomplete / all items
    onChangeFilter(filter)  {
        this.setState({
            todolist: {...this.state.todolist, filter}
        });
    }

    onToggleCompletedCompleted(todoItem) {
        let newTodos = this.state.todolist.todos.map(item => {
            if (item.id === todoItem.id) {
                return {...item, completed: !item.completed}
            }
            return item;
        });

        this.setState({
            todolist: {...this.state.todolist, todos: newTodos}
        });
    }

    // pessimistic updates handle only the completed action
    onRemoveCompleted(response, todoItemId) {
        let newTodos = this.state.todolist.todos.filter(todoItem => todoItem.id !== todoItemId);
        this.setState({
            todolist: {...this.state.todolist, todos: newTodos}
        });
    }


    draftTodoId = 0; // the real id will be generated in the backend
    onAddStarted(todo) {
        // Update optimistically with a temporary id.
        // A pessimistic update would be a lot easier..
        let newTodo = {...todo, id: --this.draftTodoId, isDraft: true};
        this.setState({
            todolist: {...this.state.todolist, todos: [...this.state.todolist.todos, newTodo]}
        });
    }

    onAddCompleted(response, todo) {
        // Capture the generated id from backend.
        // Without generated ids, this implementation would be a noop.
        let newTodos = this.state.todolist.todos.map(item => {
            if (item.isDraft && item.text === todo.text) {
                return {...item, id: response.id, isDraft: false}
            }
            return item;
        });

        this.setState({
            todolist: {...this.state.todolist, todos: newTodos}
        });

    }

    onAddFailed(data) {
        // You need to write rollbacks, if you're doing optimistic updates.
        let newTodos = this.state.todolist.todos.filter(item => item.id !== data.id);
        
        this.setState({
            todolist: {...this.state.todolist, todos: newTodos}
        });
    }

}
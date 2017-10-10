import React, { Component } from 'react';
import Reflux from 'reflux';
import Http from './util/http';

import TodoPage from './todo/TodoPage';


function asyncAction() {
    return {children: ['started', 'completed', 'failed']}
}

const TodoActions = Reflux.createActions({
    'load': asyncAction(),            // load the todos list
    'add': asyncAction(),             // add todo
    'remove': asyncAction(),          // remove
    'edit': asyncAction(),            // edit todo
    'toggleCompleted': asyncAction(), // toggle todo completed
    'changeFilter': {}                // show all / incomplete todos
});

// A typical flux action is an plain js object with type, such as {type: 'ADD_TODO', ..}

// In Reflux action is a function, so now we could call
// TodoActions.load.started() or TodoActions.load.started(somePayload);


let TodoActionCreator = {

    load(todolistId) {
        Http.get(TodoActions.load, `todolists/${todolistId}?_embed=todos`);
    },

    addTodo(todoText) {
        Http.post(TodoActions.add, 'todos', {todolistId: 1, text: todoText, completed: false})
    },

    changeFilter(filter) {
        TodoActions.changeFilter(filter);
    },

    toggleCompleted(todoItem) {
        Http.put(TodoActions.toggleCompleted, 'todos/' + todoItem.id, {...todoItem, completed: !todoItem.completed})
    },

    remove(todoItemId) {
        Http.delete(TodoActions.remove, 'todos/' + todoItemId, todoItemId);
    }
};

class TodoStore extends Reflux.Store {

    constructor() {
        super();
        // set the default state
        this.state = {
            todolist: {
                id: 1,
                todos: [],
                name: '',
                filter: 'all'
            }
        };
        this.listenables = TodoActions;
    }

    onLoadCompleted(data) {
        console.log("load completed", data);
        this.setState({todolist: data});
    }

    DRAFT_ITEM_ID = -1;

    onAddStarted(todo) {
        console.log("onAddStarted", todo);
        let newTodo = {...todo, id: this.DRAFT_ITEM_ID}
        this.setState({
            todolist: {...this.state.todolist, todos: [...this.state.todolist.todos, newTodo]}
        });
    }

    onAddCompleted(response, todo) {
        console.log("onAddCompleted", response, todo);
        let newTodos = this.state.todolist.todos.map(item => {
            if (item.id === this.DRAFT_ITEM_ID) {
                return {...item, id: response.id}
            }
            return item;
        });

        this.setState({
            todolist: {...this.state.todolist, todos: newTodos}
        });

    }

    onAddFailed(data) {
        console.log("onAddFailed");
    }

    onChangeFilter(filter)  {
        this.setState({
            todolist: {...this.state.todolist, filter}
        });
    }

    toggleCompletedStarted(todoItem) {
        console.log("onToggleCompletedStarted", todoItem)
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

    onRemoveStarted(todoItemId) {
        console.log("onRemoveStarted", todoItemId)
        let newTodos = this.state.todolist.todos.filter(todoItem => todoItem.id !== todoItemId);
        this.setState({
            todolist: {...this.state.todolist, todos: newTodos}
        });
    }
}


export default class App extends Reflux.Component {

    componentDidMount() {
        // take this from url
        TodoActionCreator.load(1);
    }

    constructor(props) {
        super(props);
        this.store = TodoStore; // <- just assign the store class itself
    }

    render() {
        return (
            <TodoPage
                todolist={this.state.todolist}
                callbacks={TodoActionCreator}
            />
        )
    };
}



import React from 'react';
import Reflux from 'reflux';

import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import TodoFilters from './TodoFilters';
import {todoActionCreator} from '../todo-actions';
import TodoStore from '../todo-store';
import {LoadingStore} from '../../common/LoadingIndicator';


function TodoPage({isSaving, todolist: {id, name, todos, filter}, callbacks}) {
    let filteredTodos = filter === 'todo' ? todos.filter(todo => !todo.completed) : todos;

    return (
        <div>
            <div>
                {name}
            </div>

            <TodoInput
                isReadOnly={isSaving}
                addTodo={todoText => callbacks.addTodo(id, todoText)}
            />

            {
                filteredTodos.map(todo => (
                    <TodoItem
                        isReadOnly={isSaving}
                        key={todo.id}
                        todo={todo}
                        toggleCompleted={callbacks.toggleCompleted}
                        remove={callbacks.remove}
                    />
                ))
            }

            <TodoFilters
                filter={filter}
                changeFilter={callbacks.changeFilter}
            />

            <div>
                Showing {filteredTodos.length} of {todos.length} items.
            </div>
        </div>
    )
}


export default class TodoPageConnected extends Reflux.Component {

    componentDidMount() {
        // router gives the match object as a prop
        let listId = this.props.match.params.listId;
        todoActionCreator.load(listId);
    }

    constructor(props) {
        super(props);
        // will connect and sync this component's state with the store state
        this.stores = [LoadingStore, TodoStore];
    }

    render() {
        return (
            <TodoPage
                isSaving={this.state.saveCount > 0}
                todolist={this.state.todolist}
                callbacks={todoActionCreator}
            />
        )
    };
}



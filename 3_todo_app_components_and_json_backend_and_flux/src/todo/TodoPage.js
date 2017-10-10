import React from 'react';

import TodoInput from './TodoInput';
import TodoItem from './TodoItem';
import TodoFilters from './TodoFilters';


export default function TodoPage({todolist: {name, todos, filter}, callbacks}) {
    let filteredTodos = filter === 'todo' ? todos.filter(todo => !todo.completed) : todos;

    return (
        <div>
            <div>
                {name}
            </div>

            <TodoInput addTodo={callbacks.addTodo} />

            {
                filteredTodos.map(todo => (
                    <TodoItem
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
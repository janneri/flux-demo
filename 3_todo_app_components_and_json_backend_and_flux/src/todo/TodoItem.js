import React from 'react';

function TodoItem({todo, toggleCompleted, remove}) {
    return (
        <div>
            <span
                style={{textDecoration: todo.completed ? 'line-through': 'none'}}
                onClick={e => toggleCompleted(todo)}
            >
                {todo.text}
            </span>
            <button
                style={{color: 'red'}}
                onClick={e => remove(todo.id)}
            >
                x
            </button>
        </div>
    )
}

export default TodoItem;
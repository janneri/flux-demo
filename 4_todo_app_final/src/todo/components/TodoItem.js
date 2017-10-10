import React from 'react';

function TodoItem({isReadOnly, todo, toggleCompleted, remove}) {
    return (
        <div>
            <span
                style={{
                    textDecoration: todo.completed ? 'line-through': 'none',
                    color: isReadOnly ? 'gray' : 'black'
                }}
                onClick={e => isReadOnly ? null : toggleCompleted(todo)}
            >
                {todo.text}
            </span>
            <button
                style={{color: 'red'}}
                onClick={e => remove(todo.id)}
                disabled={isReadOnly}
            >
                x
            </button>
        </div>
    )
}

export default TodoItem;
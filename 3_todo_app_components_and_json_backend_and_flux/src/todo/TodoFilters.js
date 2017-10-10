import React from 'react';

export default function TodoFilters({filter, changeFilter}) {
    return (
        <div>
            <label>
                <input
                    type="radio"
                    value="showtodo"
                    checked={filter === 'todo'}
                    onChange={e => changeFilter('todo')}
                />
                Todo
            </label>
            <label>
                <input
                    type="radio"
                    value="showall"
                    checked={filter === 'all'}
                    onChange={e => changeFilter('all')}
                />
                All
            </label>
        </div>
    );
}

TodoFilters.defaultProps = { filter: 'all' };
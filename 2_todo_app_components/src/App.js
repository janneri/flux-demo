import React, { Component } from 'react';

import TodoPage from './todo/TodoPage';


let callbacks = {
    load(todolistId) {
        console.log("load", todolistId)
    },

    addTodo(todoText) {
        console.log("add", todoText)
    },

    changeFilter(filter) {
        console.log("change filter", filter);
    },

    toggleCompleted(todoItem) {
        console.log("toggle", todoItem);
    },

    remove(todoItemId) {
        console.log("remove", todoItemId);
    }
};


let todolist =
    {
        id: 1,
        name: "insert list name here",
        todos: [
            {
                text: "list item",
                completed: false,
                id: 1
            }
        ]
    };


export default function App() {

    return (
        <TodoPage
            todolist={todolist}
            callbacks={callbacks}
        />
    )

}



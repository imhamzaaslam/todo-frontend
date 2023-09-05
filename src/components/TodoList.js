import React from 'react';
import TodoItem from './TodoItem';

function TodoList({ todos, toggleCompletion }) {
    return (
        <ul>
            {todos.map(todo => (
                <TodoItem key={todo._id} todo={todo} toggleCompletion={toggleCompletion} />
            ))}
        </ul>
    );
}

export default TodoList;

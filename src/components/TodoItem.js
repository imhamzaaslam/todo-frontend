import React from 'react';

function TodoItem({ todo, toggleCompletion }) {
    return (
        <li style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
            <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleCompletion(todo._id)}
            />
            {todo.title}
        </li>
    );
}

export default TodoItem;

import React, { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await axios.get('http://localhost:5000/api/todos');
        setTodos(response.data);
    }

    const addTodo = async () => {
        if (title) {
            const response = await axios.post('http://localhost:5000/api/todos', { title });
            setTodos([...todos, response.data]);
            setTitle('');
        }
    }

    return (
        <div>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Add todo..." />
            <button onClick={addTodo}>Add</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo._id}>{todo.title}</li>
                ))}
            </ul>
        </div>
    );
}

export default App;
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './styles/App.css';

function App() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await axios.get(process.env.REACT_APP_API_URL);
        setTodos(response.data);
    }

    const addTodo = async () => {
        if (title) {
            const response = await axios.post(process.env.REACT_APP_API_URL, { title });
            setTodos([...todos, response.data]);
            setTitle('');
        }
    }
    const toggleCompletion = async (id) => {
        const todo = todos.find(t => t._id === id);
        const updatedTodo = { ...todo, completed: !todo.completed };

        try {
            const response = await axios.put(`http://localhost:5000/api/todos/${id}`, updatedTodo);
            setTodos(todos.map(t => t._id === id ? response.data : t));
        } catch (error) {
            console.error("Error updating todo", error);
        }
    }


    return (
        <div>
            <input value={title} onChange={e => setTitle(e.target.value)} placeholder="Add todo..." />
            <button onClick={addTodo}>Add</button>
            <ul>
                {todos.map(todo => (
                    <li key={todo._id} style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                        <input
                            type="checkbox"
                            checked={todo.completed}
                            onChange={() => toggleCompletion(todo._id)}
                        />
                        {todo.title}
                    </li>
                ))}
            </ul>
        </div>
    );
}

export default App;
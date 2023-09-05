import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
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
            const response = await axios.put(process.env.REACT_APP_API_URL + `/${id}`, updatedTodo);
            setTodos(todos.map(t => t._id === id ? response.data : t));
        } catch (error) {
            console.error("Error updating todo", error);
        }
    }

    return (
        <div>
            <AddTodo title={title} setTitle={setTitle} addTodo={addTodo} />
            <TodoList todos={todos} toggleCompletion={toggleCompletion} />
        </div>
    );
}

export default App;

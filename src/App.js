import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import ErrorAlert from './components/ErrorAlert';
import './styles/App.css';

function App() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [errorMessage, setErrorMessage] = useState(null); 

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await axios.get(process.env.REACT_APP_API_URL);
        setTodos(response.data);
    }

    const addTodo = async () => {
        try {
            if (title) {
                const response = await axios.post(process.env.REACT_APP_API_URL, { title });
                setTodos([...todos, response.data]);
                setTitle('');
            }
        } catch (error) {
            alert('Error adding todo: ' + error.message); 
            console.error("Error adding todo:", error);
        }
    }

    const toggleCompletion = async (id) => {
        const todo = todos.find(t => t._id === id);
        const updatedTodo = { ...todo, completed: !todo.completed };

        try {
            const response = await axios.put(process.env.REACT_APP_API_URL + `/${id}`, updatedTodo);
            setTodos(todos.map(todo => todo._id === id ? response.data : todo));
            alert(errorMessage);
        } catch (error) {
            setErrorMessage('Something went wrong!');
            console.error("Error updating todo", error);
        }
    }

    return (
        <div>
            <ErrorAlert message={errorMessage} />
            <AddTodo title={title} setTitle={setTitle} addTodo={addTodo} />
            <TodoList todos={todos} toggleCompletion={toggleCompletion} />
        </div>
    );
}

export default App;

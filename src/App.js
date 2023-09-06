import React, { useState, useEffect } from 'react';
import axios from 'axios';
import TodoList from './components/TodoList';
import AddTodo from './components/AddTodo';
import ErrorAlert from './components/ErrorAlert';
import TopHeading from './components/TopHeading';
import './styles/App.css';
import TodoService from './services/TodoService'; // Import the ApiService

function App() {
    const [todos, setTodos] = useState([]);
    const [title, setTitle] = useState('');
    const [errorMessage, setErrorMessage] = useState(null); 

    useEffect(() => {
        fetchTodos();
    }, []);

    const fetchTodos = async () => {
        const response = await TodoService.get();        
        setTodos(response.data);
    }

    const addTodo = async () => {
        try {
            if (title) {
                const response = await TodoService.post({ title });
                setTodos([...todos, response.data]);
                setTitle('');
            }
        } catch (error) {
            setErrorMessage('Something went wrong!');
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
            console.error("Error adding todo:", error);
        }
    }

    const toggleCompletion = async (id) => {
        const todo = todos.find(t => t._id === id);
        const updatedTodo = { ...todo, completed: !todo.completed };

        try {
            const response = await TodoService.put(id, updatedTodo);
            setTodos(todos.map(todo => todo._id === id ? response.data : todo));
            
        } catch (error) {
            setErrorMessage('Something went wrong!');
            setTimeout(() => {
                setErrorMessage(null);
            }, 5000);
            console.error("Error updating todo", error);
        }
    }

    return (
        <div className='container'>
            <TopHeading />
            <ErrorAlert message={errorMessage} />
            <AddTodo title={title} setTitle={setTitle} addTodo={addTodo} />
            <TodoList todos={todos} toggleCompletion={toggleCompletion} />
        </div>
    );
}

export default App;

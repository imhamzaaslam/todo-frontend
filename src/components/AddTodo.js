import React from 'react';

function AddTodo({ title, setTitle, addTodo }) {
    return (
        <div className='container card'>
            <input type='text' className='textfield' value={title} onChange={e => setTitle(e.target.value)} placeholder="Add todo..." />
            <button onClick={addTodo}>Add</button>
        </div>
    );
}

export default AddTodo;

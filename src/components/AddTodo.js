import React from 'react';

function AddTodo({ title, setTitle, addTodo }) {
    return (
        <div>
            <input className='textfield' value={title} onChange={e => setTitle(e.target.value)} placeholder="Add todo..." />
            <button onClick={addTodo}>Add</button>
        </div>
    );
}

export default AddTodo;

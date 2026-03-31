import React, { useState } from 'react';

const TodoState = () => {
    const [todos, setTodos] = useState([]);
    const [inputValue, setInputValue] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState('');

    const addTodo = () => {
        if (inputValue.trim() !== '') {
            setTodos([...todos, { id: Date.now(), text: inputValue }]);
            setInputValue('');
        }
    };

    const deleteTodo = (id) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const startEdit = (id, text) => {
        setEditingId(id);
        setEditValue(text);
    };

    const cancelEdit = () => {
        setEditingId(null);
        setEditValue('');
    };

    const updateTodo = () => {
        if (editValue.trim() !== '') {
            setTodos(todos.map(todo =>
                todo.id === editingId ? { ...todo, text: editValue } : todo
            ));
            setEditingId(null);
            setEditValue('');
        }
    };

    return (
        <div>
            <h2>TODO List</h2>
            <div>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button onClick={addTodo}>Add TODO</button>
            </div>

            <ul>
                {todos.map(todo => (
                    <li key={todo.id}>
                        {editingId === todo.id ? (
                            <div>
                                <input
                                    type="text"
                                    value={editValue}
                                    onChange={(e) => setEditValue(e.target.value)}
                                />
                                <button onClick={updateTodo}>Save</button>
                                <button onClick={cancelEdit}>Cancel</button>
                            </div>
                        ) : (
                            <>
                                <span>{todo.text}</span>
                                <button onClick={() => startEdit(todo.id, todo.text)}>Edit</button>
                                <button onClick={() => deleteTodo(todo.id)}>Delete</button>
                            </>
                        )}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default TodoState;
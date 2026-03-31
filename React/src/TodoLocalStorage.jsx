import React, { useState, useEffect } from 'react';

const TodoLocalStorage = () => {
    // Initializing state with a function lazy-loads from LocalStorage
    const [todos, setTodos] = useState(() => {
        const saved = localStorage.getItem('todos_task_12');
        return saved ? JSON.parse(saved) : [];
    });

    const [inputValue, setInputValue] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editValue, setEditValue] = useState('');

    // Effect to sync todos with LocalStorage whenever they change
    useEffect(() => {
        localStorage.setItem('todos_task_12', JSON.stringify(todos));
    }, [todos]);

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
            <h2>TODO List (LocalStorage)</h2>
            <div>
                <input
                    type="text"
                    value={inputValue}
                    onChange={(e) => setInputValue(e.target.value)}
                />
                <button onClick={addTodo}>Add TODO</button>
            </div>

            <ul>
                {todos.length === 0 && <li>No tasks found. Your tasks will persist even after refresh!</li>}
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

export default TodoLocalStorage;

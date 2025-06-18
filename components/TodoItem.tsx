import React, { useState } from 'react';

interface Todo {
    id: string;
    text: string;
    completed: boolean;
}

interface TodoItemProps {
    todo: Todo;
    onUpdate: (updatedTodo: Todo) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onUpdate }) => {
    const [isEditing, setIsEditing] = useState(false);
    const [editText, setEditText] = useState(todo.text);

    const handleEditClick = () => {
        setIsEditing(true);
    };

    const handleSaveClick = () => {
        onUpdate({ ...todo, text: editText });
        setIsEditing(false);
    };

    const handleCancelClick = () => {
        setEditText(todo.text);
        setIsEditing(false);
    };

    return (
        <div>
            {isEditing ? (
                <>
                    <input
                        type="text"
                        value={editText}
                        onChange={(e) => setEditText(e.target.value)}
                    />
                    <button onClick={handleSaveClick}>Save</button>
                    <button onClick={handleCancelClick}>Cancel</button>
                </>
            ) : (
                <>
                    <span style={{ textDecoration: todo.completed ? 'line-through' : 'none' }}>
                        {todo.text}
                    </span>
                    <button onClick={handleEditClick}>Edit</button>
                </>
            )}
        </div>
    );
};

export default TodoItem;

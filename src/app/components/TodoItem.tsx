'use client';

import { Todo } from '@/types/todo';

interface TodoItemProps {
    todo: Todo;
    onDelete: (id: number) => void;
}

const TodoItem: React.FC<TodoItemProps> = ({ todo, onDelete }) => {
    return (
        <div className="flex justify-between items-center p-4 bg-white border border-gray-200 rounded-lg shadow-sm hover:shadow-md transition duration-200">
            <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-800">{todo.title}</h3>
                <p className={`text-sm ${todo.completed ? 'text-green-500' : 'text-red-500'}`}>
                    {todo.completed ? 'Completed' : 'Not Completed'}
                </p>
            </div>
            <button
                onClick={() => onDelete(todo.id)}
                className="bg-red-500 text-white px-3 py-1 rounded-lg shadow hover:bg-red-600 transition duration-200"
            >
                Delete
            </button>
        </div>
    );
};

export default TodoItem;
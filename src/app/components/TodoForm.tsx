'use client';

import { useState, useRef } from 'react';

interface TodoFormProps {
    isOpen: boolean;
    onClose: () => void;
    onAdd: (title: string) => void;
}

const TodoForm: React.FC<TodoFormProps> = ({ isOpen, onClose, onAdd }) => {
    const [title, setTitle] = useState<string>('');
    const ref = useRef<HTMLInputElement>(null);
    ref.current?.focus();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (title.trim()) {
            onAdd(title);
            setTitle('');
            onClose();
        }
    };

    if (!isOpen) return null;

    return (
        <div className="bg-gray-50 p-4 rounded-lg shadow-md mb-4">
            <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <input
                    type="text"
                    ref={ref}
                    placeholder="Enter todo title..."
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
                <div className="flex gap-3 justify-end">
                    <button
                        type="submit"
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-200"
                    >
                        Add
                    </button>
                    <button
                        type="button"
                        onClick={onClose}
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg shadow hover:bg-gray-600 transition duration-200"
                    >
                        Cancel
                    </button>
                </div>
            </form>
        </div>
    );
};

export default TodoForm;
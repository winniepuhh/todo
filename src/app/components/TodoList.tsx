'use client';

import { Todo } from '@/types/todo';
import TodoItem from './TodoItem';

interface TodoListProps {
    todos: Todo[];
    onDelete: (id: number) => void;
}

const TodoList: React.FC<TodoListProps> = ({ todos, onDelete }) => {
    if (!todos.length) {
        return <p className="text-gray-500 text-center mt-4">There are no todos to display.</p>;
    }

    return (
        <div className="space-y-4 mt-4">
            {todos.map((todo) => (
                <TodoItem key={todo.id} todo={todo} onDelete={onDelete} />
            ))}
        </div>
    );
};

export default TodoList;
import { useState } from 'react';
import { addTodo, deleteTodo } from '@/lib/api';
import { Todo } from '@/types/todo';
import { toast } from 'react-toastify';

const useActions = (todos: Todo[], setTodos: React.Dispatch<React.SetStateAction<Todo[]>>) => {
    const [idCounter, setIdCounter] = useState<number>(11);
    const [isLoading, setIsLoading] = useState<boolean>(false);

    const handleAddTodo = async (title: string) => {
        setIsLoading(true);
        const tempId = idCounter;
        setIdCounter((prev) => prev + 1);
        const tempTodo = { id: tempId, title, completed: false };

        setTodos((prev) => [...prev, tempTodo]);

        try {
            const newTodo = await addTodo(title);
            if (!newTodo) throw new Error('Failed to add todo');
            toast.success('Todo added successfully!');
        } catch (e) {
            console.error(e);
            setTodos((prev) => prev.filter((todo) => todo.id !== tempId));
            toast.error('Failed to add todo');
        } finally {
            setIsLoading(false);
        }
    };

    const handleDeleteTodo = async (id: number) => {
        const todoToDelete = todos.find((todo) => todo.id === id);
        if (!todoToDelete) return;

        setIsLoading(true);
        setTodos((prev) => prev.filter((todo) => todo.id !== id));

        try {
            if (id <= 10) {
                const success = await deleteTodo(id);
                if (!success) throw new Error('Failed to delete todo');
            }
            toast.success('Todo deleted successfully!');
        } catch (e) {
            console.error(e);
            toast.error('Failed to delete todo');
            setTodos((prev) => [...prev, todoToDelete].sort((a, b) => a.id - b.id));
        } finally {
            setIsLoading(false);
        }
    };

    return { handleAddTodo, handleDeleteTodo, isLoading };
};

export default useActions;

'use client';

import { useEffect, useState, useMemo } from 'react';
import { debounce } from 'lodash';
import { Todo } from '@/types/todo';
import { getTodos, addTodo, deleteTodo } from '@/lib/api';
import { toast } from 'react-toastify';



const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [searchItem, setSearchItem] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const todosPerPage = 5;

    const [idCounter, setIdCounter] = useState<number>(11);

    useEffect(() => {
        const fetchTodos = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await getTodos();
                setTodos(response);
            } catch (e) {
                console.error(e);
                toast.error('Failed to load todos');
            } finally {
                setIsLoading(false);
            }
        };
        fetchTodos();
    }, []);

    const debouncedSetSearchItem = useMemo(
        () =>
            debounce((value: string) => {
                setSearchItem(value);
                setCurrentPage(1);
            }, 100),
        []
    );

    const filteredTodos = useMemo(
        () =>
            todos.filter((todo) =>
                todo.title.toLowerCase().includes(searchItem.toLowerCase())
            ),
        [todos, searchItem]
    );

    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);
    const totalPages = Math.ceil(filteredTodos.length / todosPerPage);

    const handleAddTodo = async (title: string) => {
        setIsLoading(true);
        setError(null);

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
        setError(null);

        setTodos((prev) => prev.filter((todo) => todo.id !== id));

        try {
            if (id <= 10) {
                const success = await deleteTodo(id);
                if (!success) throw new Error('Failed to delete todo');
            }
            if (currentTodos.length === 1 && currentPage > 1) {
                setCurrentPage((prev) => prev - 1);
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

    return {
        searchItem,
        setSearchItem: debouncedSetSearchItem,
        handleAddTodo,
        handleDeleteTodo,
        filteredTodos: currentTodos,
        error,
        isLoading,
        currentPage,
        setCurrentPage,
        totalPages,
    };
};

export default useTodos;
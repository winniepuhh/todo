'use client'

import { useEffect, useState } from "react";
import { Todo } from "@/types/todo";
import { getTodos, addTodo, deleteTodo } from "@/lib/api";

const useTodos = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [filteredTodos, setFilteredTodos] = useState<Todo[]>([]);
    const [searchItem, setSearchItem] = useState<string>('');
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [currentPage, setCurrentPage] = useState<number>(1);
    const [todosPerPage] = useState<number>(5);

    useEffect(() => {
        const fetchTodos = async () => {
            setIsLoading(true);
            setError(null);
            try {
                const response = await getTodos();
                setTodos(response);
                setFilteredTodos(response);
            } catch (e) {
                console.error(e);
                setError('Something went wrong');
            } finally {
                setIsLoading(false);
            }
        };
        fetchTodos();
    }, []);

    useEffect(() => {
        setFilteredTodos(todos.filter((todo) => todo.title.toLowerCase().includes(searchItem.toLowerCase())));
    }, [todos, searchItem]);

    const handleAddTodo = async (title: string) => {
        const newId = todos.length > 0 ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
        const tempTodo = {
            id: newId,
            title,
            completed: false,
        }

        setTodos((prev) => [...prev, tempTodo]);
        setFilteredTodos((prev) => [...prev, tempTodo]);

        setIsLoading(true);
        setError(null);

        try {
            const data = await addTodo(title);
            if (data) {
                const updatedTodo = { ...data, id: tempTodo.id };
                setTodos((prev) => prev.map((todo) => (todo.id === tempTodo.id ? updatedTodo : todo)));
                setFilteredTodos((prev) => prev.map((todo) => (todo.id === tempTodo.id ? updatedTodo : todo)));
            } else {
                throw new Error("Failed to add todo");
            }
        } catch (e) {
            setTodos((prev) => prev.filter((todo) => todo.id !== tempTodo.id));
            setFilteredTodos((prev) => prev.filter((todo) => todo.id !== tempTodo.id));
            console.error(e);
            setError('Something went wrong');
        } finally {
            setIsLoading(false);
        }


    };

    const handleDeleteTodo = async (id: number) => {
        const todoToDelete = todos.find((todo) => todo.id === id);
        if (!todoToDelete) return;

        setTodos((prev) => prev.filter((todo) => todo.id !== id));
        setFilteredTodos((prev) => prev.filter((todo) => todo.id !== id));

        if (id > 10) {
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const res = await deleteTodo(id);
            if (!res) throw new Error("Failed to delete");

        } catch (e) {
            setTodos((prev) => [...prev, todoToDelete].sort((a, b) => a.id - b.id));
            setFilteredTodos((prev) => [...prev, todoToDelete].sort((a, b) => a.id - b.id));
            console.error(e);
            setError('Something went wrong');
        } finally {
            setIsLoading(false);
        }
    }

    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);

    const totalPages = Math.ceil(filteredTodos.length / todosPerPage);

    return {
        searchItem,
        setSearchItem,
        handleAddTodo,
        handleDeleteTodo,
        filteredTodos: currentTodos,
        error,
        isLoading,
        currentPage,
        setCurrentPage,
        totalPages,
    }
}

export default useTodos;
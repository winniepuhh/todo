import { useEffect, useState } from 'react';
import { getTodos } from '@/lib/api';
import { Todo } from '@/types/todo';
import { toast } from 'react-toastify';

const useFetchitems = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);

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
                setError('Failed to load todos');
            } finally {
                setIsLoading(false);
            }
        };
        fetchTodos();
    }, []);

    return { todos, setTodos, isLoading, error };
};

export default useFetchitems;

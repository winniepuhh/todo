import { useState } from 'react';
import { Todo } from '@/types/todo';

const usePagination = (filteredTodos: Todo[], todosPerPage = 5) => {
    const [currentPage, setCurrentPage] = useState<number>(1);

    const indexOfLastTodo = currentPage * todosPerPage;
    const indexOfFirstTodo = indexOfLastTodo - todosPerPage;
    const currentTodos = filteredTodos.slice(indexOfFirstTodo, indexOfLastTodo);
    const totalPages = Math.ceil(filteredTodos.length / todosPerPage);

    return {
        currentTodos,
        currentPage,
        setCurrentPage,
        totalPages,
    };
};

export default usePagination;

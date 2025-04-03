'use client';

import useActions from "./useActions";
import useFetchitems from "./useFetchItems";
import usePagination from "./usePagination";
import useSearchItems from "./useSearchItems";



const useTodos = () => {
    const { todos, setTodos, isLoading, error } = useFetchitems();
    const { searchItem, setSearchItem, filteredTodos } = useSearchItems(todos);
    const { currentTodos, currentPage, setCurrentPage, totalPages } = usePagination(filteredTodos);
    const { handleAddTodo, handleDeleteTodo } = useActions(todos, setTodos);

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
    };
};

export default useTodos;

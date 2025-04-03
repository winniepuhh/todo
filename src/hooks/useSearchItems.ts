import { useMemo, useState } from 'react';
import { debounce } from 'lodash';
import { Todo } from '@/types/todo';

const useSearchItems = (todos: Todo[]) => {
    const [searchItem, setSearchItem] = useState<string>('');

    const debouncedSetSearchItem = useMemo(
        () =>
            debounce((value: string) => {
                setSearchItem(value);
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

    return { searchItem, setSearchItem: debouncedSetSearchItem, filteredTodos };
};

export default useSearchItems;

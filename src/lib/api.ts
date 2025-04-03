import { Todo } from '@/types/todo';

const baseUrl = 'https://jsonplaceholder.typicode.com/todos';

export const getTodos = async (): Promise<Todo[]> => {
    try {
        const response = await fetch(`${baseUrl}?_limit=10`);
        if (!response.ok) throw new Error('Failed to fetch todos');
        const data: Todo[] = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching todos:', error);
        return [];
    }
};

export const addTodo = async (title: string): Promise<Todo | null> => {
    try {
        const response = await fetch(baseUrl, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ title, completed: false }),
        });
        if (!response.ok) throw new Error('Failed to add todo');
        const data: Todo = await response.json();
        return data;
    } catch (error) {
        console.error('Error adding todo:', error);
        return null;
    }
};

export const deleteTodo = async (id: number): Promise<boolean> => {
    try {
        const response = await fetch(`${baseUrl}/${id}`, { method: 'DELETE' });
        if (!response.ok) throw new Error('Failed to delete todo');
        return true;
    } catch (error) {
        console.error('Error deleting todo:', error);
        return false;
    }
};
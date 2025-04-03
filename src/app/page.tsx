'use client';

import { useState } from 'react';
import TodoList from './components/TodoList';
import TodoForm from './components/TodoForm';
import Pagination from './components/Pagination';
import useTodos from '../../hooks/useTodos';
import { ToastContainer } from 'react-toastify';


const Home: React.FC = () => {
  const {
    searchItem,
    setSearchItem,
    handleAddTodo,
    handleDeleteTodo,
    filteredTodos,
    error,
    isLoading,
    currentPage,
    setCurrentPage,
    totalPages,
  } = useTodos();
  const [openForm, setOpenForm] = useState<boolean>(false);

  return (
    <div className="min-h-screen bg-gray-100 flex justify-center items-center p-4">
      <div className="w-full max-w-2xl bg-white rounded-lg shadow-lg p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center text-gray-800 mb-6">
          Todo App
        </h1>

        <input
          type="text"
          placeholder="Search todos..."
          value={searchItem}
          onChange={(e) => setSearchItem(e.target.value)}
          className="w-full p-3 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 mb-4"
        />

        <div className="flex justify-center mb-4">
          <button
            onClick={() => setOpenForm(true)}
            className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition duration-200"
          >
            Add Todo
          </button>
        </div>

        <ToastContainer position="top-right" autoClose={3000} />

        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        {isLoading && <p className="text-gray-600 text-center mb-4">Loading...</p>}

        <TodoForm
          isOpen={openForm}
          onClose={() => setOpenForm(false)}
          onAdd={handleAddTodo}
        />

        <TodoList todos={filteredTodos} onDelete={handleDeleteTodo} />
        {totalPages > 1 && (
          <Pagination
            currentPage={currentPage}
            totalPages={totalPages}
            setCurrentPage={setCurrentPage}
          />
        )}
      </div>
    </div>
  );
};

export default Home;
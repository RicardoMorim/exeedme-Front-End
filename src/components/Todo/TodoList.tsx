import { Todo } from "../../types";
import TodoInput from "./TodoInput";
import TodoItem from "./TodoItem";

interface todoListProps {
  todos: Todo[];
  setTodos: React.Dispatch<React.SetStateAction<Todo[]>>;
}

export default function TodoList({ todos, setTodos }: todoListProps) {
  const handleAdd = (newTodo: Todo) => {
    setTodos((prev) => [newTodo, ...prev]);
  };

  const handleToggle = (id: string) => {
    setTodos((prev) =>
      prev.map((todo) =>
        todo.id === id ? { ...todo, isCompleted: !todo.isCompleted } : todo
      )
    );
  };

  const handleDelete = (id: string) => {
    setTodos((prev) => prev.filter((todo) => todo.id !== id));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-50 to-indigo-100 dark:from-gray-900 dark:to-gray-800 py-10 px-4">
      <div className="max-w-3xl mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-2xl p-6 md:p-8">
        <h1 className="text-4xl font-bold text-gray-800 dark:text-gray-100 mb-8 text-center font-serif">
          ✨ Todo List
        </h1>
        <TodoInput onAdd={handleAdd} />
        <div className="mt-8 space-y-3">
          {todos.length === 0 ? (
            <div className="text-center py-8">
              <div className="inline-block p-4 bg-purple-50 dark:bg-gray-700 rounded-full mb-4">
                📌
              </div>
              <p className="text-gray-600 dark:text-gray-400 italic">
                All clear! Ready to start planning?
              </p>
            </div>
          ) : (
            todos.map((todo) => (
              <TodoItem
                key={todo.id}
                todo={todo}
                onToggle={handleToggle}
                onDelete={handleDelete}
              />
            ))
          )}
        </div>
      </div>
    </div>
  );
}

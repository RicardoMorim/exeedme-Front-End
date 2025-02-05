import { FiTrash2 } from "react-icons/fi";
import { Todo } from "../../types";

interface TodoItemProps {
  todo: Todo;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

export default function TodoItem({ todo, onToggle, onDelete }: TodoItemProps) {
  return (
    <div className="group flex items-start justify-between p-4 bg-white dark:bg-gray-800 rounded-xl shadow-sm hover:shadow-md transition-all duration-300 ease-[cubic-bezier(0.4,0,0.2,1)] border border-gray-100 dark:border-gray-700 hover:border-purple-100 dark:hover:border-purple-900">
      <div className="flex items-start space-x-3 flex-1">
        <button
          onClick={() => onToggle(todo.id)}
          className={`mt-1 shrink-0 h-6 w-6 rounded-full border-2 flex items-center justify-center transition-colors
              ${
                todo.isCompleted
                  ? "bg-purple-500 border-purple-500"
                  : "border-gray-300 hover:border-purple-400 dark:border-gray-600"
              }`}
        >
          {todo.isCompleted && (
            <svg
              className="w-4 h-4 text-white"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M5 13l4 4L19 7"
              />
            </svg>
          )}
        </button>
        <div className="flex-1">
          <h3
            className={`text-lg font-medium ${
              todo.isCompleted
                ? "line-through text-gray-400 dark:text-gray-600"
                : "text-gray-800 dark:text-gray-200"
            } transition-colors`}
          >
            {todo.name}
          </h3>
          {todo.description && (
            <p
              className={`text-sm ${
                todo.isCompleted
                  ? "line-through text-gray-300 dark:text-gray-600"
                  : "text-gray-600 dark:text-gray-400"
              } mt-1 transition-colors`}
            >
              {todo.description}
            </p>
          )}
        </div>
      </div>
      <button
        onClick={() => onDelete(todo.id)}
        className="ml-4 p-2 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg transition-colors"
        title="Delete Task"
      >
        <FiTrash2 className="w-5 h-5 text-red-400 hover:text-red-500" />
      </button>
    </div>
  );
}

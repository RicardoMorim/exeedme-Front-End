import React, { useState } from "react";
import { Todo } from "../../types";

interface TodoInputProps {
  onAdd: (todo: Todo) => void;
}

export default function TodoInput({ onAdd }: TodoInputProps) {
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !description.trim()) return;

    const newTodo: Todo = {
      id: Date.now().toString(),
      name,
      description,
      isCompleted: false,
    };
    onAdd(newTodo);
    setName("");
    setDescription("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-gray-800 p-6 rounded-xl shadow-lg border border-gray-100 dark:border-gray-700"
    >
      <h2 className="text-2xl font-semibold text-gray-800 dark:text-gray-100 mb-6">
        Add New Task 🌟
      </h2>
      <div className="space-y-6">
        <div>
          <label
            htmlFor="taskName"
            className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2"
          >
            Task Name
          </label>
          <input
            id="taskName"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="What needs to be done?"
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
          />
        </div>
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
            Description
          </label>
          <textarea
            id="description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Add some details..."
            rows={3}
            className="w-full px-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-lg focus:ring-2 focus:ring-purple-400 focus:border-transparent transition-all"
          />
        </div>
        <button
          type="submit"
          className="w-full bg-gradient-to-r from-purple-500 to-indigo-500 hover:from-purple-600 hover:to-indigo-600 text-white font-semibold py-3 px-6 rounded-lg transition-all transform hover:scale-[1.02] active:scale-95 shadow-md hover:shadow-lg"
        >
          Add Task{" "}
          <span style={{ fontSize: "20px", fontWeight: "900" }}>+</span>
        </button>
      </div>
    </form>
  );
}

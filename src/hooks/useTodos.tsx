import { useState } from "react";
import { Todo } from "../types";

export function useTodos() {
  const [todos, setTodos] = useState<Todo[]>([]);

  return { todos, setTodos };
}

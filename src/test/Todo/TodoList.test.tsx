import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoList from "../../components/Todo/TodoList";
import { Todo } from "../../types";

describe("TodoList component", () => {
  // Mock todos for testing
  const mockTodos: Todo[] = [
    {
      id: "1",
      name: "Test Todo 1",
      description: "Description 1",
      isCompleted: false,
    },
    {
      id: "2",
      name: "Test Todo 2",
      description: "Description 2",
      isCompleted: true,
    },
  ];

  // Mock setTodos function
  const setTodosMock = jest.fn();

  // Helper function to render component
  const renderTodoList = (todos: Todo[] = []) => {
    return render(<TodoList todos={todos} setTodos={setTodosMock} />);
  };

  beforeEach(() => {
    setTodosMock.mockClear();
  });

  it("renders empty state when no todos exist", () => {
    renderTodoList();
    expect(screen.getByText(/✨ To Do List/i)).toBeInTheDocument();
    expect(
      screen.getByText(/all clear! ready to start planning\?/i)
    ).toBeInTheDocument();
  });

  it("renders todo items when todos exist", () => {
    renderTodoList(mockTodos);
    expect(screen.getByText("Test Todo 1")).toBeInTheDocument();
    expect(screen.getByText("Test Todo 2")).toBeInTheDocument();
    expect(screen.getByText("Description 1")).toBeInTheDocument();
    expect(screen.getByText("Description 2")).toBeInTheDocument();
  });

  it("adds new todo at the beginning of the list", () => {
    renderTodoList(mockTodos);

    // Find and fill todo input form
    const taskInput = screen.getByPlaceholderText(/what needs to be done\?/i);
    const descriptionInput = screen.getByPlaceholderText(
      /add some details\.\.\./i
    );
    const submitButton = screen.getByRole("button", { name: /add task/i });

    fireEvent.change(taskInput, { target: { value: "New Todo" } });
    fireEvent.change(descriptionInput, {
      target: { value: "New Description" },
    });
    fireEvent.click(submitButton);

    // Verify setTodos was called with new todo at start of array
    const setTodosCall = setTodosMock.mock.calls[0][0];
    const newTodos = setTodosCall(mockTodos);
    expect(newTodos[0].name).toBe("New Todo");
    expect(newTodos[0].description).toBe("New Description");
    expect(newTodos.length).toBe(mockTodos.length + 1);
  });

    it("toggles todo completion status", () => {
      renderTodoList(mockTodos);
        
      // Find the first todo's toggle button by using its unique characteristics
      const firstTodoName = screen.getByText("Test Todo 1");
      const todoContainer = firstTodoName.closest('.group'); // Using the container class
      const toggleButton = todoContainer?.querySelector('button'); // First button in the todo item
      expect(toggleButton).toBeInTheDocument();
      
      if (toggleButton) {
        fireEvent.click(toggleButton);
      
        // Verify setTodos was called
        expect(setTodosMock).toHaveBeenCalledTimes(1);
        
        // Verify the toggle logic
        const updateFunction = setTodosMock.mock.calls[0][0];
        const updatedTodos = updateFunction(mockTodos);
        
        // Check that first todo's completion status was toggled
        expect(updatedTodos[0].isCompleted).toBe(!mockTodos[0].isCompleted);
      }
    });

  it("deletes todo when delete button is clicked", () => {
    renderTodoList(mockTodos);

    // Find and click delete button for first todo
    const deleteButton = screen.getAllByTitle(/delete task/i)[0];
    fireEvent.click(deleteButton);

    // Verify setTodos was called with todo removed
    const setTodosCall = setTodosMock.mock.calls[0][0];
    const remainingTodos = setTodosCall(mockTodos);
    expect(remainingTodos.length).toBe(mockTodos.length - 1);
    expect(remainingTodos.find((t: Todo) => t.id === "1")).toBeUndefined();
  });

  it("edits todo when edit is submitted", () => {
    renderTodoList(mockTodos);

    // Find and click edit button for first todo
    const editButton = screen.getAllByTitle(/edit task/i)[0];
    fireEvent.click(editButton);

    // Find edit inputs and update values
    const nameInput = screen.getByDisplayValue("Test Todo 1");
    const descriptionInput = screen.getByDisplayValue("Description 1");

    fireEvent.change(nameInput, { target: { value: "Updated Todo" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Updated Description" },
    });

    // Save changes
    const saveButton = screen.getByTitle(/save/i);
    fireEvent.click(saveButton);

    // Verify setTodos was called with updated todo
    const setTodosCall = setTodosMock.mock.calls[0][0];
    const updatedTodos = setTodosCall(mockTodos);
    const updatedTodo = updatedTodos.find((t: Todo) => t.id === "1");
    expect(updatedTodo?.name).toBe("Updated Todo");
    expect(updatedTodo?.description).toBe("Updated Description");
  });
});

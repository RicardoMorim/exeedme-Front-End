import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoInput from "../../components/Todo/TodoInput";
import { Todo } from "../../types";

describe("TodoInput component", () => {
  const setup = () => {
    const onAddMock = jest.fn();
    render(<TodoInput onAdd={onAddMock} />);
    const taskInput = screen.getByPlaceholderText(/what needs to be done\?/i) as HTMLInputElement;
    const descriptionInput = screen.getByPlaceholderText(/add some details\.\.\./i) as HTMLTextAreaElement;
    const submitButton = screen.getByRole("button", { name: /add task/i });
    return { onAddMock, taskInput, descriptionInput, submitButton };
  };

  it("renders the form elements correctly", () => {
    setup();
    expect(screen.getByText(/add new task/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/task name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/description/i)).toBeInTheDocument();
  });

  it("does not call onAdd if fields are empty or whitespace", () => {
    const { onAddMock, taskInput, descriptionInput, submitButton } = setup();

    // Both fields empty
    fireEvent.change(taskInput, { target: { value: " " } });
    fireEvent.change(descriptionInput, { target: { value: " " } });
    fireEvent.click(submitButton);
    expect(onAddMock).not.toHaveBeenCalled();

    // Only one field filled
    fireEvent.change(taskInput, { target: { value: "Task" } });
    fireEvent.change(descriptionInput, { target: { value: " " } });
    fireEvent.click(submitButton);
    expect(onAddMock).not.toHaveBeenCalled();
  });

  it("calls onAdd with proper todo object and resets input fields", () => {
    const { onAddMock, taskInput, descriptionInput, submitButton } = setup();

    // Fill in valid task name and description
    fireEvent.change(taskInput, { target: { value: "Buy Milk" } });
    fireEvent.change(descriptionInput, { target: { value: "2 liters of milk" } });
    fireEvent.click(submitButton);

    expect(onAddMock).toHaveBeenCalledTimes(1);

    // Validate the todo object
    const addedTodo: Todo = onAddMock.mock.calls[0][0];
    expect(addedTodo).toMatchObject({
      name: "Buy Milk",
      description: "2 liters of milk",
      isCompleted: false,
    });
    expect(typeof addedTodo.id).toBe("string");

    // Input fields should be reset
    expect(taskInput.value).toBe("");
    expect(descriptionInput.value).toBe("");
  });
});
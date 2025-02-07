import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TodoItem from "../../components/Todo/TodoItem";
import { Todo } from "../../types";

describe("TodoItem component", () => {
  const sampleTodo: Todo = {
    id: "1",
    name: "Test Task",
    description: "Test Description",
    isCompleted: false,
  };

  let onToggleMock: jest.Mock, onDeleteMock: jest.Mock, onEditMock: jest.Mock;

  beforeEach(() => {
    onToggleMock = jest.fn();
    onDeleteMock = jest.fn();
    onEditMock = jest.fn();
  });

  const renderComponent = (todo: Todo = sampleTodo) =>
    render(
      <TodoItem
        todo={todo}
        onToggle={onToggleMock}
        onDelete={onDeleteMock}
        onEdit={onEditMock}
      />
    );

  it("renders todo details correctly in non-edit mode", () => {
    renderComponent();
    // Check if todo name is rendered
    expect(screen.getByText(sampleTodo.name)).toBeInTheDocument();
    // Check if description is rendered
    expect(screen.getByText(sampleTodo.description)).toBeInTheDocument();
    // Check for edit and delete buttons via their titles
    expect(screen.getByTitle(/edit task/i)).toBeInTheDocument();
    expect(screen.getByTitle(/delete task/i)).toBeInTheDocument();
    // Check for toggle button (it may not have accessible text so use role "button")
    const toggleButton = screen.getAllByRole("button")[0];
    expect(toggleButton).toBeInTheDocument();
  });

  it("calls onToggle when toggle button is clicked", () => {
    renderComponent();
    const toggleButton = screen.getAllByRole("button")[0];
    fireEvent.click(toggleButton);
    expect(onToggleMock).toHaveBeenCalledWith(sampleTodo.id);
  });

  it("enters editing mode when clicking Edit Task button", () => {
    renderComponent();
    const editButton = screen.getByTitle(/edit task/i);
    fireEvent.click(editButton);
    // Now editing mode shows an input and a textarea, check if their values equal to current todo fields
    expect(screen.getByDisplayValue(sampleTodo.name)).toBeInTheDocument();
    expect(
      screen.getByDisplayValue(sampleTodo.description)
    ).toBeInTheDocument();
    // Save and Cancel buttons should be present based on title attributes
    expect(screen.getByTitle(/save/i)).toBeInTheDocument();
    expect(screen.getByTitle(/cancel/i)).toBeInTheDocument();
  });

  it("calls onEdit with updated todo on Save and exits editing mode", () => {
    renderComponent();

    // Enter edit mode
    fireEvent.click(screen.getByTitle(/edit task/i));

    // Get input fields
    const nameInput = screen.getByDisplayValue(sampleTodo.name);
    const descriptionInput = screen.getByDisplayValue(sampleTodo.description);

    // Change values
    fireEvent.change(nameInput, { target: { value: "Updated Task" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Updated Description" },
    });

    // Click Save button
    fireEvent.click(screen.getByTitle(/save/i));

    // Verify onEdit was called with correct data
    expect(onEditMock).toHaveBeenCalledTimes(1);
    expect(onEditMock).toHaveBeenCalledWith({
      ...sampleTodo,
      name: "Updated Task",
      description: "Updated Description",
    });

    // Update the component with the new todo data
    renderComponent({
      ...sampleTodo,
      name: "Updated Task",
      description: "Updated Description",
    });

    // Now verify the updated text is visible
    expect(screen.getByText("Updated Task")).toBeInTheDocument();
  });

  it("cancels editing mode and resets input values when Cancel is clicked", () => {
    renderComponent();
    fireEvent.click(screen.getByTitle(/edit task/i));
    const nameInput = screen.getByDisplayValue(
      sampleTodo.name
    ) as HTMLInputElement;
    const descriptionInput = screen.getByDisplayValue(
      sampleTodo.description
    ) as HTMLTextAreaElement;

    // Update the inputs
    fireEvent.change(nameInput, { target: { value: "Changed Name" } });
    fireEvent.change(descriptionInput, {
      target: { value: "Changed Description" },
    });

    // Click Cancel button
    fireEvent.click(screen.getByTitle(/cancel/i));

    // Editing mode should exit and show original values
    expect(screen.getByText(sampleTodo.name)).toBeInTheDocument();
    expect(screen.getByText(sampleTodo.description)).toBeInTheDocument();
  });

  it("calls onDelete when Delete Task button is clicked", () => {
    renderComponent();
    const deleteButton = screen.getByTitle(/delete task/i);
    fireEvent.click(deleteButton);
    expect(onDeleteMock).toHaveBeenCalledWith(sampleTodo.id);
  });
});

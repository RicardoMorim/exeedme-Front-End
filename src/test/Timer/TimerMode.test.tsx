import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TimerMode from "../../components/Timer/TimerMode";
import { Mode } from "../../types";

describe("TimerMode component", () => {
  const onModeChangeMock = jest.fn();

  beforeEach(() => {
    onModeChangeMock.mockClear();
  });

  const renderTimerMode = (currentMode: Mode = "pomodoro") => {
    return render(
      <TimerMode mode={currentMode} onModeChange={onModeChangeMock} />
    );
  };

  it("renders both mode buttons with correct labels", () => {
    renderTimerMode();
    
    expect(screen.getByText("Trabalho")).toBeInTheDocument();
    expect(screen.getByText("Descanso")).toBeInTheDocument();
  });

  it("renders icons for both buttons", () => {
    renderTimerMode();
    
    const buttons = screen.getAllByRole("switch");
    expect(buttons[0].querySelector("svg")).toBeInTheDocument(); // FaBrain
    expect(buttons[1].querySelector("svg")).toBeInTheDocument(); // FaCoffee
  });

  it("applies correct styles based on selected mode", () => {
    renderTimerMode("pomodoro");
    
    const workButton = screen.getByText("Trabalho").closest("button");
    const breakButton = screen.getByText("Descanso").closest("button");
    
    expect(workButton).toHaveClass("bg-gradient-to-r");
    expect(workButton).toHaveClass("from-purple-600");
    expect(breakButton).toHaveClass("bg-gray-100");
  });

  it("switches styles when break mode is selected", () => {
    renderTimerMode("shortBreak");
    
    const workButton = screen.getByText("Trabalho").closest("button");
    const breakButton = screen.getByText("Descanso").closest("button");
    
    expect(breakButton).toHaveClass("bg-gradient-to-r");
    expect(breakButton).toHaveClass("from-emerald-500");
    expect(workButton).toHaveClass("bg-gray-100");
  });

  it("calls onModeChange with correct mode when buttons are clicked", () => {
    renderTimerMode("pomodoro");
    
    // Click break button
    fireEvent.click(screen.getByText("Descanso"));
    expect(onModeChangeMock).toHaveBeenCalledWith("shortBreak");
    
    // Click work button
    fireEvent.click(screen.getByText("Trabalho"));
    expect(onModeChangeMock).toHaveBeenCalledWith("pomodoro");
  });

  it("sets correct aria-pressed state based on current mode", () => {
    renderTimerMode("pomodoro");
    
    const workButton = screen.getByText("Trabalho").closest("button");
    const breakButton = screen.getByText("Descanso").closest("button");
    
    expect(workButton).toHaveAttribute("aria-pressed", "true");
    expect(breakButton).toHaveAttribute("aria-pressed", "false");
  });
});
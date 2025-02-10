import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TimerControls from "../../components/Timer/TimerControls";

describe("TimerControls component", () => {
  const mockStart = jest.fn();
  const mockPause = jest.fn();
  const mockReset = jest.fn();

  const renderTimerControls = (isRunning = false) => {
    return render(
      <TimerControls
        isRunning={isRunning}
        onStart={mockStart}
        onPause={mockPause}
        onReset={mockReset}
      />
    );
  };

  beforeEach(() => {
    mockStart.mockClear();
    mockPause.mockClear();
    mockReset.mockClear();
  });

  it("renders control buttons with correct initial state", () => {
    renderTimerControls();

    const resetButton = screen.getByTitle("Reset Timer (R)");
    expect(resetButton).toBeInTheDocument();

    const startButton = screen.getByTitle("Start Timer (Space)");
    expect(startButton).toBeInTheDocument();

    const playIcon = startButton.querySelector("svg");
    expect(playIcon).toHaveClass("w-6", "h-6", "text-white", "ml-1");
  });

  it("shows correct button state when timer is running", () => {
    renderTimerControls(true);

    const pauseButton = screen.getByTitle("Pause Timer (Space)");
    expect(pauseButton).toBeInTheDocument();

    const pauseIcon = pauseButton.querySelector("svg");
    expect(pauseIcon).toHaveClass("w-6", "h-6", "text-white");
  });

  it("calls onStart when start button is clicked", () => {
    renderTimerControls();
    const startButton = screen.getByTitle("Start Timer (Space)");
    fireEvent.click(startButton);
    expect(mockStart).toHaveBeenCalledTimes(1);
  });

  it("calls onPause when pause button is clicked while running", () => {
    renderTimerControls(true);
    const pauseButton = screen.getByTitle("Pause Timer (Space)");
    fireEvent.click(pauseButton);
    expect(mockPause).toHaveBeenCalledTimes(1);
  });

  it("calls onReset when reset button is clicked", () => {
    renderTimerControls();
    const resetButton = screen.getByTitle("Reset Timer (R)");
    fireEvent.click(resetButton);
    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it("has correct styling based on timer state", () => {
    const { rerender } = renderTimerControls();

    let mainButton = screen.getByTitle("Start Timer (Space)");
    expect(mainButton).toHaveClass("bg-emerald-500");

    rerender(
      <TimerControls
        isRunning={true}
        onStart={mockStart}
        onPause={mockPause}
        onReset={mockReset}
      />
    );
    mainButton = screen.getByTitle("Pause Timer (Space)");
    expect(mainButton).toHaveClass("bg-amber-500");
  });

  it("handles keyboard shortcuts correctly", () => {
    renderTimerControls();

    // Test Space key for starting
    fireEvent.keyDown(window, { code: "Space" });
    expect(mockStart).toHaveBeenCalledTimes(1);

    // Test R key for reset
    fireEvent.keyDown(window, { code: "KeyR" });
    expect(mockReset).toHaveBeenCalledTimes(1);

    // Test Space key for pausing when running
    renderTimerControls(true);
    fireEvent.keyDown(window, { code: "Space" });
    expect(mockPause).toHaveBeenCalledTimes(1);
  });

  it("renders keyboard shortcut help text", () => {
    renderTimerControls();

    expect(screen.getByText("Space")).toBeInTheDocument();
    expect(screen.getByText("R")).toBeInTheDocument();
    expect(screen.getByText(/to start/)).toBeInTheDocument();
    expect(screen.getByText(/to reset/)).toBeInTheDocument();
  });
});

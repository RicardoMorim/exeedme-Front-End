import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import TimerControls from "../../components/Timer/TimerControls";

describe("TimerControls component", () => {
  // Mock callback functions
  const mockStart = jest.fn();
  const mockPause = jest.fn();
  const mockReset = jest.fn();

  // Helper function to render component with given props
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

  // Clear mock functions before each test
  beforeEach(() => {
    mockStart.mockClear();
    mockPause.mockClear();
    mockReset.mockClear();
  });

  it("renders control buttons with correct initial state", () => {
    renderTimerControls();

    // Check for reset button
    const resetButton = screen.getByTitle("Reset Timer");
    expect(resetButton).toBeInTheDocument();

    // Check for start button in non-running state
    const startButton = screen.getByTitle("Start Timer");
    expect(startButton).toBeInTheDocument();

    // Verify play icon is visible (not pause)
    const playIcon = startButton.querySelector("svg");
    expect(playIcon).toHaveClass("w-6", "h-6", "text-white", "ml-1");
  });

  it("shows correct button state when timer is running", () => {
    renderTimerControls(true);

    // Check for pause button in running state
    const pauseButton = screen.getByTitle("Pause Timer");
    expect(pauseButton).toBeInTheDocument();

    // Verify pause icon is visible
    const pauseIcon = pauseButton.querySelector("svg");
    expect(pauseIcon).toHaveClass("w-6", "h-6", "text-white");
  });

  it("calls onStart when start button is clicked", () => {
    renderTimerControls();
    const startButton = screen.getByTitle("Start Timer");
    fireEvent.click(startButton);
    expect(mockStart).toHaveBeenCalledTimes(1);
  });

  it("calls onPause when pause button is clicked while running", () => {
    renderTimerControls(true);
    const pauseButton = screen.getByTitle("Pause Timer");
    fireEvent.click(pauseButton);
    expect(mockPause).toHaveBeenCalledTimes(1);
  });

  it("calls onReset when reset button is clicked", () => {
    renderTimerControls();
    const resetButton = screen.getByTitle("Reset Timer");
    fireEvent.click(resetButton);
    expect(mockReset).toHaveBeenCalledTimes(1);
  });

  it("has correct styling based on timer state", () => {
    const { rerender } = renderTimerControls();

    // Check initial (stopped) state styling
    let mainButton = screen.getByTitle("Start Timer");
    expect(mainButton).toHaveClass("bg-emerald-500");

    // Check running state styling
    rerender(
      <TimerControls
        isRunning={true}
        onStart={mockStart}
        onPause={mockPause}
        onReset={mockReset}
      />
    );
    mainButton = screen.getByTitle("Pause Timer");
    expect(mainButton).toHaveClass("bg-amber-500");
  });
});

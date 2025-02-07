import { render, screen, fireEvent, act } from "@testing-library/react";
import "@testing-library/jest-dom";
import TimerDisplay from "../../components/Timer/TimerDisplay";
import { Mode, WatchSkin } from "../../types";

jest.mock("../../components/Timer/TimerMode", () => ({
  __esModule: true,
  default: ({
    mode,
    onModeChange,
  }: {
    mode: Mode;
    onModeChange: (mode: Mode) => void;
  }) => (
    <div data-testid="timer-mode" onClick={() => onModeChange("shortBreak")}>
      {mode}
    </div>
  ),
}));

jest.mock("../../components/Timer/TimerControls", () => ({
  __esModule: true,
  default: ({
    isRunning,
    onStart,
    onPause,
    onReset,
  }: {
    isRunning: boolean;
    onStart: () => void;
    onPause: () => void;
    onReset: () => void;
  }) => (
    <div data-testid="timer-controls">
      <button onClick={onReset} title="Reset Timer" data-testid="reset-button">
        Reset
      </button>
      <button
        onClick={isRunning ? onPause : onStart}
        title={isRunning ? "Pause Timer" : "Start Timer"}
        data-testid="start-pause-button"
      >
        {isRunning ? "Pause" : "Start"}
      </button>
    </div>
  ),
}));

jest.mock("../../components/Watch/WatchDigital", () => ({
  __esModule: true,
  default: ({ minutes, seconds }: { minutes: string; seconds: string }) => (
    <div data-testid="digital-watch">
      {minutes}:{seconds}
    </div>
  ),
}));

// Mock Audio
const mockPlay = jest.fn().mockImplementation(() => Promise.resolve());
window.Audio = jest.fn().mockImplementation(() => ({
  play: mockPlay,
}));

describe("TimerDisplay Component", () => {
  const defaultProps = {
    mode: "pomodoro" as Mode,
    setMode: jest.fn(),
    time: 1500,
    setTime: jest.fn(),
    initialTime: 1500,
    setInitialTime: jest.fn(),
    isRunning: false,
    setIsRunning: jest.fn(),
    currentSkin: "digital" as WatchSkin,
    setCurrentSkin: jest.fn(),
  };

  beforeEach(() => {
    jest.clearAllMocks();
    jest.useFakeTimers();
  });

  afterEach(() => {
    act(() => {
      jest.runOnlyPendingTimers();
    });
    jest.useRealTimers();
  });

  it("renders initial state correctly", () => {
    render(<TimerDisplay {...defaultProps} />);
    expect(screen.getByTestId("timer-mode")).toHaveTextContent("pomodoro");
    expect(screen.getByTestId("timer-controls")).toBeInTheDocument();
    expect(screen.getByTitle("Change Watch Style")).toBeInTheDocument();
  });

  it("handles timer countdown correctly", () => {
    const setTime = jest.fn();
    render(
      <TimerDisplay
        {...defaultProps}
        isRunning={true}
        setTime={setTime}
        time={10}
      />
    );

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(setTime).toHaveBeenCalledWith(9);
  });

  it("shows notification when time reaches 2 seconds", async () => {
    render(<TimerDisplay {...defaultProps} time={2} />);

    await act(async () => {
      // Wait for any promises to resolve
      await Promise.resolve();
    });

    expect(screen.getByText(/good job/i)).toBeInTheDocument();
    expect(mockPlay).toHaveBeenCalled();

    act(() => {
      jest.advanceTimersByTime(6000);
    });

    expect(screen.queryByText(/good job/i)).not.toBeInTheDocument();
  });

  it("switches mode when timer reaches zero", () => {
    const setMode = jest.fn();
    render(
      <TimerDisplay
        {...defaultProps}
        isRunning={true}
        time={0}
        setMode={setMode}
      />
    );

    act(() => {
      jest.advanceTimersByTime(1000);
    });

    expect(setMode).toHaveBeenCalledWith("shortBreak");
  });

  it("handles start control correctly", () => {
    const setIsRunning = jest.fn();
    render(<TimerDisplay {...defaultProps} setIsRunning={setIsRunning} />);

    fireEvent.click(screen.getByTestId("start-pause-button"));
    expect(setIsRunning).toHaveBeenCalledWith(true);
  });

  it("handles pause control correctly", () => {
    const setIsRunning = jest.fn();
    render(
      <TimerDisplay
        {...defaultProps}
        isRunning={true}
        setIsRunning={setIsRunning}
      />
    );

    fireEvent.click(screen.getByTestId("start-pause-button"));
    expect(setIsRunning).toHaveBeenCalledWith(false);
  });

  it("handles reset control correctly", () => {
    const setTime = jest.fn();
    const setInitialTime = jest.fn();
    const setIsRunning = jest.fn();

    render(
      <TimerDisplay
        {...defaultProps}
        setTime={setTime}
        setInitialTime={setInitialTime}
        setIsRunning={setIsRunning}
      />
    );

    fireEvent.click(screen.getByTestId("reset-button"));
    expect(setIsRunning).toHaveBeenCalledWith(false);
    expect(setTime).toHaveBeenCalledWith(1500);
    expect(setInitialTime).toHaveBeenCalledWith(1500);
  });

  it("formats time correctly", () => {
    render(<TimerDisplay {...defaultProps} time={65} />);

    // Look for the time in the mocked digital watch
    const watchDisplay = screen.getByTestId("digital-watch");
    expect(watchDisplay).toHaveTextContent("01:05");
  });

  it("cleans up timer on unmount", () => {
    const setIsRunning = jest.fn();
    const { unmount } = render(
      <TimerDisplay {...defaultProps} setIsRunning={setIsRunning} />
    );

    unmount();
    expect(setIsRunning).toHaveBeenCalledWith(false);
  });

  it("opens skin modal when change style button is clicked", () => {
    render(<TimerDisplay {...defaultProps} />);
    fireEvent.click(screen.getByTitle("Change Watch Style"));
    expect(screen.getByRole("dialog")).toBeInTheDocument();
  });
});

export interface TimerControlsProps {
  isRunning: boolean;
  onStart: () => void;
  onPause: () => void;
  onReset: () => void;
}

export type Mode = "pomodoro" | "shortBreak" | "longBreak";

export interface TimerModeProps {
  mode: Mode;
  onModeChange: (mode: Mode) => void;
}
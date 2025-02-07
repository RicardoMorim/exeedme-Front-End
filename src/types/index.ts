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

export interface Todo {
  id: string;
  name: string;
  description: string;
  isCompleted: boolean;
}

export type WatchSkin =
  | "digital"
  | "analogic"
  | "analogicClassic"
  | "analogicSimple"
  | "fit"
  | "fitSlim"
  | "simple"
  | "SimpleStopWatch"
  | "stop";

import { useState, useEffect } from "react";
import TimerMode from "./TimerMode";
import TimerControls from "./TimerControls";
import { Mode } from "../../types";
import Watch from "../Watch/Watch";

export default function TimerDisplay() {
  const [mode, setMode] = useState<Mode>("pomodoro");
  const [time, setTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);

  // Update time when mode changes
  useEffect(() => {
    if (mode === "pomodoro") {
      setTime(25 * 60);
    } else {
      setTime(5 * 60);
    }
    setIsRunning(false);
  }, [mode]);

  // Timer countdown effect
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isRunning && time > 0) {
      timer = setInterval(() => {
        setTime((prev) => prev - 1);
      }, 1000);
    } else if (time === 0) {
      const nextMode = mode === "pomodoro" ? "shortBreak" : "pomodoro";
      setMode(nextMode);
    }
    return () => clearInterval(timer);
  }, [isRunning, time, mode]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    if (mode === "pomodoro") {
      setTime(25 * 60);
    } else {
      setTime(5 * 60);
    }
    setIsRunning(false);
  };

  const formatTime = (seconds: number): string => {
    const minutes = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${minutes}:${secs}`;
  };

  return (
    <div className="flex flex-col items-center py-8 timer">
      <TimerMode mode={mode} onModeChange={setMode} />
      <Watch
        seconds={formatTime(time).split(":")[0]}
        minutes={formatTime(time).split(":")[1]}
      />
      <TimerControls
        isRunning={isRunning}
        onStart={handleStart}
        onPause={handlePause}
        onReset={handleReset}
      />
    </div>
  );
}

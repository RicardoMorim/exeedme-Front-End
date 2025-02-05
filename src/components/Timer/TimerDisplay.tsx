import { useState, useEffect } from "react";
import TimerMode from "./TimerMode";
import TimerControls from "./TimerControls";
import { Mode } from "../../types";
import Watch from "../Watch/Watch";

export default function TimerDisplay() {
  const [mode, setMode] = useState<Mode>("pomodoro");
  const [time, setTime] = useState(25 * 60);
  const [initialTime, setInitialTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [showNotification, setShowNotification] = useState(false);
  const [autoStart, setAutoStart] = useState(false);

  // Handle notifications
  useEffect(() => {
    if (time === 3) {
      setShowNotification(true);
      const audio = new Audio("/audio/notification.mp3");
      audio.play().catch(() => {});
      setTimeout(() => setShowNotification(false), 6000);
    }
  }, [time]);

  useEffect(() => {
    if (mode === "pomodoro") {
      setTime(25 * 60);
      setInitialTime(25 * 60);
    } else {
      setTime(5 * 60); // Short break duration
      setInitialTime(5 * 60);
    }
    if (autoStart) {
      setIsRunning(true);
    } else {
      setIsRunning(false);
    }
  }, [mode, autoStart]);

  // Countdown effect: update time every second and switch mode when timer reaches 0
  useEffect(() => {
    if (!isRunning) return;
    const timer = setInterval(() => {
      setTime((prevTime) => {
        if (prevTime <= 1) {
          clearInterval(timer);
          // Determine the next mode:
          const nextMode: Mode =
            mode === "pomodoro" ? "shortBreak" : "pomodoro";
          // Set flag to auto start next mode
          setAutoStart(true);
          setMode(nextMode);
          return 0;
        }
        return prevTime - 1;
      });
    }, 1000);
    return () => clearInterval(timer);
  }, [isRunning, mode]);

  const handleStart = () => setIsRunning(true);
  const handlePause = () => setIsRunning(false);
  const handleReset = () => {
    setIsRunning(false);
    if (mode === "pomodoro") {
      setTime(25 * 60);
      setInitialTime(25 * 60);
    } else {
      setTime(5 * 60);
      setInitialTime(5 * 60);
    }
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="flex flex-col items-center py-4 md:py-8 min-h-screen justify-center">
      {showNotification && (
        <div className="fixed top-4 right-4 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-6 py-3 rounded-lg shadow-lg animate-bounce">
          <p className="font-medium">
            {mode === "pomodoro"
              ? "Good Job! Take a break! 🎉"
              : "Break's over! Let's focus! 💪"}
          </p>
        </div>
      )}
      <div className="w-full max-w-md px-4">
        <TimerMode
          mode={mode}
          onModeChange={(newMode) => {
            setAutoStart(false); // Manual mode change: don't auto-start
            setMode(newMode);
          }}
        />
        <div
          className={`my-6 md:my-8 relative aspect-square w-full max-w-xs mx-auto transition-transform duration-300 ${
            time === 0 ? "animate-shake" : ""
          }`}
        >
          <Watch
            seconds={formatTime(time).split(":")[0]}
            minutes={formatTime(time).split(":")[1]}
            initialSeconds={initialTime}
            totalSeconds={time}
          />
        </div>
        <TimerControls
          isRunning={isRunning}
          onStart={handleStart}
          onPause={handlePause}
          onReset={handleReset}
        />
      </div>
    </div>
  );
}

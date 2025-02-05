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
  const [sessionMessage, setSessionMessage] = useState<string | null>(null);

  useEffect(() => {
    if (time === 2) {
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
      setTime(5 * 60); 
      setInitialTime(5 * 60);
    }
  }, [mode]);

  // Clear any session message after 3 seconds.
  useEffect(() => {
    if (sessionMessage) {
      const msgTimer = setTimeout(() => setSessionMessage(null), 3000);
      return () => clearTimeout(msgTimer);
    }
  }, [sessionMessage]);

  // Recursive timeout for countdown.
  useEffect(() => {
    if (!isRunning) return; // Do nothing if paused

    const timerId = setTimeout(() => {
      if (time > 0) {
        setTime(time - 1);
      } else {
        const nextMode: Mode = mode === "pomodoro" ? "shortBreak" : "pomodoro";

        setSessionMessage(
          nextMode === "pomodoro"
            ? "Time to work! Let's get started."
            : "Break time! Relax a bit."
        );

        // Switch mode. The mode effect will reset the time.
        setMode(nextMode);
      }
    }, 1000);

    return () => clearTimeout(timerId);
  }, [isRunning, time, mode]);

  // Control handlers
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
    setSessionMessage(null);
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  return (
    <div className="flex flex-col items-center py-8 md:py-16 min-h-screen justify-center bg-gray-50 dark:bg-gray-900">
      {showNotification && (
        <div className="fixed top-6 right-6 bg-gradient-to-r from-purple-600 to-indigo-600 text-white px-8 py-4 rounded-xl shadow-2xl animate-bounce text-xl">
          <p className="font-bold">
            {mode === "pomodoro"
              ? "Good Job! Take a break! 🎉"
              : "Break's over! Let's focus! 💪"}
          </p>
        </div>
      )}
      {sessionMessage && (
        <div className="mb-6 text-2xl font-semibold text-gray-800 dark:text-gray-200 transition-all duration-300">
          {sessionMessage}
        </div>
      )}
      <div className="w-full max-w-md px-6 py-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
        <TimerMode
          mode={mode}
          onModeChange={(newMode) => {
            // If the user manually changes the mode, pause the timer.
            setIsRunning(false);
            setMode(newMode);
          }}
        />
        <div
          className={`my-10 relative aspect-square w-full max-w-xs mx-auto transition-transform duration-300 ${
            time === 0 ? "animate-shake" : ""
          }`}
        >
          <Watch
            minutes={formatTime(time).split(":")[0]}
            seconds={formatTime(time).split(":")[1]}
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

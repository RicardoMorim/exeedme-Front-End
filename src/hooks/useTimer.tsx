import { useState, useEffect } from "react";
import { Mode, WatchSkin } from "../types";

export function useTimer() {
  const [mode, setMode] = useState<Mode>("pomodoro");
  const [time, setTime] = useState(25 * 60);
  const [initialTime, setInitialTime] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [currentSkin, setCurrentSkin] = useState<WatchSkin>("digital");

  useEffect(() => {
    if (mode === "pomodoro") {
      setTime(25 * 60);
      setInitialTime(25 * 60);
    } else {
      setTime(5 * 60);
      setInitialTime(5 * 60);
    }
  }, [mode]);

  return {
    mode,
    setMode,
    time,
    setTime,
    initialTime,
    setInitialTime,
    isRunning,
    setIsRunning,
    currentSkin,
    setCurrentSkin,
  };
}

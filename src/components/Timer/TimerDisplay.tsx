import { useState, useEffect } from "react";
import { FiWatch } from "react-icons/fi";
import TimerMode from "./TimerMode";
import TimerControls from "./TimerControls";
import WatchSkinModal from "./WatchSkinModal";
import { Mode, WatchSkin } from "../../types";
import WatchDigital from "../Watch/WatchDigital";
import WatchAnalogic from "../Watch/WatchAnalogic";
import WatchAnalogicClassic from "../Watch/WatchAnalogicClassic";
import WatchAnalogicSimple from "../Watch/WatchAnalogicSimple";
import WatchFit from "../Watch/WatchFit";
import WatchFitSlim from "../Watch/WatchFitSlim";
import WatchSimple from "../Watch/WatchSimple";
import SimpleStopwatch from "../Watch/SimpleStopWatch";

interface TimerDisplayProps {
  mode: Mode;
  setMode: React.Dispatch<React.SetStateAction<Mode>>;
  time: number;
  setTime: React.Dispatch<React.SetStateAction<number>>;
  initialTime: number;
  setInitialTime: React.Dispatch<React.SetStateAction<number>>;
  isRunning: boolean;
  setIsRunning: React.Dispatch<React.SetStateAction<boolean>>;
  currentSkin: WatchSkin;
  setCurrentSkin: React.Dispatch<React.SetStateAction<WatchSkin>>;
}

export default function TimerDisplay({
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
}: TimerDisplayProps) {
  const [showNotification, setShowNotification] = useState(false);
  const [isSkinModalOpen, setIsSkinModalOpen] = useState(false);

  useEffect(() => {
    return () => {
      setIsRunning(false);
    };
  }, [setIsRunning]);

  useEffect(() => {
    if (time === 2) {
      setShowNotification(true);
      const audio = new Audio("/audio/notification.mp3");
      audio.play().catch(() => {});
      setTimeout(() => setShowNotification(false), 6000);
    }
  }, [time]);

  // Recursive timeout for countdown.
  useEffect(() => {
    if (!isRunning) return;

    const timeoutId = setTimeout(() => {
      if (time > 0) {
        setTime(time - 1);
      } else {
        const nextMode: Mode = mode === "pomodoro" ? "shortBreak" : "pomodoro";
        setMode(nextMode);
      }
    }, 1000);

    return () => clearTimeout(timeoutId);
  }, [isRunning, time, mode, setMode, setTime]);

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
  };

  const formatTime = (seconds: number): string => {
    const mins = Math.floor(seconds / 60)
      .toString()
      .padStart(2, "0");
    const secs = (seconds % 60).toString().padStart(2, "0");
    return `${mins}:${secs}`;
  };

  const renderCurrentWatch = () => {
    const props = {
      minutes: formatTime(time).split(":")[0],
      seconds: formatTime(time).split(":")[1],
      initialSeconds: initialTime,
      totalSeconds: time,
      isRunning,
      onStart: handleStart,
      onPause: handlePause,
      onReset: handleReset,
    };

    switch (currentSkin) {
      case "digital":
        return <WatchDigital {...props} />;
      case "analogic":
        return <WatchAnalogic {...props} />;
      case "analogicClassic":
        return <WatchAnalogicClassic {...props} />;
      case "analogicSimple":
        return <WatchAnalogicSimple {...props} />;
      case "fit":
        return <WatchFit {...props} />;
      case "fitSlim":
        return <WatchFitSlim {...props} />;
      case "simple":
        return <WatchSimple {...props} />;
      case "SimpleStopWatch":
        return (
          <SimpleStopwatch
            {...{
              ...props,
              minutes: parseInt(props.minutes),
              seconds: parseInt(props.seconds),
            }}
          />
        );
      default:
        return <WatchDigital {...props} />;
    }
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
      <div className="w-full max-w-md px-6 py-8 bg-white dark:bg-gray-800 rounded-2xl shadow-xl">
        <TimerMode
          mode={mode}
          onModeChange={(newMode) => {
            setIsRunning(false);
            setMode(newMode);
          }}
        />
        {/* Updated container for consistent watch centering */}
        <div className="relative flex items-center justify-center">
          <div
            className={`my-10 mx-auto flex items-center justify-center aspect-square w-full max-w-xs transition-transform duration-300 ${
              time === 0 ? "animate-shake" : ""
            }`}
          >
            {renderCurrentWatch()}
          </div>
          <button
            onClick={() => setIsSkinModalOpen(true)}
            className="absolute -right-4 top-0 p-2 rounded-full bg-white dark:bg-gray-700 shadow-md hover:shadow-lg transition-all hover:scale-110"
            title="Change Watch Style"
          >
            <FiWatch className="w-5 h-5 text-purple-600" />
          </button>
        </div>
        <TimerControls
          isRunning={isRunning}
          onStart={handleStart}
          onPause={handlePause}
          onReset={handleReset}
        />
      </div>

      <WatchSkinModal
        isOpen={isSkinModalOpen}
        onClose={() => setIsSkinModalOpen(false)}
        currentSkin={currentSkin}
        onSkinChange={setCurrentSkin}
        time={{
          minutes: formatTime(time).split(":")[0],
          seconds: formatTime(time).split(":")[1],
        }}
        initialSeconds={initialTime}
        totalSeconds={time}
      />
    </div>
  );
}

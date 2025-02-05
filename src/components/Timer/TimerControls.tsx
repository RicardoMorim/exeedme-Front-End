import React from "react";
import { TimerControlsProps } from "../../types/index";

const TimerControls: React.FC<TimerControlsProps> = ({
  isRunning,
  onStart,
  onPause,
  onReset,
}) => {
  return (
    <div className="flex gap-4 justify-center mt-4">
      {!isRunning ? (
        <button
          onClick={onStart}
          className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded"
        >
          Start
        </button>
      ) : (
        <button
          onClick={onPause}
          className="bg-yellow-500 hover:bg-yellow-600 text-white font-bold py-2 px-4 rounded"
        >
          Pause
        </button>
      )}
      <button
        onClick={onReset}
        className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded"
      >
        Reset
      </button>
    </div>
  );
};

export default TimerControls;

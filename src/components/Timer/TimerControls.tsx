import { TimerControlsProps } from "../../types/index";
import { FaPlay, FaPause, FaRedo } from "react-icons/fa";

const TimerControls: React.FC<TimerControlsProps> = ({
  isRunning,
  onStart,
  onPause,
  onReset,
}) => {
  return (
    <div className="flex items-center justify-center gap-8 mt-8">
      <button
        onClick={onReset}
        className="w-12 h-12 rounded-full flex items-center justify-center
                 bg-gray-200 hover:bg-gray-300 dark:bg-gray-700 dark:hover:bg-gray-600
                 text-gray-700 dark:text-gray-200
                 transition-all duration-300 hover:scale-110
                 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-400
                 shadow-lg"
        title="Reset Timer"
      >
        <FaRedo className="w-5 h-5" />
      </button>

      <button
        onClick={isRunning ? onPause : onStart}
        className={`w-16 h-16 rounded-full flex items-center justify-center
                   transition-all duration-300 hover:scale-110
                   focus:outline-none focus:ring-2 focus:ring-offset-2
                   shadow-lg ${
                     isRunning
                       ? "bg-amber-500 hover:bg-amber-600 focus:ring-amber-400"
                       : "bg-emerald-500 hover:bg-emerald-600 focus:ring-emerald-400"
                   }`}
        title={isRunning ? "Pause Timer" : "Start Timer"}
      >
        {isRunning ? (
          <FaPause className="w-6 h-6 text-white" />
        ) : (
          <FaPlay className="w-6 h-6 text-white ml-1" />
        )}
      </button>
    </div>
  );
};

export default TimerControls;
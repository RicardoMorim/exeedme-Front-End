import { Mode } from "../../types/index";
import { TimerModeProps } from "../../types/index";

export default function TimerMode({ mode, onModeChange }: TimerModeProps) {
  const modes = [
    { label: "Trabalho", value: "pomodoro" },
    { label: "Descanso", value: "shortBreak" },
  ];

  return (
    <div className="flex justify-center space-x-4 my-4">
      {modes.map(({ label, value }) => (
        <button
          key={value}
          onClick={() => onModeChange(value as Mode)}
          className={`px-4 py-2 rounded transition-colors ${
            mode === value
              ? "bg-primary-600 text-white"
              : "bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-200"
          }`}
        >
          {label}
        </button>
      ))}
    </div>
  );
}

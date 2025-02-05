import { Mode } from "../../types/index";
import { TimerModeProps } from "../../types/index";
import { FaBrain, FaCoffee } from "react-icons/fa";

export default function TimerMode({ mode, onModeChange }: TimerModeProps) {
  const modes = [
    { 
      label: "Trabalho", 
      value: "pomodoro",
      icon: <FaBrain className="w-4 h-4 mr-2" />,
      gradient: "from-purple-600 to-indigo-600"
    },
    { 
      label: "Descanso", 
      value: "shortBreak",
      icon: <FaCoffee className="w-4 h-4 mr-2" />,
      gradient: "from-emerald-500 to-teal-500"
    },
  ];

  return (
    <div className="flex justify-center space-x-6 mb-8">
      {modes.map(({ label, value, icon, gradient }) => (
        <button
          key={value}
          onClick={() => onModeChange(value as Mode)}
          className={`
            flex items-center justify-center
            px-6 py-3 rounded-full
            font-medium text-sm md:text-base
            transform transition-all duration-300
            hover:scale-105 active:scale-95
            focus:outline-none focus:ring-2 focus:ring-offset-2
            ${mode === value
              ? `bg-gradient-to-r ${gradient} text-white shadow-lg
                 focus:ring-opacity-50 focus:ring-${value === "pomodoro" ? "indigo" : "emerald"}-400`
              : "bg-gray-100 dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-200 dark:hover:bg-gray-700"
            }
          `}
          aria-pressed={mode === value}
          role="switch"
        >
          {icon}
          {label}
        </button>
      ))}
    </div>
  );
}
interface StopwatchProps {
    seconds: number;
    minutes: number;
    totalSeconds: number;
    initialSeconds: number;
}

const SimpleStopwatch: React.FC<StopwatchProps> = ({
    seconds,
    minutes,
    totalSeconds,
    initialSeconds,
}) => {
    // Calculate progress for the circular indicator
    const progress = Math.min((totalSeconds / initialSeconds) * 283, 283);
    const formattedMinutes = minutes.toString().padStart(2, "0");
    const formattedSeconds = seconds.toString().padStart(2, "0");

    return (
        <div className="flex items-center justify-center">
            <div className="relative w-64 h-64">
                {/* Circular progress background */}
                <svg className="w-full h-full transform rotate-[-90deg]">
                    <circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        className="fill-none "
                        strokeWidth="8"
                    />
                    {/* Animated progress circle */}
                    <circle
                        cx="50%"
                        cy="50%"
                        r="45%"
                        className="fill-none stroke-blue-500 transition-all duration-1000 ease-out"
                        strokeWidth="8"
                        strokeDasharray="283"
                        strokeDashoffset={283 - progress}
                        strokeLinecap="round"
                    />
                </svg>

                {/* Time display */}
                <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-center">
                    <div className="text-4xl font-bold text-white mb-1">
                        {formattedMinutes}:{formattedSeconds}
                    </div>
                    <div className="text-sm text-gray-500 font-medium">Time Elapsed</div>
                </div>

            </div>
        </div>
    );
};

export default SimpleStopwatch;

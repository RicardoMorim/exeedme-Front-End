interface WatchSimpleProps {
  minutes: string;
  seconds: string;
  initialSeconds: number;
  totalSeconds: number;
}

const WatchSimple: React.FC<WatchSimpleProps> = ({
  minutes,
  seconds,
  initialSeconds,
  totalSeconds,
}) => {
  // Calculate progress: 0 when starting, 1 when finished
  const progress = initialSeconds > 0 ? 1 - totalSeconds / initialSeconds : 0;
  // Interpolate between green (0,255,0) and red (255,0,0)
  const r = Math.round(255 * progress);
  const g = Math.round(255 * (1 - progress));
  const borderColor = `rgb(${r}, ${g}, 0)`;

  return (
    <div className="flex items-center justify-center p-4">
      <div
        className="relative font-mono font-extrabold text-8xl grid grid-cols-2 text-right text-white gap-x-1 rounded-lg overflow-hidden border-4"
        style={{
          borderColor,
          boxShadow: "0 0 10px rgba(0,0,0,0.2)",
        }}
      >
        {/* Decorative underline */}
        <div className="absolute inset-x-0 -bottom-3 flex justify-center">
          <div className="w-3/4 h-2 bg-yellow-300 rounded-full"></div>
        </div>

        {/* Minutes Display */}
        <div className="relative py-6 px-4 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
          <span className="relative z-10">{minutes}</span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-px w-full bg-gray-700"></div>
          </div>
        </div>

        {/* Seconds Display */}
        <div className="relative py-6 px-4 flex items-center justify-center">
          <div className="absolute inset-0 bg-gradient-to-br from-gray-800 to-gray-900"></div>
          <span className="relative z-10">{seconds}</span>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="h-px w-full bg-gray-700"></div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default WatchSimple;

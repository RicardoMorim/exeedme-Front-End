interface WatchFitSlimProps {
  minutes: string;
  seconds: string;
  initialSeconds: number;
  totalSeconds: number;
}

const WatchFitSlim: React.FC<WatchFitSlimProps> = ({ minutes, seconds }) => {
  // Simulate heart rate (just for visual effect)
  const heartRate = Math.floor(Math.random() * (90 - 75) + 75);

  return (
    <div className="after:-z-20 after:absolute after:w-20 after:h-80 after:bg-sky-700 after:rounded-2xl after:shadow-inner after:shadow-slate-900 relative rounded-2xl shadow-inner shadow-gray-50 flex flex-col justify-evenly items-center w-28 h-48 bg-sky-700 text-gray-50 after:outline-double after:-outline-offset-8 after:outline-sky-800">
      <div className="absolute w-24 h-44 bg-neutral-900 rounded-2xl flex flex-col justify-around items-center before:absolute before:w-8 before:h-8 before:bg-sky-400 before:rounded-full before:blur-xl before:top-16 before:right-6 before:w-12 before:h-12 outline-double -outline-offset-4 outline-sky-800">
        <div className="flex flex-col font-extrabold text-6xl z-10">
          <span>{minutes}</span>
          <span>{seconds}</span>
        </div>
        <div className="flex flex-row justify-center items-center gap-1 font-thin">
          <span>{heartRate}</span>
          <svg
            viewBox="0 0 100 100"
            className="w-5 h-5 fill-red-500 animate-pulse"
          >
            <path
              fillRule="evenodd"
              d="M23,27.6a15.8,15.8,0,0,1,22.4,0L50,32.2l4.6-4.6A15.8,15.8,0,0,1,77,50L50,77,23,50A15.8,15.8,0,0,1,23,27.6Z"
            />
          </svg>
        </div>
      </div>
    </div>
  );
};

export default WatchFitSlim;

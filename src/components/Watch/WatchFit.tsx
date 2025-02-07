interface WatchFitProps {
  minutes: string;
  seconds: string;
  initialSeconds: number;
  totalSeconds: number;
}

const WatchFit: React.FC<WatchFitProps> = ({ minutes, seconds }) => {
  // Get current date for display
  const date = new Date();
  const dateStr = date.toLocaleDateString("en-US", {
    weekday: "short",
    month: "short",
    day: "numeric",
  });

  // Simulate heart rate based on remaining time (just for visual effect)
  const heartRate = Math.floor(Math.random() * (90 - 75) + 75);

  return (
    <div className="before:absolute before:bg-sky-500 before:w-3 before:h-12 before:top-24 before:-right-2 before:-z-10 before:rounded-2xl before:shadow-inner before:shadow-gray-50 relative w-60 h-60 bg-sky-500 shadow-inner shadow-gray-50 flex justify-center items-center rounded-3xl">
      <div className="w-56 h-56 bg-neutral-900 shadow-inner shadow-gray-50 flex justify-center items-center rounded-3xl">
        <div className="flex flex-col items-center justify-center rounded-2xl bg-neutral-900 shadow-inner shadow-gray-50 w-52 h-52">
          <div className="before:absolute before:w-12 before:h-12 before:bg-orange-800 before:rounded-full before:blur-xl before:top-16 relative flex flex-col justify-around items-center w-44 h-40 bg-neutral-900 text-gray-50">
            <span>{dateStr}</span>
            <span className="z-10 flex items-center text-6xl text-amber-600 [text-shadow:_2px_2px_#fff,_1px_2px_#fff]">
              {minutes}
              <span className="text-xl font-bold text-gray-50 [text-shadow:none]">
                :
              </span>
              {seconds}
            </span>
            <div className="text-gray-50 w-48 flex flex-row justify-evenly">
              <span className="text-xs font-bold">{heartRate}</span>
              <div className="flex flex-row items-center gap-2">
                <svg
                  viewBox="0 0 100 100"
                  className="w-5 h-5 fill-red-500 animate-bounce"
                >
                  <path
                    fillRule="evenodd"
                    d="M23,27.6a15.8,15.8,0,0,1,22.4,0L50,32.2l4.6-4.6A15.8,15.8,0,0,1,77,50L50,77,23,50A15.8,15.8,0,0,1,23,27.6Z"
                  />
                </svg>
                <svg viewBox="0 0 100 100" className="w-5 h-5 fill-current">
                  <path d="M59.5,20.5a3.9,3.9,0,0,0-2.5-2,4.3,4.3,0,0,0-3.3.5,11.9,11.9,0,0,0-3.2,3.5,26,26,0,0,0-2.3,4.4,76.2,76.2,0,0,0-3.3,10.8,120.4,120.4,0,0,0-2.4,14.2,11.4,11.4,0,0,1-3.8-4.2c-1.3-2.7-1.5-6.1-1.5-10.5a4,4,0,0,0-2.5-3.7,3.8,3.8,0,0,0-4.3.9,27.7,27.7,0,1,0,39.2,0,62.4,62.4,0,0,1-5.3-5.8A42.9,42.9,0,0,1,59.5,20.5ZM58.4,70.3a11.9,11.9,0,0,1-20.3-8.4s3.5,2,9.9,2c0-4,2-15.9,5-17.9a21.7,21.7,0,0,0,5.4,7.5,11.8,11.8,0,0,1,3.5,8.4A12,12,0,0,1,58.4,70.3Z" />
                </svg>
              </div>
            </div>
          </div>
          <span className="text-gray-700 text-lg font-light">ExeedFit</span>
        </div>
      </div>
    </div>
  );
};

export default WatchFit;

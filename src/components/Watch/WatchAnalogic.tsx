import styled from "styled-components";

interface WatchAnalogicProps {
  minutes: string;
  seconds: string;
  initialSeconds: number;
  totalSeconds: number;
  // If false, only one moving pointer will be shown (and that pointer does a full revolution during the timer)
  hasMinutePointer?: boolean;
}

const WatchAnalogic: React.FC<WatchAnalogicProps> = ({
  initialSeconds,
  totalSeconds,
  hasMinutePointer = true,
}) => {
  // Calculate elapsed seconds (assuming timer counts down)
  const elapsedSeconds = initialSeconds - totalSeconds;

  // For the hour hand we want it fixed at 0 degrees (pointing at the 0 hours marker)
  const hourDegrees = 0;

  // If there is a minute pointer, then
  // - seconds pointer: rotate full circle each minute
  // - minute pointer: gradual progress over initialSeconds → full 360°
  const secondsDegrees = hasMinutePointer
    ? ((elapsedSeconds % 60) / 60) * 360
    : (elapsedSeconds / initialSeconds) * 360;
  const minutesDegrees = hasMinutePointer
    ? (elapsedSeconds / initialSeconds) * 360
    : 0;

  return (
    <StyledWrapper>
      <div className="realistic-clock">
        <div className="clock-face">
          <div className="glass-cover" />
          {/* Fixed hour pointer */}
          <div
            className="hour hand"
            style={{ transform: `translateX(-50%) rotate(${hourDegrees}deg)` }}
          />
          {/* Conditionally render minute pointer */}
          {hasMinutePointer && (
            <div
              className="minute hand"
              style={{
                transform: `translateX(-50%) rotate(${minutesDegrees}deg)`,
              }}
            />
          )}
          <div
            className="second hand"
            style={{
              transform: `translateX(-50%) rotate(${secondsDegrees}deg)`,
            }}
          />
          <div className="center-circle" />
          <div className="clock-numbers">
            <p style={{ top: "0.5px", left: 135 }} className="number">
              12
            </p>
            <p style={{ top: 100, right: 10 }} className="number">
              3
            </p>
            <p style={{ bottom: "0.5px", left: 135 }} className="number">
              6
            </p>
            <p style={{ top: 100, left: 10 }} className="number">
              9
            </p>
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .realistic-clock {
    position: relative;
    width: 300px;
    height: 300px;
    margin: 0 auto;
  }

  .clock-face {
    position: relative;
    width: 100%;
    height: 100%;
    background: radial-gradient(circle, #333, #111);
    border-radius: 50%;
    border: 10px solid #cec5c5;
    box-shadow: 0 0 30px rgba(0, 0, 0, 0.5),
      inset 0 0 20px rgba(255, 255, 255, 0.1);
  }

  .glass-cover {
    position: absolute;
    width: 100%;
    height: 100%;
    top: 0;
    left: 0;
    border-radius: 50%;
    background: rgba(255, 255, 255, 0.05);
    box-shadow: inset 0 0 10px rgba(255, 255, 255, 0.3);
    pointer-events: none;
  }

  .center-circle {
    position: absolute;
    width: 20px;
    height: 20px;
    background: radial-gradient(circle, #666, #333);
    border-radius: 50%;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    box-shadow: 0 0 10px rgba(0, 0, 0, 0.8);
  }

  .hand {
    position: absolute;
    background: #222;
    border-radius: 2px;
    left: 50%;
    transform-origin: bottom;
    transition: transform 0.1s cubic-bezier(0.4, 2.08, 0.55, 0.44);
    box-shadow: 0 0 5px rgba(0, 0, 0, 0.7);
  }

  .hour {
    width: 10px;
    height: 100px;
    top: 70px;
    background: linear-gradient(to bottom, #1d6981, #444);
  }

  .minute {
    width: 6px;
    height: 100px;
    top: 60px;
    background: linear-gradient(to bottom, #bbb, #666);
    transform-origin: 50% 83%;
  }

  .second {
    width: 3px;
    height: 100px;
    top: 45px;
    background: red;
  }

  .number {
    position: absolute;
    font-size: 20px;
    font-weight: bold;
    color: #fff;
    text-shadow: 0 0 5px rgba(0, 0, 0, 0.8);
  }
`;

export default WatchAnalogic;

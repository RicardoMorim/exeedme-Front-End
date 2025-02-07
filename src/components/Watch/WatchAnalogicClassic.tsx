import styled from "styled-components";

interface WatchAnalogicClassicProps {
  minutes: string;
  seconds: string;
  initialSeconds: number;
  totalSeconds: number;
}

const WatchAnalogicClassic: React.FC<WatchAnalogicClassicProps> = ({
  initialSeconds,
  totalSeconds,
}) => {
  // Calculate elapsed seconds from the timer
  const elapsedSeconds = initialSeconds - totalSeconds;

  // The hour pointer remains fixed at 0° (pointing at the 0 hours marker)
  const hoursDegrees = 0;
  // Minute pointer: progresses gradually over the full timer duration (0 to 360°)
  const minutesDegrees = (elapsedSeconds / initialSeconds) * 360;
  // Seconds pointer: makes a full revolution each minute
  const secondsDegrees = ((elapsedSeconds % 60) / 60) * 360;

  return (
    <StyledWrapper>
      <div className="face">
        <p className="v-index">II</p>
        <p className="h-index">II</p>
        <div className="hand">
          <div className="hand">
            <div
              className="hour"
              style={{ transform: `rotate(${hoursDegrees}deg)` }}
            />
            <div
              className="minute"
              style={{ transform: `rotate(${minutesDegrees}deg)` }}
            />
            <div
              className="second"
              style={{ transform: `rotate(${secondsDegrees}deg)` }}
            />
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .face {
    position: relative;
    width: 180px;
    height: 180px;
    border-radius: 50%;
    outline: 10px solid #333;
    background: repeating-radial-gradient(
        circle at 50% 50%,
        rgba(200, 200, 200, 0.2) 0%,
        rgba(200, 200, 200, 0.2) 2%,
        transparent 2%,
        transparent 3%,
        rgba(200, 200, 200, 0.2) 3%,
        transparent 3%
      ),
      conic-gradient(
        white 0%,
        silver 10%,
        white 35%,
        silver 45%,
        white 60%,
        silver 70%,
        white 80%,
        silver 95%,
        white 100%
      );
    box-shadow: inset 0 0 20px #0007;
  }

  .hour {
    position: absolute;
    width: 5px;
    height: 60px;
    background: #aaa;
    left: 87.5px;
    top: 43px;
    border-radius: 3px 3px 1px 1px;
    transform-origin: 2px 47px;
    box-shadow: 0 0 5px #0005, inset 1.5px 3px 0px #333,
      inset -1.5px -3px 0px #333;
    z-index: 1;
    transition: transform 0.1s cubic-bezier(0.4, 2.08, 0.55, 0.44);
  }

  .minute {
    position: absolute;
    width: 4px;
    height: 78px;
    background: #aaa;
    left: 88px;
    top: 25px;
    border-radius: 3px 3px 1px 1px;
    transform-origin: 2px 65px;
    box-shadow: 0 0 5px #0005, inset 1.5px 3px 0px #333,
      inset -1.5px -3px 0px #333;
    z-index: 2;
    transition: transform 0.1s cubic-bezier(0.4, 2.08, 0.55, 0.44);
  }

  .second {
    position: absolute;
    width: 10px;
    height: 10px;
    background: red;
    left: 85px;
    top: 85px;
    border-radius: 50%;
    border: 1px solid #eee;
    z-index: 3;
    transform-origin: center;
    transition: transform 0.1s cubic-bezier(0.4, 2.08, 0.55, 0.44);
  }

  .second::before {
    content: "";
    position: absolute;
    width: 1px;
    height: 85px;
    left: 3px;
    bottom: -10px;
    background: red;
    border-radius: 2px;
    box-shadow: 5px 0 2px rgba(128, 128, 128, 0.2);
  }

  .second::after {
    content: "";
    position: absolute;
    width: 4px;
    height: 4px;
    left: 2px;
    top: 2px;
    background: #555;
    border-radius: 50%;
  }

  .v-index {
    position: absolute;
    color: #333;
    font-size: 24px;
    left: 83.5px;
    top: -3px;
    text-shadow: 0 157px 0 #333;
    z-index: 1;
  }

  .h-index {
    position: absolute;
    color: #333;
    font-size: 24px;
    top: 72px;
    left: 5px;
    transform: rotate(-90deg);
    text-shadow: 0 158px 0 #333;
    z-index: 1;
  }
`;

export default WatchAnalogicClassic;

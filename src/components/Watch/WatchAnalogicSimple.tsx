import styled from "styled-components";

interface WatchAnalogicSimpleProps {
  initialSeconds: number;
  totalSeconds: number;
}

const ClockWrapper = styled.div`
  position: absolute;
  width: 300px;
  height: 300px;
  border: 20px solid #b06a26;
  border-radius: 50%;
  left: 50%;
  top: 50%;
  background: #fefbf2;
  transform: translate(-50%, -50%);
  box-shadow: inset 0px 0px 10px black;
`;

const MinuteHand = styled.div<{ rotation: number }>`
  position: absolute;
  height: 100px;
  width: 10px;
  background: black;
  top: 50%;
  left: calc(50% - 5px);
  border-radius: 5px;
  transform-origin: top;
  transform: rotate(${(props) => props.rotation}deg);
  transition: transform 0.1s cubic-bezier(0.4, 2.08, 0.55, 0.44);
`;

const SecondHand = styled.div<{ rotation: number }>`
  position: absolute;
  height: 130px;
  width: 10px;
  background: black;
  top: 50%;
  left: calc(50% - 5px);
  border-radius: 5px;
  transform-origin: top;
  transform: rotate(${(props) => props.rotation}deg);
  transition: transform 0.1s cubic-bezier(0.4, 2.08, 0.55, 0.44);
`;

const ClockContainer = styled.div`
  margin: 0;
  padding: 0;
  position: relative;

  &::before {
    content: "";
    position: absolute;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #b06a26;
    left: 50%;
    top: 50%;
    transform: translate(-50%, -50%);
    z-index: 1;
  }

  &::after {
    content: "";
    position: absolute;
    width: 10px;
    height: 10px;
    border-radius: 50%;
    background: black;
    left: 50%;
    top: calc(50% - 145px);
    z-index: 2;
    transform: translateX(-50%);
    box-shadow: 140px 145px 0 0 black, -140px 145px 0 0 black, 0 280px 0 0 black;
  }
`;

const WatchAnalogicSimple: React.FC<WatchAnalogicSimpleProps> = ({
  initialSeconds,
  totalSeconds,
}) => {
  // Calculate elapsed seconds from the timer progress
  const elapsedSeconds = initialSeconds - totalSeconds;
  // Adjusting by -180deg so that at 0, the hands point upwards.
  const secondsDegrees = ((elapsedSeconds % 60) / 60) * 360 - 180;
  const minutesDegrees = (elapsedSeconds / initialSeconds) * 360 - 180;

  return (
    <ClockContainer>
      <ClockWrapper>
        <MinuteHand rotation={minutesDegrees} />
        <SecondHand rotation={secondsDegrees} />
      </ClockWrapper>
    </ClockContainer>
  );
};

export default WatchAnalogicSimple;

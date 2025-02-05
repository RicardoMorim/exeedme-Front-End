import styled from "styled-components";

interface WatchProps {
  minutes: string;
  seconds: string;
}
const Watch = ({ seconds, minutes }: WatchProps) => {
  return (
    <StyledWrapper>
      <div className="watch-container">
        <div className="watch">
          <div className="frame">
            <div className="text">
              <div>{seconds}</div>
              <div>{minutes}</div>
            </div>
          </div>
          <div className="sideBtn" />
          <div className="powerBtn" />
          <div className="dots">
            <span className="dot" />
            <span className="dot" />
            <span className="dot" />
          </div>
        </div>
      </div>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .watch-container {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 70dvh;
  }
  .watch {
    position: relative;
    transform: scale(0.7);
  }
  .watch::after,
  .watch::before {
    content: "";
    width: 10rem;
    height: 300px;
    background: radial-gradient(circle at 200px, rgb(0, 0, 0), rgb(48, 48, 48));
    box-shadow: inset 0px -10px 18px #ffffffb9, 10px 0px 30px #00000071;
    position: absolute;
    left: 50%;
    transform: translate(-50%, 0%);
  }
  .watch::before {
    content: "";
    width: 10rem;
    height: 200px;
    background: radial-gradient(circle at 200px, rgb(0, 0, 0), rgb(48, 48, 48));
    box-shadow: inset 0px 10px 18px #ffffffb9, 10px 0px 30px #00000071;
    position: absolute;
    left: 50%;
    transform: translate(-50%, -100%);
  }
  .dots {
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 140%);
    padding: 3px;
    z-index: 20;
  }
  .dots .dot {
    width: 17px;
    aspect-ratio: 1;
    background-color: #000000;
    border-radius: 100px;
    display: block;
    margin-bottom: 50px;
    box-shadow: inset 2px 0 5px #ffffff48;
  }
  .frame {
    background: #0d0d0d;
    border-radius: 92px;
    box-shadow: inset 0 0 24px 1px #0d0d0d, inset 0 0 0 12px #606c78,
      0 20px 30px #00000071;
    height: 380px;
    margin: 0 20px;
    padding: 28px 26px;
    position: relative;
    width: 20rem;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
  }
  .text {
    color: #dddf8f;
    font-size: 10rem;
    font-family: serif;
    font-weight: bolder;
    line-height: 0.8;
    text-shadow: 0 0 40px #d7d886c7;
  }
  .frame::before {
    border: 1px solid #0d0d0d;
    border-radius: 80px;
    box-shadow: 0 0 12px rgba(255, 255, 255, 0.5),
      inset 0 0 12px 2px rgba(255, 255, 255, 0.75);
    content: "";
    height: 356px;
    left: 12px;
    position: absolute;
    top: 12px;
    width: 18.625rem;
  }
  .sideBtn {
    background: #606c78;
    border-left: 1px solid #000;
    border-radius: 8px 6px 6px 8px / 20px 6px 6px 20px;
    box-shadow: inset 8px 0 8px 0 #1c1f23, inset -2px 0 6px #272c31,
      -4px 0 8px #0d0d0d40;
    height: 72px;
    position: absolute;
    right: 6px;
    top: 108px;
    width: 18px;
    z-index: 9;
  }
  .sideBtn::before {
    background: #272c31;
    border-radius: 20%;
    box-shadow: 0 -30px rgba(62, 70, 77, 0.75), 0 -27px #272c31, 0 -25px #000,
      0 -21px rgba(62, 70, 77, 0.75), 0 -18px #272c31, 0 -16px #000,
      0 -12px rgba(62, 70, 77, 0.75), 0 -9px #272c31, 0 -7px #000,
      0 -3px rgba(62, 70, 77, 0.75), 0 0 #272c31, 0 2px #000,
      0 6px rgba(62, 70, 77, 0.75), 0 9px #272c31, 0 11px #000,
      0 15px rgba(62, 70, 77, 0.75), 0 18px #272c31, 0 20px #000,
      0 24px rgba(62, 70, 77, 0.75), 0 27px #272c31, 0 29px #000;
    content: "";
    height: 3px;
    margin-top: -2px;
    position: absolute;
    right: 2px;
    top: 50%;
    width: 10px;
    z-index: 9;
  }
  .sideBtn::after {
    background: #16181b;
    border-radius: 2px 4px 4px 2px / 20px 8px 8px 20px;
    box-shadow: inset -2px 0 2px 0 #000, inset -6px 0 18px #272c31;
    content: "";
    height: 72px;
    position: absolute;
    right: 0;
    top: 0;
    width: 6px;
  }

  .powerBtn {
    background: #272c31;
    border-radius: 2px 4px 4px 2px / 2px 8px 8px 2px;
    box-shadow: inset 0 0 2px 1px #101315;
    height: 72px;
    position: absolute;
    right: 18px;
    top: 212px;
    width: 4px;
  }
`;

export default Watch;

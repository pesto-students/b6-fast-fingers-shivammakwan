import React from "react";
import gamepadIcon from "../../assets/icons/gamepad-icon.svg";
import personIcon from "../../assets/icons/person-icon.svg";
import { MinutesAndSeconds } from "../MinutesAndSeconds/MinutesAndSeconds";
import { useLocation } from "react-router-dom";

export const Navbar = ({ onStopTimer, playerName, level }) => {
  const location = useLocation();
  const [seconds, setSeconds] = React.useState(0);
  let timerInterval = React.useRef(null);

  React.useEffect(() => {
    timerInterval.current = setInterval(() => {
      setSeconds((prev) => parseFloat((prev + 1).toFixed(2)));
    }, 1000);

    let pathname = location.pathname.split("?")[0];
    if (pathname === "/player/over") {
      onStopTimer(seconds);
      clearInterval(timerInterval.current);
    } else {
      setSeconds(0);
    }

    return () => {
      clearInterval(timerInterval.current);
    };
  }, [location.pathname]);

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        padding: "0 20px",
      }}
    >
      <div style={{ display: "flex", flexDirection: "column" }}>
        <div className="d-flex">
          <img src={personIcon} />
          <span className="font-primary font-30 text-uppercase ml-3">
            {playerName}
          </span>
        </div>
        <div className="d-flex">
          <img src={gamepadIcon} />
          <span className="font-primary font-30 text-uppercase ml-3">
            LEVEL : {level}
          </span>
        </div>
        {/* <span>FACTOR - {difficultyFactor}</span> */}
      </div>
      <div style={{ display: "flex", flexDirection: "column" }}>
        <span className="font-primary font-30 text-uppercase ml-3">
          FAST FINGERS
        </span>
        <span className="font-primary font-30 text-uppercase ml-3">
          <MinutesAndSeconds totalSeconds={seconds} />
        </span>
      </div>
    </div>
  );
};

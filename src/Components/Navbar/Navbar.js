import React from "react";
import { useDataLayerValue } from "../../Context/DataLayer";
import gamepadIcon from "../../assets/icons/gamepad-icon.svg";
import personIcon from "../../assets/icons/person-icon.svg";
import { MinutesAndSeconds } from "../MinutesAndSeconds/MinutesAndSeconds";
import { ScoreTimer } from "../ScoreTimer/ScoreTimer";

export const Navbar = () => {
  const [
    { playerName, level, difficultyFactor, scores, status },
    dispatch,
  ] = useDataLayerValue();
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
          {status === "PLAYING" && <>SCORE -&nbsp;</>}
          <ScoreTimer />
        </span>
      </div>
    </div>
  );
};

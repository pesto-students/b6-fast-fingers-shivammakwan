import React, { useEffect } from "react";
import reloadIcon from "../../../assets/icons/reload-icon.svg";
import { MinutesAndSeconds } from "../../../Components/MinutesAndSeconds/MinutesAndSeconds";
import { useHistory } from "react-router-dom";
import "./GameOver.scss";

const GameOver = ({ scores, playerName }) => {
  const history = useHistory();

  useEffect(() => {
    console.log(scores, playerName);
  }, []);

  return (
    <div className="game__over">
      <span className="l1">GAME OVER!</span> <br />
      <span className="l2">
        {scores?.isHighScore ? "New High Score" : "Your Score"}
      </span>
      <span className="score">
        <MinutesAndSeconds totalSeconds={scores?.seconds} />
      </span>
      <div
        className="d-flex justify-content-center align-items-center mt-4 btn"
        onClick={() => {
          history.push({
            pathname: `/player/play`,
            search: `playerName=${playerName}&level=EASY`,
          });
        }}
      >
        <img src={reloadIcon} style={{ height: "3rem" }} />
        <span
          style={{ fontSize: "27px", marginTop: "8px", marginLeft: "20px" }}
          className="font-primary font-weight-bold"
        >
          PLAY AGAIN
        </span>
      </div>
    </div>
  );
};
export default GameOver;

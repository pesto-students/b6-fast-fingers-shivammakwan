import React from "react";
import { useDataLayerValue } from "../../Context/DataLayer";
import "./GameOver.scss";
import reloadIcon from "../../assets/icons/reload-icon.svg";
import { MinutesAndSeconds } from "../../Components/MinutesAndSeconds/MinutesAndSeconds";
export default function GameOver() {
  const [
    { playerName, scores, totalScoreList },
    dispatch,
  ] = useDataLayerValue();

  return (
    <div className="game-over">
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
          dispatch({
            type: "SET_STATUS",
            status: "PLAYING",
          });
          dispatch({
            type: "SET_SCORE",
            score: undefined,
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
}

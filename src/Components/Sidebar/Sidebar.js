import React from "react";
import { useDataLayerValue } from "../../Context/DataLayer";
import "./Sidebar.scss";
import crossIcon from "../../assets/icons/cross-icon.svg";
import homeIcon from "../../assets/icons/home-icon.svg";
import { MinutesAndSeconds } from "../MinutesAndSeconds/MinutesAndSeconds";

export default function Sidebar() {
  const [{ totalScoreList, scores, status }, dispatch] = useDataLayerValue();
  const [highScore, setHighScore] = React.useState(undefined);

  React.useEffect(() => {
    if (totalScoreList.length > 0) {
      let score = Math.max(...totalScoreList.map((score) => score.totalScore));
      let game = totalScoreList.find((item) => item.totalScore === score);
      setHighScore({
        ...game,
      });
    }
  }, [totalScoreList]);

  return (
    <div>
      <div className="score-list mt-2">
        <h3 className="mt-2">SCORE BOARD</h3>
        <ul>
          {totalScoreList.length == 0 && <li>No scores available</li>}
          {totalScoreList.length > 0 &&
            totalScoreList.map((score, index) => (
              <li key={score.totalScore + "0" + index}>
                <div>
                  Game {score.game} -&nbsp;
                  <MinutesAndSeconds totalSeconds={score.totalScore} />
                </div>
              </li>
            ))}
          <hr />
          {highScore && (
            <div className="best-score">
              <span className="font-primary">PERSONAL BEST</span>
              <li>
                <div>
                  Game {highScore.game} -&nbsp;
                  <MinutesAndSeconds totalSeconds={highScore.totalScore} />
                </div>
              </li>
            </div>
          )}
        </ul>
      </div>
      {status != "OVER" && (
        <div
          className="d-flex justify-content-center align-items-center mt-4 btn"
          onClick={() => {
            dispatch({
              type: "SET_GAME_OVER",
              status: "OVER",
              playing: false,
            });
          }}
        >
          <img src={crossIcon} style={{ height: "4rem" }} />
          <span
            style={{ fontSize: "27px" }}
            className="font-primary font-weight-bold"
          >
            STOP GAME
          </span>
        </div>
      )}
      {status === "OVER" && (
        <div
          className="d-flex justify-content-center align-items-center mt-4 btn"
          onClick={() => {
            dispatch({
              type: "SET_QUIT_GAME",
            });
          }}
        >
          <img src={homeIcon} style={{ height: "3rem" }} />
          <span
            style={{ fontSize: "27px", marginTop: "8px", marginLeft: "10px" }}
            className="font-primary font-weight-bold"
          >
            QUIT
          </span>
        </div>
      )}
    </div>
  );
}

import React from "react";
import crossIcon from "../../assets/icons/cross-icon.svg";
import homeIcon from "../../assets/icons/home-icon.svg";
import { MinutesAndSeconds } from "../MinutesAndSeconds/MinutesAndSeconds";
import { useHistory, useLocation } from "react-router-dom";
import "./Sidebar.scss";

const Sidebar = ({ scoreList }) => {
  const [highScore, setHighScore] = React.useState(undefined);
  const [showQuit, setShowQuit] = React.useState(false);
  const history = useHistory();
  const location = useLocation();

  React.useEffect(() => {
    if (scoreList.length > 0) {
      let score = Math.max(...scoreList.map((score) => score.totalScore));
      let game = scoreList.find((item) => item.totalScore === score);
      setHighScore({
        ...game,
      });
    }
    if (location.pathname === "/player/over") setShowQuit(true);
    else setShowQuit(false);
  }, [scoreList, location.pathname]);

  return (
    <div>
      <div className="score__list mt-2">
        <h3 className="mt-2">SCORE BOARD</h3>
        <ul>
          {scoreList.length === 0 && (
            <li className="no__data">No scores available</li>
          )}
          {scoreList.length > 0 &&
            scoreList.map((score, index) => (
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
      {!showQuit && (
        <div
          className="d-flex justify-content-center align-items-center mt-4 btn w-max"
          onClick={() => {
            history.push({ pathname: `/player/over`, search: location.search });
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
      {showQuit && (
        <div
          className="d-flex justify-content-center align-items-center mt-4 btn"
          onClick={() => {
            history.push(`/`);
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
};
export default Sidebar;

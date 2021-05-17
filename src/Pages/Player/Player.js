import React, { useEffect, useState } from "react";
import { Route, Switch, useHistory, useLocation } from "react-router-dom";
import { Navbar } from "../../Components/Navbar/Navbar";
import Sidebar from "../../Components/Sidebar/Sidebar";
import { useQuery } from "../../Hooks/Hooks";
import GamePlayer from "./GamePlayer/GamePlayer";
import GameOver from "./GameOver/GameOver";

const Player = () => {
  const location = useLocation();
  const history = useHistory();
  const query = useQuery();

  const [name, setName] = useState("");
  const [playLevel, setPlayLevel] = useState("EASY");
  const [totalScore, setTotalScore] = useState({
    seconds: 0,
    isHighScore: false,
  });
  const [scoreList, setScoreList] = useState([]);

  const addScore = (seconds) => {
    let isHighScore = scoreList.some((item) => item.totalScore >= seconds);
    setTotalScore({
      seconds,
      isHighScore: !isHighScore,
    });
    setScoreList((prevList) => [
      ...prevList,
      {
        game: prevList.length + 1,
        totalScore: seconds,
        time: new Date().toISOString(),
      },
    ]);
  };

  useEffect(() => {
    const { playerName, level } = query;
    if (playerName && level) {
      setName(playerName);
      setPlayLevel(level);
    }
  }, [query]);

  return (
    <div className="col-md-12">
      <div className="col-md-12">
        <Navbar
          playerName={name}
          level={playLevel}
          onStopTimer={(score) => addScore(score)}
        />
      </div>
      <div className="row col-md-12">
        <div className="col-md-3 sidebar__game__over">
          <Sidebar scoreList={scoreList} />
        </div>
        <div className="col-md-7">
          <Switch>
            <Route
              path="/player/play"
              render={(props) => (
                <GamePlayer {...props} level={playLevel} playerName={name} />
              )}
            />
            <Route
              path="/player/over"
              render={(props) => (
                <GameOver
                  {...props}
                  scores={{ ...totalScore }}
                  playerName={name}
                />
              )}
            />
          </Switch>
        </div>
      </div>
    </div>
  );
};
export default Player;

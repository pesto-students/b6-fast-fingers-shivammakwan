import React, { useEffect, useState } from "react";
import keyboardIcon from "../../assets/icons/keyboard-icon.svg";
import playIcon from "../../assets/icons/play-icon.svg";
import { useHistory } from "react-router-dom";
import "./Login.scss";

const Login = () => {
  const [playerName, setPlayerName] = useState("");
  const [error, setError] = useState(false);
  const [level, setLevel] = useState("EASY");
  const history = useHistory();

  const startGame = () => {
    if (playerName.trim() !== "") {
      history.push({
        pathname: `/player/play`,
        search: `playerName=${playerName}&level=${level}`,
      });
    } else {
      setError(true);
    }
  };

  useEffect(() => {}, []);

  return (
    <div>
      <div className="m-auto col-md-4 d-flex flex-column">
        <div className="mt-5">
          <img src={keyboardIcon} alt="keyboardIcon" />
        </div>
        <span className="font-primary font-30">fast fingers </span>
        <div className="game-subtitle">
          <hr className="bg-red col-md-1" />
          <span className="font-primary col-md-8 subtitle">
            the ultimate typing game
          </span>
          <hr className="bg-red col-md-1" />
        </div>
        <input
          type="text"
          className="custom-input mt-1"
          placeholder="type your name"
          name="player-name"
          onChange={(e) => setPlayerName(e.target.value)}
          value={playerName}
          onKeyUp={() => setError(false)}
        />
        <div className="font-primary error-text" style={{ height: "24px" }}>
          {error ? "Please enter your name" : ""}
        </div>
        <div className="custom-select-parent">
          <select
            className="custom-select mt-3"
            onChange={(e) => setLevel(e.target.value)}
          >
            <option value="EASY">EASY</option>
            <option value="MEDIUM">MEDIUM</option>
            <option value="HARD">HARD</option>
          </select>
        </div>
        <div
          className="d-flex justify-content-center align-items-center mt-4 btn"
          onClick={startGame}
        >
          <img src={playIcon} alt="playIcon" />
          <span className="font-primary font-weight-bold font-28 ">
            START GAME
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;

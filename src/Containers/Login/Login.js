import React from "react";
import Loading from "../../Components/Loading/Loading";
import { useDataLayerValue } from "../../Context/DataLayer";
import keyboardIcon from "../../assets/icons/keyboard-icon.svg";
import playIcon from "../../assets/icons/play-icon.svg";

import "./Login.scss";

export default function Login({ onStart }) {
  const [
    {
      dictionary,
      difficultyFactor,
      difficultyFactorTypes,
      playing,
      status,
      dataReceived,
    },
    dispatch,
  ] = useDataLayerValue();
  const [playerName, setPlayerName] = React.useState("");
  const [error, setError] = React.useState(false);
  const [level, setLevel] = React.useState("EASY");
  const [fetching, setFetching] = React.useState(true);

  function startGame() {
    if (playerName.trim() != "") {
      dispatch({
        type: "SET_PLAYER",
        name: playerName,
      });
      dispatch({
        type: "SET_PLAYING",
        playing: true,
      });
      dispatch({
        type: "SET_LEVEL",
        level: level,
      });
      dispatch({
        type: "SET_FACTOR",
        difficultyFactor: difficultyFactorTypes[level],
      });
      onStart();
    } else {
      setError(true);
    }
  }

  function getDictionary() {
    // setFetching(true);
    fetch("/data/dictionary.json")
      .then((res) => res.json())
      .then((data) => {
        dispatch({
          type: "SET_DATA_RECEIVED",
          dataReceived: true,
          dictionary: organizeDictionary(data),
        });
        setFetching(false);
      });
  }

  function organizeDictionary(data) {
    const dictionary = {
      EASY: [],
      MEDIUM: [],
      HARD: [],
    };
    for (const iterator of data) {
      if (iterator.length <= 4) dictionary.EASY.push(iterator);
      else if (iterator.length > 4 && iterator.length < 9)
        dictionary.MEDIUM.push(iterator);
      else dictionary.HARD.push(iterator);
    }
    return dictionary;
  }

  React.useEffect(() => {
    if (!dataReceived) getDictionary();
    else setFetching(false);
  }, []);

  return (
    <div>
      {fetching ? (
        <Loading />
      ) : (
        <div className="m-auto col-md-4 d-flex flex-column">
          <div className="mt-5">
            <img src={keyboardIcon} />
          </div>
          <span className="font-primary font-30">fast fingers </span>
          <div className="d-flex">
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
          <div className="font-primary" style={{ height: "24px" }}>
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
            <img src={playIcon} />
            <span
              style={{ fontSize: "28px" }}
              className="font-primary font-weight-bold"
            >
              START GAME
            </span>
          </div>
        </div>
      )}
    </div>
  );
}

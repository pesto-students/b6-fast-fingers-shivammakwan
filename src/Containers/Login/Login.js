import React from "react";
import { useDataLayerValue } from "../../Context/DataLayer";

export default function Login({ onStart }) {
  const [
    {
      dictionary,
      difficultyFactor,
      playing,
      status,
      dataReceived,
    },
    dispatch,
  ] = useDataLayerValue();
  const [playerName, setPlayerName] = React.useState("");
  const [level, setLevel] = React.useState("EASY");
  const [fetching, setFetching] = React.useState(false);

  React.useEffect(() => {}, []);

  function startGame() {
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
    onStart();
  }

  function getDictionary() {
    setFetching(true);
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
  }, []);

  return (
    <div>
      <input
        type="text"
        name="player-name"
        onChange={(e) => setPlayerName(e.target.value)}
        value={playerName}
      />
      <select onChange={(e) => setLevel(e.target.value)}>
        <option value="EASY">EASY</option>
        <option value="MEDIUM">MEDIUM</option>
        <option value="HARD">HARD</option>
      </select>
      <button onClick={startGame}>Start</button>
    </div>
  );
}

import React from "react";
import "./App.css";
import Login from "./Containers/Login/Login";
import GamePlayer from "./Containers/GamePlayer/GamePlayer";
import { useDataLayerValue } from "./Context/DataLayer";
import GameOver from "./Containers/GameOver/GameOver";

function App() {
  const [{ playerName, status }, dispatch] = useDataLayerValue();

  function startGame() {
    nextStep();
  }

  function nextStep() {
    dispatch({
      type: "SET_STATUS",
      status: "PLAYING",
    });
  }

  React.useEffect(() => {}, []);

  return (
    <div className="App">
      <h1>Fast Fingers </h1>
      {status === "START" ? (
        <Login onStart={startGame} />
      ) : status === "PLAYING" ? (
        <GamePlayer />
      ) : (
        <GameOver />
      )}
    </div>
  );
}

export default App;

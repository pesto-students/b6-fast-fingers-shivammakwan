import React from "react";
import { useDataLayerValue } from "../../Context/DataLayer";

export default function GameOver() {
  const [{ playerName }, dispatch] = useDataLayerValue();

  return (
    <div>
      Game Over {playerName}
      <button
        onClick={() =>
          dispatch({
            type: "SET_STATUS",
            status: "PLAYING",
          })
        }
      >
        Play Again
      </button>
      <button
        onClick={() => {
          dispatch({
            type: "SET_STATUS",
            status: "START",
          });
          dispatch({
            type: "SET_PLAYER",
            name: "",
          });
          dispatch({
            type: "SET_LEVEL",
            level: "EASY",
          });
          dispatch({
            type: "SET_FACTOR",
            difficultyFactor: 1,
          });
        }}
      >
        Quit
      </button>
    </div>
  );
}

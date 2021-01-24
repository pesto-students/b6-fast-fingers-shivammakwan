import React from "react";
import { useDataLayerValue } from "../../Context/DataLayer";

export default function GameOver() {
  const [
    { playerName, scores, totalScoreList },
    dispatch,
  ] = useDataLayerValue();

  return (
    <div>
      Game Over {playerName} <br />
      Your score <br />
      {Math.round(scores.reduce((a, b) => a + b, 0))}s
      <br />
      <br />
      <button
        onClick={() => {
          dispatch({
            type: "SET_STATUS",
            status: "PLAYING",
          });
          dispatch({
            type: "SET_SCORE",
            score: [],
          });
        }}
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
          dispatch({
            type: "SET_SCORE",
            score: [],
          });
          dispatch({
            type: "ADD_SCORE_DATA",
            totalScoreList: [],
          });
        }}
      >
        Quit
      </button>
    </div>
  );
}

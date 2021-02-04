import React from "react";
import { useDataLayerValue } from "../../Context/DataLayer";
import { MinutesAndSeconds } from "../MinutesAndSeconds/MinutesAndSeconds";

export const ScoreTimer = () => {
  const [{ totalScoreList, status }, dispatch] = useDataLayerValue();
  const [seconds, setSeconds] = React.useState(0);

  React.useEffect(() => {
    let timerInterval;
    clearInterval(timerInterval);
    timerInterval = setInterval(() => {
      setSeconds((prev) => parseFloat((prev + 1).toFixed(2)));
    }, 1000);

    if (status === "OVER") {
      console.log(timerInterval);
      clearInterval(timerInterval);
      let isHighScore = totalScoreList.some(
        (item) => item.totalScore >= seconds
      );
      console.log(seconds, isHighScore);
      dispatch({
        type: "SET_SCORE",
        scores: { seconds, isHighScore: !isHighScore },
      });
      dispatch({
        type: "ADD_SCORE_DATA",
        totalScoreList: [
          ...totalScoreList,
          {
            game: totalScoreList.length + 1,
            totalScore: seconds,
            time: new Date().toISOString(),
          },
        ],
      });
    }

    if (status === "PLAYING") setSeconds(0);
    return () => {
      clearInterval(timerInterval);
    };
  }, [status]);

  return (
    <> {status === "PLAYING" && <MinutesAndSeconds totalSeconds={seconds} />}</>
  );
};

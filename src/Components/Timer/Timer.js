import React, { forwardRef, useImperativeHandle } from "react";
import { useDataLayerValue } from "../../Context/DataLayer";

const Timer = forwardRef(({ totalSeconds, onTimerEnd, wordCounts }, ref) => {
  const [seconds, setSeconds] = React.useState(0);
  const [{ scores }, dispatch] = useDataLayerValue();

  useImperativeHandle(ref, () => ({
    restartTimer() {
      dispatch({
        type: "SET_SCORE",
        score: [...scores, seconds],
      });
      setSeconds(0);
    },
  }));

  React.useEffect(() => {
    let interval = null;
    // console.log(prevProps.wordCounts, wordCounts);
    console.log(totalSeconds, seconds);
    interval = setInterval(() => {
      setSeconds((prev) => parseFloat((prev + 0.1).toFixed(2)));
    }, 100);
    if (seconds === totalSeconds) {
      clearInterval(interval);
      onTimerEnd();
    }

    return () => clearInterval(interval);
  }, [seconds, totalSeconds, wordCounts]);

  return <div>{seconds}s</div>;
});
export default Timer;

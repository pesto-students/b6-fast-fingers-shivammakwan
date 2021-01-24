import React from "react";

export default function Timer({ totalSeconds, onTimerEnd, wordCounts }) {
  const [seconds, setSeconds] = React.useState(0);
  const prevProps = React.useRef({ wordCounts }).current;

  React.useEffect(() => {
    let interval = null;
    console.log(prevProps.wordCounts, wordCounts);
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
}

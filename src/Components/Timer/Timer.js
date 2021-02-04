import React, { forwardRef, useImperativeHandle } from "react";
import "./Timer.scss";
const Timer = forwardRef(({ totalSeconds, onTimerEnd, wordCounts }, ref) => {
  const [seconds, setSeconds] = React.useState(0);
  const [secondsLeft, setSecondsLeft] = React.useState(totalSeconds);

  const FULL_DASH_ARRAY = 283;
  const WARNING_THRESHOLD = 10;
  const ALERT_THRESHOLD = 5;

  const COLOR_CODES = {
    info: {
      color: "green",
    },
    warning: {
      color: "orange",
      threshold: WARNING_THRESHOLD,
    },
    alert: {
      color: "red",
      threshold: ALERT_THRESHOLD,
    },
  };

  useImperativeHandle(ref, () => ({
    restartTimer() {
      setSeconds(0);
    },
  }));

  function setRemainingPathColor(timeLeft) {
    const { alert, warning, info } = COLOR_CODES;
    if (timeLeft <= alert.threshold) {
      let timerElement = document.getElementById("base-timer-path-remaining");
      if (timerElement) {
        timerElement.classList.remove(warning.color);
        timerElement.classList.add(alert.color);
      }
    } else if (timeLeft <= warning.threshold) {
      let timerElement = document.getElementById("base-timer-path-remaining");
      if (timerElement) {
        timerElement.classList.remove(info.color);
        timerElement.classList.add(warning.color);
      }
    }
  }

  React.useEffect(() => {
    let interval = null;
    // console.log(prevProps.wordCounts, wordCounts);
    console.log(totalSeconds, seconds);
    interval = setInterval(() => {
      setSeconds((prev) => parseFloat((prev + 0.1).toFixed(2)));
      setSecondsLeft(parseFloat((totalSeconds - seconds).toFixed(2)));

      setRemainingPathColor(secondsLeft);
    }, 100);
    if (seconds === totalSeconds) {
      clearInterval(interval);
      onTimerEnd();
    }

    return () => clearInterval(interval);
  }, [seconds, totalSeconds, wordCounts]);

  return (
    <div>
      <div className="base-timer">
        <svg
          className="base-timer__svg"
          viewBox="0 0 100 100"
          xmlns="http://www.w3.org/2000/svg"
        >
          <g className="base-timer__circle">
            <circle
              className="base-timer__path-elapsed"
              cx="50"
              cy="50"
              r="45"
            ></circle>
            <path
              id="base-timer-path-remaining"
              strokeDasharray={`${
                (secondsLeft / totalSeconds) * FULL_DASH_ARRAY
              } 283`}
              className="base-timer__path-remaining red"
              d="
          M 50, 50
          m -45, 0
          a 45,45 0 1,0 90,0
          a 45,45 0 1,0 -90,0
        "
            ></path>
          </g>
        </svg>
        <span id="base-timer-label" className="base-timer__label">
          {seconds}
        </span>
      </div>
    </div>
  );
});
export default Timer;

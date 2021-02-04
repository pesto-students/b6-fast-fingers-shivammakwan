import React from "react";

export const MinutesAndSeconds = ({ totalSeconds }) => {
  const [time, setTime] = React.useState({
    minutes: "",
    seconds: "",
  });

  function pad(d) {
    return d < 10 ? "0" + d.toString() : d.toString();
  }
  React.useEffect(() => {
    var minutes = Math.floor(totalSeconds / 60);
    var seconds = (totalSeconds - minutes * 60).toFixed(2);
    setTime({
      minutes: pad(minutes),
      seconds: pad(seconds),
    });
  }, [totalSeconds]);

  return (
    <>
      {time.minutes}:{time.seconds}
    </>
  );
};

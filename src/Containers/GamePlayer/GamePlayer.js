import React from "react";
import Timer from "../../Components/Timer/Timer";
import { useDataLayerValue } from "../../Context/DataLayer";
export default function GamePlayer() {
  const [
    {
      dictionary,
      playerName,
      level,
      difficultyFactor,
      playing,
      status,
      dataReceived,
    },
    dispatch,
  ] = useDataLayerValue();

  const [currentWord, setCurrentWord] = React.useState("");
  const [typedWord, setTypedWord] = React.useState("");
  const [typedWordRef, setTypedWordRef] = React.useState("");
  const [timer, setTimer] = React.useState(0);
  const [wordCounts, setWordCounts] = React.useState(0);
  const [fetching, setFetching] = React.useState(false);

  function getWord() {
    setCurrentWord(null);
    let arrayOfWords = dictionary[level];
    if (arrayOfWords.length > 0) {
      setTypedWord("");
      setWordCounts((prevCount) => prevCount + 1);
      let word = arrayOfWords[Math.floor(Math.random() * arrayOfWords.length)];
      calculateTimer(word);
      setCurrentWord(word);
    }
  }

  function calculateTimer(word) {
    let seconds = word.length / difficultyFactor;
    console.log(seconds);
    setTimer(seconds > 2 ? seconds : 2);
  }

  // Timer value = (Number of letters in the word) / (Difficulty factor)

  function matchWord(e) {
    let typed = e.target.value;
    setTypedWord(typed);
    if (typed != "" && currentWord.startsWith(typed)) {
      if (currentWord === typed) getWord();
    }
    console.log(e.target.value);
  }

  React.useEffect(() => {
    getWord();
  }, []);

  return (
    <div>
      {fetching ? (
        <>
          {/* add loader here*/}
          <h1>Fetching</h1>
        </>
      ) : (
        <>
          {/* timer */}
          <div>
            {currentWord.length > 0 && (
              <Timer
                totalSeconds={timer}
                wordCounts={wordCounts}
                onTimerEnd={() =>
                  dispatch({
                    type: "SET_STATUS",
                    status: "OVER",
                  })
                }
              />
            )}
          </div>
          {/* word */}
          <div>
            <span>{currentWord}</span>
          </div>
          {/* type box */}
          <ul>
            {typedWord.split("").map((item, i) => (
              <li key={item + i}>{item}</li>
            ))}
          </ul>
          <input autoFocus type="text" onChange={matchWord} value={typedWord} />

          <br />
          <br />
          <br />
          <br />
          <button
            onClick={() =>
              dispatch({
                type: "SET_STATUS",
                status: "OVER",
              })
            }
          >
            Stop Game
          </button>
        </>
      )}
    </div>
  );
}

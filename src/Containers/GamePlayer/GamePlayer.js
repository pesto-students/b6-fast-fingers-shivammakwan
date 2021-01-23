import React from "react";
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

  const [fetching, setFetching] = React.useState(false);

  function getWord() {
    let arrayOfWords = dictionary[level];
    if (arrayOfWords.length > 0) {
      console.log(arrayOfWords, dictionary);
      let word = arrayOfWords[Math.floor(Math.random() * arrayOfWords.length)];
      console.log(word);
      setCurrentWord(word);
    }
  }

  function matchWord(e) {
    let typed = e.target.value;
    setTypedWord(typed);
    if (typed != "" && currentWord.startsWith(typed)) {
      alert("matching");
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
          <div>timer</div>
          {/* word */}
          <div>
            <span>{currentWord}</span>
          </div>
          {/* type box */}
          <ul>
            {typedWord.split("").map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <input type="text" onChange={matchWord} value={typedWord} />

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

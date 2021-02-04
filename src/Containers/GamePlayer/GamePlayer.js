import React from "react";
import Timer from "../../Components/Timer/Timer";
import { useDataLayerValue } from "../../Context/DataLayer";
import "./GamePlayer.scss";

export default function GamePlayer() {
  const [
    { dictionary, level, difficultyFactor, difficultyFactorTypes },
    dispatch,
  ] = useDataLayerValue();

  const [currentWord, setCurrentWord] = React.useState([]);
  const [typedWord, setTypedWord] = React.useState("");
  const [typedWordRef, setTypedWordRef] = React.useState("");
  const [timer, setTimer] = React.useState(0);
  const [wordCounts, setWordCounts] = React.useState(0);
  const childRef = React.useRef();

  function getWord() {
    setCurrentWord([]);
    let arrayOfWords = dictionary[level];
    if (arrayOfWords.length > 0) {
      setTypedWord("");
      setWordCounts((prevCount) => prevCount + 1);
      let word = arrayOfWords[Math.floor(Math.random() * arrayOfWords.length)];
      calculateTimer(word);
      setTypedWordRef(word);
      for (const iterator of word) {
        setCurrentWord((prevWord) => [
          ...prevWord,
          { status: 0, char: iterator },
        ]);
      }
    }
  }

  function calculateTimer(word) {
    let seconds = word.length / difficultyFactor;
    console.log(seconds);
    setTimer(seconds > 2 ? parseFloat(seconds.toFixed(1)) : 2);
  }

  function matchWord(e) {
    let typed = e.target.value;
    setTypedWord(typed);
    console.log(typed);
    //0=unattempted, 1=passed, 2=failed
    setCurrentWord((prevArrayOfWords) => {
      let prev = prevArrayOfWords;
      for (let index = 0; index < prev.length; index++) {
        if (
          index === prev.length - 1 &&
          typed.toUpperCase() === typedWordRef.toUpperCase()
        ) {
          //increase difficulty on success match
          dispatch({
            type: "SET_FACTOR",
            difficultyFactor: difficultyFactor + 0.01,
          });
          //check for limits
          if (
            difficultyFactor >= difficultyFactorTypes["MEDIUM"] &&
            difficultyFactor < difficultyFactorTypes["HARD"]
          )
            dispatch({
              type: "SET_LEVEL",
              level: "MEDIUM",
            });
          else if (difficultyFactor >= difficultyFactorTypes["HARD"])
            dispatch({
              type: "SET_LEVEL",
              level: "HARD",
            });

          childRef.current.restartTimer();
          getWord();
        } else {
          if (typed[index]) {
            if (prev[index].char.toUpperCase() === typed[index].toUpperCase())
              prev[index].status = 1;
            else prev[index].status = 2;
          } else {
            prev[index].status = 0;
          }
        }
      }
      return prev;
    });
  }

  React.useEffect(() => {
    getWord();
  }, []);

  return (
    <div>
      {/* timer */}
      <div>
        {typedWordRef.length > 0 && (
          <Timer
            totalSeconds={timer}
            wordCounts={wordCounts}
            onTimerEnd={() => {
              dispatch({
                type: "SET_STATUS",
                status: "OVER",
              });
            }}
            ref={childRef}
          />
        )}
      </div>
      {/* word */}
      <ul
        style={{
          listStyle: "none",
          display: "flex",
          justifyContent: "center",
          letterSpacing: "1px",
          padding: 0,
        }}
        className={"chars mt-5"}
      >
        {currentWord.map((item, i) => (
          <li key={item.char + i} className={"char-" + item.status}>
            {item.char}
          </li>
        ))}
      </ul>
      {/* type box */}
      <input
        autoFocus
        type="text"
        onChange={matchWord}
        value={typedWord}
        className="text-uppercase custom-input w-60"
      />
    </div>
  );
}

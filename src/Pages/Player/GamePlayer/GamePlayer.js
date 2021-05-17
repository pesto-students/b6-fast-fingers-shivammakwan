import React, { useEffect, useState, useRef } from "react";
import WordTimer from "../../../Components/WordTimer/WordTimer";
import { useHistory, useLocation } from "react-router-dom";
import { useQuery } from "../../../Hooks/Hooks";
import dictionaryData from "../../../assets/dictionary/dictionary.json";
import "./GamePlayer.scss";

const GamePlayer = () => {
  const history = useHistory();
  const { level, playerName } = useQuery();
  const difficultyFactor = {
    EASY: {
      factor: 1,
      level: "EASY",
    },
    MEDIUM: {
      factor: 1.5,
      level: "MEDIUM",
    },
    HARD: {
      factor: 2,
      level: "HARD",
    },
  };
  const [difficulty, setDifficulty] = useState(difficultyFactor[level]);
  const [currentWord, setCurrentWord] = useState([]);
  const [typedWord, setTypedWord] = useState("");
  const [typedWordRef, setTypedWordRef] = useState("");
  const [timer, setTimer] = useState(0);
  const [wordCounts, setWordCounts] = useState(0);
  const [dictionary, setDictionary] = useState(null);
  const childRef = useRef();

  const getNewWord = () => {
    setCurrentWord([]);
    let wordsByLevel = dictionary
      ? dictionary[difficulty.level]
      : organizeDictionary()[difficulty.level];

    if (wordsByLevel.length > 0) {
      setTypedWord("");
      //get unique word
      let word = wordsByLevel[Math.floor(Math.random() * wordsByLevel.length)];
      //time seconds
      let seconds = word.length / difficulty.factor;
      setTimer(seconds > 2 ? parseFloat(seconds.toFixed(1)) : 2);
      setWordCounts((prevCount) => prevCount + 1);

      setTypedWordRef(word);
      for (const iterator of word) {
        setCurrentWord((prevWord) => [
          ...prevWord,
          { status: 0, char: iterator },
        ]);
      }
    }
  };

  const matchTheWord = (e) => {
    let typed = e.target.value;
    setTypedWord(typed);
    setCurrentWord((prevArrayOfWords) => {
      let prev = prevArrayOfWords;
      for (let index = 0; index < prev.length; index++) {
        if (
          index === prev.length - 1 &&
          typed.toUpperCase() === typedWordRef.toUpperCase()
        ) {
          console.log(difficulty);
          let factor = difficulty.factor + 0.01;
          let level = difficulty.level;
          if (
            difficulty.factor >= difficultyFactor["MEDIUM"]["factor"] &&
            difficulty.factor < difficultyFactor["HARD"]["factor"]
          )
            level = "MEDIUM";
          if (difficulty.factor >= difficultyFactor["HARD"]["factor"])
            level = "HARD";

          setDifficulty({
            factor,
            level,
          });
          childRef.current.restartTimer();
          getNewWord();
        } else {
          if (typed[index]) {
            if (prev[index].char.toUpperCase() === typed[index].toUpperCase())
              prev[index].status = 1;
            //passed
            else prev[index].status = 2; //failed
          } else {
            prev[index].status = 0; //unattempted
          }
        }
      }
      return prev;
    });
  };

  const organizeDictionary = () => {
    const dictionary = {
      EASY: [],
      MEDIUM: [],
      HARD: [],
    };
    for (const iterator of dictionaryData) {
      if (iterator.length <= 4) dictionary.EASY.push(iterator);
      else if (iterator.length > 4 && iterator.length < 9)
        dictionary.MEDIUM.push(iterator);
      else dictionary.HARD.push(iterator);
    }
    setDictionary(dictionary);
    return dictionary;
  };

  useEffect(() => {
    if (playerName && level) getNewWord();
    else history.push("/");
  }, []);

  return (
    <div>
      {/* timer */}
      <div>
        {typedWordRef.length > 0 && (
          <WordTimer
            totalSeconds={timer}
            wordCounts={wordCounts}
            onTimerEnd={() => {
              let search = `playerName=${playerName}&level=${difficulty.level}`;
              history.push({
                pathname: `/player/over`,
              });
            }}
            ref={childRef}
          />
        )}
      </div>
      {/* word */}
      <ul className={"chars mt-5"}>
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
        onChange={matchTheWord}
        value={typedWord}
        className="text-uppercase custom-input w-60"
      />
    </div>
  );
};

export default GamePlayer;

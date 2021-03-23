import React, { useEffect, useState } from "react";
import keyboardIcon from "../../assets/icons/keyboard-icon.svg";
import playIcon from "../../assets/icons/play-icon.svg";
import { useHistory } from "react-router-dom";
import "./Signup.scss";
import { InputBox } from "../../Components/InputBox/InputBox";

const Signup = () => {
  const [playerName, setPlayerName] = useState("");
  const [playerEmail, setPlayerEmail] = useState("");
  const [error, setError] = useState(false);
  const [emailError, setEmailError] = useState(false);

  const history = useHistory();

  const register = () => {
    if (playerName.trim() == "") {
      setError(true);
    } else if (playerEmail.trim() == "") {
      setEmailError(true);
    } else {
      //success
    }
  };

  useEffect(() => {}, []);

  return (
    <div>
      <div className="m-auto col-md-4 d-flex flex-column">
        <div className="mt-5">
          <img src={keyboardIcon} alt="keyboardIcon" />
        </div>
        <span className="font-primary font-30">fast fingers </span>
        <div className="game-subtitle">
          <hr className="bg-red col-md-1" />
          <span className="font-primary col-md-8 subtitle">
            the ultimate typing game
          </span>
          <hr className="bg-red col-md-1" />
        </div>
        <InputBox
          placeholder="type your name"
          name="player-name"
          onChange={(e) => setPlayerName(e.target.value)}
          value={playerName}
          onKeyUp={() => setError(false)}
        />
        <div className="font-primary error-text" style={{ height: "24px" }}>
          {error ? "Please enter your name" : ""}
        </div>
        <InputBox
          placeholder="type your email"
          name="player-name"
          onChange={(e) => setPlayerEmail(e.target.value)}
          value={playerEmail}
          onKeyUp={() => setEmailError(false)}
        />
        <div className="font-primary error-text" style={{ height: "24px" }}>
          {emailError ? "Please enter your email" : ""}
        </div>
        <div
          className="d-flex justify-content-center align-items-center mt-4 btn"
          onClick={register}
        >
          <img src={playIcon} alt="playIcon" />
          <span className="font-primary font-weight-bold font-28 ">
            REGISTER
          </span>
        </div>
      </div>
    </div>
  );
};

export default Signup;

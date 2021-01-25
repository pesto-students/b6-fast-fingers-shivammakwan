import React from "react";
import "./App.scss";
import Login from "./Containers/Login/Login";
import GamePlayer from "./Containers/GamePlayer/GamePlayer";
import { useDataLayerValue } from "./Context/DataLayer";
import GameOver from "./Containers/GameOver/GameOver";
import Sidebar from "./Components/Sidebar/Sidebar";
import { Navbar } from "./Components/Navbar/Navbar";

function App() {
  const [{ playerName, status }, dispatch] = useDataLayerValue();

  function startGame() {
    nextStep();
  }

  function nextStep() {
    dispatch({
      type: "SET_STATUS",
      status: "PLAYING",
    });
  }

  React.useEffect(() => {}, []);

  return (
    <div className="App">
      {status === "START" ? (
        <Login onStart={startGame} />
      ) : (
        <div
          style={{ width: "100%", display: "flex", flexDirection: "column" }}
        >
          <Navbar />
          <div style={{ width: "100%", display: "flex" }}>
            <div style={{ width: "20%" }}>
              <Sidebar />
            </div>
            <div style={{ width: "60%" }}>
              {status === "PLAYING" ? <GamePlayer /> : <GameOver />}
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default App;

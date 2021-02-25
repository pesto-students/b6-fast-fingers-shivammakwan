import React from "react";
import { BrowserRouter } from "react-router-dom";
import Routes from "./Routes/Routes";
import "./App.scss";

function App() {
  React.useEffect(() => {}, []);

  return (
    <div className="App">
      <BrowserRouter>
        <Routes />
      </BrowserRouter>
    </div>
  );
}

export default App;

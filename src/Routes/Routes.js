import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Player from "../Pages/Player/Player";
import Signup from "../Pages/Signup/Signup";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route exact path="/signup" component={Signup} />
      <Route path="/player" component={Player} />
    </Switch>
  );
};
export default Routes;

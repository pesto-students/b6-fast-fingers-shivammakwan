import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../Pages/Login/Login";
import Player from "../Pages/Player/Player";

const Routes = () => {
  return (
    <Switch>
      <Route exact path="/" component={Login} />
      <Route path="/player" component={Player} />
    </Switch>
  );
};
export default Routes;

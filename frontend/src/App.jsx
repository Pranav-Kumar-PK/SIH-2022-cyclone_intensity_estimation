import React from "react";
import { Route, Switch } from "react-router-dom";
import Map from "./components/Map";
import Urbanization from "./components/Analysis/Urbanization";
import Poverty from "./components/Analysis/Poverty";
import Starter from "./components/starter";

import "./App.css";
const App = () => {
  return (
    <main className="containers">
      <Switch>
        <Route exact path="/" component={Starter} />
        <Route exact path="/map" component={Map} />
        <Route exact path="/map/analysis/urbanization" component={Urbanization} />
        <Route exact path="/map/analysis/poverty" component={Poverty} />
      </Switch>
    </main>
  );
};

export default App;

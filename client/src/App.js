import React from "react";
import NoMatch from "./pages/NoMatch";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={}></Route>
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>

  );
}

export default App;

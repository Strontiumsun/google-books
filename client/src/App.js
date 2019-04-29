import React from "react";
import Books from "./pages/Books";
import NoMatch from "./pages/NoMatch";
import Detail from "./pages/Detail";
import Nav from "./components/Nav";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";


function App() {
  return (
    <Router>
      <div>
        <Nav />
        <Switch>
          <Route exact path="/" component={Books}></Route>
          <Route exact path="/books" component={Books}></Route>
          <Route exact path="/books/:id" component={Detail} />
          <Route component={NoMatch} />
        </Switch>
      </div>
    </Router>

  );
}

export default App;

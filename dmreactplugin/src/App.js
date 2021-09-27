import React from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";

// Import all Global CSS components
import "bootstrap/dist/css/bootstrap.min.css";
import "../src/assets/css/global.module.css";

// Import all Router components
import ChatHome from "./pages/newChatRoom";

import dmSingleMessageContainer from "./components/dmSingleMessageContainer";
import HoverAddBookmark from "./components/common/addBookmarkKebab/hoverAddBookmark";
const App = () => {
  return (
    <Router basename="/dm">
      <Switch>
        <Route exact path="/" component={ChatHome} />
      </Switch>
      <Switch>
        <Route exact path="/hover" component={HoverAddBookmark} />
      </Switch>
    </Router>
  );
};
export default App;

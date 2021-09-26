<<<<<<< HEAD

import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

=======
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
>>>>>>> upstream/dev

// Import all Global CSS components
import 'bootstrap/dist/css/bootstrap.min.css';
import '../src/assets/css/global.module.css';

// Import all Router components
<<<<<<< HEAD
import ChatHome from "./pages/chathome";


const App = () => {
   return (
     <Router basename='/dm'>
           <Switch>
             <Route exact path='/' component={ChatHome} />
            </Switch>

  );
=======
import ChatHome from './pages/newChatRoom';

const App = () => {
    return (
        <Router basename='/dm'>
            <Switch>
                <Route exact path='/' component={ChatHome} />
            </Switch>
        </Router>
    );
>>>>>>> upstream/dev
};

export default App;

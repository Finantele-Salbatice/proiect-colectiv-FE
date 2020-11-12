import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegsiterPage';
import ActivateAccountPage from './pages/ActivateAccountPage';
import React from 'react';

function App() {
  return (
    <Router>
      <Switch>
        <Route exact={true} path="/" component={LoginPage}></Route>
        <Route exact={true} path="/register" component={RegisterPage}></Route>
        <Route exact={true} path="/activateAccount/:token" component={ActivateAccountPage}></Route>
      </Switch>
    </Router>
  );
}

export default App;

import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegsiterPage';
import ResetPassPage from './pages/ResetPassPage';
import ChangePassPage from './pages/ChangePassPage';
import React from 'react';

function app() {
	return (
		<Router>
			<Switch>
				<Route exact={true} path="/" component={LoginPage}></Route>
				<Route exact={true} path="/register" component={RegisterPage}></Route>
				<Route exact={true} path="/reset" component={ResetPassPage} />
				<Route exact={true} path="/reset/:token" component={ChangePassPage} />
			</Switch>
		</Router>
	);
}

export default app;

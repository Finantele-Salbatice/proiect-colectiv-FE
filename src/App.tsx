import './App.css';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';

import LoginPage from './pages/LoginPage';
import RegisterPage from './pages/RegisterPage';
import ActivateAccountPage from './pages/ActivateAccountPage';
import ResetPassPage from './pages/ResetPassPage';
import ChangePassPage from './pages/ChangePassPage';
import React from 'react';
import AddBTAccount from './pages/AddBTAccount';
import MainPage from './pages/MainPage';
import ConturiPage from './pages/ConturiPage';
import TranzactiiPage from './pages/TranzactiiPage';
import AddBCRAccount from './pages/AddBCRAcount';
import PrivateRoute from './components/login/PrivateRoute';

function app() {
	return (
		<Router>
			<Switch>
				<Route exact={true} path="/" component={LoginPage}></Route>
				<Route exact={true} path="/register" component={RegisterPage}></Route>
				<Route exact={true} path="/reset" component={ResetPassPage} />
				<Route exact={true} path="/reset/:token" component={ChangePassPage} />
				<Route exact={true} path="/activate/:token" component={ActivateAccountPage}></Route>
				<Route exact={true} path="/addBTAccount" component={AddBTAccount}></Route>
				<Route exact={true} path="/bcrsandbox" component={AddBCRAccount}></Route>
				<PrivateRoute exact={true} path="/main" component={MainPage}></PrivateRoute>
				<PrivateRoute exact={true} path="/conturi" component={ConturiPage}></PrivateRoute>
				<PrivateRoute exact={true} path="/tranzactii" component={TranzactiiPage}></PrivateRoute>
			</Switch>
		</Router>
	);
}

export default app;

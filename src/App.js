import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import{config} from "dotenv"  

import LoginPage from "./pages/LoginPage"
import RegisterPage from "./pages/RegsiterPage"

function App() {
  config();
  return (
    <Router>
      <Switch>
        <Route exact path="/">
          <LoginPage/>
        </Route>
        <Route exact path="/register">
          <RegisterPage/>
        </Route>
      </Switch>
  </Router>
    
  );
}

export default App;

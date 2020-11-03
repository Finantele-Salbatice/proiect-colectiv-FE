import './App.css';
import {
  BrowserRouter as Router,
  Switch,
  Route
} from "react-router-dom";
import{config} from "dotenv"  

import LoginPage from "./pages/LoginPage"

function App() {
  config();
  return (
    <Router>
      <Switch>
        <Route exact path="/" component={LoginPage}>
        </Route>
      </Switch>
  </Router>
    
  );
}

export default App;

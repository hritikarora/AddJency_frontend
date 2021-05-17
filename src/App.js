// required basic imports
import React from 'react'
import {BrowserRouter as Router,Switch,Route} from 'react-router-dom';

// bootstrap
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";

// css
import "./css/app.css";

// components
import SignUp from "./components/SignUp";
import LoginPage from "./components/LoginPage"
import Dashboard from './components/Dashboard';
import AuthenticatedRoute from "./components/AuthenticatedRoute";


function App()
{

  return (
    <div>
      <Router> 

        <Switch>

          <Route path="/" exact> <LoginPage /> </Route>
          <Route path="/dashboard"> <Dashboard /> </Route>
          {/* <AuthenticatedRoute path="/dashboard" id={id} component={Dashboard}> <Dashboard /> </AuthenticatedRoute> */}
          <Route path="/signup" exact component={SignUp}> <SignUp /> </Route>
          
        </Switch>
        
      </Router>
    </div>
  );
}

export default App;
import React from 'react';
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Login from "./components/Login";
import Dashboard from "./components/Dashboard";
import { AuthProvider } from "./context/Auth";
import PrivateRoute from "./PrivateRoute";

function App() {
  return ( 
    <AuthProvider>
      <Router>     
        <Switch>
          <Route exact path="/login" component={Login} />
          <PrivateRoute exact path="/" component={Dashboard} />
        </Switch>       
      </Router>
    </AuthProvider>
  );
}

export default App;

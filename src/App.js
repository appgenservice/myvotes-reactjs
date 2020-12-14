import React, {Component} from 'react';
import Dashboard from './components/Dashboard';
import Poll from './components/Poll';
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import './App.css';

class App extends Component {


    render() {
        return (
          <Router>
            <div className="app">
              <div className="app-header">My Votes. My Opinion</div>
            </div>
            <Switch>
            <Route path="/home" component={Dashboard} />
            <Route path="/poll/:id/:title" component={Poll} />
            <Route path='/'>
              <Redirect to="/home" />
            </Route>
            </Switch>
          </Router>
        )
    }
}

export default App;

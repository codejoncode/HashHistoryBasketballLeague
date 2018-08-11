import React, { Component } from 'react';
import {BrowserRouter as Router, Route, Switch} from 'react-router-dom';

import Home from './Home';
import Players from './Players';
import Teams from './Teams';
import Navbar from './Navbar';
import {getTeamNames} from '../api';

import TeamLogo from './TeamLogo'; 

class App extends Component {
  constructor(){
    super()
    this.state = {
      teamNames: []
    }
  }

  componentDidMount() {
    getTeamNames()
      .then((teamNames) => this.setState( () => ({
        teamNames
      })))
  }

  render() {


    return (
      <Router>
        <div>
          <Navbar />
          
          <Switch>
            <Route path='/' exact component={Home} />
            <Route path = '/players' component ={Players} />
            <Route path = '/teams' component ={Teams} />
            <Route render= {() => <h1>404 Error</h1>} />
            {/* ^ catch all 404 route */}
          </Switch>
        </div>
      </Router>
    );
  }
}

export default App;

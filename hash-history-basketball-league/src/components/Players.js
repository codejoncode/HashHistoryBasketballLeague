import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {getPlayers} from '../api';
import SideBar from './SideBar';

import {parse} from 'query-string';
import slug from 'slug'; 



export default class Players extends Component {
    constructor(){
        super()
        this.state = {
            players : [],
            loading: true, 
        }
    }

    componentDidMount () {
        const {location} = this.props

        location.search
        ? this.fetchPlayers(parse(location.search).teamId)
        : this.fetchPlayers()


    }

    fetchPlayers = (teamId)  => {
        getPlayers(teamId)
        .then((players) => this.setState(() => ({
            loading: false,
            players
        })) )
        // what this is doing is setting things up so that if the team is selected the players on that team shows up and not all of the players
        //this is the purpose behind using teamId if no team is selected we will render the entire list of players for the players page. 
    }

    render(){
        const {players} = this.state; 
        console.log(players); 
        return(
            <div className="container two-column">
                <h1>PLAYERS</h1>
                <br />
                <br />
                {players.map((plry, i) => (
                    <h2><Link key={i} to = {`/${plry.name}`}>{plry.name}</Link></h2>
                ))
                }
                    
            
            </div>
        )
    }
}
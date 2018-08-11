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
        ? this.fetchPlayers(parse(location.search).teamId) // if a team is selected
        : this.fetchPlayers() // if no team is selected. 


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
        const {players, loading} = this.state; 
        const {match, location } = this.props;
        console.log(players); 
        return(
            <div className="container two-column">
                <SideBar
                loading={loading}
                title='Players'
                list={players.map((player) => player.name)}
                {...this.props}
                

                /> 
                {loading === false && location.pathname === 'players'
            ? <div className = 'sidebar-instruction'>Select a Player</div>
            : null} 
            {/* this is a check if the loading is completed and the pathname is players then show select a player on the screen.
            the pathname will not be players if a player is selected it will actually feature the players name. 
            If a player has been selecte nothing displays */}

            
            </div>
        )
    }
}
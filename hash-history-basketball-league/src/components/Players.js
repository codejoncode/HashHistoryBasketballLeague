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

            {/* nested route */}
            <Route path={`${match.url}/:playerId`} render = {({match}) => {
                if (loading === true) return null

                const {
                    name, position, teamId, number, avatar, apg, ppg, rpg, spg, 
                } = players.find((player) => slug(player.name) === match.params.playerId)

                return (
                    <div className='panel'>
                        <img className='avatar' src={`${avatar}`} alt={`${name}'s avatar`} />
                        <h1 className='medium-header'>{name}</h1>
                        <h3 className = 'header'>#{number}</h3>
                        <div className = 'row'>
                            <ul className = 'info-list' style={{marginRight: 80}}>
                                <li>
                                    <div>
                                        <Link style ={{color: '#68809a'}} to ={`/${teamId}`}>
                                            {teamId[0].toUpperCase() + teamId.slice(1)}
                                        </Link>
                                    </div>
                                </li>
                                <li>Position <div>{position}</div></li>
                                <li>PPG<div>{ppg}</div></li>
                            </ul>
                            <ul className='info-list'>
                                <li>APG <div>{apg}</div></li>
                                <li>SPG<div>{spg}</div></li>
                                <li>RPG<div>{rpg}</div></li>
                            </ul>
                        </div>
                    </div>
                )
            }} />
            {/* /players/ playerid which can be anything do to the : but will be asscociated with individual players the player name will show in the url. */}
            
            </div>
        )
    }
}
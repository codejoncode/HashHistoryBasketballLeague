import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import {getPlayers} from '../api';
import Sidebar from './Sidebar';

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
        getPlayers()
        .then((players) => this.setState(() => ({
            players
        })) )
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
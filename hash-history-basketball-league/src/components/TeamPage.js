import React, {Component} from 'react'

import {Link} from 'react-router-dom'
import {getTeamsArticles} from '../api'
import TeamLogo from './TeamLogo'
import Team from './Team'
import slug from 'slug'


export default class TeamPage extends Component {
    constructor(){
        super()
        this.state = {
            loading: true, 
            articles: [], 
        }
    }

    componentDidMount () {
        getTeamsArticles(this.props.match.params.teamId)
          .then((articles) =>{
              this.setState(() => ({
                  loading: false, 
                  articles
              }))
          } )
    }

    render() {

        const {loading, articles} = this.state
        const {match} = this.props
        const {teamId} = match.params

        return(
            <div>
                <Team id ={teamId}>
                    {(team) => team === null
                    ? <h1>LOADING</h1>
                    : <div className = 'panel'>
                        <TeamLogo id={teamId}/>
                        <h1 className = "medium-header">{team.name}</h1>
                        
                        <h4 style={{margin: 5}}>
                            <Link  style={{cursor: 'pointer'}}
                            to={{pathname: '/players', search : `?teamId=${teamId}`}} >

                            View Roster
                            </Link>
                         </h4>

                    </div> }
                </Team>
            </div>
        )
    }
}
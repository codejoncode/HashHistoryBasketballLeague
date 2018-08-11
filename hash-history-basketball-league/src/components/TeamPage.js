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
                         <ul className='championships'>
                            {team.championships.map((ship) => <li key={ship}>{ship}</li>)}
                         </ul>
                         <ul className ="info-list row" style={{width: '100%'}}>
                             <li>Established<div>{team.established}</div></li>
                             <li>Manager<div>{team.manager}</div></li>
                             <li>Coach<div>{team.coach}</div></li>
                             <li>Record<div>{team.wins}-{team.losses}</div></li>
                         </ul>

                         <h2 className = 'header'>
                         
                         Articles
                         </h2>
                         <ul className = 'articles'>
                            {articles.map((article) => (
                                <li key={article.id}>
                                    <Link to = {`$match.url/articles/${slug(article.title)}`}> 
                                    <h4 className='article-title'>{article.title}</h4>
                                    <div className='article-date'>{article.date.toLocaleDateString()}</div>
                                      <div> </div>
                                    </Link>
                                </li>
                            ))}
                         </ul>

                    </div> }
                </Team>
            </div>
        )
    }
}
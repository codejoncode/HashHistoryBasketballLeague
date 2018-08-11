import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import SideBar from './SideBar'
import {getTeamsArticles} from '../api'

export default class Articles extends Component {
    constructor(){
        super()
        this.state = {

            loading: true, 
            teamsArticles: []
        }
    }

    componentDidMount () {
        getTeamsArticles(this.props.match.params.teamId)
            .then((teamsArticles) => {
                this.setState(() => ({
                    loading: false, 
                    teamsArticles: teamsArticles.map((article) => article.title)
                }))
            })
    }


    render(){
        const {loading, teamsArticles} = this.state
        const {params, url} = this.props.match

        const {teamId} = params 

        return (
            loading === true ? <h1>LOADING</h1>
            : <div className = 'container two-column'>
                <SideBar loading={loading} title = 'Articles' list = {teamsArticles} {...this.props}
                
                />
            </div>
        )
    }
}
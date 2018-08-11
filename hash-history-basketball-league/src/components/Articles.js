import React, {Component} from 'react'
import {Route} from 'react-router-dom'
import SideBar from './SideBar'
import {getTeamsArticles} from '../api'
import Article from './Article';


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
        console.log(params)
        return (
            loading === true ? <h1>LOADING</h1>
            : <div className = 'container two-column'>
                <SideBar loading={loading} title = 'Articles' list = {teamsArticles} {...this.props}
                
                />

              <Route path={`${url}/:articleId`} render = {({match})=> (
                  
                  <Article articleid ={match.params.articleId } teamId ={teamId}> 
                    {(article) => !article ? <h1>LOADING</h1> : (
                        <div className ='panel'>
                          <article className='article' key = {article.id}>
                            <h1 className='header'>{article.title}</h1>
                            <p>{article.body}</p>
                          </article>
                        </div>
                    )}
                  </Article>
                
              )} />
            </div>
        )
    }
}
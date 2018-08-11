import {Component} from 'react'
import PropTypes from 'prop-types'
import {getArticle} from '../api'




export default class Article extends Component {
    static propTypes = {
        teamId: PropTypes.string.isRequired,
        articleId: PropTypes.string.isRequired,
        children: PropTypes.func.isRequired
    }
    state = {
        article: null,
        loading: true
    }

    componentDidMount () {
        const {teamId, articleid} = this.props
        console.log(this.props)
        this.getArticle(teamId, articleid)
    }
    componentwillRecieveProps (nextProps){
        console.log(nextProps)
        if(this.props.articleid !== nextProps.articleid){
            this.getArticle(nextProps.teamId, nextProps.articleid)
        }
    }

    getArticle = (teamId, articleId) => {
        this.setState(()=> ({
            article: null
        }))

        getArticle(teamId, articleId)
          .then((article)=> this.setState(()=> ({
              article,
              loading: false
          })))
    }

    render(){
        
        console.log(this.props)
        console.log(this.state.article)

        return (
           this.props.children(this.state.article)

        )
        
        
    }
}
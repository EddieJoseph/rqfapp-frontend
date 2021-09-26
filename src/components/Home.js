import React,{Component} from 'react';
import PersonTile from './PersonTile'
import LoadingAnimation from './LoadingAnimation'
import {connect} from 'react-redux';
import { loadUserFromCookie, catchNetworkError} from '../actions/authentication';
import {getPeople} from '../actions/person'
import {getStructure} from '../actions/checkbox'
import {getBlocks} from '../actions/block'

class Home extends Component{

    

    state={
        posts: [],
        structure:[],
        image: null
    }

    componentDidMount(){
        if(this.props.token===null||this.props.user===null) {
            loadUserFromCookie(this.props.baseurl, ()=>{this.props.history.push("/app/login")})
        } else {
            //if(this.props.posts.length===0||this.props.structure.length===0) {
            getPeople(this.props.baseurl, this.props.token, catchNetworkError)
            getStructure(this.props.baseurl, this.props.token, catchNetworkError)
            getBlocks(this.props.baseurl, this.props.token, catchNetworkError)
            //}
       }
    }

    componentDidUpdate(prevProps) {
        if(this.props.baseurl!==prevProps.baseurl||this.props.token!==prevProps.token){
            getPeople(this.props.baseurl, this.props.token, catchNetworkError)
            getStructure(this.props.baseurl, this.props.token, catchNetworkError)
            getBlocks(this.props.baseurl, this.props.token, catchNetworkError)
        }
    }

    handleOnClicked=(id)=>{
        this.props.history.push("/app/person/"+id)
    }

    renderPerson(){
        var posts = []
        for (var p in this.posts) {
            console.log(posts[p])
        }
    }

    render(){

        if(this.props.posts===null||this.props.posts===undefined||this.props.posts.length===null||this.props.posts.length===undefined||this.props.posts.length===0) {
            return (
                <div>          
                        <div className="fullScreen-preloader">
                            <LoadingAnimation text={"Übersicht wird geladen..."}/>
                        </div>
                </div>
            )
        }

        const posts = this.props.posts===null?[]:this.props.posts;
        this.renderPerson();
        const postList = posts.length ? (
            posts.map(post=>{
                return (<PersonTile personId={post.id} key={post.id} handleOnClicked={this.handleOnClicked}/>)
            })
        ) : (
            <div className="center">Keine Teilnehmer geladen.</div>
        )
        
        let tiles=[]
        for( let count=0;count<postList.length;count=count+3){
            tiles.push(
                <div className="row" key={count}>
                    {postList[count]}
                    {count+1<postList.length?postList[count+1]:null}
                    {count+2<postList.length?postList[count+2]:null}
                </div>
            )
        }

        return (
            <div>
                <div className="">
                    <div>{tiles}</div>
                    
                </div>
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
          baseurl: state.config.baseurl,
          token : state.userData.token,
          user: state.userData.user,
          posts: state.person.all.sort((a,b)=>{if(a.nickname>b.nickname){return 1}else if(a.nickname<b.nickname){return -1}else{return 0}}),
          structure:state.checkbox.structure
        }
}

export default connect(mapStateToProps)(Home)
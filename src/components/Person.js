import React, { Component } from 'react';
import PersonInfo from './PersonInfo';
import Checkbox from './Checkbox';
import {connect} from 'react-redux';
import {setCurrentPerson} from '../actions/person'
import {getPersonalCheckboxes,setPersonalCheckboxes,getCheckboxUpdates} from '../actions/checkbox'
import {getBlocks} from '../actions/block'
import {getComments,setComments,getCommentUpdate} from '../actions/comment'
import { loadUserFromCookie, catchNetworkError} from '../actions/authentication';

import {getPeople} from '../actions/person'
import {getStructure} from '../actions/checkbox'

class _Person extends Component{

    handleLinkClicked=(id)=>{
        this.props.history.push("/person/"+id)
        this.props.match.params.person_id=id
    }

    componentDidMount(){
        this.props.setCurrent(Number(this.props.match.params.person_id))
        if(this.props.token!==null && this.props.token!=="none" && this.props.baseurl!==null) {
        getPersonalCheckboxes(this.props.baseurl, this.props.token, this.props.match.params.person_id, catchNetworkError)
        getComments(this.props.baseurl, this.props.token, this.props.match.params.person_id, catchNetworkError)
    
        } else {
            loadUserFromCookie(this.props.baseurl, ()=>{this.props.history.push("/login")})
        }
        this.setupRefresh()
    }

    refrechTimer = null

    setupRefresh=()=>{
        if(this.refrechTimer==null){
        this.refrechTimer=setInterval(this.refresh,5000)
        }
    }

    refresh=()=>{
        //console.log(this.errorResetCount)
        if(this.errorResetCount === 10){
            this.errorResetCount = 0
            this.errorcount = 0
        }
        this.errorResetCount = this.errorResetCount +1
        getCheckboxUpdates(this.props.baseurl, this.props.token, this.props.match.params.person_id, this.props.checkboxVersion, this.catchRefreshError)
        getCommentUpdate(this.props.baseurl, this.props.token, this.props.match.params.person_id, this.props.commentVersion, this.catchRefreshError)
    }

    errorResetCount=0;
    errorcount=0;

    catchRefreshError=(error)=>{
        //console.log(error,"errorcount: "+this.errorcount)
        this.errorcount=this.errorcount+1
        if(this.errorcount>10) {
            window.location.href = "/logout"
        }
    }




    cancleRefresh=()=>{
        clearInterval(this.refrechTimer)
        this.refrechTimer=null
    }

    componentDidUpdate (prevProps) {
        if((this.props.token!==prevProps.token || this.props.baseurl!==prevProps.baseurl)) {
            this.props.setCurrent(Number(this.props.match.params.person_id))
            getPersonalCheckboxes(this.props.baseurl, this.props.token, this.props.match.params.person_id, catchNetworkError)
            getComments(this.props.baseurl, this.props.token, this.props.match.params.person_id, catchNetworkError)
            getPeople(this.props.baseurl, this.props.token, catchNetworkError)
            getStructure(this.props.baseurl, this.props.token, catchNetworkError)
            getBlocks(this.props.baseurl, this.props.token, catchNetworkError)
        }else if(this.props.match.params.person_id!==prevProps.match.params.person_id){
            this.props.setCurrent(Number(this.props.match.params.person_id))
            this.props.resetComments()
            this.props.resetCheckboxes()
            getPersonalCheckboxes(this.props.baseurl, this.props.token, this.props.match.params.person_id, catchNetworkError)
            getComments(this.props.baseurl, this.props.token, this.props.match.params.person_id, catchNetworkError)
        }
    }

    componentWillUnmount() {
        this.props.setCurrent(null)
        this.cancleRefresh()
    }

    render(){
        const {person}=this.props
        let checkboxes=null
        if(person!=null&&!this.isEmpty(person)){
            checkboxes=this.props.structure.map(cb=>{
                return (
                    <Checkbox data={cb} person={person} key={cb.id}/>
                )
            })
        }
        if(person==null){
            return null;
        }
        return (
            <div className="container">
                <PersonInfo personId={person.id} handleLinkClicked={this.handleLinkClicked} user={this.props.user} config={this.props.config} history={this.props.history}/>
                {checkboxes}
            </div> 
        )
    }

    isEmpty(obj) {
        for(var key in obj) {
            if(obj.hasOwnProperty(key))
                return false;
        }
        return true;
    }

}

const mapStateToProps = (state, props) => {
    return {
        baseurl: state.config.baseurl,
        token : state.userData.token,
        user: state.userData.user,
        person: state.person.all.filter(p=>p.id===Number(props.match.params.person_id))[0],
        structure: state.checkbox.structure,
        expanded: state.checkbox.expanded,
        checkboxVersion: state.checkbox.version,
        commentVersion: state.comment.version,
        options: state.blocks.block
    }
}   

const mapDispatchToProps = (dispatch, props) => {
    return {
    resetComments: () => {dispatch(setComments([]))},
    resetCheckboxes: () => {dispatch(setPersonalCheckboxes([]))},
    setCurrent: (personId) => {dispatch(setCurrentPerson(personId))}
    }
  }

const Person = connect(mapStateToProps, mapDispatchToProps)(_Person)

export default connect(mapStateToProps,mapDispatchToProps)(Person)
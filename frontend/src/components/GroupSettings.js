import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import GroupSettingsGroup from './GroupSettingsGroup'
import GroupSettingsAddGroup from "./GroupSettingsAddGroup";

class _GroupSettings extends Component{
state={
    users:[],
    add:false
}

componentDidMount(){
    const authentification={Authorization:this.props.token}
    axios.get(this.props.baseurl+'group/', {headers:authentification})
    .then((response) =>{
        this.setState({users:response.data})
    }).catch((error)=>{
        console.log("An error occured")
    })
}

render(){

    let personList = this.state.users.sort((a,b)=>(a.type+a.name).localeCompare(b.type+b.name)).map(u=>{
        return (<GroupSettingsGroup group={u} delete={()=>{
            const authentification={Authorization:this.props.token}
            axios.delete(this.props.baseurl+'group/'+u.id, {headers:authentification})
            .then((response)=>{
                this.setState({users:this.state.users.filter((ut)=>{return ut.id!==u.id})})
            })

        }} key={u.id} />)
    })

    if(this.state.add){
        personList.push(<GroupSettingsAddGroup finished={(d)=>{this.setState({add:false,users:[...this.state.users,d]})}} key={-1}/>)
    }else{
        personList.push(
            <div className="card" key={-1}>
            <div className="row">
                
                <div className="col s12 offset-s6 dicon">
                    <i className="material-icons" onClick={()=>{this.setState({add:true})}}>create</i>
                </div>
            </div>
        </div> 
        )
    }

    return(
    <div className="container">
        <div className="card">
            <div className="card-content">
            <div className="card-title"><p style={this.nameStyle}>Gruppeneinstellungen</p></div>
            {personList}
        </div>
    </div>
</div>)
}

}


const mapStateToProps = (state, props) => {
    return {
        baseurl: state.config.baseurl,
        token : state.userData.token,
        user: state.userData.user,
    }
}

const GroupSettings = connect(mapStateToProps)(_GroupSettings)
export default connect(mapStateToProps)(GroupSettings)
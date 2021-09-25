import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import UserSettingsUser from './UserSettingsUser'
import UserSettingsAddUser from "./UserSettingsAddUser";

class _UserSettings extends Component{
state={
    users:[],
    add:false
}

componentDidMount(){
    const authentification={Authorization:this.props.token}
    axios.get(this.props.baseurl+'user/getall/', {headers:authentification})
    .then((response) =>{
        this.setState({users:response.data})
    }).catch((error)=>{
        console.log("An error occured")
    })
}

render(){

    let personList = this.state.users.map(u=>{
        return (<UserSettingsUser user={u} delete={()=>{
            const authentification={Authorization:this.props.token}
            axios.delete(this.props.baseurl+'user/delete/'+u.id, {headers:authentification})
            .then((response)=>{
                this.setState({users:this.state.users.filter((ut)=>{return ut.id!==u.id})})
            })

        }} key={u.id} />)
    })

    if(this.state.add){
        personList.push(<UserSettingsAddUser finished={(d)=>{this.setState({add:false,users:[...this.state.users,d]})}} key={-1}/>)
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
            <div className="card-title"><p style={this.nameStyle}>Benutzereinstellungen</p></div>
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

const UserSettings = connect(mapStateToProps)(_UserSettings)
export default connect(mapStateToProps)(UserSettings)
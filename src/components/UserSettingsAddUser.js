import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

class _UserSettingsAddUser extends Component {
state={
    firstName:"",
    lastName:"",
    username:"",
    password:""
}
handleSubmit=(e)=>{
    e.preventDefault();
    const authentification={Authorization:this.props.token}
    axios.post(this.props.baseurl + "register/",this.state,{headers:authentification})
    .then((response)=>{
        if(response.status>=200&&response.status<400){
            this.props.finished(response.data)
        }
    }    
    )
    .catch((e)=>{
        console.log(e)
    }
    )

}


render(){
    return(
        <div className="card">
            <div className="card-content">
            <form autoComplete="off" onSubmit={this.handleSubmit}>
                <label htmlFor="ufname">Vorname</label>
                <input id="ufname" type="text" onChange={(e)=>{this.setState({firstName:e.target.value})}} ></input>
                <label htmlFor="ulname">Nachname</label>
                <input id="ulname" type="text" onChange={(e)=>{this.setState({lastName:e.target.value})}} ></input>
                <label htmlFor="uuname">Benutzername</label>
                <input id="uuname" type="text" onChange={(e)=>{this.setState({username:e.target.value})}} ></input>
                <label htmlFor="upass">Passwort</label>
                <input id="upass" type="password" onChange={(e)=>{this.setState({password:e.target.value})}} ></input>
                <button className="waves-effect waves-light btn" tabIndex="0" onClick={this.handleSubmit}><i className="medium material-icons">save</i></button>
            </form>
            </div>
        </div>

    )
}



}

const mapStateToProps = (state, props) => {
    return {
          baseurl: state.config.baseurl,
          token : state.userData.token,
        }
}

const UserSettingsAddUser = connect(mapStateToProps)(_UserSettingsAddUser)

export default UserSettingsAddUser
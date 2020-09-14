import React, { Component } from 'react';
import {login, loadUserFromCookie, logout} from '../actions/authentication'
import {loadUser, setUser} from '../actions/user'
import {connect} from 'react-redux';

class Login extends Component{
state={
    username:"",
    password:""
}

handleChangeUsername=(e)=>{
    this.setState({username:e.target.value})
}

handleChangePassword=(e)=>{
    this.setState({password:e.target.value})
}

handleSubmit=(e)=>{
    e.preventDefault()

    login(this.props.baseurl, this.state.username, this.state.password, (error) =>{
        console.log(error)
        if(error.response===undefined){
            console.log(error)
            alert("Ein Fehler ist aufgetreten. \nDetails: "+error.message)
        }else
        if(error.response.status===401){
            alert("Benutzername oder Passwort falsch.")
        }else
        if(error.response.status===404){
            alert("Der Server ist nicht erreichbar.")
        }else
        if(error.response.status===500){
            alert("Auf dem Server ist ein Fehler aufgetreten.")
        }else{

            alert("Ein umbekannter Fehler ist aufgetreten.")
        }
    })
}

componentDidMount(){
    this.props.resetUser()
    loadUserFromCookie(this.props.baseurl,()=>{})
}

componentDidUpdate(lastProps){
    if(this.props.token!==null&&this.props.user===null) {
        loadUser(this.props.baseurl, this.props.token, ()=>{})
    }
    if(this.props.user!==null) {
        this.props.history.push('/')
    }
}

render(){
    return (
        <div>
            <div className="container">
                <h4 className="center">Login</h4>
                <form onSubmit={this.handleSubmit} autoComplete="off">
                <input type="text" placeholder="Benutzername" onChange={this.handleChangeUsername} value={this.state.username}/>
                <input type="password" placeholder="Passwort" onChange={this.handleChangePassword} value={this.state.password}/>
                <button className="waves-effect waves-light btn">Submit</button>
                </form>
            </div>
        </div>
    )
}


}
const mapStateToProps = state => {
    return {baseurl: state.config.baseurl, token : state.userData.token, user: state.userData.user}
}

const mapDispatchToProps = (dispatch) => {
    return {
    resetUser: () => dispatch(setUser(null)),
    resetTOken: () => dispatch(logout())
    }
  }

export default  connect(mapStateToProps, mapDispatchToProps)(Login)
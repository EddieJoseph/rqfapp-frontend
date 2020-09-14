import React, { Component } from 'react';
import Axios from 'axios';
import {connect} from 'react-redux';
import {logout} from '../actions/authentication'

class Logout extends Component{
    state={
        message:""
    }
componentDidMount(){
    //this.props.dispatch({type:"LOGOUT"})

    this.props.logoutUser()
    if(this.props.token!=null){
        const {baseurl}=this.props.config
        let data={Authorization:this.props.user.token}
        Axios.post(baseurl+'/logout',{},{headers:data})
        .then(res=>{
            this.setState({message:"Erfolgreich Ausgeloggt."})
            this.props.setUser(null, null)
            document.cookie = "token=bla;expires=Thu, 01 Jan 1970 00:00:00 UTC;path=/;";
            setTimeout(()=>{
                this.props.history.push('/login')
            },2000)
        }).catch(error=>{
            this.props.setUser(null, null)
            this.setState({message:"Ein Fehler ist aufgetreten."})
        })
        
    }else{
        this.setState({message:"Erfolgreich Ausgeloggt."})
            setTimeout(()=>{
                this.props.history.push('/login')
            },1000)
    }
}

render(){
    return (
        <div>
            <div className="container">
                <h4 className="center">Logout</h4>
                <p>{this.state.message}</p>
            </div>
        </div>
    )
}
}

function mapStateToProps(state, props) {
    return {}
}

function mapDispatchToProps(dispatch, props) {
return {
    logoutUser: () =>{dispatch(logout())}
}
}

export default  connect(mapStateToProps, mapDispatchToProps)(Logout)
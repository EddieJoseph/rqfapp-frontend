import React from 'react';
import {Link,} from 'react-router-dom'

const Settings = (props) =>{
    //const {user}=props
    return(    
    
    <div className="container">
    <Link to="/usersettings">Benutzer</Link><br/>
    <Link to="/personsettings">Person</Link><br/>
    <Link to="/groupsettings">Gruppen</Link>
    </div>
    
)
}
export default (Settings)


/*import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';

class _Settings extends Component{

render(){
    return(    
    
    <div className="container">
    <Link to="/usersettings">Benutzer</Link><br/>
    <Link to="/personsettings">Person</Link><br/>
    <Link to="/groupsettings">Gruppen</Link>
    </div>
    
)
}

}



const mapStateToProps = (state, props) => {
    return {
        baseurl: state.config.baseurl,
        token : state.userData.token,
        user: state.userData.user,
    }
}

const Settings = connect(mapStateToProps)(_Settings)
export default connect(mapStateToProps)(Settings)*/
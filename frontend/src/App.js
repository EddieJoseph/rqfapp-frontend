import React, { Component } from 'react';
import Navbar from './components/Navbar';
import {BrowserRouter, Route} from 'react-router-dom';
import Home from './components/Home';
import Login from './components/Login'
import Logout from './components/Logout'
import Post from './components/PersonTile'
import Person from './components/Person'
import {connect} from 'react-redux';
import Settings from './components/Settings';
import UserSettings from './components/UserSettings';
import PersonSettings from './components/PersonSettings';
import GroupSettings from './components/GroupSettings';

import 'materialize-css/dist/css/materialize.min.css';
import 'material-design-icons/iconfont/material-icons.css'

class App extends Component {

  getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

  componentDidMount(){
    var foundBaseurl = window.location.href.split(":")[0]+"://" + window.location.host.split(":")[0]+":8082/"
    this.props.dispatch({type:"UPDATE_CONFIG",config:{baseurl:foundBaseurl}})
    if(this.props.person!=null){
      document.title = this.props.person.nickname
    } else {
      document.title = "Qualitool"
    }
  }

  componentDidUpdate(prevProps) {
    if(this.props.person!=null){
      document.title = this.props.person.nickname
    } else {
      document.title = "Qualitool"
    }
  }

  render() {
      return (
        <BrowserRouter basename="/">
          <div className="App">
            <Navbar/>
            <Route exact path='/' render={(props)=><Home {...props}/>}/>
            <Route path='/login'  render={(props)=><Login {...props}/>}/>
            <Route path='/logout' render={(props)=><Logout {...props}/>}/>
            <Route path="/post/:post_id" component={Post}/>
            <Route path="/person/:person_id" render={(props)=><Person {...props}/>}/>
            <Route path='/settings' render={(props)=><Settings {...props}/>}/>
            <Route path='/usersettings' render={(props)=><UserSettings {...props}/>}/>
            <Route path='/personsettings' render={(props)=><PersonSettings {...props}/>}/>
            <Route path='/groupsettings' render={(props)=><GroupSettings {...props}/>}/>
          </div>
        </BrowserRouter>
      );
    }

  }

const mapStateToProps = (state, props) => {
  if(state.person.currentPerson!= null){
    return{person: state.person.all.filter(p=>{return p.id === state.person.currentPerson})[0]}
  }
  return {person:null}
}

export default connect(mapStateToProps)(App);

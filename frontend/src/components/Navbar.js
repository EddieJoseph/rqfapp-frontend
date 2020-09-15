import React from 'react';
import {Link, NavLink, withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

const Navbar = (props) =>{
    const {user}=props
    return (
        <div>
    <div className="navbar-fixed">
        <nav className="nav-wrapper blue-grey lighten-3">
            <div className="container">
                <Link className="brand-logo" to="/">Qualitool</Link>
                <ul className="right hide-on-med-and-down">
                <li><div className="usernamenav">{user!=null?"Willkommen "+user.username+"!":""}</div></li>
                <li><Link to="/">Übersicht</Link></li> 
                <li><NavLink to="/login">Login</NavLink></li> 
                <li><NavLink to="/logout">Logout</NavLink></li> 
                <li><NavLink to="/settings">Settings</NavLink></li> 
                </ul>
                <a href="#" className="right" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
                
            </div>
        </nav>
    </div>
    <ul class="sidenav" id="mobile-demo">
                <li><div className="usernamenav">{user!=null?"Willkommen "+user.username+"!":""}</div></li>
                <li><Link to="/">Übersicht</Link></li> 
                <li><NavLink to="/login">Login</NavLink></li> 
                <li><NavLink to="/logout">Logout</NavLink></li> 
                <li><NavLink to="/settings">Settings</NavLink></li> 
            </ul>
    </div>
    )
    /*return(
        <div>
              <nav class="nav-extended">
    <div class="nav-wrapper">
      <a href="#" class="brand-logo">Logo</a>
      <a href="#" data-target="mobile-demo" class="sidenav-trigger"><i class="material-icons">menu</i></a>
      <ul id="nav-mobile" class="right hide-on-med-and-down">
        <li><a href="sass.html">Sass</a></li>
        <li><a href="badges.html">Components</a></li>
        <li><a href="collapsible.html">JavaScript</a></li>
      </ul>
    </div>

  </nav>

  <ul class="sidenav" id="mobile-demo">
    <li><a href="sass.html">Sass</a></li>
    <li><a href="badges.html">Components</a></li>
    <li><a href="collapsible.html">JavaScript</a></li>
  </ul>
        </div>
    )*/
}

function mapStateToProps (state) {
    return {
        user: state.userData.user
    }
}

export default connect(mapStateToProps)(withRouter(Navbar))
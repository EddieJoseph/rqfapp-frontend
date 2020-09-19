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
                <li><NavLink to="/settings">Einstellungen</NavLink></li> 
                </ul>
                <a href="#" className="right" data-target="mobile-demo" className="sidenav-trigger"><i className="material-icons">menu</i></a>
                
            </div>
        </nav>
    </div>
    <ul className="sidenav" id="mobile-demo">
                <li><div className="usernamenav">{user!=null?"Willkommen "+user.username+"!":""}</div></li>
                <li><Link to="/">Übersicht</Link></li> 
                <li><NavLink to="/login">Login</NavLink></li> 
                <li><NavLink to="/logout">Logout</NavLink></li> 
                <li><NavLink to="/settings">Einstellungen</NavLink></li> 
            </ul>
    </div>
    )
}

function mapStateToProps (state) {
    return {
        user: state.userData.user
    }
}

export default connect(mapStateToProps)(withRouter(Navbar))
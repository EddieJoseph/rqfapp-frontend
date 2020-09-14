import React from 'react';
import {Link, NavLink, withRouter} from 'react-router-dom'
import {connect} from 'react-redux';

const Navbar = (props) =>{
    const {user}=props
    return (
    <div className="navbar-fixed">
        <nav className="nav-wrapper blue-grey lighten-3">
            <div className="container">
                <Link className="brand-logo" to="/">Qualitool</Link>
                <ul className="right">
                <li><div className="usernamenav">{user!=null?"Willkommen "+user.username+"!":""}</div></li>
                <li><Link to="/">Übersicht</Link></li> 
                <li><NavLink to="/login">Login</NavLink></li> 
                <li><NavLink to="/logout">Logout</NavLink></li> 
                <li><NavLink to="/settings">Settings</NavLink></li> 
                </ul>
            </div>
        </nav>
    </div>
    )
}

function mapStateToProps (state) {
    return {
        user: state.userData.user
    }
}

export default connect(mapStateToProps)(withRouter(Navbar))
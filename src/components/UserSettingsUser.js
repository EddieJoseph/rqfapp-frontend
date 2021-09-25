import React from 'react';

const UserSettingsUser = (props) =>{
    return (
        <div className="card">
            <div className="row">
                <div className="col s10">
                    <p>
                         {props.user.username}
                    </p> 
                </div>
                <div className="col s2 right-align dicon">
                    <i className="material-icons" onClick={()=>{props.delete()}}>delete</i>
                </div>
            </div>
        </div>
    )
}

export default UserSettingsUser
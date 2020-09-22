import React from 'react';

const PersonSettingsPerson = (props) =>{
    return (
        <div className="card">
            <div className="row">
                <div className="col s4">
                    <p>
                         {props.person.nickname}
                    </p> 
                    </div>
                    <div className="col s6">
                    <p>
                         {props.person.firstname +" "+props.person.lastname}
                    </p> 
                </div>
                <div className="col s2 right-align dicon">
                    <i className="material-icons" onClick={()=>{props.delete()}}>delete</i>
                </div>
            </div>
        </div>
    )
}

export default PersonSettingsPerson
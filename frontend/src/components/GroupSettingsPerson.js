import React from 'react';

const GroupSettingsPerson = (props) =>{
    //console.log(props)
    return(
        <div>{props.person.nickname+"   "+props.person.firstname +" "+props.person.lastname}</div>
    )
    return (
        <div className="card">
            <div className="row">
                <div className="col s4">
                    <p>
                         {props.person.nickname}
                    </p> 
                    </div>
                    <div className="col s8">
                    <p>
                         {props.person.firstname +" "+props.person.lastname}
                    </p> 
                </div>
            </div>
        </div>
    )
}

export default GroupSettingsPerson
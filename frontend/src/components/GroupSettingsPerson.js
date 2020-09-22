import React from 'react';

const GroupSettingsPerson = (props) =>{
    return(
        <div>{props.person.nickname+"   "+props.person.firstname +" "+props.person.lastname}</div>
    )
}

export default GroupSettingsPerson
import React from 'react';
import GroupSettingsPerson from './GroupSettingsPerson';

const GroupSettingsGroup = (props) =>{
    //console.log(props)

    let personList = props.group.leaders.map(m=>{
        let tp = {
            nickname:m.username,
            firstname:m.firstName,
            lastname:m.lastName
        }
        return(
            <GroupSettingsPerson person={tp} key={m.id}/>
            )
    })

    personList.push(props.group.members.map(m=>{
        return(
            <GroupSettingsPerson person={m} key={m.id}/>
            )
    }))


    return (
        <div className="card">
            <div className="card-content">
                <div className="card-title"><p >{props.group.type+" "+props.group.name}</p></div>
                <div className="row">
                    <div className="col s10">
                        {personList}
                    </div>
                    <div className="col s2 right-align dicon">
                        <i className="material-icons" onClick={()=>{props.delete()}}>delete</i>
                    </div>
                </div>
            </div>
        </div>
    )
}
/*<div className="card">
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
</div>*/

export default GroupSettingsGroup
import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

import PersonSettingsPerson from './PersonSettingsPerson'
import PersonSettingsAddPerson from "./PersonSettingsAddPerson";

class _PersonSettings extends Component{
state={
    people:[],
    add:false
}

componentDidMount(){
    const authentification={Authorization:this.props.token}
    axios.get(this.props.baseurl+'person/', {headers:authentification})
    .then((response) =>{
        this.setState({people:response.data})
    }).catch((error)=>{
        console.log("An error occured")
    })
}

render(){

    let personList = this.state.people.map(u=>{
        return (<PersonSettingsPerson person={u} delete={()=>{
            const authentification={Authorization:this.props.token}
            axios.delete(this.props.baseurl+'person/'+u.id, {headers:authentification})
            .then((response)=>{
                this.setState({people:this.state.people.filter((ut)=>{return ut.id!==u.id})})
            })

        }} key={u.id} />)
    })

    if(this.state.add){
        personList.push(<PersonSettingsAddPerson finished={(d)=>{this.setState({add:false,people:[...this.state.people,d]})}} key={-1}/>)
    }else{
        personList.push(
            <div className="card" key={-1}>
            <div className="row">
                
                <div className="col s12 offset-s6 dicon">
                    <i className="material-icons" onClick={()=>{this.setState({add:true})}}>create</i>
                </div>
            </div>
        </div> 
        )
    }

    return(
    <div className="container">
        <div className="card">
            <div className="card-content">
            <div className="card-title"><p style={this.nameStyle}>Teilnehmereinstellungen</p></div>
            {personList}
        </div>
    </div>
</div>)
}

}


const mapStateToProps = (state, props) => {
    return {
        baseurl: state.config.baseurl,
        token : state.userData.token,
        user: state.userData.user,
    }
}

const PersonSettings = connect(mapStateToProps)(_PersonSettings)
export default connect(mapStateToProps)(PersonSettings)
import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

class _GroupSettingsAddGroup extends Component {
state={
    name:"",
    type:"",
    persons:[],
    users:[]
}
handleSubmit=(e)=>{
    e.preventDefault();
    const authentification={Authorization:this.props.token}
    let group = {
        groupName:this.state.name,
        type:this.state.type,
        leaders:this.state.users.filter(u=>u.selected).map(u=>{return{id:u.id}}),
        members:this.state.persons.filter(p=>p.selected).map(p=>{return{id:p.id}})
    }
    axios.post(this.props.baseurl + "group/",group,{headers:authentification})
    .then((response)=>{
        if(response.status>=200&&response.status<400){
            this.props.finished(response.data)
        }
    }   
    )
    .catch((e)=>{
        console.log(e)
    }
    )

}

componentDidMount(){
    const authentification={Authorization:this.props.token}
    axios.get(this.props.baseurl+'person/', {headers:authentification})
    .then((response) =>{
        this.setState({persons:response.data.map(p=>{p.selected=false;return p})})
    }).catch((error)=>{
        console.log("An error occured")
    })
    axios.get(this.props.baseurl+'user/getall', {headers:authentification})
    .then((response) =>{
        this.setState({users:response.data.map(l=>{l.selected=false;return l})})
    }).catch((error)=>{
        console.log("An error occured")
    })
}

generateCBL = (l) => {
    return(
        <div key={"led"+l.id} onClick={(e)=>{
            e.preventDefault();
            l.selected = !l.selected
            this.setState({users:[...(this.state.users.filter(u=>{return u.id!==l.id})),l]}) 
        }}
        style={l.selected?this.selectedStyleL:this.nonSelectedStyleL}
        >
            {l.username}
        </div>
    )
}
generateCBP = (l) => {
    return(
        <div key={"per"+l.id} onClick={(e)=>{
            e.preventDefault();
            l.selected = !l.selected
            this.setState({persons:[...(this.state.persons.filter(u=>{return u.id!==l.id})),l]}) 
        }}
        style={l.selected?this.selectedStyle:this.nonSelectedStyle}
        >
            {l.nickname}
        </div>
    )
}

selectedStyleL={
    backgroundColor: "lightblue",
    fontWeight: "bolder",
    cursor: "pointer"
}

nonSelectedStyleL={
    fontWeight: "bolder",
    cursor: "pointer"
}

selectedStyle={
    backgroundColor: "lightblue",
    cursor: "pointer"
}

nonSelectedStyle={
    cursor: "pointer"
}


render(){
    let leaders = this.state.users.sort((a,b)=>(a.username).localeCompare(b.username)).map(l=>this.generateCBL(l))

    let participants = this.state.persons.sort((a,b)=>(a.nickname).localeCompare(b.nickname)).map(l=>this.generateCBP(l))


    return(
        <div className="card">
            
            <div className="card-content">
            <form autoComplete="off" onSubmit={this.handleSubmit}>
                <label htmlFor="ufname">Gruppenname</label>
                <input id="ufname" type="text" onChange={(e)=>{this.setState({name:e.target.value})}} ></input>
                <label htmlFor="ulname">Gruppentyp</label>
                <input id="ulname" type="text" onChange={(e)=>{this.setState({type:e.target.value})}} ></input>

                {leaders}
                {participants}

                <button className="waves-effect waves-light btn" tabIndex="0" onClick={this.handleSubmit}><i className="medium material-icons">save</i></button>
            </form>
            </div>
        </div>

    )
}



}

const mapStateToProps = (state, props) => {
    return {
          baseurl: state.config.baseurl,
          token : state.userData.token,
        }
}

const GroupSettingsAddGroup = connect(mapStateToProps)(_GroupSettingsAddGroup)

export default GroupSettingsAddGroup
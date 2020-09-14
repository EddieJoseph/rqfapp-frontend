import React, { Component } from 'react';
import {connect} from 'react-redux';
import axios from 'axios';

class _PersonSettingsAddPerson extends Component {
state={
    firstName:"",
    lastName:"",
    nickname:"",
    organisation:"",
    birthdate:"",
    imageUrl:"",
    imageBase64:"",
}
handleSubmit=(e)=>{
    e.preventDefault();
    const authentification={Authorization:this.props.token}
    axios.post(this.props.baseurl + "person/saveimg/",{data:this.state.imageBase64},{headers:authentification})
    .then((result)=>{
        this.setState({imageUrl:result.data})

        axios.post(this.props.baseurl + "person/",{
            firstname:this.state.firstName,
            lastname:this.state.lastName,
            nickname:this.state.nickname,
            organisation:this.state.organisation,
            birthdate:this.state.birthdate,
            imageUrl:this.state.imageUrl
        },{headers:authentification})
        .then((response)=>{
            this.props.finished(response.data)
        }).catch((e)=>{
            console.log(e)
        })

    }).catch((e)=>{
        console.log(e)
    }
    )
}

handleFile=(e)=>{
    let file = e.target.files[0]

    const reader = new FileReader();
    reader.readAsDataURL(file)
    reader.onload = () => {this.setState({imageBase64:reader.result})}
    

}




render(){
    return(
        <div className="card">
            <div className="card-content">
            <form autoComplete="off" onSubmit={this.handleSubmit}>
                <label htmlFor="ufname">Vorname</label>
                <input id="ufname" type="text" onChange={(e)=>{this.setState({firstName:e.target.value})}} ></input>
                <label htmlFor="ulname">Nachname</label>
                <input id="ulname" type="text" onChange={(e)=>{this.setState({lastName:e.target.value})}} ></input>
                <label htmlFor="uuname">Pfadiname</label>
                <input id="uuname" type="text" onChange={(e)=>{this.setState({nickname:e.target.value})}} ></input>
                <label htmlFor="upass">Abteilung</label>
                <input id="upass" type="text" onChange={(e)=>{this.setState({organisation:e.target.value})}} ></input>

                <label htmlFor="ugeb">Geburtsdatum</label>
                <input id="ugeb" type="date" onChange={(e)=>{this.setState({birthdate:e.target.value})}} ></input>

                <label htmlFor="upic">Bild</label>
                <input id="upic" type="file" accept="image/*" alt="" width="48" height="48"onChange={this.handleFile} ></input><br/>


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

const PersonSettingsAddPerson = connect(mapStateToProps)(_PersonSettingsAddPerson)

export default PersonSettingsAddPerson
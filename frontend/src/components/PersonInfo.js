import React, { Component } from 'react';
import {Link} from 'react-router-dom'
import {connect} from 'react-redux';
import axios from 'axios';
class PersonInfo extends Component{
    state={
        expanded:true
    }
    style={
        color:"black",
        padding:"0px",
        margin:"10px 0px 0px 0px"
    }
    nameStyle={
        fontSize: "25px",
        fontWeight: "bold",
        padding:"0px",
        margin:"10px 0px 0px 0px"
    }

    gstyle={
        fontWeight: "bold",
    }

    handleExChange=()=>{
        this.setState({expanded:!this.state.expanded})
    }

    getCommentList(baseurl, token, personId) {
        const authentification={Authorization:token}
        axios(
            baseurl+"comment/download/"+personId+".xlsx",
            {
                method: 'GET',
                /*mode: 'no-cors',*/
                headers: authentification,
                withCredentials: false,
                credentials: 'same-origin',
                crossdomain: true,
                responseType: 'blob'
            }
        ).then((response => {
            const data = response.data;
            //const url = URL.createObjectURL(data)
            //console.log(url)
            //window.location.replace(url)



            var saveData = (function () {
                var a = document.createElement("a");
                document.body.appendChild(a);
                a.style = "display: none";
                return function (data, fileName) {
                    var json = JSON.stringify(data),
                        //blob = new Blob([json], {type: "octet/stream"}),
                        //url = window.URL.createObjectURL(blob);
                        url = window.URL.createObjectURL(data);
                    a.href = url;
                    a.download = fileName;
                    a.click();
                    window.URL.revokeObjectURL(url);
                };
            }());
            saveData(data,this.props.person.nickname+".xlsx")




        })).catch((error)=>{console.log(error)})
    }

    


    render(){
        const {person} = this.props;
        let row2=null;
        let groups=null
        if(person.groups!==undefined){
            if(person.groups.length>0){
                groups=[]
                for (let c=0;c<person.groups.length;c++){
                    let group=(<div className="col"><p style={this.gstyle}>{person.groups[c].type+" "+person.groups[c].groupName}</p></div>)
                    let members=[];
                    for(let m=0;m<person.groups[c].members.length;m++){
                        members.push(
                            <div className="col" key={m}><Link  to={"/person/"+person.groups[c].members[m].id}>{person.groups[c].members[m].name}</Link></div>
                        )
                    }
                    let leaders=[];
                    for(let l=0;l<person.groups[c].leaders.length;l++){
                        leaders.push(
                            <div className="col" key={l}><p>{person.groups[c].leaders[l].name}</p></div>
                        )
                    }
                    let grf=(
                        <div className="row" key={c}>
                        {group}
                        {members}
                        {leaders}
                        </div>
                    )
                    groups.push(grf)
                }
            }
        }

        if(this.state.expanded){
            row2=(
                <div className="div row">
                <div className="col s3 center">
                    <img className="responsive-img" src={person.image} alt=""></img>
                </div>
                <div className="col s9">
                    <h6>Gruppen</h6>
                    {groups}
                    </div>
            </div>
            )
        }

        const personinfo = person.id===undefined?(
            <div className="center">Loading ...</div>
        ):(
            <div className="card">
                
            <div className="row valign-wrapper bottom-align">
                    <div className="col "><p style={this.nameStyle}>{person.nickname}</p></div>
                    <div className="col "><div className="bottom"><p style={this.style}>{person.firstname+" "+person.lastname}</p></div></div>
                    <div className="col "><div className="bottom"><p style={this.style}>{person.organisation}</p></div></div>
                    <div className="col right-align dicon"><i className="material-icons" onClick={this.handleExChange}>{this.state.expanded?"expand_less":"expand_more"}</i></div>
                    

                    <div onClick={()=>{this.getCommentList(this.props.baseurl,this.props.token,this.props.person.id)}}>
                    <div className="col right-align dicon"><i className="material-icons">file_download</i></div>
                    </div>
            </div>
            <div className="card-content">
            {row2}

            </div>
            </div>
        )
        return(personinfo)
    }
}
//<a href={this.props.baseurl+"comment/download/"+person.id+"?token="+this.props.token}></a>

//<a href={this.props.baseurl+"comment/download/"+person.id+"?token="+this.props.token}>
//                    <div className="col right-align dicon"><i className="material-icons">file_download</i></div></a>

function mapStateToProps (state, props) {return {
    baseurl: state.config.baseurl,
    token : state.userData.token,
    person: state.person.all.filter(p=>p.id===Number(props.personId))[0],
  }
}

export default connect(mapStateToProps)(PersonInfo)
import React, { Component } from 'react';
import Select from 'react-select';
import {connect} from 'react-redux';
import {saveComment} from '../actions/comment'
class _AddComment extends Component{
    state={
        selectedOption:null,
        selectedGroup:{value:-1,label:"keine Gruppe"},
        options:[
            {value:"0",label:"Allgemein"},
            {value:"1.1",label:"1.1 Reise"},
            {value:"1.2",label:"1.2 Anwanderung"}
        ],
        comment:""
    }

    handleChange=(e)=>{
        this.setState({selectedOption:e}) 
    }

    handleChangeGroup=(e)=>{
        this.setState({selectedGroup:e}) 
    }

    handleSubmit=(e)=>{
        e.preventDefault();
        if(this.state.comment!==""&&this.state.selectedOption!=null){
        e.persist()
        let groupmod = [{groupId:-1, groupName: "keine Gruppe", leaders: [], members:[{id:this.props.person.id,name:this.props.person.nickname}],type:""},...this.props.person.groups]
        let selectedGroup = groupmod.filter(g=>g.groupId===this.state.selectedGroup.value)[0]
        for (let m in selectedGroup.members){
            var comment={
                personId:selectedGroup.members[m].id,
                blockId:this.state.selectedOption.value,
                checkboxId:this.props.checkboxId,
                text:this.state.comment
            }
            saveComment(this.props.baseurl, this.props.token, comment, this.props.version,this.props.personId)
        }
        this.clearForm(e)
        }else{
        alert("Bitte alle Felder ausfüllen!")
        }
    }
    clearForm=(e)=>{
        e.preventDefault()
        this.setState({comment:"",selectedOption:null})
    }
    handleTextChange=(e)=>{
        this.setState({comment:e.target.value})
    }

    render(){


        const groupOptions=[{value:-1,label:"keine Gruppe"},...this.props.person.groups.map(g=>{return{value:g.groupId,label:g.type+" "+g.groupName}})]

    const { selectedGroup } = this.state;

    const { selectedOption } = this.state;
    const {options} = this.props
    return(
        <div className="card">
            <div className="card-content">
                <form autoComplete="off" onSubmit={this.handleSubmit}>
                    <div className="row">
                        <div className="col s10" ><Select value={selectedOption} onChange={this.handleChange} options={options} placeholder={"Blockname"} tabIndex="0"/></div>
                        <div className="col s10" ><Select value={selectedGroup} onChange={this.handleChangeGroup} options={groupOptions} placeholder={"Gruppe"} /></div>
                        <div className="col s1">
                            <button className="waves-effect waves-light btn" tabIndex="0" onClick={this.handleSubmit}><i className="medium material-icons">save</i></button>
                        </div>
                        <div className="col s1">
                            <button className="waves-effect waves-light btn" tabIndex="0" onClick={this.clearForm}><i className="medium material-icons">clear</i></button>
                        </div>
                    </div>
                    <textarea id="textarea1" className="materialize-textarea comment-textarea" tabIndex="0" placeholder="Beobachtung" onChange={this.handleTextChange} value={this.state.comment}></textarea>
                </form>
            </div>
            
        </div>
    )
}
}

const mapStateToProps = (state, props) => {
    //console.log("complete state", state)
    return {
          baseurl: state.config.baseurl,
          token : state.userData.token,
          //comments: state.comment.comments,
          options: state.blocks.block,
          version:state.comment.version,
          person: state.person.all.filter(p=>p.id===props.personId)[0],
          //expandedBoxes: state.checkbox.expanded
        }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
    /*expandCb: (id) => dispatch(expandCheckbox(id)),
    reduceCb: (id) => dispatch(reduceCheckbox(id)),
    toggleCb: (id) => dispatch(toggleCheckbox(id)),
    expandCom: (id) => dispatch(expandComment(id)),
    reduceCom: (id) => dispatch(reduceComment(id)),
    toggleCom: (id) => dispatch(toggleComment(id))*/
    }
  }

const AddComment = connect(mapStateToProps, mapDispatchToProps)(_AddComment)

export default AddComment

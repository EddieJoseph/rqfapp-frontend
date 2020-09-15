import React, { Component } from 'react';
import Comment from './Comment'
import AddComment from './AddComment';
import LoadingAnimation from './LoadingAnimation'
import axios from 'axios';
import {connect} from 'react-redux';
import {expandCheckbox} from '../actions/checkbox'
import {reduceCheckbox} from '../actions/checkbox'
import {toggleCheckbox} from '../actions/checkbox'
import {expandComment} from '../actions/checkbox'
import {reduceComment} from '../actions/checkbox'
import {toggleComment} from '../actions/checkbox'
import {saveCheckbox} from '../actions/checkbox'


class _Checkbox extends Component{
    state={
        comments:[],
        fastedit:false
    }
    styles={
        margin: "0px 5px 0px 5px",
        fill: "black"

    }
    stylep={
        margin: "0px 5px 0px 5px",
        fill: "green"

    }
    stylen={
        margin: "0px 5px 0px 5px",
        fill: "red"

    }

    getOfsetStyle(level){
        return {
            width:level*0.95+"cm",
        }
    }

    setExpanded=(val)=>{
        if(val){
            //this.props.expandCb(this.props.data.id)
            this.props.expandCb(this.getIndexOf(this.props.data.id))
        }else{
            //this.props.reduceCb(this.props.data.id)
            this.props.reduceCb(this.getIndexOf(this.props.data.id))
        }
    }

    getIndexOf=(id)=>{

        for( let b in this.props.expandedBoxes) {
            if(this.props.expandedBoxes[b].id===id){
                return b
            }
        }

        
    }

    setCommentsExpanded=(val)=>{
        this.props.toggleCom(this.getIndexOf(this.props.data.id))
        //this.props.setCheckBoxCommentExpanded(this.props.data.id,val)
    }


    addComment=(comment,clear)=>{
        if(comment.id===undefined){
        let max=Math.max(...this.state.comments.map(com=>com.id))
        comment.id=max+1;
        comment.author="Aslan"
        comment.authorid=1
        if(this.props.user!=null){
            let finalCom={}
            finalCom.authorId=this.props.user.id
            finalCom.personId=this.props.person.id
            finalCom.blockId=comment.value
            finalCom.checkboxId=this.props.data.id
            finalCom.text=comment.text
            const {baseurl}=this.props.config
            let data={token:this.props.user.token}
            axios.post(baseurl+'comment',finalCom,{headers:data})
            .then(res=>{
                this.setState(
                    {comments:[...this.state.comments,res.data]}
                )
                clear()
                if(this.props.showCommentAdded!==undefined){
                    this.props.showCommentAdded(res.data)
                    this.setState({fastedit:false})
                }
            })
        }
        }
    }

    deleteComent=(id)=>{
        if(this.props.user!=null){
            const {baseurl}=this.props.config
            let data={token:this.props.user.token}
            axios.delete(baseurl+'comment/'+id,{headers:data})
            .then(()=>{
                this.removeComment(id)
            })
        }
    }

    starComment=(id,value)=>{
        if(this.props.user!=null){
            const {baseurl}=this.props.config
            let data={token:this.props.user.token}
            axios.post(baseurl+'comment/star/'+id+"/"+value,{},{headers:data})
            .then(()=>{
            this.refresh(true) 
            })
        }

    }

    removeComment=(id)=>{
        this.setState({comments:this.state.comments.filter(c=>c.commentId!==id)})

        if(this.props.removeComment!==undefined){
        this.props.removeComment(id)
        }
    }

    showCommentAdded=(com)=>{
        this.setState(
            {comments:[...this.state.comments,com]}
        )

        if(this.props.showCommentAdded!==undefined){
            this.props.showCommentAdded(com)
        }
    }

    setCheckBox=(id,box,value)=>{
        let currentBox={
            positiv:this.props.values.positiv,
            negativ:this.props.values.negativ,
            sighted:this.props.values.sighted
        }
        currentBox[box]=value
        if(box==="negativ"&&value){
            currentBox["positiv"]=false
        }
        if(box==="positiv"&&value){
            currentBox["negativ"]=false
        }
        saveCheckbox(this.props.baseurl, this.props.token, this.props.person.id, this.props.data.id, currentBox, this.props.version)
    }

    sortComments(a,b) {
        if(a.commentId<b.commentId){
            return -1;
        }else {
            return 1
        }
    }

//this.props.expanded, this.props.comments
    render(){
        if(this.props.values===undefined||this.props.values===null||this.props.expanded===undefined||this.props.expanded===null||
            this.props.comments===undefined||this.props.comments===null||this.props.comments.length===undefined||this.props.comments.length===null){
                return (
                    <div className="card">
                                <LoadingAnimation text={"Daten werden geladen..."}/>
                    </div>
            )
        }
        const {data} = this.props;
        const {person} = this.props;
        const expanded = this.props.expanded
        const values = this.props.values
        let cn="";
        if(data.severity<2){
            cn=(data.boxes.length>0||values.sighted)?"":"pointer"
        }else{
            cn=(values.sighted)?"":"pointer"
        }
        const uncheckeds=(<svg className="pointer" style={this.styles} onClick={()=>{this.setCheckBox(data.id,"sighted",true)}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 2c-1.654 0-3 1.346-3 3v14c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3v-14c0-1.654-1.346-3-3-3h-14zm19 3v14c0 2.761-2.238 5-5 5h-14c-2.762 0-5-2.239-5-5v-14c0-2.761 2.238-5 5-5h14c2.762 0 5 2.239 5 5z"/></svg>)
        const checkeds=(<svg className="pointer" style={this.styles} onClick={()=>{this.setCheckBox(data.id,"sighted",false)}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10.041 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591zm-5.041-15c-1.654 0-3 1.346-3 3v14c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3v-14c0-1.654-1.346-3-3-3h-14zm19 3v14c0 2.761-2.238 5-5 5h-14c-2.762 0-5-2.239-5-5v-14c0-2.761 2.238-5 5-5h14c2.762 0 5 2.239 5 5z"/></svg>)
        const uncheckedp=(<svg className={cn} style={this.stylep} onClick={()=>{this.setCheckBox(data.id,"positiv",true)}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 2c-1.654 0-3 1.346-3 3v14c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3v-14c0-1.654-1.346-3-3-3h-14zm19 3v14c0 2.761-2.238 5-5 5h-14c-2.762 0-5-2.239-5-5v-14c0-2.761 2.238-5 5-5h14c2.762 0 5 2.239 5 5z"/></svg>)
        const checkedp=(<svg className={cn} style={this.stylep} onClick={()=>{this.setCheckBox(data.id,"positiv",false)}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10.041 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591zm-5.041-15c-1.654 0-3 1.346-3 3v14c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3v-14c0-1.654-1.346-3-3-3h-14zm19 3v14c0 2.761-2.238 5-5 5h-14c-2.762 0-5-2.239-5-5v-14c0-2.761 2.238-5 5-5h14c2.762 0 5 2.239 5 5z"/></svg>)
        const uncheckedn=(<svg className={cn} style={this.stylen} onClick={()=>{this.setCheckBox(data.id,"negativ",true)}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M5 2c-1.654 0-3 1.346-3 3v14c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3v-14c0-1.654-1.346-3-3-3h-14zm19 3v14c0 2.761-2.238 5-5 5h-14c-2.762 0-5-2.239-5-5v-14c0-2.761 2.238-5 5-5h14c2.762 0 5 2.239 5 5z"/></svg>)
        const checkedn=(<svg className={cn} style={this.stylen} onClick={()=>{this.setCheckBox(data.id,"negativ",false)}} xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M10.041 17l-4.5-4.319 1.395-1.435 3.08 2.937 7.021-7.183 1.422 1.409-8.418 8.591zm-5.041-15c-1.654 0-3 1.346-3 3v14c0 1.654 1.346 3 3 3h14c1.654 0 3-1.346 3-3v-14c0-1.654-1.346-3-3-3h-14zm19 3v14c0 2.761-2.238 5-5 5h-14c-2.762 0-5-2.239-5-5v-14c0-2.761 2.238-5 5-5h14c2.762 0 5 2.239 5 5z"/></svg>)
        let cbSighted=values.sighted?checkeds:uncheckeds
        let cbPositiv=values.positiv?checkedp:uncheckedp
        let cbNegativ=values.negativ?checkedn:uncheckedn

        let subCheckboxes=expanded.value?(data.boxes.map(cb=>{
            return (
                <Checkbox data={cb} person={person} key={cb.id}/>
            )
        })):(null)
        let nametext=data.minimumachieved!==null?<div className="row valign-wrapper bottom-align"><div className="col">{data.name}</div> <div className="col" style={{fontSize:"11px",margin:"0px",padding:"0px"}}>{"(min. "+data.minimumachieved+")"}</div></div> : <div className="row"><div className="col">{data.name}</div></div>

        let name=(<div className="col">{nametext}</div>)
        if(data.severity===0){
            name=(<div className="col red-text">{nametext}</div>)
        }else if(data.severity===2){
            name=(<div className="col green-text">{nametext}</div>)
        }
        let icon=(<div className="left-align dicone"><i className="tiny material-icons white-text">expand_less</i></div>)
        if(data.boxes.length>0){
        icon=expanded.value?(
            <div className="left-align dicon"><i className="tiny material-icons" onClick={()=>{this.setExpanded(false)}}>expand_less</i></div>
        ):(
        <div className="left-align dicon"><i className="tiny material-icons" onClick={()=>{this.setExpanded(true)}}>expand_more</i></div>
        )
        }
        let commentIcon=(<div className="left-align dicon"><i className="tiny material-icons" onClick={()=>{this.props.toggleCom(this.props.data.id)}}>comment</i></div>)
        let commentAddIcon=(<div className="left-align dicon"><i className="tiny material-icons" onClick={()=>{this.setState({fastedit:!this.state.fastedit})}}>add_circle_outline</i></div>)
        
        if(this.props.comments.length>0){
            commentIcon=(<div className="left-align dicon"><i className="tiny material-icons blue-text" onClick={()=>{this.setCommentsExpanded(!expanded.commentValue)}}>comment</i></div>)
        }


        let comments=null;
        if(expanded.commentValue){
            comments = [...this.props.comments]
            comments.sort(this.sortComments)
            comments=comments.map(com=>{return(
                <Comment commentId={com.commentId} key={com.commentId}/>
            )})
            comments.push(
                <AddComment checkboxId={this.props.data.id} personId={this.props.person.id} key={-1}/>
            )

        }
        if(!expanded.commentValue&&this.state.fastedit){
            comments=[];
            comments.push(
                <AddComment checkboxId={this.props.data.id} personId={this.props.person.id} key={-1}/>
            )
        }

        if(data.level!==0){
        return (
            <div>
            <div className="row">
                <div className="col" style={this.getOfsetStyle(data.level)}></div>
                
                    <div className="col">{cbSighted}{cbPositiv}{cbNegativ}</div>
                    <div className="col">{icon}</div>
                    <div className="col">{name}</div>
                    
                    <div className="col">{commentIcon}</div>
                    <div className="col" >{commentAddIcon}</div>
            </div>
            <div className="container">{comments}</div>
            <div>{comments!=null?null:subCheckboxes}</div> 
            </div>
        )
        }else{
            if(values.passed==null){
                return(<div className="card">
                    <div className="row valign-wrapper bottom-align">
                        <div className={"col"}><h6>{data.name}</h6></div><div className="col">{icon}</div><div className="col">{commentIcon}</div>
                        </div>
                        <div className="container">{comments}</div>
                        <div>{comments!=null?null:subCheckboxes}</div>
                    </div>)
            }else{
                if(values.passed){
                    return(<div className="card">
                        <div className="row green accent-2 valign-wrapper bottom-align">
                            <div className={"col"}><h6>{data.name}</h6></div><div className="col">{icon}</div><div className="col">{commentIcon}</div>
                            </div>
                            <div className="container">{comments}</div>
                            <div>{comments!=null?null:subCheckboxes}</div>
                        </div>)
                }else{
                    return(<div className="card">
                        <div className="row red accent-2 valign-wrapper bottom-align">
                            <div className={"col"}><h6>{data.name}</h6></div><div className="col">{icon}</div><div className="col">{commentIcon}</div>
                            </div>
                            <div className="container">{comments}</div>
                            <div>{comments!=null?null:subCheckboxes}</div>
                        </div>)
                }
            }
        }
    }
}

function getSubCheckboxIds(box) {
return [box.id,...box.boxes.flatMap(b=>{return getSubCheckboxIds(b)})]
}

function findBox(boxes, checkboxId) {
    if(boxes===undefined&&boxes===null){
        return null
    }

    let filtered = boxes.filter(b=>{return b.id===checkboxId})
    if(filtered.length > 0){
        return filtered[0]
    }
    for (let box in boxes){
        let result = findBox(boxes[box].boxes, checkboxId)
        if(result!==null) {
            return result
        }
    }
    return null
}

const mapStateToProps = (state, props) => {
    var cbids = getSubCheckboxIds(findBox(state.checkbox.structure, props.data.id));
    //console.log("chevkboxes",state.checkbox.checkboxes)
    return {
          baseurl: state.config.baseurl,
          token : state.userData.token,
          comments: state.comment.comments.filter(c=>{return cbids.filter(id=>{return id===c.checkboxId}).length>0}),
          options: state.blocks.block,
          expandedBoxes: state.checkbox.expanded,
          expanded: state.checkbox.expanded.filter(b=>b.id===props.data.id)[0],
          values: state.checkbox.checkboxes!==undefined?state.checkbox.checkboxes.filter(b=>b.checkboxId===props.data.id)[0]:[],
          version: state.checkbox.version
        }
}

const mapDispatchToProps = (dispatch, props) => {
    return {
    expandCb: (id) => dispatch(expandCheckbox(id)),
    reduceCb: (id) => dispatch(reduceCheckbox(id)),
    toggleCb: (id) => dispatch(toggleCheckbox(id)),
    expandCom: (id) => dispatch(expandComment(id)),
    reduceCom: (id) => dispatch(reduceComment(id)),
    toggleCom: (id) => dispatch(toggleComment(id))
    }
  }

const Checkbox = connect(mapStateToProps, mapDispatchToProps)(_Checkbox)

export default Checkbox
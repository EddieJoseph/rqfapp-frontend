import React, { Component } from 'react';
import {deleteComment, setCommentStar} from '../actions/comment'
import {connect} from 'react-redux';

class _Comment extends Component{
    handleDelete=()=>{
        var r=window.confirm("Bist du sicher, dass du den Kommentar unwiederruflich löschen willst?")
        if(r===true){
            deleteComment(this.props.baseurl, this.props.token, this.props.data.commentId)
        }
    }

    handleStaring=()=>{
        if(this.props.data.stared) {
            setCommentStar(this.props.baseurl, this.props.token, this.props.data.commentId, false, this.props.version)
        } else {
            setCommentStar(this.props.baseurl, this.props.token, this.props.data.commentId, true, this.props.version)
        }
    }


    render(){
        let star="material-icons"
        if(this.props.data.stared){
            star="material-icons amber-text text-accent-4"
        }
        return(
            <div className="card" key={this.props.data.commentId}>
                <div >
                    <div className="card-title">
                        <div className="row valign-wrapper top-align">
                            <div className="col s11">
                                <div className="row">
                                    <div className="col commenttitle">{this.props.data.blockName}</div>
                                    <div className="col commentauthor">{this.props.data.authorName}</div>
                                </div>
                            </div>
                            <div className="col s1 right-align dicon"><i className={star} onClick={this.handleStaring}>{this.props.data.stared?"star":"star_border"}</i></div> 
                            <div className="col s1 right-align dicon"><i className="material-icons" onClick={this.handleDelete}>delete</i></div>
                        </div>
                    </div>
                    <div className="card-content">
                    <div className="row">
                        <div className="col"><p>{this.props.data.text}</p></div>
                    </div></div>
                </div>
            </div>
        )
    }

}

function mapStateToProps(state, props) {
    return {
        baseurl: state.config.baseurl,
        token : state.userData.token,
        data:state.comment.comments.filter(c=>{return c.commentId===props.commentId})[0],
        version: state.comment.version
    }
}

function mapDispatchToProps(dispatch,props) {
return{}
}


const Comment = connect(mapStateToProps, mapDispatchToProps)(_Comment)

export default Comment
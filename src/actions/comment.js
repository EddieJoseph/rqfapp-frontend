import axios from 'axios';
import {store} from '../index.js'

export function getComments(baseurl, token, personId, errorHandling) {
    const authentification={Authorization:token}
    axios.get(baseurl + 'comment/' + personId ,{headers:authentification})
    .then((response)=>
        {store.dispatch(setComments(response.data.data,response.data.versionNr))}
    ).catch((error)=>{
        if(errorHandling!==undefined){
            errorHandling(error)
        }
    })
}

export function getCommentUpdate(baseurl, token, personId, version, errorHandling) {
    const authentification={Authorization:token}
    axios.get(baseurl+'comment/'+personId+'/'+version,{headers:authentification})
    .then((response)=>{
        for (var com in response.data.data){
            if(response.data.data[com].blockId==null&&response.data.data[com].authorName==null){
                store.dispatch(removeComment(response.data.data[com].commentId))
            } else{
                store.dispatch(setComment(response.data.data[com],response.data.versionNr))
            }
        }
    }).catch((error)=>{
        if(errorHandling!==undefined){
            errorHandling(error)
        }
    })
}

export function saveComment(baseurl, token, comment, version, currentPersonId, errorHandling) {
    const authentification={Authorization:token}
    axios.post(baseurl + 'comment/' +version,comment,{headers:authentification})
    .then((response)=>{
        for (var com in  response.data.data){
            if(response.data.data[com].personId===currentPersonId){
                if(response.data.data[com].blockId==null&&response.data.data[com].authorName==null){
                    store.dispatch(removeComment(response.data.data[com].commentId))
                } else{
                    store.dispatch(setComment(response.data.data[com],response.data.versionNr))
                } 
            }
        }
    
    }).catch((error)=>{
        if(errorHandling!==undefined){
            errorHandling(error)
        }
    })
}

export function deleteComment(baseurl, token, commentId, errorHandling) {
    const authentification={Authorization:token}
    axios.delete(baseurl + 'comment/' + commentId ,{headers:authentification})
    .then((response)=>{
        store.dispatch(removeComment(commentId))
    }).catch((error)=>{
        if(errorHandling!==undefined){
            errorHandling(error)
        }
    })
}

export function setCommentStar(baseurl, token, commentId, value, version, errorHandling){
    const authentification={Authorization:token}
    axios.post(baseurl + 'comment/star/' + commentId + "/" + value +'/'+version,{},{headers:authentification})
    .then((response)=>{
        for (var com in  response.data.data){
            if(response.data.data[com].blockId==null&&response.data.data[com].authorName==null){
                store.dispatch(removeComment(response.data.data[com].commentId))
            } else{
                store.dispatch(setComment(response.data.data[com],response.data.versionNr))
            } 
        }
    }).catch((error)=>{
        if(errorHandling!==undefined){
            errorHandling(error)
        }
    })
}

export function setComments(comments,version){
    return {
        type: "SET_COMMENTS",
        comments:comments,
        version:version
    }
}

export function setComment(comment,version){
    return {
        type: "SET_COMMENT",
        comment:comment,
        version:version
    }
}

export function removeComment(commentId){
    return {
        type: "DELETE_COMMENTS",
        commentId:commentId
    }
}


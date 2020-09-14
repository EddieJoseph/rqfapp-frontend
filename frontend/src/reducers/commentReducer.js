const commentReducer = (state = {comments:[],version:null},action) => {
    var comments = []
    switch(action.type){
        case "SET_COMMENTS":
            return {...state,comments:action.comments,version:action.version};
        case "SET_COMMENT":
            comments = state.comments.filter(com=>{return com.commentId!==action.comment.commentId})
            comments.push(action.comment)
            return {...state,comments:comments,version:action.version};
        case "DELETE_COMMENTS":
            comments = state.comments.filter(com=>{return com.commentId!==action.commentId})
            return {...state,comments:comments};
        default:
            return state;
    }
}

export default commentReducer;
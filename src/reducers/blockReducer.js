const blockReducer = (state = {block:[]},action) => {
    switch(action.type){
        case "SET_BLOCKS":
            return {...state,block:action.blocks};
        default:
            return state;
    }
}

export default blockReducer;
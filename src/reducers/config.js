

const configReducer = (state = {baseurl:'https://rqfapp.ch/api/'}, action) => {
//const configReducer = (state = {baseurl:"https://dummy:8082/"}, action) => {
    switch(action.type) {
        case "UPDATE_CONFIG":
            return {...state, ...action.config};
        default:
            return state;
    }
}

export default configReducer;
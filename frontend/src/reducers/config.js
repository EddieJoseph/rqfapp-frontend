

const configReducer = (state = {baseurl:window.location.href.split(":")[0]+"://" + window.location.host.split(":")[0]+":8082/"}, action) => {
//const configReducer = (state = {baseurl:"https://dummy:8082/"}, action) => {
    switch(action.type) {
        case "UPDATE_CONFIG":
            return {...state, ...action.config};
        default:
            return state;
    }
}

export default configReducer;
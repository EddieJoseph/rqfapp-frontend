import counterReducer from './counter'
import loggedReducer from './isLogged'
import configReducer from './config'
import userReducer from './userReducer'
import checkboxReducer from './checkboxReducer'
import personReducer from './personReducer'
import blockReducer from './blockReducer'
import commentReducer from './commentReducer'
import { combineReducers} from 'redux'

const appReducer = combineReducers({
    counter: counterReducer,
    isLogged: loggedReducer,
    config: configReducer ,
    userData: userReducer,
    person: personReducer,
    checkbox: checkboxReducer,
    blocks: blockReducer,
    comment: commentReducer
})


const rootReducer = (state, action) => {
    if(action.type === "LOGOUT") {
        //document.cookie = "token=none;path=/;";
        state = undefined
    }
    return appReducer(state, action)
}

export default rootReducer;
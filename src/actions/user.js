import axios from 'axios';
import {store} from '../index.js'

export function loadUser(baseurl, token, errorHandling){
    const authentification={Authorization:token}
    axios.get(baseurl + 'user/',{headers:authentification})
    .then((response)=>{
        store.dispatch(setUser(response.data))
    }).catch(error=>{
        if(errorHandling!==undefined){
            errorHandling(error)
        }
    }
    )
}

export function setUser(user){
    return {
        type:"SET_USER",
        user:user
    }

}
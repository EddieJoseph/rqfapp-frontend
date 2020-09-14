import axios from 'axios';
import {loadUser} from './user';
import {store} from '../index.js'

export function getCookie(cname) {
    var name = cname + "=";
    var decodedCookie = decodeURIComponent(document.cookie);
    var ca = decodedCookie.split(';');
    for(var i = 0; i <ca.length; i++) {
      var c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  }

export function login(baseurl, username, password, errorHandling){
    var data={username:username,password:password}
    return axios.post(baseurl+'authenticate',data,{headers:data})
    .then((response) => {
        store.dispatch(setToken(response.data.token))
    }).catch((error)=>{errorHandling(error)})
}

export function setToken(token){
    var now = new Date();
    now.setTime(now.getTime() + 1 * 3600 * 1000 / 2);
    document.cookie = "token=" + token + ";path=/;"
    return {
        type:"SET_TOKEN",
        token:token
    }
}

export function logout(){
    document.cookie = "token=none;path=/;";
    return {
        type:"LOGOUT",
        token:null
    }
}

export function loadUserFromCookie(baseurl, errorHandling) {
    if(getCookie("token")!==""){
        let token = getCookie("token")
        store.dispatch(setToken(token))
        loadUser(baseurl, token, errorHandling)
    } else {
        console.log("failed cookie loading")
        errorHandling()
    }

}

export function catchNetworkError(error) {
    console.log(error.response)
    console.log("catch network error called")
    //window.location.href = "/logout"
        //console.log(error)
        if(error.response===undefined){
            console.log(error)
            //alert("Ein Fehler ist aufgetreten. \nDetails: "+error.message)
        }else
        if(error.response.status===401){
            store.dispatch(logout())
            console.log("Sitzung abgelaufen")
            window.location.href = "/login"
            //alert("Benutzername oder Passwort falsch.")
        }else
        if(error.response.status===404){
            //alert("Der Server ist nicht erreichbar.")
        }else
        if(error.response.status===500){
            //alert("Auf dem Server ist ein Fehler aufgetreten.")
        }else{
            //alert("Ein umbekannter Fehler ist aufgetreten.")
        }
        
}
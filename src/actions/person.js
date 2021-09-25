import axios from 'axios';
import {store} from '../index.js'

export function getPeople(baseurl, token, errorHandling) {
    const authentification={Authorization:token}
    axios.get(baseurl+'person/', {headers:authentification})
    .then((response)=>{
        store.dispatch(setPeople(response.data))
        for (var p in response.data){
            getImageForPerson(baseurl, token, response.data[p])
        }
    }).catch((error)=>{
        if(errorHandling!==undefined){
            errorHandling(error)
        }
    })
}

export function getPerson(baseurl, token, personId, errorHandling) {
    const authentification={Authorization:token}
    axios.get(baseurl+'person/' + personId ,{headers:authentification})
    .then((response)=>{
        store.dispatch(setPerson(response.data))
        getImageForPerson(baseurl, token, response.data)
    }).catch((error)=>{
        if(errorHandling!==undefined){
            errorHandling(error)
        }
    })
}

export function getImageForPerson(baseurl, token, person) {
    const authentification={Authorization:token}
    axios(
        baseurl+person.imageUrl,
        {
            method: 'GET',
            /*mode: 'no-cors',*/
            headers: authentification,
            withCredentials: false,
            credentials: 'same-origin',
            crossdomain: true,
            responseType: 'blob'
        }
    ).then((response => {
        const data = response.data;
        const url = URL.createObjectURL(data)
        store.dispatch(saveImageUrl(person.id, url))
    })).catch((error)=>{})
}

export function saveImageUrl(personId, url){
    return {
        type: "SAVE_IMAGE",
        personId:personId,
        url:url
    }

}

export function setCurrentPerson(personId){
    return {
        type: "SET_CURRENT_PERSON",
        personId:personId
    }
}

export function setPeople(people) {
    return {
        type:"SET_PEOPLE",
        people:people
    }
}

export function setPerson(person) {
    return {
        type:"SET_PERSON",
        person:person
    }
}
import axios from 'axios';
import {store} from '../index.js'

export function getStructure(baseurl, token, errorHandling) {
    const authentification={Authorization:token}
    axios.get(baseurl+'cb/',{headers:authentification})
    .then((response)=>{
        store.dispatch(setStructure(response.data))
    }).catch((error)=>{
        if(errorHandling!==undefined){
            errorHandling(error)
        }
    })
}

export function getPersonalCheckboxes(baseurl, token, personId, errorHandling) {
    const authentification={Authorization:token}
    axios.get(baseurl+'cb/'+personId,{headers:authentification})
    .then((response)=>{
        store.dispatch(setPersonalCheckboxes(response.data.data,response.data.versionNr))
    }).catch((error)=>{
        if(errorHandling!==undefined){
            errorHandling(error)
        }
    })
}

export function getCheckboxUpdates(baseurl, token, personId, version, errorHandling){
    const authentification={Authorization:token}
    axios.get(baseurl+'cb/'+personId+'/'+version,{headers:authentification})
    .then((response)=>{
        for (var c in response.data.data){
            store.dispatch(setPersonalCheckbox(response.data.data[c],response.data.versionNr))
        }
    }).catch((error)=>{
        if(errorHandling!==undefined){
            errorHandling(error)
        }
    })
}

export function saveCheckbox(baseurl, token, personId, checkboxId, checkbox, version, errorHandling) {
    const authentification={Authorization:token}
    axios.put(baseurl+'cb/'+personId +"/" + checkboxId +"/"+version, checkbox, {headers:authentification})
    .then((response) =>{
        for (var c in response.data.data){
            store.dispatch(setPersonalCheckbox(response.data.data[c],response.data.versionNr))
        }
    }).catch((error)=>{
        if(errorHandling!==undefined){
            errorHandling(error)
        }
    }) 
}

export function setStructure(structure) {
    return {
        type:"SET_STRUCTURE",
        structure:structure
    }
}

export function setPersonalCheckboxes(checkboxes,version) {
    return {
        type:"SET_CHECKBOXES",
        checkboxes:checkboxes,
        version:version
    }
}

export function setPersonalCheckbox(checkbox,version) {
    return {
        type:"UPDATE_CHECKBOX",
        checkbox:checkbox,
        version:version
    }
}

export function expandCheckbox(checkboxId) {
    return {
        type: "EXPAND_CHECKBOX",
        checkboxId:checkboxId
    }
}

export function reduceCheckbox(checkboxId) {
    return {
        type: "REDUCE_CHECKBOX",
        checkboxId:checkboxId
    }
}

export function toggleCheckbox(checkboxId) {
    return {
        type: "TOGGLE_CHECKBOX",
        checkboxId:checkboxId
    }
}

export function expandComment(checkboxId) {
    return {
        type: "EXPAND_COMMENT",
        checkboxId:checkboxId
    }
}

export function reduceComment(checkboxId) {
    return {
        type: "REDUCE_COMMENT",
        checkboxId:checkboxId
    }
}

export function toggleComment(checkboxId) {
    return {
        type: "TOGGLE_COMMENT",
        checkboxId:checkboxId
    }
}

export function updateCheckbox(checkboxId, checkbox) {
    return {
        type:"UPDATE_CHECKBOX",
        checkboxId:checkboxId,
        checkbox:checkbox
    }
}

/*
export function setPositiv(personId, checkboxId, value) {
    
    return {
        type: "CHECKBOX_SET_POSITIV",
        checkboxId:checkboxId,
        value:value
    }
}

export function setNgativ(personId, checkboxId, value) {
    
    return {
        type: "CHECKBOX_SET_POSITIV",
        checkboxId:checkboxId,
        value:value
    }
}

export function setSighted(personId, checkboxId, value) {
    
    return {
        type: "CHECKBOX_SET_SIGHTED",
        checkboxId:checkboxId,
        value:value
    }
}*/






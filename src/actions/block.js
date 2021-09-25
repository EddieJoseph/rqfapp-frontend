import axios from 'axios';
import {store} from '../index.js'

export function getBlocks(baseurl, token, errorHandling) {
    const authentification={Authorization:token}
    axios.get(baseurl+'block/', {headers:authentification})
    .then((response) =>{
        store.dispatch(setBlocks(response.data))
    }).catch((error)=>{
        if(errorHandling!==undefined){
            errorHandling(error)
        }
    })
}

export function getBlock(baseurl, token, blockId, errorHandling) {
    const authentification={Authorization:token}
    axios.get(baseurl+'block/'+blockId, {headers:authentification})
    .then((response) =>{
        store.dispatch(setBlock(response.data))
    }).catch((error)=>{
        if(errorHandling!==undefined){
            errorHandling(error)
        }
    })
}

export function setBlocks(blocks) {
    return {
        type:"SET_BLOCKS",
        blocks:blocks
    }
}

export function setBlock(block) {
    return {
        type:"SET_BLOCK",
        block:block
    }
}
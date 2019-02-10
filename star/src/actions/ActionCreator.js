import * as types from '../constants/ActionTypes';
import  SHA256  from 'crypto-js/sha256';
import { post } from '../services/Request';

let nxtMsgId = 0 ;
let date = new Date();
let utcTime = Math.round(new Date().getTime()/1000);
let crypto = "mAU8gMXyPc";
let apiKey = "rcjhupf3nukv75fnq9y839ck";
let security = apiKey.concat(crypto,utcTime);
let sig = SHA256(security).toString();
const pathUri = 'test/?api_key='+apiKey+'&sig='+sig 
let messagePayload = {  
    "socialProfile":{  
       "provider":"facebook",
       "sourceId":"1856276191284166",
       "id":"257179065286098xxx",
       "firstName":"Abbin",
       "lastName":"Varghese",
       "profileIcon":"https://platform-lookaside.fbsbx.com/platform/profilepic/?psid=2571790652860983&width=1024&ext=1545995985&hash=AeTiYsyzTuOLTcXf"
    },
    "agentActionRequired":"true",
    "message":{  
       "id":"HPKDfeuj0Uyv16H-FtJGc3Sso1aGqg1Js6l7o9-WP3Wt34xAhy_-ODkDN1jftn80viyE1bJiJb6HxWGQHCA56g1",
       "type":"text",
       "text":"",
       "direction":"OUTBOUND",
       "origin":"",
       "agentId":234567654,
       "status":null,
       "attachment":null
    }
 }
 export const addMessage = (message, author, images) => {
     messagePayload.message.text = message;
     messagePayload.message.origin = author;
     post(pathUri,messagePayload)
    return({
        type: types.ADD_MESSAGE,
        id: nxtMsgId++,
        message: message,
        author: author,
        images: images,
        date: date.toLocaleString()
    })
} 

export const messageReceived = (message) => ({
    type: types.MESSAGE_RECEIVED,
    id: nxtMsgId++,
    message,
})

export const displayUsersList = users => ({
    type: types.USERS_LIST,
    users
  })






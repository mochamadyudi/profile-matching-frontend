import io from 'socket.io-client';
import Utils from "./index";
const url = ["http://localhost:3000"];
// if(Utils.getToken("get")){
//     url.push('?token=',Utils.getToken('get'))
// }
const  socket = io("http://localhost:3000", {
    extraHeaders:{
        Authorization: `Bearer ${Utils.getToken('get')}`
    }
})


export default socket;

// class Socket {
//     /**
//      *
//      * @param {Object} props
//      * @param {String} props.url
//      */
//     constructor(props = {}) {
//         this.url = props?.url ?? ""
//     }
//
//     connect(){
//         return new WebSocket(`ws://${process.env.REACT_APP_HOST_SOCKET}${this.url}`)
//     }
//
//
// }
// const socket  = new WebSocket(`ws://${process.env.REACT_APP_HOST_SOCKET}`)
// export default socket
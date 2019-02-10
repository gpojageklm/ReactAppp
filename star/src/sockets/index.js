import * as types from '../constants/ActionTypes'
import { messageReceived, displayUsersList } from '../actions/ActionCreator'

const setupSocket = (dispatch, username) => {
  const socket = new WebSocket('ws://localhost:3000')

   socket.onopen = () => {
     alert("socket is connected successfully");
    socket.send(JSON.stringify({
      type: types.ADD_USER,
      name: username
    }))
  } 
  socket.onmessage = (event) => {
    const data = JSON.parse(event.data)
    alert(data)
    switch (data.type) {
      case types.ADD_MESSAGE:
        dispatch(messageReceived(data.message))
        break
      case types.USERS_LIST:
        dispatch(displayUsersList(data.users))
        break
      default:
        break
    }
  }
  return socket
}

export default setupSocket
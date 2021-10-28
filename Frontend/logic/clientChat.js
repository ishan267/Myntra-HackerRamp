import { io } from "socket.io-client";

const socket = io("ws://localhost:3000");
const userId = getState().auth.userId;

  socket.on("connect", () => {
    console.log(socket.id);
  });

  socket.on("message", data => {
    console.log(data);
  });
  

  socket.emit('join', { username, room }, (error) => {
    if (error) {
        alert(error);
    }
})
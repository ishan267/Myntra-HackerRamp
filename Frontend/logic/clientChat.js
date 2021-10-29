import { io } from "socket.io-client";
import { useSelector } from "react-redux";


const socket = io("ws://localhost:8080");
const userId = useSelector((state) => state.auth.userId);;

  socket.on("connect", () => {
    console.log('my socket id is',socket.id);
    console.log('my userid is',userId);
    socket.emit('update-socket-id',userId);
  });

  /*function sendtempMsg(message,sender,receiver)
  {
    console.log("message to be sent->",message);
    
    setTimeout(function(){ console("Hello"); }, 3000);    
    socket.emit('createMessage',{
      mid: new Date().getTime(),
      sen_id: sender,
      msg: message,
      tag: 1,
      rec_id: receiver});
  }*/

  socket.on('newMessage',(message)=>{
    console.log('message received from->',message.from);
    console.log(message.text);
});


  


export default sendtempMsg;
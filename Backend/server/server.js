const express = require('express');
const http = require('http');
const socketIO = require('socket.io'); 
const path = require('path');
const {isRealString} = require('./utils/validation');
const {users,chatrooms,messages,Users,Chatrooms,Messages} = require('./utils/users');

const publicPath = path.join(__dirname,'../public');
const port = process.env.PORT || 8080;
const app = express();
var server = http.createServer(app); 
var io = socketIO(server);
const {generateMessage,generateLocationMessage} = require('./utils/message');
var usersObj = new Users();
var roomsObj = new Chatrooms();
var mssgsObj = new Messages();

app.use(express.json());

app.use(express.static(publicPath));
console.log('HI');


io.on('connection',(socket)=>{
    console.log('New user connected');

    //update socket id
    socket.on('update-socket-id',(params,callback)=>{
        var user=usersObj.getUser(params.uid);
        for(var i=0;i<users.length;i++){
            if(users[i].uid==user.uid){
                users[i].sock_id=socket.id;
                break;
            }
        }
        callback(socket.id);
    })

    socket.on('join-room',(params,callback)=>{
        if(roomsObj.isPresentInRoom(params.cid,params.uid)){
            return callback('Username already exists in this room');
        }

        socket.join(params.cid);
        roomsObj.removeUser(params.cid,params.uid);
        usersObj.addUserToRoom(params.uid,params.cid);

        //Telling other users that a new user joined
        socket.broadcast.to(params.cid).emit('newMessage',generateMessage('Admin',`${params.uid} has joined`));

        console.log(users);
        console.log(chatrooms);
        console.log(messages);

        callback();
        
    });

    socket.on('disconnect',()=>{
        console.log(`${socket.id} is offline`);
    });
  
    socket.on('createMessage',(message,callback)=>{
        console.log("HERE")
        console.log(message);
        messages.push(message);
        if(isRealString(message.msg)){
            console.log("message is a valid string");
            if(message.tag==1){
                var user = usersObj.getUser(message.rec_id);
                console.log(user.sock_id);
                socket.to(user.sock_id).emit('newMessage',generateMessage(message.sen_id,message.msg)); //personal message
             }else{
                console.log(message.rec_id);
                io.to(message.rec_id).emit('newMessage',generateMessage(message.sen_id,message.msg));     //group message
             }
        }
        callback();
    });

    socket.on('get-chat-list',(params,callback)=>{
        var uid = params.uid;
        var chat_list = [];
        for(var i=0;i<users.length;i++){
            if(users[i].uid==uid){
                chat_list = users[i].friends;
                chat_list = chat_list.concat(users[i].c_rooms);
                break;
            }
        }
        return callback(chat_list);
    })
})


app.post('/add-friend',(req,res)=>{
    usersObj.addFriend(req.body.uid1,req.body.uid2);
    //console.log('after post request');
    //console.log(users);
    res.status(201).send(users);
})

server.listen(port,()=>{
    usersObj.addUser('user1',[],['room1']);
    usersObj.addUser('user2',[],['room1']);
    roomsObj.addChatroom('room1','ABCD','user1',['user1','user2'],['msg1']);
    roomsObj.addChatroom('room2','EFGH','',[],[]);
    mssgsObj.addMessage('msg1','user1','Welcome',0,'room1');
    console.log('Added first enteries hardcoded');
    //console.log(users);
    //console.log(chatrooms);
    //console.log(messages);
  console.log(`Server is up on port ${port}`);
});
 
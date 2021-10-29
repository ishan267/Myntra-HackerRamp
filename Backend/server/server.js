let cors = require("cors");
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

app.use(cors());
app.use(express.json());

app.use(express.static(publicPath));
console.log('HI');


io.on('connection',(socket)=>{
    console.log('New user connected');
    //console.log("after emit new msg");
    //update socket id
    socket.on('update-socket-id',(uid,callback)=>{
        console.log("updata socket id event received with id ",uid);
        var user=usersObj.getUser(uid);
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
        if(isRealString(message.text)){
            console.log("message is a valid string");
            if(message.tag==1){
                var user = usersObj.getUser(message.receiverId);
                console.log(user.sock_id);
                socket.to(user.sock_id).emit('newMessage',generateMessage(message.senderId,message.text)); //personal message
             }else{
                console.log(message.receiverId);
                io.to(message.receiverId).emit('newMessage',generateMessage(message.senderId,message.text));     //group message
             }
        }
        //callback();
    });
})

app.post('/get-friend-list',(req,res)=>{
    var uid = req.body.uid;
    frnds = [];
    for(var i=0;i<users.length;i++){
        if(users[i].friends.includes(uid))frnds.push(users[i]);
    }
    res.status(201).send(frnds);
})

app.post('/get-chatroom-list',(req,res)=>{
    var uid = req.body.uid;
    rooms = [];
    for(var i=0;i<chatrooms.length;i++){
        if(chatrooms[i].members.includes(uid))rooms.push(chatrooms[i]);
    }
    res.status(201).send(rooms);
})

app.get('/get-message-list',(req,res)=>{
    res.status(201).send(messages);
})

app.post('/add-friend',(req,res)=>{
    usersObj.addFriend(req.body.uid1,req.body.uid2);
    //console.log('after post request');
    //console.log(users);
    res.status(201).send(users);
})

server.listen(port,()=>{
    ids = ['Y7z8PA4X3oa1J8s7LdJUqKSCWCs2','jnDoAoWRJffAT2JtKBDrA01rdiB2','E2st6ZE60mOdnFGXt0D1GtpGbTC2','RX1dV5bEfHZxETs9mD3THqXd3f23','GhgR6m57mmaEZ4GMoicKuB6YzMv1'];
    usersObj.addUser(ids[0],'Klaus Mikaelson',[ids[1],ids[2],ids[3],ids[4]],['room2']);
    usersObj.addUser(ids[1],'Nar',[ids[0],ids[2]],['room1','room2']);
    usersObj.addUser(ids[2],'Mada',[ids[0],ids[1]],['room1','room2']);
    usersObj.addUser(ids[3],'Alpha Male',[ids[0],ids[4]],['room1','room2']);
    usersObj.addUser(ids[4],'Sigma Male',[ids[0],ids[3]],['room1','room2']);
    roomsObj.addChatroom('room1','Original Room',ids[0],[ids[0],ids[1],ids[2],ids[3],ids[4]],['msg1']);
    roomsObj.addChatroom('room2','Mastizaade',ids[3],[ids[1],ids[2],ids[3],ids[4]],[]);
    mssgsObj.addMessage('msg1',ids[0],'You all look well...i aim to change that .',0,'room1',"10th century");
    mssgsObj.addMessage('msg2',ids[3],'Aur Bhai kya haal chaal',1,ids[4],'today');
    mssgsObj.addMessage('msg3',ids[4],'Bs Badiya tu bata',1,ids[3],'today');
    console.log('Added first enteries hardcoded');
    //console.log(users);
    //console.log(chatrooms);
    //console.log(messages);
  console.log(`Server is up on port ${port}`);
});

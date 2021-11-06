users = [];
chatrooms = [];
messages = [];
sessions = [];

class Chatrooms{
	
	addChatroom(cid,cname,admin,members,msgs){
		var chatroom = {cid,cname,admin,members,msgs};
		chatrooms.push(chatroom);
		return chatroom;
	}
	removeChatroom(cid){
        chatrooms = chatrooms.filter(room=>room.cid!==cid);
	}
	removeUser(cid,uid){
       for(var i=0;i<chatrooms.length;i++){
       	if(chatrooms[i].cid==cid){
       		chatrooms[i].members = chatrooms[i].members.filter(user=>user.uid!==uid);
       		break;
       	}
       }
	}
	updateRoomUser(cid,uid){
		for(var i=0;i<chatrooms.length;i++){
			if(chatrooms[i].cid==cid){
				chatrooms[i].members.push(uid);
				break;
			}
		}
	}
	isPresentInRoom(cid,uid){
		for(var i=0;i<chatrooms.length;i++){
			if(chatrooms[i].cid==cid){
				for(var j=0;j<chatrooms[i].members.length;j++){
					if(chatrooms[i].members[j]==uid)return true;
				}
				return false;
				break;
			}
		}
		return false;
	}
}

class Users{

	addUser(uid,uname,friends,c_rooms,sock_id=0){
		var user = {uid,uname,friends,c_rooms,sock_id};
		users.push(user);
		return user;
	}
    addFriend(uid1,uid2){
    	for(var i=0;i<users.length;i++){
    		if(users[i].uid==uid1){
    			users[i].friends.push(uid2);
    			break;
    		}
    	}
    	for(var i=0;i<users.length;i++){
    		if(users[i].uid==uid2){
    			users[i].friends.push(uid1);
    			break;
    		}
    	}
    }
	getUser(uid){
        return users.filter(user=>user.uid==uid)[0];
	}
	removeUser(uid){

       for(var i=0;i<users.length;i++){
          if(users[i].uid==uid){
          	var ch = new Chatrooms();
          	for(var j=0;j<users[i].c_rooms.length;j++)ch.removeUser(users[i].c_rooms[j].cid,uid);
          	break;
          }
       }

        var user = this.getUser(uid);
        if(user){
           users = users.filter(user=>user.uid!==uid);
        }
      
        return user;
	}
	addUserToRoom(uid,cid){
		for(var i=0;i<users.length;i++){
			if(users[i].uid==uid){
              users[i].c_rooms.push(cid);
              var ch = new Chatrooms();
              ch.updateRoomUser(cid,uid);
              break;
			}
		}
	}
}


class Messages{
	
	addMessage(id,senderId,text,tag,receiverId,createdAt){
		var message = {id,senderId,text,tag,receiverId,createdAt};
		messages.push(message);
		return message;
	}
}

class Sessions{

	addSession(id,title,date,time,friendsId,adminId,carts){    //no need for now, may be used later
		var obj = {
			"id":id,
			"title":title,
			"date":date,
			"time":time,
			"friendsId":friendsId,
			"adminId":adminId,
			"carts":carts
		}
		sessions.push(obj);
	}

	updateCarts(id,cartsObj){
		for(var i=0;i<sessions.length;i++){
			if(sessions[i].id==id){
				let isPresent = 0;
				for(var j=0;j<sessions[i].carts.length;j++){
					if(sessions[i].carts[j].id==cartsObj.id){
                        isPresent=1;
                        sessions[i].carts[j]=cartsObj;
                        break;
					}
				}
				if(isPresent==0)sessions[i].carts.push(cartsObj);
				break;
			}
		}
	}
}

module.exports = {users,chatrooms,messages,sessions,Users,Chatrooms,Messages,Sessions};
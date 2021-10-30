import chatroom from "../../models/chatroom";

export const FETCH_CHATROOMS="FETCH_CHATROOMS";
export const CREATE_CHATROOM="CREATE_CHATROOM";
export const DELETE_CHATROOM="DELETE_CHATROOM";
export const UPDATE_CHATROOM="UPDATE_CHATROOM";

export const fetchChatroom = () => {
  console.log("fetch chatrooms called");
    return async (dispatch, getState) => {
       
      try {
          const response =  await fetch(
          'http://localhost:8080/get-chatroom-list',
          {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json'
            },
            body: JSON.stringify({
              uid: getState().auth.userId
            })
          }
        );

        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
  
        const resData = await response.json();
        console.log("response received for chatrooms",resData);
        const rooms = [];
        for(let i=0;i<resData.length;i++)
        {
          const room = {
            id:resData[i].cid,
            name:resData[i].cname,
            adminId:resData[i].admin,
            usersId:resData[i].members.slice(),
            messagesId:resData[i].msgs.slice()
          }
          rooms.push(room);
        }
        console.log("array of is",rooms);
        const loadedChatrooms=rooms.slice();
        
        dispatch({
          type: FETCH_CHATROOMS,
          chatrooms:loadedChatrooms,
        });
      } catch (err) {
        // send to custom analytics server
        throw err;
      }
    };
  };

  export const createChatroom=(newChatroom)=>{
    return async (dispatch,getState)=>{

      try{  
        
         //request to send database to add newChatroom
  
        dispatch({
            type:CREATE_CHATROOM,
            chatroomData:{
              id:newChatroom.id,
              name:newChatroom.name,
              adminId:newChatroom.text,
              usersId:newChatroom.receiverId,
              messagesId:newChatroom.senderId,

            }
        })
      }catch(err){
          throw err;
      }
  }
  }
  //less prior
  export const updateChatroom=()=>{

  }
  //less prior
  export const deleteChatroom=()=>{

  }


  // {
  //   id: '1',
  //   userName: 'Jenny Doe',
  //   userImg: require('../../assets/users/user-3.jpg'),
  //   messageTime: '4 mins ago',
  //   messageText:
  //     'Hey there, this is my test for a post of my social app in React Native.',
  // },
  // {
  //   id: '2',
  //   userName: 'John Doe',
  //   userImg: require('../../assets/users/user-1.jpg'),
  //   messageTime: '2 hours ago',
  //   messageText:
  //     'Hey there, this is my test for a post of my social app in React Native.',
  // },
  // {
  //   id: '3',
  //   userName: 'Ken William',
  //   userImg: require('../../assets/users/user-4.jpg'),
  //   messageTime: '1 hours ago',
  //   messageText:
  //     'Hey there, this is my test for a post of my social app in React Native.',
  // },
  // {
  //   id: '4',
  //   userName: 'Selina Paul',
  //   userImg: require('../../assets/users/user-6.jpg'),
  //   messageTime: '1 day ago',
  //   messageText:
  //     'Hey there, this is my test for a post of my social app in React Native.',
  // },
  // {
  //   id: '5',
  //   userName: 'Christy Alex',
  //   userImg: require('../../assets/users/user-7.jpg'),
  //   messageTime: '2 days ago',
  //   messageText:
  //     'Hey there, this is my test for a post of my social app in React Native.',
  // },
import baseUrl from "../../helper/baseUrl";
export const FETCH_USERS="FETCH_USERS";

export const fetchUsers = () => {
  console.log("fetch users called");
    return async (dispatch, getState) => {
       
      try {
        console.log("before request sent to url",baseUrl);
        const response =  await fetch(
          `${baseUrl}/get-users`
        );
        console.log("response received for fetch users",response);

        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
  
        const resData = await response.json();
        console.log("response received for users",resData);
        const users = [];
        for(let i=0;i<resData.length;i++)
        {
          const user = {
            id:resData[i].uid,
            name:resData[i].uname,
            friends:resData[i].friends.slice(),
            chatrooms:resData[i].c_rooms.slice()
          }
          users.push(user);
        }
        console.log("array of users is",users);
        const loadedUsers=users.slice();
    
        dispatch({
          type: FETCH_USERS,
          users:loadedUsers,
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
            /*chatroomData:{
              id:newChatroom.id,
              name:newChatroom.name,
              adminId:newChatroom.adminId,
              usersId:newChatroom.usersId,
              messagesId:newChatroom.messagesId
            }*/
            chatroomData:newChatroom
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

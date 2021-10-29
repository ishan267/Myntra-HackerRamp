import user from "../../models/user"

export const FETCH_FRIENDS="FETCH_FRIENDS";
export const ADD_FRIEND="ADD_FRIEND";
export const DELETE_FRIEND="DELETE_FRIEND";

export const fetchFriends=()=>{

    return async(dispatch,getState)=>{
        try{
            const respone =  await fetch(
                'http://localhost:8080/get-chat-list',
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
              console.log("response received",resData);
                // fetch request will be sent to database to get loadedFriends
                const loadedFriends=resData.slice();;
                dispatch({
                    type:FETCH_FRIENDS,
                    loadedFriends:loadedFriends
                })

        }catch(err){
            throw err;
        }
    }

}

export const addFriends=(newFriend)=>{
    //post request will be sent to database
    return async (dispatch,getState)=>{

        try{  
          
           //request to send database to add newChatroom
    
          dispatch({
              type:ADD_FRIEND,
              friendData:{
                id:newFriend.id,
                name:newFriend.name,
                friends:newFriend.friends,
                chatrooms:newChatroom.chatrooms,
              }
          })
        }catch(err){
            throw err;
        }
    }

}
//less prior
export const deleteFriends=()=>{
    //post request will be sent to database

}

import baseUrl from "../../helper/baseUrl";
import user from "../../models/user"

export const FETCH_FRIENDS="FETCH_FRIENDS";
export const ADD_FRIEND="ADD_FRIEND";
export const DELETE_FRIEND="DELETE_FRIEND";

export const fetchFriends=()=>{
    console.log("fetch friends called");
    return async(dispatch,getState)=>{
        try{
            const response =  await fetch(
                //'http://localhost:8080/get-friend-list',
                `${baseUrl}/get-friend-list`,
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
              console.log("response received for friends",resData);
              const friends = [];
              for(let i=0;i<resData.length;i++)
              {
                const friend = {
                  id:resData[i].uid,
                  name:resData[i].uname,
                  friends:resData[i].friends,
                  chatrooms:resData[i].c_rooms.slice()
                }
                friends.push(friend);
              }
              console.log("array of friends is",friends);
                const loadedFriends=friends.slice();
                dispatch({
                    type:FETCH_FRIENDS,
                    loadedFriends:loadedFriends
                })

        }catch(err){
            throw err;
        }
    }

}

export const addFriend=(newFriend)=>{
  console.log("add friend called with ",newFriend);
    //post request will be sent to database
    return async (dispatch,getState)=>{

        try{  
          
          const response =  await fetch(
            `${baseUrl}/add-friend`,
            {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json'
              },
              body: JSON.stringify({
                userId1: getState().auth.userId,
                userId2: newFriend.id
              })
            }
          );

          if (!response.ok) {
            throw new Error('Something went wrong!');
          }
    

           
    
          dispatch({
              type:ADD_FRIEND,
              friendData:{
                id:newFriend.id,
                name:newFriend.name,
                friends:newFriend.friends,
                chatrooms:newFriend.chatrooms,
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

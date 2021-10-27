import user from "../../models/user"
import{
    FETCH_FRIENDS,
    ADD_FRIEND,
    DELETE_FRIEND
}from "../actions/friends"

const initialState={
    allFriends:[]
}

export default (state=initialState,action)=>{
    switch(action.type){
        case FETCH_FRIENDS:{
            return {
                allFriends:action.loadedFriends
            }
        }
        case ADD_FRIEND:{
            const newFriend=new user(
                   action.friendData.id,
                   action.friendData.name,
                   action.friendData.friends,
                   action.friendData.chatrooms 
            )
            return{
                ...state,
                allFriends:state.allFriends.concat(newFriend)
            }
        
        }
        case DELETE_FRIEND:{
           return{
               ...state,
               allFriends:state.allFriends.filter(friend=>friend.id===action.friendId)
           }
        }
    }
    return state
}
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

        }
        case ADD_FRIEND:{
        
        }
        case DELETE_FRIEND:{

        }
    }
    return state
}
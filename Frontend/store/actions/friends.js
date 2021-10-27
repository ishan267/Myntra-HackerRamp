import user from "../../models/user"

export const FETCH_FRIENDS="FETCH_FRIENDS";
export const ADD_FRIEND="ADD_FRIEND";
export const DELETE_FRIEND="DELETE_FRIEND";

export const fetchFriends=()=>{

    return async(dispatch,getState)=>{
        try{
            // fetch request will be sent to database to get loadedFriends
            const loadedFriends=[];
            dispatch({
                type:FETCH_FRIENDS,
                loadedFriends:loadedFriends
            })

        }catch(err){
            throw err;
        }
    }

}

export const addFriends=()=>{
    //post request will be sent to database

}

export const deleteFriends=()=>{
    //post request will be sent to database

}

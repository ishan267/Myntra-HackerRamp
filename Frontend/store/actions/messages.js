import message from "../../models/message";

export const FETCH_MESSAGE="FETCH_MESSAGE";
export const ADD_MESSAGE="ADD_MESSAGE";
export const DELETE_MESSAGE="DELETW_MESSAGE";

export const fetchMessage=()=>{
  return async (dispatch,getState)=>{

      try{  
        const loadedMessages=[];
        dispatch({
            type:FETCH_MESSAGE,
            loadedMessages:loadedMessages
        })
      }catch(err){
          throw err;
      }

  }
}

export const addMessage=()=>{

}

export const deleteMessage=()=>{

}
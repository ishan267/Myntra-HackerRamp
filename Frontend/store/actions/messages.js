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

export const addMessage=(newMessage)=>{
  return async (dispatch,getState)=>{

    try{  
      
       //request to send database to add newMessage

      dispatch({
          type:ADD_MESSAGE,
          messageData:{
            id:newMessage.id,
            createdAt:newMessage.createdAt,
            text:newMessage.text,
            receiverId:newMessage.receiverId,
            senderId:newMessage.senderId,
            tag:newMessage.tag, 
            productsDiscussed:newMessage.productsDiscussed
           
          }
      })
    }catch(err){
        throw err;
    }

}

}
//less prior
export const deleteMessage=()=>{

}
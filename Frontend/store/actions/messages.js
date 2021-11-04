import message from "../../models/message";
import baseUrl from "../../helper/baseUrl";

export const FETCH_MESSAGE="FETCH_MESSAGE";
export const ADD_MESSAGE="ADD_MESSAGE";
export const ADD_SESSION_MESSAGE="ADD SESSION MESSAGE";
export const DELETE_MESSAGE="DELETE_MESSAGE";

export const fetchMessage=()=>{
  console.log("fetch messages called");
  return async (dispatch,getState)=>{

      try{  
        const response =  await fetch(
          //'http://localhost:8080/get-message-list'
          `${baseUrl}/get-message-list`
        );
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
  
        const resData = await response.json();
        console.log("response received for messages",resData);
        const loadedMessages=resData.slice();
        dispatch({
            type:FETCH_MESSAGE,
            loadedMessages:loadedMessages
        })
      }catch(err){
          throw err;
      }

  }
}

export const addMessage = (newMessage) => {
  return async (dispatch, getState) => {

    try {

      //request to send database to add newMessage
      //not required as msg already sent using socket
      console.log("inside message action creator")
      dispatch({
        type: ADD_MESSAGE,
        messageData: {
          id: newMessage.id,
          createdAt: newMessage.createdAt,
          text: newMessage.text,
          receiverId: newMessage.receiverId,
          senderId: newMessage.senderId,
          tag: newMessage.tag,
          productsDiscussed: newMessage.productsDiscussed,
          image: newMessage.image
        }
      })
    } catch (err) {
      throw err;
    }
  }
}

export const addSessionMessage = (newMessage) => {
  return async (dispatch, getState) => {

    try {
      console.log("inside message action creator")
      dispatch({
        type: ADD_SESSION_MESSAGE,
        messageData: newMessage
      })
    } catch (err) {
      throw err;
    }
  }
}



//less prior
export const deleteMessage=()=>{

}
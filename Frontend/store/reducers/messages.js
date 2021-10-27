import message from "../../models/message";


import{
    FETCH_MESSAGE,
    ADD_MESSAGE,
    DELETE_MESSAGE

}from "../actions/messages"

const initialState={
    allMessages:[]
}

export default (state=initialState,action)=>{

    switch(action.type){
        case FETCH_MESSAGE:{
            return {  
                allMessages: action.loadedMessages, 
                };
        }
        case ADD_MESSAGE:{
             const newMessage=new message(
                action.messageData.id,
                action.messageData.recieverId,
                action.messageData.senderId,
                action.messageData.tag,
                action.chatroomData.time,
                action.chatroomData.productsDiscussed,
                action.chatroomData.text
             )
             return {
                ...state,
                allMessages: state.allMessages.concat(newMessage)
              };
        }
        case DELETE_MESSAGE:{
            return{
                ...state,
                allMessages:state.allMessages.filter(message=>message.id===action.messageId)
            }

        }
    }

    return state;

}
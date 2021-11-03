import Session from "../../models/session";

import {
    FETCH_SESSIONS,
    CREATE_SESSION,
    DELETE_SESSION,
    UPDATE_SESSION,
} from "../actions/sessions";


const initialState = {
    availableSessions: [], 
  };
  
  export default (state = initialState, action) => {
    
    switch (action.type) {
      case FETCH_CHATROOMS:   //Done ,action part left
        return {  
        availableChatrooms: action.chatrooms, 
        };
      case CREATE_CHATROOM:          //Done ,action part left
      console.log("reducer for create chatroom called with room",action.chatroomData);
        const newChatroom = new chatroom(
          action.chatroomData.id,
          action.chatroomData.name,
          action.chatroomData.adminId,
          action.chatroomData.usersId,
          action.chatroomData.messagesId
        );
        console.log("room to be added is",newChatroom);
        return {
          ...state,
          availableChatrooms: state.availableChatrooms.concat(newChatroom)
        };
      /*case UPDATE_CHATROOM:
        const productIndex = state.userProducts.findIndex(
          prod => prod.id === action.pid
        );
        const updatedProduct = new Product(
          action.pid,
          state.userProducts[productIndex].ownerId,
          action.productData.title,
          action.productData.imageUrl,
          action.productData.description,
          state.userProducts[productIndex].price
        );
        const updatedUserProducts = [...state.userProducts];
        updatedUserProducts[productIndex] = updatedProduct;
        const availableProductIndex = state.availableProducts.findIndex(
          prod => prod.id === action.pid
        );
        const updatedAvailableChatrooms = [...state.availableChatrooms];
        updatedAvailableProducts[availableProductIndex] = updatedProduct;
        return {
          ...state,
         availableChatrooms: updatedAvailableChatrooms,
        };
      case DELETE_CHATROOM:     // Done only action part left
        return {
          ...state,
          availableChatrooms: state.availableChatrooms.filter(
            chatroom => chatroom.id !== action.chatroomid
          ),
        };*/
    }
    return state;
  };
  

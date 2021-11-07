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
      case FETCH_SESSIONS:   //Done ,action part left
        console.log("reducer called for fetch sessions with",action.loadedSessions);
        let newarray=[];
        if(action.loadedSessions!=undefined)
          for(let i=0;i<action.loadedSessions.length;i++)
            newarray.push(action.loadedSessions[i]);
        console.log("all sessions to be added are",newarray);
        return {  
        availableSessions: newarray, 
        };
      case CREATE_SESSION:          //Done ,action part left
      console.log("reducer for create session called with ",action.sessionData);
        const newSession = new Session(
          action.sessionData.id,
          action.sessionData.title,
          action.sessionData.date,
          action.sessionData.time,
          action.sessionData.members,
          action.sessionData.adminId
        );
        console.log("session to be added is",newSession);
        return {
          ...state,
          availableSessions: state.availableSessions.concat(newSession)
        };
      /*case UPDATE_SESSION:
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
      case DELETE_SESSION:     // Done only action part left
        return {
          ...state,
          availableChatrooms: state.availableChatrooms.filter(
            chatroom => chatroom.id !== action.chatroomid
          ),
        };*/
    }
    return state;
  };
  

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

        }
        case ADD_MESSAGE:{

        }
        case DELETE_MESSAGE:{

        }
    }

    return state;

}
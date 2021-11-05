import {FETCH_USERS} from "../actions/users";


const initialState = {
    availableUsers: []
  };
  
  export default (state = initialState, action) => {
    
    switch (action.type) {
      case FETCH_USERS:  
        console.log("reducer fetch users called with users->",action.users);
        return {  
        availableUsers: action.users, 
        };
       
    }
    return state;
  };
  

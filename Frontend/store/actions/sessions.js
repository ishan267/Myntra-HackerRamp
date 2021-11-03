import baseUrl from "../../helper/baseUrl";
export const FETCH_SESSIONS="FETCH_SESSIONS";
export const CREATE_SESSION="CREATE_SESSION";
export const DELETE_SESSION="DELETE_SESSION";
export const UPDATE_SESSION="UPDATE_SESSION";

export const fetchSessions=()=>{

}

export const createSession=(newSession)=>{
    return async (dispatch,getState)=>{

      try{  
        
         //request to send database to add newChatroom
  
        dispatch({
            type:CREATE_SESSION,
            sessionData:newSession
        })
      }catch(err){
          throw err;
      }
  }
}

export const updateSession=()=>{

}

export const deleteSession=()=>{

}

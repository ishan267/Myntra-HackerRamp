import baseUrl from "../../helper/baseUrl";
export const FETCH_SESSIONS="FETCH_SESSIONS";
export const CREATE_SESSION="CREATE_SESSION";
export const DELETE_SESSION="DELETE_SESSION";
export const UPDATE_SESSION="UPDATE_SESSION";


export const fetchSessions=()=>{
  console.log("fetch sessions called");
  return async (dispatch,getState)=>{

      try{  
        const response =  await fetch(
          `${baseUrl}/get-sessions`
        );
        if (!response.ok) {
          throw new Error('Something went wrong!');
        }
        //console.log("response is",response)
        const resData = await response.json();
        console.log("response received for sessions",resData);
        const loadedSessions=resData.slice();
        dispatch({
            type:FETCH_SESSIONS,
            loadedSessions:loadedSessions
        })
      }catch(err){
          throw err;
      }

  }
}

export const createSession = (newSession) => {
  console.log("create sessions called with ",newSession);
  return async (dispatch, getState) => {

    try {

      const response = await fetch(
        `${baseUrl}/add-session`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            session:newSession
          })
        }
      );
  
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }

      console.log("inside message action creator")
      dispatch({
        type:CREATE_SESSION,
        sessionData:newSession
    })
    } catch (err) {
      throw err;
    }
  }
}

export const updateSession=()=>{

}

export const deleteSession=()=>{

}


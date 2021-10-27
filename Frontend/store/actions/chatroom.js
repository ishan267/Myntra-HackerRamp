import chatroom from "../../models/chatroom";

export const FETCH_CHATROOMS="FETCH_CHATROOMS";
export const CREATE_CHATROOM="CREATE_CHATROOM";
export const DELETE_CHATROOM="DELETE_CHATROOM";
export const UPDATE_CHATROOM="UPDATE_CHATROOM";
export const FETCH_MESSAGES="FETCH_MESSAGES";

export const fetchChatroom = () => {
    return async (dispatch, getState) => {
       
      // any async code you want!
      // const userId = getState().auth.userId;
      try {
        // const response = await fetch(
        //   'https://sellshop-deeb5-default-rtdb.firebaseio.com/products.json'
        // );
  
        // if (!response.ok) {
        //   throw new Error('Something went wrong!');
        // }
  
        // const resData = await response.json();
        // const loadedProducts = [];
  
        // for (const key in resData) {
        //   loadedProducts.push(
        //     new Product(
        //       key,
        //       resData[key].ownerId,
        //       resData[key].title,
        //       resData[key].imageUrl,
        //       resData[key].description,
        //       resData[key].price
        //     )
        //   );
        // }
     
        dispatch({
          type: FETCH_CHATROOMS,
          // chatrooms: loadedChatrooms,
        });
      } catch (err) {
        // send to custom analytics server
        throw err;
      }
    };
  };

  export const fetchMessage=()=>{
    return async(dispatch,getState)=>{
        try{
          dispatch(
            {
              type:FETCH_MESSAGES,
            }
          )

        }catch(err){
          throw err;
        }
      }
  }
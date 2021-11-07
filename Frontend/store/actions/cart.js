export const ADD_TO_CART = 'ADD_TO_CART';
export const REMOVE_FROM_CART = 'REMOVE_FROM_CART';
export const ADD_TO_SESSION_CART="ADD_TO_SESSION_CART";
export const REMOVE_FROM_SESSION_CART="REMOVE_FROM_SESSION_CART";
export const FETCH_SESSION_CARTS="FETCH_SESSION_CARTS";
import baseUrl from "../../helper/baseUrl";

export const addToCart = product => {
  return { type: ADD_TO_CART, product: product };
};

export const removeFromCart = productId => {
  return { type: REMOVE_FROM_CART, pid: productId };
};

export const fetchSessionCarts = sessionId => {
  console.log("fetch session cart called with session id",sessionId);
  return async (dispatch,getState)=>{

    try{  
      
      const response =  await fetch(
        `${baseUrl}/get-cart`,
        {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify({
            id: sessionId
          })
        }
      );
      if (!response.ok) {
        throw new Error('Something went wrong!');
      }
      const resData = await response.json();
      console.log("response received for fetch session cart",resData);
        // const rooms = [];
        // for(let i=0;i<resData.length;i++)
        // {
        //   const room = {
        //     id:resData[i].cid,
        //     name:resData[i].cname,
        //     adminId:resData[i].admin,
        //     usersId:resData[i].members.slice(),
        //     messagesId:resData[i].msgs.slice()
        //   }
        //   rooms.push(room);
        // }
        // console.log("array of is",rooms);
        // const loadedChatrooms=rooms.slice();
      dispatch({
          type:FETCH_SESSION_CARTS,
          sessionCartData:resData.slice()
      })
    }catch(err){
        throw err;
    }
}

}

export const addToSessionCart = product => {
  return { type: ADD_TO_SESSION_CART, product: product };
};

export const removeFromSessionCart = productId => {
  return { type: REMOVE_FROM_SESSION_CART, pid: productId };
};

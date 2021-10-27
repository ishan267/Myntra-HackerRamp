import chatroom from "../../models/chatroom";

export const FETCH_CHATROOMS="FETCH_CHATROOMS";
export const CREATE_CHATROOM="CREATE_CHATROOM";
export const DELETE_CHATROOM="DELETE_CHATROOM";
export const UPDATE_CHATROOM="UPDATE_CHATROOM";

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
        const loadedChatrooms=[
          {
            id: '1',
            userName: 'Jenny Doe',
            userImg: require('../../assets/users/user-3.jpg'),
            messageTime: '4 mins ago',
            messageText:
              'Hey there, this is my test for a post of my social app in React Native.',
          },
          {
            id: '2',
            userName: 'John Doe',
            userImg: require('../../assets/users/user-1.jpg'),
            messageTime: '2 hours ago',
            messageText:
              'Hey there, this is my test for a post of my social app in React Native.',
          },
          {
            id: '3',
            userName: 'Ken William',
            userImg: require('../../assets/users/user-4.jpg'),
            messageTime: '1 hours ago',
            messageText:
              'Hey there, this is my test for a post of my social app in React Native.',
          },
          {
            id: '4',
            userName: 'Selina Paul',
            userImg: require('../../assets/users/user-6.jpg'),
            messageTime: '1 day ago',
            messageText:
              'Hey there, this is my test for a post of my social app in React Native.',
          },
          {
            id: '5',
            userName: 'Christy Alex',
            userImg: require('../../assets/users/user-7.jpg'),
            messageTime: '2 days ago',
            messageText:
              'Hey there, this is my test for a post of my social app in React Native.',
          },
        ];
        
     
        dispatch({
          type: FETCH_CHATROOMS,
          chatrooms:loadedChatrooms,
        });
      } catch (err) {
        // send to custom analytics server
        throw err;
      }
    };
  };

  export const createChatroom=()=>{

  }

  export const updateChatroom=()=>{

  }

  export const deleteChatroom=()=>{

  }
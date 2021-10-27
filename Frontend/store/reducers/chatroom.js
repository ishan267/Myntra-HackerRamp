import chatroom from "../../models/chatroom";

import {
    FETCH_CHATROOMS,
    CREATE_CHATROOM,
    DELETE_CHATROOM,
    UPDATE_CHATROOM,
    FETCH_MESSAGES,
} from "../actions/chatroom";


const initialState = {
    availableChatrooms: [], 
    availableMessages:[],
  };
  
  export default (state = initialState, action) => {
    switch (action.type) {
      case FETCH_CHATROOMS:
        return {
          availableChatrooms:[
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
          ]
          // availableChatrooms: action.loadedChatrooms,
        //   userProducts: action.userProducts
        };
      case CREATE_CHATROOM:
        const newProduct = new Product(
          action.productData.id,
          action.productData.ownerId,
          action.productData.title,
          action.productData.imageUrl,
          action.productData.description,
          action.productData.price
        );
        return {
          ...state,
          availableProducts: state.availableProducts.concat(newProduct),
          userProducts: state.userProducts.concat(newProduct)
        };
      case UPDATE_CHATROOM:
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
        const updatedAvailableProducts = [...state.availableProducts];
        updatedAvailableProducts[availableProductIndex] = updatedProduct;
        return {
          ...state,
          availableProducts: updatedAvailableProducts,

          userProducts: updatedUserProducts
        };
      case DELETE_CHATROOM:
        return {
          ...state,
          userProducts: state.userProducts.filter(
            product => product.id !== action.pid
          ),
          availableProducts: state.availableProducts.filter(
            product => product.id !== action.pid
          )
        };
       case FETCH_MESSAGES:
         return{
           availableMessages:
           [
            {id:1,text:"hey",sent:false},
            {id:2,text:"hello",sent:true}
           ]
         }
    }
    return state;
  };
  

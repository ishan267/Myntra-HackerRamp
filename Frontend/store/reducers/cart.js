import { ADD_TO_CART, REMOVE_FROM_CART,ADD_TO_SESSION_CART,REMOVE_FROM_SESSION_CART, FETCH_SESSION_CARTS } from '../actions/cart';
import { ADD_ORDER } from '../actions/orders';
import CartItem from '../../models/cart-item';
import { DELETE_PRODUCT } from '../actions/products';

const initialState = {
  items: {},
  totalAmount: 0,
  sessionItems:{},
  sessionAmount:0,
  sessionCarts:[]
};

export default (state = initialState, action) => {
  switch (action.type) {
    case ADD_TO_CART:
      const addedProduct = action.product;
      const prodPrice = addedProduct.price;
      const prodTitle = addedProduct.title;

      let updatedOrNewCartItem;
      console.log("cart state is",state);
      if (state.items[addedProduct.id]) {
        // already have the item in the cart
        updatedOrNewCartItem = new CartItem(
          state.items[addedProduct.id].quantity + 1,
          prodPrice,
          prodTitle,
          state.items[addedProduct.id].sum + prodPrice
        );
      } else {
        updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
      }
      return {
        ...state,
        items: { ...state.items, [addedProduct.id]: updatedOrNewCartItem },
        totalAmount: state.totalAmount + prodPrice
      };
    case REMOVE_FROM_CART:
      const selectedCartItem = state.items[action.pid];
      const currentQty = selectedCartItem.quantity;
      let updatedCartItems;
      if (currentQty > 1) {
        // need to reduce it, not erase it
        const updatedCartItem = new CartItem(
          selectedCartItem.quantity - 1,
          selectedCartItem.productPrice,
          selectedCartItem.productTitle,
          selectedCartItem.sum - selectedCartItem.productPrice
        );
        updatedCartItems = { ...state.items, [action.pid]: updatedCartItem };
      } else {
        updatedCartItems = { ...state.items };
        delete updatedCartItems[action.pid];
      }
      return {
        ...state,
        items: updatedCartItems,
        totalAmount: state.totalAmount - selectedCartItem.productPrice
      };
    case ADD_ORDER:
      return initialState;
    case DELETE_PRODUCT:
      if (!state.items[action.pid]) {
        return state;
      }
      const updatedItems = { ...state.items };
      const itemTotal = state.items[action.pid].sum;
      delete updatedItems[action.pid];
      return {
        ...state,
        items: updatedItems,
        totalAmount: state.totalAmount - itemTotal
      };
      case ADD_TO_SESSION_CART:
        console.log("reducer add to session cart called");
        let addedProd = action.product;
        let productPrice = addedProd.price;
        let productTitle = addedProd.title;
  
        let newCartItem;
        //console.log("cart state is",state);
        if (state.sessionItems[addedProd.id]) {
          // already have the item in the cart
          newCartItem = new CartItem(
            state.sessionItems[addedProd.id].quantity + 1,
            productPrice,
            productTitle,
            state.sessionItems[addedProd.id].sum + productPrice
          );
        } else {
          newCartItem = new CartItem(1, productPrice, productTitle, productPrice);
        }
        return {
          ...state,
          sessionItems: { ...state.sessionItems, [addedProd.id]: newCartItem },
          sessionAmount: state.sessionAmount + productPrice
        };
        case FETCH_SESSION_CARTS:
          console.log("reducer fetch session called called");
          return{
            ...state,
            sessionCarts:[]
          };
  }

  return state;
};

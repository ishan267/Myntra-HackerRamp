import { ADD_TO_CART, REMOVE_FROM_CART,ADD_TO_SESSION_CART,REMOVE_FROM_SESSION_CART } from '../actions/cart';
import { ADD_ORDER } from '../actions/orders';
import CartItem from '../../models/cart-item';
import { DELETE_PRODUCT } from '../actions/products';

const initialState = {
  items: {},
  totalAmount: 0,
  sessionItems:{},
  sessionAmount:0
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
        addedProduct = action.product;
        prodPrice = addedProduct.price;
        prodTitle = addedProduct.title;
  
        //let updatedOrNewCartItem;
        //console.log("cart state is",state);
        if (state.sessionItems[addedProduct.id]) {
          // already have the item in the cart
          updatedOrNewCartItem = new CartItem(
            state.sessionItems[addedProduct.id].quantity + 1,
            prodPrice,
            prodTitle,
            state.sessionItems[addedProduct.id].sum + prodPrice
          );
        } else {
          updatedOrNewCartItem = new CartItem(1, prodPrice, prodTitle, prodPrice);
        }
        return {
          ...state,
          sessionItems: { ...state.sessionItems, [addedProduct.id]: updatedOrNewCartItem },
          sessionAmount: state.sessionAmount + prodPrice
        };
  }

  return state;
};

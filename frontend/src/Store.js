import { createContext, useReducer } from 'react';

export const Store = createContext();

// create a componeta named store provider its a wrapper to our react application in index.js
//and pass globle props to children

const initialState = {
  userInfo: localStorage.getItem('userInfo')
    ? JSON.parse(localStorage.getItem('userInfo'))
    : null,
  cart: {
    shippingAddress: localStorage.getItem('shippingAddress')
      ? JSON.parse(localStorage.getItem('shippingAddress'))
      : {},

    //cartItems come fromlocal storage
    //that check if cartItems exist in local storage
    //use JASON.parse to convert the string to javascript object
    //otherwise set it to empty array

    cartItems: localStorage.getItem('cartItems')
      ? JSON.parse(localStorage.getItem('cartItems'))
      : [],
  },
};

function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM':
      //to resolve the issue of adding same product multiple time
      const newItem = action.payload;
      const existItem = state.cart.cartItems.find(
        (item) => item.p_key === newItem.p_key
      );
      //if existItem already in cart we use map function to  update the current
      //item with newitem other keep the previouse item in cart
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item._id === existItem._id ? newItem : item
          )
        : //if existitem is null means new item added in end of array
          [...state.cart.cartItems, newItem];

      // save item in local storage so on refresh item store on loal storage
      // 2 parameters one is key = cartItems and  second is string value that save in key in local storage
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      //update cartitem
      return { ...state, cart: { ...state.cart, cartItems } };
    case 'CART_REMOVE_ITEM': {
      //filter find current item in cartItems
      //array if found remove it otherwise return it
      const cartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      // save item in local storage so on refresh item store on loal storage
      // 2 parameters one is key = cartItems and  second is string value that save in key in local storage
      localStorage.setItem('cartItems', JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case 'USER_SIGNIN': {
      //keep prev state and update userinfo with data we get from backend
      return { ...state, userInfo: action.payload };
    }

    case 'USER_SIGNOUT': {
      //keep prev state and update userinfo to null
      return {
        ...state,
        userInfo: null,
        cart: {
          cartItems: [],
          shippingAddress: {},
        },
      };
    }

    case 'SAVE_SHIPPING_ADDRESS': {
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        },
      };
    }

    default:
      return state;
  }
}

export function StoreProvider(props) {
  const [state, dispatch] = useReducer(reducer, initialState);
  const value = { state, dispatch };
  // store is coming from react context
  return <Store.Provider value={value}>{props.children}</Store.Provider>;
}

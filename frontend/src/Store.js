import { createContext, useReducer } from 'react';

export const Store = createContext();

// create a componeta named store provider its a wrapper to our react application in index.js
//and pass globle props to children

const initialState = {
  cart: {
    cartItems: [],
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
      //update cartitem
      return { ...state, cart: { ...state.cart, cartItems } };

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

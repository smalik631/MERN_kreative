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
      // add to cart
      // keep all the previouse state in ...state
      // then in cart we keep all previous state in cart and only update
      //cartitem that also conatian previous and add new one as action.payload
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: [...state.cart.cartItems, action.payload],
        },
      };

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

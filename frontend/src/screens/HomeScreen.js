import { useEffect, useReducer, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import logger from 'use-reducer-logger';
//import data from '../data';

const reducer = (state, action) => {
  // define switch case and type of action
  switch (action.type) {
    case 'FETCH_REQUEST': // it happend when we start sending ajax request to backend
      return { ...state, loading: true }; //return new state value, keep the previous state values and
    //only update loading to true that show loading box in UI
    case 'FETCH_SUCCESS':
      return { ...state, products: action.payload, loading: false }; //return new state value, keep the previous state values and
    //only update producte to data that is coming from action
    // ***action.payload*** contain all products from backend
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default: // if action not equal to above cases we return current state
      return state;
  }
};
//accept 2 parameters first the current state and second the action that change the state and create new state
function HomeScreen() {
  // define array that contain 2 values first one is object and second is dispatch that ues to for calling an action and update state
  //useReducer accept 2 parameters first is the function and second is the default state in which
  //we use objects and set theire values set loading to ture bcz for the first time we fetch data from backend
  const [{ loading, error, products }, dispatch] = useReducer(logger(reducer), {
    products: [],
    oading: true,
    error: '',
  });

  // now use dipatch to update state
  // define state to save products from backend
  //const [products, setProducts] = useState([]);
  useEffect(() => {
    // call an api
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      //try catch to get error in ajax request
      try {
        const result = await axios.get('/api/products');
        //if we get result successfully data from backend
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        dispatch({ type: 'FETCH_FAIL', payload: err.message });
      }
      //setProducts(result.data); //this data is from backend
    };
    fetchData();
  }, []); //empty array because we goning to run the use effect one time after renderin the component
  return (
    <div>
      <h1>Featured Products</h1>
      {/* style pruducts next to each other */}
      <div className="products">
        {
          //loading ture
          loading ? (
            <div>Loading....</div>
          ) : error ? (
            <div>{error}</div>
          ) : (
            products.map((product) => (
              <div className="product" key={product.p_key}>
                {/* link product image and name to product detail page */}
                <Link to={`/product/${product.p_key}`}>
                  {/* tag a refresh page each time to mae website single page we use
              link tag link is component from react router DOM */}
                  <img src={product.image} alt={product.name} />
                </Link>
                <div className="product-info">
                  <Link to={`/product/${product.p_key}`}>
                    <p>{product.name}</p>
                  </Link>
                  <p>
                    <strong>Rs.{product.price}</strong>
                  </p>
                  <button>Add to Cart</button>
                </div> 
              </div>
            ))
          )
        }
      </div>
    </div>
  );
}

export default HomeScreen;

import { useEffect, useReducer } from 'react';
import axios from 'axios';
import logger from 'use-reducer-logger';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Product from '../components/Product';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
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
    loading: true,
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
      <Helmet>
        <title>Kreative </title>
      </Helmet>
      <h1>Featured Products</h1>
      {/* style pruducts next to each other */}
      <div className="products">
        {
          //loading ture
          loading ? (
            <LoadingBox />
          ) : error ? (
            // <div>{error}</div>
            <MessageBox variant="danger">{error}</MessageBox>
          ) : (
            // using row and col to put items next to each other if there is
            //no space it put item to next line we use sizes for different screens
            //marging button to 3rem
            <Row>
              {products.map((product) => (
                <Col key={product.p_key} sm={6} md={4} lg={3} className="mb-3">
                  <Product product={product}></Product>
                </Col>
              ))}
            </Row>
          )
        }
      </div>
    </div>
  );
}

export default HomeScreen;

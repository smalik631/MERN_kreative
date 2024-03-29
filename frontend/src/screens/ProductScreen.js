import { useNavigate, useParams } from 'react-router-dom';
import { useContext, useEffect, useReducer } from 'react';
import axios from 'axios';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import ListGroup from 'react-bootstrap/ListGroup';
import Badge from 'react-bootstrap/Badge';
import Rating from '../components/Rating';
import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/esm/Button';
import { Helmet } from 'react-helmet-async';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';
import { getError } from '../utils';
import { Store } from '../Store';
//fetch product from backend so
const reducer = (state, action) => {
  // define switch case and type of action
  switch (action.type) {
    case 'FETCH_REQUEST': // it happend when we start sending ajax request to backend
      return { ...state, loading: true }; //return new state value, keep the previous state values and
    //only update loading to true that show loading box in UI
    case 'FETCH_SUCCESS':
      return { ...state, product: action.payload, loading: false }; //return new state value, keep the previous state values and
    //only update producte to data that is coming from action
    // ***action.payload*** contain all products from backend
    case 'FETCH_FAIL':
      return { ...state, loading: false, error: action.payload };
    default: // if action not equal to above cases we return current state
      return state;
  }
};
function ProductScreen() {
  const navigate = useNavigate();
  // we could access that particular string or value
  // in the route by calling the ***useParams*** hook.
  // then id would equal that string. This can be
  // useful in dynamic routing and passing
  // props to components and routes.
  const params = useParams();
  const { p_key } = params;

  // define array that contain 2 values first one is object and second is dispatch that ues to for calling an action and update state
  //useReducer accept 2 parameters first is the function and second is the default state in which
  //we use objects and set theire values set loading to ture bcz for the first time we fetch data from backend
  const [{ loading, error, product }, dispatch] = useReducer(reducer, {
    product: [],
    loading: true,
    error: '',
  });

  useEffect(() => {
    const fetchData = async () => {
      dispatch({ type: 'FETCH_REQUEST' });
      //try catch to get error in ajax request
      try {
        const result = await axios.get(`/api/products/p_key/${p_key}`);
        dispatch({ type: 'FETCH_SUCCESS', payload: result.data });
      } catch (err) {
        //  getError from utils file
        dispatch({ type: 'FETCH_FAIL', payload: getError(err) });
      }
    };
    fetchData();
  }, [p_key]);

  //  use useContext() to have access to the state of the context
  // and change the context
  //const { state, dispatch: ctxDispatch } = useContext(Store);
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { cart } = state;
  const addToCartHandler = async () => {
    // product duplication check in cart
    const existItem = cart.cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    // ajax request for current product to check the cart quantity to avalible stock quantity//
    const { data } = await axios.get(`/api/products/${product._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      //console.log('Sorry. Product is out of stock');
      return;
    }
    // add item to the cart for this first
    //we need the context
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...product, quantity },
    });
    //redirect user to cartscreen
    navigate('/cart');
  };

  return (
    // <div>
    //   <h1>{p_key}</h1>
    // </div>

    loading ? (
      <LoadingBox />
    ) : error ? (
      // <div>{error}</div>
      <MessageBox variant="danger">{error}</MessageBox>
    ) : (
      <div>
        <Row>
          <Col md={6}>
            <img
              className="img-large"
              src={product.image}
              alt={product.name}
            ></img>
          </Col>
          <Col md={3}>
            {/* display list of items as a list  */}
            <ListGroup variant="flush">
              <ListGroup.Item>
                <Helmet>
                  <title>{product.name}</title>
                </Helmet>
                <h1>{product.name}</h1>
              </ListGroup.Item>
              <ListGroup.Item>
                <Rating
                  rating={product.rating}
                  numreviews={product.numreviews}
                />
              </ListGroup.Item>
              <ListGroup.Item>Price: Rs{product.price}</ListGroup.Item>
              <ListGroup.Item>
                Description:<p>{product.description}</p>
              </ListGroup.Item>
            </ListGroup>
          </Col>
          <Col md={3}>
            <Card>
              <Card.Body>
                <ListGroup variant="flush">
                  <ListGroup.Item>
                    <Row>
                      <Col>Price:</Col>
                      <Col>Rs{product.price}</Col>
                    </Row>
                  </ListGroup.Item>
                  <ListGroup.Item>
                    <Row>
                      <Col>Status:</Col>
                      <Col>
                        {product.countInStock > 0 ? (
                          <Badge bg="success">In Stock</Badge>
                        ) : (
                          <Badge bg="danger">Unavalible</Badge>
                        )}
                      </Col>
                    </Row>
                  </ListGroup.Item>
                  {/* if product avalible add to cart button show */}
                  {product.countInStock > 0 && (
                    <ListGroup.Item>
                      <div className="d-grid">
                        <Button
                          class="btn"
                          onClick={addToCartHandler}
                          variant="primary"
                        >
                          Add to Cart
                        </Button>
                      </div>
                    </ListGroup.Item>
                  )}
                </ListGroup>
              </Card.Body>
            </Card>
          </Col>
        </Row>
      </div>
    )
  );
}
export default ProductScreen;

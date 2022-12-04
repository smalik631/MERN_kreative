import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';
import axios from 'axios';
import { useContext } from 'react';
import { Store } from '../Store';

function Product(props) {
  const { product } = props;

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  const addtoCartHandler = async (item) => {
    const existItem = cartItems.find((x) => x._id === product._id);
    const quantity = existItem ? existItem.quantity + 1 : 1;
    // ajax request to backend to get current product from backend
    const { data } = await axios.get(`/api/products/${item._id}`);
    if (data.countInStock < quantity) {
      window.alert('Sorry. Product is out of stock');
      //console.log('Sorry. Product is out of stock');
      return;
    }
    // add item to the cart for this first
    //we need the context
    ctxDispatch({
      type: 'CART_ADD_ITEM',
      payload: { ...item, quantity },
    });
  };

  return (
    // card creatr box on screen for each item
    <Card>
      {/* link product image and name to product detail page */}
      <Link to={`/product/${product.p_key}`}>
        {/* tag a refresh page each time to mae website single page we use
  link tag link is component from react router DOM */}
        <img src={product.image} className="card-img-top" alt={product.name} />
      </Link>
      <Card.Body>
        <Link to={`/product/${product.p_key}`}>
          <Card.Title>{product.name}</Card.Title>
        </Link>
        <Rating rating={product.rating} numreviews={product.numreviews} />
        <Card.Text>Rs.{product.price}</Card.Text>
        <Button onClick={() => addtoCartHandler(product)}>Add to Cart</Button>
      </Card.Body>
    </Card>
  );
}
export default Product;

import Card from 'react-bootstrap/Card';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';
import Rating from './Rating';

function Product(props) {
  const { product } = props;
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
        <Button>Add to Cart</Button>
      </Card.Body>
    </Card>
  );
}
export default Product;

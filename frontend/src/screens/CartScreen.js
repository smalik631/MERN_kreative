import { useContext } from 'react';
import Col from 'react-bootstrap/esm/Col';
import Row from 'react-bootstrap/esm/Row';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import MessageBox from '../components/MessageBox';
import ListGroup from 'react-bootstrap/ListGroup';
import { Store } from '../Store';
import Button from 'react-bootstrap/esm/Button';
import Card from 'react-bootstrap/Card';

export default function CartScreen() {
  const { state, dispatch: ctxDispatch } = useContext(Store);
  const {
    cart: { cartItems },
  } = state;

  return (
    <div>
      <Helmet>
        <title>Shopping Cart</title>
      </Helmet>
      <h1>Shopping Cart</h1>
      <Row>
        <Col md={8}>
          {/* show list of item */}
          {cartItems.length === 0 ? (
            <MessageBox>
              Cart is Empty.
              <Link to="/">Go Shopping</Link>
            </MessageBox>
          ) : (
            <ListGroup>
              {cartItems.map((item) => (
                <ListGroup.Item key={item._id}>
                  <Row className="align-items-center">
                    {/* show image on column */}
                    <Col md={4}>
                      <img
                        src={item.image}
                        alt={item.name}
                        className="img-fluid rounded img-thumbnail"
                      ></img>{' '}
                      {/* link to product */}
                      <Link to={`/product/${item.p_key}`}>{item.name}</Link>
                    </Col>
                    {/* button to decrease number to item */}
                    <Col md={3}>
                      <Button variant="light" disabled={item.quantity === 1}>
                        <i className="fas fa-minus-circle"></i>
                      </Button>{' '}
                      <span>{item.quantity}</span>{' '}
                      {/*add uptp item in stock} */}
                      <Button
                        variant="light"
                        disabled={item.quantity === item.countInStock}
                      >
                        <i className="fas fa-plus-circle"></i>
                      </Button>
                    </Col>
                    <Col md={3}>Rs.{item.price}</Col>
                    <Col md={2}>
                      <Button variant="light">
                        <i className="fas fa-trash"></i>
                      </Button>
                    </Col>
                  </Row>
                </ListGroup.Item>
              ))}
            </ListGroup>
          )}
        </Col>
        <Col md={4}>
          {/* add action part */}
          <Card>
            <Card.Body>
              <ListGroup variant="flush">
                <ListGroup.Item>
                  <h3>
                    Total Items ({cartItems.reduce((a, c) => a + c.quantity, 0)}
                    ):{'   '} Rs
                    {cartItems.reduce((a, c) => a + c.price * c.quantity, 0)}
                  </h3>
                </ListGroup.Item>
                <div className="d-grid">
                  <Button
                    type="button"
                    variant="primary" //make button gold
                    disabled={cartItems.length === 0}
                  >
                    Proceed to Checkout
                  </Button>
                </div>
              </ListGroup>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </div>
  );
}

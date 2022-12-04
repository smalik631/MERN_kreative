import { BrowserRouter, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Nav from 'react-bootstrap/Nav';
import Badge from 'react-bootstrap/Badge';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
import { Link } from 'react-router-dom';
import { useContext } from 'react';
import { Store } from './Store';
import CartScreen from './screens/CartScreen';
function App() {
  const { state } = useContext(Store);
  const { cart } = state;
  return (
    // page divide into 3 parts header, main and footer
    <BrowserRouter>
      {/* add felx to the parent as footer remian at end*/}
      <div className="d-flex flex-column site-container">
        <header>
          <Navbar className="color-nav" variant="dark">
            {/* create containers of item next to each other in a row */}
            <Container>
              <LinkContainer to="/">
                <Navbar.Brand className="kreative">Kreative</Navbar.Brand>
              </LinkContainer>
              <Nav className="me-auto">
                {/* link to cart */}
                <Link to="/cart" className="nav-link">
                  Cart
                  {cart.cartItems.length > 0 && (
                    <Badge pill bg="danger">
                      {/* //display cart item count 
                      a = accumolator c= current value intialy accumolator is 0*/}
                      {cart.cartItems.reduce((a, c) => a + c.quantity, 0)}
                    </Badge>
                  )}
                </Link>
              </Nav>
            </Container>
          </Navbar>
          {/* <Link to="/">Kreative</Link> */}
        </header>
        <main>
          <Container className="mt-3">
            {/* defining Routes */}
            <Routes>
              {/* define new route that has product as prefix and key of product as parameter */}
              <Route path="/product/:p_key" element={<ProductScreen />} />

              {/* define first route for this we need two attributes first the path user enter in url for HomeScreen
            we need to define componenet that responds to this path, for this we define element attribute and set it to JSX  */}
              <Route path="/" element={<HomeScreen />} />
              <Route path="/cart" element={<CartScreen />} />
            </Routes>
          </Container>
        </main>
        <footer>
          <div className="text-center">All rights reserved</div>
        </footer>
      </div>
    </BrowserRouter>
  );
}

export default App;

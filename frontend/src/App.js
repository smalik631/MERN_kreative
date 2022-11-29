import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import { LinkContainer } from 'react-router-bootstrap';
function App() {
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
            </Container>
          </Navbar>
          {/* <Link to="/">Kreative</Link> */}
        </header>
        <main>
          <Container>
            {/* defining Routes */}
            <Routes>
              {/* define new route that has product as prefix and key of product as parameter */}
              <Route path="/product/:p_key" element={<ProductScreen />} />

              {/* define first route for this we need two attributes first the path user enter in url for HomeScreen
            we need to define componenet that responds to this path, for this we define element attribute and set it to JSX  */}
              <Route path="/" element={<HomeScreen />} />
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

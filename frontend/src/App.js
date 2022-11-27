import { BrowserRouter, Link, Route, Routes } from 'react-router-dom';
import HomeScreen from './screens/HomeScreen';
import ProductScreen from './screens/ProductScreen';
function App() {
  return (
    <BrowserRouter>
      <div>
        <header>
          <Link to="/">Kreative</Link>
        </header>
        <main>
          {/* defining Routes */}
          <Routes>
            {/* define new route that has product as prefix and key of product as parameter */}
            <Route path="/product/:p_key" element={<ProductScreen />} />

            {/* define first route for this we need two attributes first the path user enter in url for HomeScreen
            we need to define componenet that responds to this path, for this we define element attribute and set it to JSX  */}
            <Route path="/" element={<HomeScreen />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}

export default App;

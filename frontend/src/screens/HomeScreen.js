import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
//import data from '../data';
import axios from 'axios';
function HomeScreen() {
  // define state to save products from backend
  const [products, setProducts] = useState([]);
  useEffect(() => {
    // call an api
    const fetchData = async () => {
      const result = await axios.get('/api/products');
      setProducts(result.data); //this data is from backend
    };
    fetchData();
  }, []); //empty array because we goning to run the use effect one time after renderin the component
  return (
    <div>
      <h1>Featured Products</h1>
      {/* style pruducts next to each other */}
      <div className="products">
        {products.map((product) => (
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
        ))}
      </div>
    </div>
  );
}

export default HomeScreen;

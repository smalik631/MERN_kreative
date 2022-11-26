import { useParams } from 'react-router-dom';

function ProductScreen() {
  // we could access that particular string or value
  // in the route by calling the ***useParams*** hook.
  // then id would equal that string. This can be
  // useful in dynamic routing and passing
  // props to components and routes.
  const params = useParams();
  const { p_key } = params;
  return (
    <div>
      <h1>{p_key}</h1>
    </div>
  );
}
export default ProductScreen;

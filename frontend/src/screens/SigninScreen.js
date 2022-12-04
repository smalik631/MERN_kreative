import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/Container';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation } from 'react-router-dom';
import Form from 'react-bootstrap/Form';

export default function SigninScreen() {
  // to get redirect value form url
  const { search } = useLocation();
  // get redirect url
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  // check redirectInUrl if it exist set it in redirect
  const redirect = redirectInUrl ? redirectInUrl : '/';
  return (
    //sign in form
    <Container className="small-container">
      <Helmet>
        <title>Sign In</title>
      </Helmet>
      <h1 className="my-3">Sign In</h1>
      <Form>
        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          {/* // create input box */}
          <Form.Control type="email" required />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          {/* // create input box */}
          <Form.Control type="password" required />
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Sign In</Button>
        </div>
        <div className="mb-3">
          {/* if customer is new redirect it to singup */}
          New Customer?{' '}
          <Link to={`/signup?redirect=${redirect}`}>Create your Account</Link>
        </div>
      </Form>
    </Container>
  );
}

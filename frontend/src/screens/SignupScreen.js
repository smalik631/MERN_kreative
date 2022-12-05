import Button from 'react-bootstrap/esm/Button';
import Container from 'react-bootstrap/Container';
import { Helmet } from 'react-helmet-async';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import Form from 'react-bootstrap/Form';
import { useContext, useEffect, useState } from 'react';
import axios from 'axios';
import { Store } from '../Store';
import { toast } from 'react-toastify';
import { getError } from '../utils';
export default function SignupScreen() {
  // to get redirect value form url
  const navigate = useNavigate();
  const { search } = useLocation();
  // get redirect url
  const redirectInUrl = new URLSearchParams(search).get('redirect');
  // check redirectInUrl if it exist set it in redirect
  const redirect = redirectInUrl ? redirectInUrl : '/';

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmpassword, setConfirmPassword] = useState('');

  const { state, dispatch: ctxDispatch } = useContext(Store);
  const { userInfo } = state;

  const submitHandler = async (e) => {
    //prevent refreshing the page
    e.preventDefault();
    if (password !== confirmpassword) {
      toast.error('Password do not match');
      return;
    }
    try {
      const { data } = await axios.post('/api/users/signup', {
        name,
        email,
        password,
      });
      ctxDispatch({ type: 'USER_SIGNIN', payload: data });
      localStorage.setItem('userInfo', JSON.stringify(data));
      navigate(redirect || '/');
      // console.log(data);
      // console.log('hello');
    } catch (err) {
      toast.error(getError(err));
    }
  };

  //while i am already signin and  change url to http://localhost:3000/signin
  // i redirected to signin page
  // to remove this issue we use useEffect

  useEffect(() => {
    if (userInfo) {
      navigate(redirect);
    }
  }, [navigate, redirect, userInfo]);

  return (
    //sign in form
    <Container className="small-container">
      <Helmet>
        <title>Sign Up</title>
      </Helmet>
      <h1 className="my-3">Sign Up</h1>
      <Form onSubmit={submitHandler}>
        <Form.Group className="mb-3" controlId="name">
          <Form.Label>Name</Form.Label>
          {/* // create input box */}
          <Form.Control onChange={(e) => setName(e.target.value)} />
        </Form.Group>

        <Form.Group className="mb-3" controlId="email">
          <Form.Label>Email</Form.Label>
          {/* // create input box */}
          <Form.Control
            type="email"
            required
            onChange={(e) => setEmail(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-3" controlId="password">
          <Form.Label>Password</Form.Label>
          {/* // create input box */}
          <Form.Control
            type="password"
            required
            onChange={(e) => setPassword(e.target.value)}
          />

          <Form.Group className="mb-3" controlId="confirmpassword">
            <Form.Label>Confirm Password</Form.Label>
            {/* // create input box */}
            <Form.Control
              type="password"
              required
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
          </Form.Group>
        </Form.Group>
        <div className="mb-3">
          <Button type="submit">Sign Up</Button>
        </div>
        <div className="mb-3">
          Already have an Account?{' '}
          <Link to={`/signup?redirect=${redirect}`}>Sign-In</Link>
        </div>
      </Form>
    </Container>
  );
}

import { useState } from 'react';
import { useMutation } from '@apollo/client';
import { Link } from 'react-router-dom';
import { LOGIN } from '../utils/mutations';
import Auth from '../utils/auth';
import decode from 'jwt-decode';
import { Container, Form, Button } from 'react-bootstrap';

function Login(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [login, { error }] = useMutation(LOGIN);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    try {
      const mutationResponse = await login({
        variables: { email: formState.email, password: formState.password },
      });
      const token = mutationResponse.data.login.token;
      Auth.login(token);
      console.log(decode(token))
      console.log('hi')
    } catch (e) {
      console.log(e);
    }

  };

  const handleChange = (event) => {
    const { name, value } = event.target;
    setFormState({
      ...formState,
      [name]: value,
    });
  };

  return (
    <Container className="my-1">
      <h2>Login</h2>
      <Form onSubmit={handleFormSubmit}>
        <Form.Group className="mb-2">
          <Form.Label>Email address:</Form.Label>
          <Form.Control
            type="email"
            name="email"
            placeholder="youremail@test.com"
            onChange={handleChange}
          />
        </Form.Group>
        <Form.Group className="mb-2">
          <Form.Label>Password:</Form.Label>
          <Form.Control
            type="password"
            name="password"
            placeholder="******"
            onChange={handleChange}
          />
        </Form.Group>
        {error && (
          <div>
            <p className="error-text">The provided credentials are incorrect</p>
          </div>
        )}
        <div className="d-flex justify-content-end">
          <button type="submit"
             style={{
              border: '2px solid #cdb4db',
              borderRadius: '5px',
              padding: '10px',
              cursor: 'pointer',
              transition: 'background-color 0.3s ease, color 0.3s ease', 
            }}
            onMouseOver={(e) => {
              e.target.style.backgroundColor = '#cdb4db';
              e.target.style.color = 'white'; 
            }}
            onMouseOut={(e) => {
              e.target.style.backgroundColor = '';
              e.target.style.color = 'black'; 
            }}
            >Submit</button>
        </div>
      </Form>
    </Container>
  );
}

export default Login;

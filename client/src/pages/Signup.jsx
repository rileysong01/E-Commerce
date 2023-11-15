import { useState } from 'react';
import { Link } from 'react-router-dom';
import { useMutation } from '@apollo/client';
import Auth from '../utils/auth';
import { ADD_USER } from '../utils/mutations';
import { Container, Row, Col, Form, Button } from 'react-bootstrap';

function Signup(props) {
  const [formState, setFormState] = useState({ email: '', password: '' });
  const [addUser] = useMutation(ADD_USER);

  const handleFormSubmit = async (event) => {
    event.preventDefault();
    const mutationResponse = await addUser({
      variables: {
        email: formState.email,
        password: formState.password,
        firstName: formState.firstName,
        lastName: formState.lastName,
      },
    });
    const token = mutationResponse.data.addUser.token;
    Auth.login(token);
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
      <h2>Signup</h2>
      <Form onSubmit={handleFormSubmit}>
        <Row className="mb-2">
          <Col xs={12} md={6}>
            <Form.Group controlId="firstName">
              <Form.Label className="text-muted small">First Name:</Form.Label>
              <Form.Control
                type="text"
                name="firstName"
                placeholder="First"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
          <Col xs={12} md={6}>
            <Form.Group controlId="lastName">
              <Form.Label className="text-muted small">Last Name:</Form.Label>
              <Form.Control
                type="text"
                name="lastName"
                placeholder="Last"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col xs={12}>
            <Form.Group controlId="email">
              <Form.Label className="text-muted small">Email:</Form.Label>
              <Form.Control
                type="email"
                name="email"
                placeholder="youremail@test.com"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="mb-2">
          <Col xs={12}>
            <Form.Group controlId="password">
              <Form.Label className="text-muted small">Password:</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="******"
                onChange={handleChange}
              />
            </Form.Group>
          </Col>
        </Row>
        <Row className="flex-row flex-end">
          <Col xs={12}>
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
          </Col>
        </Row>
      </Form>
    </Container>
  );
}

export default Signup;

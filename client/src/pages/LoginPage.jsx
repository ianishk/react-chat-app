import React from "react";
import { Container, Row, Col, Form, Button } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
// import { useDispatch } from "react-redux";
import "../css/LoginPage.css";



const LoginPage = () => {
  const [Input, setInput] = useState({
    username: "",
    password: "",
  });

  // const dispatch = useDispatch();

  const navigate = useNavigate();

  const loginHandler = async(e) => {
    e.preventDefault();
    const resp = await fetch("http://localhost:5000/user/login", {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(Input) 
    })
    const data = await resp.json();
    // store the jwt token in local storage
    localStorage.setItem('token', data.token);
    localStorage.setItem('username', data.user.username);
    localStorage.setItem('profile', data.user.profile);
    
    // navigate to the chat page using navigate

    navigate("/chat");
  }
  return (
    <Container fluid className="login__bg-grey">
      <Row>
        <Col xs={3} />
        <Col xs={6}>
          <Container className="login__main">
            <h2>Login</h2>
            <p>
              Don't have an account? <Link to="/signup">Create one</Link>
            </p>
            <Form onSubmit={loginHandler}>
              <Form.Group className="login__left">
                <Form.Label>Enter username</Form.Label>
                <Form.Control
                  type="text"
                  value={Input.username}
                  onChange={(e) => {
                    setInput({ ...Input, username: e.target.value });
                  }}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="login__left">
                <Form.Label>Enter password</Form.Label>
                <Form.Control
                  type="password"
                  value={Input.password}
                  onChange={(e) => {
                    setInput({ ...Input, password: e.target.value });
                  }}
                ></Form.Control>
              </Form.Group>

              <Button size="lg" type="submit">
                Login
              </Button>
            </Form>
          </Container>
        </Col>
        <Col xs={3} />
      </Row>
    </Container>
  );
};

export default LoginPage;

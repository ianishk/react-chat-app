import React from "react";
import { Container, Row, Col, Form, Button, Image } from "react-bootstrap";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../css/SignupPage.css";

const SignupPage = () => {
  // import navigate and use here
  const navigate = useNavigate();
  const [Input, setInput] = useState({
    username: "",
    password: "",
    profile: Math.floor(100000 + Math.random() * 900000),
  });

  const signupHandler = (e) => {
    e.preventDefault();
    const inputData = JSON.stringify(Input);

    fetch("http://localhost:5000/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: inputData,
      mode: "cors",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.msg) {
          alert(data.msg);
        } else {
          alert("new user created successfully");
          setInput({...Input, username: ""});
          // navigate to the login page using navigate from react-router-dom
          navigate("/login");
        }
      });
  };

  return (
    <Container fluid className="signup__bg-grey">
      <Row>
        <Col xs={3} />
        <Col xs={6}>
          <Container className="signup__main">
            <h2>Sign up</h2>
            <p>
              Already have an account? <Link to="/login">Login here</Link>
            </p>
            <Form onSubmit={signupHandler}>
              <Form.Group className="signup__left">
                <Form.Label>Enter username</Form.Label>
                <Form.Control
                  type="text"
                  value={Input.username}
                  onChange={(e) => {
                    setInput({ ...Input, username: e.target.value });
                  }}
                ></Form.Control>
              </Form.Group>
              <Form.Group className="signup__left">
                <Form.Label>Enter password</Form.Label>
                <Form.Control
                  type="password"
                  value={Input.password}
                  onChange={(e) => {
                    setInput({ ...Input, password: e.target.value });
                  }}
                ></Form.Control>
              </Form.Group>
              <Container>
                <Button
                  variant="outline-primary"
                  onClick={() => {
                    setInput({
                      ...Input,
                      profile: Math.floor(100000 + Math.random() * 900000),
                    });
                  }}
                >
                  Change avatar
                </Button>
                <br />
                <Image
                  roundedCircle
                  height={150}
                  src={`https://avatars.dicebear.com/api/avataaars/${Input.profile}.svg`}
                />
              </Container>
              <Button size="lg" type="submit">
                Sign up
              </Button>
            </Form>
          </Container>
        </Col>
        <Col xs={3} />
      </Row>
    </Container>
  );
};

export default SignupPage;

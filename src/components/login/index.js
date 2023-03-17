import React, { useState } from "react";
import {
  Col,
  Container,
  Row,
  Form,
  Button,
  Card,
  Alert,
} from "react-bootstrap";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    email: "",
    password: "",
  });

  const [alert, setAlert] = useState({
    show: false,
    type: "success",
    message: "",
  });

  const onFormChange = (e) => {
    setFormData({
      ...formData,
      [e.target.id]: e.target.value,
    });
    setError({
      ...error,
      [e.target.id]: "",
    });
  };

  const submitform = async (e) => {
    try {
      e.preventDefault();
      const result = await axios({
        method: "post",
        url: "http://localhost:4000/api/auth/login",
        data: formData,
      });
      // set access token to localstorage
      localStorage.setItem("accessToken", result.data.accessToken);
      localStorage.setItem("loggedIn", true);
      setAlert({
        show: true,
        type: "success",
        message: "Login successful",
      });
      setFormData({
        email: "",
        password: "",
      });
      navigate("/");
    } catch (err) {
      if (err.response.status === 401) {
        setAlert({
          show: true,
          type: "danger",
          message: err.response.data.message,
        });
      } else {
        setError({
          ...err.response.data,
        });
      }
    }
  };
  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Title>Login</Card.Title>
            <Card.Body>
              {alert.show ? (
                <Alert key={alert.type} variant={alert.type}>
                  {alert.message}
                </Alert>
              ) : (
                ""
              )}
              <Form>
                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    required={true}
                    isInvalid={error.email}
                    value={formData.email}
                    placeholder="Enter email"
                    onChange={onFormChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {error.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    required={true}
                    isInvalid={error.password}
                    value={formData.password}
                    placeholder="Password"
                    onChange={onFormChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {error.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={submitform}>
                  Login
                </Button>{" "}
                <Link to={"/register"}>Create new account?</Link>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Login;

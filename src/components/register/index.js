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

const Register = () => {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
  });

  const [error, setError] = useState({
    firstName: "",
    lastName: "",
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
      await axios({
        method: "post",
        url: "http://localhost:4000/api/user",
        data: formData,
      });
      setAlert({
        show: true,
        type: "success",
        message: "Registration successful",
      });
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        password: "",
      });
    } catch (err) {
      setError({
        ...err.response.data,
      });
    }
  };

  return (
    <Container>
      <Row>
        <Col>
          <Card>
            <Card.Title>Registration</Card.Title>
            <Card.Body>
              {alert.show ? (
                <Alert key={alert.type} variant={alert.type}>
                  {alert.message}
                </Alert>
              ) : (
                ""
              )}
              <Form>
                <Form.Group className="mb-3" controlId="firstName">
                  <Form.Label>First Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.firstName}
                    placeholder="Enter First Name"
                    onChange={onFormChange}
                  />
                  <Form.Text className="text-muted">
                    {error.firstName}
                  </Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="lastName">
                  <Form.Label>Last Name</Form.Label>
                  <Form.Control
                    type="text"
                    value={formData.lastName}
                    placeholder="Enter Last Name"
                    onChange={onFormChange}
                  />
                  <Form.Text className="text-muted">{error.lastName}</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="email">
                  <Form.Label>Email address</Form.Label>
                  <Form.Control
                    type="email"
                    value={formData.email}
                    placeholder="Enter email"
                    onChange={onFormChange}
                  />
                  <Form.Text className="text-muted">{error.email}</Form.Text>
                </Form.Group>

                <Form.Group className="mb-3" controlId="password">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    value={formData.password}
                    placeholder="Password"
                    onChange={onFormChange}
                  />
                  <Form.Text className="text-muted">{error.password}</Form.Text>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={submitform}>
                  Register
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Register;

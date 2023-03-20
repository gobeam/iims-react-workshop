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

const Book = () => {
  const [formData, setFormData] = useState({
    title: "",
    author: "",
    description: "",
    totalPages: 0,
    price: 0,
  });

  const [error, setError] = useState({
    title: "",
    author: "",
    description: "",
    totalPages: 0,
    price: 0,
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
      let payload = {
        ...formData,
        totalPages: parseInt(formData.totalPages),
        price: parseFloat(formData.price),
      };
      await axios({
        method: "post",
        url: "http://localhost:4000/api/book",
        headers: {
          Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
        },
        data: payload,
      });
      setAlert({
        show: true,
        type: "success",
        message: "Book added successful",
      });
      setFormData({
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
            <Card.Title>Add Book</Card.Title>
            <Card.Body>
              {alert.show ? (
                <Alert key={alert.type} variant={alert.type}>
                  {alert.message}
                </Alert>
              ) : (
                ""
              )}
              <Form>
                <Form.Group className="mb-3" controlId="title">
                  <Form.Label>Title</Form.Label>
                  <Form.Control
                    type="text"
                    required={true}
                    isInvalid={error.title}
                    value={formData.title}
                    placeholder="Enter title"
                    onChange={onFormChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {error.title}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="author">
                  <Form.Label>Author</Form.Label>
                  <Form.Control
                    type="text"
                    required={true}
                    isInvalid={error.author}
                    value={formData.author}
                    placeholder="Enter author"
                    onChange={onFormChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {error.author}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="description">
                  <Form.Label>Description</Form.Label>
                  <Form.Control
                    type="text"
                    required={true}
                    isInvalid={error.description}
                    value={formData.description}
                    placeholder="Enter description"
                    onChange={onFormChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {error.description}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="totalPages">
                  <Form.Label>Total Pages</Form.Label>
                  <Form.Control
                    type="number"
                    required={true}
                    isInvalid={error.totalPages}
                    value={formData.totalPages}
                    placeholder="Enter total pages"
                    onChange={onFormChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {error.totalPages}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group className="mb-3" controlId="price">
                  <Form.Label>Price</Form.Label>
                  <Form.Control
                    type="number"
                    required={true}
                    isInvalid={error.price}
                    value={formData.price}
                    placeholder="Enter price"
                    onChange={onFormChange}
                  />
                  <Form.Control.Feedback type="invalid">
                    {error.price}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button variant="primary" type="submit" onClick={submitform}>
                  Submit
                </Button>{" "}
                <Link to={"/"}>Go Back</Link>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
};

export default Book;

import React, { useEffect, useState } from "react";
import { Col, Container, Row, Card } from "react-bootstrap";
import { Link } from "react-router-dom";
import axios from "axios";
const Root = () => {
  const loggedIn = localStorage.getItem("loggedIn");
  const [profile, setProfile] = useState({});
  const [books, setBooks] = useState([]);
  const fetchProfile = async () => {
    const result = await axios({
      method: "get",
      url: "http://localhost:4000/api/profile",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    setProfile(result.data);
  };

  const fetchBook = async () => {
    const result = await axios({
      method: "get",
      url: "http://localhost:4000/api/book",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("accessToken")}`,
      },
    });
    setBooks(result.data);
  };

  useEffect(() => {
    if (loggedIn) {
      fetchProfile();
      fetchBook();
    }
  }, [loggedIn]);
  return (
    <Container>
      <Row>
        <Col>
          <div
            style={{
              justifyContent: "center",
            }}
          >
            <p>
              Welcome to our application {profile.firstName} {profile.lastName}
            </p>
            {loggedIn ? (
              <p>You are already logged in</p>
            ) : (
              <p>
                <p>Please Login/Register:</p>
                <Link className="btn btn-primary" to={"/login"}>
                  Login
                </Link>{" "}
                <Link className="btn btn-secondary" to={"/register"}>
                  Register
                </Link>
              </p>
            )}
          </div>
        </Col>
        <Col>
          {loggedIn
            ? books.map((book) => {
                return (
                  <Card style={{ width: "18rem" }}>
                    {/* <Card.Img variant="top" src="holder.js/100px180" /> */}
                    <Card.Body>
                      <Card.Title>{book.title}</Card.Title>
                      <Card.Text>
                        <p>Description: {book.description}</p>
                        <p>Author: {book.author}</p>
                        <p>Price: {book.price}</p>
                      </Card.Text>
                      {/* <Button variant="primary">Go somewhere</Button> */}
                    </Card.Body>
                  </Card>
                );
              })
            : ""}
        </Col>
      </Row>
    </Container>
  );
};

export default Root;

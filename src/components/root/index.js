import React, { useState } from "react";
import { Col, Container, Row, Button } from "react-bootstrap";
import { Link } from "react-router-dom";

const Root = () => {
  return (
    <Container>
      <Row>
        <Col>
          <div
            style={{
              justifyContent: "center",
            }}
          >
            <p>Welcome to home page</p>
            <p>
              <Link className="btn btn-primary" to={"/login"}>Login</Link>{" "}
              <Link className="btn btn-secondary" to={"/register"}>Register</Link> 
            </p>
          </div>
        </Col>
      </Row>
    </Container>
  );
};

export default Root;

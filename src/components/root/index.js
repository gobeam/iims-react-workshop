import React from "react";
import { Col, Container, Row, Button } from "react-bootstrap";

const Root = () => {
  return (
    <Container>
      <Row>
        <Col>
          <p>Welcome to home page</p>
          <p>
            <Button variant="primary">Primary</Button>{" "}
            <Button variant="secondary">Secondary</Button>{" "}
          </p>
        </Col>
      </Row>
    </Container>
  );
};

export default Root;

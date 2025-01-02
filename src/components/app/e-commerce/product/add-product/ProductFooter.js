import React from 'react';
import { Card, Col, Button, Row } from 'react-bootstrap';

const ProductFooter = () => {
  return (
    <Card>
      <Card.Body>
        <Row className="flex-between-center">
          <Col md>
            <h5 className="mb-2 mb-md-0">You're almost done</h5>
          </Col>
          <Col xs="auto">
            <Button
              variant="link"
              className="text-secondary fw-medium p-0 me-3"
              type="button"
            >
              Discard
            </Button>
            <Button variant="primary" type="submit">
              Add product
            </Button>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ProductFooter;

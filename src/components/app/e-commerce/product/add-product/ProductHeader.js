import React from 'react';
import { Card, Col, Button, Row } from 'react-bootstrap';

const ProductHeader = () => {
  return (
    <Card>
      <Card.Body>
        <Row className="flex-between-center">
          <Col md>
            <h5 className="mb-2 mb-md-0">Add a product</h5>
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

export default ProductHeader;

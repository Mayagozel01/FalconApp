import React from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';

const ProductType = () => {
  const {
    register,
    formState: { errors }
  } = useFormContext();
  return (
    <Card className="mb-3">
      <Card.Header as="h6" className="bg-light">
        Type
      </Card.Header>
      <Card.Body>
        <Row className="gx-2 gy-3">
          <Col md="12">
            <Form.Group>
              <Form.Label>Select category:</Form.Label>
              <Form.Select
                {...register(`productCategory`)}
                isInvalid={!!errors.productCategory}
              >
                <option value="">Select</option>
                <option value="electronics">Electronics</option>
                <option value="homeKitchen">Home and Kitchen</option>
                <option value="fashionApparel">Fashion and Apparel</option>
                <option value="stationery">Books and Stationery</option>
                <option value="healthFitness">Health and Fitness</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.productCategory?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md="12">
            <Form.Group>
              <Form.Label>Select sub-category:</Form.Label>
              <Form.Select
                {...register(`productSubCategory`)}
                isInvalid={!!errors.productSubCategory}
              >
                <option value="">Select</option>
                <option value="smartphones">Smartphones and Tablets</option>
                <option value="computers">Computers and Laptops</option>
                <option value="tv">TVs and Home Theater Systems</option>
                <option value="headphones">Audio and Headphones</option>
                <option value="gaming">Gaming Accessories</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.productSubCategory?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ProductType;

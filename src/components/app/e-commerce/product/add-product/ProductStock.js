import React from 'react';
import { Card, Form } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';

const ProductStock = () => {
  const { register } = useFormContext();
  return (
    <Card className="mb-3">
      <Card.Header as="h6" className="bg-light">
        Stock status
      </Card.Header>
      <Card.Body>
        <Form.Check className="mb-2" id="inStock">
          <Form.Check.Input
            type="radio"
            value="inStock"
            className="p-2"
            defaultChecked
            {...register(`stock`)}
          />
          <Form.Check.Label className="form-check-label fs-0 fw-normal text-700">
            In stock
          </Form.Check.Label>
        </Form.Check>
        <Form.Check className="mb-2" id="unavailable">
          <Form.Check.Input
            type="radio"
            value="unavailable"
            className="p-2"
            {...register(`stock`)}
          />
          <Form.Check.Label className="form-check-label fs-0 fw-normal text-700">
            Unavailable
          </Form.Check.Label>
        </Form.Check>
        <Form.Check className="mb-0" id="toBeAnnounced">
          <Form.Check.Input
            type="radio"
            value="toBeAnnounced"
            className="p-2"
            {...register(`stock`)}
          />
          <Form.Check.Label className="form-check-label fs-0 fw-normal text-700">
            To be announced
          </Form.Check.Label>
        </Form.Check>
      </Card.Body>
    </Card>
  );
};

export default ProductStock;

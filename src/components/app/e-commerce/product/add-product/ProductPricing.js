import React from 'react';
import { Card, Col, Form, OverlayTrigger, Row, Tooltip } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormContext } from 'react-hook-form';

const ProductPricing = () => {
  const {
    register,
    setValue,
    watch,
    formState: { errors }
  } = useFormContext();

  const { regularPrice } = watch();

  return (
    <Card className="mb-3">
      <Card.Header as="h6" className="bg-light">
        Pricing
      </Card.Header>
      <Card.Body>
        <Row className="gx-2 gy-3">
          <Col xs="8">
            <Form.Group controlId="regularPrice">
              <Form.Label>
                Base Price:
                <OverlayTrigger
                  overlay={
                    <Tooltip
                      style={{ position: 'fixed' }}
                      id="basePriceTooltip"
                    >
                      Product regular price
                    </Tooltip>
                  }
                >
                  <span className="ms-2 text-primary fs--1">
                    <FontAwesomeIcon icon="question-circle" />
                  </span>
                </OverlayTrigger>
              </Form.Label>
              <Form.Control
                type="number"
                {...register('regularPrice', {
                  onChange: e => setValue('finalPrice', e.target.value)
                })}
                isInvalid={!!errors.regularPrice}
              />
              <Form.Control.Feedback type="invalid">
                {errors.regularPrice?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col xs="4">
            <Form.Group>
              <Form.Label>Currency:</Form.Label>
              <Form.Select {...register(`currency`)}>
                <option value="usd">USD</option>
                <option value="eur">EUR</option>
                <option value="gbp">GBP</option>
                <option value="cad">CAD</option>
              </Form.Select>
            </Form.Group>
          </Col>
          <Col md="12" className="mb-3">
            <Form.Group controlId="discountPercentage">
              <Form.Label>Discount in percentage:</Form.Label>
              <Form.Control
                type="text"
                name="discountPercentage"
                {...register('discountPercentage', {
                  onChange: e => {
                    const calculatedPrice =
                      regularPrice - regularPrice * (e.target.value / 100);
                    setValue(
                      'finalPrice',
                      calculatedPrice >= 0 ? calculatedPrice : 0
                    );
                  }
                })}
              />
            </Form.Group>
          </Col>
          <Col xs="12">
            <Form.Group controlId="finalPrice">
              <Form.Label>
                Final price:
                <OverlayTrigger
                  overlay={
                    <Tooltip
                      style={{ position: 'fixed' }}
                      id="finalPriceTooltip"
                    >
                      Product final price
                    </Tooltip>
                  }
                >
                  <span className="ms-2 text-primary fs--1">
                    <FontAwesomeIcon icon="question-circle" />
                  </span>
                </OverlayTrigger>
              </Form.Label>
              <Form.Control
                disabled
                type="text"
                name="finalPrice"
                {...register('finalPrice')}
              />
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ProductPricing;

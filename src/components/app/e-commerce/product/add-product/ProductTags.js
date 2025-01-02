import React from 'react';
import MultiSelect from 'components/common/MultiSelect';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { Controller, useFormContext } from 'react-hook-form';

const ProductTags = () => {
  const { control } = useFormContext();
  const tagOptions = [
    { value: 'gamingLaptop', label: 'Gaming laptop' },
    { value: 'ultrabooks', label: 'Ultrabooks' },
    { value: 'budgetLaptop', label: 'Budget laptop' },
    { value: 'professional', label: 'Professional' }
  ];

  return (
    <Card className="mb-3">
      <Card.Header as="h6" className="bg-light">
        Tags
      </Card.Header>
      <Card.Body>
        <Row className="gx-2 gy-3">
          <Col xs="12">
            <Form.Group>
              <Form.Label>Add a keyword:</Form.Label>
              <Controller
                name="tags"
                render={({ field, ref }) => (
                  <MultiSelect
                    {...field}
                    ref={ref}
                    closeMenuOnSelect={false}
                    isMulti
                    options={tagOptions}
                  />
                )}
                control={control}
              />
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ProductTags;

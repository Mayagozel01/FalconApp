import React, { useState } from 'react';
import { Button, Card, Col, Form, Row } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useFormContext, useFieldArray } from 'react-hook-form';
import Flex from 'components/common/Flex';

const ProductSpecifications = () => {
  const { control } = useFormContext();
  const { fields, append, remove } = useFieldArray({
    control,
    name: 'specifications'
  });
  const [specification, setSpecification] = useState({
    label: '',
    property: ''
  });
  return (
    <Card className="mb-3 mb-lg-0">
      <Card.Header as="h6" className="bg-light">
        Specifications
      </Card.Header>
      <Card.Body>
        {fields.map((specification, index) => (
          <Row key={index} className="gx-2 flex-between-center mb-3">
            <Col sm={3}>
              <h6 className="mb-0 text-600">{specification.label}</h6>
            </Col>
            <Col sm={9}>
              <Flex justifyContent="between" alignItems="center">
                <h6 className="mb-0 text-700">{specification.property}</h6>
                <Button
                  variant="link"
                  to="#!"
                  type="button"
                  className="text-danger"
                  size="sm"
                  onClick={() => remove(index)}
                >
                  <FontAwesomeIcon className="fs--1" icon="trash-alt" />
                </Button>
              </Flex>
            </Col>
          </Row>
        ))}
        <Row className="gy-3 gx-2">
          <Col sm={3}>
            <Form.Control
              type="text"
              size="sm"
              name="specificationLabel"
              placeholder="Label"
              value={specification.label}
              onChange={e =>
                setSpecification({ ...specification, label: e.target.value })
              }
            />
          </Col>
          <Col sm={9}>
            <Flex
              justifyContent="between"
              alignItems="center"
              className="gap-2"
            >
              <Form.Control
                type="text"
                size="sm"
                name="specificationProperty"
                placeholder="Property"
                value={specification.property}
                onChange={e =>
                  setSpecification({
                    ...specification,
                    property: e.target.value
                  })
                }
              />
              <Button
                variant="falcon-default"
                size="sm"
                className="me-2"
                type="button"
                disabled={
                  specification.label === '' || specification.property === ''
                }
                onClick={() => {
                  append({
                    label: specification.label,
                    property: specification.property
                  });
                  setSpecification({
                    label: '',
                    property: ''
                  });
                }}
              >
                Add
              </Button>
            </Flex>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ProductSpecifications;

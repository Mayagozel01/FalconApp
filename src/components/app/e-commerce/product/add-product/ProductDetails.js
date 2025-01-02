import React, { useState } from 'react';
import { Card, Col, Form, Row } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';
import DatePicker from 'react-datepicker';
import TinymceEditor from 'components/common/TinymceEditor';
import CustomDateInput from 'components/common/CustomDateInput';

const ProductDetails = () => {
  const {
    register,
    setValue,
    formState: { errors }
  } = useFormContext();
  const [formData, setFormData] = useState({
    releaseDate: null
  });

  const handleChange = (name, value) => {
    setFormData({
      ...formData,
      [name]: value
    });
  };

  return (
    <Card className="mb-3">
      <Card.Header as="h6" className="bg-light">
        Details
      </Card.Header>
      <Card.Body>
        <Row className="gx-2 gy-3">
          <Col xs="12">
            <Form.Group>
              <Form.Label>Product description:</Form.Label>
              <div className="create-product-description-textarea">
                <TinymceEditor
                  height="13.438rem"
                  handleChange={newValue =>
                    setValue('productDescription', newValue)
                  }
                />
              </div>
            </Form.Group>
          </Col>
          <Col md="6">
            <Form.Group>
              <Form.Label>Import Status:</Form.Label>
              <Form.Select
                {...register(`importStatus`)}
                isInvalid={!!errors.importStatus}
              >
                <option value="">Select</option>
                <option value="imported">Imported</option>
                <option value="processing">Processing</option>
                <option value="validating">Validating</option>
                <option value="draft">Draft</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.importStatus?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md="6">
            <Form.Group>
              <Form.Label>Country of Origin:</Form.Label>
              <Form.Select
                {...register(`countryOrigin`)}
                isInvalid={!!errors.countryOrigin}
              >
                <option value="">Select</option>
                <option value="imported">Imported</option>
                <option value="China"> China</option>
                <option value="India"> India</option>
                <option value="United States">United States</option>
                <option value="Indonesia"> Indonesia</option>
                <option value="Pakistan"> Pakistan</option>
                <option value="Brazil"> Brazil</option>
                <option value="Nigeria"> Nigeria</option>
                <option value="Bangladesh"> Bangladesh</option>
                <option value="Russia"> Russia</option>
                <option value="Japan"> Japan</option>
                <option value="Mexico"> Mexico</option>
                <option value="Philippines"> Philippines</option>
                <option value="Egypt"> Egypt</option>
                <option value="Vietnam"> Vietnam</option>
                <option value="Ethiopia"> Ethiopia</option>
                <option value="Iran"> Iran</option>
                <option value="Turkey"> Turkey</option>
                <option value="Germany"> Germany</option>
                <option value="France"> France</option>
              </Form.Select>
              <Form.Control.Feedback type="invalid">
                {errors.countryOrigin?.message}
              </Form.Control.Feedback>
            </Form.Group>
          </Col>
          <Col md="12">
            <Form.Group controlId="releaseDate">
              <Form.Label>Release Date:</Form.Label>
              <DatePicker
                selected={formData.releaseDate}
                onChange={newDate => {
                  handleChange('releaseDate', newDate);
                  setValue('releaseDate', newDate);
                }}
                customInput={
                  <CustomDateInput
                    formControlProps={{
                      ...register('releaseDate')
                    }}
                  />
                }
              />
            </Form.Group>
          </Col>
          <Col md="12">
            <Form.Group controlId="warrantyLength">
              <Form.Label>Warranty Lenght:</Form.Label>
              <Form.Control
                type="text"
                name="warrantyLength"
                {...register('warrantyLength')}
              />
            </Form.Group>
          </Col>
          <Col md="12">
            <Form.Group controlId="warrantyPolicy">
              <Form.Label>Warranty Policy:</Form.Label>
              <Form.Control
                type="text"
                name="warrantyPolicy"
                {...register('warrantyPolicy')}
              />
            </Form.Group>
          </Col>
        </Row>
      </Card.Body>
    </Card>
  );
};

export default ProductDetails;

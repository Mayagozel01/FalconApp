import React from 'react';
import { Col, Form, Row } from 'react-bootstrap';
import { useForm, FormProvider } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import ProductBasicInformation from './ProductBasicInformation';
import ProductHeader from './ProductHeader';
import ProductUpload from './ProductUpload';
import ProductFooter from './ProductFooter';
import ProductDetails from './ProductDetails';
import ProductType from './ProductType';
import ProductTags from './ProductTags';
import ProductPricing from './ProductPricing';
import ProductShipping from './ProductShipping';
import ProductStock from './ProductStock';
import ProductSpecifications from './ProductSpecifications';

const schema = yup
  .object({
    productName: yup.string().required('This field is required.'),
    manufacturarName: yup.string().required('This field is required.'),
    identificationNumber: yup.string().required('This field is required.'),
    productSummery: yup.string().required('This field is required.'),
    importStatus: yup.string().required('This field is required.'),
    countryOrigin: yup.string().required('This field is required.'),
    productCategory: yup.string().required('This field is required.'),
    productSubCategory: yup.string().required('This field is required.'),
    regularPrice: yup
      .number()
      .transform(value => (Number.isNaN(value) ? null : value))
      .nullable()
      .required('This field is required.')
  })
  .required();

const AddProduct = () => {
  const submittedValues = {};
  const methods = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      specifications: [
        {
          label: 'Processor',
          property: '2.3GHz quad-core Intel Core i5'
        },
        {
          label: 'Memory',
          property: '8GB of 2133MHz LPDDR3 onboard memory'
        },
        {
          label: 'Brand name',
          property: 'Apple'
        }
      ]
    }
  });
  const { handleSubmit, reset } = methods;

  const onSubmit = data => {
    console.log(data);
    // ------- Get all object keys form data and set empty values to reset ------------
    const keys = Object.keys(data);
    for (const key of keys) {
      submittedValues[key] = '';
    }
    reset({ ...submittedValues });
  };

  return (
    <FormProvider {...methods}>
      <Form onSubmit={handleSubmit(onSubmit)}>
        <Row className="g-3">
          <Col xs={12}>
            <ProductHeader />
          </Col>
          <Col lg={8}>
            <ProductBasicInformation />
            <ProductUpload />
            <ProductDetails />
            <ProductSpecifications />
          </Col>
          <Col lg={4}>
            <div className="sticky-sidebar">
              <ProductType />
              <ProductTags />
              <ProductPricing />
              <ProductShipping />
              <ProductStock />
            </div>
          </Col>
          <Col>
            <ProductFooter />
          </Col>
        </Row>
      </Form>
    </FormProvider>
  );
};

export default AddProduct;

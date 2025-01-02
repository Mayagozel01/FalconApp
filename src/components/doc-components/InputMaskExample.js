import React from 'react';
import { Button } from 'react-bootstrap';
import PageHeader from 'components/common/PageHeader';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import FalconComponentCard from 'components/common/FalconComponentCard';
import MaskedInput from 'react-text-mask';

const exampleCode = `
  <>
    <Form.Group className="mb-3" controlId="exampleForm.DateInput">
      <Form.Label>Date</Form.Label>
      <MaskedInput
        mask={[/\\d/, /\\d/, '/', /\\d/, /\\d/, '/', /\\d/, /\\d/, /\\d/, /\\d/]}
        className="form-control"
        guide={false}
        placeholder="DD/MM/YYYY"
        id="exampleForm.DateInput"
      />
    </Form.Group>
    <Form.Group className="mb-3" controlId="exampleForm.TimeInput">
      <Form.Label>Time</Form.Label>
      <MaskedInput
        mask={[/\\d/, /\\d/, ':', /\\d/, /\\d/, ':', /\\d/, /\\d/]}
        className="form-control"
        guide={false}
        placeholder="HH:MM:SS"
        id="exampleForm.TimeInput"
      />
    </Form.Group>
    <Form.Group className="mb-3" controlId="exampleForm.USPhoneInput">
      <Form.Label>US phone number</Form.Label>
      <MaskedInput
        mask={['(', /[1-9]/, /\\d/, /\\d/, ')', ' ', /\\d/, /\\d/, /\\d/, '-', /\\d/, /\\d/, /\\d/, /\\d/]}
        className="form-control"
        guide={false}
        placeholder="(XXX) XXX-XXXX"
        id="exampleForm.USPhoneInput"
      />
    </Form.Group>
    <Form.Group className="mb-3" controlId="exampleForm.USPhoneCCInput">
      <Form.Label>US phone number (country code)</Form.Label>
      <MaskedInput
        mask={['+', '1', ' ', '(', /[1-9]/, /\\d/, /\\d/, ')', ' ', /\\d/, /\\d/, /\\d/, '-', /\\d/, /\\d/, /\\d/, /\\d/]}
        className="form-control"
        guide={false}
        placeholder="+1 (XXX) XXX-XXXX"
        id="exampleForm.USPhoneCCInput"
      />
    </Form.Group>
    <Form.Group className="mb-3" controlId="exampleForm.CreditCardInput">
      <Form.Label>Credit card</Form.Label>
      <MaskedInput
        mask={[/\\d/, /\\d/, /\\d/, /\\d/, ' ', /\\d/, /\\d/, /\\d/, /\\d/, ' ', /\\d/, /\\d/, /\\d/, /\\d/, ' ', /\\d/, /\\d/, /\\d/, /\\d/]}
        className="form-control"
        guide={false}
        placeholder="XXXX XXXX XXXX XXXX"
        id="exampleForm.CreditCardInput"
      />
    </Form.Group>
    <Form.Group className="mb-3" controlId="exampleForm.IPInput">
      <Form.Label>IP Address</Form.Label>
      <MaskedInput
        mask={[/\\d/, /\\d/, /\\d/, '.', /\\d/, /\\d/, '.', /\\d/, /\\d/, '.', /\\d/, /\\d/]}
        className="form-control"
        guide={false}
        placeholder="XXX.XX.XX.XX.XX"
        id="exampleForm.IPInput"
      />
    </Form.Group>
  </>
`;

const InputMaskExample = () => (
  <>
    <PageHeader
      title="Input Mask"
      description="Falcon-React uses <strong>react-text-mask</strong> for masking input components."
      className="mb-3"
    >
      <Button
        href="https://github.com/text-mask/text-mask/tree/master/react/#readme"
        target="_blank"
        variant="link"
        size="sm"
        className="ps-0"
      >
        React Text Mask Documentation
        <FontAwesomeIcon icon="chevron-right" className="ms-1 fs--2" />
      </Button>
    </PageHeader>

    <FalconComponentCard>
      <FalconComponentCard.Header title="Inputmask Examples" light={false} />
      <FalconComponentCard.Body
        code={exampleCode}
        scope={{ MaskedInput }}
        language="jsx"
      />
    </FalconComponentCard>
  </>
);

export default InputMaskExample;

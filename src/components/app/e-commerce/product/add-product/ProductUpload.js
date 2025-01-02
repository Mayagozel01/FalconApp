import React, { useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { getSize } from 'helpers/utils';
import { Button, Card, Dropdown } from 'react-bootstrap';
import { useFormContext } from 'react-hook-form';
import Flex from 'components/common/Flex';
import cloudUpload from 'assets/img/icons/cloud-upload.svg';
import CardDropdown from 'components/common/CardDropdown';

const ProductUpload = () => {
  const { setValue } = useFormContext();
  const [files, setFiles] = useState([]);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      'image/*': ['.jpeg', '.png', '.jpg']
    },
    onDrop: acceptedFiles => {
      setValue('uploadedFiles', acceptedFiles);
      setFiles([
        ...files,
        ...acceptedFiles.map(file =>
          Object.assign(file, {
            preview: URL.createObjectURL(file)
          })
        )
      ]);
    }
  });

  const handleRemove = path => {
    setFiles(files.filter(file => file.path !== path));
  };

  return (
    <Card className="mb-3">
      <Card.Header as="h6" className="bg-light">
        Add images
      </Card.Header>
      <Card.Body>
        <div {...getRootProps({ className: 'dropzone-area py-6' })}>
          <input name="uploadedFiles" {...getInputProps()} />
          <div className="fs--1">
            <img src={cloudUpload} alt="" width={25} className="me-2" />
            <span className="d-none d-lg-inline">
              Drag your image here
              <br />
              or,{' '}
            </span>
            <Button variant="link" size="sm" className="p-0 fs--1">
              Browse
            </Button>
          </div>
        </div>
        <div>
          {files.map(file => (
            <Flex
              alignItems="center"
              className="py-3 border-bottom btn-reveal-trigger"
              key={file.path}
            >
              <img
                className="rounded"
                width={40}
                height={40}
                src={file.preview}
                alt={file.path}
              />

              <Flex
                justifyContent="between"
                alignItems="center"
                className="ms-3 flex-1"
              >
                <div>
                  <h6>{file.path}</h6>
                  <Flex className="position-relative" alignItems="center">
                    <p className="mb-0 fs--1 text-400 line-height-1">
                      <strong>{getSize(file.size)}</strong>
                    </p>
                  </Flex>
                </div>
              </Flex>
              <CardDropdown>
                <div className="py-2">
                  <Dropdown.Item
                    className="text-danger"
                    onClick={() => handleRemove(file.path)}
                  >
                    Remove
                  </Dropdown.Item>
                </div>
              </CardDropdown>
            </Flex>
          ))}
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductUpload;

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import classNames from 'classnames';
import Flex from 'components/common/Flex';
import PropTypes from 'prop-types';
import React from 'react';
import { Card, Col, ProgressBar, Row } from 'react-bootstrap';

const StorageStatus = ({ data, className }) => {
  const totalStorage = data
    .map(d => d.size)
    .reduce((total, currentValue) => total + currentValue, 0);
  const freeStorage = data.find(d => d.name === 'Free').size;

  return (
    <Card className={className}>
      <Card.Body as={Flex} alignItems="center">
        <div className="w-100">
          <h6 className="mb-3 text-800">
            Using Storage{' '}
            <strong className="text-dark">
              {totalStorage - freeStorage} MB{' '}
            </strong>
            of {Math.round(totalStorage / 1024)} GB
          </h6>
          <ProgressBar
            style={{ height: 10 }}
            className="shadow-none rounded-4 mb-3"
          >
            {data.map((status, index) => (
              <ProgressBar
                // variant={status.color}
                variant={`${status.color.split('-')[1] || status.color}`}
                now={(status.size * 100) / totalStorage}
                key={status.name}
                className={classNames('overflow-visible position-relative', {
                  'rounded-end rounded-pill': index === 0,
                  'rounded-start rounded-pill': index === data.length - 1,
                  'border-end border-white border-2': index !== data.length - 1,
                  'rounded-0': index !== data.length - 1 && index !== 0
                })}
              />
            ))}
          </ProgressBar>
          <Row className="fs--1 fw-semi-bold text-500">
            {data.map(status => (
              <Col
                xs="auto"
                as={Flex}
                alignItems="center"
                className="pe-2"
                key={status.name}
              >
                <FontAwesomeIcon
                  icon="circle"
                  className={`text-${
                    status.color.split('-')[1] || status.color
                  } fs--2 me-2`}
                />
                <span>{status.name}</span>
                <span className="d-none d-md-inline-block d-lg-none d-xxl-inline-block ms-1">
                  ({status.size}MB)
                </span>
              </Col>
            ))}
          </Row>
        </div>
      </Card.Body>
    </Card>
  );
};

StorageStatus.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string.isRequired,
      size: PropTypes.number.isRequired,
      color: PropTypes.string.isRequired
    }).isRequired
  ),
  className: PropTypes.string
};

export default StorageStatus;

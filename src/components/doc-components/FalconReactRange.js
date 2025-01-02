import { getColor } from 'helpers/utils';
import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import { Range, getTrackBackground } from 'react-range';
import AppContext from 'context/Context';

const FalconReactRange = ({
  step = 0.1,
  min = 0,
  max = 100,
  variant = 'primary',
  trackHeight = '0.75rem',
  tipFormatter,
  draggableTrack = false,
  alwaysShowTooltip = false,
  marks = false,
  values,
  onChange
}) => {
  const {
    config: { isDark }
  } = useContext(AppContext);

  const Track = ({ props: properties, children }) => (
    <div
      onMouseDown={properties.onMouseDown}
      onTouchStart={properties.onTouchStart}
      style={{
        ...properties.style
      }}
      className="falcon-react-range"
    >
      <div
        ref={properties.ref}
        className="falcon-react-range-track"
        style={{
          height: trackHeight,
          cursor: !draggableTrack ? 'pointer' : 'ew-resize',
          background: getTrackBackground({
            values,
            colors:
              values.length == 2
                ? [
                    getColor('gray-300'),
                    getColor(variant),
                    getColor('gray-300')
                  ]
                : [getColor(variant), getColor('gray-300')],
            min,
            max
          })
        }}
      >
        {children}
      </div>
    </div>
  );

  Track.propTypes = {
    props: PropTypes.shape({
      onMouseDown: PropTypes.func,
      onTouchStart: PropTypes.func,
      style: PropTypes.object,
      ref: PropTypes.object
    }),
    children: PropTypes.node
  };

  const Thumb = ({ props: properties, isDragged, index }) => (
    <div
      {...properties}
      className={`falcon-react-range-thumb ${isDragged && 'dragging'}`}
      style={{
        ...properties.style
      }}
    >
      <div
        className={`falcon-react-range-tooltip ${
          (alwaysShowTooltip || isDragged) && 'show'
        }`}
      >
        {tipFormatter
          ? () => tipFormatter(values[index])
          : values[index].toFixed(1)}
      </div>
    </div>
  );

  Thumb.propTypes = {
    props: PropTypes.shape({
      onMouseDown: PropTypes.func,
      onTouchStart: PropTypes.func,
      style: PropTypes.object
    }),
    isDragged: PropTypes.bool,
    index: PropTypes.number
  };

  const Mark = ({ props: properties, index }) => {
    return (
      <div
        {...properties}
        className="falcon-react-range-mark"
        style={{
          ...properties.style,
          height: '16px',
          width: '4px',
          backgroundColor:
            values.length === 1
              ? index * step < values[0]
                ? getColor(variant)
                : getColor('gray-300')
              : index * step > values[0] && index * step < values[1]
              ? getColor(variant)
              : getColor('gray-300')
        }}
      ></div>
    );
  };

  Mark.propTypes = {
    props: PropTypes.shape({
      style: PropTypes.object
    }),
    index: PropTypes.number
  };

  return (
    <Range
      draggableTrack={draggableTrack}
      key={isDark}
      values={values}
      step={step}
      min={min}
      max={max}
      onChange={onChange}
      renderTrack={Track}
      renderThumb={Thumb}
      renderMark={marks && Mark}
    />
  );
};

FalconReactRange.propTypes = {
  step: PropTypes.number,
  min: PropTypes.number,
  max: PropTypes.number,
  values: PropTypes.array.isRequired,
  onChange: PropTypes.func.isRequired,
  variant: PropTypes.oneOf([
    'primary',
    'secondary',
    'warning',
    'danger',
    'info',
    'success'
  ]),
  tipFormatter: PropTypes.func,
  draggableTrack: PropTypes.bool,
  trackHeight: PropTypes.string,
  alwaysShowTooltip: PropTypes.bool,
  marks: PropTypes.bool
};

export default FalconReactRange;

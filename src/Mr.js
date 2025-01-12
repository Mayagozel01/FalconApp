import React, { useState } from 'react';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';

function MyResizableComponent() {
  const [width, setWidth] = useState(300);
  const [height, setHeight] = useState(200);

  const onResize = (event, { size }) => {
    setWidth(size.width);
    setHeight(size.height);
  };

  return (
    <Resizable
      width={width}
      height={height}
      onResize={onResize}
      resizeHandles={['e', 'w', 'n', 's']} // Specify sides for resizing
    >
      <div style={{ width: `${width}px`, height: `${height}px`, backgroundColor: 'lightblue' }}>
        {/* Content of the resizable component */}
        dvornbvirnbirnb
      </div>
    </Resizable>
  );
}

export default MyResizableComponent;
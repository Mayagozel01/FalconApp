import React, { lazy, Suspense } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { Resizable } from 'react-resizable';
import Draggable from 'react-draggable';
import 'react-resizable/css/styles.css';
import { updateLayer } from './layersSlice';

const LayerManager = () => {
  const { layers } = useSelector((state) => state.layers);
  const dispatch = useDispatch();

  if (!layers || !layers.length) {
    return <div>No layer data available.</div>;
  }

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}>
      {layers.map((layer) => {
        const LayerComponent = lazy(() => import(`./components/${layer.name}`));

        return (
          <Draggable key={layer.id}>
            <div style={{ display: 'inline-block' }}>
              <Resizable
                width={layer.width || 200}
                height={layer.height || 900}
                onResize={(event, { size }) => {
                  if (size.width !== layer.width || size.height !== layer.height) {
                    console.log(size)
                    dispatch(
                      updateLayer({
                        id: layer.id,
                        width: size.width,
                        height: size.height,
                      })
                    );
                  }
                }}
                resizeHandles={['s', 'e', 'w', 'n']} // Allow resizing from all sides
              >
                <div
                  style={{
                    width: `${layer.width || 200}px`,
                    height: `${layer.height || 500}px`,
                    border: '1px solid black',
                    padding: '20px',
                    boxSizing: 'border-box',
                  }}
                >
                  <Suspense fallback={<div>Loading...</div>}>
                    <LayerComponent {...layer} />
                  </Suspense>
                </div>
              </Resizable>
            </div>
          </Draggable>
        );
      })}
    </div>
  );
};

export default LayerManager;
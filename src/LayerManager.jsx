import React, { useContext, Suspense } from 'react';
import { LAYOUT_ORDERS } from './constants';
import { LayersContext } from './LayersProvider';
import { Resizable } from 'react-resizable';
import Draggable from 'react-draggable';
import 'react-resizable/css/styles.css';

const LayerManager = () => {
  const usersData = useContext(LayersContext);

  if (!usersData || !usersData.layoutsOrder) {
    return <div>No layer data available.</div>;
  }

  const sortedLayers = usersData.layoutsOrder
    .filter(layer => Object.values(LAYOUT_ORDERS).includes(layer.order) && layer.isShow)
    .sort((a, b) => {
      const orderPriority = {
        [LAYOUT_ORDERS.MAIN]: 1,
        [LAYOUT_ORDERS.SECONDARY]: 2,
        [LAYOUT_ORDERS.BUTTON]: 3,
      };
      return (orderPriority[a.order] || Infinity) - (orderPriority[b.order] || Infinity);
    });

  return (
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: '20px', padding: '20px' }}> {/* Flex контейнер */}
      {sortedLayers.map((layer) => {
        const LayerComponent = React.lazy(() => import(`./components/${layer.name}`));

        return (
          <Draggable key={layer.name}>
            <div style={{ width: 'auto', height: 'auto' }}> {/* Убираем absolute */}
              <Resizable width={200} height={100}>
                <div style={{ border: '1px solid black', padding: '10px', width: '100%', height: '100%', boxSizing: 'border-box' }}>
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
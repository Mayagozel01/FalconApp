import User from 'components/contact_list/user/User'; // Замените на ваш импорт компонента User
import { UsersContext } from 'context/Context'; // Замените на ваш импорт контекста
import users from 'data/users/users'; // Замените на ваш импорт данных пользователей
import { useEffect, useState } from 'react';
import Draggable from 'react-draggable';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';

export default function Second() {
  const [obj, setObj] = useState(null);
  const [blockSizes, setBlockSizes] = useState([
    { id: 1, width: 300, height: 200, x: 0, y: 0 },
    { id: 2, width: 200, height: 150, x: 310, y: 0 },
    { id: 3, width: 200, height: 150, x: 520, y: 0 }
  ]);

  const handleResize = (id, event, { element, size }) => {
    setBlockSizes(prevSizes =>
      prevSizes.map(blockSize =>
        blockSize.id === id
          ? { ...blockSize, width: size.width, height: size.height }
          : blockSize
      )
    );
  };

  const handleDrag = (id, e, data) => {
    setBlockSizes(prevSizes =>
      prevSizes.map(blockSize =>
        blockSize.id === id ? { ...blockSize, x: data.x, y: data.y } : blockSize
      )
    );
  };

  useEffect(() => {
    const jsonString = JSON.stringify(users);
    setObj(JSON.parse(jsonString));
  }, []);

  return (
    <UsersContext.Provider value={obj}>
      <div
        style={{
          position: 'relative',
          height: '500px',
          width: '800px',
          border: '1px solid gray',
          padding: '10px',
          overflow: 'auto',
          scrollBehavior: 'smooth',
          '::-webkit-scrollbar': {
            width: '8px',
            height: '8px' // Добавлено для горизонтального скролла
          },
          '::-webkit-scrollbar-track': {
            background: '#f1f1f1',
            borderRadius: '4px'
          },
          '::-webkit-scrollbar-thumb': {
            background: '#888',
            borderRadius: '4px',
            border: '1px solid transparent',
            backgroundClip: 'padding-box'
          },
          '::-webkit-scrollbar-thumb:hover': {
            background: '#555'
          }
        }}
      >
        {blockSizes.map((blockSize, index) => (
          <Draggable
            key={blockSize.id}
            bounds="parent"
            position={{ x: blockSize.x, y: blockSize.y }}
            onStart={e => {
              e.target.style.zIndex = 100;
            }}
            onStop={e => {
              e.target.style.zIndex = '';
            }}
            onDrag={(e, data) => handleDrag(blockSize.id, e, data)}
          >
            <Resizable
              key={`resizable-${blockSize.id}`}
              width={blockSize.width}
              height={blockSize.height}
              onResize={(e, data) => handleResize(blockSize.id, e, data)}
              resizeHandles={['ne', 'nw', 'se', 'sw', 'n', 'e', 's', 'w']}
              minConstraints={[50, 50]}
              maxConstraints={[800, 600]}
            >
              <div
                style={{
                  width: blockSize.width,
                  height: blockSize.height,
                  background: 'lightblue',
                  border: '1px solid blue',
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  display: 'flex',
                  justifyContent: 'center',
                  alignItems: 'center',
                  overflow: 'auto',
                  cursor: 'move',
                  boxSizing: 'border-box'
                }}
              >
                {index === 0 && obj && (
                  <div>
                    <h6>{obj.layoutsOrder?.[1]?.name}</h6>
                    <h5>{obj.layoutsOrder?.[1]?.title?.value}</h5>
                  </div>
                )}
                {index === 1 && <User index={2} />}
                {index === 2 && <div>ppp</div>}
              </div>
            </Resizable>
          </Draggable>
        ))}
      </div>
    </UsersContext.Provider>
  );
}

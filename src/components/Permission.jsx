import React from 'react';
import { useDispatch } from 'react-redux';
import { addLayer } from '../layersSlice';

const Permission = ({...rest }) => {
  const dispatch = useDispatch();
  console.log(rest)
  const handleDuplicate = () => {
      dispatch(addLayer(rest)); // Создаем копию props перед отправкой
  };
    console.log('Permission props:', rest)
  return (

    <div>


      <h3>{rest.title?.value}</h3>
        {rest.content?.structure.rows?.map((row) => (
        <div key={row.id}>
          {row.cells.map((cell, index) => (
            <span key={index}>{cell?.value} </span>
          ))}
        </div>
      ))}
             <button onClick={handleDuplicate}>Duplicate</button>
    </div>
  );
};

export default Permission;
import React, { useState } from 'react';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { useDispatch } from 'react-redux';
import { addLayer } from '../layersSlice';import { Table,Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

const Actions = () => (
  <div className="end-0 top-50 pe-3 translate-middle-y hover-actions">
    <Button variant="light" size="sm" className="border-300 me-1 text-600">
      <FontAwesomeIcon icon="edit" />
    </Button>
    <Button variant="light" size="sm" className="border-300 text-600">
      <FontAwesomeIcon icon="trash-alt" />
    </Button>
  </div>
);

const Card = ({ ...rest }) => {
    const [width, setWidth] = useState(200);
    const [height, setHeight] = useState(150);
    const dispatch = useDispatch();
    console.log(rest)
    const handleDuplicate = () => {
        dispatch(addLayer(rest)); // Создаем копию props перед отправкой
    };


    return (
   
            <div style={{
                width: '100%',
                height: '100%',
                boxSizing: 'border-box',
                overflow: 'auto',
            }}>
                <h3>{rest.content.structure.tableName}</h3>
                <Table hover responsive>
      <thead>
        <tr>
            {rest.content.structure.header.map((head)=>(
           <th scope="col" key={head.id} >{head.title}</th>)
           )}
        </tr>
      </thead>
      <tbody>
      {rest.content?.structure?.rows?.map((row) => (
        <tr className="hover-actions-trigger" key={row.id}>
             {row.cells?.map((cell, index) => (
                            <td key={cell.id}>{cell?.value} </td>
                        ))}
        <td className="w-auto">
          <Actions />
        </td>
      </tr>
      ))}
        
      </tbody>
    </Table>
                
                 <button onClick={handleDuplicate}>Duplicate</button>
            </div>
    );
};

export default Card;
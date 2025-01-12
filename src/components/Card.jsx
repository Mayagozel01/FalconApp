import React, { useState } from 'react';
import { Resizable } from 'react-resizable';
import 'react-resizable/css/styles.css';
import { useDispatch } from 'react-redux';
import { addLayer } from '../layersSlice';

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
                border: '2px solid pink',
                width: '100%',
                height: '100%',
                boxSizing: 'border-box',
                overflow: 'auto',
            }}>
                <h3>{rest.title?.value}</h3>
                {rest.content?.structure?.rows?.map((row) => (
                    <div key={row?.id}>
                        {row.cells?.map((cell, index) => (
                            <span key={index}>{cell?.value} </span>
                        ))}
                    </div>
                ))}
                 <button onClick={handleDuplicate}>Duplicate</button>
            </div>
    );
};

export default Card;
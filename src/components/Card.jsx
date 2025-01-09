import React from 'react';

const Card = ({ title, content, ...rest }) => {
    console.log('Card props:', rest)

  return (
    <div style={{border:'2px solid pink'}}>
      <h3>{title.value}</h3>
       {content.structure.rows.map((row) => (
        <div key={row.id}>
          {row.cells.map((cell, index) => (
            <span key={index}>{cell?.value} </span>
          ))}
        </div>
      ))}
    </div>
  );
};

export default Card;
import React from 'react';

const Permission = ({ title, content, ...rest }) => {
    console.log('Permission props:', rest)
  return (
    <div>
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

export default Permission;
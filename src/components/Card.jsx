import React, { useState, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { addLayer } from '../layersSlice';
import { Table, Button } from 'react-bootstrap';
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

const groupHeaders = (headers) => {
  const groups = new Map(); // To store groups by parentId

  headers.forEach((header) => {
    if (!header.parentId) {
      // If it's a parent, create or update the group
      if (!groups.has(header.id)) {
        // If the group doesn't exist, create a new one
        groups.set(header.id, { parent: header, children: [] });
      } else {
        // If the group exists (with a placeholder parent), update the parent
        groups.get(header.id).parent = header;
      }
    } else {
      // If it's a child, find or create the group for its parentId
      if (!groups.has(header.parentId)) {
        // If the group doesn't exist yet, create a placeholder parent
        groups.set(header.parentId, { parent: null, children: [] });
      }
      // Add the child to the group
      groups.get(header.parentId).children.push(header);
    }
  });
  console.log(Array.from(groups.values()))

  // Convert the map to an array of groups
  return Array.from(groups.values());
};

const Card = ({ content }) => {
  const [visibleRows, setVisibleRows] = useState(content.structure.rows.slice(0, 5));
  const dispatch = useDispatch();

  const handleDuplicate = () => {
    dispatch(addLayer(content));
  };

  const handleAddRows = () => {
    setVisibleRows((prevRows) => {
      const newRows = content.structure.rows.slice(prevRows.length);
      return [...prevRows, ...newRows.slice(0, Math.min(2, newRows.length))];
    });
  };

  const headers = content.structure.header;
  const groupedHeaders = groupHeaders(headers);

  const rowRenderer = ({ index, style }) => {
    const row = visibleRows[index];
    return (
      <tr key={index} style={style} className="hover-actions-trigger">
        {row.cells?.map((cell, idx) => (
          <td key={idx} className="text-center">
            {cell.value}
          </td>
        ))}
        <td className="w-auto">
          <Actions />
        </td>
      </tr>
    );
  };

  useEffect(() => {
    const intervalId = setInterval(handleAddRows, 2500);
    return () => clearInterval(intervalId);
  }, [handleAddRows]);

  return (
    <div style={{ width: '100%', height: '400px' }}>
      <h3>{content.structure.tableName}</h3>
      <Table hover bordered responsive style={{ border: '1px solid black' }}>
        <thead>
          <tr>
            {groupedHeaders.map((group, index) => (
              <th
                key={`parent-${index}`}
                colSpan={group.children.length || 1}
                className="text-center"
                style={{ border: '1px solid black' }}
              >
                {group.parent?.title || 'No Parent'}
              </th>
            ))}
          </tr>
          <tr>
            {groupedHeaders.map((group) =>
              group.children.length > 0
                ? group.children.map((child) => (
                    <th
                      key={`child-${child.id}`}
                      className="text-center"
                      style={{ border: '1px solid black' }}
                    >
                      {child.title}
                    </th>
                  ))
                : <th key={`empty-${group.parent?.id}`} style={{ border: '1px solid black' }}></th>
            )}
          </tr>
        </thead>
        <tbody>
          {visibleRows.map((row, index) => rowRenderer({ index, style: {} }))}
        </tbody>
      </Table>

      <div className="d-flex justify-content-between mt-2">
        <button onClick={handleDuplicate} className="btn btn-primary">
          Duplicate
        </button>
        <button onClick={handleAddRows} className="btn btn-secondary">
          Add 2 Rows
        </button>
      </div>
    </div>
  );
};

export default Card;
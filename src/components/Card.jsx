import React, { useState, useRef, useMemo } from 'react';
import { useDispatch } from 'react-redux';
import { addLayer } from '../layersSlice';
import { Table, Button } from 'react-bootstrap';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faEdit, faTrashAlt, faChevronDown, faChevronRight } from '@fortawesome/free-solid-svg-icons';
import { useVirtualizer } from '@tanstack/react-virtual';

// Actions component for edit and delete buttons
const Actions = () => (
  <div className="end-0 top-50 pe-3 translate-middle-y hover-actions">
    <Button variant="light" size="sm" className="border-300 me-1 text-600">
      <FontAwesomeIcon icon={faEdit} />
    </Button>
    <Button variant="light" size="sm" className="border-300 text-600">
      <FontAwesomeIcon icon={faTrashAlt} />
    </Button>
  </div>
);

const groupHeaders = (headers) => {
  const groups = new Map();

  headers.forEach((header) => {
    const { id, parentId } = header;
    
    if (!parentId) {
      // Создаем или обновляем группу для родительского заголовка
      const group = groups.get(id) || { parent: null, children: [] };
      group.parent = header;
      groups.set(id, group);
    } else {
      // Создаем или обновляем группу для дочернего заголовка
      const group = groups.get(parentId) || { parent: null, children: [] };
      group.children.push(header);
      groups.set(parentId, group);
    }
  });

  return Array.from(groups.values());
};


const groupRows = (rows) => {
  const rowMap = new Map();
  rows.forEach((row) => rowMap.set(row.id, { ...row, children: [] }));
  rows.forEach((row) => {
    if (row.parentId && rowMap.has(row.parentId)) {
      rowMap.get(row.parentId).children.push(rowMap.get(row.id));
    }
  });
  return Array.from(rowMap.values()).filter((row) => !row.parentId);
};

const ChildRowsVirtualized = ({ children, dispatch, onCellClick }) => {
  const parentRef = useRef(null);

  const rowVirtualizer = useVirtualizer({
    count: children.length, 
    estimateSize: () => 60, // Estimated height of each row
    getScrollElement: () => parentRef.current,
    overscan: 15, // Number of rows to render outside the visible area
  });

  return (
    <tr>
      <td colSpan="100%" className='m-0 p-0 '>
        <div ref={parentRef} style={{ overflowY: 'auto' }}>
          <div style={{ height: `${rowVirtualizer.getTotalSize()}px`, position: 'relative' }}
          className='w-100'>
            {rowVirtualizer.getVirtualItems().map((virtualRow) => {
              const child = children[virtualRow.index];
              return (
                <tr
                  key={child.id}
                  style={{
                    position: 'absolute',
                    top: 0,
                    transform: `translateY(${virtualRow.start}px)`,
                    width: '100%',
                  }}
                  onClick={() => {
                    const cellData = { ...child, name: 'ClickedCellComponent' };
                    console.log(cellData);
                    dispatch(addLayer(cellData)); 
                    onCellClick(cellData); 
                  }}
                >
                  {child.cells.map((cell, idx) => (
                    <td
                      key={idx}
                      style={{ border: '1px solid black', wordWrap: 'break-word', whiteSpace: 'normal' }}
                      className='childCol p-2'
                  
                    >
                      {cell.value}
                    </td>
                  ))}
                  <td className="w-auto" style={{ border: '1px solid black' }}>
                    <Actions />
                  </td>
                </tr>
              );
            })}
          </div>
        </div>
      </td>
    </tr>
  );
};

const Card = ({ content }) => {
  const [expandedRows, setExpandedRows] = useState({});
  const [clickedCell, setClickedCell] = useState(null); 
  const dispatch = useDispatch();

  // Toggle expanded state for a row
  const toggleExpanded = (rowId) => {
    setExpandedRows((prev) => ({
      ...prev,
      [rowId]: !prev[rowId],
    }));
  };
  const handleCellClick = (cellData) => {
    setClickedCell(cellData); 
  };
  const headers = content.structure.header;
  const groupedHeaders = useMemo(() => groupHeaders(headers), [headers]);
  const groupedRows = useMemo(() => groupRows(content.structure.rows), [content.structure.rows]);

  return (
    <div style={{ width: '100%', height: 'auto' }}>
      <h3>{content.structure.tableName}</h3>
      <table hover bordered responsive style={{ border: '1px solid black', width: '100%' }}>
      <thead>
  <tr>
    {groupedHeaders.map((group, index) => (
      <th
        key={`parent-${index}`}
        colSpan={group.children.length || 1}
        rowSpan={group.children.length === 0 ? 2 : 1} 
        className={`text-center m-0 p-0`}
        style={{ border: '1px solid black' }}
      >
        {group.parent?.title || 'No Parent'}
      </th>
    ))}
  </tr>
  {groupedHeaders.some(group => group.children.length > 0) && ( 
    <tr>
      {groupedHeaders.map((group) =>
        group.children.length > 0
          ? group.children.map((child) => (
              <th
                key={`child-${child.id}`}
                className="text-center childCol"
                style={{ border: '1px solid black' }}
              >
                {child.title}
              </th>
            ))
          : null 
      )}
    </tr>
  )}
</thead>
        <tbody>
          {groupedRows.map((row) => (
            <React.Fragment key={row.id}>
              {/* Render parent row */}
              <tr>
                <td colSpan={groupedHeaders.length} onClick={() => toggleExpanded(row.id)}>
                  {row.children.length > 0 && (
                    <FontAwesomeIcon icon={expandedRows[row.id] ? faChevronDown : faChevronRight} />
                  )}
                  {row.cells[0].value}
                </td>
                <td>
                  <Actions />
                </td>
              </tr>

              {/* Render virtualized child rows if expanded */}
              {expandedRows[row.id] && <ChildRowsVirtualized children={row.children} dispatch={dispatch}   onCellClick={handleCellClick} />}
            </React.Fragment>
          ))}
        </tbody>
      </table>

      <div className="d-flex justify-content-between mt-2">
        <button onClick={() => dispatch(addLayer(content))} className="btn btn-primary">
          Duplicate
        </button>
        <button className="btn btn-secondary">
          Add 2 Rows
        </button>
      </div>
    </div>
  );
};

export default Card;
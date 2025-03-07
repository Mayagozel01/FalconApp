import React, { useState } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSave } from '@fortawesome/free-solid-svg-icons';

const EditingCellComponent = ({ cellData, headerLabels, layerId, onSave }) => {
  const [editedCells, setEditedCells] = useState(cellData);

  // Handle input changes
  const handleInputChange = (index, value) => {
    const updatedCells = editedCells.map((cell, i) => {
      if (i === index) {
        // Create a new copy of the cell object with the updated value
        return { ...cell, value };
      }
      return cell;
    });
    setEditedCells(updatedCells);
  };

  // Handle save button click
  const handleSave = () => {
    onSave(editedCells); // Pass updated cells to the parent component
  };

  return (
    <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
      <h4>Редактирование данных</h4>
      <table style={{ width: '100%', borderCollapse: 'collapse' }}>
        <thead>
          <tr>
            <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Поле</th>
            <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Значение</th>
          </tr>
        </thead>
        <tbody>
          {editedCells.map((cell, index) => (
            <tr key={index}>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                {headerLabels[cell.headerId] || `Неизвестное поле (ID: ${cell.headerId})`}
              </td>
              <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                <input
                  type="text"
                  value={cell.value || ''}
                  onChange={(e) => handleInputChange(index, e.target.value)}
                  style={{ width: '100%', padding: '4px' }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* Save button */}
      <button
        onClick={handleSave}
        style={{
          marginTop: '10px',
          padding: '8px 16px',
          backgroundColor: '#1890ff',
          color: '#fff',
          border: 'none',
          borderRadius: '4px',
          cursor: 'pointer',
        }}
      >
        <FontAwesomeIcon icon={faSave} /> Сохранить
      </button>
    </div>
  );
};

export default EditingCellComponent;
import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { deleteLayer, updateLayer } from '../layersSlice';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faTrashAlt, faEdit } from '@fortawesome/free-solid-svg-icons';
import EditingCellComponent from './EditingCellComponent'; 

const ClickedCellComponent = ({ id: layerId, cells, onEdit }) => {
  const dispatch = useDispatch();
  const [isEditing, setIsEditing] = useState(false); 

  const headerLabels = {
    3: "Фамилия",
    4: "Имя",
    5: "Отчество",
    6: "Номер документа",
    7: "Дополнительное поле",
    9: "Тип документа",
    10: "Серия документа",
    11: "Дата выдачи",
    13: "Кем выдан",
    14: "Код подразделения"
  };

  const handleDelete = () => {
    if (layerId) {
      dispatch(deleteLayer(layerId)); 
    }
  };

  const handleSave = (updatedCells) => {
    dispatch(updateLayer({ id: layerId, cells: updatedCells }));
    setIsEditing(false); 
  };

  return (
    <div style={{ marginTop: '20px', padding: '10px', border: '1px solid #ccc', borderRadius: '5px' }}>
      {isEditing ? (
        // Render EditingCellComponent if in edit mode
        <EditingCellComponent
          cellData={cells}
          layerId={layerId}
          headerLabels={headerLabels}
          onSave={handleSave}
        />
      ) : (
        // Render view mode if not in edit mode
        <>
          <h4>Данные выбранной ячейки</h4>
          <table style={{ width: '100%', borderCollapse: 'collapse' }}>
            <thead>
              <tr>
                <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Поле</th>
                <th style={{ border: '1px solid #ccc', padding: '8px', textAlign: 'left' }}>Значение</th>
              </tr>
            </thead>
            <tbody>
              {cells.map((cell, index) => (
                <tr key={index}>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    {headerLabels[cell.headerId] || `Неизвестное поле (ID: ${cell.headerId})`}
                  </td>
                  <td style={{ border: '1px solid #ccc', padding: '8px' }}>
                    {cell.value || <span style={{ color: '#999' }}>Пусто</span>}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>


          <button
            onClick={() => setIsEditing(true)} // Switch to edit mode
            style={{
              marginTop: '10px',
              marginRight: '10px',
              padding: '8px 16px',
              backgroundColor: '#1890ff',
              color: '#fff',
              border: 'none',
              borderRadius: '50%',
              cursor: 'pointer',
              width: '40px',
              height: '40px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <FontAwesomeIcon icon={faEdit} />
          </button>

          <button
            onClick={handleDelete}
            style={{
              marginTop: '10px',
              padding: '8px 16px',
              backgroundColor: '#ff4d4f',
              color: '#fff',
              border: 'none',
              borderRadius: '4px',
              cursor: 'pointer',
            }}
          >
            <FontAwesomeIcon icon={faTrashAlt} /> Удалить слой
          </button>
        </>
      )}
    </div>
  );
};

export default ClickedCellComponent;
import React from 'react';
import { useDispatch } from 'react-redux';
import { addLayer } from '../layersSlice';




const Registry = ({ ...rest }) => {
  // if (!rest.content?.structure?.rows || !rest.content?.structure?.header) {
  //   return <div>No data to display</div>; // Обработка отсутствия данных
  // }
  const dispatch = useDispatch();
  const handleDuplicate = () => {
      dispatch(addLayer(rest)); // Создаем копию props перед отправкой
  };
    console.log('REgis props:', rest)
  return (
    <div>
      <h3>{rest.title.value}</h3>
      {rest.content.structure.view === 'table' && ( // Отображаем таблицу только если view === 'table'
        <table>
          <thead>
            <tr>
              {rest.content.structure.header.map(header => (
                <th key={rest.header.id}>{rest.header.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {rest.content.structure.rows.map(row => (
              <tr key={row.id}>
                {row.cells.map((cell, index) => (
                  <td key={index}>{cell?.value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {rest.content.structure.view === 'list' && ( // Отображаем список только если view === 'list'
        <ul>
            {rest.content.structure.rows.map(row => (
                <li key={row.id}>
                    {row.cells.map((cell, index) => (
                        <span key={index}>{cell?.value} </span>
                    ))}
                </li>
            ))}
        </ul>
      )}
<button onClick={handleDuplicate}>Duplicater</button>
    </div>
  );
};

export default Registry;
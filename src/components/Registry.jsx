import React from 'react';

const Registry = ({ title, content, ...rest }) => {
  if (!content?.structure?.rows || !content?.structure?.header) {
    return <div>No data to display</div>; // Обработка отсутствия данных
  }
  return (
    <div>
      <h3>{title.value}</h3>
      {content.structure.view === 'table' && ( // Отображаем таблицу только если view === 'table'
        <table>
          <thead>
            <tr>
              {content.structure.header.map(header => (
                <th key={header.id}>{header.title}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {content.structure.rows.map(row => (
              <tr key={row.id}>
                {row.cells.map((cell, index) => (
                  <td key={index}>{cell?.value}</td>
                ))}
              </tr>
            ))}
          </tbody>
        </table>
      )}
      {content.structure.view === 'list' && ( // Отображаем список только если view === 'list'
        <ul>
            {content.structure.rows.map(row => (
                <li key={row.id}>
                    {row.cells.map((cell, index) => (
                        <span key={index}>{cell?.value} </span>
                    ))}
                </li>
            ))}
        </ul>
      )}
    </div>
  );
};

export default Registry;
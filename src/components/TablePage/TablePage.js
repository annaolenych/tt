import React from 'react';

const TablePage = () => {
  return (
    <div>
      <h2>Table Page</h2>
      <table>
        <thead>
          <tr>
            <th>Колонка 1</th>
            <th>Колонка 2</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Значення 1</td>
            <td>Значення 2</td>
          </tr>
          <tr>
            <td>Значення 3</td>
            <td>Значення 4</td>
          </tr>
          {/* Додайте інші рядки за потреби */}
        </tbody>
      </table>
    </div>
  );
};

export default TablePage;
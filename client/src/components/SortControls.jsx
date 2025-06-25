import React from 'react';
import api from '../api';

export default function SortControls({ setProperties }) {
  const sortBy = async criteria => {
    const res = await api.get(`/properties?sort=${criteria}`);
    setProperties(res.data);
  };

  return (
    <div className="sort-controls">
      <button onClick={() => sortBy('price_asc')}>Price ↑</button>
      <button onClick={() => sortBy('price_desc')}>Price ↓</button>
      <button onClick={() => sortBy('rating_desc')}>Rating</button>
    </div>
  );
}

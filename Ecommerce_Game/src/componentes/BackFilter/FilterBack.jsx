import React from 'react';
import './filterback.css';

const FilterBack = ({ onSelect }) => {
  const handleClick = (e) => {
    onSelect(e.target.value);
  };

  return (
    <>
      <p>Filtrar por: </p>
      {Array.from('ABCDEFGHIJKLMNOPQRSTUVWXYZ').map((letter) => (
        <button key={letter} value={letter} onClick={handleClick}>
          {letter}
        </button>
      ))}
    </>
  );
};

export default FilterBack;
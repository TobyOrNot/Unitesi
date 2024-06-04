import React from 'react';
import './SearchHeader.css';

const SearchHeader = () => {
  return (
    <div className="search-header">
      <div className="textbox">
        <input type="text" placeholder="Search..." />
      </div>
      <div className="filter-container">
        <label htmlFor="filter-select" className="filter-label">Filtra per:</label>
        <select id="filter-select" className="filter-select">
          <option value="tutti">Tutti</option>
          <option value="categoria1">Categoria 1</option>
          <option value="categoria2">Categoria 2</option>
          <option value="categoria3">Categoria 3</option>
        </select>
      </div>
    </div>
  );
}

export default SearchHeader;

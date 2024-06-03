import React from 'react';
import './SearchHeader.module.css';

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
          <option value="categoria1">Tesi Triennali</option>
          <option value="categoria2">Tesi Magistrali</option>
          <option value="categoria3">Tesi Dottorati</option>
          <option value="categoria4">Tesi da Relatore</option>
          <option value="categoria5">Tesi da Correlatore</option>
        </select>
      </div>
    </div>
  );
}

export default SearchHeader;

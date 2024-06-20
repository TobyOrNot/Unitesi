import React, { useState } from 'react';
import './searchBar.css'; // Import the CSS file

const SearchBar = ({ onSearchChange, onSearchChange2 }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleChange = (event) => {
    setSearchTerm(event.target.value);
    onSearchChange(event.target.value);
  };

  const handleChange2 = (event) => {
    onSearchChange2(event.target.value);
  };

  return (
    <div>
    <form onsubmit="event.preventDefault();" role="search">
    <label htmlFor="search">Cerca titolo</label>
    <input
      id="search"
      type="search"
      placeholder="Cerca titolo..."
      autofocus=""
      required=""
      onChange={handleChange}
    />
  </form>
  <form onsubmit="event.preventDefault();" role="search">
    <label htmlFor="search">Cerca docente</label>
    <div>
    <input
      id="searchDocente"
      type="search"
      placeholder="Cerca docente..."
      autofocus=""
      required=""
      onChange={handleChange2}
    />
    </div>
  </form>
  </div>
  );
};

export default SearchBar;

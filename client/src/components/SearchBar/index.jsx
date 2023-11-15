import React, { useState } from 'react';
import { Link } from "react-router-dom";

function SearchBar() {
  const [searchValue, setSearchValue] = useState('');

  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div style={{ marginTop: '8px',display: 'flex', justifyContent: 'flex-end' }}>
      <input
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={handleSearchChange}
      />
      <Link to={`/search/:${searchValue}`}>
      <button onClick={() => console.log('search button')}>
      <i className="fas fa-search"></i>
      </button>
      </Link>
      
    </div>
  );
}

export default SearchBar;

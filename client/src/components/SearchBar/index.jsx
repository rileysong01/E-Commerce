import React, { useState } from 'react';

function Search() {
  // State to manage the search input value
  const [searchValue, setSearchValue] = useState('');

  // Function to handle changes in the search input
  const handleSearchChange = (e) => {
    setSearchValue(e.target.value);
  };

  return (
    <div>
      <input
        type="text"
        placeholder="Search..."
        value={searchValue}
        onChange={handleSearchChange}
      />
      <button onClick={() => console.log('search button')}>
      <span role="img" aria-label="search">🔍</span>
      </button>
    </div>
  );
}

export default Search;

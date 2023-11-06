import React from 'react';
import { useParams } from 'react-router-dom';
import CategoryMenu from '../components/CategoryMenu';
import SearchProductList from '../components/SearchProductList';

function Search() {

  const { query } = useParams();

  return (
   
    <div>
         <CategoryMenu isOnSearchPage={true}/>
      <h1>Search Results for {query}</h1>
     <SearchProductList searchQuery={query.substring(1)} />
    </div>
  );
}

export default Search;
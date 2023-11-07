import React from 'react';
import { useParams } from 'react-router-dom';
import CategoryMenu from '../components/CategoryMenu';
import SearchProductList from '../components/SearchProductList';
import SearchBar from '../components/SearchBar';
import { Container, Row, Col } from 'react-bootstrap';

function Search() {

  const { query } = useParams();

  return (

    <div>
      <Container fluid>
    <Row>
      <Col lg={9}>
        <CategoryMenu />
      </Col>
      <Col lg={3}>
        <SearchBar />
      </Col>
    </Row>
   </Container>
      <h1>Search Results for {query}</h1>
      <SearchProductList searchQuery={query.substring(1)} />
    </div>
  );
}

export default Search;
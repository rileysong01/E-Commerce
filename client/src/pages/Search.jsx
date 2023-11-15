import React from 'react';
import { useParams } from 'react-router-dom';
import CategoryMenu from '../components/CategoryMenu';
import SearchProductList from '../components/SearchProductList';
import ProductFilter from '../components/ProductFilter';
import SearchBar from '../components/SearchBar';
import { Container, Row, Col } from 'react-bootstrap';

function Search() {

  const { query } = useParams();

  return (

    <div>
      <Container fluid>
        <Row>
          <Col lg={9}>
            <CategoryMenu isOnSearchPage={true} />
          </Col>
          <Col lg={3}>
            <SearchBar />
          </Col>
        </Row>
      </Container>
      <Row>
        <Col lg={3}>
          <ProductFilter />
          
        </Col>
        <Col lg={9}>
          <SearchProductList searchQuery={query.substring(1)} />
        </Col>
      </Row>
    </div>
  );
}

export default Search;
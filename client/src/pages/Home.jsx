import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import SearchBar from "../components/SearchBar";
import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Home = () => {
  return (
    <Container fluid>
    <Row>
      <Col lg={9}>
        <CategoryMenu />
      </Col>
      <Col lg={3}>
        <SearchBar />
      </Col>
    </Row>
    <Row>
      <Col>
        <ProductList />
      </Col>
    </Row>
  </Container>
);
};

export default Home;

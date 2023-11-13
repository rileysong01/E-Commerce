import ProductList from "../components/ProductList";
import CategoryMenu from "../components/CategoryMenu";
import SearchBar from "../components/SearchBar";
import ProductFilter from "../components/ProductFilter";
import Announcements from "../components/Announcements";
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
      <Announcements/>
    </Row>
    <Row>
    <Col lg={3}>
        <ProductFilter />
      </Col>
      <Col lg={9}>
        <ProductList />
      </Col>
    </Row>
  </Container>
);
};

export default Home;

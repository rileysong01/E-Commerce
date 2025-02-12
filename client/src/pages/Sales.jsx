import ProductItem from "../components/ProductItem";
import ProductFilter from "../components/ProductFilter";
import CategoryMenu from "../components/CategoryMenu";
import SearchBar from "../components/SearchBar";
import { useStoreContext } from "../utils/GlobalState";
import spinner from '../assets/spinner.gif'
import { useQuery } from '@apollo/client';
import { QUERY_SALES, QUERY_CATEGORIES } from '../utils/queries';
import { UPDATE_CATEGORIES } from '../utils/actions';
import { idbPromise } from '../utils/helpers';
import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';
import Announcements from "../components/Announcements";

const Sales = () => {
    const [categoryQuery, setCategoryQuery] = useState([]);

    const [state, dispatch] = useStoreContext();
    const { categories, priceSortOrder } = state;
    const { loading: categoriesLoading, data: categoryData } = useQuery(QUERY_CATEGORIES);

    useEffect(() => {
        if (categoryData) {
            dispatch({
                type: UPDATE_CATEGORIES,
                categories: categoryData.categories,
            });
            categoryData.categories.forEach((category) => {
                idbPromise('categories', 'put', category);
            });
        } else if (!categoriesLoading) {
            idbPromise('categories', 'get').then((categories) => {
                dispatch({
                    type: UPDATE_CATEGORIES,
                    categories: categories,
                });
            });
        }
    }, [categoryData, categoriesLoading, dispatch]);

    const { loading: salesLoading, data } = useQuery(QUERY_SALES, {
        variables: { categoryID: categoryQuery || null, priceSortOrder: priceSortOrder || null },
    });

    console.log(state);
    const products = data?.getSales || [];

    return (
        <Container fluid>
            <Row>
                <Col lg={9}>
                    <CategoryMenu isOnSearchPage={true} />
                </Col>
                <Col lg={3}>
                    <SearchBar />
                </Col>
            </Row>
            <Row>
                <Announcements />
            </Row>
            <Row>
                <Col lg={3}>
                    <Link to="/">
                        <button style={{ fontSize: '130%' }}> <i className="fas fa-chevron-left"></i> Back to products </button>
                    </Link>
                    <ProductFilter />
                    <Form style={{ padding: '5%' }}>
                        <hr
                            style={{
                                border: 'none',
                                borderBottom: '2px solid #000',
                                bottom: '0',
                                width: '100%',
                                margin: 0
                            }}
                        />
                        <p style={{ marginTop: '3%', marginBottom: '3%' }}>Category</p>
                        <hr
                            style={{
                                border: 'none',
                                borderBottom: '2px solid #000',
                                bottom: '0',
                                width: '100%',
                                margin: 0
                            }}
                        />
                        <Form.Group>
                            {categories.map((item) => (
                                <Form.Check
                                    key={item._id}
                                    type="checkbox"
                                    label={item.name}
                                    onClick={() => {
                                        console.log(item._id)
                                        console.log(categoryQuery)
                                        if (categoryQuery.includes(item._id)) {
                                            setCategoryQuery(categoryQuery.filter(id => id !== item._id));
                                        } else {
                                            setCategoryQuery([...categoryQuery, item._id]);
                                        }
                                    }} />
                            ))}
                        </Form.Group>


                    </Form>
                </Col>
                <Col lg={9} >
                    <Row className="flex-row">
                        {products.map((product) => (
                            <Col key={product._id} xs={12} sm={6} md={4} lg={3}>
                                <ProductItem
                                    _id={product._id}
                                    image={product.image}
                                    name={product.name}
                                    author={product.author}
                                    price={product.price}
                                    quantity={product.quantity}
                                />
                            </Col>
                        ))}
                    </Row>
                </Col>
            </Row>
        </Container>
    )
}

export default Sales;

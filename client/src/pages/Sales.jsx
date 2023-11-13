import ProductItem from "../components/ProductItem";
import ProductFilter from "../components/ProductFilter";

import { useStoreContext } from "../utils/GlobalState";
import spinner from '../assets/spinner.gif'
import { useQuery } from '@apollo/client';
import { QUERY_SALES, QUERY_CATEGORIES} from '../utils/queries';
import { UPDATE_CATEGORIES } from '../utils/actions';
import { idbPromise } from '../utils/helpers';
import React from 'react';
import { Container, Row, Col, Form } from 'react-bootstrap';
import { Link } from "react-router-dom";
import { useState, useEffect } from 'react';

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

    console.log(data);
    const products = data?.getSales || [];

    return (
        <Container fluid>
            <Row>
                <Col lg={3}>
                    <Link to="/"> -- Back to home</Link>
                    <ProductFilter />
                    <Form>
                        Category:
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

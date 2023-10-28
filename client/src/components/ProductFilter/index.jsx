import React, { useState } from 'react';
import { Form, Row, Col, InputGroup, Dropdown } from 'react-bootstrap';
import Slider from 'rc-slider';
import 'rc-slider/assets/index.css';

function ProductFilter() {
    return (
        <div>
            <Form>
                <Row>
                    <Col>
                        <Form.Group>
                            <Form.Label>Price Range</Form.Label>
                        </Form.Group>
                    </Col>
                    <Col>
                        <Form.Group>
                            <Form.Label>Filter by</Form.Label>
                            <InputGroup>
                                <Dropdown as={InputGroup.Prepend}>
                                    <Dropdown.Toggle variant="outline-primary">Select</Dropdown.Toggle>
                                    <Dropdown.Menu>
                                        <Dropdown.Item>Price (low to high)</Dropdown.Item>
                                        <Dropdown.Item>Price (high to low)</Dropdown.Item>
                                    </Dropdown.Menu>
                                </Dropdown>
                            </InputGroup>
                        </Form.Group>
                    </Col>
                </Row>
            </Form>
        </div>
    );
}

export default ProductFilter;

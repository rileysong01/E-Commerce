import React, { useState, useEffect } from 'react';
import { Form, InputGroup, Dropdown, DropdownButton, FormCheck } from 'react-bootstrap';
import { useStoreContext } from '../../utils/GlobalState';
import { SET_PRICE_SORT_ORDER } from '../../utils/actions';
import './style.css'

function ProductFilter() {
    const [state, dispatch] = useStoreContext();
    const { priceSortOrder } = state;
    const [title, setTitle] = useState('');

    const handlePriceFilter = (eventKey) => {
        dispatch({
            type: SET_PRICE_SORT_ORDER,
            payload: eventKey,
        });
        console.log('handlPriceFilter triggered', eventKey)
    }

    useEffect(() => {
        let newTitle = 'Price Sort';
        if (priceSortOrder === 'priceLowToHigh') {
            newTitle = 'Price (low to high)';
        } else if (priceSortOrder === 'priceHighToLow') {
            newTitle = 'Price (high to low)';
        }
        setTitle(newTitle);
    }, [priceSortOrder]);

    return (
        <Form>
            <Form.Group style={{ padding: '5%' }}>
                <Form.Label style={{ fontWeight: 'bold', fontSize: '17px', position: 'relative', marginBottom: '10px' }}>
                    FILTER BY:
                </Form.Label>
                <hr
                    style={{
                        border: 'none',
                        borderBottom: '2px solid #000',
                        bottom: '0',
                        width: '100%',
                        margin: 0
                    }}
                />
                <p style={{ marginTop: '3%', marginBottom: '3%' }}>Price</p>
                <hr
                    style={{
                        border: 'none',
                        borderBottom: '2px solid #000',
                        bottom: '0',
                        width: '100%',
                        margin: 0
                    }}
                />
                <InputGroup style={{ marginTop: '3%' }}>
                    <DropdownButton
                        variant="outline-primary"
                        title={title}
                        id="price-filter-dropdown"
                        onSelect={handlePriceFilter}

                    >
                        <Dropdown.Item eventKey="priceLowToHigh">Price (low to high)</Dropdown.Item>
                        <Dropdown.Item eventKey="priceHighToLow">Price (high to low)</Dropdown.Item>
                    </DropdownButton>
                </InputGroup>

            </Form.Group>
        </Form>
    );
}

export default ProductFilter;

import React, { useState, useEffect } from 'react';
import { Form, InputGroup, Dropdown, DropdownButton, FormCheck } from 'react-bootstrap';
import { useStoreContext } from '../../utils/GlobalState';
import { SET_PRICE_SORT_ORDER } from '../../utils/actions';

function ProductFilter() {
    const [state, dispatch] = useStoreContext();
    const { priceSortOrder } = state; 
    const [title, setTitle] = useState('Price'); 

    const handlePriceFilter = (eventKey) => {
        dispatch({
            type: SET_PRICE_SORT_ORDER,
            payload: eventKey,
        });
        console.log('handlPriceFilter triggered', eventKey)
    }
  
    useEffect(() => {
        let newTitle = 'Price';
        if (priceSortOrder === 'priceLowToHigh') {
            newTitle = 'Price (low to high)';
        } else if (priceSortOrder === 'priceHighToLow') {
            newTitle = 'Price (high to low)';
        }
        setTitle(newTitle);
    }, [priceSortOrder]);

    return (
        <Form>
            <Form.Group>
                <Form.Label>Filter by</Form.Label>
                <InputGroup>
                    <DropdownButton
                        variant="outline-primary"
                        title={title} // Use the title from state
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

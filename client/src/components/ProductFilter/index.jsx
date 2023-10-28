import React, { useState } from 'react';
import { Form, InputGroup, Dropdown, DropdownButton, FormCheck } from 'react-bootstrap';

function ProductFilter({ setPriceSortOrder }) {
    const [priceFilter, setPriceFilter] = useState(null);
    const [saleFilter, setSaleFilter] = useState(false);

    const handlePriceFilter = (eventKey) => {
        setPriceFilter(eventKey);
        if (eventKey === "priceLowToHigh") {
            setPriceSortOrder("priceLowToHigh");
          } else if (eventKey === "priceHighToLow") {
            setPriceSortOrder("priceHighToLow");
          }
    };

    const handleSaleFilter = (e) => {
        setSaleFilter(e.target.checked);
        console.log('Sale filter:', e.target.checked);
    };

    return (
        <Form>
            <Form.Group>
                <Form.Label>Filter by</Form.Label>
                <InputGroup>
                    <DropdownButton
                        variant="outline-primary"
                        title={priceFilter === null ? 'Price' : priceFilter}
                        id="price-filter-dropdown"
                        onSelect={handlePriceFilter}
                    >
                        <Dropdown.Item eventKey="price low to high">Price (low to high)</Dropdown.Item>
                        <Dropdown.Item eventKey="price high to low">Price (high to low)</Dropdown.Item>
                    </DropdownButton>
                </InputGroup>
            </Form.Group>
            <Form.Group>
                <FormCheck
                    type="checkbox"
                    label="On Sale"
                    checked={saleFilter}
                    onChange={handleSaleFilter}
                />
            </Form.Group>
        </Form>
    );
}


export default ProductFilter;


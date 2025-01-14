import React, { useState } from 'react';
import { useMutation } from '@apollo/client';
import { useQuery } from '@apollo/client';
import { UPDATE_PRODUCT_DETAILS } from '../../utils/mutations';
import { Modal, Button, Form } from 'react-bootstrap';
import { QUERY_CATEGORIES } from '../../utils/queries';

function EditProductDetails({ currentProduct, refreshPage, closeEditModal }) {
    const { loading, data } = useQuery(QUERY_CATEGORIES)

    const [editedName, setEditedName] = useState(currentProduct.name);
    const [editedDescription, setEditedDescription] = useState(currentProduct.description);
    const [editedPrice, setEditedPrice] = useState(currentProduct.price);
    const [editedQuantity, setEditedQuantity] = useState(currentProduct.quantity);
    const [editedSale, setEditedSale] = useState(currentProduct.sale);
    const [editedTags, setEditedTags] = useState(currentProduct.tags.join(', '))
    const [editedCategory, setEditedCategory] = useState(currentProduct.category.name);

    const [updateProduct] = useMutation(UPDATE_PRODUCT_DETAILS);

    const handleNameChange = (e) => {
        setEditedName(e.target.value);
    };
    const handleDescriptionChange = (e) => {
        setEditedDescription(e.target.value);
    };
    const handlePriceChange = (e) => {
        setEditedPrice(e.target.value);
    };
    const handleQuantityChange = (e) => {
        setEditedQuantity(e.target.value);
    }
    const handleSaleChange = (e) => {
        const isOn = e.target.checked;
        setEditedSale(isOn);
    }
    const handleTagsChange = (e) => {
        console.log(editedTags)
        setEditedTags(e.target.value);
    }

    const handleCategoryChange = (e) => {
        console.log(currentProduct.category.name)
        setEditedCategory(e.target.value);
    };

    const handleSaveClick = () => {

        updateProduct({
            variables: {
                id: currentProduct._id,
                category: editedCategory,
                name: editedName,
                description: editedDescription,
                price: parseFloat(editedPrice),
                quantity: parseInt(editedQuantity),
                sale: editedSale,
                tags: editedTags
            },
        })
            .then((response) => {
                console.log('Product updated:', response);
                refreshPage();
            })
            .catch((error) => {
                console.error('Update failed:', error);
            });
    }

    return (
        <Modal show={true}>
            <Modal.Header closeButton onClick={closeEditModal}>
                <Modal.Title>Edit Product Details</Modal.Title>
            </Modal.Header>
            <Modal.Body>
                <Form style={{ width: '100%' }}>
                    <Form.Group controlId="editedName">
                        <Form.Label>Name:</Form.Label>
                        <Form.Control
                            type="text"
                            value={editedName}
                            onChange={handleNameChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="editedDescription">
                        <Form.Label>Description:</Form.Label>
                        <Form.Control
                            as="textarea"
                            value={editedDescription}
                            onChange={handleDescriptionChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="editedPrice">
                        <Form.Label>Price:</Form.Label>
                        <Form.Control
                            type="textarea"
                            value={editedPrice}
                            onChange={handlePriceChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="category">
                        <Form.Label>Category:</Form.Label>
                        <Form.Control as="select" value={editedCategory} onChange={handleCategoryChange}>
                            <option value="">{currentProduct.category.name}</option> {/* Default option */}

                            {loading ? (
                                <option>Loading categories...</option>
                            ) : (
                                data.categories.map((category) => (
                                    <option key={category._id} value={category._id}>
                                        {category.name}
                                    </option>
                                ))
                            )}
                        </Form.Control>
                    </Form.Group>
                    <Form.Group controlId="editedQuantity">
                        <Form.Label>Quantity:</Form.Label>
                        <Form.Control
                            type="number"
                            value={editedQuantity}
                            onChange={handleQuantityChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="editedTags">
                        <Form.Label>Tags:</Form.Label>
                        <Form.Control
                            type="text"
                            value={editedTags}
                            onChange={handleTagsChange}
                        />
                    </Form.Group>
                    <Form.Group controlId="editedSale">
                        <Form.Check
                            type="checkbox"
                            label="Sale"
                            checked={editedSale}
                            onChange={handleSaleChange}
                        />
                    </Form.Group>
                </Form>
            </Modal.Body>
            <Modal.Footer>
                <Button variant="primary" onClick={handleSaveClick}>
                    Save Changes
                </Button>
            </Modal.Footer>
        </Modal>
    );
}

export default EditProductDetails;

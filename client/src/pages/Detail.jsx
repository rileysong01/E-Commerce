import { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';
import { useQuery } from '@apollo/client';

import Cart from '../components/Cart';
import EditProductDetails from '../components/EditProduct'
import DeleteConfirmation from '../components/DeleteProduct';
import { useStoreContext } from '../utils/GlobalState';
import {
  REMOVE_FROM_CART,
  UPDATE_CART_QUANTITY,
  ADD_TO_CART,
  UPDATE_PRODUCTS,
} from '../utils/actions';
import { QUERY_PRODUCTS } from '../utils/queries';
import { idbPromise } from '../utils/helpers';
import spinner from '../assets/spinner.gif';
import AuthService from '../utils/auth';
import { useMutation } from '@apollo/client';
import { DELETE_PRODUCT } from '../utils/mutations';
import Announcements from '../components/Announcements';
import CategoryMenu from '../components/CategoryMenu';
import SearchBar from '../components/SearchBar';
import { Container, Row, Col } from 'react-bootstrap';

const isAdmin = AuthService.checkAdmin();

function Detail() {
  const [state, dispatch] = useStoreContext();
  const { id } = useParams();

  const [currentProduct, setCurrentProduct] = useState({});

  const { loading, data } = useQuery(QUERY_PRODUCTS);

  const { products, cart } = state;

  useEffect(() => {
    // already in global store
    if (products.length) {
      setCurrentProduct(products.find((product) => product._id === id));
    }
    // retrieved from server
    else if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });

      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });
    }
    // get cache from idb
    else if (!loading) {
      idbPromise('products', 'get').then((indexedProducts) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: indexedProducts,
        });
      });
    }
  }, [products, data, loading, dispatch, id]);

  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === id);
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1,
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...currentProduct, purchaseQuantity: 1 },
      });
      idbPromise('cart', 'put', { ...currentProduct, purchaseQuantity: 1 });
    }
  };

  const removeFromCart = () => {
    dispatch({
      type: REMOVE_FROM_CART,
      _id: currentProduct._id,
    });

    idbPromise('cart', 'delete', { ...currentProduct });
  };

  const [isEditModalOpen, setIsEditModalOpen] = useState(false);

  const openEditModal = () => {
    setIsEditModalOpen(true);

  };

  const closeEditModal = () => {
    setIsEditModalOpen(false);
  };

  const [isDeleteConfirmationOpen, setIsDeleteConfirmationOpen] = useState(false)

  const openDeleteConfirmation = () => {
    setIsDeleteConfirmationOpen(true);

  };

  const closeDeleteConfirmation = () => {
    setIsDeleteConfirmationOpen(false);
  };

  const refreshPage = () => {
    window.location.reload();
  }
  const [deleteProduct] = useMutation(DELETE_PRODUCT);
  const handleDeleteProduct = () => {
    deleteProduct({
      variables: {
        id: currentProduct._id
      }
    }).then((response) => {
      console.log('Product deleted:', response);
      window.location.href = '/';
    })
      .catch((error) => {
        console.error('delete failed:', error);
      });
  }

  return (
    <Container fluid>
      <Row>
        <Col lg={9}>
          <CategoryMenu isOnSearchPage={true}/>
        </Col>
        <Col lg={3}>
          <SearchBar />
        </Col>
      </Row>
      <Row>
        <Announcements />
      </Row>
      {currentProduct && cart ? (
        <div className="container my-1">
          <Link to="/">
                       <button style={{fontSize:'130%'}}> <i className="fas fa-chevron-left"></i> Back to products </button>
                    </Link>

          <div style={{ display: 'flex' }}>
            <div style={{ flex: 1 }}>
              <img
                src={`${currentProduct.image}`}
                alt={currentProduct.name}
                style={{ maxWidth: '100%', height: 'auto' }}
              />
            </div>

            <div style={{ flex: 1, marginLeft: '20px', display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
              <h2>{currentProduct.name}</h2>
              <h4>By: {currentProduct.author}</h4>
              <p>{currentProduct.description}</p>
              <strong>Price: ${currentProduct.price}{' '}</strong>
              {isAdmin ? (
                <>
                  <button onClick={openEditModal}
                  style={{
                    border: '2px solid #cdb4db',
                    borderRadius: '5px',
                    padding: '10px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease, color 0.3s ease', 
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#cdb4db';
                    e.target.style.color = 'white'; 
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '';
                    e.target.style.color = 'black'; 
                  }}>Edit Product Details</button>
                  {isEditModalOpen && (
                    <EditProductDetails
                      currentProduct={currentProduct}
                      closeEditModal={closeEditModal}
                      refreshPage={refreshPage}
                    />
                  )}
                  <button onClick={openDeleteConfirmation}
                  style={{
                    border: '2px solid #cdb4db',
                    borderRadius: '5px',
                    padding: '10px',
                    cursor: 'pointer',
                    transition: 'background-color 0.3s ease, color 0.3s ease', 
                  }}
                  onMouseOver={(e) => {
                    e.target.style.backgroundColor = '#cdb4db';
                    e.target.style.color = 'white'; 
                  }}
                  onMouseOut={(e) => {
                    e.target.style.backgroundColor = '';
                    e.target.style.color = 'black'; 
                  }}>Delete Product</button>
                  {isDeleteConfirmationOpen && (
                    <DeleteConfirmation
                      currentProduct={currentProduct}
                      closeDeleteConfirmation={closeDeleteConfirmation}
                      handleDeleteProduct={handleDeleteProduct}
                    />
                  )}
                </>
              ) : (
                <>
                  <button onClick={addToCart}
                    style={{
                      border: '2px solid #cdb4db',
                      borderRadius: '5px',
                      padding: '10px',
                      cursor: 'pointer',
                      transition: 'background-color 0.3s ease, color 0.3s ease',
                    }}
                    onMouseOver={(e) => {
                      e.target.style.backgroundColor = '#cdb4db';
                      e.target.style.color = 'white';
                    }}
                    onMouseOut={(e) => {
                      e.target.style.backgroundColor = '';
                      e.target.style.color = 'black';
                    }}>Add to Cart</button>
                  <button
                    disabled={!cart.find((p) => p._id === currentProduct._id)}
                    onClick={removeFromCart}
                  >
                    Remove from Cart
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      ) : null}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </Container>
  );
}

export default Detail;
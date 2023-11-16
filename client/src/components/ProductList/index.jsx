import { useState, useEffect } from 'react';
import ProductItem from '../ProductItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_PRODUCTS } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';
import AuthService from '../../utils/auth';
import AddProduct from '../AddProduct/index'
import { Row, Col } from 'react-bootstrap';

const isAdmin = AuthService.checkAdmin();


function ProductList() {
  const [state, dispatch] = useStoreContext();

  const { currentCategory, priceSortOrder } = state;
  const { loading, data } = useQuery(QUERY_PRODUCTS, {
    variables: { categoryID: currentCategory || null, priceSortOrder: priceSortOrder || null },
  });

  

  useEffect(() => {

    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.products,
      });
      data.products.forEach((product) => {
        idbPromise('products', 'put', product);
      });

    } else if (!loading) {
      idbPromise('products', 'get').then((products) => {
        dispatch({
          type: UPDATE_PRODUCTS,
          products: products,
        });
      });
    }
  }, [data, loading, dispatch]);

  function filteredProducts() {
    console.log(state)
    return state.products
  }




  const [isAddModalOpen, setIsAddModalOpen] = useState(false);

  const openAddModal = () => {
    setIsAddModalOpen(true);
  };

  const closeAddModal = () => {
    setIsAddModalOpen(false);
  };

  const refreshPage = () => {
    window.location.reload();
  }


  return (
    <div className="my-2">
      {isAdmin ? (
        <>
          <button onClick={openAddModal} style={{
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
        }}>Add Product</button>
          {isAddModalOpen && (
            <AddProduct
              closeEditModal={closeAddModal}
              refreshPage={refreshPage}
            />
          )}
        </>
      ) : (
        null
      )}
      {state.products.length ? (
        <Row className="flex-row">
        {filteredProducts().map((product) => (
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
      ) : (
        <h3>No products found!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default ProductList;
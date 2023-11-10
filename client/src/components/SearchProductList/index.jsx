import { useState, useEffect } from 'react';
import ProductItem from '../ProductItem';
import { useStoreContext } from '../../utils/GlobalState';
import { UPDATE_PRODUCTS } from '../../utils/actions';
import { useQuery } from '@apollo/client';
import { QUERY_SEARCH_PRODUCTS} from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import spinner from '../../assets/spinner.gif';
import AuthService from '../../utils/auth';
import AddProduct from '../AddProduct/index'
import { useParams } from 'react-router-dom';


const isAdmin = AuthService.checkAdmin();


function SearchProductList({searchQuery}) {
  const [state, dispatch] = useStoreContext();


  console.log(searchQuery)
  const { loading, data } = useQuery(QUERY_SEARCH_PRODUCTS, {
    variables: { searchQuery: searchQuery || null},
  });


  useEffect(() => {

    if (data) {
      dispatch({
        type: UPDATE_PRODUCTS,
        products: data.searchProducts,
      });
      data.searchProducts.forEach((product) => {
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
          <button onClick={openAddModal}>Add Product</button>
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
        <div className="flex-row">
          <div className="flex-row">
            {filteredProducts().map((product) => (
              <ProductItem
                key={product._id}
                _id={product._id}
                image={product.image}
                name={product.name}
                author={product.author}
                price={product.price}
                quantity={product.quantity}
              />
            ))}
          </div>
        </div>
      ) : (
        <h3>You haven't added any products yet!</h3>
      )}
      {loading ? <img src={spinner} alt="loading" /> : null}
    </div>
  );
}

export default SearchProductList;
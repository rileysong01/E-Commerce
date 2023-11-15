import { Link } from "react-router-dom";
import { pluralize } from "../../utils/helpers"
import { useStoreContext } from "../../utils/GlobalState";
import { ADD_TO_CART, UPDATE_CART_QUANTITY } from "../../utils/actions";
import { idbPromise } from "../../utils/helpers";


function ProductItem(item) {
  const [state, dispatch] = useStoreContext();

  const {
    image,
    name,
    _id,
    price,
    quantity,
    author
  } = item;

  const { cart } = state


  const addToCart = () => {
    const itemInCart = cart.find((cartItem) => cartItem._id === _id)
    if (itemInCart) {
      dispatch({
        type: UPDATE_CART_QUANTITY,
        _id: _id,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
      idbPromise('cart', 'put', {
        ...itemInCart,
        purchaseQuantity: parseInt(itemInCart.purchaseQuantity) + 1
      });
    } else {
      dispatch({
        type: ADD_TO_CART,
        product: { ...item, purchaseQuantity: 1 }
      });
      idbPromise('cart', 'put', { ...item, purchaseQuantity: 1 });
    }
  }

  return (
    <div className="card px-1 py-1" style={{ textAlign: 'center', marginTop: '10px' }}>
      <Link to={`/products/${_id}`} style={{ textDecoration: 'none', color: 'black' }}>
        <div style={{ position: 'relative', width: '100%', paddingTop: '150%' }}>
          <img
            className="product-image"
            alt={name}
            src={`${image}`}
            style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
          />
        </div>
        <p style={{
          marginTop: '10px',
          marginBottom: '0px',
          fontSize: '18px',
          height: '40px',
          overflow: 'hidden',
          textOverflow: 'ellipsis',
          display: '-webkit-box',
          WebkitLineClamp: 2,
          WebkitBoxOrient: 'vertical',
          whiteSpace: 'normal',
          lineHeight: '19px'
        }}>
          {name}
        </p>
      </Link>
      <div>
        <p style={{ fontSize: '17px', marginBottom: '10px' }}>${price}</p>
      </div>
      <button
        onClick={addToCart}
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
        }}
      >
        Add to Cart
      </button>

    </div>
  );
}

export default ProductItem;
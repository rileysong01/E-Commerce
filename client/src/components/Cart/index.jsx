import { useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { useLazyQuery } from '@apollo/client';
import { QUERY_CHECKOUT } from '../../utils/queries';
import { idbPromise } from '../../utils/helpers';
import CartItem from '../CartItem';
import Auth from '../../utils/auth';
import { useStoreContext } from '../../utils/GlobalState';
import { TOGGLE_CART, ADD_MULTIPLE_TO_CART } from '../../utils/actions';
import './style.css';


const stripePromise = loadStripe('pk_test_TYooMQauvdEDq54NiTphI7jx');

const Cart = () => {
  const [state, dispatch] = useStoreContext();
  const [getCheckout, { data }] = useLazyQuery(QUERY_CHECKOUT);

  useEffect(() => {
    if (data) {
      stripePromise.then((res) => {
        res.redirectToCheckout({ sessionId: data.checkout.session });
      });
    }
  }, [data]);


  useEffect(() => {
    async function getCart() {
      const cart = await idbPromise('cart', 'get');
      dispatch({ type: ADD_MULTIPLE_TO_CART, products: [...cart] });
    }

    if (!state.cart.length) {
      getCart();
    }
  }, [state.cart.length, dispatch]);

  function toggleCart() {
    dispatch({ type: TOGGLE_CART });
  }

  function calculateTotal() {
    let sum = 0;
    state.cart.forEach((item) => {
      sum += item.price * item.purchaseQuantity;
    });
    return sum.toFixed(2);
  }

  function submitCheckout() {
    console.log('button pressed')
    console.log(state.cart)
    let newCart = state.cart.map((item) => {
      let x = {
        _id: item._id,
        purchaseQuantity: item.purchaseQuantity,
        name: item.name,
        image: item.image,
        price: item.price,
        quantity: item.quantity,
        author: item.author

      }
      return x;
    })
    getCheckout({
      variables: {
        products: newCart,
      },
    });
  }

  if (!state.cartOpen) {
    return (
      <div className="cart-closed" onClick={toggleCart}>
        <i className="fas fa-shopping-cart" aria-hidden="true"></i>
      </div>
    );
  }

  return (
    <div className="cart">
      <button className="close" onClick={toggleCart} style={{ fontSize: '30px' }}>
        <i className="fas fa-times"></i>
      </button>
      <h2>Shopping Cart</h2>
      <hr
        style={{
          border: 'none',
          borderBottom: '2px solid #000',
          bottom: '0',
          width: '100%',
          margin: 0
        }}
      />
      {state.cart.length ? (
        <div style={{ textAlign: 'left' }}>
          {state.cart.map((item) => (
            <CartItem key={item._id} item={item} />
          ))}

          <div className="d-flex justify-content-between">
            <strong>Total: ${calculateTotal()}</strong>

            {Auth.loggedIn() ? (
              <button onClick={submitCheckout}
              style={{
                border: '2px solid #cdb4db',
                borderRadius: '5px',
 
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
              }}>Checkout</button>
            ) : (
              <span>(log in to check out)</span>
            )}
          </div>
        </div>
      ) : (
        <h3>
          You haven't added anything to your cart yet!
        </h3>
      )}
    </div>
  );
};

export default Cart;

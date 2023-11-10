import React, { useEffect } from 'react';
import { useMutation } from '@apollo/client';
import { ADD_ORDER } from '../utils/mutations';
import Jumbotron from '../components/Jumbotron';

function Success() {
  const [addOrder, { data, loading, error }] = useMutation(ADD_ORDER);

  useEffect(() => {
    const makePurchase = async () => {
      const params = new URLSearchParams(window.location.search);
      const orderItemsParam = params.get('orderItems');
      const orderItems = JSON.parse(decodeURIComponent(orderItemsParam));
      console.log(orderItems);

      try {
        const result = await addOrder({
          variables: {
            orderItems: orderItems,
          },
        });

        const orderId = result?.data?.addOrder._id;
        console.log('Order ID:', orderId);
        window.location.href = `/orderconfirmation/${orderId}`;

      } catch (error) {
        console.error('Error adding order:', error);
      }
    };

    makePurchase();
  }, [addOrder]);

  return (
    <div>
      <Jumbotron>
        <h1>Redirecting (do not refresh)</h1>
      </Jumbotron>
    </div>
  );
}

export default Success;

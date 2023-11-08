import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { useMutation } from '@apollo/client';
import { gql } from '@apollo/client';
import React, { useState } from 'react';
import Table from 'react-bootstrap/Table';
import { QUERY_ORDERS } from '../utils/queries';
import { UPDATE_ORDER_COMPLETED, UPDATE_ORDER_SHIPPED } from '../utils/mutations';


const initialFilters = {
  filterOption: 'none',
};

function ViewOrders() {
  const [filters, setFilters] = useState(initialFilters);
  const { loading, error, data } = useQuery(QUERY_ORDERS, {
    variables: { shipped: filters.filterOption === 'shipped', completed: filters.filterOption === 'completed' },
  });

  const [updateOrderShipped] = useMutation(UPDATE_ORDER_SHIPPED);
  const [updateOrderCompleted] = useMutation(UPDATE_ORDER_COMPLETED);

  const orders = data ? data.viewOrders : []; 

  function calculateTotal(products) {
    return products.reduce((total, product) => total + product.price, 0);
  }

  const handleFilterChange = (event) => {
    const { value } = event.target;
    setFilters({
      ...filters,
      filterOption: value,
    });
  };


  const handleShippedToggle = (orderId, newShippedValue) => {
    updateOrderShipped({
      variables: { id: orderId, shipped: newShippedValue },
      refetchQueries: [{ query: QUERY_ORDERS }],
    });
  };

  const handleCompletedToggle = (orderId, newCompletedValue) => {
    console.log(newCompletedValue)
    updateOrderCompleted({
      variables: { id: orderId, completed: newCompletedValue },
      refetchQueries: [{ query: QUERY_ORDERS }],
    });
  };
  if (loading) return <p>Loading...</p>;
  if (error) return <p>Error: {error.message}</p>;
  return (
    <div>
      <h1>Order History</h1>
      <div>
        <label>
          <input
            type="radio"
            name="filterOption"
            value="none"
            checked={filters.filterOption === 'none'}
            onChange={handleFilterChange}
          />
          Show All
        </label>
        <label>
          <input
            type="radio"
            name="filterOption"
            value="shipped"
            checked={filters.filterOption === 'shipped'}
            onChange={handleFilterChange}
          />
          Show Shipped
        </label>
        <label>
          <input
            type="radio"
            name="filterOption"
            value="completed"
            checked={filters.filterOption === 'completed'}
            onChange={handleFilterChange}
          />
          Show Completed
        </label>
      </div>

      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Order ID</th>
            <th>Purchase Date</th>
            <th>Products</th>
            <th>Total</th>
            <th>Shipped</th>
            <th>Completed</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order._id}>
              <td>{order._id}</td>
              <td>{new Date(parseInt(order.purchaseDate)).toLocaleDateString()}</td>
              <td>
                <ul>
                  {order.products.map((product) => (
                    <li key={product._id}>
                      {product.name}: ${product.price}
                    </li>
                  ))}
                </ul>
              </td>
              <td>${calculateTotal(order.products)}</td>
              <td>
                <label className="switch">
                  <input type="checkbox" checked={order.shipped}  onChange={() => handleShippedToggle(order._id, !order.shipped)} />
                </label>
              </td>
              <td>
                <label className="switch">
                  <input type="checkbox" checked={order.completed}  onChange={() => handleCompletedToggle(order._id, !order.completed)} />
                </label>
              </td>
              <td></td>
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
}

export default ViewOrders;
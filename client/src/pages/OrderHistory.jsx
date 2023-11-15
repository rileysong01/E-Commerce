import { Link } from 'react-router-dom';
import { useQuery } from '@apollo/client';
import { QUERY_USER } from '../utils/queries';
import { Container, Card, Row, Col } from 'react-bootstrap';

function OrderHistory() {
  const { data } = useQuery(QUERY_USER);
  let user;

  function calculateTotal(products) {
    return products.reduce((total, product) => total + product.price, 0);
  }

  function getStatus(order) {
    if (!order.shipped && !order.completed) {
      return 'Processing';
    } else if (order.shipped && !order.completed) {
      return 'Shipped';
    } else if (order.completed) {
      return 'Completed';
    } else {
      return '';
    }
  }

  if (data) {
    user = data.user;
    console.log(user);
  }

  return (
    <Container className="my-1">
      <Link to="/">
        <button style={{ fontSize: '130%' }}> <i className="fas fa-chevron-left"></i> Back to products </button>
      </Link>

      {user ? (
        <>
          <h2>All Orders {user.firstName} for {user.lastName}</h2>
          {user.orders.map((order) => (
            <div key={order._id} className="my-2">
              <h3>{new Date(parseInt(order.purchaseDate)).toLocaleDateString()}</h3>
              <Row className="flex-row">
                {order.products.map(({ _id, image, name, price }, index) => (
                  <Col key={index} xs={12} md={4} lg={3} className="mb-3">
                    <Card>
                      <Link to={`/products/${_id}`}>
                        <Card.Img variant="top" src={image} alt={name} />
                        <Card.Body>
                          <Card.Title>{name}</Card.Title>
                          <Card.Text>${price}</Card.Text>
                        </Card.Body>
                      </Link>
                    </Card>
                    Order ID: {order._id}
                    ${calculateTotal(order.products)}
                    Status: {getStatus(order)}
                  </Col>
                ))}
              </Row>
            </div>
          ))}
        </>
      ) : null}
    </Container>
  );
}

export default OrderHistory;

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
          <h2 style={{ marginBottom: '3%', marginTop: '3%' }}>All Orders for {user.firstName}  {user.lastName}</h2>
          {user.orders.map((order) => (
            <Row className="order-row my-2" key={order._id} style={{ border: '1px solid black', borderRadius: '5px', padding: '10px' }}>
              {/* Products in a 9-column grid */}
              <Col xs={12} lg={9} className="order-products">
                <div className="product-list d-flex flex-row flex-nowrap overflow-auto">
                  {order.products.map(({ _id, image, name, price }, index) => (
                    <Link key={index} to={`/products/${_id}`}>
                      <Card className="mb-3" style={{ width: '10rem' }}>
                        <Card.Img variant="top" src={image} alt={name} />
                        <Card.Body>
                          <Card.Title style={{ fontSize: '1rem' }}>{name}</Card.Title>
                          <Card.Text style={{ fontSize: '0.8rem' }}>${price}</Card.Text>
                        </Card.Body>
                      </Card>
                    </Link>
                  ))}
                </div>
              </Col>
              <Col xs={12} lg={3} className="order-info">
                <p>{new Date(parseInt(order.purchaseDate)).toLocaleDateString()}</p>
                <p style={{ fontSize: '0.8rem', color: '#777', margin: '0' }}>Order ID:</p>
                <p style={{ fontSize: '0.9rem', margin: '0' }}> {order._id}</p>
                <p style={{ fontSize: '0.8rem', color: '#777', margin: '0' }}>Total:</p>
                <p style={{ fontSize: '0.9rem', margin: '0' }}>${calculateTotal(order.products)}</p>
                <p style={{ fontSize: '0.8rem', color: '#777', margin: '0' }}>Status:</p>
                <p style={{ fontSize: '0.9rem', margin: '0' }}>{getStatus(order)}</p>

              </Col>
            </Row>

          ))}
        </>
      ) : null}
    </Container>
  );
}

export default OrderHistory;

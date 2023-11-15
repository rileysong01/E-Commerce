import Auth from "../../utils/auth";
import { Link } from "react-router-dom";
import AuthService from '../../utils/auth';
import { Navbar, Nav } from 'react-bootstrap';
import Cart from "../Cart";

const isAdmin = AuthService.checkAdmin();

function MyNav() {
  function showNavigation() {
    if (Auth.loggedIn()) {
      return (
        <Nav className="ml-auto align-items-center">
          <Nav.Item className="mx-1">
            {isAdmin ? (
              <Link to="/viewOrders" className="nav-link">
                View Orders
              </Link>
            ) : (
              <Link to="/orderHistory" className="nav-link">
                Order History
              </Link>
            )}
          </Nav.Item>
          <Nav.Item className="mx-1">
            <a href="/" onClick={() => Auth.logout()} className="nav-link">
              Logout
            </a>
          </Nav.Item>
          <Nav.Item className="mx-1">
            <Link to="/contact" className="nav-link">
              Contact Us
            </Link>
          </Nav.Item>

        </Nav>
      );
    } else {
      return (
        <Nav className="ml-auto align-items-center">
          <Nav.Item className="mx-1">
            <Link to="/signup" className="nav-link">
              Signup
            </Link>
          </Nav.Item>
          <Nav.Item className="mx-1">
            <Link to="/login" className="nav-link">
              Login
            </Link>
          </Nav.Item>
          <Nav.Item className="mx-1">
            <Link to="/contact" className="nav-link">
              Contact Us
            </Link>
          </Nav.Item>
        </Nav>
      );
    }
  }

  return (
    <div style={{ textAlign: 'center', paddingTop: '10px' }}>
      <Navbar style={{ backgroundColor: '#ffc8dd', fontFamily: "'M PLUS Rounded 1c', sans-serif" }} expand="lg">
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          {showNavigation()}
        </Navbar.Collapse>
        {isAdmin ? null : <Cart />}
      </Navbar>
  
      <Link to="/" className="nav-link" style={{ fontSize: '24px', display: 'inline-block', margin: '10px' }}>
        <i className="fas fa-book" aria-hidden="true"></i> Curious Cats Book Nook
      </Link>
    </div>
  );
  
}

export default MyNav;

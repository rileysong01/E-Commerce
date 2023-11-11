import ReactDOM from 'react-dom/client'
import './index.css'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

import App from './App.jsx';
import Home from './pages/Home';
import Detail from './pages/Detail';
import NoMatch from './pages/NoMatch';
import Login from './pages/Login';
import Signup from './pages/Signup';
import Success from './pages/Success';
import OrderHistory from './pages/OrderHistory';
import Contact from './pages/Contact';
import Sales from './pages/Sales';
import Cart from './pages/Cart';
import ViewOrders from './pages/ViewOrders';
import Search from './pages/Search';
import OrderConfirmation from './pages/OrderConfirmation';

import 'bootstrap/dist/css/bootstrap.min.css';
import 'jquery';
import '@fortawesome/fontawesome-free/css/all.min.css';



const router = createBrowserRouter([
  {
    path: '/',
    element: <App />,
    error: <NoMatch />,
    children: [
      {
        index: true, 
        element: <Home />
      }, {
        path: '/login',
        element: <Login />
      }, {
        path: '/signup',
        element: <Signup />
      }, {
        path: '/success',
        element: <Success />
      }, {
        path: '/orderHistory',
        element: <OrderHistory />
      },
      {
        path: '/viewOrders',
        element: <ViewOrders/>
      }, {
        path: '/products/:id',
        element: <Detail />
      }, {
        path: '/contact',
        element: <Contact />
      }, {
        path: '/sales',
        element: <Sales />
      }, {
        path: '/cart/:id',
        element: <Cart />
      }
      , {
        path: '/search/:query',
        element: <Search />
      }
      , {
        path: '/orderconfirmation/:orderID',
        element: <OrderConfirmation />
      }
    ]
  }
]);

ReactDOM.createRoot(document.getElementById('root')).render(
  <RouterProvider router={router} />
)

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root';
import ItemRoot from './routes/item';
import './index.css';

const router = createBrowserRouter([
  {
    path: "/",
    element: <Root />
  },
  {
    path: "/category/:id",
    element: <Root />
  },
  {
    path: "/item/:id",
    element: <ItemRoot />
  },
  {
    path: "/cart",
    element: <div>Cart</div>
  },
  {
    path: "/checkout",
    element: <div>checkout</div>
  },

])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <RouterProvider router={router} />
  </React.StrictMode>

);

import React from 'react'
import ReactDOM from 'react-dom/client'
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Root from './routes/root';
import ItemRoot from './routes/item';
import CartRoot from './routes/cart';
import './index.css';
import { CartContextProvider } from './components/context/CartContext';

import { initializeApp } from "firebase/app";
// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.APIKEY,
  authDomain: import.meta.env.AUTHDOMAIN,
  projectId: "tedlead-pizzas",
  storageBucket: import.meta.env.STORAGEBUCKET,
  messagingSenderId: import.meta.env.MESSAGINGSENDERID,
  appId: import.meta.env.APPID
};
// Initialize Firebase
const app = initializeApp(firebaseConfig);


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
    element: <CartRoot />
  },
  {
    path: "/checkout",
    element: <div>checkout</div>
  },
])


ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <CartContextProvider>
      <RouterProvider router={router} />
    </CartContextProvider>
  </React.StrictMode>
);

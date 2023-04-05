import NavBar from "../components/NavBar";
import Cart from "../components/Cart/cart";
import 'bootstrap/dist/css/bootstrap.css';

function CartRoot() {

  return (
      <div>
        <NavBar />
        <Cart />
      </div>
    );
} 

export default CartRoot;
import 'bootstrap/dist/css/bootstrap.css';
import './ItemDetail.css';
import { NavLink } from 'react-router-dom';
import { useCartContext } from '../context/CartContext';
import { useState } from 'react';


function ItemDetail({ product }) {

    const {cart, addItem, removeItem, isInCart} = useCartContext()

    const [quantity, setQuantity] = useState(0)
    const addQuantity = () => setQuantity((prevQuantity)=>prevQuantity+1)
    const subtractQuantity = () => setQuantity((prevQuantity)=> prevQuantity>0 ? prevQuantity-1 : prevQuantity)

    const objectInCart = cart.find((obj) => obj.id === product.id)

    return (
        <div>
            <NavLink to={"/"}>
                <div className="btn btn-secondary">Return</div>
            </NavLink>

            <div className="card mb-3 ItemDetail">
                <div className="row">
                    <div className="col-md-4">
                        <img className="card-img" src={product.image} />
                    </div>
                    <div className="col-md-8">
                        <div className="card-body">
                            <h5 className="card-title">{product.name}</h5>
                            <p className="card-text">{product.description}</p>
                            <h5 className="card-title">${product.unitPrice}</h5>
                            <div className="btn-group btn-group-toggle" data-toggle="buttons">
                                <button className="btn btn-secondary" onClick={subtractQuantity}><strong>-</strong></button>
                                <span className="addQuantity">{quantity}</span>
                                <button className="btn btn-secondary" onClick={addQuantity}><strong>+</strong></button>
                            </div>
                            <div>
                                <button className="btn btn-primary" onClick={() => addItem( product, quantity)} disabled = {quantity === 0 ? true : false}>Add to cart</button>
                            </div>
                            
                            {isInCart(product) ? <div>
                                    <div>You have {objectInCart.quantity} of these in your cart</div>
                                    <div><button className="btn btn-danger" onClick={() => removeItem(product)} >Remove from cart</button></div>
                                </div>
                                : 
                                <div></div> 
                            }
                            
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ItemDetail
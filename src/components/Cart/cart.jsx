import 'bootstrap/dist/css/bootstrap.css';
import '@fortawesome/fontawesome-svg-core/styles.css'
import './cart.css';
import { useCartContext } from '../context/CartContext';
import { NavLink } from 'react-router-dom';
import { collection, getFirestore, addDoc, doc, updateDoc, Timestamp } from 'firebase/firestore';
import Swal from 'sweetalert2';

function Cart() {

    const {cart, clearCart, sureClearCart, removeItem} = useCartContext()

    const total = cart.reduce((accum, current) => accum + current.quantity*current.unitPrice, 0);
    
    let shipping = 10;
    cart.length === 0 ? shipping = 0 : shipping = 10;
    
    const db = getFirestore()
    
    function updateOrder(productId, finalStock) {
        const itemRef = doc(db, "items", productId);
        updateDoc(itemRef, { stock: finalStock })

    }


    function sendOrder() {
        

        const order = {
            buyer: {
                name: document.getElementById("name").value,
                email: document.getElementById("phone").value,
                phone: document.getElementById("address").value,
            },
            items:{
                cart
            },
            total,
            timestamp: Date(Date.now()).toString()

            
        }

        const collectionRef = collection(db, "orders")

        addDoc(collectionRef, order)
            .then((response) => {
                const orderId = response.id
                cart.map((elem)=>{
                    const finalStock = elem.stock - elem.quantity
                    updateOrder(elem.id, finalStock)
                })
                Swal.fire({
                    icon: 'success',
                    title: `Your order has been placed successfully!`,
                    text: `An email has been sent to your address with all the details of your purchase. Order ID: ${orderId}`,
                    showConfirmButton: true,
                    confirmButtonColor: 'var(--verde)'
            })
            })
            .then(clearCart)

            .catch( (err) => console.log({err}))

        }

    return (
        <div className="container mt-5 p-3 rounded cart">
            <div className="row no-gutters">
                <div className="col-md-8">
                    <div className = "cartContainer product-details mr-2">
                        <div className="d-flex flex-row align-items-center"><NavLink to={"/"}><span className="ml-2">← Continue shopping</span></NavLink></div>
                        <hr/>
                        <h6 className="mb-0">Shopping cart</h6>
                        
                        {cart.length <= 0 ? (
                            <div className="d-flex justify-content-between"><span>Your cart is empty</span></div>
                        ) : (
                            <>
                            <div className="d-flex justify-content-between"><span>You have {cart.length} item{cart.length===1 ? "" : "s"} in your cart</span></div>
                            {cart.map((elem) => (
                                <div key={elem.id} className="d-flex justify-content-between align-items-center mt-3 p-2 items rounded">
                                    <div className="d-flex flex-row">
                                        <NavLink to={"/item/"+elem.id}><img className="rounded" src={elem.image} /></NavLink>
                                        <div className="ml-2 item_name">
                                            <span className="font-weight-bold d-block">{elem.name}</span>
                                            <span className="spec">{elem.description}</span>
                                        </div>
                                    </div>
                                        <div className="d-flex flex-row align-items-center">
                                            <span className="d-block">{elem.quantity}</span>
                                            <span className="d-block ml-5 font-weight-bold">${elem.quantity * elem.unitPrice}</span>
                                            <i className="fa fa-trash-o ml-3 text-black-50" onClick={()=>removeItem(elem)}></i>
                                        </div>
                                </div>
                            ))}
                            <button className="btn btn-danger clearCart" onClick={sureClearCart}>Empty cart</button>
                            </>
                            )}
                    </div>
                </div> 
                        
                <div className="col-md-4">
                    <div className="order-info">
                        <div className="d-flex justify-content-between align-items-center">
                            <span>Order details</span>
                        </div>
                        <div>
                            <label className="credit-card-label">Name</label>
                            <input type="text" className="form-control credit-inputs" id="name" placeholder="Name" required />
                        </div>
                        <div>
                            <label className="credit-card-label">Phone number</label>
                            <input type="tel" className="form-control credit-inputs" id="phone" placeholder="Phone number" required/>
                        </div>
                        <div>
                            <label className="credit-card-label">Address</label>
                            <input type="tel" className="form-control credit-inputs" id="address" placeholder="Address" required/>
                        </div>
                    </div>
                    
                    <div className="payment-info">
                        
                        <div className="d-flex justify-content-between align-items-center">
                            <span>Card details</span>
                        </div>
                        
                        <span className="type d-block mt-3 mb-1">Card type</span>
                        
                        <label htmlFor="mastercard" className="radio">
                            <input type="radio" name="card" id="mastercard" value="mastercard" />
                            <span><img className="card_image" src="https://img.icons8.com/color/48/000000/mastercard.png"/></span>
                        </label>
                        
                        <label htmlFor="visa" className="radio"> 
                            <input type="radio" name="card" id="visa" value="visa" /> 
                            <span><img className="card_image" src="https://img.icons8.com/officel/48/000000/visa.png"/></span>
                        </label>

                        <label htmlFor="amex" className="radio">
                            <input type="radio" name="card" id="amex" value="amex" />
                            <span><img className="card_image" src="https://img.icons8.com/ultraviolet/48/000000/amex.png"/></span>
                        </label>

                        <label htmlFor="paypal" className="radio">
                            <input type="radio" name="card" id="paypal" value="paypal" />
                            <span><img className="card_image" src="https://img.icons8.com/officel/48/000000/paypal.png"/></span>
                        </label>
                        

                        <div>
                            <label className="credit-card-label">Name on card</label>
                            <input type="text" className="form-control credit-inputs" placeholder="Name" />
                        </div>
                        <div>
                            <label className="credit-card-label">Card number</label>
                            <input type="text" className="form-control credit-inputs" placeholder="0000 0000 0000 0000" />
                        </div>
                        <div className="row">
                            <div className="col-md-6">
                                <label className="credit-card-label">Date</label>
                                <input type="text" className="form-control credit-inputs" placeholder="12/24" />
                            </div>
                            <div className="col-md-6">
                                <label className="credit-card-label">CVV</label>
                                <input type="text" className="form-control credit-inputs" placeholder="342" />
                            </div>
                        </div>

                        <hr className="line"/>

                        <div className="d-flex justify-content-between information">
                            <span>Subtotal</span>
                            <span>${total}</span>
                        </div>
                        <div className="d-flex justify-content-between information">
                            <span>Shipping</span>
                            <span>${shipping}</span>
                        </div>
                        <div className="d-flex justify-content-between information">
                            <span>Total(Incl. taxes)</span>
                            <span>${total+shipping}</span>
                        </div>

                        <button type="button" onClick={sendOrder} className="btn btn-primary btn-block d-flex justify-content-between mt-3" disabled = {cart.length === 0 ? true : false}>
                            <span>${total+shipping}</span>
                            <span>Checkout<i className="fa fa-long-arrow-right ml-1"></i></span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Cart
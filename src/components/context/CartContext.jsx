import { createContext, useContext, useState } from "react";
import Swal from "sweetalert2";

const CartContext = createContext()

export function useCartContext () {
    return useContext(CartContext)
}

export const CartContextProvider = ( {children} ) => {
    
    const [cart, setCart] = useState([])

    const addItem = (product, quantity) => {
        const itemExists = isInCart(product)
        
        if (itemExists) {
            const prodToEdit = cart.find((item)=>item.id === product.id);
            const prodModified = {
                ...prodToEdit,
                quantity: prodToEdit.quantity + quantity,
            }
            setCart((prevState) => prevState.map((elem) => elem.id === product.id ? prodModified : elem ));  
        } else {
            setCart((prevState) => prevState.concat({...product, quantity}));  
        }

        Swal.fire({
        position: 'top-start',
        icon: 'success',
        title: `${quantity} ${product.name} pizza${quantity>1 ? "s" : ""} ${quantity>1 ? "have" : "has"} been added to your cart!`,
        showConfirmButton: false,
        timer: 1500
        })
    }
    const isInCart = (product) => {
        return cart.some((item) => item.id === product.id)
    }

    const removeItem = (product) => {
        const removed = cart.filter((obj)=>obj.id !== product.id)

        Swal.fire({
            title: 'Are you sure you want to remove this item from your cart?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            confirmButtonColor: 'var(--verde)'
            }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire({
                    position: 'top-start',
                    icon: 'success',
                    title: `This item has been removed from your cart!`,
                    showConfirmButton: false,
                    timer: 1500
                });
                return setCart(removed)
            }
            })

    }

    const sureClearCart = () => {
        Swal.fire({
            title: 'Are you sure you want to empty your cart?',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            confirmButtonColor: 'var(--verde)'
          }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Done!', '', 'success');
                return clearCart()
            }
          })
    }

    const clearCart = () => {
        return setCart([])
    }

    return (
        <CartContext.Provider value={{cart, addItem, isInCart, removeItem, clearCart, sureClearCart}}>
                {children}
        </CartContext.Provider>
    )
} 


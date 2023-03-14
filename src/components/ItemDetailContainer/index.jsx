import { useState, useEffect } from "react";
import Products from "../mocks/products";
import ItemDetail from "../ItemDetail";
import './ItemDetailContainer.css';

function ItemDetailContainer({itemId}) {

    const [products, setProducts] = useState([]);

    useEffect(()=>{
        const productsPromise = new Promise ((resolve, reject) => {
            setTimeout(() => {
                resolve(Products)
            },2000)
    })
        productsPromise
            .then((response) => {
                const itemSelected = response.find(element => element.id == itemId);
                setProducts(itemSelected)

            })
            .catch((err)=>console.log(err))
    },[])

    return <div className="ItemDetailContainer">
        <ItemDetail products={products}/>
        
    </div>
}

export default ItemDetailContainer
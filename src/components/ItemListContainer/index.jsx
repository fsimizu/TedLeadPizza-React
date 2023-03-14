import ItemList from "../ItemList";
import { useState, useEffect } from "react";
import Products from "../mocks/products"
import { NavLink } from "react-router-dom";

function ItemListContainer({isCategoryRoute, categoryId}) {

    const [products, setProducts] = useState([]);

    useEffect(()=>{
        const productsPromise = new Promise ((resolve, reject) => {
            setTimeout(() => {
                resolve(Products)
            },2000)
    })

        productsPromise
            .then((response) => {
                if (isCategoryRoute) {                
                    const productsFiltered = response.filter((prod)=> prod.category === categoryId)
                    setProducts(productsFiltered)
                } else {
                    setProducts(response)
                }
            })
            
            .catch((err)=>console.log(err))
    
    },[categoryId])

    return ( 
        <div style= {{margin: 20 + 'px'}}>
            
            <label for="category">Select a category</label>
            {/* <select name="category" id="category">
                <option hidden disabled selected value></option>
                <option value="red"><NavLink to={"/category/red"}>Red base</NavLink></option>
                <option value="white"><NavLink to={"/category/white"}>White base</NavLink></option>
            </select> */}

            <ul>
                <li>
                    <NavLink to={"/"}>All</NavLink>
                </li>
                <li>
                    <NavLink to={"/category/red"}>Red base</NavLink>
                </li>
                <li>
                    <NavLink to={"/category/white"}>White base</NavLink>
                </li>
            </ul>
            
            
            <ItemList products={products} />
        </div>
)}

export default ItemListContainer
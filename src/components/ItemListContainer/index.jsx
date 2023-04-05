import ItemList from "../ItemList";
import { useState, useEffect } from "react";
import {collection, getFirestore, getDocs, query, where} from "firebase/firestore"

function ItemListContainer({isCategoryRoute, categoryId}) {
    const [product, setProducts] = useState([]);

    useEffect(()=>{
        const db = getFirestore()
        const itemsCollection = collection(db, 'items')

        if (isCategoryRoute) {                
            const queryResult = query (itemsCollection, where ('category', "==", categoryId))
            
            getDocs(queryResult)
            .then((snapshot)=>{
                const docs = snapshot.docs;
                setProducts(docs.map((doc)=>({id: doc.id, ...doc.data()})
                ))
            })
            .catch((err)=>console.log(err))

        } else {
            getDocs(itemsCollection)
            .then((snapshot)=>{
                const docs = snapshot.docs;
                setProducts(docs.map((doc)=>({id: doc.id, ...doc.data()})
                ))
            })
            .catch((err)=>console.log(err))
        }
    },[categoryId])

    if(!product) {
        return <div>
            Loading...
            </div>
    }

    return ( 
        <div style= {{margin: 20 + 'px'}}>           
            <ItemList product={product} />
        </div>
)}

export default ItemListContainer
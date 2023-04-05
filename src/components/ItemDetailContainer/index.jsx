import { useState, useEffect } from "react";
import ItemDetail from "../ItemDetail";
import './ItemDetailContainer.css';
import {doc, getDoc, getFirestore} from "firebase/firestore"
import { useParams } from "react-router-dom";


function ItemDetailContainer({itemId}) {

    const [product, setProduct] = useState(null)
    const params = useParams()

    useEffect(()=>{
        const db = getFirestore()
        const itemRef = doc(db, 'items', params.id);

        getDoc(itemRef)
            .then((snapshot)=>{
                if(snapshot.exists()) {
                    setProduct({id: snapshot.id, ...snapshot.data()})
                    
                }
            })
            .catch((err)=>console.log(err))
    },[])

    if (!product) {
        return <p>Loading...</p>
    }

    return (
        <div className="ItemDetailContainer">
            <ItemDetail product = {product}/>
        </div>
    )
}

export default ItemDetailContainer
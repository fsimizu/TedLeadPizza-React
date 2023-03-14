import Items from "../Items";
import './ItemList.css';

function ItemList({ products }) {

    return <div>
       
        <ul className="itemList">
            {products.map((products, index) => (
                <Items products={products} key={products.id} />
    
                ))}
        </ul>
        
    </div>
}

export default ItemList
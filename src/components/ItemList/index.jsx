import Items from "../Items";
import './ItemList.css';

function ItemList({ product }) {

    return <div>
       
        <ul className="itemList">
            {product.map((product, index) => (
                <Items product={product} key={product.id} />
                ))}
        </ul>
        
    </div>
}

export default ItemList
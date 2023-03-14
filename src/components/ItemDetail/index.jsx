import 'bootstrap/dist/css/bootstrap.css';
import './ItemDetail.css';
import { NavLink } from 'react-router-dom';

function ItemDetail({ products }) {

    return (
        <div className="card ItemDetail">
            <img className="card-img-top" src={products.image} />
            <div className="card-body">
                <h5 className="card-title">{products.name}</h5>
                <p className="card-text">{products.description}</p>
                <NavLink to={"/"}><a href="#" className="btn btn-primary">Return</a></NavLink>
            </div>
        </div>
    )
}

export default ItemDetail
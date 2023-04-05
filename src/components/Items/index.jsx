import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';


function Items({product}) {

    return (
        <div className="card" style= {{width: 18 + 'rem'}}>
            <NavLink to={"/item/"+product.id}>
                <img className="card-img-top" src={product.image} />
            </NavLink>
            <div className="card-body">
                <h5 className="card-title">{product.name}</h5>
                <p className="card-text">{product.description}</p>
                <NavLink to={"/item/"+product.id}>
                    <div className="btn btn-primary">More details</div>
                </NavLink>
            </div>
        </div>
    );
}

export default Items;
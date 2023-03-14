import 'bootstrap/dist/css/bootstrap.css';
import { NavLink } from 'react-router-dom';

function Items({products}) {

    return (
        <div className="card" style= {{width: 18 + 'rem'}}>
            <img className="card-img-top" src={products.image} />
            <div className="card-body">
                <h5 className="card-title">{products.name}</h5>
                <p className="card-text">{products.description}</p>
                <NavLink to={"/item/"+products.id}> <a href="#" className="btn btn-primary">More details</a></NavLink>
            </div>
        </div>
    );
}

export default Items;
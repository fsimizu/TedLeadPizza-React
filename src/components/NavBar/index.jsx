import logo from "../../images/TedLead-logo3.png";
import 'bootstrap/dist/css/bootstrap.css';
import './NavBar.css';
import CartWidget from '../CartWidget';
import { NavLink } from "react-router-dom";
import React from "react";

function NavBar() {
    return (
        <nav className="navbar navbar-expand-lg">
            <div className="container-fluid header">
                <Logo />
                <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                    <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarNav">
                    <ul className="navbar-nav">
                        <Categories />
                        <CartWidget />
                    </ul>
                </div>
            </div>
        </nav>
)}

function Logo () {
       return (
            <div>
                <NavLink to={"/"}>
                    <div className="navbar-brand">
                        <img  src={logo} alt="logo" className="header__logo-img"/>
                    </div>
                </NavLink>
            </div>
       )
}

function Categories() {
return (
    <li className="nav-item header__item">
        <div className="dropdown show nav-link">
            <a className="dropdown-toggle" href="#" role="button" id="dropdownMenuLink" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                Menu
            </a>
            <div className="dropdown-menu" aria-labelledby="dropdownMenuLink">
                <NavLink to={"/"}><div className="dropdown-item" href="#">All</div></NavLink>
                <NavLink to={"/category/red"}><div className="dropdown-item" href="#">Red base</div></NavLink>
                <NavLink to={"/category/white"}><div className="dropdown-item" href="#">White base</div></NavLink>
                <NavLink to={"/category/drinks"}><div className="dropdown-item" href="#">Drinks</div></NavLink>
            </div>
        </div>
    </li>
)}

export default NavBar
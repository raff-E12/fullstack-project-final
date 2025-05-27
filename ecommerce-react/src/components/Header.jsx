import { NavLink } from "react-router-dom";

export default function Header() {
    return <header>
        <div>Sono l'header</div>
        <ul className="nav">
            <li className="nav-item fw-bold">
                <a className="nav-link" href="#">
                    <img src="../../public/th.jpeg" className="logo" />
                </a>
            </li>
            <li className="nav-item">
                <NavLink to="/" className="nav-link active fw-bold fw-header" aria-current="page">
                    Homepage
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/products" className="nav-link fw-bold fw-header">
                    Products
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/categories" className="nav-link fw-bold fw-header">
                    Categories
                </NavLink>
            </li>
            <li className="nav-item">
                <NavLink to="/checkout" className="nav-link fw-bold fw-header">
                    Checkout
                </NavLink>
            </li>
        </ul>
    </header>
}
import { Link, NavLink } from "react-router-dom";

export default function Header() {
    return(
     <>
     <header className="header-sc container-fluid">
        <nav className="navbar">
             <div className="nav-actions">
                <ul className="nav-menu">
                    <li><Link to={"/"}>Homepage</Link></li>
                    <li><Link to={"/products"}>Products</Link></li>
                    <li><Link to={"/categories"}>Categories</Link></li>
                </ul>
             </div>

            <div className="nav-logo">Demo</div>

            <div className="nav-actions">
                <ul className="nav-menu">
                  <li><Link to={"/checkout"}>Checkout</Link></li>
                  <li><Link to={"/cart"}>Cart</Link></li>
                  <li><Link to={"/"}>Login</Link></li>
                </ul>
            </div>
      </nav>
     </header>
     </>
    )
}
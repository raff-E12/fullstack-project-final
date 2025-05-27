import { Link, NavLink } from "react-router-dom";

export default function Header() {
    return(
     <>
     <header className="header-sc">
        <nav className="navbar">
            <div className="nav-logo">VENDOR</div>
            <ul className="nav-menu">
            <li><a href="#">Home</a></li>
            <li><a href="#">Pages</a></li>
            <li><a href="#">Docs</a></li>
            </ul>
            <div className="nav-actions">
            <a href="#">Login</a>
            <a href="#" class="cart">Cart (2)</a>
            </div>
      </nav>
     </header>
     </>
    )
}


                // <li><Link to={"/"}>Homepage</Link></li>
                // <li><Link to={"/products"}>Products</Link></li>
                // <li><Link to={"/categories"}>Categories</Link></li>
                // <li><Link to={"/checkout"}>Checkout</Link></li>
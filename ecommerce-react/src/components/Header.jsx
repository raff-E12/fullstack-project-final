import { NavLink } from "react-router-dom";
import { useState } from "react";
import "../style/Header.css";
import { useSearch } from "../context/SearchContext";
import { useCart } from "../context/CartContext";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false); // default false
  const { isSearchActive, setSearchBarActive } = useSearch();
  const { cartItems } = useCart();

  const cartItemCount = cartItems.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  const closeMenus = () => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    setIsMobileCategoriesOpen(false);
  };

  return (
    <header className="header-sc py-3">
      <div className="container">
        {/* Desktop Header */}
        <div className="row align-items-center d-none d-md-flex">
          {/* Left */}
          <div className="col-4 d-flex align-items-center">
            <NavLink to="/" className="nav-link">
              Homepage
            </NavLink>
            <NavLink to="/products" className="nav-link">
              Products
            </NavLink>

            <div className="dropdown">
              <button
                className="dropdown-toggle"
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                aria-expanded={isDropdownOpen}
              >
                Categories
              </button>
              <div className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
                <div className="d-md-flex">
                  <div className="col-md-6">
                    <NavLink className="dropdown-item" to="/categories/polo-&-t-shirt" onClick={closeMenus}>
                      Polo & T-Shirt
                    </NavLink>
                    <NavLink className="dropdown-item" to="/categories/capispalla" onClick={closeMenus}>
                      Capispalla
                    </NavLink>
                    <NavLink className="dropdown-item" to="/categories/felpe" onClick={closeMenus}>
                      Felpe
                    </NavLink>
                  </div>
                  <div className="vr d-none d-md-block mx-2"></div>
                  <div className="col-md-6">
                    <NavLink className="dropdown-item" to="/categories/pantaloni" onClick={closeMenus}>
                      Pantaloni
                    </NavLink>
                    <NavLink className="dropdown-item" to="/categories/scarpe" onClick={closeMenus}>
                      Scarpe
                    </NavLink>
                    <NavLink className="dropdown-item" to="/categories/streetwear" onClick={closeMenus}>
                      Streetwear
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Center */}
          <div className="col-4 text-center">
            <h1 className="m-0" id="text-hd">
              Nome
            </h1>
          </div>

          {/* Right */}
          <div className="col-4 d-flex justify-content-end align-items-center">
            <div className="d-none d-md-flex">
              <div
                className="cart-hover-area"
                onMouseEnter={() => setIsCartOpen(true)}
                onMouseLeave={() => setIsCartOpen(false)}
              >
                <NavLink
                  to="/cart"
                  className="nav-link icon-link d-inline-flex align-items-center"
                  title="Carrello"
                >
                  <i className="bi bi-bag fs-5"></i>
                  {cartItemCount > 0 && (
                    <span className="cart-badge ms-2">{cartItemCount}</span>
                  )}
                </NavLink>
                {isCartOpen && cartItems.length > 0 && (
                  <div className="mini-cart-dropdown">
                    {cartItems.map((item, index) => (
                      <div key={index} className="mini-cart-item">
                        <img src={item.image_url} alt={item.name} width={40} /> //modificare dimensione e classe dim, messa solo come segnaposto;
                        <span>{item.name}</span> - x{item.quantity}
                        <p><strong>{item.price} €</strong></p>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="d-flex d-md-none justify-content-between align-items-center">
          <h1 className="m-0" id="text-hd">Nome</h1>
          <button
            className="navbar-toggler"
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            <i className="bi bi-list fs-4"></i>
          </button>
        </div>

        {isMobileMenuOpen && (
          <div className="d-md-none mt-3 mobile-nav-menu text-start ps-3">
            <NavLink to="/" className="nav-link" onClick={closeMenus}>
              Homepage
            </NavLink>
            <NavLink to="/products" className="nav-link" onClick={closeMenus}>
              Products
            </NavLink>

            <button
              className="nav-link btn btn-link text-start"
              onClick={() => setIsMobileCategoriesOpen(!isMobileCategoriesOpen)}
            >
              Categories {isMobileCategoriesOpen ? "▲" : "▼"}
            </button>

            {isMobileCategoriesOpen && (
              <div className="ms-3">
                <NavLink to="/categories/polo-&-t-shirt" className="nav-link" onClick={closeMenus}>
                  Polo & T-Shirt
                </NavLink>
                <NavLink to="/categories/capispalla" className="nav-link" onClick={closeMenus}>
                  Capispalla
                </NavLink>
                <NavLink to="/categories/felpe" className="nav-link" onClick={closeMenus}>
                  Felpe
                </NavLink>
                <NavLink to="/categories/pantaloni" className="nav-link" onClick={closeMenus}>
                  Pantaloni
                </NavLink>
                <NavLink to="/categories/scarpe" className="nav-link" onClick={closeMenus}>
                  Scarpe
                </NavLink>
                <NavLink to="/categories/streetwear" className="nav-link" onClick={closeMenus}>
                  Streetwear
                </NavLink>
              </div>
            )}

            <button
              className={isSearchActive ? "nav-link" : "d-none"}
              onClick={() => {
                setSearchBarActive((prev) => !prev);
                closeMenus();
              }}
            >
              Ricerca
            </button>

            <NavLink
              to="/cart"
              className="nav-link mt-2 d-inline-flex align-items-center"
              onClick={closeMenus}
            >
              Carrello
              {cartItemCount > 0 && (
                <span className="cart-badge ms-2">{cartItemCount}</span>
              )}
            </NavLink>
          </div>
        )}
      </div>
    </header>
  );
}

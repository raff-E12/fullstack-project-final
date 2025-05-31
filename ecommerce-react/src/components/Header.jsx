// Header.jsx
import { NavLink, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect, useRef } from "react";
import "../style/Header.css";
import { useSearch } from "../context/SearchContext";
import { useCart } from "../context/CartContext";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
  const [isSearchInputVisible, setIsSearchInputVisible] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);

  const { searchTerm, setSearchTerm } = useSearch();
  const { cartItems } = useCart();
  const navigate = useNavigate();
  const location = useLocation();

  // Ref per il dropdown e per il carrello
  const dropdownRef = useRef(null);
  const cartRef = useRef(null);

  const cartItemCount = cartItems.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  const isHomepage = location.pathname === "/";

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
    }

    if (isDropdownOpen || isCartOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isDropdownOpen, isCartOpen]);

  const closeMenus = () => {
    setIsDropdownOpen(false);
    setIsMobileMenuOpen(false);
    setIsMobileCategoriesOpen(false);
    setIsCartOpen(false);
  };

  const performSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      setIsSearchInputVisible(false);
      closeMenus();
    } else {
      setIsSearchInputVisible(false);
    }
  };

  const handleSearchFormSubmit = (e) => {
    e.preventDefault();
    performSearch();
  };

  const handleSearchButtonClick = () => {
    if (isSearchInputVisible && searchTerm.trim()) {
      performSearch();
    } else {
      setIsSearchInputVisible(!isSearchInputVisible);
    }
  };

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleGoToCart = () => {
    navigate("/cart");
    setIsCartOpen(false);
    closeMenus();
  };

  return (
    <header
      className={`header-sc py-3 ${
        isHomepage ? "homepage-header" : "page-header"
      }`}
    >
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

            <div className="dropdown" ref={dropdownRef}>
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
                    <NavLink
                      className="dropdown-item"
                      to="/categories/polo-&-t-shirt"
                      onClick={closeMenus}
                    >
                      Polo & T-Shirt
                    </NavLink>
                    <NavLink
                      className="dropdown-item"
                      to="/categories/capispalla"
                      onClick={closeMenus}
                    >
                      Capispalla
                    </NavLink>
                    <NavLink
                      className="dropdown-item"
                      to="/categories/felpe"
                      onClick={closeMenus}
                    >
                      Felpe
                    </NavLink>
                  </div>
                  <div className="vr d-none d-md-block mx-2"></div>
                  <div className="col-md-6">
                    <NavLink
                      className="dropdown-item"
                      to="/categories/pantaloni"
                      onClick={closeMenus}
                    >
                      Pantaloni
                    </NavLink>
                    <NavLink
                      className="dropdown-item"
                      to="/categories/scarpe"
                      onClick={closeMenus}
                    >
                      Scarpe
                    </NavLink>
                    <NavLink
                      className="dropdown-item"
                      to="/categories/streetwear"
                      onClick={closeMenus}
                    >
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

          <div className="col-4 d-flex justify-content-end align-items-center">
            <div className="d-none d-md-flex align-items-center">
              {/* Container per ricerca e carrello allineati orizzontalmente */}
              <div className="search-cart-container d-flex align-items-center">
                {/* Sezione ricerca */}
                <div className="search-container-desktop d-flex align-items-center">
                  <form
                    onSubmit={handleSearchFormSubmit}
                    className="d-inline-flex me-2 search-form"
                  >
                    <input
                      type="text"
                      placeholder="Cerca..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className={`search-input ${
                        isSearchInputVisible ? "visible" : "hidden"
                      }`}
                    />
                  </form>
                  <button
                    type="button"
                    className="nav-link"
                    onClick={handleSearchButtonClick}
                  >
                    Ricerca
                  </button>
                </div>

                {/* Sezione carrello */}
                <div className="cart-container" ref={cartRef}>
                  <button
                    type="button"
                    className="nav-link icon-link d-inline-flex align-items-center cart-toggle-btn"
                    onClick={handleCartToggle}
                    title="Carrello"
                  >
                    <i className="bi bi-bag fs-5"></i>
                    {cartItemCount > 0 && (
                      <span className="cart-badge ms-2">{cartItemCount}</span>
                    )}
                  </button>

                  {isCartOpen && (
                    <div className="mini-cart-dropdown">
                      {cartItems.length > 0 ? (
                        <>
                          <div className="mini-cart-items-list">
                            {cartItems.map((item, index) => (
                              <div key={index} className="mini-cart-item">
                                <img
                                  src={item.image_url}
                                  alt={item.name}
                                  width={40}
                                />
                                <div className="mini-cart-item-info">
                                  <span>{item.name}</span>
                                  <div className="mini-cart-item-details">
                                    <span>x{item.quantity}</span>
                                    <strong>{item.price} €</strong>
                                  </div>
                                </div>
                              </div>
                            ))}
                          </div>
                          <div className="mini-cart-footer">
                            <div className="mini-cart-total">
                              <strong>
                                Totale:{" "}
                                {cartItems
                                  .reduce(
                                    (total, item) =>
                                      total + item.price * item.quantity,
                                    0
                                  )
                                  .toFixed(2)}{" "}
                                €
                              </strong>
                            </div>
                            <button
                              className="btn btn-primary w-100 mt-2"
                              onClick={handleGoToCart}
                            >
                              Vai al Carrello
                            </button>
                          </div>
                        </>
                      ) : (
                        <div className="mini-cart-empty">
                          <p>Il carrello è vuoto</p>
                        </div>
                      )}
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Header */}
        <div className="d-flex d-md-none justify-content-between align-items-center">
          <h1 className="m-0" id="text-hd">
            Nome
          </h1>
          <button
            className="mobile-menu-btn"
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Toggle navigation"
          >
            <span
              className={`hamburger-line ${isMobileMenuOpen ? "open" : ""}`}
            ></span>
            <span
              className={`hamburger-line ${isMobileMenuOpen ? "open" : ""}`}
            ></span>
            <span
              className={`hamburger-line ${isMobileMenuOpen ? "open" : ""}`}
            ></span>
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
                <NavLink
                  to="/categories/polo-&-t-shirt"
                  className="nav-link"
                  onClick={closeMenus}
                >
                  Polo & T-Shirt
                </NavLink>
                <NavLink
                  to="/categories/capispalla"
                  className="nav-link"
                  onClick={closeMenus}
                >
                  Capispalla
                </NavLink>
                <NavLink
                  to="/categories/felpe"
                  className="nav-link"
                  onClick={closeMenus}
                >
                  Felpe
                </NavLink>
                <NavLink
                  to="/categories/pantaloni"
                  className="nav-link"
                  onClick={closeMenus}
                >
                  Pantaloni
                </NavLink>
                <NavLink
                  to="/categories/scarpe"
                  className="nav-link"
                  onClick={closeMenus}
                >
                  Scarpe
                </NavLink>
                <NavLink
                  to="/categories/streetwear"
                  className="nav-link"
                  onClick={closeMenus}
                >
                  Streetwear
                </NavLink>
              </div>
            )}

            <div className="mobile-search-and-cart mt-3">
              <button
                type="button"
                className="nav-link mb-2"
                onClick={handleSearchButtonClick}
              >
                Ricerca
              </button>

              <form
                onSubmit={handleSearchFormSubmit}
                className={`mb-2 mobile-search-form ${
                  isSearchInputVisible ? "visible" : "hidden"
                }`}
              >
                <input
                  type="text"
                  placeholder="Cerca..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="search-input"
                />
              </form>

              <button
                type="button"
                className="nav-link d-inline-flex align-items-center mb-2"
                onClick={handleCartToggle}
              >
                Carrello
                {cartItemCount > 0 && (
                  <span className="cart-badge ms-2">{cartItemCount}</span>
                )}
              </button>

              {isCartOpen && (
                <div className="mobile-mini-cart">
                  {cartItems.length > 0 ? (
                    <>
                      <div className="mini-cart-items-list">
                        {cartItems.map((item, index) => (
                          <div key={index} className="mini-cart-item">
                            <img
                              src={item.image_url}
                              alt={item.name}
                              width={40}
                            />
                            <div className="mini-cart-item-info">
                              <span>{item.name}</span>
                              <div className="mini-cart-item-details">
                                <span>x{item.quantity}</span>
                                <strong>{item.price} €</strong>
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                      <div className="mini-cart-footer">
                        <div className="mini-cart-total">
                          <strong>
                            Totale:{" "}
                            {cartItems
                              .reduce(
                                (total, item) =>
                                  total + item.price * item.quantity,
                                0
                              )
                              .toFixed(2)}{" "}
                            €
                          </strong>
                        </div>
                        <button
                          className="btn btn-primary w-100 mt-2"
                          onClick={handleGoToCart}
                        >
                          Vai al Carrello
                        </button>
                      </div>
                    </>
                  ) : (
                    <div className="mini-cart-empty">
                      <p>Il carrello è vuoto</p>
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

// Header.jsx - Modifica la sezione desktop
import { NavLink, useLocation } from "react-router-dom";
import { useState } from "react";
import "../style/Header.css";
import CategoriesDropdown from "../utilities/CategoriesDropdown.jsx";
import SearchComponent from "../utilities/handleSearchButtonClick.jsx";
import CartDropdown from "../utilities/CartDropdown.jsx";
import MobileCartModal from "../utilities/MobileCartModal.jsx";

export default function Header() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isMobileCategoriesOpen, setIsMobileCategoriesOpen] = useState(false);
  const location = useLocation();

  const isHomepage = location.pathname === "/";

  const closeMenus = () => {
    setIsMobileMenuOpen(false);
    setIsMobileCategoriesOpen(false);
  };

  return (
    <header
      className={`header-sc py-3 w-100 ${
        isHomepage ? "homepage-header" : "page-header"
      }`}
      style={{ top: 0, zIndex: 999 }}
    >
      <div className="container">
        {/* Desktop Header */}
        <div className="row align-items-center d-none d-md-flex">
          {/* Left */}
          <div className="col-4 d-flex align-items-center">
            {/* Homepage link - nascosto su tablet */}
            <NavLink to="/" className="nav-link d-lg-inline d-md-none">
              Homepage
            </NavLink>
            <NavLink to="/products" className="nav-link">
              Products
            </NavLink>
            <CategoriesDropdown closeMenus={closeMenus} />
          </div>

          {/* Center - Logo cliccabile */}
          <div className="col-4 text-center">
            <NavLink to="/" onClick={closeMenus} className="logo-link">
              <img
                src="/img/logo.png"
                alt="URBN WAY"
                width="200"
                className="logo-img"
              />
            </NavLink>
          </div>

          {/* Right */}
          <div className="col-4 d-flex justify-content-end align-items-center">
            <div className="d-none d-md-flex align-items-center">
              <div className="search-cart-container d-flex align-items-center">
                <SearchComponent closeMenus={closeMenus} />
                <CartDropdown closeMenus={closeMenus} />
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Header - Logo già cliccabile */}
        <div className="d-flex d-md-none justify-content-between align-items-center">
          <div className="col-4 d-flex justify-content-start">
            <button
              className="mobile-menu-btn btn p-2 d-flex flex-column justify-content-center align-items-center"
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

          <div className="col-4 d-flex justify-content-center">
            <NavLink to="/" onClick={closeMenus} className="logo-link">
              <img
                src="/img/logo.png"
                alt="URBN WAY"
                width="150"
                className="logo-img"
              />
            </NavLink>
          </div>

          <div className="col-4 d-flex justify-content-end">
            <MobileCartModal isMobile={true} closeMenus={closeMenus} />
          </div>
        </div>

        {/* Mobile Menu - Homepage rimane nel menu mobile */}
        {isMobileMenuOpen && (
          <div className="d-md-none mt-3 mobile-nav-menu ps-0">
            <NavLink
              to="/"
              className="nav-link d-block text-start ps-3"
              onClick={closeMenus}
            >
              Homepage
            </NavLink>
            <NavLink
              to="/products"
              className="nav-link d-block text-start ps-3"
              onClick={closeMenus}
            >
              Products
            </NavLink>

            <button
              className="nav-link btn btn-link text-start ps-3 d-block w-100 border-0"
              style={{ textAlign: "left" }}
              onClick={() => setIsMobileCategoriesOpen(!isMobileCategoriesOpen)}
            >
              Categories {isMobileCategoriesOpen ? "▲" : "▼"}
            </button>

            {isMobileCategoriesOpen && (
              <div className="ps-0">
                <NavLink
                  to="/categories/polo-&-t-shirt"
                  className="nav-link d-block text-start ps-4"
                  onClick={closeMenus}
                >
                  Polo & T-Shirt
                </NavLink>
                <NavLink
                  to="/categories/capispalla"
                  className="nav-link d-block text-start ps-4"
                  onClick={closeMenus}
                >
                  Capispalla
                </NavLink>
                <NavLink
                  to="/categories/felpe"
                  className="nav-link d-block text-start ps-4"
                  onClick={closeMenus}
                >
                  Felpe
                </NavLink>
                <NavLink
                  to="/categories/pantaloni"
                  className="nav-link d-block text-start ps-4"
                  onClick={closeMenus}
                >
                  Pantaloni
                </NavLink>
                <NavLink
                  to="/categories/scarpe"
                  className="nav-link d-block text-start ps-4"
                  onClick={closeMenus}
                >
                  Scarpe
                </NavLink>
                <NavLink
                  to="/categories/streetwear"
                  className="nav-link d-block text-start ps-4"
                  onClick={closeMenus}
                >
                  Streetwear
                </NavLink>
              </div>
            )}

            <div className="mobile-search-and-cart mt-3 ps-3">
              <SearchComponent isMobile={true} closeMenus={closeMenus} />
            </div>
          </div>
        )}
      </div>
    </header>
  );
}

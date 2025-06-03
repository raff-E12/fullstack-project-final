// utilities/CategoriesDropdown.jsx
import { NavLink } from "react-router-dom";
import { useState, useEffect, useRef } from "react";

export default function CategoriesDropdown({ closeMenus }) {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    function handleClickOutside(event) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsDropdownOpen(false);
      }
    }

    if (isDropdownOpen) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isDropdownOpen]);

  const handleCategoryClick = () => {
    setIsDropdownOpen(false);
    closeMenus();
  };

  return (
    <div className="dropdown position-relative" ref={dropdownRef}>
      <button
        className="dropdown-toggle btn nav-link"
        type="button"
        onClick={() => setIsDropdownOpen(!isDropdownOpen)}
        aria-expanded={isDropdownOpen}
      >
        Categories
      </button>
      <div
        className={`dropdown-menu position-absolute ${
          isDropdownOpen ? "show" : ""
        }`}
      >
        <div className="d-md-flex">
          <div className="col-md-6">
            <NavLink
              className="dropdown-item d-block"
              to="/categories/polo-&-t-shirt"
              onClick={handleCategoryClick}
            >
              Polo & T-Shirt
            </NavLink>
            <NavLink
              className="dropdown-item d-block"
              to="/categories/capispalla"
              onClick={handleCategoryClick}
            >
              Capispalla
            </NavLink>
            <NavLink
              className="dropdown-item d-block"
              to="/categories/felpe"
              onClick={handleCategoryClick}
            >
              Felpe
            </NavLink>
          </div>
          <div className="vr d-none d-md-block mx-2"></div>
          <div className="col-md-6">
            <NavLink
              className="dropdown-item d-block"
              to="/categories/pantaloni"
              onClick={handleCategoryClick}
            >
              Pantaloni
            </NavLink>
            <NavLink
              className="dropdown-item d-block"
              to="/categories/scarpe"
              onClick={handleCategoryClick}
            >
              Scarpe
            </NavLink>
            <NavLink
              className="dropdown-item d-block"
              to="/categories/streetwear"
              onClick={handleCategoryClick}
            >
              Streetwear
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

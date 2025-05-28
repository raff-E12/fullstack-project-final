import { NavLink } from "react-router-dom";
import { useState } from "react";
import { UseSearch } from "../context/SearchContext";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const {isSearchActive, setSearchBarActive} = UseSearch()

  return (
    <header className="bg-dark py-3 header-sc bg-opacity-50">
      <div className="container">
        <div className="d-flex justify-content-between align-items-center">
          <div className="d-flex">
            <NavLink
              to="/"
              className="nav-link fw-bold me-3"
              aria-current="page"
            >
              Homepage
            </NavLink>

            <div className="dropdown">
              <button
                className="btn btn-link nav-link fw-bold p-0 dropdown-toggle"
                type="button"
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
              >
                Categories
              </button>
              <div className={`dropdown-menu ${isDropdownOpen ? "show" : ""}`}>
                <div className="d-md-flex">
                  <div className="col-md-6">
                    <NavLink
                      className="dropdown-item"
                      to="/categories/polo-&-t-shirt"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Polo & t-Shirt
                    </NavLink>
                    <hr className="d-md-none my-2" />
                    <NavLink
                      className="dropdown-item"
                      to="/categories/capispalla"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Capispalla
                    </NavLink>
                    <hr className="d-md-none my-2" />
                    <NavLink
                      className="dropdown-item"
                      to="/categories/felpe"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Felpe
                    </NavLink>
                  </div>
                  <div className="vr d-none d-md-block mx-2"></div>
                  <hr className="d-md-none my-2" />
                  <div className="col-md-6">
                    <NavLink
                      className="dropdown-item"
                      to="/categories/pantaloni"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Pantaloni
                    </NavLink>
                    <hr className="d-md-none my-2" />
                    <NavLink
                      className="dropdown-item"
                      to="/categories/scarpe"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Scarpe
                    </NavLink>
                    <hr className="d-md-none my-2" />
                    <NavLink
                      className="dropdown-item"
                      to="/categories/streetwear"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Streetwear
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h1 className="m-0" id="text-hd">Nome</h1>

          <div className="d-flex">
            <NavLink to="/products" className="nav-link fw-bold me-3">
              Product
            </NavLink>
            <NavLink to="/cart" className="nav-link fw-bold me-3">
              Carrello
            </NavLink>
            <button to="/search" className={isSearchActive ? "nav-link fw-bold" : "d-none"} onClick={()=> setSearchBarActive((prev)=> !prev)}>
              Search
            </button>
          </div>
        </div>
      </div>
    </header >
  );
}

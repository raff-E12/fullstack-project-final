import { NavLink } from "react-router-dom";
import { useState } from "react";

export default function Header() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  return (
    <header className="py-3">
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
                      to="/category/polo-&-t-shirt"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Polo & t-Shirt
                    </NavLink>
                    <hr className="d-md-none my-2" />
                    <NavLink
                      className="dropdown-item"
                      to="/category/capispalla"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Capispalla
                    </NavLink>
                    <hr className="d-md-none my-2" />
                    <NavLink
                      className="dropdown-item"
                      to="/category/felpe"
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
                      to="/category/pantaloni"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Pantaloni
                    </NavLink>
                    <hr className="d-md-none my-2" />
                    <NavLink
                      className="dropdown-item"
                      to="/category/Scarpe"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Scarpe
                    </NavLink>
                    <hr className="d-md-none my-2" />
                    <NavLink
                      className="dropdown-item"
                      to="/category/Streetwear"
                      onClick={() => setIsDropdownOpen(false)}
                    >
                      Streetwear
                    </NavLink>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <h1 className="m-0">Nome</h1>

          <div className="d-flex">
            <NavLink to="/products" className="nav-link fw-bold me-3">
              Product
            </NavLink>
            <NavLink to="/cart" className="nav-link fw-bold">
              Carrello
            </NavLink>
          </div>
        </div>
      </div>
    </header>
  );
}

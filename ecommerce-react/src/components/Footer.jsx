import { NavLink } from "react-router-dom";
import Newsletter from "./Newsletter";

export default function Footer() {
  return (
    <footer className="bg-dark text-white py-5 mt-5">
      <div className="container">
        <div className="row">
          <div className="col-12 col-md-6">
            <div className="row">
              {/* Quick Links */}
              <div className="col-12 col-md-6">
                <div className="mb-4">
                  <h5 className="mb-3">Quick Links</h5>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <NavLink
                        to="/"
                        className="text-white text-decoration-none"
                      >
                        <i className="bi bi-house me-2"></i>Homepage
                      </NavLink>
                    </li>
                    <li className="mb-2">
                      <NavLink
                        to="/products"
                        className="text-white text-decoration-none"
                      >
                        <i className="bi bi-box me-2"></i>Products
                      </NavLink>
                    </li>
                    <li className="mb-2">
                      <NavLink
                        to="/cart"
                        className="text-white text-decoration-none"
                      >
                        <i className="bi bi-cart me-2"></i>Carrello
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>

              {/* Categories */}
              <div className="col-12 col-md-6">
                <div className="mb-4">
                  <h5 className="mb-3">Categories</h5>
                  <ul className="list-unstyled">
                    <li className="mb-2">
                      <NavLink
                        to="/categories/polo-&-t-shirt"
                        className="text-white text-decoration-none"
                      >
                        <i className="bi bi-tag me-2"></i>Polo & t-Shirt
                      </NavLink>
                    </li>
                    <li className="mb-2">
                      <NavLink
                        to="/categories/capispalla"
                        className="text-white text-decoration-none"
                      >
                        <i className="bi bi-tag me-2"></i>Capispalla
                      </NavLink>
                    </li>
                    <li className="mb-2">
                      <NavLink
                        to="/categories/felpe"
                        className="text-white text-decoration-none"
                      >
                        <i className="bi bi-tag me-2"></i>Felpe
                      </NavLink>
                    </li>
                    <li className="mb-2">
                      <NavLink
                        to="/categories/pantaloni"
                        className="text-white text-decoration-none"
                      >
                        <i className="bi bi-tag me-2"></i>Pantaloni
                      </NavLink>
                    </li>
                    <li className="mb-2">
                      <NavLink
                        to="/categories/scarpe"
                        className="text-white text-decoration-none"
                      >
                        <i className="bi bi-tag me-2"></i>Scarpe
                      </NavLink>
                    </li>
                    <li className="mb-2">
                      <NavLink
                        to="/categories/streetwear"
                        className="text-white text-decoration-none"
                      >
                        <i className="bi bi-tag me-2"></i>Streetwear
                      </NavLink>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          </div>

          {/* DESTRA: Subscribe + Follow Us */}
          <div className="col-12 col-md-6">
            <Newsletter />

            <div>
              <h5 className="mb-3">Follow Us</h5>
              <div className="d-flex gap-3">
                <a href="#" className="text-white text-decoration-none fs-4">
                  <i className="bi bi-facebook"></i>
                </a>
                <a href="#" className="text-white text-decoration-none fs-4">
                  <i className="bi bi-twitter"></i>
                </a>
                <a href="#" className="text-white text-decoration-none fs-4">
                  <i className="bi bi-instagram"></i>
                </a>
                <a href="#" className="text-white text-decoration-none fs-4">
                  <i className="bi bi-youtube"></i>
                </a>
              </div>
            </div>
          </div>
        </div>

        <hr className="my-4 border-light" />
      </div>
    </footer>
  );
}

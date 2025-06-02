// ProductsPage.jsx
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom";
import FilterSection from "../components/FilterSection.jsx";
import axios from "axios";

import "../style/ProductsPage.css";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [defaultProducts, setDefaultProducts] = useState([]);

  const location = useLocation();
  const endPoint = "http://localhost:3000/products";

  const buildApiParams = () => {
    const queryParams = new URLSearchParams(location.search);
    const params = {};

    if (queryParams.get("search")) params.q = queryParams.get("search");
    if (queryParams.get("sort_by")) params.sort_by = queryParams.get("sort_by");
    if (queryParams.get("brand")) params.brand = queryParams.get("brand");
    if (queryParams.get("fabric")) params.fabric = queryParams.get("fabric");
    if (queryParams.get("min_price"))
      params.min_price = queryParams.get("min_price");
    if (queryParams.get("max_price"))
      params.max_price = queryParams.get("max_price");
    if (queryParams.get("discount"))
      params.discount = queryParams.get("discount");

    return params;
  };

  function getProducts() {
    const params = buildApiParams();
    axios
      .get(endPoint, { params })
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.error("Errore nel recupero dei prodotti:", err);
        setProducts([]);
      });
  }

  function getdefaultProducts() {
    axios
      .get(endPoint)
      .then((res) => {
        setDefaultProducts(res.data.products);
      })
      .catch((err) => {
        console.error("Errore nel recupero dei prodotti di default:", err);
      });
  }

  useEffect(() => {
    getProducts();
  }, [location.search]);

  useEffect(() => {
    getdefaultProducts();
  }, []);

  return (
    <div className="container-fluid py-5">
      <div className="container">
        {/* Passa i parametri di default */}
        <FilterSection defaultProducts={defaultProducts} />

        {/* Products Grid */}
        <div className="row g-4 mt-3">
          {products.length > 0 ? (
            products.map(
              ({
                id,
                name,
                description,
                price,
                image_url,
                slug,
                discount,
                start_discount,
                end_discount,
              }) => {
                const today = new Date();
                const start = start_discount ? new Date(start_discount) : null;
                const end = end_discount ? new Date(end_discount) : null;

                const isDiscountActive =
                  discount &&
                  start instanceof Date &&
                  end instanceof Date &&
                  today >= start &&
                  today <= end;

                return (
                  <div key={id} className="col-12 col-sm-6 col-md-4 col-lg-3">
                    <div className="card h-100 shadow-sm product-card position-relative border-0">
                      {isDiscountActive && (
                        <div className="sale-badge position-absolute">
                          <span className="badge bg-danger rounded-circle p-3 fw-bold">
                            SALE
                          </span>
                        </div>
                      )}

                      <Link
                        to={`/products/${slug}`}
                        className="text-decoration-none"
                      >
                        <div
                          className="card-img-top product-image"
                          style={{
                            backgroundImage: `url(${image_url})`,
                            height: "250px",
                            backgroundSize: "cover",
                            backgroundPosition: "center",
                            backgroundRepeat: "no-repeat",
                          }}
                        />

                        <div className="card-body d-flex flex-column">
                          <h5 className="card-title text-dark fw-bold mb-2">
                            {name}
                          </h5>
                          <p className="card-text text-muted small flex-grow-1">
                            {description}
                          </p>
                          <div className="mt-auto">
                            <p className="card-text mb-0">
                              <span className="fw-bold fs-5 text-success">
                                €{price}
                              </span>
                            </p>
                          </div>
                        </div>
                      </Link>
                    </div>
                  </div>
                );
              }
            )
          ) : (
            <div className="col-12">
              <div className="text-center py-5">
                <div className="mb-3">
                  <i className="bi bi-search fs-1 text-muted"></i>
                </div>
                <h4 className="text-muted">Nessun prodotto trovato</h4>
                <p className="text-muted">
                  Prova a modificare i filtri di ricerca
                </p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

import { useState, useEffect, useContext } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../style/HomeProductSection.css";

export function HomeProductSection() {
  const [newArrivals, setNewArrivals] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [isBestSellerSection, setBestSellerSection] = useState(true);

  const endPoint = "http://localhost:3000/";

  function getProducts() {
    axios
      .get(endPoint)
      .then((res) => {
        setNewArrivals(res.data.products.newArrivals);
        setBestSellers(res.data.products.highestPriced);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  console.log(newArrivals);
  console.log(bestSellers);

  useEffect(() => {
    getProducts();
  }, []);

  const renderProductCards = (products) => {
    if (!products || products.length === 0) {
      return (
        <p className="text-center mt-4">
          Nessun prodotto disponibile in questa sezione.
        </p>
      );
    }

    const firstRowProducts = products.slice(0, 3);
    const secondRowProducts = products.slice(3, 7);

    return (
        <div className="container my-5">
            <div className="d-flex justify-content-end mb-4">
                <button
                    className={`btn ${isBestSellerSection ? 'btn-primary' : 'btn-outline-primary'} me-2`}
                    onClick={() => setBestSellerSection(true)}
                >
                    Best Sellers
                </button>
                <button
                    className={`btn ${!isBestSellerSection ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setBestSellerSection(false)}
                >
                    New Arrivals
                </button>
            </div>

            <div>
                {isBestSellerSection ? renderProductCards(bestSellers) : renderProductCards(newArrivals)}
            </div>
            <Link to={isBestSellerSection ? "/products?sort_by=price_desc" : "/products?sort_by=latest" } className="btn btn-primary">View More...</Link>
        </div>

        <div className="row">
          {secondRowProducts.map((product) => {
            return (
              <Link
                to={`products/${product.slug}`}
                key={product.id}
                className="col-md-3 col-sm-6 mb-3"
              >
                <div className="card h-100 shadow-sm">
                  {product.image_url && (
                    <img
                      src={product.image_url}
                      className="card-img-top img-fluid"
                      alt={product.name}
                      style={{ objectFit: "cover", height: "180px" }}
                    />
                  )}
                  <div className="card-body d-flex flex-column">
                    <h6 className="card-title text-truncate">{product.name}</h6>
                    <p
                      className="card-text text-muted flex-grow-1"
                      style={{ fontSize: "0.8rem" }}
                    >
                      {product.description
                        ? product.description.substring(0, 80) + "..."
                        : "Nessuna descrizione disponibile."}
                    </p>
                    <p className="card-text fw-bold mt-auto">
                      Prezzo: €{product.price ? product.price : "N/A"}
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </>
    );
  };

  return (
    <div className="container my-5">
      {/* Header con titolo e tab */}
      <div className="featured-header d-flex justify-content-between align-items-center mb-4">
        <h2 className="featured-title mb-0">Featured Products</h2>

        <div className="featured-tabs">
          <button
            className={`featured-tab ${isBestSellerSection ? "active" : ""}`}
            onClick={() => setBestSellerSection(true)}
          >
            BEST SELLERS
          </button>
          <button
            className={`featured-tab ${!isBestSellerSection ? "active" : ""}`}
            onClick={() => setBestSellerSection(false)}
          >
            NEW ARRIVALS
          </button>
        </div>
      </div>

      {/* Contenuto prodotti */}
      <div>
        {isBestSellerSection
          ? renderProductCards(bestSellers)
          : renderProductCards(newArrivals)}
      </div>

      <Link
        to={
          isBestSellerSection
            ? "/products?sort_by=price_desc"
            : "/products?sort_by=latest"
        }
      >
        View More...
      </Link>
    </div>
  );
}

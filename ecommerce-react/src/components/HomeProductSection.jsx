import { useState, useEffect } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import "../style/HomeProductSection.css"; // Assuming this CSS is for styling

export function HomeProductSection() {
  const [newArrivals, setNewArrivals] = useState([]);
  const [bestSellers, setBestSellers] = useState([]);
  const [isBestSellerSection, setBestSellerSection] = useState(true);

  const endPoint = "http://localhost:3000/";

  useEffect(() => {
    // Fetch products when the component mounts
    axios
      .get(endPoint)
      .then((res) => {
        // Assuming your API returns an object with 'products' and nested 'newArrivals' and 'highestPriced'
        setNewArrivals(res.data.products.newArrivals || []);
        setBestSellers(res.data.products.highestPriced || []);
      })
      .catch((err) => {
        console.error("Error fetching products:", err); // Use console.error for errors
      });
  }, []); // Empty dependency array means this effect runs once after the initial render

  // Helper function to render a single row of product cards
  const renderProductRow = (productsToRender) => {
    if (!productsToRender || productsToRender.length === 0) {
      return (
        <p className="text-center mt-4">
          Nessun prodotto disponibile in questa sezione.
        </p>
      );
    }

    // You decided to split into two rows. Let's make sure both are rendered.
    // The previous structure was only rendering the second row within renderProductCards.
    // We need to render the first row as well.
    const firstRowProducts = productsToRender.slice(0, 3);
    const secondRowProducts = productsToRender.slice(3, 7); // Max 4 for the second row

    return (
      <>
        <div className="row mb-4">
          {" "}
          {firstRowProducts.map((product) => (
            <Link
              to={`products/${product.slug}`}
              key={product.id}
              className="col-md-4 col-sm-6 mb-3" // Adjusted to col-md-4 for 3 items per row
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
                    Prezzo: €{product.price ? product.price : "N/A"}{" "}
                    {/* Format price */}
                  </p>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {secondRowProducts.length > 0 && ( // Only render if there are products for the second row
          <div className="row">
            {secondRowProducts.map((product) => (
              <Link
                to={`products/${product.slug}`}
                key={product.id}
                className="col-md-3 col-sm-6 mb-3" // Adjusted to col-md-3 for 4 items per row
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
            ))}
          </div>
        )}
      </>
    );
  };

  return (
    <div className="container my-5">
      <div className="featured-header d-flex justify-content-between align-items-center mb-4">
        <h2 className="featured-title mb-0 me-4">FEATURED PRODUCTS</h2>

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

      <div>
        {/* Call renderProductRow with the appropriate data based on the state */}
        {isBestSellerSection
          ? renderProductRow(bestSellers)
          : renderProductRow(newArrivals)}
      </div>

      <div className="text-center mt-4">
        <Link
          to={
            isBestSellerSection
              ? "/products?sort_by=price_desc"
              : "/products?sort_by=latest"
          }
          className="view-more-btn"
        >
          View More
        </Link>
      </div>
    </div>
  );
}

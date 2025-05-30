import { Link } from "react-router-dom";
import "../style/PremiumCard.css";

export function PremiumCard({ product }) {
  console.log(product)
  return (
    <Link
      to={`products/${product.slug}`}
      className="col-md-4 col-sm-6 mb-4 premium-card"
    >
      <div className="card h-100">
        <div className="premium-card-image-container">
          {product.image_url && (
            <img
              src={product.image_url}
              className="card-img-top premium-card-image"
              alt={product.name}
            />
          )}
          <div className="premium-card-overlay">
            <div className="premium-card-badge">FEATURED</div>
          </div>
        </div>

        <div className="card-body premium-card-body">
          <h5 className="card-title premium-card-title">{product.name}</h5>
          <p className="card-text premium-card-description">
            {product.description
              ? product.description.substring(0, 120) + "..."
              : "Scopri questo prodotto esclusivo della nostra collezione."}
          </p>
          <div className="premium-card-price-section mt-auto">
            <span className="premium-card-price">
              €{product.price ? product.price : "N/A"}
            </span>
            <button className="btn premium-card-button">Scopri di più</button>
          </div>
        </div>
      </div>
    </Link>
  );
}

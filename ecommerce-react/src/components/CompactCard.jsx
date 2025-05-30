import { Link } from "react-router-dom";
import "../style/CompactCard.css";

export function CompactCard({ product }) {
  return (
    <Link
      to={`products/${product.slug}`}
      className="col-md-3 col-sm-6 col-6 mb-3 compact-card"
    >
      <div className="card h-100">
        <div className="compact-card-image-container">
          {product.image_url && (
            <img
              src={product.image_url}
              className="card-img-top compact-card-image"
              alt={product.name}
            />
          )}
          <div className="compact-card-hover-overlay">
            <div className="compact-card-quick-view">Vista rapida</div>
          </div>
        </div>

        <div className="card-body compact-card-body">
          <h6 className="card-title compact-card-title">{product.name}</h6>
          <div className="compact-card-price">
            €{product.price ? product.price : "N/A"}
          </div>
        </div>
      </div>
    </Link>
  );
}

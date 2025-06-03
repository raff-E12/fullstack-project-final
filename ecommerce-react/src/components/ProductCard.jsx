import { Link } from "react-router-dom";
import "../style/ProductCard.css";

export default function ProductCard({
  id,
  name,
  description,
  price,
  image_url,
  slug,
  discount,
  start_discount,
  end_discount,
  brand,
}) {
  // Calcolo sconto attivo (stesso logic della SingleProductPage)
  const today = new Date();
  const start = start_discount ? new Date(start_discount) : null;
  const end = end_discount ? new Date(end_discount) : null;
  const isDiscountActive =
    discount &&
    start instanceof Date &&
    end instanceof Date &&
    today >= start &&
    today <= end;

  const finalPrice = isDiscountActive
    ? (price * (1 - discount / 100)).toFixed(2)
    : price;

  return (
    <div className="product-card-wrapper">
      <Link to={`/products/${slug}`} className="product-card-link">
        <div className="product-card">
          {/* Badge Sconto */}
          {isDiscountActive && (
            <div className="discount-badge">
              <span className="discount-percentage">-{parseInt(discount)}%</span>
            </div>
          )}

          {/* Immagine Prodotto */}
          <div className="product-image-container">
            <img
              src={image_url}
              alt={name}
              className="product-image"
              loading="lazy"
            />
            <div className="image-overlay">
              <div className="overlay-content">
                <i className="bi bi-eye fs-4"></i>
                <span className="overlay-text">Visualizza</span>
              </div>
            </div>
          </div>

          {/* Contenuto Card */}
          <div className="product-content">
            {/* Brand */}
            {brand && <p className="product-brand">{brand}</p>}

            {/* Nome Prodotto */}
            <h3 className="product-name">{name}</h3>

            {/* Descrizione */}
            <p className="product-description">{description}</p>

            {/* Sezione Prezzo */}
            <div className="price-section">
              {isDiscountActive ? (
                <div className="price-with-discount">
                  <span className="original-price">€{price}</span>
                  <span className="discounted-price">€{finalPrice}</span>
                  <span className="savings-badge">
                    Risparmi €{(price - finalPrice).toFixed(2)}
                  </span>
                </div>
              ) : (
                <span className="regular-price">€{price}</span>
              )}
            </div>
          </div>

          {/* Footer Card con CTA */}
          <div className="product-footer">
            <div className="cta-button">
              <i className="bi bi-arrow-right"></i>
              <span>Scopri di più</span>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}

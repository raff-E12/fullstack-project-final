// utilities/MobileCartModal.jsx
import { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../style/MobileCartModal.css";

export default function MobileCartModal({ isMobile = true, closeMenus }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();

  const cartItemCount = cartItems.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  useEffect(() => {
    if (isCartOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }

    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isCartOpen]);

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleGoToCart = () => {
    navigate("/cart");
    setIsCartOpen(false);
    if (closeMenus) closeMenus();
  };

  const handleClose = () => {
    setIsCartOpen(false);
  };

  const renderCartItems = () => (
    <>
      <div className="mobile-cart-items-container">
        {cartItems.map((item, index) => (
          <div
            key={index}
            className="d-flex align-items-start py-3 border-bottom"
          >
            <img
              src={item.image_url}
              alt={item.name}
              width={60}
              height={60}
              className="flex-shrink-0 rounded object-fit-cover"
            />
            <div className="flex-grow-1 ms-3 mobile-cart-item-text">
              <h6 className="fw-medium mb-2 text-truncate">{item.name}</h6>
              <div className="d-flex justify-content-between align-items-center">
                <span className="text-muted">Quantità: {item.quantity}</span>
                <strong className="fs-5">{item.price} €</strong>
              </div>
              <div className="quantity-controls">
                  <button
                    className="btn quantity-btn"
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.selectedSize,
                        item.quantity - 1
                      )
                    }
                    disabled={item.quantity <= 1}
                    title="Diminuisci quantità"
                  >
                    −
                  </button>
                  <button
                    className="btn quantity-btn"
                    onClick={() =>
                      updateQuantity(
                        item.id,
                        item.selectedSize,
                        item.quantity + 1
                      )
                    }
                    title="Aumenta quantità"
                  >
                    +
                  </button>
                  <button
                    className="btn quantity-btn remove-btn"
                    onClick={() =>
                      removeFromCart(item.id, item.selectedSize)
                    }
                    title="Rimuovi dal carrello"
                  >
                    <i className="bi bi-trash3"></i>
                  </button>
                </div>
            </div>
          </div>
        ))}
      </div>
      <div className="flex-shrink-0 p-3 bg-light border-top">
        <div className="d-flex justify-content-between align-items-center mb-3">
          <h5 className="mb-0">Totale:</h5>
          <h4 className="mb-0 fw-bold text-primary">
            {cartItems
              .reduce((total, item) => total + item.price * item.quantity, 0)
              .toFixed(2)}{" "}
            €
          </h4>
        </div>
        <button
          className="btn btn-primary w-100 py-2 fs-5"
          onClick={handleGoToCart}
        >
          Vai al Checkout
        </button>
      </div>
    </>
  );

  const renderEmptyCart = () => (
    <div className="d-flex flex-column align-items-center justify-content-center h-100">
      <i className="bi bi-bag fs-1 text-muted mb-3"></i>
      <p className="fs-4 text-muted fst-italic">Il carrello è vuoto</p>
    </div>
  );

  return (
    <>
      {/* Pulsante carrello nell'header */}
      <button
        type="button"
        className="nav-link btn p-0 d-inline-flex align-items-center justify-content-center position-relative"
        onClick={handleCartToggle}
        title="Carrello"
      >
        <i className="bi bi-bag fs-4"></i>
        {cartItemCount > 0 && (
          <span className="position-absolute top-0 start-100 translate-middle badge rounded-pill bg-danger">
            {cartItemCount}
            <span className="visually-hidden">prodotti nel carrello</span>
          </span>
        )}
      </button>

      {/* Modal a schermo intero - renderizzato nel body per evitare limitazioni CSS */}
      {isCartOpen &&
        createPortal(
          <>
            {/* Backdrop per chiudere il modal cliccando fuori */}
            <div className="mobile-cart-backdrop" onClick={handleClose}></div>

            {/* Modal */}
            <div className="mobile-cart-modal">
              {/* Header del modal */}
              <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-light flex-shrink-0">
                <h4 className="mb-0 fw-bold">Carrello ({cartItemCount})</h4>
                <button
                  type="button"
                  className="btn-close"
                  onClick={handleClose}
                  aria-label="Chiudi carrello"
                ></button>
              </div>

              {/* Contenuto del carrello */}
              <div className="flex-fill d-flex flex-column">
                {cartItems.length > 0 ? renderCartItems() : renderEmptyCart()}
              </div>
            </div>
          </>,
          document.body
        )}

      {/* Backup fallback per browser che non supportano portals */}
      {isCartOpen && !createPortal && (
        <div className="mobile-cart-fallback">
          {/* Header del modal */}
          <div className="d-flex justify-content-between align-items-center p-3 border-bottom bg-light">
            <h4 className="mb-0 fw-bold">Carrello ({cartItemCount})</h4>
            <button
              type="button"
              className="btn-close"
              onClick={handleClose}
              aria-label="Chiudi carrello"
            ></button>
          </div>

          {/* Contenuto del carrello */}
          <div className="flex-fill d-flex flex-column">
            {cartItems.length > 0 ? renderCartItems() : renderEmptyCart()}
          </div>
        </div>
      )}

      {/* Backdrop per chiudere il modal cliccando fuori (opzionale) */}
      {isCartOpen && (
        <div
          className="mobile-cart-fallback-backdrop"
          onClick={handleClose}
        ></div>
      )}
    </>
  );
}

// utilities/CartDropdown.jsx
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function CartDropdown({ isMobile = false, closeMenus }) {
  const [isCartOpen, setIsCartOpen] = useState(false);
  const { cartItems, updateQuantity, removeFromCart } = useCart();
  const navigate = useNavigate();
  const cartRef = useRef(null);

  const cartItemCount = cartItems.reduce(
    (total, item) => total + (item.quantity || 0),
    0
  );

  useEffect(() => {
    function handleClickOutside(event) {
      if (cartRef.current && !cartRef.current.contains(event.target)) {
        setIsCartOpen(false);
      }
    }

    if (isCartOpen && !isMobile) {
      document.addEventListener("mousedown", handleClickOutside);
      return () => {
        document.removeEventListener("mousedown", handleClickOutside);
      };
    }
  }, [isCartOpen, isMobile]);

  const handleCartToggle = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleGoToCart = () => {
    navigate("/cart");
    setIsCartOpen(false);
    closeMenus();
  };

  const renderCartItems = () => (
    <>
      <div className="mini-cart-items-list flex-fill overflow-auto">
        {cartItems.map((item, index) => (
          <div key={index} className="mini-cart-item d-flex align-items-start">
            <img
              src={item.image_url}
              alt={item.name}
              width={40}
              className="flex-shrink-0 rounded"
            />
            <div
              className="mini-cart-item-info flex-grow-1 ms-3"
              style={{ minWidth: 0 }}
            >
              <span className="d-block fw-medium mb-1 text-truncate">
                {item.name}
              </span>
              <div className="mini-cart-item-details d-flex justify-content-between align-items-center small">
                <span>x{item.quantity}</span>
                <strong>{item.price} €</strong>
              </div>
              
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
        ))}
      </div>
      <div
        className={`mini-cart-footer flex-shrink-0 ${isMobile ? "mt-2" : ""}`}
      >
        <div className="mini-cart-total text-center fw-bold mb-2">
          Totale:{" "}
          {cartItems
            .reduce((total, item) => total + item.price * item.quantity, 0)
            .toFixed(2)}{" "}
          €
        </div>
        <button className="btn btn-primary w-100" onClick={handleGoToCart}>
          Vai al Carrello
        </button>
      </div>
    </>
  );

  const renderEmptyCart = () => (
    <div className="mini-cart-empty text-center py-4 px-3">
      <p className="m-0 fst-italic">Il carrello è vuoto</p>
    </div>
  );

  if (isMobile) {
    return (
      <div className="mobile-cart-container">
        <button
          type="button"
          className="nav-link btn p-0 d-inline-flex align-items-center mb-2"
          onClick={handleCartToggle}
        >
          Carrello
          {cartItemCount > 0 && (
            <span className="cart-badge position-relative ms-2 d-flex align-items-center justify-content-center fw-semibold">
              {cartItemCount}
            </span>
            
          )}
        </button>

        {isCartOpen && (
          <div className="mobile-mini-cart d-flex flex-column mt-2 ms-3">
            {cartItems.length > 0 ? renderCartItems() : renderEmptyCart()}
          </div>
        )}
      </div>
    );
  }

  return (
    <div
      className="cart-container position-relative d-flex align-items-center"
      ref={cartRef}
    >
      <button
        type="button"
        className="nav-link btn p-0 d-inline-flex align-items-center justify-content-center cart-toggle-btn position-relative"
        onClick={handleCartToggle}
        title="Carrello"
      >
        <i className="bi bi-bag fs-5"></i>
        {cartItemCount > 0 && (
          <span className="cart-badge position-absolute d-flex align-items-center justify-content-center fw-semibold">
            {cartItemCount}
          </span>
        )}
      </button>

      {isCartOpen && (
        <div className="mini-cart-dropdown position-absolute d-flex flex-column">
          {cartItems.length > 0 ? renderCartItems() : renderEmptyCart()}
        </div>
      )}
    </div>
  );
}

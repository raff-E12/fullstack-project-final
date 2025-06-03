// ============================================
// CARTPAGE COMPLETA USANDO TABELLE ESISTENTI
// ============================================

import { useState, useEffect } from "react";
import { NavLink, Link } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { useInventory } from "../hooks/useInventory";

const endPointDiscount = "http://localhost:3000/checkout/discount-code";

// Componente per il form di checkout integrato (SEMPLIFICATO)
const CheckoutForm = ({
  cartItems,
  totalAmount,
  onOrderSuccess,
  onCancel,
  discountInfo,
}) => {
  const [formData, setFormData] = useState({
    name: "",
    surname: "",
    email: "",
    phone: "",
    billing_address: "",
    shipping_address: "",
    country: "italia",
    same_address: true,
  });

  const [formErrors, setFormErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const { processOrder } = useInventory();
  const { clearCart } = useCart();

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));

    // Rimuovi errore quando l'utente corregge
    if (formErrors[name]) {
      setFormErrors((prev) => ({
        ...prev,
        [name]: "",
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    // Nome e cognome
    if (!formData.name || formData.name.length < 3) {
      errors.name = "Il nome deve essere di almeno 3 caratteri";
    }
    if (!formData.surname || formData.surname.length < 3) {
      errors.surname = "Il cognome deve essere di almeno 3 caratteri";
    }

    // Email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!formData.email || !emailRegex.test(formData.email)) {
      errors.email = "Inserisci un indirizzo email valido";
    }

    // Telefono
    if (
      !formData.phone ||
      formData.phone.length < 7 ||
      formData.phone.length > 20
    ) {
      errors.phone = "Il telefono deve essere tra 7 e 20 cifre";
    }

    // Indirizzo fatturazione
    if (!formData.billing_address || formData.billing_address.length < 10) {
      errors.billing_address = "L'indirizzo deve essere di almeno 10 caratteri";
    }

    // Indirizzo spedizione (se diverso)
    if (!formData.same_address) {
      if (!formData.shipping_address || formData.shipping_address.length < 10) {
        errors.shipping_address =
          "L'indirizzo di spedizione deve essere di almeno 10 caratteri";
      }
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setIsSubmitting(true);

    try {
      // Prepara i dati dell'ordine
      const orderInfo = {
        ...formData,
        amount: totalAmount,
        shipping_address: formData.same_address
          ? formData.billing_address
          : formData.shipping_address,
        discount_applied: discountInfo.validPromo
          ? discountInfo.appliedPromoPercentage
          : 0,
        discount_code: discountInfo.discountCode || null,
        items_count: cartItems.length,
        total_quantity: cartItems.reduce((sum, item) => sum + item.quantity, 0),
        order_date: new Date().toISOString(),
      };

      // Processa l'ordine (aggiorna inventory)
      const result = await processOrder(cartItems, orderInfo);

      if (result.success) {
        // Svuota il carrello
        clearCart();

        // Notifica successo
        onOrderSuccess(result);
      } else {
        throw new Error(
          result.message || "Errore nel processamento dell'ordine"
        );
      }
    } catch (error) {
      console.error("Errore invio ordine:", error);
      setFormErrors({
        submit:
          error.message || "Errore nel processamento dell'ordine. Riprova.",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div
      className="checkout-form-container"
      style={{
        backgroundColor: "#f8f9fa",
        borderRadius: "12px",
        padding: "1.5rem",
        border: "2px solid #e9ecef",
      }}
    >
      <div className="d-flex justify-content-between align-items-center mb-4">
        <h5 className="fw-bold mb-0">Completa il tuo ordine</h5>
        <button
          type="button"
          className="btn-close"
          onClick={onCancel}
          disabled={isSubmitting}
        ></button>
      </div>

      <form onSubmit={handleSubmit}>
        {/* Informazioni personali */}
        <div className="row mb-4">
          <div className="col-12">
            <h6 className="fw-semibold mb-3 text-primary">
              Informazioni Personali
            </h6>
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Nome *</label>
            <input
              type="text"
              name="name"
              className={`form-control ${formErrors.name ? "is-invalid" : ""}`}
              value={formData.name}
              onChange={handleInputChange}
              disabled={isSubmitting}
              placeholder="Il tuo nome"
            />
            {formErrors.name && (
              <div className="invalid-feedback">{formErrors.name}</div>
            )}
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Cognome *</label>
            <input
              type="text"
              name="surname"
              className={`form-control ${
                formErrors.surname ? "is-invalid" : ""
              }`}
              value={formData.surname}
              onChange={handleInputChange}
              disabled={isSubmitting}
              placeholder="Il tuo cognome"
            />
            {formErrors.surname && (
              <div className="invalid-feedback">{formErrors.surname}</div>
            )}
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Email *</label>
            <input
              type="email"
              name="email"
              className={`form-control ${formErrors.email ? "is-invalid" : ""}`}
              value={formData.email}
              onChange={handleInputChange}
              disabled={isSubmitting}
              placeholder="la-tua-email@esempio.com"
            />
            {formErrors.email && (
              <div className="invalid-feedback">{formErrors.email}</div>
            )}
          </div>
          <div className="col-md-6 mb-3">
            <label className="form-label">Telefono *</label>
            <input
              type="tel"
              name="phone"
              className={`form-control ${formErrors.phone ? "is-invalid" : ""}`}
              value={formData.phone}
              onChange={handleInputChange}
              disabled={isSubmitting}
              placeholder="+39 123 456 7890"
            />
            {formErrors.phone && (
              <div className="invalid-feedback">{formErrors.phone}</div>
            )}
          </div>
        </div>

        {/* Indirizzi */}
        <div className="row mb-4">
          <div className="col-12">
            <h6 className="fw-semibold mb-3 text-primary">Indirizzi</h6>
          </div>
          <div className="col-12 mb-3">
            <label className="form-label">Indirizzo di Fatturazione *</label>
            <textarea
              name="billing_address"
              className={`form-control ${
                formErrors.billing_address ? "is-invalid" : ""
              }`}
              value={formData.billing_address}
              onChange={handleInputChange}
              disabled={isSubmitting}
              rows="3"
              placeholder="Via, numero civico, città, CAP, provincia"
            />
            {formErrors.billing_address && (
              <div className="invalid-feedback">
                {formErrors.billing_address}
              </div>
            )}
          </div>

          <div className="col-12 mb-3">
            <div className="form-check">
              <input
                type="checkbox"
                name="same_address"
                className="form-check-input"
                checked={formData.same_address}
                onChange={handleInputChange}
                disabled={isSubmitting}
              />
              <label className="form-check-label">
                L'indirizzo di spedizione è uguale a quello di fatturazione
              </label>
            </div>
          </div>

          {!formData.same_address && (
            <div className="col-12 mb-3">
              <label className="form-label">Indirizzo di Spedizione *</label>
              <textarea
                name="shipping_address"
                className={`form-control ${
                  formErrors.shipping_address ? "is-invalid" : ""
                }`}
                value={formData.shipping_address}
                onChange={handleInputChange}
                disabled={isSubmitting}
                rows="3"
                placeholder="Via, numero civico, città, CAP, provincia"
              />
              {formErrors.shipping_address && (
                <div className="invalid-feedback">
                  {formErrors.shipping_address}
                </div>
              )}
            </div>
          )}

          <div className="col-md-6 mb-3">
            <label className="form-label">Paese *</label>
            <select
              name="country"
              className="form-select"
              value={formData.country}
              onChange={handleInputChange}
              disabled={isSubmitting}
            >
              <option value="italia">Italia</option>
              <option value="francia">Francia</option>
              <option value="germania">Germania</option>
              <option value="spagna">Spagna</option>
              <option value="austria">Austria</option>
              <option value="svizzera">Svizzera</option>
            </select>
          </div>
        </div>

        {/* Errore generale */}
        {formErrors.submit && (
          <div className="alert alert-danger mb-4">
            <i className="bi bi-exclamation-triangle me-2"></i>
            {formErrors.submit}
          </div>
        )}

        {/* Buttons */}
        <div className="d-flex gap-3">
          <button
            type="button"
            className="btn btn-outline-secondary"
            onClick={onCancel}
            disabled={isSubmitting}
          >
            Torna al Carrello
          </button>
          <button
            type="submit"
            className="btn btn-primary flex-grow-1"
            disabled={isSubmitting}
          >
            {isSubmitting ? (
              <>
                <span className="spinner-border spinner-border-sm me-2"></span>
                Processando...
              </>
            ) : (
              <>
                <i className="bi bi-credit-card me-2"></i>
                Conferma Ordine - €{totalAmount.toFixed(2)}
              </>
            )}
          </button>
        </div>
      </form>
    </div>
  );
};

// Componente per mostrare problemi di disponibilità
const AvailabilityWarning = ({ unavailableItems, onRecheck }) => {
  if (unavailableItems.length === 0) return null;

  return (
    <div className="alert alert-warning mb-4">
      <div className="d-flex align-items-start">
        <i className="bi bi-exclamation-triangle-fill me-3 text-warning fs-5"></i>
        <div className="flex-grow-1">
          <h6 className="fw-bold mb-2">
            Attenzione: Alcuni prodotti non sono più disponibili
          </h6>
          <ul className="mb-3">
            {unavailableItems.map((item, index) => (
              <li key={index} className="mb-1">
                <strong>{item.name}</strong> - Taglia {item.size}:{" "}
                {item.message}
              </li>
            ))}
          </ul>
          <button
            className="btn btn-outline-warning btn-sm"
            onClick={onRecheck}
          >
            <i className="bi bi-arrow-clockwise me-1"></i>
            Ricontrolla Disponibilità
          </button>
        </div>
      </div>
    </div>
  );
};

// Componente principale CartPage
export default function CartPage() {
  const { cartItems, removeFromCart, updateQuantity } = useCart();
  const { checkCartAvailability } = useInventory();

  const [discountCode, setDiscountCode] = useState("");
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [validPromo, setValidPromo] = useState(false);
  const [appliedPromoPercentage, setAppliedPromoPercentage] = useState(0);
  const [promoMessage, setPromoMessage] = useState("");

  const [availabilityStatus, setAvailabilityStatus] = useState({
    checked: false,
    allAvailable: true,
    unavailableItems: [],
  });

  const [isCheckingAvailability, setIsCheckingAvailability] = useState(false);

  const today = new Date();

  // Funzione per controllare disponibilità del carrello
  const checkCartItemsAvailability = async () => {
    if (cartItems.length === 0) return;

    setIsCheckingAvailability(true);

    try {
      const result = await checkCartAvailability(cartItems);

      if (result.success) {
        const unavailableItems = result.items
          .filter((item) => !item.available)
          .map((item) => {
            const cartItem = cartItems.find(
              (ci) => ci.id === item.productId && ci.selectedSize === item.size
            );
            return {
              ...item,
              name: cartItem?.name || "Prodotto",
              size: item.size,
              message: item.message,
            };
          });

        setAvailabilityStatus({
          checked: true,
          allAvailable: result.allAvailable,
          unavailableItems: unavailableItems,
        });
      }
    } catch (error) {
      console.error("Errore controllo disponibilità:", error);
      setAvailabilityStatus({
        checked: true,
        allAvailable: false,
        unavailableItems: [
          {
            name: "Errore generale",
            size: "",
            message: "Impossibile verificare la disponibilità. Riprova.",
          },
        ],
      });
    } finally {
      setIsCheckingAvailability(false);
    }
  };

  // Controlla disponibilità quando il carrello cambia
  useEffect(() => {
    if (cartItems.length > 0) {
      checkCartItemsAvailability();
    } else {
      setAvailabilityStatus({
        checked: false,
        allAvailable: true,
        unavailableItems: [],
      });
    }
  }, [cartItems]);

  // Calcolo del subtotale con eventuali sconti individuali
  const calculateSubtotal = () => {
    let subtotal = 0;

    for (let i = 0; i < cartItems.length; i++) {
      const item = cartItems[i];
      const price = parseFloat(item.price);
      const quantity = parseInt(item.quantity);
      const start = new Date(item.start_discount);
      const end = new Date(item.end_discount);

      let finalPrice = price;
      if (
        item.is_visible_prod === 1 &&
        today >= start &&
        today <= end &&
        item.discount
      ) {
        const discount = parseFloat(item.discount);
        finalPrice = price - (price * discount) / 100;
      }

      subtotal += finalPrice * quantity;
    }

    return subtotal;
  };

  const subtotal = calculateSubtotal();

  // Spedizione gratuita sopra i 100€, altrimenti 5.99
  const shippingCost = subtotal >= 100 ? 0 : 5.99;

  // Totale con eventuale codice sconto
  let total = subtotal + shippingCost;
  if (validPromo && appliedPromoPercentage > 0) {
    total -= (total * appliedPromoPercentage) / 100;
  }

  const handleDiscountSubmit = (e) => {
    e.preventDefault();
    setPromoMessage("Verifica codice...");

    axios
      .get(endPointDiscount)
      .then((res) => {
        const fetchedPromos = res.data.promos;
        const foundPromo = fetchedPromos.find(
          (promo) =>
            promo.code === discountCode &&
            promo.is_valid === 1 &&
            new Date(promo.start_discount) <= today &&
            new Date(promo.end_discount) >= today
        );

        if (foundPromo) {
          const discountValue = parseFloat(foundPromo.discount);
          if (!isNaN(discountValue)) {
            setValidPromo(true);
            setAppliedPromoPercentage(discountValue);
            setPromoMessage("Codice sconto applicato!");
          } else {
            setValidPromo(false);
            setAppliedPromoPercentage(0);
            setPromoMessage("Errore: valore sconto non valido.");
          }
        } else {
          setValidPromo(false);
          setAppliedPromoPercentage(0);
          setPromoMessage("Codice sconto non valido o scaduto.");
        }
      })
      .catch((err) => {
        console.error("Errore nel recupero codici sconto:", err);
        setPromoMessage("Errore nella verifica del codice.");
      });
  };

  const handleCheckoutSuccess = (orderData) => {
    console.log("Ordine completato:", orderData);
    setShowCheckoutForm(false);

    // Mostra messaggio di successo
    alert(`Ordine completato con successo! 
Numero ordine: ${orderData.orderId || "N/A"}
Totale: €${orderData.totalAmount || total.toFixed(2)}
Riceverai una email di conferma.`);
  };

  const handleCheckoutCancel = () => {
    setShowCheckoutForm(false);
  };

  const handleProceedToCheckout = () => {
    if (!availabilityStatus.allAvailable) {
      alert(
        "Non puoi procedere al checkout finché ci sono prodotti non disponibili nel carrello."
      );
      return;
    }
    setShowCheckoutForm(true);
  };

  return (
    <div className="container py-4">
      <h1 className="h2 fw-bold text-center text-md-start mb-4">
        Il tuo Carrello
      </h1>

      {cartItems.length === 0 ? (
        <div className="text-center py-5">
          <i className="bi bi-cart-x display-1 text-muted mb-4" />
          <h3 className="text-muted mb-3">Il carrello è vuoto</h3>
          <p className="text-muted mb-4">
            Aggiungi alcuni prodotti per iniziare
          </p>
          <Link to="/products" className="btn btn-primary btn-lg">
            Continua lo Shopping
          </Link>
        </div>
      ) : (
        <div className="row">
          {/* Lista prodotti */}
          <div className="col-lg-8">
            {/* Warning per disponibilità */}
            <AvailabilityWarning
              unavailableItems={availabilityStatus.unavailableItems}
              onRecheck={checkCartItemsAvailability}
            />

            {/* Indicatore controllo disponibilità */}
            {isCheckingAvailability && (
              <div className="alert alert-info mb-4">
                <div className="d-flex align-items-center">
                  <span className="spinner-border spinner-border-sm me-3"></span>
                  Controllo disponibilità prodotti...
                </div>
              </div>
            )}

            <div className="card shadow-sm mb-4">
              <div className="card-body p-0">
                {cartItems.map((item, index) => {
                  const price = parseFloat(item.price);
                  const quantity = parseInt(item.quantity);
                  const start = new Date(item.start_discount);
                  const end = new Date(item.end_discount);

                  let finalPrice = price;
                  let hasDiscount = false;
                  if (
                    item.is_visible_prod === 1 &&
                    today >= start &&
                    today <= end &&
                    item.discount
                  ) {
                    const discount = parseFloat(item.discount);
                    finalPrice = price - (price * discount) / 100;
                    hasDiscount = true;
                  }

                  // Trova se questo item ha problemi di disponibilità
                  const availabilityIssue =
                    availabilityStatus.unavailableItems.find(
                      (unavailable) =>
                        unavailable.productId === item.id &&
                        unavailable.size === item.selectedSize
                    );

                  return (
                    <div key={`${item.id}_${item.selectedSize}`}>
                      <div
                        className={`p-4 cart-item-card ${
                          availabilityIssue ? "border-warning" : ""
                        }`}
                        style={{
                          transition: "all 0.2s ease",
                          border: availabilityIssue
                            ? "1px solid #ffc107"
                            : "1px solid #e9ecef",
                        }}
                      >
                        <div className="row align-items-center">
                          <div className="col-md-3 col-4">
                            <div className="position-relative">
                              <img
                                src={item.image_url}
                                alt={item.name}
                                className="img-fluid rounded"
                                style={{
                                  maxHeight: "120px",
                                  objectFit: "cover",
                                  width: "100%",
                                }}
                              />
                              {availabilityIssue && (
                                <span className="position-absolute top-0 start-0 badge bg-warning text-dark">
                                  <i className="bi bi-exclamation-triangle"></i>
                                </span>
                              )}
                            </div>
                          </div>

                          <div className="col-md-5 col-8">
                            <Link
                              to={`/products/${item.slug}`}
                              className="text-decoration-none text-dark"
                            >
                              <h5 className="fw-bold mb-2">{item.name}</h5>
                              <p className="text-muted small mb-2">
                                {item.description}
                              </p>
                            </Link>

                            <div className="d-flex align-items-center mb-2 flex-wrap gap-2">
                              <span className="badge bg-light text-dark border">
                                Taglia: {item.selectedSize}
                              </span>
                              <span className="badge bg-light text-dark border">
                                Qty: {quantity}
                              </span>
                              {hasDiscount && (
                                <span className="badge bg-success">
                                  -{item.discount}%
                                </span>
                              )}
                            </div>

                            {availabilityIssue && (
                              <div className="alert alert-warning py-2 px-3 mb-2 small">
                                <i className="bi bi-exclamation-triangle me-1"></i>
                                {availabilityIssue.message}
                              </div>
                            )}

                            <div className="d-flex gap-2 quantity-controls">
                              <button
                                className="btn btn-outline-secondary btn-sm"
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    item.selectedSize,
                                    item.quantity - 1
                                  )
                                }
                                disabled={item.quantity <= 1}
                                title="Diminuisci quantità"
                                style={{
                                  minWidth: "35px",
                                  height: "35px",
                                  padding: "0",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                −
                              </button>
                              <span className="d-flex align-items-center px-3 bg-light border rounded">
                                {item.quantity}
                              </span>
                              <button
                                className="btn btn-outline-secondary btn-sm"
                                onClick={() =>
                                  updateQuantity(
                                    item.id,
                                    item.selectedSize,
                                    item.quantity + 1
                                  )
                                }
                                title="Aumenta quantità"
                                style={{
                                  minWidth: "35px",
                                  height: "35px",
                                  padding: "0",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                +
                              </button>
                              <button
                                className="btn btn-outline-danger btn-sm ms-2"
                                onClick={() =>
                                  removeFromCart(item.id, item.selectedSize)
                                }
                                title="Rimuovi dal carrello"
                                style={{
                                  minWidth: "35px",
                                  height: "35px",
                                  padding: "0",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                }}
                              >
                                <i className="bi bi-trash3"></i>
                              </button>
                            </div>
                          </div>

                          <div className="col-md-4 text-md-end mt-3 mt-md-0">
                            {hasDiscount ? (
                              <>
                                <div className="text-muted text-decoration-line-through small">
                                  €{price.toFixed(2)}
                                </div>
                                <div className="h5 fw-bold text-success mb-0">
                                  €{finalPrice.toFixed(2)}
                                </div>
                                <div className="small text-muted">
                                  Totale: €{(finalPrice * quantity).toFixed(2)}
                                </div>
                              </>
                            ) : (
                              <>
                                <div className="h5 fw-bold mb-0">
                                  €{price.toFixed(2)}
                                </div>
                                <div className="small text-muted">
                                  Totale: €{(price * quantity).toFixed(2)}
                                </div>
                              </>
                            )}
                          </div>
                        </div>
                      </div>
                      {index < cartItems.length - 1 && <hr className="m-0" />}
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          {/* Riepilogo ordine */}
          <div className="col-lg-4 mt-4 mt-lg-0">
            <div className="card shadow-sm">
              <div className="card-header">
                <h5
                  className="fw-bold mb-0"
                  style={{
                    background:
                      "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                    color: "white",
                    borderRadius: "12px",
                    padding: "1rem",
                    margin: "-1rem -1rem 0 -1rem",
                  }}
                >
                  {showCheckoutForm ? "Checkout" : "Riepilogo Ordine"}
                </h5>
              </div>
              <div className="card-body">
                {!showCheckoutForm ? (
                  <>
                    <div
                      className="d-flex justify-content-between mb-2 summary-row"
                      style={{
                        borderBottom: "1px solid #dee2e6",
                        paddingBottom: "0.5rem",
                      }}
                    >
                      <span>Subtotale prodotti:</span>
                      <span>€{subtotal.toFixed(2)}</span>
                    </div>
                    <div
                      className="d-flex justify-content-between mb-2 summary-row"
                      style={{
                        borderBottom: "1px solid #dee2e6",
                        paddingBottom: "0.5rem",
                      }}
                    >
                      <span>Spedizione:</span>
                      <span>
                        {shippingCost === 0
                          ? "GRATIS"
                          : `€${shippingCost.toFixed(2)}`}
                      </span>
                    </div>

                    {validPromo && appliedPromoPercentage > 0 && (
                      <div
                        className="d-flex justify-content-between mb-2 text-success fw-bold summary-row"
                        style={{
                          borderBottom: "1px solid #dee2e6",
                          paddingBottom: "0.5rem",
                        }}
                      >
                        <span>Sconto promo:</span>
                        <span>
                          -€
                          {(
                            ((subtotal + shippingCost) *
                              appliedPromoPercentage) /
                            100
                          ).toFixed(2)}
                        </span>
                      </div>
                    )}

                    <hr />

                    <div
                      className="d-flex justify-content-between mb-4 summary-row"
                      style={{
                        fontWeight: "bold",
                        fontSize: "1.2rem",
                        marginTop: "0.5rem",
                        paddingTop: "1rem",
                        borderTop: "2px solid #dee2e6",
                      }}
                    >
                      <span className="h5 fw-bold">Totale:</span>
                      <span className="h5 fw-bold">€{total.toFixed(2)}</span>
                    </div>

                    <div className="mb-4">
                      <label className="form-label small fw-semibold">
                        Codice Sconto
                      </label>
                      <form onSubmit={handleDiscountSubmit}>
                        <div className="input-group mb-2">
                          <input
                            type="text"
                            className="form-control"
                            placeholder="Inserisci codice"
                            value={discountCode}
                            onChange={(e) => setDiscountCode(e.target.value)}
                          />
                          <button
                            className="btn btn-outline-secondary"
                            type="submit"
                          >
                            Applica
                          </button>
                        </div>

                        {promoMessage && (
                          <small
                            className={`form-text ${
                              validPromo ? "text-success" : "text-danger"
                            }`}
                          >
                            {promoMessage}
                          </small>
                        )}
                      </form>
                    </div>

                    <div className="d-grid">
                      <button
                        onClick={handleProceedToCheckout}
                        className="btn btn-primary btn-lg"
                        disabled={
                          !availabilityStatus.allAvailable ||
                          isCheckingAvailability
                        }
                      >
                        {!availabilityStatus.allAvailable ? (
                          <>
                            <i className="bi bi-exclamation-triangle me-2"></i>
                            Risolvi Problemi Disponibilità
                          </>
                        ) : isCheckingAvailability ? (
                          <>
                            <span className="spinner-border spinner-border-sm me-2"></span>
                            Controllo...
                          </>
                        ) : (
                          <>
                            <i className="bi bi-credit-card me-2"></i>
                            Procedi al Checkout
                          </>
                        )}
                      </button>
                    </div>

                    <div className="text-center mt-3">
                      <Link
                        to="/products"
                        className="text-decoration-none small text-dark"
                      >
                        ← Continua lo Shopping
                      </Link>
                    </div>
                  </>
                ) : (
                  // Form di checkout integrato
                  <CheckoutForm
                    cartItems={cartItems}
                    totalAmount={total}
                    onOrderSuccess={handleCheckoutSuccess}
                    onCancel={handleCheckoutCancel}
                    discountInfo={{
                      validPromo,
                      appliedPromoPercentage,
                      discountCode,
                    }}
                  />
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

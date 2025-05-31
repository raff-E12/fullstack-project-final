import { NavLink } from "react-router-dom";
import axios from "axios";
import { useCart } from "../context/CartContext";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import CheckOutForm from "../components/CheckOutForm";

const endPointDiscount = "http://localhost:3000/checkout/discount-code"

export default function CartPage() {
  const { cartItems } = useCart();
  const [discountCode, setDiscountCode] = useState("");
  const [showCheckoutForm, setShowCheckoutForm] = useState(false);
  const [validPromo, setValidPromo] = useState(false);
  const [appliedPromoPercentage, setAppliedPromoPercentage] = useState(0);
  const [promoMessage, setPromoMessage] = useState("");

  let subtotal = 0;
  const shippingCost = 5.99;
  const today = new Date();


  for (let i = 0; i < cartItems.length; i++) {
    const element = cartItems[i];
    const price = parseFloat(element.price);
    const quantity = parseInt(element.quantity);

    const start = new Date(element.start_discount);
    const end = new Date(element.end_discount);

    let finalPrice = price;

    if (today >= start && today <= end) {
      const discount = parseFloat(element.discount);
      finalPrice = price - (price * discount) / 100;
    }

    subtotal += finalPrice * quantity;
  }

  let total = subtotal + (cartItems.length > 0 ? shippingCost : 0);
  if (validPromo && appliedPromoPercentage > 0) {
    total -= (total * appliedPromoPercentage) / 100;
  }

  const handleDiscountSubmit = (e) => {
    e.preventDefault();
    setPromoMessage("Verifica codice..."); 

    axios.get(endPointDiscount)
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
            setPromoMessage("Errore: valore sconto della promo non valido.");
          }
        } else {
    
          setValidPromo(false);
          setAppliedPromoPercentage(0);
          setPromoMessage("Codice sconto non valido o scaduto.");
        }
      })
      .catch((err) => {
        console.error("Errore nel recupero dei codici sconto:", err);
        setValidPromo(false);
        setAppliedPromoPercentage(0);
        setPromoMessage("Errore nella verifica del codice.");
      });
  };

  const handleCheckoutSuccess = (orderData) => {
   
    console.log("Ordine completato:", orderData);
    setShowCheckoutForm(false);
  };

  const handleCheckoutCancel = () => {
    setShowCheckoutForm(false);
  };

  return (
    <div className="container py-4">
      {/* Header */}
      <div className="row mb-4">
        <div className="col-12">
          <h1 className="h2 fw-bold text-center text-md-start">
            Il tuo Carrello
          </h1>
        </div>
      </div>

      {cartItems.length === 0 ? (
        <div className="row">
          <div className="col-12 text-center py-5">
            <div className="mb-4">
              <i className="bi bi-cart-x display-1 text-muted"></i>
            </div>
            <h3 className="text-muted mb-3">Il carrello è vuoto</h3>
            <p className="text-muted mb-4">
              Aggiungi alcuni prodotti per iniziare
            </p>
            <Link to="/products" className="btn btn-primary btn-lg">
              Continua lo Shopping
            </Link>
          </div>
        </div>
      ) : (
        <div className="row">
          
          <div className="col-lg-8">
            <div className="card shadow-sm">
              <div className="card-body p-0">
                {cartItems.map((item, index) => {
                  const price = parseFloat(item.price);
                  const quantity = parseInt(item.quantity);
                  const start = new Date(item.start_discount);
                  const end = new Date(item.end_discount);
                  const isValid =item.is_valid

                  let finalPrice = price;
                  let hasDiscount = false;

                  if (isValid === 1 && today >= start && today <= end) {
                    const discount = parseFloat(item.discount);
                    finalPrice = price - (price * discount) / 100;
                    hasDiscount = true;
                  }

                  return (
                    <div key={index}>
                      <div className="p-4">
                        <div className="row align-items-center">
                        
                          <div className="col-md-3 col-4 mb-3 mb-md-0">
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
                          </div>

                         
                          <div className="col-md-5 col-8">
                            <Link
                              to={`/products/${item.slug}`}
                              className="text-decoration-none text-dark"
                            >
                              <h5 className="fw-bold mb-2 text-dark">
                                {item.name}
                              </h5>
                              <p className="text-muted small mb-2">
                                {item.description}
                              </p>
                            </Link>
                            <div className="d-flex align-items-center">
                              <span className="badge bg-light text-dark border">
                                Qty: {quantity}
                              </span>
                              {hasDiscount && (
                                <span className="badge bg-success ms-2">
                                  -{item.discount}%
                                </span>
                              )}
                            </div>
                          </div>

                   
                          <div className="col-md-4 col-12 text-md-end mt-3 mt-md-0">
                            {hasDiscount ? (
                              <div>
                                <div className="text-muted text-decoration-line-through small">
                                  €{price.toFixed(2)}
                                </div>
                                <div className="h5 fw-bold text-success mb-0">
                                  €{finalPrice.toFixed(2)}
                                </div>
                                <div className="small text-muted">
                                  Totale: €{(finalPrice * quantity).toFixed(2)}
                                </div>
                              </div>
                            ) : (
                              <div>
                                <div className="h5 fw-bold mb-0">
                                  €{price.toFixed(2)}
                                </div>
                                <div className="small text-muted">
                                  Totale: €{(price * quantity).toFixed(2)}
                                </div>
                              </div>
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

          <div className="col-lg-4 mt-4 mt-lg-0">
            <div className="card shadow-sm" style={{ top: "20px" }}>
              <div className="card-header bg-light">
                <h5 className="fw-bold mb-0">
                  {showCheckoutForm ? "Checkout" : "Riepilogo Ordine"}
                </h5>
              </div>
              <div className="card-body">
                {!showCheckoutForm ? (
                  <>
                 
                    <div className="d-flex justify-content-between mb-2">
                      <span>Subtotale prodotti:</span>
                      <span>€{subtotal.toFixed(2)}</span>
                    </div>

                    {/* Spedizione */}
                    <div className="d-flex justify-content-between mb-2">
                      <span>Spedizione:</span>
                      <span>€{shippingCost.toFixed(2)}</span>
                    </div>

         
                    {validPromo && appliedPromoPercentage > 0 && (
                        <div className="d-flex justify-content-between mb-2 text-success fw-bold">
                            <span>Sconto promo:</span>
                            {/* Formula corretta per mostrare l'importo dello sconto */}
                            <span>-€{(subtotal * appliedPromoPercentage / 100).toFixed(2)}</span>
                        </div>
                    )}

                    <hr />

             
                    <div className="d-flex justify-content-between mb-4">
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
                          <small className={`form-text ${validPromo ? "text-success" : "text-danger"}`}>
                            {promoMessage}
                          </small>
                        )}
                      </form>
                    </div>

             
                    <div className="d-grid">
                      <button
                        onClick={() => setShowCheckoutForm(true)}
                        className="btn btn-primary btn-lg"
                      >
                        Procedi al Checkout
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
                  // Utilizzo del componente CheckOutForm
                  <CheckOutForm
                    amount={total}
                    onSuccess={handleCheckoutSuccess}
                    onCancel={handleCheckoutCancel}
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
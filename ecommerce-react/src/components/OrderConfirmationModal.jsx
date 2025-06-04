import "../style/OrderConfirmationModal.css";
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import axios from "axios";

function OrderConfirmationModal({ isOpen, onClose, orderCode }) {
  const [orderSlug, setOrderSlug] = useState("");

  // Sposta la funzione getOrderSlug all'interno di useEffect
  // o definiscila in modo che non venga ricreata ad ogni render
  useEffect(() => {
    // Esegui la chiamata API solo se il modale è aperto e orderCode è disponibile
    if (isOpen && orderCode) {
      axios.get(`http://localhost:3000/orders/${orderCode}`)
        .then(res => {
          setOrderSlug(res.data.orderSlug);
        })
        .catch(err => console.log(err));
    }
  }, [isOpen, orderCode]); // Aggiungi orderCode come dipendenza

  console.log(orderSlug, "orderSlug");

  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="modal">
        <h2>Il tuo Ordine è stato Completato!</h2>
        <p>
          Il tuo codice ordine è: <strong>{orderCode}</strong>
        </p>
        <p>Riceverai un e-mail di riepilogo del tuo ordine.</p>
        {/* Assicurati che orderSlug sia disponibile prima di renderizzare il link */}
        {orderSlug ? (
          <Link className="btn" to={`/orders/${orderSlug}`}>Vedi dettagli Ordine </Link>
        ) : (
          <p>Caricamento dettagli ordine...</p> // Messaggio di caricamento
        )}
        <button className="close-btn" onClick={onClose}>
          {" "}
          chiudi
        </button>
      </div>
    </div>
  );
}

export default OrderConfirmationModal;
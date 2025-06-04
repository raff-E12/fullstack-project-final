import "../style/OrderConfirmationModal.css";

function OrderConfirmationModal({ isOpen, onClose, orderCode }) {
  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="modal">
        <h2>Il tuo Ordine è stato Completato!</h2>
        <p>
          Il tuo codice ordine è: <strong>{orderCode}</strong>
        </p>
        <p>Riceverai un e-mail di riepilogo del tuo ordine.</p>
        <button className="close-btn" onClick={onClose}>
          {" "}
          chiudi
        </button>
      </div>
    </div>
  );
}

export default OrderConfirmationModal;

import "../style/OrderConfirmationModal.css";

function OrderConfirmationModal({ isOpen, onClose, orderCode }) {
  if (!isOpen) return null;

  return (
    <div className="overlay">
      <div className="modal">
        <h2>Ordine Completato!</h2>
        <p>
          Il tuo codice ordine è: <strong>{orderCode}</strong>
        </p>
        <button className="close-btn" onClick={onClose}>
          {" "}
          chiudi
        </button>
      </div>
    </div>
  );
}

export default OrderConfirmationModal;

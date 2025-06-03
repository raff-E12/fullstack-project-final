import '../style/OrderConfirmationModal.css'

function OrderConfirmationModal({ isOpen, onClose, orderCode }) {
    if (!isOpen) return null

    return (
        <div className="overlay">
            <div className="modal">
                <button className="close-btn" onClick={onClose}></button>
                <h2>Ordine Completato!</h2>
                <p>Il tuo codice ordine è: <strong>{orderCode}</strong></p>
            </div>
        </div>

    )
}

export default OrderConfirmationModal
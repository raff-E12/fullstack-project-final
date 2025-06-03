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

export default AvailabilityWarning;

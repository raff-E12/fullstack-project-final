
export default function Newsletter() {
    return (
        <div className="mb-4">
            <h5 className="mb-3">Subscribe</h5>
            <p className="mb-3">
                Ricevi uno sconto del 10% iscrivendoti alla newsletter
            </p>
            <div className="input-group mb-3">
                <input
                    type="email"
                    className="form-control"
                    placeholder="Inserisci la tua email qui per uno sconto del 10%"
                    aria-label="Email"
                />
                <button className="btn btn-primary" type="button">
                    <i className="bi bi-envelope me-1"></i>Iscriviti
                </button>
            </div>
        </div>
    )
}

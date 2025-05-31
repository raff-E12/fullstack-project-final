import { useState } from "react";
import axios from "axios";
import emailjs from "@emailjs/browser";

export default function CheckOutForm({ amount, onCancel, cartItems }) {
  console.log(cartItems, "cart Items in CheckoutFOrm")
  const endpoint = "http://localhost:3000/checkout/";
  const standardFormData = {
    name: "",
    surname: "",
    email: "",
    phone: "",
    billing_address: "",
    shipping_address: "",
    country: "",
  };

  const [formData, setFormData] = useState(standardFormData);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // const sendConfirmationEmail = () => {
  //   emailjs
  //     .send(
  //       import.meta.env.VITE_EMAILJS_SERVICE_ID,
  //       import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
  //       {
  //         name: formData.name,
  //         surname: formData.surname,
  //         email: formData.email,
  //         phone: formData.phone,
  //         amount: formData.amount,
  //         billing_address: formData.billing_address,
  //         shipping_address: formData.shipping_address,
  //         country: formData.country,
  //       },
  //       import.meta.env.VITE_EMAILJS_PUBLIC_KEY
  //     )
  //     .then((result) => {
  //       console.log("Email inviata con successo!", result.text);
  //     })
  //     .catch((error) => {
  //       console.error("Errore nell'invio dell'email:", error);
  //     });
  // };

  const handleSubmit = (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    console.log({formData, amount, cartItems})
    axios.post(endpoint, {formData, amount, cartItems})
    .then(res=> console.log(res))
    .catch(err=>console.log(err));

      // sendConfirmationEmail();

  }

  return (
    <form onSubmit={handleSubmit}>
      {/* Riepilogo rapido */}
      <div className="bg-light p-3 rounded mb-4">
        <div className="d-flex justify-content-between">
          <span className="fw-semibold">Totale da pagare:</span>
          <span className="fw-bold">€{amount?.toFixed(2)}</span>
        </div>
      </div>

      {/* Nome e Cognome in riga */}
      <div className="row mb-3">
        <div className="col-6">
          <label htmlFor="name" className="form-label small fw-semibold">
            Nome*
          </label>
          <input
            type="text"
            className="form-control"
            id="name"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
            minLength={3}
            placeholder="Nome"
            disabled={isSubmitting}
          />
        </div>
        <div className="col-6">
          <label htmlFor="surname" className="form-label small fw-semibold">
            Cognome*
          </label>
          <input
            type="text"
            className="form-control"
            id="surname"
            name="surname"
            value={formData.surname}
            onChange={handleChange}
            required
            minLength={3}
            placeholder="Cognome"
            disabled={isSubmitting}
          />
        </div>
      </div>

      {/* Email */}
      <div className="mb-3">
        <label htmlFor="email" className="form-label small fw-semibold">
          Email*
        </label>
        <input
          type="email"
          className="form-control"
          id="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          required
          placeholder="email@esempio.com"
          disabled={isSubmitting}
        />
      </div>

      {/* Telefono */}
      <div className="mb-3">
        <label htmlFor="phone" className="form-label small fw-semibold">
          Telefono*
        </label>
        <input
          type="tel"
          className="form-control"
          id="phone"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          required
          minLength={7}
          maxLength={20}
          placeholder="+39 123 456 7890"
          disabled={isSubmitting}
        />
        <small className="text-muted">7-20 cifre</small>
      </div>

      {/* Indirizzo Fatturazione */}
      <div className="mb-3">
        <label
          htmlFor="billing_address"
          className="form-label small fw-semibold"
        >
          Indirizzo Fatturazione*
        </label>
        <input
          type="text"
          className="form-control"
          id="billing_address"
          name="billing_address"
          value={formData.billing_address}
          onChange={handleChange}
          required
          minLength={10}
          maxLength={200}
          placeholder="Via, Numero, CAP, Città"
          disabled={isSubmitting}
        />
        <small className="text-muted">10-200 caratteri</small>
      </div>

      {/* Indirizzo Spedizione */}
      <div className="mb-3">
        <label
          htmlFor="shipping_address"
          className="form-label small fw-semibold"
        >
          Indirizzo Spedizione*
        </label>
        <input
          type="text"
          className="form-control"
          id="shipping_address"
          name="shipping_address"
          value={formData.shipping_address}
          onChange={handleChange}
          required
          minLength={10}
          maxLength={200}
          placeholder="Via, Numero, CAP, Città"
          disabled={isSubmitting}
        />
        <small className="text-muted">10-200 caratteri</small>
      </div>

      {/* Paese */}
      <div className="mb-4">
        <label htmlFor="country" className="form-label small fw-semibold">
          Paese*
        </label>
        <input
          type="text"
          className="form-control"
          id="country"
          name="country"
          value={formData.country}
          onChange={handleChange}
          required
          list="countries-list"
          placeholder="Italia"
          disabled={isSubmitting}
        />
      </div>

      {/* Pulsanti */}
      <div className="d-grid gap-2">
        <button
          type="submit"
          className="btn btn-primary"
          disabled={isSubmitting}
        >
          {isSubmitting ? (
            <>
              <span
                className="spinner-border spinner-border-sm me-2"
                role="status"
              ></span>
              Elaborazione...
            </>
          ) : (
            `Completa Ordine - €${amount?.toFixed(2)}`
          )}
        </button>
        {onCancel && (
          <button
            type="button"
            onClick={onCancel}
            className="btn btn-outline-secondary"
            disabled={isSubmitting}
          >
            ← Torna al Riepilogo
          </button>
        )}
      </div>
    </form>
  );
}

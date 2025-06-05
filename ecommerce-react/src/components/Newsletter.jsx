import { useState } from "react";
import emailjs from "@emailjs/browser";

export default function Newsletter() {
  const [formData, setFormData] = useState({
    email: ""
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  const sendConfirmationEmail = () => {
    emailjs
      .send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID, // Service ID
        import.meta.env.VITE_EMAILJS_TEMPLATE_NEWSLETTER_ID, //  Template ID
        {
          email: formData.email,
          discount: "SUMMER2025", // Codice sconto
        },
        import.meta.env.VITE_EMAILJS_PUBLIC_KEY // Public Key
      )
      .then((result) => {
        console.log("Email inviata con successo!", result);
      })
      .catch((error) => {
        console.error("Errore nell'invio dell'email:", error);
      });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    sendConfirmationEmail(); // Invia l'email di conferma
    alert("Grazie per esserti iscritto alla newsletter! Riceverai un codice sconto del 10% via email."); // Notifica all'utente
    setFormData({ email: "" }); // Resetta il form

  };
  return (
    <form onSubmit={handleSubmit}>
      <div className="mb-4">
        <h5 className="mb-3">Subscribe</h5>
        <p className="mb-3">
          Ricevi uno sconto del 10% iscrivendoti alla newsletter
        </p>
        <div className="input-group mb-3">
          <input
            name="email"
            value={formData.email}
            type="email"
            id="email"
            className="form-control"
            placeholder="Inserisci la tua email qui per uno sconto del 10%"
            aria-label="Email"
            onChange={handleChange}
            required
          />
          <button className="btn btn-primary" type="submit">
            <i className="bi bi-envelope me-1"></i>Iscriviti
          </button>
        </div>
      </div>
    </form>
  );
}

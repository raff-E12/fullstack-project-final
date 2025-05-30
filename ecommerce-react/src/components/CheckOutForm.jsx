import { useState } from "react";
import axios from "axios";

import emailjs from '@emailjs/browser';

export default function CheckOutForm({ amount }) {
    const endpoint = "http://localhost:3000/checkout"; // Endpoint del tuo backend

    const standardFormData = {
        name: "",
        surname: "",
        email: "",
        phone: "",
        amount: amount,
        billing_address: "",
        shipping_address: "",
        country: ""
    }

    const [formData, setFormData] = useState(standardFormData);


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const sendConfirmationEmail = () => {
        emailjs.send(
            'process.env.EMAILJS_SERVICE_ID',        //  Service ID
            'process.env.EMAILJS_TEMPLATE_ID',       // Template ID
            {
                name: formData.name,
                surname: formData.surname,
                email: formData.email,
                phone: formData.phone,
                amount: formData.amount,
                billing_address: formData.billing_address,
                shipping_address: formData.shipping_address,
                country: formData.country
            },
            'process.env.EMAILJS_PUBLIC_KEY'         // s Public Key
        )
            .then((result) => {
                console.log('Email inviata con successo!', result.text);
            })
            .catch((error) => {
                console.error('Errore nell\'invio dell\'email:', error);
            });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        sendConfirmationEmail(); // Invia l'email di conferma

        axios.get(endpoint, formData)
            .then(response => {
                setFormData(standardFormData); // Reset form data
                console.log("Ordine inviato con successo:", response.data);
            })
            .catch(error => {
                console.error("Errore nell'invio dell'ordine:", error);
            })

    };

    return (
        <form onSubmit={handleSubmit} className="container mt-4">
            {/* Name */}
            <div className="mb-3">
                <label htmlFor="name" className="form-label">Nome*</label>
                <input
                    type="text"
                    className="form-control"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    required
                    minLength={3}
                />
            </div>

            {/* Surname */}
            <div className="mb-3">
                <label htmlFor="surname" className="form-label">Cognome*</label>
                <input
                    type="text"
                    className="form-control"
                    id="surname"
                    name="surname"
                    value={formData.surname}
                    onChange={handleChange}
                    required
                    minLength={3}
                />
            </div>

            {/* Email */}
            <div className="mb-3">
                <label htmlFor="email" className="form-label">Email*</label>
                <input
                    type="email"
                    className="form-control"
                    id="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>

            {/* Phone */}
            <div className="mb-3">
                <label htmlFor="phone" className="form-label">Telefono*</label>
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
                />
                <small className="text-muted">7-20 cifre</small>
            </div>

            {/* Billing Address */}
            <div className="mb-3">
                <label htmlFor="billing_address" className="form-label">Indirizzo Fatturazione*</label>
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
                />
                <small className="text-muted">10-200 caratteri</small>
            </div>

            {/* Shipping Address */}
            <div className="mb-3">
                <label htmlFor="shipping_address" className="form-label">Indirizzo Spedizione*</label>
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
                />
                <small className="text-muted">10-200 caratteri</small>
            </div>

            {/* Country */}
            <div className="mb-3">
                <label htmlFor="country" className="form-label">Paese*</label>
                <input
                    type="text"
                    className="form-control"
                    id="country"
                    name="country"
                    value={formData.country}
                    onChange={handleChange}
                    required
                    list="countries-list"
                />
            </div>

            <button type="submit" className="btn btn-primary">Invia Ordine</button>
        </form>
    );
}
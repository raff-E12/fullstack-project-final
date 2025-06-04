import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SingleOrderPage() {
    const { orderSlug } = useParams();
    const [orderDetail, setOrderDetail] = useState({});

    // Definisci la funzione all'interno del componente o come useCallback per evitare re-creazioni inutili
    const getOrderDetails = () => {
        axios.get(`http://localhost:3000/orders/${orderSlug}`)
        .then(res => {
            setOrderDetail(res.data.order);
        })
        .catch(err => {
            console.log(err);
        });
    };

    useEffect(() => {
        getOrderDetails();
    }, [orderSlug]); // Aggiungi orderSlug come dipendenza

    console.log(orderDetail);

    return (
        <div>
            <h1>ORDER DETAIL</h1>
            {orderDetail && Object.keys(orderDetail).length > 0 ? ( // Controlla se orderDetail esiste e non è vuoto
                <div>
                    <p>ID Ordine: {orderDetail.id}</p>
                    <p>Nome Cliente: {orderDetail.customer_name}</p> {/* Assumi nomi delle colonne reali */}
                </div>
            ) : (
                <p>Caricamento dettagli ordine...</p> // Messaggio di caricamento
            )}
        </div>
    );
}
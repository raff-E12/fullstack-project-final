// ProductsPage.jsx
import { useState, useEffect } from "react";
import { useLocation, Link } from "react-router-dom"; // Importa useLocation
import FilterSection from "../components/FilterSection.jsx";
import axios from "axios";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [defaultProducts, setDefaultProducts] = useState([]);

  const location = useLocation(); // Hook per leggere i parametri dell'URL
  const endPoint = "http://localhost:3000/products";

  // Funzione per costruire i parametri da inviare all'API basandosi sull'URL
  const buildApiParams = () => {
    const queryParams = new URLSearchParams(location.search); // Crea un oggetto URLSearchParams dall'URL corrente
    const params = {};

    // Mappa i nomi dei parametri dell'URL ai nomi dei parametri dell'API
    if (queryParams.get('search')) params.q = queryParams.get('search'); // 'search' dall'URL diventa 'q' per l'API
    if (queryParams.get('sort_by')) params.sort_by = queryParams.get('sort_by');
    if (queryParams.get('brand')) params.brand = queryParams.get('brand');
    if (queryParams.get('fabric')) params.fabric = queryParams.get('fabric');
    if (queryParams.get('min_price')) params.min_price = queryParams.get('min_price');
    if (queryParams.get('max_price')) params.max_price = queryParams.get('max_price');
    if (queryParams.get('discount')) params.discount = queryParams.get('discount');

    return params;
  };

  // Chiamata Get dove passiamo i parametri per eventuali filtri e ordinamenti e ricerca
  function getProducts() { // Rimosso async
    const params = buildApiParams(); // Ottieni i parametri dall'URL
    axios.get(endPoint, { params })
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.error("Errore nel recupero dei prodotti:", err);
        setProducts([]); // Svuota i prodotti in caso di errore
      });
  }

  // Semplice funzione Get per restituire tutti i prodotti (per i filtri dinamici come brand e fabric)
  function getdefaultProducts() { // Rimosso async
    axios.get(endPoint)
      .then((res) => {
        setDefaultProducts(res.data.products);
      })
      .catch((err) => {
        console.error("Errore nel recupero dei prodotti di default:", err);
      });
  }

  useEffect(() => {
    getProducts(); // Chiama getProducts ogni volta che l'URL cambia
  }, [location.search]); // Dipendenza da location.search

  useEffect(() => {
    getdefaultProducts(); // Chiamata una sola volta per i prodotti di default
  }, []);


  return (
    <>
      <div className="container-xl container-prod">
        {/* Passa i parametri di default */}
        <FilterSection defaultProducts={defaultProducts} />
        <div className="prod-cards">
          {products.length > 0 ? (
            products.map(
              ({ id, name, description, price, image_url, slug, discount }) => (
                <div className="cards" key={id}>
                  <div className={discount ? "sale" : "d-none"}>sale%</div>
                  <Link to={`/products/${slug}`}>
                    <div
                      className="img-card"
                      style={{ backgroundImage: `url(${image_url})` }}
                    ></div>
                    <div className="text-cards">
                      <h2>{name}</h2>
                      <p>{description}</p>
                      <p>
                        <b>Prezzo:</b> €{price}
                      </p>
                    </div>
                  </Link>
                </div>
              )
            )
          ) : (
            <p className="text-center mt-4">Nessun prodotto trovato.</p>
          )}
        </div>
      </div>
    </>
  );
}
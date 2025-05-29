import { useState, useEffect } from "react";
import { useSearch } from "../context/SearchContext";
import FilterSection from "../components/FilterSection.jsx";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const [defaultProducts, setDefaultProducts] = useState([]);
  const { setSearchActive, isSearchBarActive, setSearchBarActive } =
    useSearch();
  const endPoint = "http://localhost:3000/products";

  //Chiamata Get dove passiamo i parametri per eventuali filtri e ordinamenti e ricerca
  function getProducts(params) {
    axios
      .get(endPoint, { params })
      .then((res) => {
        setProducts(res.data.products);
      })
      .catch((err) => {
        console.log("Errore nel recupero dei prodotti:", err);
        setProducts([]);
      });
  }

  //Semplice funzione Get per restituire tutti i prodotti
  function getdefaultProducts() {
    axios
      .get(endPoint)
      .then((res) => {
        setDefaultProducts(res.data.products);
      })
      .catch((err) => {
        console.log("Errore nel recupero dei prodotti:", err);
        setProducts([]); // Svuota i prodotti in caso di errore
      });
  }

  useEffect(() => {
    getProducts({});
    getdefaultProducts();
    setSearchActive(true);

    return () => {
      setSearchActive(false);
      setSearchBarActive(false);
    };
  }, []);

  function handleSubmit(params) {
    getProducts(params);
  }

  return (
    <>
      <div className="container-xl container-prod">
        <FilterSection
          isSearchBarActive={isSearchBarActive}
          handleSubmit={handleSubmit}
          defaultProducts={defaultProducts}
        />
        <div className="prod-cards">
          {products.length > 0 ? (
            products.map(
              ({ id, name, description, price, image_url, slug }) => (
                <div className="cards" key={id}>
                  <div className="sale">sale%</div>
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
            <p>Nessun prodotto trovato.</p>
          )}
        </div>
      </div>
    </>
  );
}

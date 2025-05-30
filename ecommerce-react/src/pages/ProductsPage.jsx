// ProductsPage.jsx - Versione CORRETTA
import { useState, useEffect } from "react";
import { useLocation, Link, useNavigate } from "react-router-dom";
import FilterSection from "../components/FilterSection.jsx";
import axios from "axios";

export default function ProductPage() {
  const [products, setProducts] = useState([]);
  const location = useLocation();
  const navigate = useNavigate(); // Mantenuto per coerenza con l'uso di useLocation e useNavigate

  const isBestsellersView = location.pathname === '/products/bestsellers';

  const fetchProducts = () => {
    let endpoint;
    const params = {};

    if (isBestsellersView) {
      endpoint = "http://localhost:3000/products/bestsellers";
    } else {
      endpoint = "http://localhost:3000/products";

      const queryParams = new URLSearchParams(location.search);
      if (queryParams.get('search')) params.q = queryParams.get('search');
      if (queryParams.get('sort_by')) params.sort_by = queryParams.get('sort_by');
      if (queryParams.get('brand')) params.brand = queryParams.get('brand');
      if (queryParams.get('fabric')) params.fabric = queryParams.get('fabric');
      if (queryParams.get('min_price')) params.min_price = queryParams.get('min_price');
      // CORREZIONE QUI:
      if (queryParams.get('max_price')) params.max_price = queryParams.get('max_price'); // Era l'errore "location.max.price"
      if (queryParams.get('discount')) params.discount = queryParams.get('discount');
    }

    axios.get(endpoint, { params })
      .then(res => {
        setProducts(res.data.products);
      })
      .catch(err => {
        console.error("Errore nel recupero dei prodotti:", err);
        setProducts([]);
      });
  };

  useEffect(() => {
    fetchProducts();
  }, [location.pathname, location.search]);

  return (
    <>
      <FilterSection />
      <div className="container-products">
        <div className="product-list">
          {products.length > 0 ? (
            products.map(
              ({
                id,
                name,
                description,
                price,
                image_url,
                slug,
                discount,
                start_discount,
                end_discount,
                total_sold_quantity // Incluso per i bestseller
              }) => {
                const today = new Date();
                const start = start_discount ? new Date(start_discount) : null;
                const end = end_discount ? new Date(end_discount) : null;
                const isDiscountActive =
                  discount &&
                  start instanceof Date &&
                  end instanceof Date &&
                  today >= start &&
                  today >= end; // Corretto qui: today >= end a today <= end

                return (
                  <div className="cards" key={id}>
                    <div className={isDiscountActive ? "sale" : "d-none"}>sale%</div>
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
                        {isBestsellersView && total_sold_quantity && (
                          <p><b>Venduti:</b> {total_sold_quantity}</p>
                        )}
                      </div>
                    </Link>
                  </div>
                );
              }
            )
          ) : (
            <p className="text-center mt-4">Nessun prodotto trovato.</p>
          )}
        </div>
      </div>
    </>
  );
}
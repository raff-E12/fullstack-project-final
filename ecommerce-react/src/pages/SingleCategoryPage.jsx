import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

export default function SingleCategoryPage() {
  const { categorySlug } = useParams();
  const location = useLocation();
  const [products, setProducts] = useState([]);

  function getProducts() {
    const endPoint = (`http://localhost:3000/products/category/${categoryName}`);
    axios.get(endPoint)
      .then(res => {
        setProducts(res.data.products);
      })
      .catch(err => {
        console.log(err);
      });
  };

  const categoryNames = {
    "polo-&-t-shirt": "Polo & t-Shirt",
    capispalla: "Capispalla",
    felpe: "Felpe",
    pantaloni: "Pantaloni",
    scarpe: "Scarpe",
    streetwear: "Streetwear",
  };

  const categoryName = categoryNames[categorySlug] || "Categoria non trovata";

  useEffect(() => {
    getProducts();
  }, [categoryName]);

  // console.log(products)

  return (
    <div className="container mt-4">
      <div className="row">
        <div className="col-12">
          <h1>Debug Info</h1>
          <p>
            <strong>URL corrente:</strong> {location.pathname}
          </p>
          <p>
            <strong>categorySlug ricevuto:</strong>{" "}
            {categorySlug || "UNDEFINED"}
          </p>
          <p>
            <strong>Tutti i params:</strong> {JSON.stringify(useParams())}
          </p>

          <hr />

          <h1>Prodotti - {categoryName}</h1>
          <p className="text-muted">Slug: {categorySlug}</p>

          <div className="alert alert-info">
            Qui verranno mostrati tutti i prodotti della categoria "
            {categoryName}"
            <div>
              {products.map(({ id, name, description, price, image_url }) => (
                <div className="container" key={id}>
                  <h2>{name}</h2>
                  <p>{description}</p>
                  <p>Prezzo: €{price}</p>
                  <img className="img-product" src={image_url} alt={name} />
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </div>
  );
}

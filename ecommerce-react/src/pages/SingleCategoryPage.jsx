import { useParams, useLocation } from "react-router-dom";

export default function SingleCategoryPage() {
  const { categorySlug } = useParams();
  const location = useLocation();

  console.log("URL corrente:", location.pathname);
  console.log("Parametri URL:", useParams());
  console.log("categorySlug:", categorySlug);

  const categoryNames = {
    "polo-&-t-shirt": "Polo & t-Shirt",
    capispalla: "Capispalla",
    felpe: "Felpe",
    pantaloni: "Pantaloni",
    scarpe: "Scarpe",
    streetwear: "Streetwear",
  };

  const categoryName = categoryNames[categorySlug] || "Categoria non trovata";

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
          </div>
        </div>
      </div>
    </div>
  );
}

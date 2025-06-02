import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { useCart } from "../context/CartContext";
import "../style/SingleProductPage.css";
import { useNavigate } from "react-router-dom";

export default function SingleProductPage() {
  const { slug } = useParams();

  const endPoint = `http://127.0.0.1:3000/products/${slug}`;

  const [productSlug, setProductSlug] = useState([]);

  const { addToCart } = useCart();

  function getProductsSlug() {
    axios
      .get(endPoint)
      .then((res) => {
        setProductSlug(res.data.products[0]);
        console.log("Prodotto recuperato:", res.data.products[0]);
      })
      .catch((error) => {
        console.error("Errore nel recupero del prodotto:", error);
      });
  }

  useEffect(() => {
    getProductsSlug();
  }, []);

  const {
    name,
    description,
    price,
    image_url,
    fabric,
    discount,
    category_name,
    start_discount,
    end_discount,
    sku_order_code,
    brand,
  } = productSlug;

  const today = new Date();

  const start = start_discount ? new Date(start_discount) : null;
  const end = end_discount ? new Date(end_discount) : null;

  const isDiscountActive =
    discount &&
    start instanceof Date &&
    end instanceof Date &&
    today >= start &&
    today <= end;

  const navigate = useNavigate()

  function handleGoBack() {
    navigate(-1)
  }

  return (
    <>
      <div className="container-xxl prod-sc d-flex">
        {productSlug.length !== 0 ? (
          <div className="container-lg p-2 d-flex sections-prod">
            <div className="prod-review">
              {isDiscountActive && <p className="sale-prod">{discount} %</p>}
              <div className="img-prod-add">
                <div id="carouselExample" className="carousel slide">
                  <div className="carousel-inner">
                    <div className="carousel-item active">
                      <img src={image_url} className="d-block w-100" alt={name} />
                    </div>
                    <div className="carousel-item">
                      <img src={image_url} className="d-block w-100" alt={name} />
                    </div>
                    <div className="carousel-item">
                      <img src={image_url} className="d-block w-100" alt={name} />
                    </div>
                  </div>
                  <button className="carousel-control-prev" type="button" data-bs-target="#carouselExample" data-bs-slide="prev">
                    <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Previous</span>
                  </button>
                  <button className="carousel-control-next" type="button" data-bs-target="#carouselExample" data-bs-slide="next">
                    <span className="carousel-control-next-icon" aria-hidden="true"></span>
                    <span className="visually-hidden">Next</span>
                  </button>
                </div>
              </div>
            </div>
            <div className="prod-descriptions">
              <div className="text-prod">
                <p className="name-brand">{brand}</p>
                <h1>{name}</h1>
                <h4 id="price">€{price}</h4>
              </div>
              <div className="extra-prod">
                <h5>Descrizione prodotto:</h5>
                <p>{description}</p>
              </div>
              <button
                className="btn-prod"
                onClick={() => addToCart(productSlug)}
              >
                {" "}
                Aggiungi al carrello{" "}
              </button>
              <button onClick={handleGoBack} className="btn btn-secondary">
                Torna alla pagina precedente
              </button>

            </div>

          </div>
        ) : (
          <div className="container-lg p-2 d-flex sections-prod">
            {" "}
            <b>Loading...</b>{" "}
          </div>
        )}

        <div className="desc-prod">
          <div className="box-desc col-4">
            <div className=" rv-parph">
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Cras et
                commodo ex. In consequat ac lacus ut semper, interdum ac orci.
              </p>
            </div>
          </div>
          <div className="box-desc desc col-4">
            <div className="list-desc">
              <ul>
                <li>
                  <p>
                    <b>Sku:</b> {sku_order_code}
                  </p>
                </li>
                <li>
                  <p>
                    <b>Material: </b>
                    {fabric}
                  </p>
                </li>
                <li>
                  <p>
                    <b>Brand:</b> {brand}
                  </p>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>




    </>
  );
}

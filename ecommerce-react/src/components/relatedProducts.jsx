import React, { useEffect, useState } from "react";
import axios from "axios";

const RelatedProducts = ({ category }) => {
    const [relatedProducts, setRelatedProducts] = useState([]);

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:3000/products?category=${category}`)
            .then((res) => {
                setRelatedProducts(res.data.products);
            })
            .catch((error) => {
                console.error("Errore nel recupero dei prodotti correlati:", error);
            });
    }, [category]);

    return (
        <div className="container mt-5">
            <h3 className="fw-bold">Prodotti correlati</h3>
            <div className="row">
                {relatedProducts.map((product) => (
                    <div key={product.id} className="col-md-4">
                        <div className="card shadow-sm mt-4">
                            <img
                                src={product.image_url}
                                className="card-img-top"
                                alt={product.name}
                                style={{ height: "200px", objectFit: "cover" }}
                            />
                            <div className="card-body text-center">
                                <h5 className="card-title">{product.name}</h5>
                                <p className="text-success fw-bold">€{product.price}</p>
                                <button className="btn btn-primary">Vedi prodotto</button>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default RelatedProducts;

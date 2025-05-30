import { useParams, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import { PremiumCard } from "../components/PremiumCard";

export default function SingleCategoryProductPage() {
    const { categorySlug } = useParams();
    const location = useLocation();
    const [products, setProducts] = useState([]);

    function getProducts() {
        const endPoint = (`http://localhost:3000/products/category/${categorySlug}`);
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
    }, [categorySlug]);

    // console.log(products)

    return (
        <div className="container mt-4">
            <div className="row">
                <div className="col-12">
                    <h1 className="mt-5">{categoryName}</h1>
                    <p> Stile senza tempo, comfort assoluto! 🌟 Scopri la nostra esclusiva selezione di Polo & T-Shirt, perfette per ogni occasione. Dai un tocco di classe al tuo look con una polo elegante o scegli la freschezza di una t-shirt dal design unico. Qualità, tendenza e versatilità si incontrano per offrirti il meglio della moda casual. Esprimi la tua personalità con i nostri capi, pensati per chi non rinuncia mai allo stile! </p>

                    <hr />

                    <h1>Prodotti - {categoryName}</h1>


                    <div >
                        <div className="row g-4">
                            {products.map((product) => (
                                <div className="col-12  col-md-6 col-lg-4" key={product.slug} >
                                    <PremiumCard product={product} />
                                </div>
                            ))}
                        </div>

                    </div>
                </div>
            </div>
        </div>
    );
}

import axios from "axios";
import { useState, useEffect } from "react";

export default function ProductPage() {
    const [products, setProducts] = useState([]);

    const endPoint = 'http://localhost:3000/products';

    function getProducts() {
        axios.get(endPoint)
            .then(res => {
                setProducts(res.data.products);
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        getProducts();
    }, []);


    return <div>
        <div>
            {products.map(({ id, name, description, price, image_url }) => (
                <div key={id}>
                    <h2>{name}</h2>
                    <p>{description}</p>
                    <p>Prezzo: €{price}</p>
                    <img className="img-product" src={image_url} alt={name} />
                </div>
            ))}
        </div>
    </div>
}

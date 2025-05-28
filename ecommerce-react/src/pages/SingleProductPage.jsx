import { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';

export default function SingleProductPage() {

    const { slug } = useParams();

    const endPoint = `http://127.0.0.1:3000/products/${slug}`;

    const [productSlug, setProductSlug] = useState([]);

    function getProductsSlug() {
        axios.get(endPoint)
            .then((res) => {
                setProductSlug(res.data.products[0]);
                console.log("Prodotto recuperato:", res.data.products[0]);
            })
            .catch((error) => {
                console.error("Errore nel recupero del prodotto:", error);
            });
    };

    useEffect(() => {
        getProductsSlug();
    }, []);

    const { name, description, price, image_url, fabric, discount, category_name } = productSlug;

    return <>
        <div>{name}</div>
        <div>{price}</div>
        <img src={image_url} alt={name} />
        <div>{fabric}</div>
        <div>{discount} %</div>
        <div>{category_name}</div>
        <div>{description}</div>
    </>

};
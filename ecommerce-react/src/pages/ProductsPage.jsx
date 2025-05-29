import { useState, useEffect } from "react";
import { useSearch } from '../context/SearchContext'
import FilterSection from "./FilterSection";
import axios from "axios";
import { Link } from "react-router-dom";

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const { isSearchBarActive, setSearchActive, setSearchBarActive } = useSearch();
    const endPoint = 'http://localhost:3000/products?';

    function getProducts(params) {
        axios.get(endPoint, { params })
            .then(res => {
                setProducts(res.data.products);
            })
            .catch(err => {
                console.log(err);
            });
    };

    useEffect(() => {
        getProducts();
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
                <FilterSection handleSubmit={handleSubmit} />
                <div className="prod-cards">
                    {products.map(({ id, name, description, price, image_url, slug }) => (
                        <div className="cards" key={id}>
                            <div className="sale">sale%</div>
                            <Link to={`/products/${slug}`}>
                                <div className="img-card" style={{ backgroundImage: `url(${image_url})` }}></div>
                                <div className="text-cards">
                                    <h2>{name}</h2>
                                    <p>{description}</p>
                                    <p><b>Prezzo:</b> €{price}</p>
                                </div>
                            </Link>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
}

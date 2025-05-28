import axios from "axios";
import { useState, useEffect } from "react";
import { UseSearch } from "../context/SearchContext";

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const {isSearchBarActive, setSearchActive, setSearchBarActive } = UseSearch();
 

    const endPoint = 'http://localhost:3000/products';

    function getProducts() {
        axios.get(endPoint, {
            params: { q: searchTerm }  // nome parametro inserito in express;
        })
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
    }, [searchTerm]);

    function handleSubmit(event) {
        event.preventDefault();
        getProducts();
    }

    return <div>
        <div>

            <form className ={isSearchBarActive ? "d-flex" : "d-none"} onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search by brand, name, or category"
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button type="submit">Search</button>
            </form>

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


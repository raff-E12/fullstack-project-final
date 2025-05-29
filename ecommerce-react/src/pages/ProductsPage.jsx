import axios from "axios";
import { useState, useEffect } from "react";
import { UseSearch } from "../context/SearchContext";
import { Link } from "react-router-dom";

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
    }, []);

    function handleSubmit(event) {
        event.preventDefault();
        getProducts();
    }

    return(<>
    <div className="container-xl container-prod">
            <form className ={`container-xl form-prod`} onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Search by brand, name, or category"
                    value={searchTerm}
                    id="form-prod"
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
             <button type="submit" class="btn btn-primary">Search</button>
            </form>
        <div className="prod-cards">
            {products.map(({ id, name, description, price, image_url, slug }) => {
                return(<>
                    <div className="cards">
                        <div className="sale">sale%</div>
                        <Link to={`/products/${slug}`} key={id}>
                           <div className="img-card" style={{backgroundImage:`url(${image_url})`}}>
                           </div>
                           <div className="text-cards">
                                <h2>{name}</h2>
                                <p>{description}</p>
                                <p><b>Prezzo:</b> €{price}</p>
                           </div>
                        </Link>
                    </div>
                </>)
            })}
        </div>
    </div>
    </>)
}


import axios from "axios";
import { useState, useEffect } from "react";
import { useSearch } from "../context/SearchContext";
import { Link } from "react-router-dom";
import { useCart } from "../context/CartContext";

export default function ProductPage() {
    const [products, setProducts] = useState([]);
    const [searchTerm, setSearchTerm] = useState('');
    const { isSearchBarActive, setSearchActive, setSearchBarActive } = useSearch();
    const { addToCart } = useCart();


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

<<<<<<< HEAD
         return () => {
      setSearchActive(false);
      setSearchBarActive(false);
    };
    }, []);
=======
        return () => {
            setSearchActive(false);
            setSearchBarActive(false);
        };
    }, [searchTerm]);
>>>>>>> 63a7e938654f26c1c4227a11d99b9a7b7f4311a2

    function handleSubmit(event) {
        event.preventDefault();
        getProducts();
    }

<<<<<<< HEAD
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
=======
    return <div>
        <form className={isSearchBarActive ? "d-flex my-5 mx-auto" : "d-none"} onSubmit={handleSubmit}>
            <input
                type="text"
                placeholder="Search by brand, name, or category"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
            />
            <button type="submit">Search</button>
        </form>

        {products.map((product) => (
            <div key={product.id}>
                <Link to={`/products/${product.slug}`}>
                    <h2>{product.name}</h2>
                    <p>{product.description}</p>
                    <p>Prezzo: €{product.price}</p>
                    <img className="img-product" src={product.image_url} alt={product.name} />
                </Link>
                <button onClick={() => addToCart(product)}>Aggiungi al carrello</button>
            </div>
        ))}
>>>>>>> 63a7e938654f26c1c4227a11d99b9a7b7f4311a2
    </div>
    </>)
}


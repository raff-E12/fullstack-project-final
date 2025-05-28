import { useState, useEffect } from "react"
import axios from "axios"

export function HomeProductSection (){
    const [newArrivals, setNewArrivals] = useState([]);
    const [bestSellers, setBestSellers] = useState([]);
    const [isBestSellerSection, setBestSellerSection] = useState(true);

    const endPoint = 'http://localhost:3000/';

    function getProducts() {
        axios.get(endPoint)
            .then(res => {
                setNewArrivals(res.data.products.newArrivals);
                setBestSellers(res.data.products.highestPriced);
            })
            .catch(err => {
                console.log(err);
            });
    };

    console.log(newArrivals);
    console.log(bestSellers);

    useEffect(() => {
        getProducts();
    }, []);

    return <div>
        <div>
            <button onClick={()=> setBestSellerSection(true)}>Best Sellers</button>
            <button onClick={()=> setBestSellerSection(false)}>New Arrivals</button>

            {isBestSellerSection ? bestSellers.map(({ id, name, description, price, image_url }) => (
                <div key={id}>
                    <h2>{name}</h2>
                    <p>{description}</p>
                    <p>Prezzo: €{price}</p>
                    <img className="img-product" src={image_url} alt={name} />
                </div>
            ))

            : newArrivals.map(({ id, name, description, price, image_url }) => (
                <div key={id}>
                    <h2>{name}</h2>
                    <p>{description}</p>
                    <p>Prezzo: €{price}</p>
                    <img className="img-product" src={image_url} alt={name} />
                </div>
            ))
        
            }


        </div>


    </div>
}
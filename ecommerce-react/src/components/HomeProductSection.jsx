import { useState, useEffect } from "react"
import axios from "axios"
import { Link } from "react-router-dom";

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

    const renderProductCards = (products) => {
        if (!products || products.length === 0) {
            return <p className="text-center mt-4">Nessun prodotto disponibile in questa sezione.</p>;
        }

        const firstRowProducts = products.slice(0, 3);
        const secondRowProducts = products.slice(3, 7);

        return (
            <>
                {/* Prima Riga (3 elementi) */}
                <div className="row mb-4">
                    {firstRowProducts.map(({ id, name, description, price, image_url, slug }) => (
                        <Link to={`products/${slug}`} key={id} className="col-md-4 col-sm-6 mb-3"> {/* col-md-4 per desktop, col-sm-6 per tablet */}
                            <div className="card h-100 shadow-sm"> {/* Aggiunto shadow-sm per una leggera ombra */}
                                {image_url && (
                                    <img
                                        src={image_url}
                                        className="card-img-top img-fluid"
                                        alt={name}
                                        style={{ objectFit: 'cover', height: '200px' }}
                                    />
                                )}
                                <div className="card-body d-flex flex-column">
                                    <h5 className="card-title text-truncate">{name}</h5> {/* text-truncate per nomi lunghi */}
                                    <p className="card-text text-muted flex-grow-1" style={{ fontSize: '0.9rem' }}>
                                        {description ? description.substring(0, 100) + '...' : 'Nessuna descrizione disponibile.'} {/* Trunca la descrizione */}
                                    </p>
                                    <p className="card-text fw-bold mt-auto">Prezzo: €{price ? price : 'N/A'}</p> {/* Formatta il prezzo */}
                                    {/* <button className="btn btn-primary btn-sm">Vedi Dettagli</button> */}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>

                {/* Seconda Riga (4 elementi) */}
                <div className="row">
                    {secondRowProducts.map(({ id, name, description, price, image_url, slug }) => (
                        <Link to={`products/${slug}`} key={id} className="col-md-3 col-sm-6 mb-3"> {/* col-md-3 per desktop, col-sm-6 per tablet */}
                            <div className="card h-100 shadow-sm">
                                {image_url && (
                                    <img
                                        src={image_url}
                                        className="card-img-top img-fluid"
                                        alt={name}
                                        style={{ objectFit: 'cover', height: '180px' }}
                                    />
                                )}
                                <div className="card-body d-flex flex-column">
                                    <h6 className="card-title text-truncate">{name}</h6> {/* h6 per titoli leggermente più piccoli */}
                                    <p className="card-text text-muted flex-grow-1" style={{ fontSize: '0.8rem' }}>
                                        {description ? description.substring(0, 80) + '...' : 'Nessuna descrizione disponibile.'}
                                    </p>
                                    <p className="card-text fw-bold mt-auto">Prezzo: €{price ? price : 'N/A'}</p>
                                    {/* <button className="btn btn-primary btn-sm">Vedi Dettagli</button> */}
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </>
        );
    };

    return (
        <div className="container my-5"> {/* Container Bootstrap per un layout centrato e responsive */}
            <div className="d-flex justify-content-end mb-4">
                <button
                    className={`btn ${isBestSellerSection ? 'btn-primary' : 'btn-outline-primary'} me-2`}
                    onClick={() => setBestSellerSection(true)}
                >
                    Best Sellers
                </button>
                <button
                    className={`btn ${!isBestSellerSection ? 'btn-primary' : 'btn-outline-primary'}`}
                    onClick={() => setBestSellerSection(false)}
                >
                    New Arrivals
                </button>
            </div>

            {/* Area di visualizzazione dei prodotti */}
            <div>
                {isBestSellerSection ? renderProductCards(bestSellers) : renderProductCards(newArrivals)}
            </div>
            <Link to={isBestSellerSection ? "/products?sort_by=price_desc" : "/products?sort_by=latest"}>View More...</Link>
        </div>
    );
}
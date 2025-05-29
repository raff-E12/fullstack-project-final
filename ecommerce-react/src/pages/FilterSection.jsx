import { useState, useEffect, useMemo } from "react";

export default function FilterSection({ handleSubmit, defaultProducts }) {
    // Stati per i filtri principali (ricerca automatica)
    const [searchTerm, setSearchTerm] = useState('');
    const [order, setOrder] = useState('');

    // Stati per i filtri nella sezione espandibile (applicati con "Apply Filters")
    const [brandFilter, setBrandFilter] = useState(''); // Stato per il filtro Brand
    const [fabricFilter, setFabricFilter] = useState(''); // Stato per il filtro Fabric
    const [discountChecked, setDiscountChecked] = useState(false); // Stato per la checkbox Discount
    const [minPrice, setMinPrice] = useState(''); // Stato per il prezzo minimo
    const [maxPrice, setMaxPrice] = useState(''); // Stato per il prezzo massimo

    // Stato per la visibilità della sezione filtri
    const [isFilterVisible, setFilterVisible] = useState(false);

    // Calcola i brand unici
    const uniqueBrands = useMemo(() => {
        if (!defaultProducts || !Array.isArray(defaultProducts)) {
            return [];
        }
        return [...new Set(defaultProducts.map(product => product.brand).filter(Boolean))];
    }, [defaultProducts]);

    // Calcola i fabric unici
    const uniqueFabrics = useMemo(() => {
        if (!defaultProducts || !Array.isArray(defaultProducts)) {
            return [];
        }
        const allFabrics = defaultProducts
            .map(product => product.fabric)
            .filter(fabric => fabric && String(fabric).trim() !== '');

        return [...new Set(allFabrics)];
    }, [defaultProducts]);


    // Funzione helper per costruire i parametri di ricerca
    const buildSearchParams = () => {
        return {
            q: searchTerm,
            sort_by: order,
            brand: brandFilter,
            fabric: fabricFilter,
            discount: discountChecked, // Invia true/false
            min_price: minPrice,
            max_price: maxPrice,
        };
    };

    // useEffect per attivare la ricerca automatica per searchTerm e order
    // Questo si attiva solo quando searchTerm o order cambiano.
    // I filtri nascosti (brand, fabric, price, discount) non attivano questo useEffect.
    useEffect(() => {
        const params = buildSearchParams();
        // console.log("useEffect (searchTerm/order) triggered with params:", params); // Debug
        handleSubmit(params);
    }, [searchTerm, order]); // Dipendenze: si attiva solo quando searchTerm o order cambiano

    // Gestisce l'invio del modulo principale (pulsante "Cerca" o Enter nella search bar)
    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const params = buildSearchParams();
        // console.log("handleSearchSubmit (search button) triggered with params:", params); // Debug
        handleSubmit(params);
    };

    // Gestisce il click sul pulsante "Apply Filters"
    const handleApplyFilters = () => {
        const params = buildSearchParams();
        // console.log("handleApplyFilters triggered with params:", params); // Debug
        handleSubmit(params);
    };

    return (
        <>
            <div className="container-xl container-prod">
                {/* TUTTI I CONTROLLI DEVONO ESSERE ALL'INTERNO DI QUESTO UNICO FORM */}
                <form className="container-xl form-prod" onSubmit={handleSearchSubmit}>

                    {/* Bottone per mostrare/nascondere la sezione filtri */}
                    <button type="button" onClick={() => setFilterVisible(prev => !prev)}>
                        {isFilterVisible ? 'Nascondi Filtri' : 'Mostra Filtri'}
                    </button>

                    {/* Sezione Filtri Condizionale (NON È UN FORM SEPARATO) */}
                    {isFilterVisible && (
                        <div className="filter-options-section"> {/* Un semplice div per raggruppare i filtri */}
                            {/* Filtro Brand */}
                            <select
                                className="form-select"
                                aria-label="Seleziona Brand"
                                onChange={(e) => setBrandFilter(e.target.value)} // Corretto: usa setBrandFilter
                                value={brandFilter} // Corretto: lega al nuovo stato brandFilter
                            >
                                <option value="">Brand</option>
                                {uniqueBrands.map(brand => (
                                    <option key={brand} value={brand}>{brand}</option> // key={brand} è più robusto
                                ))}
                            </select>

                            {/* Filtro Fabric */}
                            <select
                                className="form-select"
                                aria-label="Seleziona Fabric"
                                onChange={(e) => setFabricFilter(e.target.value)} // Corretto: usa setFabricFilter
                                value={fabricFilter} // Corretto: lega al nuovo stato fabricFilter
                            >
                                <option value="">Fabric</option>
                                {uniqueFabrics.map(fabric => (
                                    <option key={fabric} value={fabric}>{fabric}</option> // key={fabric} è più robusto
                                ))}
                            </select>

                            {/* Checkbox Discount Products */}
                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    id="discount-checkbox" // ID corretto per il collegamento
                                    name="discount-checkbox"
                                    className="form-check-input"
                                    checked={discountChecked} // Corretto: lega allo stato discountChecked
                                    onChange={(e) => setDiscountChecked(e.target.checked)} // Corretto: usa e.target.checked
                                />
                                <label className="form-check-label" htmlFor="discount-checkbox">
                                    Discount Products
                                </label>
                            </div>

                            {/* Filtri Prezzo */}
                            <div className="price-filters-group">
                                <div className="d-flex">
                                    <label htmlFor="min-price-input">Min Price</label>
                                    <input
                                        type="number"
                                        id="min-price-input"
                                        value={minPrice} // Corretto: lega allo stato minPrice
                                        onChange={(e) => setMinPrice(e.target.value)} // Corretto: usa setMinPrice
                                        placeholder="Min"
                                    />
                                </div>
                                <div className="d-flex">
                                    <label htmlFor="max-price-input">Max Price</label>
                                    <input
                                        type="number"
                                        id="max-price-input"
                                        value={maxPrice} // Corretto: lega allo stato maxPrice
                                        onChange={(e) => setMaxPrice(e.target.value)} // Corretto: usa setMaxPrice
                                        placeholder="Max"
                                    />
                                </div>
                            </div>
                            {/* Pulsante "Apply Filters" per i filtri nascosti */}
                            <button type="button" onClick={handleApplyFilters}>Apply Filters</button>
                        </div>
                    )} {/* Fine Sezione Filtri Condizionale */}


                    {/* Barra di ricerca principale */}
                    <input
                        type="text"
                        placeholder="Cerca per brand, nome o categoria"
                        value={searchTerm}
                        id="form-prod"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    {/* Select per l'ordinamento */}
                    <select
                        className="form-select"
                        aria-label="Seleziona ordine"
                        onChange={(e) => setOrder(e.target.value)}
                        value={order}
                    >
                        <option value="">Order by</option>
                        <option value="name_asc">Alfabetico, A-Z</option>
                        <option value="name_desc">Alfabetico, Z-A</option>
                        <option value="price_asc">Prezzo, DAL PIÙ BASSO AL PIÙ ALTO</option>
                        <option value="price_desc">Prezzo, DAL PIÙ ALTO AL PIÙ BASSO</option>
                        <option value="latest">Ultimi arrivi</option>
                    </select>

                </form>
            </div>
        </>
    );
}

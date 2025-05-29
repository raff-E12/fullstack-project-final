import { useState, useEffect } from "react";

export default function FilterSection({ handleSubmit, defaultProducts, isSearchBarActive }) {
    const [searchTerm, setSearchTerm] = useState('');
    const [order, setOrder] = useState('');
    const [brandFilter, setBrandFilter] = useState(''); 
    const [fabricFilter, setFabricFilter] = useState('');
    const [discountChecked, setDiscountChecked] = useState(false); 
    const [minPrice, setMinPrice] = useState(''); 
    const [maxPrice, setMaxPrice] = useState(''); 
    const [isFilterVisible, setFilterVisible] = useState(false);

    const uniqueBrands = [...new Set(defaultProducts.map(product => product.brand))];
    const uniqueFabrics = [...new Set(defaultProducts.map(product => product.fabric))];
    


    // Funzione per costruire i parametri di ricerca
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

    useEffect(() => {
        const params = buildSearchParams();
        handleSubmit(params);
    }, [searchTerm, order]); 


    const handleSearchSubmit = (event) => {
        event.preventDefault();
        const params = buildSearchParams();
        
        handleSubmit(params);
    };

    const handleApplyFilters = () => {
        const params = buildSearchParams();
        handleSubmit(params);
    };

    return (
        <>
            <div className="w-100 d-flex justify-content-space-between">
                <form className="container-xl form-prod" onSubmit={handleSearchSubmit}>
                    <button type="button" onClick={() => setFilterVisible(prev => !prev)}>
                        {isFilterVisible ? 'Nascondi Filtri' : 'Mostra Filtri'}
                    </button>

                    {isFilterVisible && (
                        <div className="filter-options-section">
                            <select
                                className="form-select"
                                aria-label="Seleziona Brand"
                                onChange={(e) => setBrandFilter(e.target.value)} 
                                value={brandFilter} 
                            >
                                <option value="">Brand</option>
                                {uniqueBrands.map(brand => (
                                    <option key={brand} value={brand}>{brand}</option> 
                                ))}
                            </select>
                            <select
                                className="form-select"
                                aria-label="Seleziona Fabric"
                                onChange={(e) => setFabricFilter(e.target.value)} 
                                value={fabricFilter}  >
                                <option value="">Fabric</option>
                                {uniqueFabrics.map(fabric => (
                                    <option key={fabric} value={fabric}>{fabric}</option> 
                                ))}
                            </select>

                            <div className="form-check">
                                <input
                                    type="checkbox"
                                    id="discount-checkbox" 
                                    name="discount-checkbox"
                                    className="form-check-input"
                                    checked={discountChecked} 
                                    onChange={(e) => setDiscountChecked(e.target.checked)} 
                                />
                                <label className="form-check-label" htmlFor="discount-checkbox">
                                    Discount Products
                                </label>
                            </div>
                            <div className="price-filters-group">
                                <div className="d-flex">
                                    <label htmlFor="min-price-input">Min Price</label>
                                    <input
                                        type="number"
                                        id="min-price-input"
                                        value={minPrice} 
                                        onChange={(e) => setMinPrice(e.target.value)} 
                                        placeholder="Min"
                                    />
                                </div>
                                <div className="d-flex">
                                    <label htmlFor="max-price-input">Max Price</label>
                                    <input
                                        type="number"
                                        id="max-price-input"
                                        value={maxPrice} 
                                        onChange={(e) => setMaxPrice(e.target.value)} 
                                        placeholder="Max"
                                    />
                                </div>
                            </div>
                    
                            <button type="button" onClick={handleApplyFilters}>Apply Filters</button>
                        </div>
                    )} 

                    <input
                        className={isSearchBarActive ? "d-block" : "d-none"}
                        type="text"
                        placeholder="Cerca per brand, nome o categoria"
                        value={searchTerm}
                        id="form-prod"
                        onChange={(e) => setSearchTerm(e.target.value)}
                    />

                    <select
                        className="form-select flex-grow-0"
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

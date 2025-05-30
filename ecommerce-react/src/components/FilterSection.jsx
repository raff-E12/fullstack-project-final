// FilterSection.jsx
import { useState, useEffect } from "react";
import "../style/FilterSection.css";

export default function FilterSection({
  handleSubmit,
  defaultProducts,
  isSearchBarActive,
}) {
  const [searchTerm, setSearchTerm] = useState("");
  const [order, setOrder] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [fabricFilter, setFabricFilter] = useState("");
  const [discountChecked, setDiscountChecked] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isFilterVisible, setFilterVisible] = useState(false);

  const uniqueBrands = [
    ...new Set(defaultProducts.map((product) => product.brand)),
  ];
  const uniqueFabrics = [
    ...new Set(defaultProducts.map((product) => product.fabric)),
  ];

  const buildSearchParams = () => {
    return {
      q: searchTerm,
      sort_by: order,
      brand: brandFilter,
      fabric: fabricFilter,
      discount: discountChecked,
      min_price: minPrice,
      max_price: maxPrice,
    };
  };

  useEffect(() => {
    const params = buildSearchParams();
    handleSubmit(params);
  }, [searchTerm, order]);

  // const handleSearchSubmit = (event) => {
  //   event.preventDefault();
  //   const params = buildSearchParams();
  //   handleSubmit(params);
  // };

  const handleApplyFilters = () => {
    const params = buildSearchParams();
    handleSubmit(params);
  };

  const resetFilters = () => {
    setBrandFilter("");
    setFabricFilter("");
    setDiscountChecked(false);
    setMinPrice("");
    setMaxPrice("");
    setSearchTerm("");
    setOrder("");
  };

  return (
    <div className="filter-wrapper">
      <div className="container-fluid">
        {/* Header */}
        <div className="filter-header">
          <div className="search-section">
            <input
              className={`search-input ${isSearchBarActive ? "d-block" : "d-none d-md-block"
                }`}
              type="text"
              placeholder="Cerca prodotti..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          <div className="controls-section">
            <select
              className="order-select"
              onChange={(e) => setOrder(e.target.value)}
              value={order}
            >
              <option value="">Ordina</option>
              <option value="name_asc">A-Z</option>
              <option value="name_desc">Z-A</option>
              <option value="price_asc">Prezzo ↑</option>
              <option value="price_desc">Prezzo ↓</option>
              <option value="latest">Novità</option>
            </select>

            <button
              type="button"
              className="filter-toggle"
              onClick={() => setFilterVisible((prev) => !prev)}
            >
              Filtri {isFilterVisible ? "−" : "+"}
            </button>
          </div>
        </div>

        {/* Pannello Filtri */}
        {isFilterVisible && (
          <div className="filter-panel">
            <div className="row g-3">
              <div className="col-12 col-md-6 col-xl-3">
                <select
                  className="filter-select"
                  onChange={(e) => setBrandFilter(e.target.value)}
                  value={brandFilter}
                >
                  <option value="">Brand</option>
                  {uniqueBrands.map((brand) => (
                    <option key={brand} value={brand}>
                      {brand}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-12 col-md-6 col-xl-3">
                <select
                  className="filter-select"
                  onChange={(e) => setFabricFilter(e.target.value)}
                  value={fabricFilter}
                >
                  <option value="">Tessuto</option>
                  {uniqueFabrics.map((fabric) => (
                    <option key={fabric} value={fabric}>
                      {fabric}
                    </option>
                  ))}
                </select>
              </div>

              <div className="col-12 col-md-6 col-xl-3">
                <div className="price-range">
                  <input
                    type="number"
                    className="price-input"
                    value={minPrice}
                    onChange={(e) => setMinPrice(e.target.value)}
                    placeholder="Min €"
                    min="0"
                  />
                  <input
                    type="number"
                    className="price-input"
                    value={maxPrice}
                    onChange={(e) => setMaxPrice(e.target.value)}
                    placeholder="Max €"
                    min="0"
                  />
                </div>
              </div>
            </div>

            <div className="my-3">
              <div className="checkbox-section">
                <label className="checkbox-label">
                  <input
                    type="checkbox"
                    checked={discountChecked}
                    onChange={(e) => setDiscountChecked(e.target.checked)}
                  />
                  Solo scontati
                </label>
              </div>
            </div>

            <div className="filter-actions">
              <button
                type="button"
                className="btn-reset"
                onClick={resetFilters}
              >
                Reset
              </button>
              <button
                type="button"
                className="btn-apply"
                onClick={handleApplyFilters}
              >
                Applica
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

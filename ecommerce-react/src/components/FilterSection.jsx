// FilterSection.jsx
import { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import "../style/FilterSection.css";

export default function FilterSection({ defaultProducts }) {
  const [order, setOrder] = useState("");
  const [brandFilter, setBrandFilter] = useState("");
  const [fabricFilter, setFabricFilter] = useState("");
  const [discountChecked, setDiscountChecked] = useState(false);
  const [minPrice, setMinPrice] = useState("");
  const [maxPrice, setMaxPrice] = useState("");
  const [isFilterVisible, setFilterVisible] = useState(false);

  const location = useLocation();
  const navigate = useNavigate();

  const uniqueBrands = [
    ...new Set(defaultProducts.map((product) => product.brand)),
  ];
  const uniqueFabrics = [
    ...new Set(defaultProducts.map((product) => product.fabric)),
  ];

  const updateUrlWithParams = (currentFilters) => {
    const newQueryParams = new URLSearchParams(location.search);

    const currentSearchTerm = newQueryParams.get('search');
    newQueryParams.forEach((value, key) => {
      if (key !== 'search') {
        newQueryParams.delete(key);
      }
    });

    if (currentFilters.order) {
      newQueryParams.set('sort_by', currentFilters.order);
    }
    if (currentFilters.brand) {
      newQueryParams.set('brand', currentFilters.brand);
    }
    if (currentFilters.fabric) {
      newQueryParams.set('fabric', currentFilters.fabric);
    }
    if (currentFilters.discount) {
      newQueryParams.set('discount', 'true');
    }
    if (currentFilters.minPrice) {
      newQueryParams.set('min_price', currentFilters.minPrice);
    }
    if (currentFilters.maxPrice) {
      newQueryParams.set('max_price', currentFilters.maxPrice);
    }

    if (currentSearchTerm && !newQueryParams.get('search')) {
        newQueryParams.set('search', currentSearchTerm);
    }

    navigate(`?${newQueryParams.toString()}`);
  };

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    setOrder(queryParams.get('sort_by') || "");
    setBrandFilter(queryParams.get('brand') || "");
    setFabricFilter(queryParams.get('fabric') || "");
    setDiscountChecked(queryParams.get('discount') === 'true');
    setMinPrice(queryParams.get('min_price') || "");
    setMaxPrice(queryParams.get('max_price') || "");
  }, [location.search]);

  useEffect(() => {
    const queryParams = new URLSearchParams(location.search);
    if (order !== (queryParams.get('sort_by') || "") || location.search === "") {
        const currentFilters = {
            order: order,
            brand: brandFilter,
            fabric: fabricFilter,
            discount: discountChecked,
            minPrice: minPrice,
            maxPrice: maxPrice,
        };
        updateUrlWithParams(currentFilters);
    }
  }, [order]);

  const handleApplyFilters = () => {
    const currentFilters = {
      order: order,
      brand: brandFilter,
      fabric: fabricFilter,
      discount: discountChecked,
      minPrice: minPrice,
      maxPrice: maxPrice,
    };
    updateUrlWithParams(currentFilters);
  };

  const resetFilters = () => {
    const newQueryParams = new URLSearchParams(location.search);
    const currentSearch = newQueryParams.get('search');
    const paramsToKeep = new URLSearchParams();
    if (currentSearch) {
        paramsToKeep.set('search', currentSearch);
    }

    setBrandFilter("");
    setFabricFilter("");
    setDiscountChecked(false);
    setMinPrice("");
    setMaxPrice("");
    setOrder("");

    navigate(`?${paramsToKeep.toString()}`);
  };

  return (
    <div className="filter-wrapper">
      <div className="container-fluid">
        <div className="filter-header">
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
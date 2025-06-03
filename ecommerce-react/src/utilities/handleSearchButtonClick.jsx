// utilities/SearchComponent.jsx
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useSearch } from "../context/SearchContext";

export default function SearchComponent({ isMobile = false, closeMenus }) {
  const [isSearchInputVisible, setIsSearchInputVisible] = useState(false);
  const { searchTerm, setSearchTerm, setSearchSubmitted } = useSearch();
  const navigate = useNavigate();

  const performSearch = () => {
    if (searchTerm.trim()) {
      navigate(`/products?search=${encodeURIComponent(searchTerm.trim())}`);
      setSearchTerm("");
      setIsSearchInputVisible(false);
      closeMenus();
    } else {
      setIsSearchInputVisible(false);
    }
  };

  const handleSearchFormSubmit = (e) => {
    e.preventDefault();
    setSearchSubmitted(true);
    performSearch();
  };

  const handleSearchButtonClick = () => {
    if (isSearchInputVisible && searchTerm.trim()) {
      performSearch();
    } else {
      setIsSearchInputVisible(!isSearchInputVisible);
    }
  };

  if (isMobile) {
    return (
      <div className="mobile-search-container">
        <button
          type="button"
          className="nav-link btn p-0 d-block mb-2"
          onClick={handleSearchButtonClick}
        >
          Ricerca
        </button>

        <form
          onSubmit={handleSearchFormSubmit}
          className={`mb-2 mobile-search-form ${
            isSearchInputVisible ? "visible" : "hidden"
          }`}
        >
          <input
            type="text"
            placeholder="Cerca..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="search-input form-control w-100"
          />
        </form>
      </div>
    );
  }

  return (
    <div className="search-container-desktop d-flex align-items-center">
      <form
        onSubmit={handleSearchFormSubmit}
        className="d-inline-flex me-2 search-form"
      >
        <input
          type="text"
          placeholder="Cerca..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className={`search-input form-control ${
            isSearchInputVisible ? "visible" : "hidden"
          }`}
        />
      </form>
      <button
        type="button"
        className="nav-link btn p-0"
        onClick={handleSearchButtonClick}
      >
        Ricerca
      </button>
    </div>
  );
}

import { useState } from "react";
import "../assets/styles/searchbar.css";

export function Searchbar({ onSearch }) {
    //search state
  const [searchTerm, setSearchTerm] = useState("");

  //search submit
  const handleSubmit = (e) => {
    e.preventDefault();
    if (typeof onSearch === "function") onSearch(searchTerm.trim());
  };

  return (
    <div className="search-container">
      <form onSubmit={handleSubmit} className="search-form">
        <input
          type="search"
          placeholder="Search posts..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="search-input"
        />
        <button type="submit" className="search-btn btn">
          Search
        </button>
      </form>
    </div>
  );
}

export default Searchbar;

import React, { useState, useEffect } from 'react';
import { assets } from '../assets/assets'; // Make sure to import your assets

const SearchBar = ({ onSearch }) => {
  const [query, setQuery] = useState("");

  // NEW: useEffect hook to handle debouncing
  useEffect(() => {
    // Set a timer to run the search after 500ms
    const timerId = setTimeout(() => {
      if (query) {
        onSearch(query);
      }
    }, 500); // 500ms delay

    // This is the cleanup function. It runs every time the query changes.
    // It cancels the previous timer, so the search only runs when the user stops typing.
    return () => {
      clearTimeout(timerId);
    };
  }, [query, onSearch]); // Rerun the effect if query or onSearch changes

  return (
    <div className="search-bar-container">
      <img src={assets.search_icon} alt="Search" className="search-icon" />
      <input
        type="text"
        placeholder="What do you want to listen to?"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="search-input"
      />
    </div>
  );
};

export default SearchBar;
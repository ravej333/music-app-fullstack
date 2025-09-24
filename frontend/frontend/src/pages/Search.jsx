import React, { useState } from 'react';
import SearchBar from '../components/SearchBar';
import SongDetailCard from '../components/SongDetailCard';
import { searchSongs } from '../api/songApis';
import { albumsData } from '../assets/assets'; // For genre cards

const Search = () => {
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);
  const [searched, setSearched] = useState(false); // NEW: State to track if a search has been made

  const handleSearch = async (query) => {
    if (!query) {
      setResults([]);
      setSearched(false);
      return;
    }
    setLoading(true);
    setSearched(true);
    const songs = await searchSongs(query);
    setResults(songs || []);
    setLoading(false);
  };

  const renderContent = () => {
    if (loading) {
      return <p className="loading-text">Searching...</p>;
    }
    
    if (searched && results.length === 0) {
      return <p>No results found. Try a different search.</p>;
    }
    
    if (searched) {
      return (
        <div className="search-results-grid">
          {results.map((song) => (
            <SongDetailCard key={song.id} song={song} />
          ))}
        </div>
      );
    }
    
    // Default view: Show genre cards
    return (
      <>
        <h2>Browse all</h2>
        <div className="genre-grid">
          {albumsData.map((genre) => (
            <div key={genre.id} className="genre-card" style={{ backgroundColor: genre.bgColor }}>
              {genre.name}
            </div>
          ))}
        </div>
      </>
    );
  };

  return (
    <div className="search-page">
      <SearchBar onSearch={handleSearch} />
      {renderContent()}
    </div>
  );
};

export default Search;
import React, { useState, useCallback } from "react";
import SearchBar from "../components/SearchBar.jsx";
import SongDetailCard from "../components/SongDetailCard.jsx";
import { usePlayer } from '../context/PlayerContext.jsx'; // Import the player hook

const Search = () => {
  const [results, setResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const { masterSongList } = usePlayer(); // Get the master list of all songs

  // useCallback prevents this function from being recreated on every render
  const handleSearch = useCallback((query) => {
    if (!query) {
      setResults([]);
      setSearched(false);
      return;
    }
    const lowercasedQuery = query.toLowerCase();
    
    // Search the master list, which includes unlisted songs
    const searchResults = masterSongList.filter(song => 
      song.name.toLowerCase().includes(lowercasedQuery) ||
      song.desc.toLowerCase().includes(lowercasedQuery)
    );
    
    setResults(searchResults);
    setSearched(true);
  }, [masterSongList]);

  return (
    <div className="search-page">
      <SearchBar onSearch={handleSearch} />
      <div className="search-results-container">
        {searched && results.length > 0 && (
          <h2 className="results-heading">Search Results</h2>
        )}
        
        {searched && results.length === 0 ? (
          <p className="no-results-message">No results found. Try a different search.</p>
        ) : (
          results.map(song => (
            <SongDetailCard key={song.id} song={song} />
          ))
        )}

        {!searched && (
           <p className="no-results-message">Search for your favorite songs, artists, or albums.</p>
        )}
      </div>
    </div>
  );
};

export default Search;
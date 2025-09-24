// src/pages/Search.jsx

import React, { useState, useCallback } from "react";
import SearchBar from "../components/SearchBar.jsx";
import SongDetailCard from "../components/SongDetailCard.jsx";
import AlbumCard from "../components/AlbumCard.jsx";
import { songsData, albumsData } from "../assets/assets.js";

const Search = () => {
  const [songResults, setSongResults] = useState([]);
  const [albumResults, setAlbumResults] = useState([]);
  const [searched, setSearched] = useState(false);
  const [loading, setLoading] = useState(false);

  // FIX: Wrap handleSearch in useCallback to prevent infinite loops and improve performance.
  const handleSearch = useCallback((query) => {
    if (!query) {
      setSongResults([]);
      setAlbumResults([]);
      setSearched(false);
      return;
    }
    
    setLoading(true);
    setSearched(true);
    
    const lowercasedQuery = query.toLowerCase();
    
    const songSearchResults = songsData.filter(song => 
      song.name.toLowerCase().includes(lowercasedQuery) ||
      song.desc.toLowerCase().includes(lowercasedQuery)
    );
    
    const albumSearchResults = albumsData.filter(album => 
      album.name.toLowerCase().includes(lowercasedQuery) ||
      album.desc.toLowerCase().includes(lowercasedQuery)
    );
    
    setSongResults(songSearchResults);
    setAlbumResults(albumSearchResults);
    setLoading(false);
  }, []); // The empty dependency array ensures the function is only created once.

  const hasResults = songResults.length > 0 || albumResults.length > 0;

  const renderContent = () => {
    if (loading) {
      return <p className="loading-text">Searching...</p>;
    }
    
    if (searched && !hasResults) {
      return <p>No results found for your search.</p>;
    }
    
    if (searched) {
      return (
        <>
          {albumResults.length > 0 && (
            <section className="search-results-section">
              <h2>Albums</h2>
              <div className="card-container">
                {albumResults.map((album) => (
                  <AlbumCard
                    key={album.id}
                    id={album.id}
                    name={album.name}
                    desc={album.desc}
                    image={album.image}
                  />
                ))}
              </div>
            </section>
          )}

          {songResults.length > 0 && (
            <section className="search-results-section">
              <h2>Songs</h2>
              <div className="search-results-grid">
                {songResults.map((song) => (
                  <SongDetailCard key={song.id} song={song} />
                ))}
              </div>
            </section>
          )}
        </>
      );
    }
    
    return (
      <>
        <h2>Browse all</h2>
        <div className="genre-grid">
          {albumsData.filter(album => !album.unlisted).map((genre) => (
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
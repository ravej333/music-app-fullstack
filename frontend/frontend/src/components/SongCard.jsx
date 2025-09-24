import React, { useState, useEffect, useRef } from 'react';
import { usePlayer } from "../context/PlayerContext.jsx";
import { addSongToPlaylist, getPlaylists } from '../api/playlistApis.js';
import { assets } from '../assets/assets.js';

export default function SongCard({ song }) {
  const { playSong, addToQueue, playNext } = usePlayer();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPlaylists, setShowPlaylists] = useState(false);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const menuRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
        setShowPlaylists(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [menuRef]);

  const handlePlaylistMenuEnter = async () => {
    if (!userPlaylists.length) {
      try {
        const playlists = await getPlaylists();
        setUserPlaylists(playlists || []);
      } catch (error) {
        console.error("Could not fetch playlists", error);
      }
    }
    setShowPlaylists(true);
  };

  const handleSelectPlaylist = async (playlistId) => {
    try {
      await addSongToPlaylist(playlistId, song.id);
      alert(`Song "${song.name}" added successfully!`);
      setMenuOpen(false);
      setShowPlaylists(false);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="song-card">
      <div className="song-card-image-container">
        <img 
          src={song.image} 
          alt={song.name} 
          className="song-card-image"
          onClick={() => playSong(song)} 
        />
        <button onClick={() => playSong(song)} className="play-button">
          <img src={assets.play_icon} alt="Play" />
        </button>
      </div>

      <div className="song-card-info">
        <p className="song-name">{song.name}</p>
        <p className="song-desc">{song.desc}</p>
      </div>

      <div className="song-options" ref={menuRef}>
        <button onClick={() => setMenuOpen(!menuOpen)} className="more-options-btn">
          ...
        </button>
        
        {menuOpen && (
          <div className="context-menu">
            <div className="menu-item" onClick={() => { addToQueue(song); setMenuOpen(false); }}>Add to Queue</div>
            <div className="menu-item" onClick={() => { playNext(song); setMenuOpen(false); }}>Play Next</div>
            <div 
              className="menu-item has-submenu" 
              onMouseEnter={handlePlaylistMenuEnter} 
              onMouseLeave={() => setShowPlaylists(false)}
            >
              Add to Playlist ▸
              {showPlaylists && (
                <div className="context-submenu">
                  {userPlaylists.length > 0 ? (
                    userPlaylists.map(pl => (
                      <div key={pl.id} onClick={() => handleSelectPlaylist(pl.id)} className="submenu-item">
                        {pl.title}
                      </div>
                    ))
                  ) : (
                    <div className="submenu-item disabled">No playlists</div>
                  )}
                </div>
              )}
          </div>
          </div>
        )}
      </div>
    </div>
  );
}
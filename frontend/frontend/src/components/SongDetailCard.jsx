import React, { useState, useEffect, useRef } from 'react';
import { usePlayer } from "../context/PlayerContext";
import { addSongToPlaylist, getPlaylists } from '../api/playlistApis';
import { assets } from '../assets/assets';

const SongDetailCard = ({ song }) => {
  const { playSong, addToQueue, playNext } = usePlayer();
  const [menuOpen, setMenuOpen] = useState(false);
  const [showPlaylists, setShowPlaylists] = useState(false);
  const [userPlaylists, setUserPlaylists] = useState([]);
  const menuRef = useRef(null);

  // Logic to close the menu when clicking outside of it
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target)) {
        setMenuOpen(false);
        setShowPlaylists(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, [menuRef]);

  // Fetch playlists when the user hovers "Add to Playlist"
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
      alert(`Song "${song.name || song.title}" added successfully!`);
      setMenuOpen(false);
      setShowPlaylists(false);
    } catch (error) {
      alert(`Error: ${error.message}`);
    }
  };

  return (
    <div className="song-row">
      <div className="song-info" onClick={() => playSong(song)}>
        <img src={song.image || song.cover} alt={song.name || song.title} className="song-row-image" />
        <div className="song-row-text">
          <p className="song-row-title">{song.name || song.title}</p>
          <p className="song-row-artist">{song.desc || song.artist}</p>
        </div>
      </div>
      <div className="song-actions">
        <p className="song-duration">{song.duration}</p>
        <div className="song-options" ref={menuRef}>
          <button onClick={() => setMenuOpen(!menuOpen)} className="more-options-btn">...</button>
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
    </div>
  );
};

export default SongDetailCard;
import React, { useEffect, useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext.jsx';
import { logoutUser } from '../api/authApis.js';
import { getPlaylists, createPlaylist } from '../api/playlistApis.js';
import { assets } from '../assets/assets.js';
import CreatePlaylistModal from './CreatePlaylistModal.jsx';

const Sidebar = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();
  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Effect to fetch user's playlists when they log in
  useEffect(() => {
    if (user) {
      const fetchPlaylists = async () => {
        setIsLoading(true);
        try {
          const data = await getPlaylists();
          setPlaylists(data || []);
        } catch (error) {
          console.error("Error fetching playlists:", error.message);
        } finally {
          setIsLoading(false);
        }
      };
      fetchPlaylists();
    } else {
      // Clear playlists when user logs out
      setPlaylists([]);
    }
  }, [user]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate('/login');
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  const handleCreatePlaylist = async (title) => {
    if (title && user) {
      try {
        const [newPlaylist] = await createPlaylist(title, user.id);
        // UPDATED: Safely check if a playlist was actually created before updating state
        if (newPlaylist) {
            setPlaylists(prev => [...prev, newPlaylist]);
        }
        setIsModalOpen(false);
      } catch (error) {
        console.error("Failed to create playlist", error);
      }
    }
  };

  return (
    <>
      <CreatePlaylistModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreatePlaylist}
      />
      
      <div className="sidebar-container">
        <nav className="nav-links">
          <NavLink to="/">Home</NavLink>
          <NavLink to="/search">Search</NavLink>
          <NavLink to="/liked">Liked Songs</NavLink>
        </nav>
        
        <hr />

        <div className="playlist-section">
          <div className="playlist-header">
            <NavLink to="/playlists">Your Playlists</NavLink>
            {user && (
              <button onClick={() => setIsModalOpen(true)} className="create-playlist-btn">
                <img src={assets.plus_icon} alt="Create Playlist" />
              </button>
            )}
          </div>
          <div className="sidebar-playlists">
            {isLoading ? (
              <p className="loading-text">Loading...</p>
            ) : (
              user && playlists.map(pl => (
                <NavLink key={pl.id} to={`/playlist/${pl.id}`} className="sidebar-playlist-item">
                  {pl.title}
                </NavLink>
              ))
            )}
          </div>
        </div>

        <div className="sidebar-user-section">
          {user ? (
            <div>
              {/*
                UPDATED: This line is now more robust.
                1. It safely checks for `profile` and `profile.username`.
                2. If that fails, it safely falls back to `user.email`.
                3. If both fail, it defaults to 'User' to prevent any errors.
              */}
              <p>
                Welcome, {profile?.username?.split('@')[0] ?? user?.email?.split('@')[0] ?? 'User'}
              </p>
              <button onClick={handleLogout} className="logout-btn">Logout</button>
            </div>
          ) : (
            <div className="guest-actions">
              <NavLink to="/signup" className="sidebar-btn sidebar-signup">Sign Up</NavLink>
              <NavLink to="/login" className="sidebar-btn sidebar-login">Log In</NavLink>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;
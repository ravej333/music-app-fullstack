import React, { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";
import { logoutUser } from "../api/authApis.js";
import { getPlaylists, createPlaylist } from "../api/playlistApis.js";
import { assets } from "../assets/assets.js";
import CreatePlaylistModal from "./CreatePlaylistModal.jsx";

const Sidebar = () => {
  const { user, profile } = useAuth();
  const navigate = useNavigate();

  const [playlists, setPlaylists] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    if (!user?.id) {
      setPlaylists([]);
      return;
    }

    let isMounted = true;

    const fetchPlaylists = async () => {
      setIsLoading(true);
      try {
        const data = await getPlaylists(user.id);
        if (isMounted) setPlaylists(data || []);
      } catch (error) {
        console.error("Error fetching playlists:", error.message);
      } finally {
        if (isMounted) setIsLoading(false);
      }
    };

    fetchPlaylists();
    return () => { isMounted = false; };
  }, [user?.id]);

  const handleLogout = async () => {
    try {
      await logoutUser();
      navigate("/login", { replace: true });
    } catch (error) {
      console.error("Logout failed:", error.message);
    }
  };

  const handleCreatePlaylist = async (title) => {
    if (!title?.trim() || !user?.id) return;
    try {
      const newPlaylist = await createPlaylist(title.trim(), user.id);
      if (newPlaylist) setPlaylists((prev) => [...prev, newPlaylist]);
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to create playlist:", error.message);
    }
  };

  const displayName =
    typeof profile?.username === "string" && profile.username.length > 0
      ? profile.username.split("@")[0]
      : typeof user?.email === "string"
      ? user.email.split("@")[0]
      : "User";

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
          <NavLink to="/hidden">Hidden Tracks</NavLink>
        </nav>

        <hr />

        <div className="playlist-section">
          <div className="playlist-header">
            <NavLink to="/playlists">Your Playlists</NavLink>
            {user && (
              <button
                onClick={() => setIsModalOpen(true)}
                className="create-playlist-btn"
              >
                <img src={assets.plus_icon} alt="Create Playlist" />
              </button>
            )}
          </div>

          <div className="sidebar-playlists">
            {isLoading ? (
              <p className="loading-text">Loading...</p>
            ) : (
              user &&
              playlists.map((pl) => (
                <NavLink
                  key={pl.id}
                  to={`/playlist/${pl.id}`}
                  className="sidebar-playlist-item"
                >
                  {pl.title}
                </NavLink>
              ))
            )}
          </div>
        </div>

        <div className="sidebar-user-section">
          {user ? (
            <div>
              <p>Welcome, {displayName}</p>
              <button onClick={handleLogout} className="logout-btn">
                Logout
              </button>
            </div>
          ) : (
            <div className="guest-actions">
              <NavLink to="/signup" className="sidebar-btn sidebar-signup">
                Sign Up
              </NavLink>
              <NavLink to="/login" className="sidebar-btn sidebar-login">
                Log In
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default Sidebar;

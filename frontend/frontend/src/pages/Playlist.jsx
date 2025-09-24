// src/pages/Playlist.jsx
import React, { useEffect, useState } from "react";
import PlaylistCard from "../components/PlaylistCard";
import CreatePlaylistModal from "../components/CreatePlaylistModal"; // Import the modal
import { getPlaylists, createPlaylist } from "../api/playlistApis";
import { useAuth } from '../context/AuthContext';

const Playlist = () => {
  const [playlists, setPlaylists] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false); // NEW: State to control the modal
  const { user } = useAuth();

  useEffect(() => {
    const fetchPlaylists = async () => {
      // ... (this logic remains the same)
    };
    fetchPlaylists();
  }, []);

  const handleCreatePlaylist = async (title) => {
    try {
      const [newPlaylist] = await createPlaylist(title, user.id);
      setPlaylists(prev => [...prev, newPlaylist]);
      setIsModalOpen(false); // Close modal on success
    } catch (err) {
      setError("Failed to create playlist.");
    }
  };

  if (loading) return <p>Loading playlists...</p>;

  return (
    <div className="playlist-page">
      <div className="playlist-page-header">
        <h1>Your Playlists</h1>
        {/* NEW: Button to open the modal */}
        <button onClick={() => setIsModalOpen(true)} className="add-playlist-btn">
          Create Playlist
        </button>
      </div>
      
      {/* NEW: Render the modal component */}
      <CreatePlaylistModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onCreate={handleCreatePlaylist}
      />
      
      {error && <p style={{ color: "red" }}>{error}</p>}
      
      <div className="playlist-container">
        {playlists.length > 0 ? (
          playlists.map((pl) => <PlaylistCard key={pl.id} playlist={pl} />)
        ) : (
          <p>You haven't created any playlists yet. Click 'Create Playlist' to start!</p>
        )}
      </div>
    </div>
  );
};

export default Playlist;
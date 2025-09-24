// src/components/PlaylistCard.jsx
import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { PlayerContext } from '../context/PlayerContext';
import { assets } from '../assets/assets';

const PlaylistCard = ({ playlist }) => {
  const { playPlaylist } = useContext(PlayerContext);

  const handlePlayClick = (e) => {
    // Prevent the Link from navigating when the button is clicked
    e.preventDefault();
    playPlaylist(playlist.id);
  };

  return (
    <Link to={`/playlist/${playlist.id}`} className="playlist-card">
      <img
        src={playlist.cover || "/default-cover.png"}
        alt={playlist.title}
      />
      <h4>{playlist.title}</h4>
      <p>{playlist.desc || `A collection of great songs.`}</p>

      {/* NEW: Hover-to-play button */}
      <button onClick={handlePlayClick} className="play-button">
        <img src={assets.play_icon} alt="Play" />
      </button>
    </Link>
  );
};

export default PlaylistCard;
// src/pages/LikedSongs.jsx

import React, { useContext } from 'react';
import { PlayerContext } from '../context/PlayerContext';
import { songsData, assets } from '../assets/assets.js'; // Ensure assets is imported

const LikedSongs = () => {
  const { likedSongIds, playWithId, playNewList } = useContext(PlayerContext);

  const likedSongs = songsData.filter(song => likedSongIds.has(song.id));

  // FIX: Use an existing image from your assets as the fallback cover.
  const playlistCover = likedSongs.length > 0 ? likedSongs[0].image : assets.spotify_logo;

  return (
    <div className="playlist-detail-page">
      <div className="playlist-header">
        <img src={playlistCover} alt="Liked Songs" />
        <div className="playlist-info">
          <p>PLAYLIST</p>
          <h1>Liked Songs</h1>
          <p>{likedSongs.length} songs</p>
        </div>
      </div>

      <div className="playlist-actions">
        {likedSongs.length > 0 && (
          <button className="play-button-large" onClick={() => playNewList(likedSongs)}>
            <img src={assets.play_icon} alt="Play" />
          </button>
        )}
      </div>

      <div className="track-list-container">
        <div className="track-list-header">
          <p>#</p>
          <p>Title</p>
          <p>Album</p>
          <img src={assets.clock_icon} alt="Duration" />
        </div>
        <hr />
        {likedSongs.length > 0 ? (
          likedSongs.map((song, index) => (
            <div key={song.id} className="track-list-row" onClick={() => playWithId(song.id)}>
              <p className="track-index">{index + 1}</p>
              <div className="track-title">
                <img src={song.image} alt={song.name} />
                <div>
                  <h4>{song.name}</h4>
                  <p>{song.desc.split('-')[0].trim()}</p>
                </div>
              </div>
              <p className="track-album">{song.desc}</p>
              <p className="track-duration">{song.duration}</p>
            </div>
          ))
        ) : (
          <p style={{ padding: '20px' }}>Songs you like will appear here. Save songs by clicking the heart icon.</p>
        )}
      </div>
    </div>
  );
};

export default LikedSongs;
// frontend/src/pages/HiddenSongs.jsx

import React from 'react';
import { usePlayer } from '../context/PlayerContext.jsx';
import { songsData, assets } from '../assets/assets.js';
import SongDetailCard from '../components/SongDetailCard.jsx';

const HiddenSongs = () => {
  const { playWithId } = usePlayer();

  // Filter to get only the songs with the "unlisted" category
  const hiddenSongs = songsData.filter(song => song.category === 'unlisted');

  return (
    <div className="page-container">
      <h1>Hidden Tracks</h1>
      <p>These songs are not listed in albums but can be found via search.</p>
      
      <div className="track-list-container" style={{marginTop: '30px'}}>
        {hiddenSongs.length > 0 ? (
          hiddenSongs.map((song) => (
            <SongDetailCard key={song.id} song={song} />
          ))
        ) : (
          <p>No hidden songs found.</p>
        )}
      </div>
    </div>
  );
};

export default HiddenSongs;
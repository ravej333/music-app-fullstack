import React from 'react';
import { useParams } from 'react-router-dom';
import { albumsData, songsData, assets } from '../assets/assets.js';
import { usePlayer } from '../context/PlayerContext.jsx';

const AlbumDetail = () => {
  const { id } = useParams();
  const album = albumsData.find(a => a.id === Number(id)); // Find album by its ID
  const { playWithId, playNewList } = usePlayer();

  if (!album) {
    return <div style={{ padding: '20px' }}>Album not found.</div>;
  }

  // UPDATED: This now intelligently finds all songs with the matching categoryKey
  // instead of using a rigid slice based on array order.
  const albumSongs = songsData.filter(song => song.category === album.categoryKey && !song.unlisted);

  return (
    <div className="playlist-detail-page">
      <div className="playlist-header">
        <img src={album.image} alt={album.name} />
        <div className="playlist-info">
          <p>ALBUM</p>
          <h1>{album.name}</h1>
          <p>{album.desc}</p>
        </div>
      </div>

      <div className="playlist-actions">
        {albumSongs.length > 0 && (
          <button className="play-button-large" onClick={() => playNewList(albumSongs)}>
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
        {albumSongs.length > 0 ? (
          albumSongs.map((song, index) => (
            <div key={song.id} className="track-list-row" onClick={() => playWithId(song.id)}>
              <p className="track-index">{index + 1}</p>
              <div className="track-title">
                <img src={song.image} alt={song.name} />
                <div>
                  <h4>{song.name}</h4>
                  <p>{song.desc.split('-')[0].trim()}</p>
                </div>
              </div>
              <p className="track-album">{album.name}</p>
              <p className="track-duration">{song.duration}</p>
            </div>
          ))
        ) : (
          <p style={{padding: '20px'}}>No songs found for this album.</p>
        )}
      </div>
    </div>
  );
};

export default AlbumDetail;
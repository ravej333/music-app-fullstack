import React from 'react';
import { usePlayer } from '../context/PlayerContext';
import { assets } from '../assets/assets';

const Queue = () => {
  const { playQueue, removeFromQueue, clearQueue, playWithId, currentSong } = usePlayer();

  return (
    <div className="queue-page">
      <div className="page-header-with-action">
        <h1>Up Next</h1>
        {playQueue.length > 0 && (
          <button onClick={clearQueue} className="clear-history-btn">
            Clear Queue
          </button>
        )}
      </div>
      <div className="track-list-container">
        {/* Currently Playing Song */}
        {currentSong && (
          <>
            <h3 className="queue-section-header">Now Playing</h3>
            <div className="track-list-row playing">
                <p className="track-index">
                  <img src={assets.speaker_icon} alt="Playing" className="playing-icon"/>
                </p>
                <div className="track-title">
                  <img src={currentSong.image} alt={currentSong.name} />
                  <div>
                    <h4>{currentSong.name}</h4>
                    <p>{currentSong.desc}</p>
                  </div>
                </div>
                <p className="track-album">{currentSong.desc}</p>
                <p className="track-duration">{currentSong.duration}</p>
            </div>
          </>
        )}
        
        {/* Up Next Queue */}
        {playQueue.length > 0 && <h3 className="queue-section-header">Next Up</h3>}
        {playQueue.length > 0 ? (
          playQueue.map((song, index) => (
            <div key={`${song.id}-${index}`} className="track-list-row queue-item" onClick={() => playWithId(song.id)}>
              <p className="track-index">{index + 1}</p>
              <div className="track-title">
                <img src={song.image} alt={song.name} />
                <div>
                  <h4>{song.name}</h4>
                  <p>{song.desc}</p>
                </div>
              </div>
              <p className="track-album">{song.desc}</p>
              <p className="track-duration">{song.duration}</p>
              <button onClick={(e) => { e.stopPropagation(); removeFromQueue(song.id); }} className="remove-from-queue-btn">
                X
              </button>
            </div>
          ))
        ) : (
          <p style={{marginTop: '20px'}}>No songs in the queue. Right-click a song to add it!</p>
        )}
      </div>
    </div>
  );
};

export default Queue;
// src/components/RecentlyPlayedList.jsx
import React, { useContext } from "react";
import { PlayerContext } from "../context/PlayerContext";
import { assets } from '../assets/assets';

const RecentlyPlayedList = ({ songs }) => {
  const { playWithId } = useContext(PlayerContext);

  if (!songs || songs.length === 0) {
    return <p>You haven't played any songs recently.</p>;
  }

  return (
    <div className="track-list-container">
      {/* Header Row */}
      <div className="track-list-header">
        <p>#</p>
        <p>Title</p>
        <p>Album</p>
        <img src={assets.clock_icon} alt="Duration" />
      </div>

      <hr />

      {/* Song Rows */}
      {songs.map((song, index) => (
        <div key={index} className="track-list-row" onClick={() => playWithId(song.id)}>
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
      ))}
    </div>
  );
};

export default RecentlyPlayedList;
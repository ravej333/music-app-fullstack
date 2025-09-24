import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { getPlaylistById } from '../api/playlistApis'; // Corrected import path
import { songsData, assets } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';

const PlaylistDetail = () => {
  const { id } = useParams();
  const [playlist, setPlaylist] = useState(null);
  const [songs, setSongs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  
  const { playWithId, playNewList } = useContext(PlayerContext);

  useEffect(() => {
    const fetchPlaylistDetails = async () => {
      try {
        setLoading(true);
        const playlistData = await getPlaylistById(id);
        setPlaylist(playlistData);

        const songIds = playlistData.playlist_songs.map(ps => ps.song_id);
        const matchedSongs = songsData.filter(song => songIds.includes(song.id));
        setSongs(matchedSongs);
        
      } catch (err) {
        setError('Failed to fetch playlist details.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    fetchPlaylistDetails();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p style={{ color: 'red' }}>{error}</p>;

  // Use the cover of the first song as the playlist cover, or a default
  const playlistCover = songs.length > 0 ? songs[0].image : "/default-cover.png";

  return (
    <div className="playlist-detail-page">
      {playlist && (
        <div className="playlist-header">
          <img src={playlistCover} alt={playlist.title} />
          <div className="playlist-info">
            <p>PLAYLIST</p>
            <h1>{playlist.title}</h1>
            <p>{songs.length} songs</p>
          </div>
        </div>
      )}

      <div className="playlist-actions">
        <button className="play-button-large" onClick={() => playNewList(songs)}>
          <img src={assets.play_icon} alt="Play" />
        </button>
      </div>

      <div className="track-list-container">
        <div className="track-list-header">
          <p>#</p>
          <p>Title</p>
          <p>Album</p>
          <img src={assets.clock_icon} alt="Duration" />
        </div>
        <hr />
        {songs.length > 0 ? (
          songs.map((song, index) => (
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
          <p style={{ padding: '20px' }}>No songs have been added to this playlist yet.</p>
        )}
      </div>
    </div>
  );
};

export default PlaylistDetail;
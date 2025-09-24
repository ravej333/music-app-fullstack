import React, { useContext } from 'react';
import { assets } from '../assets/assets';
import { PlayerContext } from '../context/PlayerContext';
import { Link } from 'react-router-dom'; // Import Link for the queue button

const PlayerControls = () => {
    const { 
        currentSong, isPlaying, play, pause, next, previous, 
        seekBg, seekBar, seekSong, time, setVolume, 
        isShuffled, toggleShuffle, isLooping, toggleLoop,
        likedSongIds, toggleLike // Destructure the "Liked Songs" context
    } = useContext(PlayerContext);

    // Check if the current song is in the liked songs set
    const isLiked = currentSong && likedSongIds.has(currentSong.id);

    return (
        <div className="player-controls">
            {currentSong ? (
                <>
                    <div className="player-left">
                        <img src={currentSong.image} alt={currentSong.name} />
                        <div>
                            <h4>{currentSong.name}</h4>
                            <p>{currentSong.desc}</p>
                        </div>
                        {/* NEW: Like button */}
                        <img 
                            src={isLiked ? assets.like_icon_filled : assets.like_icon_empty}
                            alt="Like" 
                            className={`like-button ${isLiked ? 'liked' : ''}`}
                            onClick={() => toggleLike(currentSong.id)}
                        />
                    </div>

                    <div className="player-center">
                        {/* This section is unchanged */}
                        <div className="player-controls-buttons">
                            <img 
                                src={assets.shuffle_icon} 
                                alt="Shuffle"
                                className={isShuffled ? 'active-icon' : ''}
                                onClick={toggleShuffle} 
                            />
                            <img src={assets.prev_icon} alt="Previous" onClick={previous} />
                            {isPlaying ? 
                                <img src={assets.pause_icon} alt="Pause" onClick={pause} /> : 
                                <img src={assets.play_icon} alt="Play" onClick={play} />
                            }
                            <img src={assets.next_icon} alt="Next" onClick={next} />
                            <img 
                                src={assets.loop_icon} 
                                alt="Loop"
                                className={isLooping ? 'active-icon' : ''}
                                onClick={toggleLoop}
                            />
                        </div>
                        <div className="player-timeline">
                            <p>{time.currentTime.minute}:{time.currentTime.second}</p>
                            <div ref={seekBg} onClick={seekSong} className="seek-bar">
                                <hr ref={seekBar} className="seek-bar-progress" />
                            </div>
                            <p>{time.totalTime.minute}:{time.totalTime.second}</p>
                        </div>
                    </div>

                    <div className="player-right">
                        {/* NEW: Queue button */}
                        <Link to="/queue">
                            <img src={assets.queue_icon} alt="Queue" className="queue-button" />
                        </Link>
                        <img src={assets.volume_icon} alt="Volume" />
                        <input 
                            type="range" 
                            min="0" 
                            max="1" 
                            step="0.01" 
                            defaultValue="1"
                            onChange={(e) => setVolume(e.target.value)}
                            className="volume-slider"
                        />
                    </div>
                </>
            ) : (
                <div className="player-placeholder">Select a song to play</div>
            )}
        </div>
    );
};

export default PlayerControls;
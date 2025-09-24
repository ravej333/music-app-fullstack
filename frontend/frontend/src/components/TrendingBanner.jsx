import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext.jsx';
// NEW: Import albumsData to find the correct album for a song
import { albumsData } from '../assets/assets.js';

const TrendingBanner = ({ banners }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { playWithId, masterSongList } = usePlayer();
  const navigate = useNavigate();

  // This effect handles the automatic rotation of the banner
  useEffect(() => {
    if (banners && banners.length > 0) {
      const intervalId = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % banners.length);
      }, 4000); // Change banner every 4 seconds

      return () => clearInterval(intervalId);
    }
  }, [banners]);

  if (!banners || banners.length === 0 || masterSongList.length === 0) {
    return null;
  }

  const currentBanner = banners[currentIndex];
  // Find the song details from the master list
  const currentSongDetails = masterSongList.find(song => song.id === currentBanner.songId);

  // Safeguard in case a songId from the banner is invalid
  if (!currentSongDetails) {
    return null; 
  }

  // When the banner area is clicked, play the song
  const handleBannerClick = () => {
    playWithId(currentSongDetails.id);
  };
  
  // UPDATED: When the title is clicked, navigate to the album page
  const handleTitleClick = (e) => {
    e.stopPropagation(); // Prevents the banner's click from firing
    
    // Find the album by matching the song's category with the album's categoryKey
    const album = albumsData.find(a => a.categoryKey === currentSongDetails.category);
    
    if (album) {
      navigate(`/album/${album.id}`);
    }
  };

  return (
    <div className="trending-banner-container" onClick={handleBannerClick}>
      <img 
        src={currentBanner.image} 
        alt={currentSongDetails.name} 
        className="banner-image" 
      />
      <div className="banner-overlay">
        {/* The h3 now has its own click handler */}
        <h3 onClick={handleTitleClick}>{currentSongDetails.name}</h3>
        <p>{currentSongDetails.desc}</p>
      </div>
    </div>
  );
};

export default TrendingBanner;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { usePlayer } from '../context/PlayerContext.jsx';

const TrendingBanner = ({ banners }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { playWithId, masterSongList } = usePlayer(); // Use masterSongList from context
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

  if (!banners || banners.length === 0) {
    return null;
  }

  const currentBanner = banners[currentIndex];
  // Find the song details from the master list, which includes unlisted songs
  const currentSongDetails = masterSongList.find(song => song.id === currentBanner.songId);

  // Safeguard in case a songId from the banner is invalid
  if (!currentSongDetails) {
    return null; 
  }

  // When a banner is clicked, play the associated song using its ID
  const handleBannerClick = () => {
    playWithId(currentSongDetails.id);
  };
  
  // When the title is clicked, navigate to the album if it exists
  const handleTitleClick = (e) => {
      e.stopPropagation(); // Prevents the banner's click from firing
      // Logic to find and navigate to an album can be added here if needed
      // For example: navigate(`/album/${albumId}`);
  };

  return (
    <div className="trending-banner-container" onClick={handleBannerClick}>
      {/* Use the image from the banner data */}
      <img 
        src={currentBanner.image} 
        alt={currentSongDetails.name} 
        className="banner-image" 
      />
      <div className="banner-overlay">
        {/* Use the name and desc from the song details */}
        <h3 onClick={handleTitleClick}>{currentSongDetails.name}</h3>
        <p>{currentSongDetails.desc}</p>
      </div>
    </div>
  );
};

export default TrendingBanner;
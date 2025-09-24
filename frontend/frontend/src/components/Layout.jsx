import React, { useRef, useEffect, useContext } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar.jsx';
import PlayerControls from './PlayerControls.jsx';
import Header from './Header.jsx'; 
import { PlayerContext } from '../context/PlayerContext.jsx';
import { albumsData } from '../assets/assets.js';

const Layout = () => {
  const mainContentRef = useRef();
  const location = useLocation();
  const { currentSong } = useContext(PlayerContext);

  useEffect(() => {
    const albumForSong = albumsData.find(album => 
      currentSong && currentSong.id >= (album.id * 6) && currentSong.id < ((album.id + 1) * 6)
    );
    
    const bgColor = albumForSong ? albumForSong.bgColor : '#121212';
    
    if (mainContentRef.current) {
      mainContentRef.current.style.background = `linear-gradient(to bottom, ${bgColor}, #121212 15%)`;
      mainContentRef.current.scrollTop = 0;
    }

  }, [currentSong, location]);

  return (
    <div className="app-container">
      <div className="sidebar">
        <Sidebar />
      </div>
      <main ref={mainContentRef} className="main-content">
        <Header />
        <div className="page-content">
          <Outlet />
        </div>
      </main>
      <div className="player-controls-container">
        <PlayerControls />
      </div>
    </div>
  );
};

export default Layout;
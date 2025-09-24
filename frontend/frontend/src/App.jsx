import React from 'react';
import { Routes, Route } from 'react-router-dom';

// Import Components
import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';

// Import Page Components (alphabetized)
import AlbumDetail from './pages/AlbumDetail';
// REMOVED: HiddenSongs import is gone
import Home from './pages/Home';
import LikedSongs from './pages/LikedSongs';
import Login from './pages/Login';
import NotFound from './pages/NotFound';
import Playlist from './pages/Playlist';
import PlaylistDetail from './pages/PlaylistDetail';
import Queue from './pages/Queue';
import RecentlyPlayed from './pages/RecentlyPlayed';
import Search from './pages/Search';
import Signup from './pages/Signup';

// Import Global Styles
import './styles/global.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        
        {/* --- Public Routes --- */}
        <Route index element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        {/* --- Protected Routes --- */}
        <Route path="playlists" element={<ProtectedRoute><Playlist /></ProtectedRoute>} />
        <Route path="playlist/:id" element={<ProtectedRoute><PlaylistDetail /></ProtectedRoute>} />
        <Route path="album/:id" element={<ProtectedRoute><AlbumDetail /></ProtectedRoute>} />
        <Route path="liked" element={<ProtectedRoute><LikedSongs /></ProtectedRoute>} />
        {/* REMOVED: The /hidden route is gone */}
        <Route path="queue" element={<ProtectedRoute><Queue /></ProtectedRoute>} />
        <Route path="recently-played" element={<ProtectedRoute><RecentlyPlayed /></ProtectedRoute>} />

        {/* --- Catch-all Route --- */}
        <Route path="*" element={<NotFound />} />
        
      </Route>
    </Routes>
  );
}

export default App;
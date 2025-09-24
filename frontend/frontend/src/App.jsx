import React from 'react';
import { Routes, Route } from 'react-router-dom';

import Layout from './components/Layout';
import ProtectedRoute from './components/ProtectedRoute';
import Home from './pages/Home';
import Search from './pages/Search';
import Playlist from './pages/Playlist';
import RecentlyPlayed from './pages/RecentlyPlayed';
import Login from './pages/Login';
import Signup from './pages/Signup';
import PlaylistDetail from './pages/PlaylistDetail';
import LikedSongs from './pages/LikedSongs';
import AlbumDetail from './pages/AlbumDetail';
import Queue from './pages/Queue';
import NotFound from './pages/NotFound';
import HiddenSongs from './pages/HiddenSongs.jsx'; // NEW: Import the new page

import './styles/global.css';

function App() {
  return (
    <Routes>
      <Route path="/" element={<Layout />}>
        {/* Public Routes */}
        <Route index element={<Home />} />
        <Route path="search" element={<Search />} />
        <Route path="login" element={<Login />} />
        <Route path="signup" element={<Signup />} />

        {/* Protected Routes */}
        <Route path="playlists" element={<ProtectedRoute><Playlist /></ProtectedRoute>} />
        <Route path="recently-played" element={<ProtectedRoute><RecentlyPlayed /></ProtectedRoute>} />
        <Route path="playlist/:id" element={<ProtectedRoute><PlaylistDetail /></ProtectedRoute>} />
        <Route path="liked" element={<ProtectedRoute><LikedSongs /></ProtectedRoute>} />
        <Route path="queue" element={<ProtectedRoute><Queue /></ProtectedRoute>} />
        <Route path="album/:id" element={<ProtectedRoute><AlbumDetail /></ProtectedRoute>} />

        {/* NEW: Add the route for the Hidden Songs page */}
        <Route path="hidden" element={<ProtectedRoute><HiddenSongs /></ProtectedRoute>} />

        {/* Not Found Route */}
        <Route path="*" element={<NotFound />} />
      </Route>
    </Routes>
  );
}

export default App;
import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext.jsx';
import SongCard from "../components/SongCard.jsx";
import AlbumCard from '../components/AlbumCard.jsx';
import TrendingBanner from '../components/TrendingBanner.jsx';
// UPDATED: bannerData is now imported
import { albumsData, songsData, bannerData } from "../assets/assets.js";

export default function Home() {
  const { profile } = useAuth();
  const [greeting, setGreeting] = useState('');

  useEffect(() => {
    const hours = new Date().getHours();
    if (hours < 12) {
      setGreeting('Good morning');
    } else if (hours < 18) {
      setGreeting('Good afternoon');
    } else {
      setGreeting('Good evening');
    }
  }, []);

  // UPDATED: Added filters for all song categories
  const newReleases = songsData.filter(song => song.category === 'new');
  const trendingGlobal = songsData.filter(song => song.category === 'global');
  const massHits = songsData.filter(song => song.category === 'mass');
  const danceTracks = songsData.filter(song => song.category === 'dance');
  const trendingBeats = songsData.filter(song => song.category === 'beat');
  const loveHits = songsData.filter(song => song.category === 'love');

  return (
    <div className="home-page">
      {/* ADDED: The trending banner is back */}
      <TrendingBanner banners={bannerData} />

      <h1 className="home-greeting">
        {greeting}
        {profile?.username ? `, ${profile.username.split('@')[0]}` : ''}
      </h1>

      <section className="home-section">
        <h2>Featured Albums</h2>
        <div className="card-container">
          {albumsData.map((album) => (
            <AlbumCard
              key={album.id}
              id={album.id}
              name={album.name}
              desc={album.desc}
              image={album.image}
            />
          ))}
        </div>
      </section>

      <section className="home-section">
        <h2>New Releases</h2>
        <div className="card-container">
          {newReleases.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </section>

      {/* ADDED: Section for Trending Global songs */}
      <section className="home-section">
        <h2>Trending Global</h2>
        <div className="card-container">
          {trendingGlobal.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </section>

      {/* ADDED: Section for Top Songs India (mass) */}
      <section className="home-section">
        <h2>Top Songs India</h2>
        <div className="card-container">
          {massHits.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </section>
      
      {/* ADDED: Section for Trending India (dance) */}
      <section className="home-section">
        <h2>Trending India</h2>
        <div className="card-container">
          {danceTracks.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </section>

      <section className="home-section">
        <h2>Beat Drops</h2>
        <div className="card-container">
          {trendingBeats.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </section>
      
      <section className="home-section">
        <h2>Love Hits</h2>
        <div className="card-container">
          {loveHits.map((song) => (
            <SongCard key={song.id} song={song} />
          ))}
        </div>
      </section>
    </div>
  );
}
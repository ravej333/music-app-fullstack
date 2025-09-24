import React, { createContext, useContext, useRef, useState, useEffect, useCallback } from "react";
import { songsData, albumsData } from "../assets/assets.js";
import apiClient from '../apiClient.js';

// Helper functions for localStorage
const getInitialLikedSongs = () => {
  try {
    const savedLikes = localStorage.getItem('likedSongs');
    return savedLikes ? new Set(JSON.parse(savedLikes)) : new Set();
  } catch {
    return new Set();
  }
};

const getInitialRecentlyPlayed = () => {
  try {
    const savedRecent = localStorage.getItem('recentlyPlayed');
    return savedRecent ? JSON.parse(savedRecent) : [];
  } catch {
    return [];
  }
};

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
  const audioRef = useRef(new Audio());
  const seekBg = useRef();
  const seekBar = useRef();

  // State
  const [masterSongList, setMasterSongList] = useState(songsData);
  const [queue, setQueue] = useState(songsData);
  const [currentSong, setCurrentSong] = useState(songsData[0]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [time, setTime] = useState({ currentTime: { second: 0, minute: 0 }, totalTime: { second: 0, minute: 0 } });
  const [isShuffled, setIsShuffled] = useState(false);
  const [isLooping, setIsLooping] = useState(false);
  const [likedSongIds, setLikedSongIds] = useState(getInitialLikedSongs());
  const [recentlyPlayed, setRecentlyPlayed] = useState(getInitialRecentlyPlayed());
  const [playQueue, setPlayQueue] = useState([]);
  const [volume, setVolumeState] = useState(1);
    
  // Effect to fetch songs from backend and create a master list
  useEffect(() => {
    const initializePlayer = async () => {
      try {
        const response = await apiClient.get('/songs');
        const backendSongs = response.data.map(song => ({
          ...song,
          image: song.image_url,
          file: song.audio_url,
          desc: song.artist,
        }));
        
        const combinedSongs = [...songsData, ...backendSongs];
        setMasterSongList(combinedSongs);
        setQueue(combinedSongs);
      } catch (error) {
        console.error("Failed to fetch backend songs, using local data:", error);
      }
    };
    initializePlayer();
  }, []);

  // ADDED: This effect ensures the audio source is set on initial load
  useEffect(() => {
      if(currentSong) {
          audioRef.current.src = currentSong.file || currentSong.audio_url;
      }
  }, [currentSong]);

  const addToRecentlyPlayed = useCallback((song) => {
    const updatedHistory = [song, ...recentlyPlayed.filter(s => s.id !== song.id)].slice(0, 50);
    setRecentlyPlayed(updatedHistory);
    localStorage.setItem('recentlyPlayed', JSON.stringify(updatedHistory));
  }, [recentlyPlayed]);

  const playSong = useCallback(async (song) => {
    if (song) {
      setCurrentSong(song);
      // The audio src is now set by the useEffect above, but we can set it here too for immediate playback
      audioRef.current.src = song.file || song.audio_url;
      try {
        await audioRef.current.play();
        addToRecentlyPlayed(song);
      } catch (error) {
          console.error(`Audio playback failed for "${song.name}":`, error);
      }
    }
  }, [addToRecentlyPlayed]);
  
  const playWithId = useCallback(async (id) => {
    const song = masterSongList.find(s => s.id === id);
    if (song) {
      await playSong(song);
    } else {
        console.error(`Song with ID ${id} not found.`);
    }
  }, [masterSongList, playSong]);

  const play = useCallback(() => currentSong && audioRef.current.play(), [currentSong]);
  const pause = useCallback(() => audioRef.current.pause(), []);

  const next = useCallback(() => {
    if (!currentSong) return;
    if (playQueue.length > 0) {
      playSong(playQueue[0]);
      setPlayQueue(prev => prev.slice(1));
      return;
    }
    if (isShuffled) {
      const randomIndex = Math.floor(Math.random() * queue.length);
      playSong(queue[randomIndex]);
      return;
    }
    const currentIndex = queue.findIndex(s => s.id === currentSong.id);
    playSong(queue[(currentIndex + 1) % queue.length]);
  }, [currentSong, queue, playQueue, isShuffled, playSong]);

  const previous = useCallback(() => {
    if (!currentSong) return;
    const currentIndex = queue.findIndex(s => s.id === currentSong.id);
    playSong(queue[(currentIndex - 1 + queue.length) % queue.length]);
  }, [currentSong, queue, playSong]);

  const playNewList = useCallback((songList) => {
    if (songList && songList.length > 0) {
      setQueue(songList);
      playSong(songList[0]);
      setPlayQueue([]);
    }
  }, [playSong]);
    
  const playPlaylist = useCallback(async (playlistId) => {
    const album = albumsData.find(a => a.id === playlistId);
    if (album) {
      const albumSongs = masterSongList.filter(song => song.category === album.categoryKey);
      if (albumSongs.length > 0) {
        playNewList(albumSongs);
      }
    }
  }, [masterSongList, playNewList]);

  const seekSong = (e) => {
    if (audioRef.current.duration) {
      audioRef.current.currentTime = ((e.nativeEvent.offsetX / seekBg.current.offsetWidth) * audioRef.current.duration);
    }
  };

  const setVolume = (newVolume) => {
    const vol = parseFloat(newVolume);
    audioRef.current.volume = vol;
    setVolumeState(vol);
  };
  
  const toggleShuffle = () => setIsShuffled(prev => !prev);
  const toggleLoop = () => setIsLooping(prev => !prev);

  const toggleLike = (songId) => {
    const newSet = new Set(likedSongIds);
    newSet.has(songId) ? newSet.delete(songId) : newSet.add(songId);
    setLikedSongIds(newSet);
    localStorage.setItem('likedSongs', JSON.stringify(Array.from(newSet)));
  };

  const playNext = (song) => setPlayQueue(prev => [song, ...prev]);
  const addToQueue = (song) => setPlayQueue(prev => [...prev, song]);
  const removeFromQueue = (songId) => setPlayQueue(prev => prev.filter(song => song.id !== songId));
  const clearQueue = () => setPlayQueue([]);
  const clearRecentlyPlayed = () => {
    setRecentlyPlayed([]);
    localStorage.removeItem('recentlyPlayed');
  };

  // Effect for handling audio events and syncing state
  useEffect(() => {
    const audio = audioRef.current;
    
    const handlePlay = () => setIsPlaying(true);
    const handlePause = () => setIsPlaying(false);
    const handleTimeUpdate = () => {
      if (!audio.duration) return;
      if (seekBar.current) seekBar.current.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
      setTime({
        currentTime: { minute: Math.floor(audio.currentTime / 60), second: String(Math.floor(audio.currentTime % 60)).padStart(2, '0') },
        totalTime: { minute: Math.floor(audio.duration / 60), second: String(Math.floor(audio.duration % 60)).padStart(2, '0') }
      });
    };
    
    const handleSongEnd = () => next();
    // UPDATED: The error handler now pauses playback instead of creating a failure loop.
    const handleError = (e) => {
        console.error("Audio Error:", e);
        pause();
    };

    audio.addEventListener('play', handlePlay);
    audio.addEventListener('pause', handlePause);
    audio.addEventListener('timeupdate', handleTimeUpdate);
    audio.addEventListener('ended', handleSongEnd);
    audio.addEventListener('error', handleError);
    audio.loop = isLooping;

    return () => {
      audio.removeEventListener('play', handlePlay);
      audio.removeEventListener('pause', handlePause);
      audio.removeEventListener('timeupdate', handleTimeUpdate);
      audio.removeEventListener('ended', handleSongEnd);
      audio.removeEventListener('error', handleError);
    };
  }, [next, isLooping, pause]);
  
  // Effect for Media Session API
  useEffect(() => {
    if (currentSong && 'mediaSession' in navigator) {
      navigator.mediaSession.metadata = new MediaMetadata({
        title: currentSong.name,
        artist: currentSong.desc.split('-')[0].trim(),
        album: 'Music App',
        artwork: [{ src: currentSong.image, sizes: '512x512', type: 'image/jpeg' }]
      });
      navigator.mediaSession.setActionHandler('play', play);
      navigator.mediaSession.setActionHandler('pause', pause);
      navigator.mediaSession.setActionHandler('previoustrack', previous);
      navigator.mediaSession.setActionHandler('nexttrack', next);
    }
  }, [currentSong, play, pause, previous, next]);

  const contextValue = {
    audioRef, seekBg, seekBar, currentSong, isPlaying, time, play, pause, playWithId,
    previous, next, seekSong, setVolume, volume, isShuffled, toggleShuffle, isLooping,
    toggleLoop, likedSongIds, toggleLike, playQueue, playNext, addToQueue, removeFromQueue,
    clearQueue, playNewList, recentlyPlayed, clearRecentlyPlayed, queue, playPlaylist, masterSongList
  };

  return (
    <PlayerContext.Provider value={contextValue}>
      {children}
    </PlayerContext.Provider>
  );
};

export const usePlayer = () => useContext(PlayerContext);
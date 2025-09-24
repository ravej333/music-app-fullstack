// src/context/PlayerContext.jsx
import React, { createContext, useContext, useRef, useState, useEffect, useCallback, useMemo } from "react";
import { songsData, unlistedSongsData, albumsData } from "../assets/assets.js";
import apiClient from '../apiClient.js';

const getInitialLikedSongs = () => {
    try {
        const savedLikes = localStorage.getItem('likedSongs');
        return savedLikes ? new Set(JSON.parse(savedLikes)) : new Set();
    } catch (error) {
        console.error("Failed to parse liked songs from localStorage:", error);
        return new Set();
    }
};

const getInitialRecentlyPlayed = () => {
    try {
        const savedRecent = localStorage.getItem('recentlyPlayed');
        return savedRecent ? JSON.parse(savedRecent) : [];
    } catch (error) {
        console.error("Failed to parse recently played from localStorage:", error);
        return [];
    }
};

export const PlayerContext = createContext();

export const PlayerProvider = ({ children }) => {
    const audioRef = useRef(new Audio());
    const seekBg = useRef();
    const seekBar = useRef();

    const [masterSongList, setMasterSongList] = useState([]);
    const [queue, setQueue] = useState([]);
    const [currentSong, setCurrentSong] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const [time, setTime] = useState({ currentTime: { second: 0, minute: 0 }, totalTime: { second: 0, minute: 0 } });
    const [isShuffled, setIsShuffled] = useState(false);
    const [isLooping, setIsLooping] = useState(false);
    const [likedSongIds, setLikedSongIds] = useState(getInitialLikedSongs());
    const [recentlyPlayed, setRecentlyPlayed] = useState(getInitialRecentlyPlayed());
    const [playQueue, setPlayQueue] = useState([]);
    const [volume, setVolumeState] = useState(1);

    const play = useCallback(() => {
        if (currentSong) {
            audioRef.current.play().catch(e => console.error("Play interruption:", e));
        }
    }, [currentSong]);

    const pause = useCallback(() => {
        if (currentSong) {
            audioRef.current.pause();
        }
    }, [currentSong]);

    // Use functional update to avoid depending on `recentlyPlayed` directly.
    const addToRecentlyPlayed = useCallback((song) => {
        setRecentlyPlayed(prev => {
            const updatedHistory = [song, ...prev.filter(s => s.id !== song.id)];
            const limitedHistory = updatedHistory.slice(0, 50);
            try {
                localStorage.setItem('recentlyPlayed', JSON.stringify(limitedHistory));
            } catch (e) {
                console.error("Failed to save recently played:", e);
            }
            return limitedHistory;
        });
    }, []);

    const playSong = useCallback(async (song) => {
        if (song) {
            setCurrentSong(song);
            audioRef.current.src = song.file || song.audio_url;
            // attempt play but don't block if it fails
            audioRef.current.play().catch(e => console.error("Play interruption:", e));
            addToRecentlyPlayed(song);
        }
    }, [addToRecentlyPlayed]);

    const playWithId = useCallback(async (id) => {
        const song = masterSongList.find(s => s.id === id);
        if (song) {
            await playSong(song);
        } else {
            console.error(`Song with ID ${id} not found in the master list.`);
        }
    }, [masterSongList, playSong]);

    const playPlaylist = useCallback(async (playlistId) => {
        const album = albumsData.find(a => a.id === playlistId);
        if (album) {
            const albumSongs = songsData.slice(album.id * 6, (album.id * 6) + 6);
            if (albumSongs.length > 0) {
                setQueue(albumSongs);
                await playSong(albumSongs[0]);
                setPlayQueue([]);
            }
        }
    }, [playSong]);

    const next = useCallback(() => {
        if (!currentSong) return;

        if (playQueue.length > 0) {
            const nextSongInQueue = playQueue[0];
            setPlayQueue(prev => prev.slice(1));
            playSong(nextSongInQueue);
            return;
        }

        const currentIndex = queue.findIndex(s => s.id === currentSong.id);
        const nextIndex = currentIndex + 1;

        if (nextIndex >= queue.length) {
            if (isLooping && queue.length > 0) {
                playSong(queue[0]);
            } else {
                pause();
            }
        } else {
            playSong(queue[nextIndex]);
        }
    }, [currentSong, isLooping, playQueue, queue, playSong, pause]);

    const previous = useCallback(() => {
        if (!currentSong || queue.length === 0) return;

        const currentIndex = queue.findIndex(s => s.id === currentSong.id);
        if (currentIndex === -1) return;
        const prevIndex = (currentIndex - 1 + queue.length) % queue.length;
        playSong(queue[prevIndex]);
    }, [currentSong, queue, playSong]);

    const seekSong = (e) => {
        if (!audioRef.current.duration || !seekBg.current) return;
        const percent = (e.nativeEvent.offsetX / seekBg.current.offsetWidth);
        audioRef.current.currentTime = percent * audioRef.current.duration;
    };

    const setVolume = (newVolume) => {
        const vol = parseFloat(newVolume);
        audioRef.current.volume = vol;
        setVolumeState(vol);
    };

    const toggleShuffle = useCallback(() => setIsShuffled(prev => !prev), []);
    const toggleLoop = useCallback(() => setIsLooping(prev => !prev), []);

    const toggleLike = useCallback((songId) => {
        setLikedSongIds(prev => {
            const newLikedSet = new Set(prev);
            if (newLikedSet.has(songId)) {
                newLikedSet.delete(songId);
            } else {
                newLikedSet.add(songId);
            }
            try {
                localStorage.setItem('likedSongs', JSON.stringify(Array.from(newLikedSet)));
            } catch (e) {
                console.error("Failed to save liked songs:", e);
            }
            return newLikedSet;
        });
    }, []);

    const playNext = useCallback((song) => setPlayQueue(prev => [song, ...prev]), []);
    const addToQueue = useCallback((song) => setPlayQueue(prev => [...prev, song]), []);
    const removeFromQueue = useCallback((songId) => setPlayQueue(prev => prev.filter(song => song.id !== songId)), []);
    const clearQueue = useCallback(() => setPlayQueue([]), []);

    const playNewList = useCallback(async (songList) => {
        if (songList && songList.length > 0) {
            setQueue(songList);
            await playSong(songList[0]);
            setPlayQueue([]);
        }
    }, [playSong]);

    const clearRecentlyPlayed = useCallback(() => {
        setRecentlyPlayed([]);
        try {
            localStorage.removeItem('recentlyPlayed');
        } catch (e) {
            console.error("Failed to clear recently played:", e);
        }
    }, []);

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

                const allSongsMaster = [...songsData, ...unlistedSongsData, ...backendSongs];
                const visibleSongsQueue = [...songsData, ...backendSongs];

                setMasterSongList(allSongsMaster);
                setQueue(visibleSongsQueue);

                if (visibleSongsQueue.length > 0 && !currentSong) {
                    setCurrentSong(visibleSongsQueue[0]);
                }
            } catch (error) {
                console.error("Failed to fetch songs from backend, falling back to local songs:", error);
                setMasterSongList([...songsData, ...unlistedSongsData]);
                setQueue(songsData);
                if (songsData.length > 0 && !currentSong) {
                    setCurrentSong(songsData[0]);
                }
            }
        };

        initializePlayer();
        // run only once on mount
    }, []); // intentionally empty

    useEffect(() => {
        const audio = audioRef.current;

        const handleTimeUpdate = () => {
            if (!audio.duration) return;
            if (seekBar.current) {
                seekBar.current.style.width = `${(audio.currentTime / audio.duration) * 100}%`;
            }
            setTime({
                currentTime: { minute: Math.floor(audio.currentTime / 60), second: String(Math.floor(audio.currentTime % 60)).padStart(2, '0') },
                totalTime: { minute: Math.floor(audio.duration / 60), second: String(Math.floor(audio.duration % 60)).padStart(2, '0') }
            });
        };

        const handleSongEnd = () => next();
        const handleError = (e) => {
            console.error("Audio Error:", e);
            next();
        };
        const handleLoadedMetadata = () => {
            if (audio.duration) {
                setTime(prev => ({
                    ...prev,
                    totalTime: { minute: Math.floor(audio.duration / 60), second: String(Math.floor(audio.duration % 60)).padStart(2, '0') }
                }));
            }
        };

        const handlePlay = () => setIsPlaying(true);
        const handlePause = () => setIsPlaying(false);

        audio.addEventListener('play', handlePlay);
        audio.addEventListener('pause', handlePause);
        audio.addEventListener('timeupdate', handleTimeUpdate);
        audio.addEventListener('ended', handleSongEnd);
        audio.addEventListener('error', handleError);
        audio.addEventListener('loadedmetadata', handleLoadedMetadata);
        audio.loop = isLooping;

        return () => {
            audio.removeEventListener('play', handlePlay);
            audio.removeEventListener('pause', handlePause);
            audio.removeEventListener('timeupdate', handleTimeUpdate);
            audio.removeEventListener('ended', handleSongEnd);
            audio.removeEventListener('error', handleError);
            audio.removeEventListener('loadedmetadata', handleLoadedMetadata);
        };
    }, [isLooping, next]); // next is stable via useCallback

    useEffect(() => {
        if (currentSong) {
            if (isPlaying) {
                audioRef.current.play().catch(e => console.error("Play interruption:", e));
            } else {
                audioRef.current.pause();
            }

            if ('mediaSession' in navigator) {
                try {
                    navigator.mediaSession.metadata = new MediaMetadata({
                        title: currentSong.name,
                        artist: (currentSong.desc || '').split('-')[0]?.trim() || '',
                        album: 'Music App',
                        artwork: [{ src: currentSong.image, sizes: '512x512', type: 'image/jpeg' }]
                    });
                    navigator.mediaSession.setActionHandler('play', play);
                    navigator.mediaSession.setActionHandler('pause', pause);
                    navigator.mediaSession.setActionHandler('previoustrack', previous);
                    navigator.mediaSession.setActionHandler('nexttrack', next);
                } catch (e) {
                    console.error("Media Session error:", e);
                }
            }
        }
    }, [currentSong, isPlaying, play, pause, previous, next]);

    // memoize context to avoid creating a new object every render
    const contextValue = useMemo(() => ({
        audioRef, seekBg, seekBar, currentSong, setCurrentSong, isPlaying, setIsPlaying, time, play, pause,
        playWithId, playSong, previous, next, seekSong, setVolume, volume, isShuffled, toggleShuffle, isLooping,
        toggleLoop, likedSongIds, toggleLike, playQueue, playNext, addToQueue, removeFromQueue,
        clearQueue, playNewList, recentlyPlayed, clearRecentlyPlayed, queue, playPlaylist, masterSongList
    }), [
        audioRef, seekBg, seekBar, currentSong, isPlaying, time, play, pause, playWithId, playSong,
        previous, next, seekSong, volume, isShuffled, toggleShuffle, isLooping, toggleLoop,
        likedSongIds, toggleLike, playQueue, playNext, addToQueue, removeFromQueue, clearQueue,
        playNewList, recentlyPlayed, clearRecentlyPlayed, queue, playPlaylist, masterSongList
    ]);

    return (
        <PlayerContext.Provider value={contextValue}>
            {children}
        </PlayerContext.Provider>
    );
};

export const usePlayer = () => useContext(PlayerContext);

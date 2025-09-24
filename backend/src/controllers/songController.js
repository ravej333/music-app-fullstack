import { getAllSongs, createSong } from '../models/songModel.js';

/**
 * Handles the request to get all songs.
 */
export const getSongs = async (req, res) => {
  try {
    const songs = await getAllSongs();
    res.status(200).json(songs);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

/**
 * Handles the request to add a new song.
 */
export const addNewSong = async (req, res) => {
  try {
    const songData = req.body;

    // Simple validation
    if (!songData.name || !songData.audio_url) {
      return res.status(400).json({ error: 'Song name and audio URL are required.' });
    }

    const newSong = await createSong(songData);
    res.status(201).json(newSong); // 201 means "Created"
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
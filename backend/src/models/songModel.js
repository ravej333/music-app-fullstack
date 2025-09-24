import { supabase } from '../config/supabaseClient.js';

/**
 * Fetches all songs from the database.
 */
export const getAllSongs = async () => {
  const { data, error } = await supabase.from('songs').select('*');
  if (error) {
    throw new Error(error.message);
  }
  return data;
};

/**
 * Creates a new song in the database.
 * @param {object} songData - The data for the new song.
 */
export const createSong = async (songData) => {
  const { data, error } = await supabase
    .from('songs')
    .insert([songData])
    .select(); // .select() returns the created record

  if (error) {
    throw new Error(error.message);
  }
  return data;
};
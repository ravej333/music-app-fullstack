import { supabase } from "../supabaseClient";

// Create a new playlist
export const createPlaylist = async (title, userId) => {
  const { data, error } = await supabase
    .from("playlists")
    .insert([{ title, user_id: userId }])
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Get all playlists of a user
export const getPlaylists = async (userId) => {
  const { data, error } = await supabase
    .from("playlists")
    .select("*")
    .eq("user_id", userId);

  if (error) throw error;
  return data;
};

// Get playlist by ID with songs
export const getPlaylistById = async (playlistId) => {
  const { data, error } = await supabase
    .from("playlists")
    .select(`
      id,
      title,
      playlist_songs (
        song_id
      )
    `)
    .eq("id", playlistId)
    .single();

  if (error) throw error;
  return data;
};

// Add a song to a playlist
export const addSongToPlaylist = async (playlistId, songId) => {
  const { data, error } = await supabase
    .from("playlist_songs")
    .insert([{ playlist_id: playlistId, song_id: songId }]);

  if (error) throw error;
  return data;
};

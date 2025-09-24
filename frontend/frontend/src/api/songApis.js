import { songsData } from "../assets/assets";

// Simulates searching songs from the local asset file
export const searchSongs = async (query) => {
  const lowercasedQuery = query.toLowerCase();
  
  const results = songsData.filter(song => 
    song.name.toLowerCase().includes(lowercasedQuery) ||
    song.desc.toLowerCase().includes(lowercasedQuery)
  );
  
  // Map to a consistent format
  return results.map(song => ({
    id: song.id,
    title: song.name,
    artist: song.desc.split('-')[0].trim(),
    cover: song.image,
    url: song.file,
  }));
};

// Simulates fetching all songs
export const getLocalSongs = () => {
  return songsData.map(song => ({
    id: song.id,
    title: song.name,
    artist: song.desc.split('-')[0].trim(),
    cover: song.image,
    url: song.file,
  }));
};
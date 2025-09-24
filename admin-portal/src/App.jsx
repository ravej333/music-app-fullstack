import React, { useState, useEffect } from 'react';
import { supabase } from './supabaseClient.js';
import './App.css';

// --- Login Component ---
const Login = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);
    const { data, error } = await supabase.auth.signInWithPassword({
      email,
      password,
    });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      onLogin(data.session);
    }
  };

  return (
    <div className="login-container">
      <h2>Admin Portal Login</h2>
      <form onSubmit={handleLogin} className="upload-form">
        <div className="form-group">
          <label>Email</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Password</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit" disabled={loading}>
          {loading ? 'Logging in...' : 'Log In'}
        </button>
        {error && <p className="message error">{error}</p>}
      </form>
    </div>
  );
};

// --- Main App Component (Upload Form) ---
function App() {
  const [session, setSession] = useState(null);

  // Form state
  const [songName, setSongName] = useState('');
  const [artistName, setArtistName] = useState('');
  const [imageFile, setImageFile] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState('');

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const { data: { subscription } } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!songName || !artistName || !imageFile || !audioFile) {
      setMessage('Error: Please fill out all fields and select both files.');
      return;
    }

    setLoading(true);
    setMessage('Uploading files...');

    try {
      const imageFileName = `${Date.now()}_${imageFile.name.replace(/\s/g, '_')}`;
      const { error: imageError } = await supabase.storage
        .from('images')
        .upload(imageFileName, imageFile);
      if (imageError) throw imageError;
      const { data: { publicUrl: imageUrl } } = supabase.storage.from('images').getPublicUrl(imageFileName);

      const audioFileName = `${Date.now()}_${audioFile.name.replace(/\s/g, '_')}`;
      const { error: audioError } = await supabase.storage
        .from('songs')
        .upload(audioFileName, audioFile);
      if (audioError) throw audioError;
      const { data: { publicUrl: audioUrl } } = supabase.storage.from('songs').getPublicUrl(audioFileName);
      
      setMessage('Adding song to database...');
      const { error: dbError } = await supabase
        .from('songs')
        .insert([{ 
            name: songName, 
            artist: artistName,
            image_url: imageUrl, 
            audio_url: audioUrl 
        }]);
      if (dbError) throw dbError;

      setMessage('✅ Song successfully added!');
      setSongName('');
      setArtistName('');
      e.target.reset();

    } catch (error) {
      setMessage(`Error: ${error.message}`);
      console.error(error);
    } finally {
      setLoading(false);
    }
  };
  
  if (!session) {
    return <Login onLogin={setSession} />;
  }

  return (
    <div className="admin-container">
      <div className="header">
        <h1>Music App Admin Portal</h1>
        <button onClick={() => supabase.auth.signOut()} className="logout-btn">Logout</button>
      </div>
      <p>You are logged in as {session.user.email}.</p>
      
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label>Song Name</label>
          <input type="text" value={songName} onChange={(e) => setSongName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Artist Name</label>
          <input type="text" value={artistName} onChange={(e) => setArtistName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Cover Art (Image File)</label>
          <input type="file" accept="image/*" onChange={(e) => setImageFile(e.target.files[0])} required />
        </div>
        <div className="form-group">
          <label>Audio File (MP3)</label>
          <input type="file" accept="audio/mp3" onChange={(e) => setAudioFile(e.target.files[0])} required />
        </div>
        
        <button type="submit" disabled={loading}>
          {loading ? 'Uploading...' : 'Add Song'}
        </button>
      </form>
      
      {message && <p className="message">{message}</p>}
    </div>
  );
}

export default App;
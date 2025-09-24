// src/components/CreatePlaylistModal.jsx
import React, { useState } from 'react';

const CreatePlaylistModal = ({ isOpen, onClose, onCreate }) => {
  const [title, setTitle] = useState('');

  if (!isOpen) {
    return null;
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    if (title.trim()) {
      onCreate(title);
    }
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Create New Playlist</h2>
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="My Awesome Mix"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            autoFocus
          />
          <div className="modal-actions">
            <button type="button" onClick={onClose} className="btn-cancel">Cancel</button>
            <button type="submit" className="btn-create">Create</button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreatePlaylistModal;
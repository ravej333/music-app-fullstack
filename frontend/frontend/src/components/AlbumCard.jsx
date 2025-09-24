import React from 'react';
import { useNavigate } from 'react-router-dom';

const AlbumCard = ({ id, image, name, desc }) => {
  const navigate = useNavigate();

  return (
    <div onClick={() => navigate(`/album/${id}`)} className="album-card">
      <img src={image} alt={name} />
      <h4>{name}</h4>
      <p>{desc}</p>
    </div>
  );
};

export default AlbumCard;
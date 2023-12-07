import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const EditGame = ({ name: initialName, genres: initialGenres, description: initialDescription, platforms: initialPlatforms, img: initialImg, id: initialId }) => {
  const [firstName, setFirstName] = useState(initialName);
  const [genres, setGenres] = useState(initialGenres);
  const [description, setDescription] = useState(initialDescription);
  const [platforms, setPlatforms] = useState(initialPlatforms);
  const [img, setImg] = useState(initialImg);
  const [gettedId, setId] = useState(initialId);
  const navigate = useNavigate();

  const editGame = async () => {
    try {
      const response = await fetch(`http://localhost:3008/api/games/${gettedId}`);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }
  
      const jsonData = await response.json();
      console.log(jsonData.data);
  
      // Pasar los datos del juego al componente FormUpdate
      navigate(`/MoreGames/update/${gettedId}`, { state: jsonData.data });
    } catch (error) {
      console.error(error);
    }
  };
  

  return (
    <i className="bi bi-pencil-square" onClick={editGame}></i>
  );
};

export default EditGame;

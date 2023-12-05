import React, { useEffect, useState } from 'react';
import './backinfo.css';
import '../Games/Games.css';
import FilterBack from '../BackFilter/FilterBack';

const BackGameInfo = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedLetter, setSelectedLetter] = useState('');

  const fetchData = async (letter) => {
    try {
      const url = letter
        ? `http://localhost:3008/api/letter?name=${letter}`
        : 'http://localhost:3008/api/games';

      const response = await fetch(url);
      if (!response.ok) {
        throw new Error(`Error ${response.status}: ${response.statusText}`);
      }

      const jsonData = await response.json();
      console.log("Data obtenida");
      console.log(jsonData.data);
      setData(jsonData.data);
    } catch (error) {
      console.error('Error fetching data:', error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchData(selectedLetter);
  }, [selectedLetter]);

  const handleLetterSelect = (letter) => {
    setSelectedLetter(letter);
  };

  return (
    <>
      {loading ? (
        <p className='loading'>"Cargando..."</p>
      ) : (
        <>
          <div className='filter filter-back'>
            <FilterBack onSelect={handleLetterSelect} />
          </div>
          <div className='games'>
            {data.length > 0 ? (
              data.map(({ _id, name, description, platforms, img }) => (
                <div className='card' key={_id}>
                  <img src={img} alt={name} className='db-img' />
                  <div className="card-data card-back">
                    <h2 className='db-name'>{name}</h2>
                    <p className='description'>{description}</p>
                    <p>Platforms: {platforms}</p>
                  </div>
                </div>
              ))
            ) : (
              <p className='no-games'>No hay juegos con la letra: {selectedLetter}</p>
            )}
          </div>
        </>
      )}
    </>
  );
};

export default BackGameInfo;
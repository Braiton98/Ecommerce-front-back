import React, { useEffect, useState } from 'react';
import './backinfo.css';
import '../Games/Games.css';

const BackGameInfo = () => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('http://localhost:3008/api/games');
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

    fetchData();
  }, []);

  return (
    <>
      {loading ? (
        <p className='loading'>"Cargando..."</p>
      ) : (
        <div className='games'>
          {data.map(({ _id, name, description, platforms, img }) => (
            <div className='card' key={_id}>
              <img src={img} alt={name} className='db-img' />
              <div className="card-data card-back">
                <h2 className='db-name'>{name}</h2>
                <p className='description'>{description}</p>
                <p>Platforms: {platforms}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default BackGameInfo;

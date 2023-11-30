// import { useEffect, useState } from 'react'
// import './backinfo.css'

// const BackGameInfo = () => {

//   const [data, setData] = useState([]);

//   useEffect(() => {
//     const fetchData = async () => {
//       const response = await fetch('http://localhost:3008/api/games');
//       const jsonData = await response.json();
//       console.log(jsonData)
//       setData(jsonData);
//     }
//     fetchData();
//   }, [])

//   console.log(Array.isArray(data))

//   return (
//     <>
//       {data.length > 0 ? (
//         data.map(({ _id, name, description, platforms, img }) => (
//           <div className='db-container' key={_id}>
//             <div className="db-games">
//               <h2 className='db-name'>{name}</h2>
//               <img src={img} alt="game" className='db-img'/>
//               <p className='db-description'>{description}</p>
//               <p className='db-platforms'>Plataformas: {platforms}</p>
//             </div>
//           </div>
//         ))
//       ) : (
//         <p className='loading'>"Cargando..."</p>
//       )}
//     </>
//   )
// }

// export default BackGameInfo

import React, { useEffect, useState } from 'react';
import './backinfo.css';

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
        console.log(jsonData);
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
        <div className='db'>
          {data.map(({ _id, name, description, platforms, img }) => (
            <div className='db-container' key={_id}>
              <div className="db-games">
                <h2 className='db-name'>{name}</h2>
                <img src={img} alt={name} className='db-img'/>
                <p className='db-description'>{description}</p>
                <p className='db-platforms'>Plataformas: {platforms}</p>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default BackGameInfo;

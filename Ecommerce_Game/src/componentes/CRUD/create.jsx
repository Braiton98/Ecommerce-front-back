import  { useState } from "react";
import axios from 'axios'

function FormCreate() {
  const [firstName, setFirstName] = useState("name");
  const [genres, setGenres] = useState("genre");
  const [description, setDescription] = useState("description");
  const [platforms, setPlatforms] = useState("platforms");
  const [img, setImg] = useState("Image link");
  const [id, setId] = useState(0);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleGenresChange = (e) => {
    setGenres(e.target.value);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
  };

  const handlePlatformsChange = (e) => {
    setPlatforms(e.target.value);
  };

  const handleIdChange = (e) => {
    setId(e.target.value);
  };

  const handleImgChange = (e) => {
    setImg(e.target.value);
  };

  const dataCatch = async () => {
    if (
      description !== "description" &&
      platforms !== "platforms" &&
      img !== "Image link" &&
      firstName !== "name" &&
      id <= 100
    ){
      const data = {
        name: firstName,
        genres: genres,
        description: description,
        platforms: platforms,
        img: img,
        id: Number(id),
      };
      const jsonData = JSON.stringify(data)
      console.log(jsonData)
      postData(data)
    }else{
      alert("The video game cannot be loaded. Incorrect information or IDs greater than 100.")
    }
  }


  const postData = async (fdata) => {
    try {
      const response = await axios({
        url: `http://localhost:3008/api/games`,
        method: "POST",
        data: fdata
      });
  
      if (response.status === 200) {
        console.log("¡Solicitud POST exitosa!");
      } else {
        // Manejar errores en la respuesta
        console.error("Error en la respuesta:", response.status, response.statusText);
      }
    } catch (error) {
      // Manejar errores de la propia solicitud
      console.error("Error durante la solicitud:", error);
    }
  };
  


  return (
    <form>
      <input
        type="text"
        value={firstName}
        onChange={handleFirstNameChange}
        required
      />
      <input type="text" value={genres} onChange={handleGenresChange} required />
      <input
        type="text"
        value={description}
        onChange={handleDescriptionChange}
        required
      />
      <input
        type="text"
        value={platforms}
        onChange={handlePlatformsChange}
        required
      />
      <input type="url" value={img} onChange={handleImgChange} required />
      <input
        type="number"
        required
        value={id}
        onChange={handleIdChange}
      />
      <button type="button" onClick={dataCatch}>
        Submit
      </button>
    </form>
  );
}

export default FormCreate;

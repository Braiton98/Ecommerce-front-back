import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";



function FormUpdate({ name, genres, description, platforms, img, id }) {

    const [firstName, setFirstName] = useState(name);
    const [gettedGenres, setGenres] = useState(genres);
    const [gettedDescription, setDescription] = useState(description);
    const [gettedPlatforms, setPlatforms] = useState(platforms);
    const [gettedImg, setImg] = useState(img);
    const [gettedId, setId] = useState(id);
    const navigate = useNavigate()

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
        try {
            if (
                description !== "description" &&
                platforms !== "platforms" &&
                img !== "Image link" &&
                firstName !== "name" &&
                id < 100
            ) {
                const data = {
                    name: firstName,
                    genres: gettedGenres,
                    description: gettedDescription,
                    platforms: gettedPlatforms,
                    img: gettedImg,
                    id: Number(gettedId),
                };

                const jsonData = JSON.stringify(data);
                console.log(jsonData);

                await postData(data);
                setFirstName("");
                setGenres("");
                setDescription("");
                setPlatforms("");
                setImg("");
                setId("");
                navigate("/MoreGames");
            } else {
                alert("The video game cannot be loaded. Incorrect information or IDs greater than or equal to 100.");
            }
        } catch (error) {
            console.error("Error during request:", error.message);
        }
    };

    const postData = async (fdata) => {
        try {
            const response = await axios({
                url: `http://localhost:3008/api/games/${id}`,
                method: "PUT",
                data: fdata,
            });

            if (response.status === 200) {
                console.log("Successful POST request!");
            } else {
                console.error("Error in response:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("Error during request:", error.message);
            throw error; 
        }
    };

    return (
        <form>
            <input
                type="text"
                value={firstName}
                onChange={handleFirstNameChange}
                placeholder="name"
                required
            />
            <input
                type="text"
                value={genres}
                onChange={handleGenresChange}
                placeholder="genres"
                required
            />
            <input
                type="text"
                value={description}
                onChange={handleDescriptionChange}
                placeholder="description"
                required
            />
            <input
                type="text"
                value={platforms}
                onChange={handlePlatformsChange}
                placeholder="platforms"
                required
            />
            <input
                type="url"
                value={img}
                onChange={handleImgChange}
                placeholder="url image"
                required
            />
            <input
                type="number"
                required
                value={id}
                placeholder="id"
                onChange={handleIdChange}
            />
            <button type="button" onClick={dataCatch}>
                Submit
            </button>
        </form>
    );
}

export default FormUpdate;
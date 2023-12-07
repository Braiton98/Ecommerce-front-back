import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function FormUpdate({ name: initialName, genres: initialGenres, description: initialDescription, platforms: initialPlatforms, img: initialImg, id: initialId }) {
    const [firstName, setFirstName] = useState(initialName);
    const [genres, setGenres] = useState(initialGenres);
    const [description, setDescription] = useState(initialDescription);
    const [platforms, setPlatforms] = useState(initialPlatforms);
    const [img, setImg] = useState(initialImg);
    const [gettedId, setId] = useState(initialId);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await getGames(gettedId);
                const data = response.data; // Obtener datos del juego
                setFirstName(data.name);
                setGenres(data.genres);
                setDescription(data.description);
                setPlatforms(data.platforms);
                setImg(data.img);
            } catch (error) {
                console.error("Error fetching data:", error.message);
            }
        };

        fetchData();
    }, [gettedId]);

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
            const data = {
                name: firstName,
                genres: genres,
                description: description,
                platforms: platforms,
                img: img,
                id: Number(gettedId),
            };

            await postData(data);
            navigate("/MoreGames");
        } catch (error) {
            console.error("Error during request:", error.message);
        }
    };

    const getGames = async (gettedId) => {
        try {
            const response = await axios({
                url: `http://localhost:3008/api/games/${gettedId}`,
                method: "GET",
            });

            if (response.status === 200) {
                return response;
            } else {
                console.error("Error in response:", response.status, response.statusText);
            }
        } catch (error) {
            console.error("Error during request:", error.message);
            throw error;
        }
    };

    const postData = async (fdata) => {
        try {
            const response = await axios({
                url: `http://localhost:3008/api/games/${gettedId}`,
                method: "PUT",
                data: fdata,
            });

            if (response.status === 200) {
                console.log("Successful PUT request!");
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
                value={gettedId}
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


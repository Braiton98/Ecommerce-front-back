import axios from "axios";
import { useNavigate } from "react-router-dom";

function Logout() {
  const navigate = useNavigate();

  const handleToken = async () => {
    try {
      const response = await axios({
        url: `${import.meta.env.VITE_API_URL}/api/logout`,
        method: "POST",
        withCredentials: true
      });

      if (response.status === 200) {
        console.log("Logout exitoso.");
        navigate("/");
        
      }
    } catch (error) {
      console.error("Error al intentar salir:",error)
    }
  }
  
  return (
    <>
      <button onClick={handleToken}>
        LOGOUT
      </button>
    </>
  );
}

export default Logout;
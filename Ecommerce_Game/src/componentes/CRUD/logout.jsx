import axios from "axios";

function Logout() {

  const handleToken = async () => {
    try {
      const response = await axios({
        url: `http://localhost:3008/api/logout`,
        method: "POST"
      });

      if (response.ok) {
        console.log("Logout")
      }
    } catch (error) {
      console.error(error)
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
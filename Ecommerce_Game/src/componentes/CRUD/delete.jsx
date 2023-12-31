/* eslint-disable react/prop-types */


export const DeleteG = ({ idb, onDelete }) => {
  const deleteGame = async () => {
    try {
      const response = await fetch(`http://localhost:3008/api/games/${idb}`, {
        method: 'DELETE',
      });

      if (response.ok) {
        console.log('Game deleted successfully');
        
        
        onDelete();

      } else {
        const error = await response.json();
        console.error('Error deleting game:', error);
      }
    } catch (error) {
      console.error('An error occurred during the deleteGame request:', error);
    }
  };

  return (
    <i className="bi bi-trash" onClick={deleteGame}></i>
  );
};

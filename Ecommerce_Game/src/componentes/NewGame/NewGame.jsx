import React from 'react';
import { Link } from 'react-router-dom';
import './newgame.css';

export const NewGame = () => {
  return (
    <div className='filter filter-back'>
      <button><Link to={"/MoreGames/create"}>Add New Game</Link></button>
    </div>
  )
}

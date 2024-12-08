import {useState} from 'react';

export default function Player({name, symbol, onPlayerNameChange}) {
const [isEditing, setIsEditing] = useState(false);
const [playerName, setPlayerName] = useState(name);

function handleEditBtnClick() {
    setIsEditing(() =>!isEditing);
}

function changePlayerName(event) {
  //  console.log(event.target.value);
    setPlayerName(event.target.value);
    onPlayerNameChange(event.target.value, symbol);
   
}

    return (
        <li>
            <span className="player">
                {isEditing ? <input onChange={changePlayerName} value={playerName}/> :  <span className="player-name">{playerName}</span>}             
              <span className="player-symbol">{symbol}</span>
            </span>
            <button onClick={handleEditBtnClick}>{!isEditing ? 'Edit' : 'Save'}</button>
          </li>
    );
}
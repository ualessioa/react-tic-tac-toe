import { useState } from "react"

export default function Player({initialName, symbol, isActive, onPlayerChange}) {
    const [ isEditing, setIsEditing ] = useState(false)
    const [ playerName, setPlayerName ] = useState(initialName)

    function handleEditClick () {
      setIsEditing((editing) => !editing)

      if (editing) {
        onPlayerChange(symbol, playerName)
      }
    }

    function handleChange(event) {setPlayerName(event.target.value)}

    return (
          <li className={isActive ? "active" : undefined}>
              <span className="player">

                {!isEditing ? <span className="player-name">{playerName}</span> : <input value={playerName} type="text" required onChange={handleChange}/>}
                <span className="player-, playerName">{symbol}</span>
              </span>
              <button onClick={handleEditClick}>{!isEditing ? "Edit" : "Save" }</button>
            </li>
    )
}
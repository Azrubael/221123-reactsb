import React from 'react'

// Этот модуль отвечает за отображение основной информации о происходящем в игре
const ActionsInfo = ({ shipsReady = false, canShoot = false, ready }) => {
    console.log(shipsReady)
    if (!shipsReady) {
        return <button className="btn-ready"
            onClick={ready}>My ships are ready!</button>
    }
    return (
        <div>
            {canShoot
             ? <p>Your shot!</p> : <p>Enemy's shot!</p>
            }
        </div>
    )
}

export default ActionsInfo
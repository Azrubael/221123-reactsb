import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import ActionsInfo from '../components/ActionsInfo'
import BoardComponent from '../components/BoardComponent'
import { Board } from '../models/Board'

const GamePage = () => {

  const [myBoard, setMyBoard] = useState(new Board())
  const [hisBoard, setHisBoard] = useState(new Board())
  const [rivalName, setRivalName] = useState('')
  const [shipsReady, setShipsReady] = useState(false)
  const [canShoot, setCanShoot] = useState(false)

  const { gameId } = useParams()

  function restart() {
    const newMyBoard = new Board()
    const newHisBoard = new Board()
    newMyBoard.initCells()
    newHisBoard.initCells()
    setMyBoard(newMyBoard)
    setHisBoard(newHisBoard)
  }

  function shoot(x, y) {

  }

  useEffect(() => {
    restart()
  },[])

  return (
    <div>
      <p>WELCOME TO GAME</p>
      <div className='boards-container'>
        <div>
          <p className='nick'>{localStorage.nickname}</p>
          <BoardComponent
            board={myBoard}
            isMyBoard
            shipsReady={shipsReady}
            setBoard={setMyBoard}
            canShoot={false}
          />
        </div>
        <div>
          <p className='nick'>{rivalName || 'Jonnie Rival'}</p>
          <BoardComponent
            board={hisBoard}
            setBoard={setHisBoard}
            canShoot={canShoot}
            shipsReady={shipsReady}
            shoot={shoot}
          />
        </div>
      </div>
    </div>
  )
}

export default GamePage
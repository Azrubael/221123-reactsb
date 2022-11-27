import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import ActionsInfo from '../components/ActionsInfo'
import BoardComponent from '../components/BoardComponent'
import { Board } from '../models/Board'

const wss = new WebSocket('ws://localhost:4000')

const GamePage = () => {

  const [myBoard, setMyBoard] = useState(new Board())
  const [hisBoard, setHisBoard] = useState(new Board())
  const [rivalName, setRivalName] = useState('')
  const [shipsReady, setShipsReady] = useState(false)
  const [canShoot, setCanShoot] = useState(false)

  const { gameId } = useParams()
  // console.log('gameId = ', gameId)

  function restart() {
    const newMyBoard = new Board()
    const newHisBoard = new Board()
    newMyBoard.initCells()
    newHisBoard.initCells()
    setMyBoard(newMyBoard)
    setHisBoard(newHisBoard)
  }

  const navigate = useNavigate()

  function shoot(x, y) {
    wss.send(JSON.stringify({ event: 'shoot', payload: {
      username: localStorage.nickname, x, y, gameId } }))
  }

  // Ловушка событий
  wss.onmessage = function(response) {
    // парсинг ответа WebSocketServer
    const {type, payload} = JSON.parse(response.data)
    // деструктуризация 'payload'
    const {username, x, y, canStart, rivalName, success} = payload
    // логика распределения ходов
    switch (type) {
      case 'connectToPlay': 
        if (!success) {
          return navigate('/')
        }
        setRivalName(rivalName)
        break
      case 'readyToPlay':
        if (payload.username === localStorage.nickname && canStart) {
          //подсветка поля противника зеленым в знак доступности для выстрела
          setCanShoot(true)
      }
        break
      case 'afterShootByMe':
        // console.log('afterShoot', username !== localStorage.nickname)
        if (username !== localStorage.nickname) {
          const isPerfectHit = myBoard.cells[y][x].mark?.name === 'ship'
          changeBoardAfterShoot(myBoard, setMyBoard, x, y, isPerfectHit)
          wss.send(JSON.stringify({ event: 'checkShoot', payload: { ...payload, isPerfectHit } }))
          if (!isPerfectHit) {
            setCanShoot(true)
          }
        }
        break
      case 'isPerfectHit':
        if (username === localStorage.nickname) {
          changeBoardAfterShoot(hisBoard, setHisBoard, x, y, payload.isPerfectHit)
          payload.isPerfectHit ? setCanShoot(true) : setCanShoot(false)
        }
        break
      default:
        break
    }
  }

  function changeBoardAfterShoot(board, setBoard, x, y, isPerfectHit) {
    isPerfectHit ? board.addDamage(x, y) : board.addMiss(x, y)
    const newBoard = board.getCopyBoard()
    setBoard(newBoard)
  }

  function ready() {
    wss.send(JSON.stringify({ event: 'ready', payload: {
      username: localStorage.nickname, gameId } }))
    setShipsReady(true)
  }

  useEffect(() => {
    wss.send(JSON.stringify({event: 'connect', payload: {
      username: localStorage.nickname, gameId } }))
    restart()
  }, [])  // <========= было '[]'

  return (
    <div>
      <p>WELCOME TO GAME<br />
      Game ID: {gameId}</p>
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
            shipsReady={shipsReady}
            canShoot={canShoot}
            shoot={shoot}
          />
        </div>
      </div>
      <ActionsInfo ready={ready} canShoot={canShoot} shipsReady={shipsReady}/>
    </div>
  )
}

export default GamePage
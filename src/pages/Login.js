import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'

const Login = () => {
  const [invitationGame, setInvitationGame] = useState()
  const [gameId, setGameId] = useState('')
  const [nickname, setNickName] = useState('')

  const navigate = useNavigate()

  const startPlay = (e) => {
    e.preventDefault()
    if (nickname && gameId) {
      localStorage.nickname = nickname
      navigate('/game/' + gameId)
    }
  }
  return (
    <div>
      <h2>Autorization</h2>
      <form onSubmit={startPlay}>
        <div className="field-group">
          <div><label htmlFor="nickname">Your Name</label></div>
          <input
            type="text"
            name="nickname"
            id="nickname"
            onChange={e => setNickName(e.target.value)} />
        </div>
        <div onChange={(e) => setInvitationGame(e.target.id === 'ingame')} className="field-group">
          <input
            type="radio"
            name="typeEnter"
            id="gen"
            value={!invitationGame}
            defaultChecked={!invitationGame}

          />
          <label htmlFor="gen">Create Game</label>
          <input
            type="radio"
            name="typeEnter"
            id="ingame"
            value={invitationGame}
            defaultChecked={invitationGame}
          />
          <label htmlFor="ingame">Enter Game by ID</label>
        </div>
        <div className="field-group">
          {invitationGame ? (
            <>
              <div>
                <label htmlFor="gameid">Please Enter Game ID</label>
              </div>
              <input
                type="text"
                name="gameId"
                defaultValue=""
                id="gameId"
                onChange={e => setGameId(e.target.value)} />
            </>
          ) : (
            <>
              <button
                className="btn-gen"
                onClick={(e) => {
                  e.preventDefault()
                  setGameId(Date.now())
                }}>Generate Game ID</button>
              <p>{gameId}</p>
            </>

          )}
        </div>

        <button type="submit" className="btn-ready">PLAY</button>
      </form>
    </div>
  )
}

export default Login
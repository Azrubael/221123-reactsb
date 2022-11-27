const WebSocket = require('ws')

// Переменная для хранения состояние игры на сервере
const games = {}
// Структура данных в переменной games
// Состояния игры представляют собой массивы из двух игроков
// В каждой "комнате" - по два игрока
/*
{
    '34546565464': [
        ws1: {......},
        ws2: {......}
    ],
    '54543252435': [
        ws3: {......},
        ws4: {......}
    ]
}
*/

// Функция start(), запускает WebSocker Server, прослушивает клиента,
// выполняет некие преобразования и отправляет данные игры на фронтенд
function start() {
  const wss = new WebSocket.Server({ port: 4000 }, () =>
    console.log('WebSocket Server started on port 4000')
  )

  // Подключение прослушивателей событий
  // 'connection' - прослушиватель подключения по ссылке на порт 4000
  // 'message' - прослушиватель событиый для подключенных клиентов 
  // вторям параметром 'message' передавется функция callback
  wss.on('connection', (wsClient) => {
    wsClient.on('message', async (message) => {
      const req = JSON.parse(message.toString())
      // условия  инициализации игры
      if (req.event == 'connect') {
        wsClient.nickname = req.payload.username
        initGames(wsClient, req.payload.gameId)
      }
      broadcast(req)
    })
  })

  // Три кейса для начала игы: 
  // когда нет ID, когда игра есть, но игрок один и когда игроки есть,
  // на случай если один из игроков почему-то перезагрузит страничку
  function initGames(ws, gameId) {
    if (!games[gameId]) {
      games[gameId] = [ws]
    }

    if (games[gameId] && games[gameId]?.length < 2) {
      games[gameId] = [...games[gameId], ws]
    }

    if (games[gameId] && games[gameId].length === 2) {
      games[gameId] = games[gameId].filter(wsc => wsc.nickname !== ws.nickname)
      games[gameId] = [...games[gameId], ws]
    }
  }


  // пареметры, отсылаемые на сервер для идентификации действий - 'event'
  // ответы сервера клиентам - содержание поля 'type'
  function broadcast(params) {
    let res
    const { username, gameId } = params.payload
    games[gameId].forEach((client) => {
      switch (params.event) {
        case 'connect':
          res = {
            type: 'connectToPlay',
            payload: {
              success: true,
              rivalName: games[gameId].find(user =>
                user.nickname !== client.nickname)?.nickname,
              username: client.nickname
            }
          }
          break
        case 'ready':
          res = {
            type: 'readyToPlay',
              payload: {
                canStart: games[gameId].length > 1,
                username
              }
          }
          break
        case 'shoot':
          res = {
            type: 'afterShootByMe',
            payload: params.payload
          }
          break
        case 'checkShoot':
          res = {
            type: 'isPerfectHit',
            payload: params.payload
          }
          break
        default:
          res = {
            type: 'logout',
            payload: params.payload
          }
          break
      }
      client.send(JSON.stringify(res))
    })
  }
}

start()

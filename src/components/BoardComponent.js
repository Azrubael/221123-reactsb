import React from 'react'
import CellComponent from './CellComponent'

// Эта функция отвечает за итерацию по игровой доске
// В цикле происходит обработка входных данных для всех ячеек
const BoardComponent = ({ board, setBoard, shipsReady, isMyBoard, canShoot, shoot }) => {
  const boardClasses = ['board']
  console.log(board)
  // Функция принимает те координаты, по которым мы кликаем на ячейке
  function addMark(x, y) {
    if (!shipsReady && isMyBoard) {
      board.addShip(x, y)
    } else if (canShoot && !isMyBoard) {
      shoot(x, y)
    }

    updateBoard()
  }

  function updateBoard() {
    const newBoard = board.getCopyBoard()

    setBoard(newBoard)
  }

  if (canShoot) {
    boardClasses.push('active-shoot')
  }

  return (
    <div className={boardClasses.join(' ')}> 
      {board.cells.map((row, index) => 
        <React.Fragment key={index}>
          {row.map(cell => 
            <CellComponent key={cell.id} cell={cell} addMark={addMark}/>
          )}
        </React.Fragment>

      )}
    </div>
  )
}

export default BoardComponent
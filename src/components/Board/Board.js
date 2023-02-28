import React from 'react'
import "./Board.css"

const Board = ({ children }) => {
  return (
    <div className='Board'>{children}</div>
  )
}

export default Board
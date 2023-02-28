import React from 'react'
import "./Calculator.css"

const Calculator = ({ children }) => {
  return (
    <div className='Calculator'>{children}</div>
  )
}

export default Calculator;
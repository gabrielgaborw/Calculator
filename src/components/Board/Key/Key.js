import React from 'react'
import "./Key.css"

const Key = ({ className, value, onClick }) => {
  return (
    <button className={className} onClick={onClick}>{value}</button>
  )
}

export default Key
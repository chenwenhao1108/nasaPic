import React from 'react'

export default function Main(props) {
    const { data } = props
  return (
    <div className='imgContainer'>
        <img src={data.hdurl || 'mars.png'} alt={data.hdurl || 'bg-pic'} className='bgImage'/>
    </div>
  )
}

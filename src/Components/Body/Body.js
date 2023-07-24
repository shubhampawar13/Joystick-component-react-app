import React from 'react'
import "./Body.css"

export default function Body(props) {
  // console.log(props.position.x);
  // console.log(props.position.y);  
  return (
    <div>
      <div className='body' style={{
          position: 'relative',
          left: `${props.position.x}px`,
          top: `${props.position.y}px`,
          width: '50px',
          height: '50px',
          background: 'blue',
        }}></div>
    </div>
  )
}

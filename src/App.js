import React from 'react'
import { Joystick } from 'react-joystick-component';
import Body from './Components/Body/Body';
import { useState } from 'react';
import { useEffect } from 'react';
import "./App.css"
const ws = new WebSocket("ws://localhost:8080");


export default function App() {
  const [bodyPosition, setBodyPosition] = useState({ x: 0, y: 0 });
  


  ws.addEventListener('open', () => {
    console.log("We are connected");
    ws.send("Hey, how's it going? ");
  })

  ws.addEventListener('message', async (e) => {
    const blobData = e.data;

    // Convert the received Blob to text
    const textData = await blobData.text();


    console.log(textData);
  })

  const handleMove = async (dx, dy) => {

    // This function will be called when the joystick is moved.
    // The dx and dy parameters represent the change in X and Y positions of the joystick.


    // Assuming the center of the joystick is at coordinates (0, 0),
    // we can calculate the position of the joystick by adding the dx and dy values.
    const joystickX = dx;
    let newBodyX = 0;
    let newBodyY = 0;
    // const joystickY = dy;
    if (bodyPosition.x > 850) {
      newBodyX = 0;
      newBodyY = bodyPosition.y;
    } else if (bodyPosition.x < 0) {
      newBodyX = 850;
      newBodyY = bodyPosition.y;
    } else if (bodyPosition.y > 400) {
      newBodyX = bodyPosition.x;
      newBodyY = 0;
    } else if (bodyPosition.y < 0) {
      newBodyX = bodyPosition.x;
      newBodyY = 400;
    }

    else {
      newBodyX = bodyPosition.x + 6 * joystickX.x;
      newBodyY = bodyPosition.y - 6 * joystickX.y;
    }




    // Update the position of the body
    setBodyPosition({ x: newBodyX, y: newBodyY });
    // console.log(bodyPosition);
    // console.log(joystickX);

    //sending things to websocket-server
    const bodyPositionJSON = JSON.stringify(bodyPosition);

    // Send the bodyPosition JSON as a WebSocket message
    ws.send(bodyPositionJSON);


    // console.log('Joystick moved:', joystickX, joystickY);
    // Add your custom logic here for handling joystick movement.
    // For example, you can update the position of a player or object in a game.
  };



  return (
    <div>
      <div className="items">
        <div className="name">JOYSTICK COMPONENT REACT APP WITH WEBSOCKET IMPLEMENTATION</div>
        <div className='rectangle'>
          <Body position={bodyPosition} />
        </div>
        <div className="joystick">
        <Joystick size={100} sticky={false} baseColor="rgba(250, 227, 146, 0.5)" move={handleMove} stickColor="#F1C93B" followCursor={false}></Joystick>
      </div>
      </div>
      
    </div>
  )
}

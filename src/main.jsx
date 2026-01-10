import './style.css'
// import { setupCounter } from './components/counter.jsx'
import GameScreen from './view/gameScreen.jsx'
import { createRoot } from 'react-dom/client';
import * as React from "react"

// document.querySelector('#app').innerHTML = 
 
// `
//   <div>

//     <div class="card">
//       <button id="counter" type="button"></button>
//     </div>
//     <p class="read-the-docs">
//       Click on the Vite logo to learn more
//     </p>
//   </div>
// `

// setupCounter(document.querySelector('#counter'))

createRoot(document.getElementById("root")).render(
  <GameScreen />
);
import React from 'react';
import ReactDOM from 'react-dom';
import './css/index.css';
import App from './components/App';
import Timer from './components/Timer';

ReactDOM.render(
  <React.StrictMode>
    <Timer />
  </React.StrictMode>,
  document.getElementById('TimerRoot')
);

// ReactDOM.render(
//   <React.StrictMode>
//     <App />
//   </React.StrictMode>,
//   document.getElementById('AppRoot')
// );